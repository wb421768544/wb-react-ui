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
    return !this.state.remove ?
    <span ref = {this.tagRef}
    onAnimationEnd = {this.removeThisTag}
    className = {'wb-tag wb-tag-' + this.props.type}
    style = {{
      backgroundColor: this.props.color
    }}>
      {this.props.children}
      {
        this.props.closable ?
        <i onClick = {this.props.closeTransition ?
        this.removeThisTag : this.handleClick} className = 'icon-close' /> :
        null
      }
    </span> :
    null;
  }
}

export default Tag;