// 找到出路就直接返回
const walkOnce = steps => {
  const selects = forward(steps);
  if (selects.length === 0) {
    // 没有选择时，检查是否已出去
    return check(steps);
  }

  // 遍历每个选择
  let isSuccess = false;
  for (const select of selects) {
    // 踏出一步，继续往前走
    choose(steps, select);
    isSuccess = walkOnce(steps);

    if (isSuccess) {
      break;
    }
    // 往后退一步
    backward(steps);
  }

  return isSuccess;
};

// 找出所有的出路
const walkAll = steps => {
  const selects = forward(steps);
  if (selects.length === 0) {
    const isSuccess = check(steps);
    // 成功的话，就记录下来
    return isSuccess ? [JSON.stringify(steps)] : [];
  }

  const successfulSteps = [];
  for (const select of selects) {
    choose(steps, select);
    const results = walkAll(steps);

    // 把成功记录存起来，继续探索其他出路
    successfulSteps.push(...results);
    backward(steps);
  }

  return successfulSteps;
};

const N = 4;

// 向前探索，返回向前走所有可能的坐标
const forward = steps => {
  if (steps.length === 0) {
    // 第一行，可以随意选
    return [...Array(N).keys()].map(i => [0, i]);
  }

  const i = steps.length;
  if (i === N) {
    // 如果已经到最后一行了，就返回
    return [];
  }

  // 在下一行探索位置，横竖斜都不能有冲突
  return [...Array(N).keys()].map(j => [i, j]).filter(([i, j]) => !steps.some(([x, y]) => x === i || y === j || x + y === i + j || x - i === y - j));
};

// 检测是否走出去
const check = steps => steps.length === N;
// 踏出这一步，记录在案
const choose = (steps, select) => steps.push(select);
// 往后退
const backward = steps => steps.pop();

// 打印结果
const print = results => {
  for (const result of results) {
    const steps = JSON.parse(result);
    // N 行 N 列的点阵
    const shows = [...Array(N).keys()].map(_ => [...Array(N).keys()].map(_ => '.'));

    // 按 steps 标出每一步的位置
    for (const step of steps) {
      const [x, y] = step;
      shows[x][y] = 'Q';
    }

    // 每行合并成一个字符串
    for (let i = 0; i < shows.length; i++) {
      shows[i] = shows[i].join('');
    }

    console.log(JSON.stringify(shows, null, 2));
  }
};

const main = () => {
  console.log('walk once');
  let steps = [];
  walkOnce(steps);
  print([JSON.stringify(steps)]);

  console.log('walk all');
  steps = [];
  const results = walkAll(steps);
  print(results);
};

main();
