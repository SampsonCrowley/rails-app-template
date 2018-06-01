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

  it('Renders an paragraph tag', () => {
    const rendered = createHome()
    expect(rendered)
    expect(rendered.tagName).toBe("P")
    ReactDOM.unmountComponentAtNode(div);
  })

  it('sets an unnecessarily tall height', () => {
    const rendered = shallow(<Home/>)
    console.log(rendered, rendered.style)
    expect(rendered.classList).toBe('1000vh')
    ReactDOM.unmountComponentAtNode(div);
  })

  it('is snapshotable', () => {
    const tree = renderer
      .create(<Home />)
      .toJSON();
    expect(tree).toMatchSnapshot()
  })
})
