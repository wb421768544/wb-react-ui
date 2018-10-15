import React, { Component } from 'react';
import './style/DialogBody.css';

export default class DialogBody extends Component {
  render() {
    return <div className = "wb-dialog-body">
      {this.props.children}
    </div>;
  }
};