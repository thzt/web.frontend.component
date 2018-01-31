/* 
    用例：
    const executor = new PromiseExecutor;

    executor.add(()=>new Promise(...));
    添加任务，其中参数是lazy promise，通过将promise包装成无参函数来实现lazy化。

    executor.each(v=>...);
    获取按lazy promise加入顺序而resolved的值，其中v分别为每个promise resolved的值。
*/

const PromiseExecutor = class {
    constructor() {
        // lazy promise队列
        this._queue = [];

        // 一个变量锁，用来控制当前是否要执行队列中的lazy promise
        this._isBusy = false;
    }

    each(callback) {
        this._callback = callback;
    }

    // 通过isBusy实现加锁
    // 如果当前有任务正在执行，就返回，否则就按队列中任务的顺序来执行
    add(lazyPromise) {
        this._queue.push(lazyPromise);

        if (this._isBusy) {
            return;
        }

        this._isBusy = true;

        // execute是一个async函数，执行后立即返回，返回一个promise
        // 因此，add可以在execute内的promise resolved之前再次执行
        this.execute();
    };

    async execute() {

        // 按队列中的任务顺序来依次执行
        while (this._queue.length !== 0) {
            const head = this._queue.shift();
            const value = await head();
            this._callback && this._callback(value);
        }

        // 执行完之后，解锁
        this._isBusy = false;
    };
}

window.PromiseExecutor = PromiseExecutor;

