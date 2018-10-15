import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style/index.less';

const defHandel = () => {

};

export default class FormItem extends Component{
    static defaultProps = {
        handelFieldChange: defHandel
    }

    static propTypes = {
        handelFieldChange: PropTypes.func
    }

    constructor(props){
        super(props);
    }


    /**
     * emitHandel 传递回调函数 handel 至目标组件
     * @param [ children , eventhandle ]
     * @returns new children element(type == Array) ||　null
     */
    emitHandel(children,handelFieldChange) {
        /**
         * 判断父组件是否传入子组件
        */
        if(React.Children.count == 0){
            return null;
        }
      
        return React.Children.map(children,(el,k)=> {
            /**
             * Form组件内部子组件由 FormItem 包裹
             * 获取　FormItem 的子组件进行　clone 处理
             * clone element 传递父组件　eventhandle
            */
            if(React.isValidElement(el)){
                const _element = el;

                return React.cloneElement(_element,{
                    key: k,
                    handelFieldChange
                });
            }else{
                return null;
            }
        });
    }

    render(){
        /**
         * Form　组件下发默认　handel ，传递给表单目的组件进行事件注册
         */
        const children = this.emitHandel(this.props.children,this.props.handelFieldChange);

        return (
            <div className="formItem">
                { children }
            </div>
        )
    }
}