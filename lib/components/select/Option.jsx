import React, { Component } from 'react';

class Option extends Component {

  constructor(props) {
    super(props);
    this.valueList = [];
    this.ref = React.createRef();
  }

  /**
   * 传递点击元素的内容给父组件
   * 如果是多选，则返回由多个元素内容组成的字符串
   */
  handleClick = e => {
    let index = parseInt(e.target.getAttribute('data-index'), 10);
    if(this.props.options[index].disabled) {
      return e.stopPropagation();
    }
    if(this.props.multiple) {
      e.stopPropagation();
    } else {
      this.valueList = [];
    }
    this.valueList[index] = this.valueList[index] ? '' : e.target.textContent;
    this.props.getValue(this.valueList.join(''));
  }

  componentDidMount() {
    [...this.ref.current.children].forEach(
      li => li.addEventListener('click', this.handleClick, false)
    );
  }

  render() {
    if(this.props.clear) {
      this.valueList = [];
    }
    let optionList = this.props.options.map(
      (item, index) => (
        <li
          value = {item.value}
          data-index = {index}
          key = {item.value || index}
          className = {
            item.disabled ? 'selector-disabled ' : '' + 
            (this.valueList[index] ? 'selector-checked' : '')
          }
        >
          {item.label}
        </li>)
    );
    return <ul
    ref = {this.ref}
    style = {{maxHeight: this.props.maxHeight}}
    className = {`wb-selector-list ${this.props.flag ? 'selector-list-show' : 'selector-list-hidden'}`} >
      {optionList}
    </ul>;
  }

}

export default Option;