import findRoad from './find-road';
import { createMaze, blink } from './maze';

const maze = [
  '11*10',
  '11110',
  '11111',
  '10111',
  '11101',
];

const container = document.querySelector('#container');
createMaze(container, maze);

const road = findRoad(maze);
blink(container, road);

