import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import AppointmentForm from './appointment-form'

describe('Components - AppointmentForm', () => {
  const div = document.createElement('div');
  const createAppointmentForm = ({...props}) => {
    ReactDOM.render(<AppointmentForm {...props} />, div);
    return div.querySelector('p')
  }

  it('is snapshotable', () => {
    const tree = renderer
      .create(<AppointmentForm start={new Date('2018-01-01 00:00:00')} end={new Date('2018-01-01 01:00:00')} />)
      .toJSON();
    expect(tree).toMatchSnapshot()
  })
})
