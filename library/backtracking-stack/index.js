// 可回溯的栈结构
// 可以将决策压栈，也可以弹栈以恢复状态
export class BackTrackingStack {
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
