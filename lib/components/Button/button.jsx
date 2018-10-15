import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/index.jsx';
import classNames from 'classnames';

import './style/index.less';

export default class Button extends Component {
    /**
     * 检测默认数据类型 propTypes
     */
    static propTypes = {
        type: PropTypes.string,
        size: PropTypes.string,
        children: PropTypes.string,
        /**
         * icon类型默认值为 null
        */
        icon: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object // 默认值类型
        ]),
        onClick:  PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.object
        ])// 父组件传入 eventHandel
    };

    /**
     * 组件内部不维持状态，由props控制
     */
    static defaultProps = {
        type: 'success',
        size: 'mid',
        children: '确定',
        icon: null,
        onClick: null
    };

    constructor (props) {
        super(props);
    }

    render() {
        const { type, size, icon, children } = this.props;
        const buttonClass = classNames({
            [`mb-btn-${size}`]: size,
            [`mb-btn-${type}`]: type,
        });
        /**
         * button-status 是否为 loading ,由 icon 字段决定
        */
        const iconType = (icon == 'loading') ? 'loading' : `${icon}`;
        const disabled = (type == "disabled") ? "disabled" : null;
        const mbIcon = icon ? <Icon type={ iconType } size={ size }/> : null; 

        return (
            <div>
                <button className={ buttonClass } disabled={ disabled }>
                    { mbIcon }{ children }
                </button>
            </div>
        )
    }
}