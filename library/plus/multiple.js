const convertToNumberArray = s => s.split('').map(i => +i);

const plus = (xs, ys) => {
    const xsLength = xs.length;
    const ysLength = ys.length;
    const maxLength = Math.max(xsLength, ysLength);

    const result = [];
    let flag = 0;
    for (let i = 0; i < maxLength; i++) {
        const xIndex = xsLength - 1 - i;
        const yIndex = ysLength - 1 - i;

        const xElement = xIndex < 0 ? 0 : xs[xIndex];
        const yElement = yIndex < 0 ? 0 : ys[yIndex];

        const sumResult = xElement + yElement + flag;
        const remainder = sumResult % 10;
        const quotient = Math.floor(sumResult / 10);

        flag = quotient;
        result.unshift(remainder);
    }

    // 进位
    if (flag != 0) {
        result.unshift(flag);
    }

    return result;
};

const multiple = (xs, ys) => {
    const xsLength = xs.length;
    const ysLength = ys.length;

    let result = [];
    for (let i = 0; i < ysLength; i++) {
        const yIndex = ysLength - 1 - i;
        const yElement = ys[yIndex];

        // 多位数乘以一位数
        const r = [];
        let flag = 0;
        for (let j = 0; j < xsLength; j++) {
            const xIndex = xsLength - 1 - j;
            const xElement = xs[xIndex];

            const multipleResult = xElement * yElement + flag;
            const remainder = multipleResult % 10;
            const quotient = Math.floor(multipleResult / 10);

            flag = quotient;
            r.unshift(remainder);
        }

        // 进位
        if (flag != 0) {
            r.unshift(flag);
        }

        // 后面补0
        for (let k = 0; k < i; k++) {
            r.push(0);
        }

        result = plus(result, r);
    }

    return result;
};

const pow = (xs, ys) => {

};

const a = plus([9, 9, 9], [9, 9]);
console.log(a);

const b = multiple([9, 9, 9], [9, 9]);
console.log(b);