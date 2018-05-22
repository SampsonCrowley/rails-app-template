import React, { Component } from 'react'
import logo from 'assets/images/logo.svg';
import './header.css';

export default class Header extends Component {
  render(){
    return (
      <header className="Site-header">
        <div className="header-content">
          <nav className="header-nav">
            <div className="header-logo">
              <a href="/" className="header-link">
                <img src={logo} alt='Site Logo' />
              </a>
            </div>
            <div className="header-menu">
              <div className="header-menu-wrapper">
                <a href="#/" className="header-link">Home Page</a>
                <a href="#/page" className="header-link">Test Page</a>
              </div>
            </div>
          </nav>
          <h1 className="Site-title">You&apos;re Reacting!</h1>
        </div>
      </header>
    )
  }
}
