/*
  单元格状态
  0: 不可达
  *: 起点
  1: 未占用
*/
const buildHtml = maze => maze.map(line => `
  <div>
    ${line.split('').map(y => `<span data-state="${y}"></span>`).join('')}
  </div>
`).join('');

// 页面上显示
const createMaze = (container, maze) => (container.innerHTML = buildHtml(maze));

// 按road逐个闪烁
const recursiveBlink = (container, road, i) => {
  if (road.length === 0) {
    return;
  }

  const [x, y] = road.shift();
  const cell = container.children[x].children[y];

  cell.setAttribute('style', 'background: red;');
  cell.innerHTML = i;
  setTimeout(() => {
    cell.removeAttribute('style');
    recursiveBlink(container, road, ++i);
  }, 100);
};

const blink = (container, maze) => recursiveBlink(container, maze, 0);

export {
  createMaze,
  blink,
};