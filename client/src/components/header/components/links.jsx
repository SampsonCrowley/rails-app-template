import React, { Component } from 'react';
import { withMenuContext, withMenuPropTypes } from 'contexts/menu'

import Link from 'components/link'

@withMenuContext
export default class HeaderLinks extends Component {
  static propTypes = {
    ...withMenuPropTypes
  }

  render() {
    const {menuChecked, toggleMenu} = this.props;
    return (<div className="header-menu">
      <input type="checkbox" id="nav-trigger" className='nav-trigger' checked={menuChecked} />
      <label htmlFor="nav-trigger" onClick={toggleMenu}><span></span></label>
      <div className="header-menu-wrapper">
        <Link to="/" className="header-link">Home Page</Link>
        <Link to="/developers/1" className="header-link">Test Page</Link>
        <Link to="/pages/54326" className="header-link">Test Resource Page</Link>
        <Link to="/alternate" className="header-link">Test Aliased Page</Link>
      </div>
    </div>)
  }
}
