/* 
    整体思路：    
    该问题具有递归性，所以实现中用一个递归函数，依照pattern从array中获取值。
    其中，从pattern获取子模式的时候，由于pattern不是正则的，因此借助一个栈来进行括号匹配。

    用例：
    destructArray([1, [2, 4], 3], '[ a,   [   b  ],  c   ]');
    destructArray([1, [2, [4]], 3], '[  a,[  b,[  c  ],d   ],foo  ]');
*/

// 借助一个下推自动机，获取数组匹配模式中的子模式
const slicePattern = function* (pattern) {
    // 待返回的每一个子模式字符串
    let subPattern = '';

    // 索引
    let i = 0;

    // 栈中用来保存开放左括号
    const stack = [];

    while (true) {
        const current = pattern[++i];
        subPattern += current;

        // 匹配到模式末尾，去掉右括号，作为子模式返回
        if (i === pattern.length - 1) {
            yield subPattern.slice(0, -1).trim();
            return;
        }

        // 遇左括号则入栈
        if (current === '[') {
            stack.push(current);
            continue;
        }

        // 遇右括号则弹栈
        if (current === ']') {
            stack.pop();
            continue;
        }

        // 遇逗号，且空栈，则返回子模式
        if (current === ',' && stack.length === 0) {
            yield subPattern.slice(0, -1).trim();
            subPattern = '';
            continue;
        }
    }
};

// 一个递归函数，用于按pattern解构array
const recursion = (array, pattern, result) => {
    // 获取pattern字符串中的子模式
    const subPatterns = [...slicePattern(pattern)];

    // 遍历子模式进行递归调用
    subPatterns.forEach((subPattern, index) => {
        const element = array[index];

        // 如果子模式仍然是一个数组匹配模式，就递归调用
        if (/^\[.+\]$/.test(subPattern)) {
            recursion(element, subPattern, result);
            return;
        }

        // 否则，将匹配到的值收集起来
        result[subPattern] = element;
    });
};

// 待编写的解构函数
const destructArray = (array, pattern) => {
    const result = {};

    // 调用辅助函数完成
    recursion(array, pattern, result);

    return result;
};

export default destructArray;