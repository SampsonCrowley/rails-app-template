import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import AppointmentProvider from 'contexts/appointment';

import Calendar from './calendar';

describe('Pages - Calendar', () => {
  const div = document.createElement('div');
  const createCalendar = ({...props}) => {
    ReactDOM.render(
      <AppointmentProvider>
        <Calendar {...props} />
      </AppointmentProvider>
      , div);
    return div.querySelector('p')
  }

  it('is snapshotable', () => {
    const tree = renderer
      .create(
        <AppointmentProvider
          value={{
            appointmentState: {
              appointments: [],
              loaded: true
            },
            appointmentActions: {
              getAppointments: async () => []
            }
          }}
        >
          <Calendar />
        </AppointmentProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot()
  })
})
