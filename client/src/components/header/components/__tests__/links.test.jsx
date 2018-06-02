import React from 'react'
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { MemoryRouter as Router } from 'react-router-dom';

import Links from '../links'

describe('Components - Header::Links', () => {
  const div = document.createElement('div');

  const createLinks = (props) => {
    ReactDOM.render((
      <Router>
        <Links {...props} />
      </Router>
    ), div);
    return div.querySelector('div.header-menu')
  }

  it('renders the header-menu', () => {
    const rendered = createLinks({
      links: []
    })
    expect(rendered).toBeTruthy()
    expect(rendered.tagName).toBe("DIV")
    expect(rendered.classList.contains('header-menu')).toBeTruthy()
  })

  it('requires a list of links', () => {
    const con = global.console
    global.console = {error: jest.fn()}
    createLinks()
    expect(console.error).toBeCalled()
    ReactDOM.unmountComponentAtNode(div);
    global.console = con
  })

  it('contains a menu wrapper with a list of links', () => {
    let rendered = createLinks(),
        nav = rendered.querySelector('.header-menu-wrapper')

    expect(nav).toBeTruthy()
    expect(nav.tagName).toBe('DIV')

    let links = nav.querySelectorAll('a')
    expect(links.length).toBe(0)
    ReactDOM.unmountComponentAtNode(div)

    rendered = createLinks({
      links: [
        {to: '/', children: 'test'},
        {to: '/', children: 'test'},
        {to: '/', children: 'test'},
        {to: '/', children: 'test'},
        {to: '/', children: 'test'},
      ]
    })
    nav = rendered.querySelector('.header-menu-wrapper')
    links = nav.querySelectorAll('a')
    expect(links.length).toBe(5)
  })

  it('is snapshotable', () => {
    const tree = renderer
      .create(
        <Router>
          <Links
            links={[
              {
                to: '/test',
                children: 'TEST'
              },
              {
                to: '/test/2',
                children: 'TEST 2'
              },
              {
                to: '/test/3',
                children: (
                  <div>
                    <h1>
                      TEST 3
                    </h1>
                  </div>
                )
              },
            ]}
          />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot()
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(div);
    })
  })
})
