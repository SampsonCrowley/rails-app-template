import React, {createContext, Component} from 'react'
import {arrayOf, func, instanceOf, shape, string} from 'prop-types'
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment'

const eventUrl = `${canUseDOM ? '' : 'http://localhost:4000'}/api/appointments/`

export const Appointment = {}

Appointment.DefaultValues = {
  appointments: [],
  loaded: false
}

Appointment.Context = createContext({
  appointmentState: {...Appointment.DefaultValues},
  appointmentActions: {
    getAppointments(){}
  }
})

Appointment.Decorator = function withAppointmentContext(Component) {
  return (props) => (
    <Appointment.Context.Consumer>
      {appointmentProps => <Component {...props} {...appointmentProps} />}
    </Appointment.Context.Consumer>
  )
}

Appointment.PropTypes = {
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
  state = { ...Appointment.DefaultValues }

  render() {
    return (
      <Appointment.Context.Provider
        value={{
          appointmentState: this.state,
          appointmentActions: {
            /**
             * @returns {array} retrived - array of appointments
             **/
            getAppointments: async () => {
              try {
                const result = await fetch(eventUrl),
                      appointments = await result.json()

                const retrieved = appointments.map((event) => ({
                  start: new Date(event.starting),
                  end: new Date(event.ending),
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
      </Appointment.Context.Provider>
    )
  }
}
