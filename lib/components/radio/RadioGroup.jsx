import React, { Component } from 'react';
import Radio from './Radio.jsx';
import './style/RadioGroup.css';

class RadioGroup extends Component {
  componentWillMount() {
    this.childList = this.props.children.map((child, index) => {
      switch(child.type) {
        case Radio: 
          return <Radio
            key = {index}
            {...child.props}
            size = {this.props.size}
            disabled = {this.props.disabled}
            name = {this.props.name || 'wb-default-name'} />;
        case Radio.Button: 
          return <Radio.Button
            key = {index}
            {...child.props}
            size = {this.props.size}
            disabled = {this.props.disabled}
            name = {this.props.name || 'wb-default-name'} />;
        default : return child;
      }
    });
  }

  render() {
    return (
      <div className = "wb-radio-group">
        {this.childList}
      </div>
    );
  }
}

export default RadioGroup;