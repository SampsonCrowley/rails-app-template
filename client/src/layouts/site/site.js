import React, { Component } from 'react';
import PropTypes from 'prop-types'
import logo from 'assets/images/logo.svg';
import './site.css';

class Site extends Component {
  static propTypes = {
    children: PropTypes.any
  }
  render() {
    return (
      <section className="Site">
        <header className="Site-header">
          <img src={logo} className="Site-logo" alt="logo" />
          <h1 className="Site-title">Welcome to React</h1>
        </header>
        <main className="Site-main">
          {this.props.children}
        </main>
      </section>
    );
  }
}

export default Site;
