import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Site from './layouts/site';
import HomePage from './pages/home';
import NotFound from './pages/not-found';
import {MenuProvider, menuContextStates} from './contexts/menu';

export default class SiteRouter extends Component {
  constructor(props){
    super(props)
    this.state = {
      menuChecked: menuContextStates.unchecked,
      toggleMenu: () => {
        console.log('TOGGLE')
        this.setState(state => ({
          menuChecked: state.menuChecked === menuContextStates.checked
            ? menuContextStates.unchecked
            : menuContextStates.checked
        }))
      },
      closeMenu: () => {
        console.log('CLOSE')
        this.setState({menuChecked: menuContextStates.unchecked})
      },
      openMenu: () => {
        console.log('OPEN')
        this.setState({menuChecked: menuContextStates.checked})
      }
    }
    menuContextStates.close = this.state.closeMenu
  }
  render () {
    return <MenuProvider value={this.state}>
      <Router>
        <Site>
          <Switch>
            <Route path='/' exact component={HomePage} />
            <Route component={NotFound} />
          </Switch>
        </Site>
      </Router>
    </MenuProvider>
  }
}
