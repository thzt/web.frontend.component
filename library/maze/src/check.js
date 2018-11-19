// 检测迷宫是不是已经走完
const check = maze => maze.every(line => line.indexOf('1') === -1);

module.exports = check;