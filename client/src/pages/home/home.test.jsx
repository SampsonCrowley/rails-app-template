import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import Home from './home';

describe('Pages - Home', () => {
  const div = document.createElement('div');
  const createHome = ({...props}) => {
    ReactDOM.render(<Home {...props} />, div);
    return div.querySelector('div.Site-intro')
  }

  it('renders an div with class "Site-intro"', () => {
    const rendered = createHome()
    expect(rendered).toBeTruthy()
    expect(rendered.tagName).toBe("DIV")
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
