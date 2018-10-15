import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style/Radio.css';


class Radio extends Component {
  static propTypes = {
    size: PropTypes.oneOf(['small', 'large', 'normal']),
    name: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    value: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.number,
    ]),
  }

  constructor(props) {
    super(props);
    this.finalProp = Object.assign({}, this.props, {
      defaultChecked: this.props.checked,
      className: this.props.className || '',
    });
    delete this.finalProp.checked;
    delete this.finalProp.children;
  }

  render() {
    return (
    <label className = {`wb-radio-label
      ${this.finalProp.disabled ? 'wb-is-disabled' : ''}
      wb-radio-${this.finalProp.size}-label
    `}>
      <input {...this.finalProp} type="radio" className={`wb-radio-default
        ${this.finalProp.className}
        wb-radio-${this.finalProp.size}
      `} />
      {this.props.children}
    </label>
    );
  }
}

export default Radio;