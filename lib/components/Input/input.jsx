import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon/index.jsx';

import './style/index.less';

const defHandel = () => {};

export default class Input extends Component {
    static defaultProps = {
        type: 'text',
        size: 'mid',
        tips: '',
        placeholder: '',
        addonPre: null,
        name: null,
        onChange: defHandel,
        onBlur: defHandel,
        onFocus: defHandel,
        isValidate: defHandel // 用于　Input 校验
    }

    static propTypes = {
        type: PropTypes.string,
        size: PropTypes.string,
        placeholder: PropTypes.string,
        addonPre: PropTypes.object,
        name: PropTypes.string,
        tips: PropTypes.string, // input 输入校验错误　tips 提示
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
        isValidate: PropTypes.func
    }

    filedChangeHandel = (e) => {
        const { handelFieldChange, isValidate, name } = this.props;

        /**
         * 合并管理　Form 组件内的　Input 与　单独的　Input 的事件
        */
        if(this.onChange){
            this.onChange(e);
        }

        /**
         * name 字段在　Form　中的　Input组件中为必须字段
         * 单独调用　Input 不涉及执行此回调函数，不需　name 字段
        */
        if(name){
            // 执行输入校验
            if(isValidate(e)){
                handelFieldChange(name, e.target.value);                        
                this.setState({
                    isError: false
                });
            }else{
                // 触发　Error tips 提示
                this.setState({
                    isError: true
                });
            }
        }
    }

    constructor (props) {
        super(props);

        /**
         * 将传入　Input 组件的默认　change　事件做为内部状态保留引用
        */
        this.onChange = this.props.onChange;

        this.state = {
            isError: false // 组件内部状态
        };
    }

    render() {
        const { type, size, placeholder, addonPre, tips } = this.props;

        const inputState = classNames({
            [`mb-input-${size}`]: size,
        });
        const inputClass = 'mb-input ' + inputState;
        const inputPreClass = `mb-inputPre inputPre-${size}`;
        /**
         * input 输入框时候携带前缀默认值
         */
        const inputPre = addonPre ? <span className= {inputPreClass}>{ addonPre }</span> : null; 
        
        /**
         * input 内嵌Icon
        */
        const prefix = this.props.prefix ? <span className="mb-input-prefix">{ this.props.prefix }</span> : null; 

        /**
         * input 输入校验的错误　tips
        */
        const elTips = this.state.isError ? <span className="mb-input-tips">{ tips }</span>　: null;

        return (
            <div>
                <div className='mb-input-container'>
                    { inputPre }
                    { prefix }
                    <input className = { inputClass } type = { type } onChange = { this.filedChangeHandel } placeholder={ placeholder }>
                    </input>
                </div>
                { elTips }
            </div>
        )
    }
}