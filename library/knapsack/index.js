// 容量
const C = 4;

// 价值
const v = [3, 2, 1.5];
// 重量
const w = [4, 3, 1];

// 物品数
const N = v.length;

/**
 * dp[item][capacity] 定义：
 * 容量为 capacity 的背包，在 0~item 中进行选择，物品的最大价值
 * 
 * 算法说明：
 * 1. 状态转移方程
 * dp[item][capacity] = {
 *   当前 item 太重：则最大价值与只选择 0~item 这些物品的价值一样 dp[item-1][capacity]
 *   否则，可选择拿还是不拿：去最大值 max {
 *     不拿：dp[item-1][capacity]
 *     拿：当前物品的价值 v[item] 加上因此而缩小背包后能装入物品的最大价值 dp[item-1][capacity-w[item]]（假设这个值已经知道）
 *   }
 * }
 * 
 * 2. 计算 dp 数组
 * dp 数组是一个 N 行（物品数）C+1 列（剩余容量 0~C）的数组
 * 
 * （1）初始化 dp 全 0
 * （2）填充第 0 行：dp[0][0 ~ C+1]
 * （3）填充第 1~ N-1 行 dp[1 ~ N-1][0 ~ C+1]
 * 
 * 3. 计算结束后取值
 * 取 0~N 个物品，容量为 C 的最大价值：dp[N-1][C]
 */
const main = () => {
  // N 行 C 列的数组
  const dp = [...Array(N)].map(_ => []);

  // 填写第一行
  // 只能选择 第 0 个物品时，不同背包容量能装入的最大价值
  for (let capacity = 0; capacity <= C; capacity++) {
    if (capacity < w[0]) {
      // 容量不够
      dp[0][capacity] = 0;
      continue;
    }

    // 容量够，那就装进去
    dp[0][capacity] = v[0];
  }

  for (let item = 1; item < N; item++) {  // 1~N 个物品
    for (let capacity = 0; capacity <= C; capacity++) {  // 剩余 0~C 容量时
      if (w[item] > capacity) {
        // 如果当前物品太重，超出了背包容量
        // 则选择 0~item 物品的最大价值，与只能选前 0 ~ [item-1] 个物品的最大价值一样
        dp[item][capacity] = dp[item - 1][capacity];
        continue;
      }

      // 物品不太重，则可以选择 [拿] 或者 [不拿]

      // 不拿
      // 则选择 0~item 物品的最大价值，与只能选前 0 ~ [item-1] 个物品的最大价值一样
      const notSelect = dp[item - 1][capacity];

      // 拿
      // 则选择 0~item 物品的最大价值，等于【缩小背包后】能装入物品的最大价值，加上当前物品的价值
      const select = dp[item - 1][capacity - w[item]] + v[item];

      dp[item][capacity] = Math.max(notSelect, select);
    }
  }

  /**

      |     | 剩余 0 | 1   | 2   | 3   | 4   |
      | --- | ---   | --- | --- | --- | --- |
      |物品1 | 0     | 0   | 0   | 0   | 3   |
      |物品2 | 0     | 0   | 0   | 2   | 3   |
      |物品3 | 0     | 1.5 | 1.5 | 2   | 3.5 |

   */

  const maxValue = dp[N - 1][C];
  console.log(maxValue);
  debugger;
};

main();
