import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Header from 'components/header';
import './site.css';

class Site extends Component {
  static propTypes = {
    children: PropTypes.any
  }
  render() {
    return (
      <section className="Site">
        <Header />
        <main className="Site-main">
          {this.props.children}
        </main>
      </section>
    );
  }
}

export default Site;
