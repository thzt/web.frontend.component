import fnCreator from './fncreator';

// case 1
let func1=fnCreator({
    params:['x','y'],
    body:`
        console.log(this,x,y);
    `
});

func1(1,2);

// --------
// case 2
let func2=fnCreator({
    params:['x','y'],
    body:`
        console.log(this,x,y,a,b);
    `,
    identifiers:['a','b'],
    values:[3,4]
});

let obj=new Date;

func2.call(obj,1,2);