import React, { Component } from 'react';
import propTypes from 'prop-types';
import './style/Alert.css';

class Alert extends Component {

  static propTypes = {
    title: propTypes.string,
    onClose: propTypes.func,
    closable: propTypes.bool,
    description: propTypes.string,
    type: propTypes.oneOf(['success', 'warning', 'info', 'error'])
  };

  static defaultProps = {
    type: 'info',
    closable: true,
  };

  static typeList = ['success', 'info', 'warning', 'error'];
  static classList = ['icon-circle-check', 'icon-msg', 'icon-warning', 'icon-circle-cross'];

  constructor(props) {
    super(props);
    // 是否显示/隐藏元素的标识
    this.state = {show: true};
    this.ref = React.createRef();
  }

  close = () => {
    this.setState({show: false});
    this.props.onClose && this.props.onClose();
  }

  /**
   * 添加wb-hide，消失过度
   */
  handleClick = () => {
    this.ref.current.classList.add('wb-hide');
  }

  render() {
    // 如果传入自定义关闭内容closeText，则使用wb-btn，否则使用默认关闭icon
    const BTN = this.props.closeText ?
    <i className = "wb-btn" onClick = {this.handleClick}>{this.props.closeText}</i> :
    <i className = "icon-close" onClick = {this.handleClick} />;
    // 如果要显示图标，则使用对应样式的图标
    const ICON = this.props.showIcon? <i className = {
      Alert.classList[(Alert.typeList.indexOf(this.props.type))] + ' wb-icon'
    } /> : null;

    return this.state.show ?
    <div
      ref = {this.ref}
      onAnimationEnd = {this.close}
      className = {`
        wb-alert
        wb-alert-${this.props.type}
        ${this.props.showIcon? 'wb-icon-container': ''}
        ${this.props.description? 'wb-alert-description': ''}
      `}
    >
      {ICON}
      {this.props.title}
      {this.props.description? <div>{this.props.description}</div>: null}
      {this.props.closable? BTN: null}
    </div> :
    null;
  }
}

export default Alert;