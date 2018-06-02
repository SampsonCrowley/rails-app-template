import React, { Component } from 'react';
import {Ball} from 'load-awesome-react-components'

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
        <Ball.Atom
          style={{
            height: '500px',
            width: '500px',
            maxHeight: '100vh',
            maxWidth: '100vw',
            marginLeft: 'auto',
            marginRight: 'auto',
            color: '#00F',
          }}
        />
      </section>
    );
  }
}

export default NotFoundPage;
