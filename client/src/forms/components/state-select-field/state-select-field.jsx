import React, { Component } from 'react';
import { States } from 'contexts/states';

import filterKeys from 'helpers/filter-keys'
import SelectField from 'forms/components/select-field'

class StateSelectField extends Component {

  constructor(props){
    super(props)
    this.state = {
      options: []
    }
  }

  async componentDidMount(){
    try {
      return await (this.props.statesState.loaded ? Promise.resolve() : this.props.statesActions.getStates())
      .then(this.mapOptions)
    } catch (e) {
      console.log(e)
    }
  }

  componentDidUpdate({ statesState: { loaded = false, ids = [] } }){
    if(
      (!loaded && this.props.statesState.loaded) ||
      (ids.length !== this.props.statesState.ids.length)
    ) {
      this.mapOptions()
    }
  }

  mapOptions = () => {
    console.log(this.props)
    const { statesState: { ids = [] }, statesActions: {find = ((v) => v)} } = this.props;
    this.setState({
      options: ids.map((id) => find(id)).map((state) => ({
        value: state.id,
        label: state.full,
        abbr: state.abbr,
      }))
    })
  }

  render() {
    return (
      <SelectField
        {...filterKeys(this.props, ['statesState', 'statesActions'])}
        options={this.state.options}
        filterOptions={{
          indexes: ['abbr','label']
        }}
      />
    )
  }
}

export default States.Decorator(StateSelectField)
