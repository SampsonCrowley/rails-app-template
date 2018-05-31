import React from 'react'
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom';

import Link from './link'

describe('Components - Link', () => {
  const div = document.createElement('div');
  const createLink = ({...props}) => {
    ReactDOM.render((
      <Router>
        <Link {...props} />
      </Router>
    ), div);
    return div.querySelector('a')
  }
  it('Renders an anchor tag', () => {
    const rendered = createLink({
      to: '/',
      children: 'Test'
    })
    expect(rendered)
    expect(rendered.tagName).toBe("A")
    ReactDOM.unmountComponentAtNode(div);
  })

  it('requires a "to" prop', () => {
    global.console = {error: jest.fn()}
    expect(() => createLink({children: 'Test'})).toThrow()
    expect(console.error).toBeCalled()
  })

  it('sets the "href" prop to "to"', () => {
    expect(createLink({
      to: '/test',
      children: 'Test'
    }).href).toMatch(/http:\/{2}[A-Za-z09\.]+\/test$/)
  })

  it('requires children', () => {
    global.console = {error: jest.fn()}
    createLink({to: '/'})
    expect(console.error).toBeCalled()
  })

  it('renders children', () => {
    expect(createLink({
      to: '/',
      children: 'Test'
    }).innerHTML).toMatch(/^Test$/)
  })
})
