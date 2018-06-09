import React, { Component } from 'react';
import Atom from 'load-awesome-react-components/dist/ball/atom'
import 'load-awesome-react-components/dist/ball/atom.css'

class HomePage extends Component {
  render() {
    return (
      <div className="Site-intro" style={{height: '1000vh'}}>
        <Atom
          className='la-vh'
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            color: '#00F',
            zIndex:0
          }}
        />
      </div>
    );
  }
}

export default HomePage;
