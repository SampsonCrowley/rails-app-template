import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Ball } from 'load-awesome-react-components'

export default class DisplayOrLoading extends Component {
  static propTypes = {
    children: PropTypes.node,
    display: PropTypes.bool.isRequired,
    childClassName: PropTypes.string,
    childStyle: PropTypes.object,
    message: PropTypes.string
  }

  /**
   * Render Display Loading SVG unless complete
   *
   * @returns {ReactElement} markup
   */
  render() {
    const {children, display, childStyle = {}, childClassName = '', message = 'SUBMITTING...'} = this.props
    return display ? (
      <Fragment>
        { children }
      </Fragment>
    ) : (
      <div style={{display: (display ? 'none' : 'block'), width: '100%'}}>
        <h1 className='text-center'>
          {message}
        </h1>
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
    )
  }
}
