import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { withMenuContext, withMenuPropTypes } from 'contexts/menu'

@withMenuContext
export default class CloserLink extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    ...withMenuPropTypes
  }

  render() {
    const {to, children, closeMenu, openMenu: _open, toggleMenu: _toggle, menuChecked: _checked, ...props} = this.props;
    if(/^(\w+:)?\/\/.*/.test(to)) return <a href={to} {...props}>{children}</a>
    return <Link onClick={closeMenu} to={to} {...props}>{children}</Link>
  }
}
