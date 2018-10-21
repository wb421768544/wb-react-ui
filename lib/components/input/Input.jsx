import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style/Input.css';

class Input extends Component {
  static propTypes = {
    icon: PropTypes.string,
    style: PropTypes.object,
    onChange: PropTypes.func,
    getIconRef: PropTypes.func,
    autosize: PropTypes.object,
    onIconClick: PropTypes.func,
    nativeProps: PropTypes.object,
    type: PropTypes.oneOf(['text', 'textarea']),
    size: PropTypes.oneOf(['large', 'normal', 'small', 'mini']),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }

  static defaultProps = {
    style: {},
    type: 'text',
    size: 'normal',
    nativeProps: {},
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
    this.props.nativeProps.onChange && this.props.nativeProps.onChange(e);
  }

  componentDidMount() {
    if('getIconRef' in this.props) {
      this.props.getIconRef(this.state.iconRef);
    }
  }

  handleWarning() {}

  render() {
    let Comp;
    switch(this.props.type) {
      case 'textarea': Comp = <React.Fragment>
        <div
          onChange = {this.handleWarning}
          {...this.props.nativeProps}
          value = {this.props.value}
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
          onChange = {this.handleWarning}
          {...this.props.nativeProps}
          value = {this.props.value}
          className = {`
            wb-input-default
            ${this.props.className || ''}
          `}
        />
        {this.props.icon ? <i className = {this.props.icon} onClick = {this.props.onIconClick} ref = {this.state.iconRef} /> : null}
      </React.Fragment>;
    }
    return <div
      className = {`wb-input-default-label wb-label-${this.props.size}`}>
      {Comp}
    </div>;
  }
}

export default Input;