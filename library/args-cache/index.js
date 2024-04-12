const sum = (...args) => {
  console.log(...args);
  return args.reduce((m, v) => m + v, 0);
}

// cache = {
//   value: value0,
//   map: {
//     k1: {
//       value: value1,
//       map: {
//         k3: {
//           value: value3,
//         }
//       }
//     },
//     k2: {
//       value: value2,
//       map: {
//         k4: {
//           value: value4,
//         }
//       }
//     },
//   },
// }

const m = (func) => {
  const cache = {};

  return (...args) => {
    let argsCount = args.length;

    // 没有参数时
    if (argsCount === 0) {
      if (cache.hasOwnProperty('value')) {
        return cache.value;
      }
      const res = func(...args);
      cache.value = res;
      return res;
    }

    // 有参数时
    let curIndex = 0;
    let curCacheNode = cache;

    while (true) {
      const arg = args[curIndex];

      // ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
      // 如果已经到了最后一个参数
      // 1. 返回缓存值
      // 2. 如果没有缓存，就重新计算，并添加缓存

      if (curIndex === argsCount - 1) {

        // 如果还没有 map 属性
        if (curCacheNode.map == null) {
          const res = func(...args);
          curCacheNode.map = new Map([
            [arg, { value: res }]
          ]);
          return res;
        }

        // 如果有 map 属性，但是还没有 key
        const { map } = curCacheNode;
        if (!map.has(arg)) {
          const res = func(...args);
          curCacheNode.map.set(arg, { value: res });
          return res;
        }

        // 如果有 map 属性，也有 key，还没有缓存
        const node = map.get(arg);
        if (!node.hasOwnProperty('value')) {
          const res = func(...args);
          node.value = res;
          return res;
        }

        // 返回缓存值
        return node.value;
      }

      // ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
      // 如果不是最后一个参数，则下钻

      // 还没有 map 属性
      if (curCacheNode.map == null) {
        const node = {};
        curCacheNode.map = new Map([
          [arg, node]
        ]);

        curCacheNode = node;
        curIndex++;
        continue;
      }

      // 有 map 属性，没有 key
      const { map } = curCacheNode;
      if (!map.has(arg)) {
        const node = {};
        curCacheNode.map.set(arg, node);

        curCacheNode = node;
        curIndex++;
        continue;
      }

      // 有 map 属性，有 key
      const node = curCacheNode.map.get(arg);
      curCacheNode = node;
      curIndex++;
    }
  };
}

const msum = m(sum);

const r1 = msum(1, 2); // 返回 3，结果通过计算得到
const r2 = msum(1, 2); // 第二次以及之后的调用，直接从缓存中返回 3
const r3 = msum(1, 2, 3);
const r4 = msum(1, 2, 3);
const r5 = msum(1, 3);
const r6 = msum(1, 3);