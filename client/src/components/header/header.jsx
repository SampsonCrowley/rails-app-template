import React, { Component } from 'react'
import { node } from 'prop-types';
import { withRouter } from 'react-router-dom';
import logo from 'assets/images/logo.svg';
import background from 'assets/images/background.svg';
import './header.css';
import Link from 'components/link'
import RouteParser from 'models/route-parser'

@withRouter
export default class Header extends Component {
  static propTypes = {
    title: node
  }
  constructor(props){
    super(props)
    this.state = {
    }
    console.log(this.state)
    props.history.listen(this.getTitle)
  }

  componentDidMount(){
    RouteParser.setPath(this.props.location)
    .then((result) => this.setState({...result}))
  }

  getTitle = async (location, action) => {
    console.log("changed!", location, action)
    this.setState({...await RouteParser.setPath(location)})
  }

  render(){
    return (
      <header className="Site-header" style={{backgroundImage: background}}>
        <div className="header-content">
          <nav className="header-nav">
            <div className="header-logo">
              <a href="/" className="header-link">
                <img src={logo} alt='Site Logo' />
              </a>
            </div>
            <div className="header-menu">
              <div className="header-menu-wrapper">
                <Link to="/" className="header-link">Home Page</Link>
                <Link to="/developers/1" className="header-link">Test Page</Link>
                <Link to="/pages/54326" className="header-link">Test Resource Page</Link>
                <Link to="/alternate" className="header-link">Test Aliased Page</Link>
              </div>
            </div>
          </nav>
          <h1 className="Site-title">{this.state.title || (<span>You&apos;re Reacting!</span>)}</h1>
          {
            this.state.description && (
              <h3 className="Site-subtitle">{this.state.description}</h3>
            )
          }
        </div>
      </header>
    )
  }
}
