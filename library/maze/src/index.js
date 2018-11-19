const findStartPoint = require('./find-start-point');
const check = require('./check');
const explore = require('./explore');
const walk = require('./walk');
const { createMaze, blink } = require('./render');

// (container,maze) => void
window.createMaze = createMaze;

// (container, maze) => void
window.blink = blink;

// 计算路径
window.findRoad = maze => {
  const start = findStartPoint(maze);
  const current = start;
  const road = [current];

  // { isSuccess, road }
  return walk({
    // 迷宫
    /*
      1: 未占用
      0: 不可达
      *: 入口
      #: 已走过
    */
    maze,

    // 当前已走过的路径
    // [[x,y],...]
    road,

    // 当前位置
    // [x,y]
    current,

    // 检测迷宫是否已走完
    // maze=>boolean
    check,

    // 从当前位置可行的所有探索
    // {maze,road,current} -> [{maze,road,current}]
    explore,
  });
};