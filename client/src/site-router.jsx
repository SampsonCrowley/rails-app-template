import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Site from './layouts/site';
import routes from 'routes'
import MenuRedux from './contexts/menu';
import AppointmentRedux from 'contexts/appointment';

console.log(routes)

export default class SiteRouter extends Component {
  render () {
    return (
      <AppointmentRedux>
        <MenuRedux>
          <Router>
            <Site>
              <Switch>
                {
                  routes.map((route, i) => <Route key={i} {...route}/>)
                }
              </Switch>
            </Site>
          </Router>
        </MenuRedux>
      </AppointmentRedux>
    )
  }
}
