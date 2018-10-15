import React, { Component } from 'react';
import propTypes from 'prop-types';
import './style/Input.css';

class Input extends Component {
  static propTypes = {
    icon: propTypes.string,
    style: propTypes.object,
    autosize: propTypes.object,
    name: propTypes.string,
    type: propTypes.oneOf(['text', 'textarea']),
    size: propTypes.oneOf(['large', 'normal', 'small', 'mini']),
  }

  static defaultProps = {
    style: {},
    type: 'text',
    size: 'normal',
    autosize: {minRows: 3, maxRows: 20},
  }

  constructor(props) {
    super(props);
    this.state = {
      minRows: this.props.autosize.minRows,
      maxRows: this.props.autosize.maxRows,
      iconRef: React.createRef()
    };
    this.textareaRef = React.createRef();
  }

  handleInput = (e) => {
    this.textareaRef.current.value = e.target.innerHTML;
    this.props.onChange && this.props.onChange(e);
  }

  render() {
    let Comp;
    switch(this.props.type) {
      case 'textarea': Comp = <React.Fragment>
        <div
          {...this.props}
          rows = {this.state.minRows}
          onInput = {this.handleInput}
          data-placeholder = {this.props.placeholder}
          contentEditable = {!this.props.disabled}
          style = {{
            maxHeight: this.state.maxRows * 2 + 'em',
            minHeight: this.state.minRows * 2 + 'em',
            ...this.props.style,
          }}
          className = {`
            wb-input-default
            wb-input-textarea
            ${this.props.className || ''}
            ${this.props.disabled && 'wb-textarea-disabled'}
          `}
        />
        <textarea 
          ref = {this.textareaRef}
          className = "copy-textarea"
          name = {this.props.name}
        />
      </React.Fragment>;
      break;
      default : Comp = <React.Fragment>
        <input
          {...this.props}
          className = {`
            wb-input-default
            ${this.props.className || ''}
          `}
        />
        {this.props.icon ? <i className = {this.props.icon} ref = {this.state.iconRef} /> : null}
      </React.Fragment>;
    }
    return <div
      className = {`wb-input-default-label wb-label-${this.props.size}`}>
      {Comp}
    </div>;
  }
}

export default Input;