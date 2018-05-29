import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

export default class CloserLink extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  }

  render() {
    const {to, children, ...props} = this.props;
    if(/^(\w+:)?\/\/.*/.test(to)) return <a href={to} {...props}>{children}</a>
    return <Link to={to} {...props}>{children}</Link>
  }
}
