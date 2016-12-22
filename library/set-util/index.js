const isSubset = (smallSet, bigSet) => smallSet.every(x => bigSet.includes(x));

const isEqual = (smallSet, bigSet) => isSubset(smallSet, bigSet) && isSubset(bigSet, smallSet);

const isIntersecting = (smallSet, bigSet) => smallSet.some(x => bigSet.includes(x));

const setUtil = {
    isSubset,
    isEqual,
    isIntersecting
};

export default setUtil;