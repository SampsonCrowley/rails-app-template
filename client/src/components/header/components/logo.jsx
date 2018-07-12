import React, { Component } from 'react';
import Link from 'components/link'
import logo from 'assets/images/logo.svg';

export default class HeaderLogo extends Component {
  render() {
    return (
      <div className="header-logo" {...this.props}>
        <Link to='/' className="header-link">
          <img src={logo} alt='Site Logo' />
        </Link>
      </div>
    )
  }
}
