import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'

export default class TextField extends Component {
  /**
   * @type {object}
   * @property {String|Element} label - Input Label
   * @property {String} id - Input Id
   * @property {String} name - Input Name
   * @property {Function} onChange - Run on input change
   * @property {String} type - Input type
   * @property {(RegExp|Function)} validator - Validate input aginst regex or function
   */
  static propTypes = {
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ]),
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    type: PropTypes.string,
    validator: PropTypes.oneOfType([
      PropTypes.instanceOf(RegExp),
      PropTypes.func
    ])
  }

  constructor(props) {
    if(props.validator instanceof RegExp) {
      const validator = props.validator
      props.pattern = validator
      delete props.validator
    }
    super(props)
  }

  onChange(ev) {
    if(this.props.onChange) this.props.onChange(ev)
    if(this.props.validator) ev.target.setCustomValidity(this.props.validator(ev))
  }

  render(){
    const {label = '', id, name, onChange: _onChange, type, validator: _validator, value, ...props} = this.props
    return (
      <Fragment>
        <label key={id + '.label'} htmlFor={id}>{label}</label>
        <input
          key={id + '.input'}
          name={name}
          id={id || name}
          type={type || 'text'}
          value={value}
          onChange={(ev) => this.onChange(ev)}
          {...props}
        />
      </Fragment>
    )
  }
}
