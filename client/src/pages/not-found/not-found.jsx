import React, { Component } from 'react';

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
      </section>
    );
  }
}

export default NotFoundPage;
