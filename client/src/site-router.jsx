import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Site from './layouts/site';
import routes from 'routes'
import {MenuProvider, menuContextStates} from './contexts/menu';
import AppointmentProvider from 'contexts/appointment';

console.log(routes)

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
    return (
      <AppointmentProvider>
        <MenuProvider value={this.state}>
          <Router>
            <Site>
              <Switch>
                {
                  routes.map((route, i) => <Route key={i} {...route}/>)
                }
              </Switch>
            </Site>
          </Router>
        </MenuProvider>
      </AppointmentProvider>
    )
  }
}
