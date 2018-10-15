import React, { Component } from 'react';
import './style/DialogFooter.css';

export default class DialogFooter extends Component {
  render() {
    return <div className = "wb-dialog-footer">
      {this.props.children}
    </div>;
  }
};