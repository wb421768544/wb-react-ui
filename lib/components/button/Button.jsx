import React, { Component } from 'react';
import propTypes from 'prop-types';
import './style/Button.css';

class Button extends Component {
  static defaultProps = {
    size: 'normal',
    type: 'default',
    nativeEvents: {},
    nativeType: 'button',
  }

  static propTypes = {
    onClick: propTypes.func,
    nativeEvents: propTypes.object,
    nativeType: propTypes.oneOf(['button', 'submit', 'reset']),
    size: propTypes.oneOf(['large', 'normal', 'small', 'mini']),
    type: propTypes.oneOf(['primary', 'text', 'default', 'success', 'warning', 'danger', 'info']),
  }

  render() {
    return (
      <button
        {...this.props.nativeEvents}
        onClick = {this.props.onClick}
        type  = {this.props.nativeType}
        className = {`${this.props.icon ? this.props.icon : ''}
          wb-button
          wb-button-${this.props.type}
          wb-button-${this.props.size}
          ${this.props.plain ? 'wb-button-'+ this.props.type + '-plain wb-button-plain': ''}
          ${this.props.disabled ? 'wb-button-'+ this.props.type + '-is-disabled is-disabled': ''}
          ${this.props.plain && this.props.disabled ? 'wb-button-'+ this.type + '-plain-is-disabled is-disabled': ''}
        `}
      >
        {this.props.icon === 'icon-loading' ? <i className="icon-loading" /> : null}
        {this.props.children}
      </button>
    );
  }
}

export default Button;