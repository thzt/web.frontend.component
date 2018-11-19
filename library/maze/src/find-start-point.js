/*
  自动计算迷宫的入口坐标
    1: 未占用
    0: 不可达
    *: 入口
    #: 已走过
*/
const findStartPoint = maze => {
  let x, y;
  const found = maze.some((line, lineIndex) => {
    x = lineIndex;
    y = line.indexOf('*');

    const isFound = y !== -1;
    return isFound;
  });

  if (!found) {
    throw new Error('没找到入口点');
  }

  return [x, y];
};

module.exports = findStartPoint;
