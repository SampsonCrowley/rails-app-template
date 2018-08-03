import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Site from './layouts/site';
import routes from 'routes'
import MenuRedux from './contexts/menu';
import AppointmentRedux from 'contexts/appointment';
import StatesRedux from 'contexts/states';

console.log(routes)

export default class SiteRouter extends Component {
  render () {
    return (
      <AppointmentRedux>
        <StatesRedux>
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
        </StatesRedux>
      </AppointmentRedux>
    )
  }
}
