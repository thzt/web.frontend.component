// 生成一个新副本，便于回溯
const _copy = items => items.reduce((memo, item) => {
  memo.push(item);
  return memo;
}, []);

/*
  返回单元格状态

  return: 
    undefined, 0: 不可达
    *: 起点
    1: 未占用
    #: 已走过
*/
const _getPos = (maze, [x, y]) => {
  const line = maze[x];
  if (!line) {
    return;
  }

  return line[y];
};

/*
  设置单元格状态
 
  state: 
    #: 已走过
    1: 未占用
*/
const _setPos = (maze, [x, y], state) => {
  const line = maze[x];
  const array = line.split('');
  array[y] = state;

  maze[x] = array.join('');
};

/*
  获取当前可进行的选择
 
  return: 
    {
      left: boolean,
      right: boolean,
      up: boolean,
      down: boolean,
    }
*/
const _getDecisions = (maze, [x, y]) => {
  const left = _getPos(maze, [x, y - 1]);
  const right = _getPos(maze, [x, y + 1]);
  const up = _getPos(maze, [x - 1, y]);
  const down = _getPos(maze, [x + 1, y]);

  return {
    left: left === '1',
    right: right === '1',
    up: up === '1',
    down: down === '1',
  };
};

/* 
  从当前位置，得到所有可能的新探索
    {maze,road,current} -> [{maze,road,current}]
*/
const explore = ({ maze, road, current }) => {
  // 获取所有可能的方向
  const decisions = _getDecisions(maze, current);

  // 在每个可行的方向上，生成一次新的探索
  return Object.keys(decisions).filter(direction => decisions[direction]).map(direction => {
    const newMaze = _copy(maze);
    const newRoad = _copy(road);
    const [x, y] = current;

    // 获取新的位置
    let newCurrent;
    switch (direction) {
      case 'left':
        newCurrent = [x, y - 1];
        break;

      case 'right':
        newCurrent = [x, y + 1];
        break;

      case 'up':
        newCurrent = [x - 1, y];
        break;

      case 'down':
        newCurrent = [x + 1, y];
        break;

      default:
        throw new Error(`未定义的移动方向：${direction}`);
    }

    _setPos(newMaze, newCurrent, '#');
    newRoad.push(newCurrent);

    return {
      maze: newMaze,
      road: newRoad,
      current: newCurrent,
    };
  });
};

module.exports = explore;

