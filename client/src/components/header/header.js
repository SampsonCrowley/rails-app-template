import React, { Component } from 'react'
import logo from 'assets/images/logo.svg';
import './header.css';

export default class Header extends Component {
  render(){
    return (
      <header className="Site-header">
        <div className="header-content">
          <nav class="header-nav">
            <div class="header-logo">
              <a href="/" class="header-link">
                <img src={logo} class="header_link__2zJJT header_white__3qPyi" />
              </a>
            </div>
            <div class="header-menu">
              <div className="header-menu-wrapper">
                <a href="#/" class="header-link">Home Page</a>
                <a href="#/page" class="header-link">Test Page</a>
              </div>
            </div>
          </nav>
          <h1 className="Site-title">You&apos;re Reacting!</h1>
        </div>
      </header>
    )
  }
}
