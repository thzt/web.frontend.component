// 容量
const C = 7;

// 价值
const v = [4, 5, 3];
// 重量
const w = [3, 4, 2];

// 物品数
const N = v.length;

/**
 * 完全背包问题：每件物品可以重复选择
 * 
 * dp[i][j]：选择 0~i 个物品时，且容量为 j 的背包，所能选择物品总价值的最大值
 *   dp[0][j]，只能选择第 0 个物品，需要考虑选择 0~k 个的情况
 *   dp[i][j]，当背包容量够用时，考虑选择第 i 个物品 0~k 的所有情况，然后取最大值
 * 
 * 最终结果 dp[N-1][C]
 * 
 * Ref: https://www.douyin.com/video/7262589765663378749
 */
const main = () => {
  const dp = [];

  // 先填充第一行：只有第 0 个物品的情况
  dp[0] = [];
  for (let j = 0; j <= C; j++) {
    const weight = w[0];
    const value = v[0];

    for (let k = 0; k * weight <= j; k++) {
      dp[0][j] = k * value;
    }
  }

  // 填充剩余的行
  for (let i = 1; i < N; i++) {
    const weight = w[i];
    const value = v[i];

    dp[i] = [];
    for (let j = 0; j <= C; j++) {
      dp[i][j] = 0;

      // 容量太小，不能选
      if (j < weight) {
        dp[i][j] = dp[i - 1][j];
        continue;
      }

      // 选择 0~k 个当前物品后，总价值的最大值
      let max = 0;
      for (let k = 0; k * weight <= j; k++) {
        max = Math.max(max, dp[i - 1][j - k * weight] + k * value);
      }
      dp[i][j] = max;
    }
  }

  const maxValue = dp[N - 1][C];
  return maxValue;
};

debugger
const r = main();
debugger