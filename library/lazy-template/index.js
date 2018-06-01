const lazy = (strs,...exprs) =>[strs,...exprs];

// use case 

const a = 1;
const b = 2;

const tag = (strs, ...exprs) => {
    console.log(strs);  // ["","x\yz","uvw", raw:["","x\\yz","uvw"]]
    console.log(exprs);  // [1,2]

    return 123;
};
const r1 = tag`${a}x\\yz${b}uvw`;  // 123

// use `lazy` to convert the template to a lazy result.
const lazyResult = lazy`${a}x\\yz${b}uvw`;

// use lazy to get the finnal result
const r2 = tag(...lazyResult);  // 123