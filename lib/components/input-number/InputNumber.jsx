import React, { Component } from 'react';
import propTypes from 'prop-types';
import Input from '../input/index.jsx';
import Button from '../button/index.jsx';
import './style/InputNumber.css';

class InputNumber extends Component {
  static propTypes = {
    max: propTypes.number,
    min: propTypes.number,
    step: propTypes.number,
    name: propTypes.string,
    disabled: propTypes.bool,
    size: propTypes.oneOf(['large', 'normal', 'small', 'mini']),
  }

  static defaultProps = {
    step: 1,
    size: 'normal',
    disabled: false,
    defaultValue: 0,
    max: Number.POSITIVE_INFINITY,
    min: Number.NEGATIVE_INFINITY,
  }
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultValue
    };
  }

  /**
   * 防止react绑定value报错
   */
  handleChange = () => {}

  increment = () => {
    let number = + this.state.value + this.props.step;
    if(!isNaN(number) && number >= this.props.min && number <= this.props.max) {
      this.setState({value: number}, () => {
        this.props.onChange && this.props.onChange(this.state.value);
      });
    }
  }

  decrement = () => {
    let number = + this.state.value - this.props.step;
    if(!isNaN(number) && number >= this.props.min && number <= this.props.max) {
      this.setState({value: number}, () => {
        this.props.onChange && this.props.onChange(this.state.value);
      });
    }
  }

  render() {
    return <div className = "wb-input-number">
      <Input
        size = {this.props.size}
        name = {this.props.name}
        value = {this.state.value}
        disabled = {this.props.disabled}
        nativeProps = {{onChange: this.handleChange}}
      />
      <Button.Group>
        <Button size = {this.props.size} disabled = {this.props.disabled} icon = "icon-plus" onClick = {this.increment} />
        <Button size = {this.props.size} disabled = {this.props.disabled} icon = "icon-minus" onClick = {this.decrement} />
      </Button.Group>
    </div>;
  }
}

export default InputNumber;