import React, {createContext, Component} from 'react'
import { objectOf, arrayOf, func, shape, string, number, bool } from 'prop-types'
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment'
import Spaceship from 'helpers/spaceship'

const stateUrl = `${canUseDOM ? '' : 'http://localhost:4000'}/api/states/`

export const States = {}

States.DefaultValues = {
  ids: [],
  loaded: false,
  mappings: {},
  states: {},
}

States.Context = createContext({
  statesState: {...States.DefaultValues},
  statesActions: {
    getStates(){},
    find(){},
  }
})

States.Decorator = function withStatesContext(Component) {
  return (props) => (
    <States.Context.Consumer>
      {stateProps => <Component {...props} {...stateProps} />}
    </States.Context.Consumer>
  )
}

States.stateShape = () => shape({
  id: number.isRequired,
  abbr: string.isRequired,
  full: string.isRequired,
  isForeign: bool
})

States.PropTypes = {
  statesState: shape({
    loaded: bool,
    ids: arrayOf(number),
    mappings: objectOf(number),
    states: objectOf(
      States.stateShape()
    ),
  }),
  statesActions: shape({
    getStates: func,
    find: func,
  }).isRequired
}

const mapStateProps = (state, show = false) => ({
  id: +state.id,
  abbr: state.abbr,
  full: state.full,
  isForeign: !!state.is_foreign,
})

export default class ReduxStateProvider extends Component {
  state = { ...States.DefaultValues }

  render() {
    return (
      <States.Context.Provider
        value={{
          statesState: this.state,
          statesActions: {
            /**
             * @returns {object} retrieved - id mapped object of states
             **/
            getStates: async () => {
              try {
                const result = await fetch(stateUrl),
                      retrieved = await result.json(),
                      states = {},
                      mappings = {}

                const ids = retrieved.map((state) => {
                  state = mapStateProps(state)
                  states[state.id] = state
                  mappings[state.id] = state.id

                  mappings[state.id] = state.id;

                  [ 'abbr', 'full' ].map(function(k){
                    mappings[state[k]] = state.id;
                    mappings[state[k].toLowerCase()] = state.id;

                    return k;
                  })

                  return state.id
                })

                ids.sort((a, b) => Spaceship.operator(states[a], states[b], ['full', 'abbr']))

                this.setState({
                  ids,
                  states,
                  mappings,
                  loaded: true
                })

                return {...states}

              } catch (e) {
                this.setState({
                  states: {},
                  loaded: false
                })

                return {}
              }
            },
            find: (val) => this.state.states[this.state.mappings[val]]
          }
        }}
      >
        {this.props.children}
      </States.Context.Provider>
    )
  }
}
