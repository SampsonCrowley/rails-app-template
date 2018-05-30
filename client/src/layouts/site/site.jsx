import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Header from 'components/header';
import './site.css';

class Site extends Component {
  static propTypes = {
    children: PropTypes.any
  }

  constructor(props){
    super(props)
    this.state = {
      navClass: 'nav-unstuck',
      delay: 10,
      height: 0
    }
  }

  componentDidMount(){
    this.bindScroll()
  }

  componentWillUnmount(){
    this.unbind()
  }

  unbind = () => {
    window.removeEventListener('scroll', this.state.scrollListener)
  }

  bindScroll = (delay = 10, unbind = false) => {
    unbind && this.unbind()
    const scrollListener = debounce(this.handleScroll(), delay)
    window.addEventListener('scroll', scrollListener)
    this.setState({scrollListener, delay})
  }

  handleScroll = () => {
    return () => {
      const height = this.state.height || Math.max(document.documentElement.clientHeight, window.innerHeight || 0) / 4
      console.log('SCROLL', height, window.scrollY, (this.state.delay > 10), (window.scrollY < (height * 2)))
      if((this.state.navClass === 'nav-unstuck') && (window.scrollY > height)) this.setState({navClass: 'nav-stuck'})
      else if((this.state.navClass === 'nav-stuck') && (window.scrollY < (height + 1))) this.setState({navClass: 'nav-unstuck'})

      if((this.state.delay < 400) && (window.scrollY > (height * 4))) this.bindScroll(400, true)
      else if((this.state.delay > 200) && (window.scrollY < ((height * 4) + 1))) this.bindScroll(200, true)
      else if((this.state.delay < 200) && (window.scrollY > (height * 2))) this.bindScroll(200, true)
      else if((this.state.delay > 10) && (window.scrollY < ((height * 2) + 1))) this.bindScroll(10, true)
    }
  }

  render() {
    return (
      <section className="Site">
        <Header navClass={this.state.navClass} heightRef={(height) => this.setState({height})}/>
        <main className="Site-main">
          {this.props.children}
        </main>
      </section>
    );
  }
}

export default Site;
