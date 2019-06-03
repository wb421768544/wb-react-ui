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
    const {
      disabled,
      allowFocus,
      onBlur,
      onFocus,
      onColor,
      offColor,
      onText,
      offText,
      name,
      onValue,
      offValue
    } = this.props;
    const { status } = this.state;


    return <React.Fragment>
      <button
        ref = {this.ref}
        className = {`
          wb-switch
          ${disabled ? 'wb-switch-disabled' : ''}
          ${status ? 'wb-switch-on' : 'wb-switch-off'}
          ${allowFocus ? 'wb-switch-allowFocus' : ''}
        `}
        style = {{
          width: width,
          backgroundColor: status? onColor: offColor
        }}
        onBlur = {allowFocus && onBlur}
        onFocus = {allowFocus && onFocus}
        onClick = {disabled ? null : this.handleClick}
      >
        <span className = "wb-switch-button" />
        <span
          className = "on"
          style = {{display: status ? '': 'none'}}
        >
        {onText}
        </span>
        <span
          className = "off"
          style = {{display: status ? 'none': ''}}
        >
        {offText}
        </span>
      </button>
      <input
        name = {name}
        className = "wb-switch-value"
        onChange = {this.handleChange}
        disabled = {disabled}
        value = {status ? onValue : offValue}
      />
    </React.Fragment>;
  }
}

export default Switch;