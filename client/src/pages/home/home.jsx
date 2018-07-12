import React, { Component } from 'react';

import './home.css'

class HomePage extends Component {
  render() {
    return (
      <div className="HomePage">
        <h3>
          Here, will be a quick summary of what needs to be done today
        </h3>
        <hr/>
        <h4>
          This page can be cutomized to default to whatever will be most convenient to your team
        </h4>
      </div>
    );
  }
}

export default HomePage;
