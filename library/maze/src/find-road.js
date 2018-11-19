/*
  返回单元格状态

  return: 
    undefined, 0: 不可达
    *: 起点
    1: 未占用
    #: 已占用
*/
const getPos = (maze, [x, y]) => {
    const line = maze[x];
    if (!line) {
      return;
    }
  
    return line[y];
  };
  
  /*
    设置单元格状态
  
    state: 
      #: 占用
      1: 未占用
  */
  const setPos = (maze, [x, y], state) => {
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
  const getDecisions = (maze, [x, y]) => {
    const left = getPos(maze, [x, y - 1]);
    const right = getPos(maze, [x, y + 1]);
    const up = getPos(maze, [x - 1, y]);
    const down = getPos(maze, [x + 1, y]);
  
    return {
      left: left === '1',
      right: right === '1',
      up: up === '1',
      down: down === '1',
    };
  };
  
  const copyMaze = maze => maze.reduce((memo, line) => {
    memo.push(line);
    return memo;
  }, []);
  
  const copyRoad = road => road.reduce((memo, pos) => {
    memo.push(pos);
    return memo;
  }, []);
  
  // 判断是否有未占用的单元格
  const isComplete = maze => maze.every(line => line.indexOf('1') === -1);
  
  // 自动获取入口
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
  
  // 返回行走路线 road
  const recusiveWalk = (maze, road, [x, y]) => {
    const decisions = getDecisions(maze, [x, y]);
  
    // direction: 'left', 'right', 'up', 'down'
    const validDirections = Object.keys(decisions).filter(direction => decisions[direction]);
  
    // 不能移动的状态
    if (validDirections.length === 0) {
  
      // 如果还有未占用的单元格，就返回null
      if (!isComplete(maze)) {
        return null;
      }
  
      return road;
    }
  
    // 递归走迷宫，只要有一种方案可以走完，就结束
    let completeRoad;
    const complete = validDirections.some(direction => {
      const newMaze = copyMaze(maze);
      const newRoad = copyRoad(road);
      let current;
  
      switch (direction) {
        case 'left':
          current = [x, y - 1];
          break;
  
        case 'right':
          current = [x, y + 1];
          break;
  
        case 'up':
          current = [x - 1, y];
          break;
  
        case 'down':
          current = [x + 1, y];
          break;
  
        default:
          throw new Error(`未定义的移动方向：${direction}`);
      }
  
      setPos(newMaze, current, '#');
      newRoad.push(current);
  
      completeRoad = recusiveWalk(newMaze, newRoad, current);
  
      // 判断是否有一个决策可以走完
      return completeRoad != null;
    });
  
    // 如果所有可行方向上的尝试都不能走完，就回溯
    if (!complete) {
      return null;
    }
  
    return completeRoad;
  };
  
  /*
    主函数
  
    用例：
      const maze = [
        '111',
        '111',
        '*10',
      ];
  
      const road = findRoad(maze);
      console.log(JSON.stringify(road));
  */
  const findRoad = maze => {
    const start = findStartPoint(maze);
    const road = [start];
    const completeRoad = recusiveWalk(maze, road, start);
  
    if (completeRoad == null) {
      throw new Error('未找到可行的路径');
    }
  
    return completeRoad;
  };
  
  export default findRoad;