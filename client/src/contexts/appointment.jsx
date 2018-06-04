import React, {createContext, Component} from 'react'
import {arrayOf, func, instanceOf, shape, string} from 'prop-types'
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment'


const eventUrl = `${canUseDOM ? '' : 'http://localhost:4000'}/api/appointments/`

export const defaultState = {
  appointments: [],
  loaded: false
}

const AppointmentContext = createContext({...defaultState})

export const {Provider: AppointmentProvider, Consumer: AppointmentConsumer} = AppointmentContext

export function withAppointmentContext(Component) {
  return (props) => (
    <AppointmentConsumer>
      {menuProps => <Component {...props} {...menuProps} />}
    </AppointmentConsumer>
  )
}

export const withAppointmentPropTypes = {
  appointmentState: shape({
    appointments: arrayOf(shape({
      start: instanceOf(Date),
      end: instanceOf(Date),
      title: string,
    }))
  }),
  appointmentActions: shape({
    getAppointments: func
  }).isRequired
}

export default class ReduxAppointmentProvider extends Component {
  state = { ...defaultState }

  render() {
    return (
      <AppointmentProvider
        value={{
          appointmentState: this.state,
          appointmentActions: {
            /**
             * @returns {array} retrived - array of appointments
             **/
            getAppointments: async () => {
              try {
                const result = await fetch(eventUrl)
                console.log(result)
                const {
                  data: {
                    data: {
                      appointments,
                    },
                    error
                  },
                } = result

                if(error) throw new Error(error)

                const retrieved = appointments.map((event) => ({
                  start: new Date(event.start),
                  end: new Date(event.end),
                  title: event.title,
                }))

                this.setState({
                  appointments: retrieved,
                  loaded: true
                })


                return [...retrieved]

              } catch (e) {

                this.setState({
                  appointments: [],
                  loaded: false
                })

                return []
              }
            }
          }
        }}
      >
        {this.props.children}
      </AppointmentProvider>
    )
  }
}
