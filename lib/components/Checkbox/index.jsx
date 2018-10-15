import React,{ Component } from 'react';
import PropTypes from 'prop-types';

import './style/index.less';

export default class Checkbox extends Component{
    static propTypes = {
        disabled: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        text: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        onChange: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.object
        ])
    };

    /**
     * props 默认值
     */
    static defaultProps = {
        disabled: null,
        text: null,
        onChange: null
    };
    
    constructor(props) {
        super(props);

        /**
         * 将传入　Input 组件的默认　change　事件做为内部状态保留引用
        */
        this.onChange = this.props.onChange;
    }

    checkChangeHandel = (e) => {
        const { handelFieldChange, name } = this.props;
        /**
         * 合并管理　Form 组件内的　Input 与　单独的　Input 的事件
        */
        if(this.onChange){
            this.onChange(e);
        }

        if(handelFieldChange){
            // 使用字符串格式传参，　避免逻辑判断冲突
            const _checked = e.target.checked ? e.target.checked : new String(e.target.checked);

            handelFieldChange(name, _checked);        
        }
    }

    render() {
        const { disabled, text } = this.props;
        const checkboxText = text ? <span className="mb-checkbox-text">{text}</span> : null;

        return (
            <label className="mb-checkbox-ctn">
                <span className="mb-checkbox-box">
                    <input className="mb-checkbox" type="checkbox"  onChange={ this.checkChangeHandel } disabled={ disabled }>
                    </input>
                </span>
                {checkboxText}
            </label>
        )
    }
}