/*
    1. 内容
    页面主流程，包含了最顶层的校验组件Container，它封装了其内部的一切校验逻辑
    Container会自动处理校验相关的事项，唯一需要反馈出来是自身校验是否通过的isPass字段
    外层组件Page也无需关心Container是如何展示错误提示的

    2. 关键点
    （1） onChange事件中，需要重置triggerValidation为false，否则setState会导致componentWillReceiveProps死循环
*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Container from './container.jsx';

class Page extends Component {

    // 字段
    state = {
        triggerValidation: false,
        value: [1, 2, ''],
    };

    // 事件
    // onChange中增加了一个回调参数isPass，用来表示Container组件是否通过了自身的校验
    onChange = async (value, isPass) => {
        console.log(value, isPass);

        // 为了防止子组件componentWillReceiveProps死循环，这里要重置triggerValidation为false
        this.setState({
            triggerValidation: false,
        });
    };

    onClick = () => {

        // 通过设置triggerValidation为true，手动触发校验
        this.setState({
            triggerValidation: true,
        });
    };

    // 生命周期函数
    render = () => {
        const {
            // 字段
            state: { triggerValidation, value },

            // 事件
            onChange, onClick,
        } = this;

        return (
            <div>
                <Container value={value} onChange={onChange} triggerValidation={triggerValidation} />
                <input type="button" onClick={onClick} value="click" />
            </div>
        );
    };
}

ReactDOM.render(
    <Page />,
    document.querySelector('#root')
);