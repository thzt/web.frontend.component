(() => {
  // 绑定按钮事件：点击创建数独
  const bindCreateTableEvent = () => {
    const $createBotton = document.querySelector('#create');
    $createBotton.addEventListener('click', () => {
      const size = prompt('请输入数独的大小', 9);
      if (size == null) {
        return;
      }

      const $div = document.querySelector('#container');
      const table = [];
      for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
          row.push(`<td> <input type="text" /> </td>`);
        }
        table.push(`<tr> ${row.join('')} </tr>`);
      }

      $div.innerHTML = `<table> ${table.join('')} </table>`;
    });
  };

  // 绑定按钮事件：点击解题
  const bindResolveEvent = () => {
    const $resolveButton = document.querySelector('#resolve');
    $resolveButton.addEventListener('click', () => {
      const initSudoku = getSudokuFromPage();

      const stack = new BackTrackingStack(initSudoku);
      const isResolved = resolve(stack);

      if (!isResolved) {
        alert('无解');
        return;
      }

      writeToPage(stack);
    });
  };

  // 从页面中获取数据
  const getSudokuFromPage = () => {
    const $trs = document.querySelectorAll('#container table tr');

    const sudoku = [];
    const size = $trs.length;

    for (let i = 0; i < size; i++) {
      const row = [];
      const $tds = $trs[i].children;
      for (let j = 0; j < size; j++) {
        const value = $tds[j].children[0].value;

        if (value === '') {
          row.push(0);
          continue;
        }
        row.push(+value);
      }
      sudoku.push(row);
    }

    return sudoku;
  };

  // 将计算结果写入表格
  const writeToPage = (stack) => {
    const resolvedSudoku = stack.getState();
    const size = getSudokuSize(resolvedSudoku);

    const $trs = document.querySelectorAll('#container table tr');

    // 填充数字
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const $input = $trs[i].children[j].children[0];
        $input.value = resolvedSudoku[i][j];
        $input.style.color = 'green';
      }
    }

    // 初始数字进行恢复成默认颜色
    stack.reset();
    const initSudoku = stack.getState();
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (initSudoku[i][j] === 0) {
          continue;
        }

        const $input = $trs[i].children[j].children[0];
        $input.style.color = '';
      }
    }
  };

  // 递归求解
  const resolve = (stack) => {
    const sudoku = stack.getState();
    const nextPos = findNextPos(sudoku);

    if (nextPos == null) {
      // 如果已经填满了，则返回已解决
      return true;
    }

    // 将当前位置做出的猜测，保存起来，避免重复猜测
    const guessedNumbers = new Set();

    while (true) {
      const n = guess(sudoku, nextPos, guessedNumbers);
      guessedNumbers.add(n);

      if (n === 0) {
        // 猜测数字为 0，说明找不到合法数字了
        return false;
      }

      const [i, j] = nextPos;
      stack.push({
        forward: (sudoku) => {
          // 改变数独状态
          sudoku[i][j] = n;
        },
        backward: (([i, j]) => {
          // 闭包保存当前 pos
          return (sudoku) => {
            // 回滚策略
            sudoku[i][j] = 0;
          };
        })(nextPos),
      });

      // 递归求解
      const isResolved = resolve(stack);
      if (isResolved) {
        return true;
      }

      // 恢复状态
      stack.pop();
    }
  };

  // 找到下一个待填字的空白位置
  const findNextPos = (sudoku) => {
    const size = getSudokuSize(sudoku);

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (sudoku[i][j] === 0) {
          // 找到第一个空白的位置
          return [i, j];
        }
      }
    }

    // 找不到空白位置，说明已经填满数字了
    return null;
  };

  // 在给定位置猜一个数字
  const guess = (sudoku, pos, guessedNumbers) => {
    const size = getSudokuSize(sudoku);

    for (let n = 1; n <= size; n++) {
      if (guessedNumbers.has(n)) {
        // 如果已经猜测过了，就继续往下猜
        continue;
      }

      const isValid = isGuessValid(sudoku, pos, n);
      if (isValid) {
        return n;
      }
    }

    // 找不到合法的数字了
    return 0;
  };


  // 判定在 [i,j] 位置填写 n 是否合法
  const isGuessValid = (sudoku, pos, n) => {
    const [i, j] = pos;
    const size = getSudokuSize(sudoku);

    let isValid = true;

    // 1. 所在行有一个重复的，就不合法
    for (let k = 0; k < size; k++) {
      if (sudoku[i][k] === n) {
        isValid = false;
        break;
      }
    }
    if (!isValid) {
      return false;
    }

    // 2. 所在列有一个重复的，就不合法
    for (let k = 0; k < size; k++) {
      if (sudoku[k][j] === n) {
        isValid = false;
        break;
      }
    }
    if (!isValid) {
      return false;
    }

    // 3. 9*9 的数独判定

    // 不是 9*9 的数独，到这里就判定结束了
    if (size !== 9) {
      return isValid;
    }

    // 9*9 的数独，还要判定每个 3*3 单元格区域是否重复
    const li = Math.floor(i / 3);
    const lj = Math.floor(j / 3);
    for (let u = li * 3; u < li * 3 + 3; u++) {
      for (let v = lj * 3; v < lj * 3 + 3; v++) {
        if (sudoku[u][v] === n) {
          isValid = false;
          break;
        }
      }
    }
    return isValid;
  };

  const getSudokuSize = (sudoku) => sudoku.length;

  // 可回溯的栈结构
  // 可以将决策压栈，也可以弹栈以恢复状态
  class BackTrackingStack {
    // 当前状态
    _state;

    // 决策栈
    _stack = [];

    // 传入初始状态
    constructor(state) {
      this._state = state;
    }

    // 获取当前状态
    getState() {
      return this._state;
    }

    // 改变当前状态，并将回滚策略压栈
    push({ forward, backward }) {
      forward(this._state);
      this._stack.push(backward);
    }

    // 使用回滚策略恢复状态
    pop() {
      const backward = this._stack.pop();
      backward(this._state);
    }

    // 恢复到初始状态
    reset() {
      while (true) {
        const backward = this._stack.pop();
        if (backward == null) {
          break;
        }
        backward(this._state);
      }
    }
  }

  // 执行一下
  bindCreateTableEvent();
  bindResolveEvent();
})();
