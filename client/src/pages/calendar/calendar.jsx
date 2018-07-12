import React, { Component } from 'react';

import Calendar from 'components/calendar'
import './calendar.css'

class CalendarPage extends Component {
  render() {
    return (
      <div className="CalendarPage">
        <Calendar />
      </div>
    );
  }
}

export default CalendarPage;
