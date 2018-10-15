import React, { Component } from 'react';
import propTypes from 'prop-types';
import './style/Tooltip.css';

class Tooltip extends Component {

  /**
   * @param {disabled} 是否点击禁用
   * @param {placement} 提示的类型
   * @param {content} 传入的内容
   */
  static propTypes = {
    disabled: propTypes.bool,
    placement: propTypes.oneOf([
      'top-start', 'top', 'top-end',
      'left-start', 'left', 'left-end',
      'right-start', 'right', 'right-end',
      'bottom-start', 'bottom', 'bottom-end'
    ]),
    content: propTypes.oneOfType([propTypes.string, propTypes.node]),
  }

  static defaultProps = {
    placement: 'top',
    disabled: false,
  }

  constructor(props) {
    super(props);
    this.flag = false;
    this.disabled = false;
    this.tipRef = React.createRef();
    this.contentRef = React.createRef();
    this.containerRef = React.createRef();
  }

  handleMouseEnter = () => {
    if(this.disabled) {
      return ;
    }
    let position;
    const TIP = this.tipRef.current;
    if(this.props.placement.includes('top') || this.props.placement.includes('bottom')) {
      position = this.containerRef.current.offsetWidth / 2 + 'px';
      switch(this.props.placement) {
        case 'bottom-start': TIP.style.left = position;break;
        case 'top-start': TIP.style.left = position;break;
        default: TIP.style.right = position;break;
      }
    } else {
      position = this.containerRef.current.offsetHeight / 2 + 'px';
      switch(this.props.placement) {
        case 'right-start': TIP.style.top = position;break;
        case 'left-start': TIP.style.top = position;break;
        default: TIP.style.bottom = position;break;
      }
    }
    this.flag = true;
    this.contentRef.current.style.animation = 'show linear .3s';
    this.contentRef.current.style.display = 'block';
  }

  handleMouseLeave = () => {
    if(this.disabled) {
      return ;
    }
    this.contentRef.current.style.animation = 'hide linear .3s';
    this.flag = false;
  }

  handleAnimationEnd = () => {
    if(!this.flag) {
      this.contentRef.current.style.display = 'none';
    }
  }
  handleClick = () => {
    if(!this.disabled && this.props.disabled) {
      this.handleMouseLeave();
      this.disabled = true;
    }
  }

  render() {
    return <div
      className = "wb-tooltip"
      ref = {this.containerRef}
      onClick = {this.handleClick}
      onMouseEnter = {this.handleMouseEnter}
      onMouseLeave = {this.handleMouseLeave}
    >
      {this.props.children}
      <div
        ref = {this.contentRef}
        onAnimationEnd = {this.handleAnimationEnd}
        className = {`wb-tooltip-${this.props.placement}`}
      >
        {typeof this.props.content === 'string' ? this.props.content.trim() : this.props.content}
        <span ref = {this.tipRef} className = "wb-tip" />
      </div>
    </div>;
  }
}

export default Tooltip;