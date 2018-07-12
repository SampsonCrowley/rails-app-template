import React, {Component} from 'react'
// import HTML5Backend from 'react-dnd-html5-backend'
// import { DragDropContext } from 'react-dnd'
import BigCalendar from 'react-big-calendar'
// import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from 'moment'

import AppointmentForm from 'forms/appointment-form'
import DisplayOrLoading from 'components/display-or-loading'
import ModalEditor from 'components/modal-editor'

import { Appointment } from 'contexts/appointment'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import './calendar.css'

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

// const DnDCalendar = withDragAndDrop(BigCalendar)
// @DragDropContext(HTML5Backend)

/** Main Event Calendar Component */
class Calendar extends Component {
  /**
   * @type {object}
   * @property {object} appointmentState - redux state for appointments
   * @property {object} appointmentActions - redux actions for appointments
   */
  static propTypes = {
    ...Appointment.PropTypes
  }

  constructor(props){
    super(props)
    this.state = {}
  }

  /**
   * Fetch Events On Mount
   *
   * @private
   */
  async componentDidMount(){
    try {
      return await this.props.appointmentState.loaded ? Promise.resolve() : this.props.appointmentActions.getAppointments()
    } catch (e) {
      console.log(e)
    }
  }

  // /**
  //  * Move an appointment
  //  *
  //  * @param {Object} appointment - appointment object
  //  */
  // moveEvent = ({ appointment, start, end }) => {
  //   console.log(start, end)
  //   const { appointments = [] } = this.props
  //
  //   const idx = appointments.indexOf(appointment)
  //   const updatedEvent = { ...appointment, start, end }
  //
  //   const nextEvents = [...appointments]
  //   nextEvents.splice(idx, 1, updatedEvent)
  //
  //   console.log(nextEvents)
  //
  //   alert(`${appointment.title} was dropped onto ${start}`)
  // }
  //
  // /**
  //  * Change Event Length
  //  *
  //  * @param {Event} _ - DOMEvent
  //  * @param {Object} appointment - appointment object
  //  */
  // resizeEvent = (_, { appointment, start, end }) => {
  //   const { appointments = [] } = this.props
  //
  //   const nextEvents = appointments.map(existingEvent => {
  //     return existingEvent.id == appointment.id
  //       ? { ...existingEvent, start, end }
  //       : existingEvent
  //   })
  //
  //   this.setState({
  //     appointments: nextEvents,
  //   })
  //
  //   alert(`${appointment.title} was resized to ${start}-${end}`)
  // }

  /**
   * Render Calendar
   *
   * @returns {ReactElement} BigCalendar - Selectable
   */
  render() {
    return (<DisplayOrLoading display={!!this.props.appointmentState.loaded}>
      <BigCalendar
        defaultView='week'
        defaultDate={new Date()}
        selectable
        onSelectEvent={appointment => alert(appointment.title)}
        onSelectSlot={
          slotInfo => {
            console.log(slotInfo)
            this.setState({
              selected: {
                start: slotInfo.start,
                end: slotInfo.end
              }
            })
          }
        }
        events={this.props.appointmentState.appointments}
      />
      {!!this.state.selected && <ModalEditor
        heading='Appointment Form'
        onClose={() => this.setState({selected: false})}
      >
        <AppointmentForm {...this.state.selected} />
      </ModalEditor>}
    </DisplayOrLoading>)
  }
}

export default Appointment.Decorator(Calendar)
