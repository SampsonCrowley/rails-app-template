import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class AppointmentForm extends Component {
  /**
   * @type {object}
   * @property {Date} start - Appointment start time
   * @property {Date} end - Appointment end time
   */
  static propTypes = {
    start: PropTypes.instanceOf(Date).isRequired,
    end: PropTypes.instanceOf(Date).isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      isFollowup: false
    }
  }

  momentToLocal(date) {
    return `${
      date.getFullYear()
    }-${
      `${date.getMonth() + 1}`.padStart(2, 0)
    }-${
      `${date.getDay() + 1}`.padStart(2, 0)
    }T${
      `${date.getHours()}`.padStart(2, 0)
    }:${
      `${date.getMinutes()}`.padStart(2, 0)
    }`
  }

  render(){
    return (
      <div>

        <div className="row form-group">
          <div className="col-sm-6 form-group">
            <label htmlFor="start">Appointment Starting Time</label>
            <input
              name='start'
              type="datetime-local"
              defaultValue={this.momentToLocal(this.props.start)}
              className="form-control"
            />
          </div>
          <div className="col-sm-6 form-group">
            <label htmlFor="end">Appointment Ending Time</label>
            <input
              name='end'
              type="datetime-local"
              defaultValue={this.momentToLocal(this.props.end)}
              className="form-control"
            />
          </div>
        </div>
        <div className="row form-group">
          <div className="col-sm-6 form-group">
            <label htmlFor="first">Patient First Name</label>
            <input
              name='first'
              type="text"
              className="form-control"
            />
          </div>
          <div className="col-sm-6 form-group">
            <label htmlFor="last">Patient Last Name</label>
            <input
              name='last'
              type="text"
              className="form-control"
            />
          </div>
        </div>
        <div className="row form-group">
          <div className="col-sm-6 form-group">
            <label htmlFor="reason">Reason For Appointment</label>
            <input
              name='reason'
              type="text"
              className="form-control"
            />
          </div>
          <div className='col-sm-6 form-group'>
            <label htmlFor="followup">Is a Follow Up?</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <input
                  name='followup'
                  type="checkbox"
                  value={1}
                  checked={this.state.isFollowup}
                  className='indirect-box'
                />
                {
                  this.state.isFollowup ? (
                    <div className="input-group-text text-success">&#10004;</div>
                  ) : (
                    <div className="input-group-text text-danger">X</div>
                  )
                }
              </div>
              <label
                className='form-control'
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  this.setState({isFollowup: !this.state.isFollowup})
                }}
              >
                Follow Up
              </label>
            </div>
          </div>
        </div>
        <div className="row form-group">
          <div className="col form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              name='notes'
              className="form-control"
              rows='5'
            />
          </div>
        </div>
      </div>
    )
  }
}
