import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import './style/index.less';

export default class Icon extends Component{
    static propTypes = {
        type: PropTypes.string,
        size: PropTypes.string
    };

    static defaultProps = {
        size: 'mid'
    };

    constructor (props){
        super(props);
    }

    render() {
        const { type, size } = this.props;
        const iconType = type ? `mb-icon-${size} icon-${type}` : null;

        return (
            <i className={iconType}></i>
        )
    }
}