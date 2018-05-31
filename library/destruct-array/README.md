1. 请实现一个通用的 Array 的解构赋值的方法 destructingArray:

- 可将目标数组 通过 es2015 的解构格式(formater)
- 输出解构结果对象

设计参考：

- 函数名destructingArray
- 参数1是目标数组 targetArray ，类型为 Array
- 参数2是解构格式 formater ， 类型为 string
- 返回值为类型是 {[string]:number} 的对象

例子：

    destructingArray([1,[2,4],3],"[a,[b],foo]")
    // result:
    {a:1,b:2,foo:3}
    
    
    destructingArray([1,[2,[4]],3],"[a,[b,[c],d],foo]")
    // result:
    {a:1,b:2,c:4,d:undefined,foo:3}