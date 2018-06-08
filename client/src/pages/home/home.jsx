import React, { Component } from 'react';
import Ball from 'load-awesome-react-components/dist/ball'

class HomePage extends Component {
  render() {
    return (
      <div className="Site-intro" style={{height: '1000vh'}}>
        <Ball.Atom
          style={{
            height: '1000px',
            width: '1000px',
            maxHeight: '50vh',
            maxWidth: '100vw',
            marginLeft: 'auto',
            marginRight: 'auto',
            color: '#00F',
          }}
        />
      </div>
    );
  }
}

export default HomePage;
