import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Site from './layouts/site';
import HomePage from './pages/home';
import NotFound from './pages/not-found';

export default class SiteRouter extends Component {
  render () {
    return <Router>
      <Site>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route component={NotFound} />
        </Switch>
      </Site>
    </Router>
  }
}
