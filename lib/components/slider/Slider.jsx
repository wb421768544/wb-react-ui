import React, { Component } from 'react';
import propTypes from 'prop-types';
import './style/Slider.css';

class Slider extends Component {
  static propTypes = {
    min: propTypes.number,
    max: propTypes.number,
    step: propTypes.number,
    value: propTypes.number,
    width: propTypes.number,
    disabled: propTypes.bool,
    onChange: propTypes.func,
    vertical: propTypes.bool,
    buttonColor: propTypes.string,
    selectedColor: propTypes.string,
    unselectedColor: propTypes.string,
  };

  static defaultProps = {
    min: 0,
    step: 1,
    max: 100,
    value: 0,
    width: 400,
    disabled: false,
    vertical: false,
  };

  constructor(props) {
    super(props);
    this.state = {tip: ''};
    /**
     * blockRef         整个slider的引用
     * sliderRef        显示进度的部分
     * iptValueRef      隐藏的range表单引用
     * sliderBtnRef     slider按钮引用
     */
    this.blockRef = React.createRef();
    this.sliderRef = React.createRef();
    this.iptValueRef = React.createRef();
    this.sliderBtnRef = React.createRef();
    /**
     * range    取值范围
     * stepPX   1个step对应的像素
     * prevLen  之前sliderBtnRef所在位置，也就是sliderRef的width
     */
    this.range = this.props.max - this.props.min;
    this.stepPX = this.props.step / this.range * this.props.width;
    this.prevLen = Math.round(this.props.value / this.props.step) * this.stepPX;
  }

  handleMouseDown = () => {
    this.sliderBtnRef.current.style.transform = 'scale(1.5, 1.5)';
    const HTML = document.documentElement;
    HTML.addEventListener('mouseup', this.handleMouseUpOnHTML, false);
    HTML.addEventListener('mousemove', this.handleMouseMoveOnHTML, false);
  }

  handleMouseUpOnHTML = () => {
    this.sliderBtnRef.current.style.transform = null;
    const HTML = document.documentElement;
    HTML.removeEventListener('mousemove', this.handleMouseMoveOnHTML, false);
    HTML.removeEventListener('mouseup', this.handleMouseUpOnHTML, false);
  }

  handleMouseMoveOnHTML = e => {
    const slider = this.sliderRef.current;
    let step = Math.round((e.pageX - this.blockRef.current.offsetLeft - slider.offsetWidth) / this.stepPX);
    
    if(Math.abs(step) >= 1) {
      let temp =  this.prevLen + step * this.stepPX;
      if(temp >= 0 && temp <= this.props.width) {
        this.prevLen += step * this.stepPX;
      } else {
        this.prevLen = temp < 0 ? 0 : this.props.width;
      }
      slider.style.width = this.prevLen + 'px';
      const valueRef = this.iptValueRef.current;
      valueRef.dataValue = valueRef.value = this.prevLen / this.props.width * this.range;
      this.props.onChange && this.props.onChange(valueRef.value);
      this.setState({
        tip:  valueRef.value
      });
    }
  }

  handleClick = e => {
    const slider = this.sliderRef.current;
    // 走了几个step
    let step = Math.round((e.pageX - this.blockRef.current.offsetLeft - slider.offsetWidth) / this.stepPX);
    if(Math.abs(step) >= 1) {
      this.prevLen += step * this.stepPX;
      slider.style.width = this.prevLen + 'px';
      const valueRef = this.iptValueRef.current;
      valueRef.value = this.prevLen / this.props.width * this.range;
      this.props.onChange && this.props.onChange(valueRef.value);
      this.setState({
        tip:  valueRef.value
      });
    }
  }

  handleChange() {}

  render() {
    return <React.Fragment>
      <div
        ref = {this.blockRef}
        style = {{
          width: this.props.width + 'px',
          backgroundColor: this.props.unselectedColor,
        }}
        onClick = {this.props.disabled ? null : this.handleClick}
        className = {"wb-slider-block" + (this.props.disabled ? ' wb-slider-disabled' : '')}
      >
        <div
          ref = {this.sliderRef}
          className = "wb-slider"
          style = {{
            width: this.prevLen + 'px',
            backgroundColor: this.props.selectedColor,
          }}
        >
          <span
            data-value = {this.state.tip}
            style = {{
              borderColor: this.props.buttonColor,
              backgroundColor: this.props.buttonColor,
            }}
            ref = {this.sliderBtnRef}
            className = "wb-slider-button"
            onMouseDown = {this.props.disabled ? null :this.handleMouseDown}
          />
        </div>
      </div>
      <input
        type = "range"
        min = {this.props.min}
        max = {this.props.max}
        step = {this.props.step}
        name = {this.props.name}
        ref = {this.iptValueRef}
        onChange = {this.handleChange}
        disabled = {this.props.disabled}
        defaultValue = {this.props.value}
        className = "wb-slider-value"
      />
    </React.Fragment>;
  }
}

export default Slider;