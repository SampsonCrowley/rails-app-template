import React, { Component } from 'react';
import Atom from 'load-awesome-react-components/dist/ball/atom'
import 'load-awesome-react-components/dist/ball/atom.css'

import Link from 'components/link';

class NotFoundPage extends Component {
  render() {
    return (
      <section>
        <header>
          <h1>
            Page Not Found!
          </h1>
        </header>
        <p>
          Sorry, we couldn't locate the page you are looking for.
        </p>
        <p>
          <Link to="/">Click Here to Return to the Home Page</Link>
        </p>
        <Atom
          className="la-vw-half la-vh-half"
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            color: '#00F',
            margin: '25vh auto'
          }}
        />
      </section>
    );
  }
}

export default NotFoundPage;
