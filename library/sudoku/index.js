(() => {
  // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
  // 点击创建表格
  const $createBotton = document.querySelector('#create');
  $createBotton.addEventListener('click', () => {
    const n = prompt('请输入数独的大小');
    if (n == null) {
      return;
    }

    const $div = document.querySelector('#numberContainer');
    const table = [];
    for (let i = 0; i < n; i++) {
      const row = [];
      for (let j = 0; j < n; j++) {
        row.push(`<td> <input type="text" /> </td>`);
      }
      table.push(`<tr> ${row.join('')} </tr>`);
    }

    $div.innerHTML = `<table> ${table.join('')} </table>`;
  });

  // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
  // 点击解题
  const $resolveButton = document.querySelector('#resolve');
  $resolveButton.addEventListener('click', () => {
    const numbers = getNumbers();

    const guesses = [];
    const isResolved = resolve(numbers, guesses);

    if (!isResolved) {
      throw new Error('无解');
    }

    write(numbers, guesses);
  });

  // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
  // 私有方法

  // 从页面中获取数据
  const getNumbers = () => {
    const $table = document.querySelector('#numberContainer table');
    const [$tbody] = $table.children;
    const $trs = $tbody.children;

    const numbers = [];
    const len = $trs.length;
    for (let i = 0; i < len; i++) {
      const row = [];
      const $tds = $trs[i].children;
      for (let j = 0; j < len; j++) {
        const value = $tds[j].children[0].value;

        if (value === '') {
          row.push(0);
          continue;
        }
        row.push(+value);
      }
      numbers.push(row);
    }

    return numbers;
  };

  // 将计算结果写入表格
  const write = (numbers, guesses) => {
    const mergeResult = merge(numbers, guesses);

    const $table = document.querySelector('#numberContainer table');
    const [$tbody] = $table.children;
    const $trs = $tbody.children;

    const len = $trs.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        const $input = $trs[i].children[j].children[0];
        $input.value = mergeResult[i][j];

        if (numbers[i][j] !== 0) {
          // 原始数字显示为红色
          $input.style.color = 'red';
        }
      }
    }
  };

  // 递归求解
  const resolve = (numbers, guesses) => {
    const found = find(numbers, guesses);
    if (found == null) {
      return true;
    }
    const [i, j] = found;
    let guessSet = new Set();

    while (true) {
      const guessNumber = makeGuess(numbers, guesses, guessSet, i, j);
      guessSet.add(guessNumber);

      if (guessNumber === 0) {
        // 无解
        return false;
      }

      guesses.push({
        pos: [i, j],
        n: guessNumber,
      });
      const isResolved = resolve(numbers, guesses);
      if (isResolved) {
        return true;
      }

      guesses.pop();
    }
  };

  // 找到下一个空白位置
  const find = (numbers, guesses) => {
    const len = numbers.length;
    const mergeResult = merge(numbers, guesses);

    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        if (mergeResult[i][j] === 0) {
          return [i, j];
        }
      }
    }

    // 已填满
    return null;
  };

  // 合并原始结果和猜测的数字
  const merge = (numbers, guesses) => {
    const result = JSON.parse(JSON.stringify(numbers));

    guesses.forEach(({ pos, n }) => {
      const [i, j] = pos;
      result[i][j] = n;
    });

    return result;
  };

  // 在给定位置猜一个数字
  const makeGuess = (numbers, guesses, guessSet, i, j) => {
    const mergeResult = merge(numbers, guesses);

    const len = mergeResult.length;
    for (let guess = 1; guess <= len; guess++) {
      if (guessSet.has(guess)) {
        continue;
      }

      // 是否被占用
      let isOccupied = false;

      for (let k = 0; k < len; k++) {
        if (mergeResult[i][k] === guess) {
          // 每行不能重复
          isOccupied = true;
          break;
        }
        if (mergeResult[k][j] === guess) {
          // 每列不能重复
          isOccupied = true;
          break;
        }
      }

      // 3*3 单元格不能重复
      // 只判断 9*9 数独
      if (len === 9) {
        const li = Math.floor(i / 3);
        const lj = Math.floor(j / 3);
        for (let u = li * 3; u < li * 3 + 3; u++) {
          for (let v = lj * 3; v < lj * 3 + 3; v++) {
            if (mergeResult[u][v] === guess) {
              isOccupied = true;
              break;
            }
          }
        }
      }

      if (isOccupied) {
        continue;
      }

      return guess;
    }

    // 无解·
    return 0;
  };
})();
