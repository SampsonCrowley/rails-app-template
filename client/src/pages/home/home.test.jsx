import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import Home from './home';

describe('Pages - Home', () => {
  const div = document.createElement('div');
  const createHome = ({...props}) => {
    ReactDOM.render(
      <Home {...props} />
      , div);
    return div.querySelector('p')
  }

  it('is snapshotable', () => {
    const tree = renderer
      .create(
        <Home />
      )
      .toJSON();
    expect(tree).toMatchSnapshot()
  })
})
