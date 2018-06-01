import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import Home from './home';

describe('Pages - Home', () => {
  const div = document.createElement('div');
  const createHome = ({...props}) => {
    ReactDOM.render(<Home {...props} />, div);
    return div.querySelector('p')
  }

  it('renders an paragraph tag', () => {
    const rendered = createHome()
    expect(rendered).toBeTruthy()
    expect(rendered.tagName).toBe("P")
    ReactDOM.unmountComponentAtNode(div);
  })

  it('sets an unnecessarily tall height', () => {
    const rendered = renderer
      .create(<Home />)
      .toJSON();
    expect(rendered.props.style)
    expect(rendered.props.style.height).toBe('1000vh')
  })

  it('is snapshotable', () => {
    const tree = renderer
      .create(<Home />)
      .toJSON();
    expect(tree).toMatchSnapshot()
  })
})
