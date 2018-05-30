import React, { Component } from 'react'
import { node, string } from 'prop-types';
import { withRouter } from 'react-router-dom';
import logo from 'assets/images/logo.svg';
import background from 'assets/images/background.svg';
import './header.css';
import Link from 'components/link'
import RouteParser from 'models/route-parser'

@withRouter
export default class Header extends Component {
  static propTypes = {
    title: node,
    navClass: string
  }

  constructor(props){
    super(props)
    this.state = {
      top: 0
    }
    props.history.listen(this.getTitle)
  }

  componentDidMount(){
    const h = this.headerEl.clientHeight - this.navEl.clientHeight
    this.props.heightRef && this.props.heightRef(h)
    this.setState({top: `-${h}px`})
    RouteParser.setPath(this.props.location)
    .then((result) => this.setState({...result}))
  }

  getTitle = async (location, action) => {
    console.log("changed!", location, action)
    this.setState({...await RouteParser.setPath(location)})
  }

  render(){
    return (
      <header ref={(el) => this.headerEl = el} className="Site-header" style={{backgroundImage: background, top: this.state.top || 0}}>
        <div className="header-content">
          <nav ref={(el) => this.navEl = el} className={`header-nav ${this.props.navClass}`}>
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
