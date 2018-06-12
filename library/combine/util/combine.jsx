import React, { Component } from 'react';

// 一个高阶函数，将一个普通写法的Comp，包装成内置校验功能的组件
// Comp 是一个React 组件
// checkValue 是一个async函数，返回结果类型为{isPass,message}
const combine = (Comp, checkValue) => class extends Component {

    // 字段
    state = {
        value: this.props.value,
        validation: {
            isPass: false,
            message: null,
        },
        triggerValidation: false,
    };

    // 事件

    // onChange需要是一个async 函数，以支持异步校验
    onChange = async value => {
        const {
            props: { onChange },
        } = this;

        const validation = await checkValue(value);

        this.setState({
            value,
            validation,
        });

        await onChange(value, validation.isPass);
    };

    // 生命周期函数

    // 父组件如果setState({triggerValidation:true})，则自动触发校验
    // 应用于表单提交按钮点击的时候
    componentWillReceiveProps = async nextProps => {
        this.setState(nextProps);

        // 父组件传入的onChange props中会setState，而导致componentWillReceiveProps再次被调用
        // 因此父组件，需要setState({triggerValidation:false})，以避免死循环
        if (!nextProps.triggerValidation) {
            return;
        }

        const {
            state: { value },
            props: { onChange },
        } = this;

        // 获取校验结果
        const validation = await checkValue(value);

        this.setState({
            value,
            validation,
        });

        // 触发父组件传来的props中的onChange事件，
        // 该事件中如果setState，则会导致componentWillReceiveProps再次被调用
        await onChange(value, validation.isPass);
    };

    render = () => {
        const {
            // 字段
            state: { value, validation, triggerValidation },

            // 事件
            onChange,
        } = this;

        // 向原始组件Comp 多传入一个validation={isPass,message}属性
        // 原始组件Comp中，通过validation属性，获取校验结果，用于展示错误提示

        // 向原始组件中多传入一个triggerValidation属性，用于手动触发该组件进行校验
        return (
            <Comp
                value={value} onChange={onChange}
                validation={validation} triggerValidation={triggerValidation}
            />
        );
    };
};


export default combine;