/* 
    描述：
    streamWait是一个operator，用来对stream进行变换

    用例：
    const resultStream = streamWait.call(stream, x => new Promise(...));

    streamWait接受两个参数，stream为变换之前的流，
    x => new Promise(...)是一个函数，用来对流中每一个值进行变换，它将值变换为promise

    返回结果resultStream是一个新的流，
    它按传入流stream中值的顺序，执行了x => new Promise(...)，将结果放入流中
*/
const streamWait = function (mapValueToPromise) {
    const stream = this;

    // 使用一个队列和一个变量锁来进行调度
    // 如果当前正在处理，就入队，否则就一次性清空队列
    // 并且在清空的过程中，有了新的任务还可以入队
    const queue = [];
    let isBusy = false;

    return cont => stream(async v => {
        queue.push(() => mapValueToPromise(v));

        // 如果当前正在处理，就返回，不改变结果stream中的值
        if (isBusy) {
            return;
        }

        // 否则就按顺序处理，将每一个任务的返回值放到结果流中
        isBusy = true;
        while (queue.length !== 0) {
            const head = queue.shift();
            const r = await head();
            cont(r);
        }

        // 处理完了以后，恢复空闲状态
        isBusy = false;
    });
};

window.streamWait = streamWait;