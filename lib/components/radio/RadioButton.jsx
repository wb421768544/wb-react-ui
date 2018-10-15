import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radio from './Radio.jsx';
import './style/RadioButton.css';

class RadioButton extends Component {
  static propTypes = {
    children: PropTypes.string
  }

  render() {
    const finalProp = Object.assign({}, this.props, {
      'data-inner': this.props.children
    });
    delete finalProp.children;
    return (
      <Radio className = "wb-radio-button" {...finalProp} />
    );
  }
}

export default RadioButton;