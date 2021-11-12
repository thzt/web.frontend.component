(() => {
  // 黑白棋子
  const empty = 0;
  const white = 1;
  const black = 2;

  // 获胜条件
  const win = 5;

  // N * N 的棋盘
  const N = 9;
  const board = [...Array(N)].map(_ => [...Array(N).fill(empty)]);

  // 游戏结束
  let isGameOver = false;

  // - - - - - - - - - - - - - - - - -

  const $board = document.querySelector('#board');
  const $current = document.querySelector('#current');
  let state = white;

  const createBoard = () => {
    const html = [...Array(N).keys()].map(x => `<tr>${[...Array(N).keys()].map(y => `<td><div x="${x}" y="${y}"></div></td>`).join('')}</tr>`).join('')
    $board.innerHTML = `<table>${html}</table>`;

    $current.innerHTML = `当前：${state === white ? '白子' : '黑子'}`;
  };

  $board.addEventListener('click', e => {
    if (isGameOver) {
      return;
    }

    const { target } = e;
    if (target.tagName !== 'DIV') {
      return;
    }
    if (!target.hasAttribute('x') || !target.hasAttribute('y')) {
      return;
    }

    const x = +target.getAttribute('x');
    const y = +target.getAttribute('y');
    const isEmpty = e.target.getAttribute('class') == null;
    if (!isEmpty) {
      return;
    }
    const pos = [x, y];

    takeAStep(state, pos);
    target.setAttribute('class', state === white ? 'white' : 'black');


    const { isWin, winner } = check();
    if (!isWin) {
      state = state === white ? black : white;
      $current.innerHTML = `当前：${state === white ? '白子' : '黑子'}`;
      return;
    }

    isGameOver = true;
    setTimeout(() => {
      alert(`winner: ${winner == white ? '白子' : '黑子'}`);
    }, 10);
  }, false);

  const takeAStep = (chess, [x, y]) => {
    if (board[x][y] !== 0) {
      throw new Error('此处已经有棋子');
    }

    board[x][y] = chess;
  };

  const check = () => {

    // 检查一行
    for (let x = 0; x < N; x++) {
      const posSet = [];
      for (let y = 0; y < N; y++) {
        posSet.push([x, y]);
      }
      const result = checkPosSet(posSet);
      if (result.isWin) {
        return result;
      }
    }

    // 检查一列
    for (let y = 0; y < N; y++) {
      const posSet = [];
      for (let x = 0; x < N; x++) {
        posSet.push([x, y]);
      }
      const result = checkPosSet(posSet);
      if (result.isWin) {
        return result;
      }
    }

    // 斜着检查(/)
    for (let i = 0; i <= 2 * (N - 1); i++) {
      if (i <= N - 1) {
        const posSet = [];
        for (let x = 0; x <= i; x++) {
          const y = i - x;
          posSet.push([x, y]);
        }
        const result = checkPosSet(posSet);
        if (result.isWin) {
          return result;
        }
      } else {
        const posSet = [];
        for (let x = i - (N - 1); x <= N - 1; x++) {
          const y = i - x;
          posSet.push([x, y]);
        }
        const result = checkPosSet(posSet);
        if (result.isWin) {
          return result;
        }
      }
    }

    // 斜着检查（\）
    for (let i = 0; i <= 2 * (N - 1); i++) {
      if (i <= N - 1) {
        const posSet = [];
        for (let x = 0; x <= i; x++) {
          const y = (N - 1 - i) + x;
          posSet.push([x, y]);
        }
        const result = checkPosSet(posSet);
        if (result.isWin) {
          return result;
        }
      } else {
        const posSet = [];
        for (let x = i - (N - 1); x <= N - 1; x++) {
          const y = x - (i - (N - 1));
          posSet.push([x, y]);
        }
        const result = checkPosSet(posSet);
        if (result.isWin) {
          return result;
        }
      }
    }

    return {
      isWin: false,
    }
  };

  const checkPosSet = (posSet) => {
    let whiteNum = 0;
    let blackNum = 0;

    for (const [x, y] of posSet) {
      const chess = board[x][y];

      switch (chess) {
        case white: {
          whiteNum++;
          blackNum = 0;
          break;
        }
        case black: {
          blackNum++;
          whiteNum = 0;
          break;
        }
        case empty: {
          blackNum = 0;
          whiteNum = 0;
          break;
        }
        default: {
          throw new Error(`不合法的棋子: [${x}, ${y}] = ${chess}`);
        }
      }

      if (whiteNum >= win) {
        return {
          isWin: true,
          winner: white,
        }
      }

      if (blackNum >= win) {
        return {
          isWin: true,
          winner: black,
        };
      }
    }

    return {
      isWin: false,
    }
  }

  createBoard();
})()

