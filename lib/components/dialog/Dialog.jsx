import React, { Component } from 'react';
import propTypes from 'prop-types';
import './style/Dialog.css';

class Dialog extends Component {
  static propTypes = {
    top: propTypes.string,
    modal: propTypes.bool,
    onOpen: propTypes.func,
    title: propTypes.string,
    closeOnClickModal: propTypes.bool,
    closeOnPressEscape: propTypes.bool,
    onClose: propTypes.func.isRequired,
    size: propTypes.oneOf(['small', 'full', 'large', 'tiny']),
  }

  static defaultProps = {
    title: '',
    top: '15%',
    modal: true,
    size: 'tiny',
    closeOnPressEscape: true,
  }

  constructor(props) {
    super(props);
    this.state = {visible: false};
    this.blockRef = React.createRef();
    this.containerRef = React.createRef();
  }

  handleAnimationEnd = (e) => {
    if(this.blockRef.current !== e.target) {
      return ;
    }
    if(this.containerRef.current.classList.contains('wb-dialog-block-hide')) {
      this.containerRef.current.classList.add('wb-dialog-hide');
    }
    if(this.props.visible) {
      this.props.onOpen && this.props.onOpen();
    }
  }

  componentWillUpdate(nextProps) {
    if(!this.state.visible && nextProps.visible) {
      this.setState({visible: nextProps.visible});
    }
  }

  closeOnClickModal = e => {
    if(e.target === this.containerRef.current) {
      this.props.onClose();
    }
  }

  componentDidMount() {
    if(this.props.closeOnPressEscape) {
      document.documentElement.addEventListener('keydown', e => {
        if(e.keyCode === 27 && this.props.visible) {
          this.props.onClose();
        }
      }, false);
    }
  }

  render() {
    return this.state.visible ?
    <div
      ref = {this.containerRef}
      className = {`
        wb-dialog-container
        ${this.props.visible ? 'wb-dialog-block-show' : 'wb-dialog-block-hide'}
      `}
      onAnimationEnd = {this.handleAnimationEnd}
      onClick = {this.props.closeOnClickModal ? this.closeOnClickModal : null}
    >
      <div
        ref = {this.blockRef}
        style = {{top: this.props.top}}
        className = {`
          wb-dialog-block
          wb-dialog-block-${this.props.size}
        `}
      >
        <div className = "wb-dialog-header">
          <span>{this.props.title}</span>
          <i className = "icon-close" onClick = { () => this.props.onClose() } />
        </div>
        {this.props.children}
      </div>
    </div> :
    null;
  }
}

export default Dialog;