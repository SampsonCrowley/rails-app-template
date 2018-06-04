import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import Calendar from './calendar';

describe('Pages - Calendar', () => {
  const div = document.createElement('div');
  const createCalendar = ({...props}) => {
    ReactDOM.render(<Calendar {...props} />, div);
    return div.querySelector('p')
  }

  it('renders an paragraph tag', () => {
    const rendered = createCalendar()
    expect(rendered).toBeTruthy()
    expect(rendered.tagName).toBe("P")
    ReactDOM.unmountComponentAtNode(div);
  })

  it('sets an unnecessarily tall height', () => {
    const rendered = renderer
      .create(<Calendar />)
      .toJSON();
    expect(rendered.props.style)
    expect(rendered.props.style.height).toBe('1000vh')
  })

  it('is snapshotable', () => {
    const tree = renderer
      .create(<Calendar />)
      .toJSON();
    expect(tree).toMatchSnapshot()
  })
})
