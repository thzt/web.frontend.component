// 递归走迷宫
const walk = ({ maze, road, current, check, explore }) => {

  // {maze,road,current} -> [{maze,road,current}]
  const explores = explore({ maze, road, current });
  if (explores.length === 0) {
    return {
      isSuccess: check(maze),
      road,
    };
  }

  // {isSuccess, road}
  return explores.reduce((memo, { maze, road, current }) => {
    if (memo.isSuccess) {
      return memo;
    }

    // {isSuccess, road}
    return walk({ maze, road, current, check, explore });
  }, { isSuccess: false, road: null });
};

module.exports = walk;
