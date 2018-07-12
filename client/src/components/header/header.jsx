import React, { Component } from 'react'
import { node, string, object } from 'prop-types';
import { withRouter } from 'react-router-dom';

import background from 'assets/images/background.svg';
import { Menu } from 'contexts/menu';
import debounce from 'helpers/debounce';

import {HeaderLinks, HeaderLogo} from './components'

import RouteParser from 'helpers/route-parser'

import './header.css';

const resizeEvents = ['orientationchange', 'resize']

class Header extends Component {
  static propTypes = {
    title: node,
    navClass: string,
    history: object
  }

  constructor(props){
    super(props)
    this.state = {
      top: 0,
    }
    props.history.listen(this.getTitle)
  }

  componentDidMount(){
    this.bindResize()
    RouteParser.setPath(this.props.location)
    .then((result) => this.setState({...result}))
  }

  getTitle = async (location, action) => {
    console.log("changed!", location, action)
    this.setState({...await RouteParser.setPath(location)})
    setTimeout(this.handleResize)
  }

  componentWillUnmount(){
    this.unbind()
  }

  handleResize = () => {
    const h = ((this.headerEl && this.headerEl.clientHeight) || 0) - ((this.navEl && this.navEl.clientHeight) || 0)
    this.props.heightRef && this.props.heightRef(h)
    this.setState({top: `-${h}px`})
    this.props.menuActions && this.props.menuActions.closeMenu()
  }

  unbind = () => {
    resizeEvents.map((e) => window.removeEventListener(e, this.state.resizeListener))
  }

  bindResize = () => {
    this.handleResize()
    const resizeListener = debounce(this.handleResize, 50)
    resizeEvents.map((e) => window.addEventListener(e, resizeListener))
    this.setState({resizeListener})
  }

  render(){
    return (
      <header ref={(el) => this.headerEl = el} className="Site-header" style={{backgroundImage: background, top: this.state.top || 0}}>
        <div className="header-content">
          <nav ref={(el) => this.navEl = el} className={`header-nav ${this.props.navClass}`}>
            <HeaderLogo />
            <HeaderLinks
              links={[
                {
                  to: "/",
                  children: 'Home Page',
                },
                {
                  to: "/calendar",
                  children: 'Calendar',
                },
                {
                to: "/developers/1",
                  children: 'Test Page',
                },
                {
                to: "/pages/54326",
                  children: 'Test Resource Page',
                },
                {
                to: "/alternate",
                  children: 'Test Aliased Page',
                },
              ]}
            />
          </nav>
          <h1 className="Site-title">
            <HeaderLogo className="top-logo" />
            {this.state.title || (<span>You&apos;re Reacting!</span>)}
          </h1>
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

export default Menu.Decorator(withRouter(Header))
