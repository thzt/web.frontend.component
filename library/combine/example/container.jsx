/*
    1. 内容
    本文件中实现了一个Container组件，
    它采用分离的方式编写，Container和checkValue分开，
    最终再使用combine将它们组合到一起。

    2. 关键点
    （1） onChange必须是一个async 函数以支持异步校验
    （2） Container组件约定写法如下
        组件需要 componentWillReceiveProps
        组件的onChange中需要调用父组件props 的onChange
        组件的校验结果从props的validation中获取
        手动将props中的triggerValidation向下传递
*/

import React, { Component } from 'react';

import combine from '../util/combine.jsx';
import Element from './element.jsx';

// 一个async 校验函数，入参为当前组件的value对象，返回结果类型为{isPass,message}
const checkValue = async v => {
    const [a, b, c] = v;
    console.log(`container check value: ${v}`);

    if (a <= b) {
        return {
            isPass: false,
            message: 'a must be more than b',
        };
    }

    return {
        isPass: true,
        message: null,
    };
};

// 一个约定写法的组件，已经校验逻辑从这个组件中分离出去
// 1. 组件需要 componentWillReceiveProps
// 2. 组件的onChange中需要调用父组件props 的onChange
// 3. 组件的校验结果从props的validation中获取
class Container extends Component {

    // 字段
    state = {

        // 字段只需要关注value即可，不需要关注校验
        value: this.props.value,
    };

    // 事件
    // 这里必须是一个async 函数，以支持异步校验
    onChange = async (value, index) => {
        const {
            state: { value: valueState },
            props: { onChange },
        } = this;

        // 获取该组件的value对象
        // 这里直接改state可能是有问题的，实际上需要重新组装出一个value对象
        valueState[index] = value;

        // 使用组件的value对象调用父组件props传入的onChange
        // 这里会自动触发校验
        await onChange(valueState);
    };

    // 生命周期函数

    componentWillReceiveProps = nextProps => this.setState(nextProps);

    render = () => {
        const {
            // 字段
            state: { value },

            // 从props 中获取校验结果，用于展示错误提示
            props: { validation: { isPass, message }, triggerValidation },

            // 事件
            onChange,
        } = this;

        return (
            <div>
                {/* 用三个Element来模拟，一个Container中有多个字段需要校验 */}
                {/* 需要将props中的triggerValidation手动向下传递 */}
                <Element value={value[0]} onChange={value => onChange(value, 0)} triggerValidation={triggerValidation} />
                <Element value={value[1]} onChange={value => onChange(value, 1)} triggerValidation={triggerValidation} />
                <Element value={value[2]} onChange={value => onChange(value, 2)} triggerValidation={triggerValidation} />

                <span>{isPass ? null : message}</span>
            </div>
        );
    };
}

export default combine(Container, checkValue);