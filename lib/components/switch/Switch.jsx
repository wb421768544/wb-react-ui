import React, { Component } from 'react';
import propTypes from 'prop-types';
import './style/Switch.css';

class Switch extends Component {
  static defaultProps = {
    allowFocus: true,
    value: false,
    disabled: false,
  }

  static propTypes = {
    value: propTypes.bool,
    name: propTypes.string,
    onBlur: propTypes.func,
    onFocus: propTypes.func,
    width: propTypes.string,
    onChange: propTypes.func,
    disabled: propTypes.bool,
    onText: propTypes.string,
    offText: propTypes.string,
    onColor: propTypes.string,
    offColor: propTypes.string,
    allowFocus: propTypes.bool,
    onValue: propTypes.oneOfType([propTypes.bool , propTypes.string , propTypes.number]),
    offValue: propTypes.oneOfType([propTypes.bool , propTypes.string , propTypes.number])
  }

  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {status: !this.props.value};
  }
  /**
   * 因为是button来充当switch的载体，所以避免button在form中的默认行为
   */
  handleClick = (e) => {
    e && e.preventDefault();
    let status = this.props.disabled? this.state.status: !this.state.status;
    this.setState(
      {status},
      () => {
        this.ref.current.children[0].style = `left:${this.state.status ? this.left: 2}px`;
        if(typeof this.props.onChange === 'function') {
          let arg;
          if(this.props.onValue && this.props.offValue) {
            arg = this.state.status ? this.props.onValue : this.props.offValue;
          } else {
            arg = this.state.status;
          }
          this.props.onChange(arg);
        }
      }
    );
  }
  /**
   * 防止绑定input的value时，react提示警告信息
   */
  handleChange() {}

  componentDidUpdate(prevProps) {
    if(prevProps.width !== this.props.width) {
      this.updateLeft();
    }
  }

  componentDidMount() {
    this.updateLeft();
  }

  updateLeft() {
    let btnWidth = window.getComputedStyle(this.ref.current.children[0]).width;
    let containerWidth = window.getComputedStyle(this.ref.current).width;
    this.left = parseInt(containerWidth, 0) - parseInt(btnWidth, 0) - 2;
    this.handleClick();
  }

  render() {
    return <React.Fragment>
      <button
        ref = {this.ref}
        className = {`
          wb-switch
          ${this.props.disabled ? 'wb-switch-disabled' : ''}
          ${this.state.status ? 'wb-switch-on' : 'wb-switch-off'}
          ${this.props.allowFocus ? 'wb-switch-allowFocus' : ''}
        `}
        style = {{
          width: this.props.width,
          backgroundColor: this.state.status? this.props.onColor: this.props.offColor
        }}
        onBlur = {this.props.allowFocus && this.props.onBlur}
        onFocus = {this.props.allowFocus && this.props.onFocus}
        onClick = {this.props.disabled ? null : this.handleClick}
      >
        <span className = "wb-switch-button" />
        <span
          className = "on"
          style = {{display: this.state.status ? '': 'none'}}
        >
        {this.props.onText}
        </span>
        <span
          className = "off"
          style = {{display: this.state.status ? 'none': ''}}
        >
        {this.props.offText}
        </span>
      </button>
      <input
        name = {this.props.name}
        className = "wb-switch-value"
        onChange = {this.handleChange}
        disabled = {this.props.disabled}
        value = {this.state.status ? this.props.onValue : this.props.offValue}
      />
    </React.Fragment>;
  }
}

export default Switch;