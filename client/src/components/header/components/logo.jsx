import React, { Component } from 'react';
import logo from 'assets/images/logo.svg';

export default class HeaderLogo extends Component {
  render() {
    return (
      <div className="header-logo">
        <a href="/" className="header-link">
          <img src={logo} alt='Site Logo' />
        </a>
      </div>
    )
  }
}
