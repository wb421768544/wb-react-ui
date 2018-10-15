import React, { Component } from 'react';
import './style/ButtonGroup.css';

class ButtonGroup extends Component {
  render() {
    return (
      <div className = {`
        wb-button-group
        ${this.props.disabled ? ' wb-button-group-disabled' : ''}
      `}>
        {this.props.children}
      </div>
    ); 
  }
}

export default ButtonGroup;