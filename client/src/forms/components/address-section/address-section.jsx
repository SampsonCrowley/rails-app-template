import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BooleanField from 'forms/components/boolean-field'
import TextField from 'forms/components/text-field'
import StateSelectField from 'forms/components/state-select-field'

export default class AddressSection extends Component {
  /**
   * @type {object}
   * @property {String|Element} label - Input Label
   * @property {String} name - Input Name
   * @property {String} valuePrefix - state key prefix of onChange
   * @property {Function} onChange - Run on input change
   * @property {object} contentProps - Passthrough props for main
   * @property {object} headerProps - Passthrough props for header
   * @property {object} values - section input values
   */
  static propTypes = {
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ]),
    name: PropTypes.string.isRequired,
    valuePrefix: PropTypes.string,
    onChange: PropTypes.func,
    contentProps: PropTypes.object,
    headerProps: PropTypes.object,
    values: PropTypes.object,
    required: PropTypes.bool
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
    const {
            label = '', name = '', onChange = (() => {}), values = {}, className = '',
            valuePrefix = name, contentProps: cProps = {}, headerProps: hProps = {},
            id = valuePrefix.replace(/\./g, '_'),
            ...props
          } = this.props,
          { className: headerClassName = '', ...headerProps } = hProps,
          { className: contentClassName = '', ...contentProps } = cProps


    return (
      <section className={`card text-default ${className}`} {...props}>
        <header className={`text-center card-header ${headerClassName}`} {...headerProps}>
          <h3>
            {label}
          </h3>
        </header>
        <main className={`card-body ${contentClassName}`} {...contentProps}>
          <div className={`form-group ${values.is_foreign_validated && 'was-validated'}`}>
            <BooleanField
              topLabel='Address Type'
              label={values.is_foreign ? 'Foreign Address' : 'US Address'}
              name={`${name}[is_foreign]`}
              checked={values.is_foreign}
              toggle={(ev) => onChange(`${valuePrefix}.is_foreign`, !values.is_foreign)}
            />
          </div>
          <div className={`form-group ${values.street_validated && 'was-validated'}`}>
            <TextField
              label='Street'
              id={`${id}_street`}
              name={`${name}[street]`}
              type="text"
              className="form-control"
              value={values.street}
              onChange={(ev) => onChange(`${valuePrefix}.street`, ev.target.value)}
              autoComplete="shipping address-line1"
              required={!!this.props.required}
            />
          </div>
          <div className={`form-group ${values.street_2_validated && 'was-validated'}`}>
            <TextField
              label='Street 2'
              id={`${id}_street_2`}
              name={`${name}[street_2]`}
              type="text"
              className="form-control"
              value={values.street_2}
              onChange={(ev) => onChange(`${valuePrefix}.street_2`, ev.target.value)}
              autoComplete="shipping address-line2"
            />
          </div>
          {
            !!values.is_foreign && (
              <div className={`form-group ${values.street_3_validated && 'was-validated'}`}>
                <TextField
                  label='Street 3'
                  id={`${id}_street_3`}
                  name={`${name}[street_3]`}
                  type="text"
                  className="form-control"
                  value={values.street_3}
                  onChange={(ev) => onChange(`${valuePrefix}.street_3`, ev.target.value)}
                  autoComplete="shipping address-line3"
                />
              </div>
            )
          }
          <div className={`form-group ${values.city_validated && 'was-validated'}`}>
            <TextField
              label='City'
              id={`${id}_city`}
              name={`${name}[city]`}
              type="text"
              className="form-control"
              value={values.city}
              onChange={(ev) => onChange(`${valuePrefix}.city`, ev.target.value)}
              autoComplete="shipping address-level2"
              required={!!this.props.required}
            />
          </div>
          {
            !!values.is_foreign ? (
              <div className={`form-group ${values.province_validated && 'was-validated'}`}>
                <TextField
                  label='Province'
                  id={`${id}_province`}
                  name={`${name}[province]`}
                  type="text"
                  className="form-control"
                  value={values.province}
                  onChange={(ev) => onChange(`${valuePrefix}.province`, ev.target.value)}
                  autoComplete="shipping address-level1"
                  required={!!this.props.required}
                />
              </div>
            ) : (
              <div className={`form-group ${values.street_2_validated && 'was-validated'}`}>
                <StateSelectField
                  label='State'
                  id={`${id}_state_id`}
                  name={`${name}[state_id]`}
                  value={values.state_id}
                  onChange={(option) => onChange(`${valuePrefix}.state_id`, option.value)}
                  viewProps={{
                    className: 'form-control',
                    autoComplete: 'shipping address-level1',
                    required: !!this.props.required,
                  }}
                />
              </div>
            )
          }
          <div className={`form-group ${values.zip_validated && 'was-validated'}`}>
            <TextField
              label='Zip Code'
              id={`${id}_zip`}
              name={`${name}[zip]`}
              type="text"
              className="form-control"
              value={values.zip}
              onChange={(ev) => onChange(`${valuePrefix}.zip`, ev.target.value)}
              autoComplete="shipping postal-code"
              inputMode="numeric"
              required={!!this.props.required}
            />
          </div>
          {
            !!values.is_foreign && (
              <div className={`form-group ${values.country_validated && 'was-validated'}`}>
                <TextField
                  label='Country'
                  id={`${id}_country`}
                  name={`${name}[country]`}
                  type="text"
                  className="form-control"
                  value={values.country}
                  onChange={(ev) => onChange(`${valuePrefix}.country`, ev.target.value)}
                  autoComplete="shipping country"
                  required={!!this.props.required}
                />
              </div>
            )
          }
        </main>
      </section>
    )
  }
}
