import React, { Component } from 'react';
import propTypes from 'prop-types';
import Option from './Option.jsx';
import Input from '../input/index.jsx';
import './style/Select.css';

class Select extends Component {

  /**
   * options必须是元素为{value: '', label: ''}的数组
   * size 在input中已经规定过取值，在此不再重复
   * 
   */
  static propTypes = {
    options: propTypes.array,
    disabled: propTypes.bool,
    clearable: propTypes.bool,
    multiple: propTypes.bool,
    maxHeight: propTypes.string,
    placeholder: propTypes.string,
  };

  static defaultProps = {
    clearable: true,
    multiple: false,
    maxHeight: '310px',
    placeholder: '请选择',
    options: [],
  };

  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.iconRef = React.createRef();
    this.state = {
      value: '',
      flag: false,
      icon: 'icon-caret-bottom',
    };
  }

  handleClick = e => {
    if(this.props.disabled) {
      return ;
    }
    let classList = this.ref.current.classList;
    this.setState({
      flag: !this.state.flag
    }, () => {
      if(this.state.flag) {
        classList.add('wb-selector-focus');
        classList.remove('wb-selector-blur');
      } else {
        classList.add('wb-selector-blur');
        classList.remove('wb-selector-focus');
      }
    });
    e.stopPropagation();
  }

  componentDidMount() {
    const iconRef = this.iconRef.current.state.iconRef.current;
    this.ref.current.addEventListener('click', this.handleClick, false);
    document.documentElement.addEventListener('click', this.handleClickOnHTML, false);
    if(this.props.clearable) {
      iconRef.addEventListener('click', this.handleClickOnIcon, false);
      iconRef.addEventListener('mouseenter', this.handleMouseEnter, false);
      iconRef.addEventListener('mouseout', this.handleMouseOut, false);
    }
  }

  handleClickOnIcon = (e) => {
    if(!this.state.value) {
      return ;
    }
    this.setState({value: ''});
    e.stopPropagation();
  }

  handleClickOnHTML = () => {
    if(this.state.flag) {
      this.ref.current.classList.add('wb-selector-blur');
      this.ref.current.classList.remove('wb-selector-focus');
      this.setState({flag: false});
    }
  }

  handleMouseEnter = () => {
    if(this.state.value) {
      this.setState({icon: 'icon-circle-close'});
    }
  }
  handleMouseOut = () => {
    this.setState({icon: 'icon-caret-bottom'});
  }

  render() {
    const {size, disabled, maxHeight, options, multiple, placeholder} = this.props;
    return <div
      ref = {this.ref}
      className = {`wb-selector ${disabled ? 'selector-container-disabled' : ''}`}
    >
      <Input
        ref = {this.iconRef}
        {...{size, disabled}}
        icon = {this.state.icon}
        value = {this.state.value}
        placeholder = {placeholder}
        onChange = {this.handleChange}
        style = {{color: 'transparent', textShadow: '0 0 0 black'}}
      />
      <Option
        flag = {this.state.flag}
        clear = {this.state.value === ''}
        {...{maxHeight, options, multiple}}
        getValue = {(value) => this.setState({value})}
      />
    </div>;
  }

  handleChange() {}

}

export default Select;