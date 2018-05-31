const D1 = Class => {

    //Class没有v0这个属性
    console.log(Class.v0);    //undefined
    Class.v0 = 1;
    return Class;
};

const D2 = Class => {

    //可以获取静态属性
    console.log(Class.v1);    //0
    Class.v1 = 2;
    return Class;
}

const D3 = Class => {
    const f1 = Class.f1;

    //可以获取静态属性，属性为箭头函数
    console.log(f1);    //x => x+1

    Class.f1 = z => f1(z) + 1;
    return Class;
}

const D4 = instance => {

    //当实例为public class field时，无法获取实例属性
    console.log(instance.v2);    //undefined
    instance.v2 = 4;
    return instance;
}

const D5 = instance => {

    //当实例为public class field时，无法获取实例属性
    console.log(instance.f2);    //undefined
    instance.f2 = z => z + 4;
    return instance;
};

const D6 = instance => {
    const f3 = instance.f3;

    //实例方法，可以获取
    console.log(f3);    //x => x+1

    instance.f3 = z => f3(z) + 4;
    return instance;
};

@D1
class A {

    @D2
    static v1 = 0;    //static public class field

    @D3
    static f1 = x => x + 1;    //static public class field

    @D4
    v2 = 0;    //public class field

    @D5
    f2 = x => x + 1;    //public class field

    //You can't attach decorators to a class constructor
    constructor() { }

    @D6
    f3(x) {    //mothod
        return x + 1;
    }
};

console.warn(A.v0);    //1
console.warn(A.v1);    //2
console.warn(A.f1(1));    //3

const a = new A;
console.warn(a.v2);    //4
console.warn(a.f2(1));    //5
console.warn(a.f3(1));    //6