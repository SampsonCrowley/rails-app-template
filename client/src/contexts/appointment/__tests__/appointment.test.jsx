import React, {Component, createContext} from 'react';
import ReactDOM from 'react-dom';
import AppointmentRedux, {Appointment} from '../appointment'



describe('Contexts - Appointment', () => {
  describe('Wrapper', () => {
    it('constains both a provider and a consumer', () => {
      expect(Appointment.Context.Provider['$$typeof']).toBe(createContext().Provider['$$typeof'])
      expect(Appointment.Context.Provider['$$typeof']).toBeTruthy()
      expect(Appointment.Context.Consumer['$$typeof']).toBe(createContext().Consumer['$$typeof'])
      expect(Appointment.Context.Consumer['$$typeof']).toBeTruthy()
    })

    it('contains a object for default values', () => {
      expect(Appointment.hasOwnProperty('DefaultValues')).toBe(true)
      expect(Object.keys(Appointment.DefaultValues)).toEqual(['appointments', 'loaded'])
    })

    it('contains a High Order Consumer Component', () => {
      class WithContextClass extends Component {
        constructor(props){
          super(props)
          expect(props.hasOwnProperty('appointmentState')).toBe(true)
          expect(props.hasOwnProperty('appointmentActions')).toBe(true)
        }
        render(){
          return 'TEST'
        }
      }

      const AssertHasContext = Appointment.Decorator(WithContextClass)

      class AssertHasNoContext extends Component {
        constructor(props){
          super(props)
          expect(props.hasOwnProperty('appointmentState')).toBe(false)
          expect(props.hasOwnProperty('appointmentActions')).toBe(false)
        }
        render(){
          return 'TEST'
        }
      }

      const div = document.createElement('div')
      ReactDOM.render((
        <AppointmentRedux>
          <AssertHasContext />
          <AssertHasNoContext />
        </AppointmentRedux>
      ), div);
      ReactDOM.unmountComponentAtNode(div);

    })
  })

  describe('Consumer', () => {
    it("tracks appointmentOpen state using Redux principles", () => {
      const div = document.createElement('div')
      ReactDOM.render((
        <Appointment.Context.Consumer>
          {
            appointmentProps => {
              expect(Object.keys(appointmentProps)).toEqual(['appointmentState', 'appointmentActions'])
              expect(Object.keys(appointmentProps.appointmentState || {})).toEqual(Object.keys(Appointment.DefaultValues))
              for(let k in Appointment.DefaultValues){
                if(Appointment.DefaultValues.hasOwnProperty(k)) {
                  expect(appointmentProps.appointmentState[k]).toBe(Appointment.DefaultValues[k])
                }
              }
              return (<span></span>)
            }
          }
        </Appointment.Context.Consumer>
      ), div);
      ReactDOM.unmountComponentAtNode(div);
    })
  })

  it('exports proper prop-types to use with HOC', () => {
    expect(Object.keys(Appointment.PropTypes)).toEqual(['appointmentState', 'appointmentActions'])
  })
})
