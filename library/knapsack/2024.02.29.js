// 容量
const C = 4;

// 价值
const v = [3, 2, 1.5];
// 重量
const w = [4, 3, 1];

// 物品数
const N = v.length;

/**
 * 维护一个 dp 数组 dp[item][capacity]，逐行计算：只能拿 0~item 个物品，且背包容量为 capacity 时，价值的最大值
 * 1. 只能拿一个物品时，dp[0] 容易填入
 * 2. 依次加入后续物品时，需要判断这个物品 放入 还是 不放入 价值更大
 *   不放入：最大价值就是 dp[item-1][capacity]，即 0~item-1 这些物品所能放入的最大价值
 *   放入：放入后背包会缩小。总价值为当前物品的价值，加上因此缩小的背包 能装入物品的最大价值 value+dp[0~item][capacity-weight]
 * 
 * 3. 最终 0~item 这些物品，容量为 c 的背包，最大价值为 dp[N-1][C]
 */
const main = () => {

  // 初始化 dp 二维数组（物品*容量）
  // dp[item][capacity] 表示：只拿 0~item 编号的物品，且容量为 capacity 的背包，价值的最大值
  const dp = [];
  for (let item = 0; item < N; item++) {  // 初始化全 0
    let capacitys = [];
    for (let capacity = 0; capacity <= C; capacity++) {
      capacitys.push(0);
    }

    dp.push(capacitys);
  }

  // 先填写 dp 二维数组第一行 dp[0][0~C]
  // 容量不同的背包，只能拿第 0 个物品，价值的最大值
  for (let capacity = 0; capacity <= C; capacity++) {
    const weight = w[0];
    const value = v[0];

    if (weight > capacity) { // 容量小的背包放不进去
      continue;
    }
    dp[0][capacity] = value; // 容量大的背包都可以放进去
  }

  // 然后处理剩余物品
  // 逐行填写 dp[1~N-1][capacity]
  for (let item = 1; item < N; item++) {
    const weight = w[item];
    const value = v[item];

    for (let capacity = 0; capacity <= C; capacity++) {
      if (weight > capacity) { // 如果当前物品比较重，放不进去。则 0~item 这些物品中，能放入物品价值的最大值，就是 0~item-1 能放入的最大值
        dp[item][capacity] = dp[item - 1][capacity];
        continue;
      }

      /**
       * 如果当前物品可以放入背包，则需要考虑放入还是不放入
       *   不放入：0~item 这些物品中，能放入物品价值的最大值，就是 0~item-1 能放入的最大值 dp[item-1][capacity]
       *   放入：放入当前物品后，剩余背包容量可以放入 0~item-1 的物品的最大价值，二者之和 value+dp[item-1][capacity-weight]
       * 然后比较放入和不放入，哪个价值更大
       */
      const outPackValue = dp[item - 1][capacity];
      const inPackValue = value + dp[item - 1][capacity - weight];
      dp[item][capacity] = Math.max(outPackValue, inPackValue);
    }
  }

  // 填完后，dp[N-1][C] 就是 0~N-1 容量为 C 的背包所能放入物品的最大值了
  const maxValue = dp[N - 1][C];
  return maxValue;
};

debugger;
const maxValue = main();
debugger;