const main = (input) => {
  // 这里所有集合
  const allSets = new Set();

  // 判断是否跟已有的集合有交集
  for (let i = 0; i < input.length; i++) {
    const curPos = input[i];

    // 待合并的集合
    const interSets = [];
    for (let curSet of allSets) {

      // 判断是否跟之前任何一个集合有交集
      if (hasIntersection(curPos, curSet)) {
        // 坐标加入集合
        curSet.add(curPos);

        // 加入待合并集合中
        interSets.push(curSet);

        // 原来的集合中去掉它
        allSets.delete(curSet);

        continue;
      }
    }

    // 不在任何集合中
    if (interSets.length === 0) {
      const s = new Set();
      s.add(curPos);
      allSets.add(s);
      continue;
    }

    // 只有一个集合，不用合并
    if (interSets.length === 1) {
      allSets.add(interSets[0]);
      continue;
    }

    // 多余一个集合，则合并
    const mergedSet = mergetSets(interSets);
    allSets.add(mergedSet);
  }

  const r = convertToArray(allSets);
  return r;
};

// tools

const convertToArray = (res) => {
  const r = [];

  for (let s of res) {
    let arr = [];
    for (let pos of s) {
      arr.push(pos);
    }

    r.push(arr);
  }

  return r;
};

const hasIntersection = (cur, s) => {
  for (let pos of s) {
    const isInter =
      (cur[0] + 1 === pos[0] && cur[1] === pos[1])     // x-1,y
      || (cur[0] - 1 === pos[0] && cur[1] === pos[1])  // x+1,y
      || (cur[0] === pos[0] && cur[1] === pos[1] + 1)  // x,y-1
      || (cur[0] === pos[0] && cur[1] === pos[1] - 1)  // x,y+1

    if (isInter) {
      return true;
    }
  }

  return false;
};

const mergetSets = (interSets) => {
  const set = new Set();

  for (let i = 0; i < interSets.length; i++) {
    for (let pos of interSets[i]) {
      set.add(pos);
    }
  }

  return set;
};

const mockInput = () => {
  let input = [];
  for (let i = 0; i < 10000; i++) {
    const x = 0;
    const y = i;

    input.push([x, y]);
  }

  return input;
};

const input2 = mockInput();
const startTime = Date.now();
const r = main(input2);
const elapseTime = Date.now() - startTime;

console.log(`Elapse: ${elapseTime}`);
debugger
