const set1 = [1, 2];
const set2 = ['+', '-'];
const set3 = [8, 9];

const sets = [set1, set2, set3];

const product = (sets) => {
  const headSet = sets.shift();

  // 单个集合的笛卡尔积：每个元素变成数组
  if (sets.length === 0) {
    return headSet.map(e => [e]);
  }

  // 递归计算后面 n-1 个集合的笛卡尔积
  const tailProductSets = product(sets);
  const results = [];

  // 计算两个集合的笛卡尔积：把第一个集合的每个元素，放到另外一个集合的元素首位
  for (let i = 0; i < headSet.length; i++) {
    const curElement = headSet[i];
    for (let j = 0; j < tailProductSets.length; j++) {
      const tailSet = tailProductSets[j];
      results.push([curElement, ...tailSet]);
    }
  }

  return results;
};

debugger
const r = product(sets);
debugger