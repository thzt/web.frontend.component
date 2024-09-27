/**
 * 发号器
 *
 * 用法说明
 * 1. 实例化： const dispatcher = new MessageDispatcher();
 * 2. 获取回调对应的号码： const dispatchNumber = dispatcher.getDispatchNumber(callback);
 * 3. 根据号码调用回调：dispatcher.dispatch(dispatchNumber, data);
 */
export class MessageDispatcher {
  constructor() {
    this.cache = new Map();
  }
  getDispatchNumber(callback) {
    // 1. 找到最小的自增 id，作为号码
    const ids = Object.keys(this.cache);
    let id = 0;
    while (true) {
      if (ids.includes(id)) {
        id++;
        continue;
      }
      break;
    }
    const dispatchNumber = id;

    // 2. 将号码与回调进行绑定
    this.cache.set(dispatchNumber, callback);

    // 3. 返回号码
    return dispatchNumber;
  }
  dispatch(dispatchNumber, data) {
    if (!this.cache.has(dispatchNumber)) {
      return false;
    }

    // 1. 根据号码取出回调
    const callback = this.cache.get(dispatchNumber);

    // 2. 解除绑定
    this.cache.delete(dispatchNumber);

    // 3. 触发回调
    callback(data);
    return true;
  }
}
