import React, { Component } from 'react';
import {arrayOf, shape, string, node} from 'prop-types';
import { Menu } from 'contexts/menu'

import Link from 'components/link'

class HeaderLinks extends Component {
  static propTypes = {
    ...Menu.PropTypes,
    links: arrayOf(shape({
      to: string,
      children: node
    })).isRequired
  }

  render() {
    const {menuState:{menuOpen}, menuActions: {toggleMenu}, links = []} = this.props;
    return (<div className="header-menu">
      <input type="checkbox" id="nav-trigger" className='nav-trigger' checked={!!menuOpen} />
      <label htmlFor="nav-trigger" onClick={toggleMenu}><span></span></label>
      <div className="header-menu-wrapper">
        {
          links.map(({className, ...props}, i) => (
            <Link key={i} className={`header-link ${className || ''}`} {...props} />
          ))
        }
      </div>
    </div>)
  }
}

export default Menu.Decorator(HeaderLinks)
