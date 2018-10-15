import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input/index.jsx';
import Button from '../Button/index.jsx';
import Checkbox from '../Checkbox/index.jsx';
import Icon from '../Icon/index.jsx';

import './style/index.less';

export default class Form extends Component{
    static propTypes = {

    };

    static defaultProps = {

    };

    constructor(props){
        super(props);

        this.tempFormData = []; // 设置全局的临时　FormData 保存表单数据
        this.state = {
            formData: []
        };
    }

    componentDidMount() {
        /**
         * 表单数据请求 eventhandel 处理
        */
    }

    componentWillReceiveProps() {
        /**
         * 接收新的　props ，在此对　formData 进行赋值处理
        */
        
    }   

    // shouldComponentUpdate() {
        
    // }

    /**
     * initHandel 注册默认回调事件，传递子组件的 data 给父组件
     * @param children
     * @returns new children element(type == Array) ||　null
     */
    initHandel(children) {
        /**
         * 判断父组件是否传入子组件
        */
        if(React.Children.count == 0){
            return null;
        }

        /**
         * 子组件遍历注册 回调事件 并克隆传递给父组件
         * 支持同一个 FormItem　下多个　Input　的注册
         */
        const handelFieldChange = this.handelFieldChange;

        return React.Children.map(children,(el,k)=> {
            /**
             * Form组件内部子组件由 FormItem 包裹
             * clone element 注册　eventhandle 下发至　FormItem
            */
            if(React.isValidElement(el)){
                const _element = el;
                const name = el.props.children.props.name;
                /**
                 * 以表单元素持有的　name 属性和值做键值对保存
                */
                if(name){
                    this.tempFormData.push({name: name});
                }

                return React.cloneElement(_element,{
                    key: k,
                    handelFieldChange
                });
            }else{
                return null;
            }
        });
    }

    /**
     * element 绑定默认回调函数，事件触发之后，返回所需值给父组件
     * @param formData && itemName && itemValue
     * @returns formData
    */
    handelFieldChange = (name, fielddata) => {　
        /**
         * 接收 Form 组件触发 change　事件后返回的　value
         *　在此完成对应组件　fileddata 的校验 
        */
        if(name && fielddata){
            // 处理复选框传值问题　
            if(fielddata == 'false'){
                fielddata = !new Boolean(fielddata);
            }

            let _set = new Set(this.tempFormData);
            
            _set.forEach((item,k) => {
                if(item.name == name){
                    item.value = fielddata;
                }
            })
            
            this.tempFormData = Array.from(_set);  
        }
    }

    render() {
        const children = this.initHandel(this.props.children);
        return (
            <form>
                { children }
            </form>
        )
    }
}