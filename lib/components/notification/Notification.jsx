import React, { Component } from 'react';
import propTypes from 'prop-types';
import './style/Notification.css';

class Notification extends Component {

  static propTypes = {
    title: propTypes.string,
    onClose: propTypes.func,
    onClick: propTypes.func,
    offset: propTypes.number,
    message: propTypes.string,
    duration: propTypes.number,
    type: propTypes.oneOf(['success', 'warning', 'info', 'error'])
  };

  static defaultProps = {
    duration: 4500
  };

  static typeList = ['success', 'info', 'warning', 'error'];
  static classList = ['icon-circle-check', 'icon-msg', 'icon-warning', 'icon-circle-cross'];


  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  handleClick = () => {
    this.ref.current.classList.add('wb-notification-hide');
    if(this.clear) {
      clearTimeout(this.clear);
    }
  }

  handleMouseEnter = () => {
    if(this.clear) {
      clearTimeout(this.clear);
    }
  }

  handleMouseLeave = () => {
    this.autoClose();
  }

  componentDidMount() {
    this.autoClose();
  }

  autoClose() {
    if(this.props.duration) {
      this.clear = setTimeout(() => {
        this.handleClick();
      }, this.props.duration);
    }
  }

  render() {
    let iconClass = this.props.type? 'wb-' + this.props.type + '-notication': '';
    const ICON = this.props.type? <i className = {
      Notification.classList[(Notification.typeList.indexOf(this.props.type))] + ' wb-icon'
    } /> : null;

    return <div
      className = {`
        wb-notication-block
        ${iconClass}
      `}
      onClick = {this.props.onClick}
      onAnimationEnd = {this.props.onClose}
      onMouseEnter = {this.handleMouseEnter}
      onMouseLeave = {this.handleMouseLeave}
      ref = {this.ref}
    >
      <h2>{this.props.title}</h2>
      <p>{this.props.message}</p>
      <i className = "icon-close" onClick = {this.handleClick} />
      {ICON}
    </div>;
  }
}

export default Notification;