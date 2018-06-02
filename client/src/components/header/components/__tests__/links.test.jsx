import React from 'react'
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { MemoryRouter as Router } from 'react-router-dom';

import Links from '../links'

describe('Components - Header::Links', () => {
  const div = document.createElement('div');

  const createLinks = ({...props}) => {
    ReactDOM.render((
      <Router>
        <Links {...props} />
      </Router>
    ), div);
    return div.querySelector('div.header-menu')
  }

  it('renders the header-menu', () => {
    const rendered = createLinks()
    expect(rendered).toBeTruthy()
    expect(rendered.tagName).toBe("DIV")
    expect(rendered.classList.contains('header-menu')).toBeTruthy()
  })

  it('contains a menu wrapper with a list of links', () => {
    const rendered = createLinks()
    const nav = rendered.querySelector('.header-menu-wrapper')
    expect(nav).toBeTruthy()
    expect(nav.tagName).toBe('DIV')

    const links = nav.querySelectorAll('a')
    expect(links.length).toBe(4)
  })

  it('is snapshotable', () => {
    const tree = renderer
      .create(
        <Router>
          <Links />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot()
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(div);
    })
  })
})
