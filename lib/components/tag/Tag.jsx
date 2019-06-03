import React, { Component } from 'react';
import propTypes from 'prop-types';
import './style/Tag.css';


class Tag extends Component {
  static propTypes = {
    color: propTypes.string,
    onClose: propTypes.func,
    closable: propTypes.bool,
    closeTransition: propTypes.bool,
    type: propTypes.oneOf(['default', 'primary', 'gray', 'success', 'warning', 'danger']),
  }

  static defaultProps = {
    type: 'default'
  }

  constructor(props) {
    super(props);
    this.state = {remove: false};
    this.tagRef = React.createRef();
  }

  removeThisTag = () => {
    this.setState({remove: true});
    this.props.onClose && this.props.onClose();
  }

  handleClick = () => {
    this.tagRef.current.classList.add('wb-tag-disapper');
  }

  render() {
    const { remove } = this.state;
    const { closable, children, closeTransition, color, type } = this.props;
    return (!remove && <span
      ref = {this.tagRef}
      onAnimationEnd = {this.removeThisTag}
      className = {'wb-tag wb-tag-' + type}
      style = {{backgroundColor: color}}
    >
      {children}
      {closable && <i
        className = 'icon-close' 
        onClick = {closeTransition ? this.removeThisTag : this.handleClick}
      />}
    </span>);
  }
}

export default Tag;