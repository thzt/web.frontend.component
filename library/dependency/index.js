class Dependency {
  constructor() {
    this._cache = new Map;
  }

  _hasParent(parentKey) {
    return this._cache.has(parentKey);
  }

  _hasDependency(parentKey, childKey) {
    return this._cache.has(parentKey) && this._cache.get(parentKey).has(childKey);
  }

  add({ parent: { key: parentKey }, child: { key: childKey, value: childValue } }) {

    // 如果还没有父级相关的依赖，就添加一个父级节点
    if (!this._hasParent(parentKey)) {
      this._cache.set(parentKey, new Map([
        [childKey, childValue],
      ]));
      return;
    }

    // 如果已存在相同的父子级依赖，则报错
    if (this._hasDependency(parentKey, childKey)) {
      throw new Error(`已存在父子依赖关系\nparent: ${parentKey}\nchild: ${childKey}`);
    }

    // 为已存在的父级添加一个子依赖
    this._cache.get(parentKey).set(childKey, childValue);
  }

  getChildValue({ parent: { key: parentKey }, child: { key: childKey } }) {
    if (!this._hasParent(parentKey)) {
      throw new Error(`没有相应的父级节点\nparent: ${parentKey}`);
    }

    const childKeyValueMap = this._cache.get(parentKey);
    if (!childKeyValueMap.has(childKey)) {
      throw new Error(`没有相应的父子依赖关系\nparent: ${parentKey}\nchild: ${childKey}`);
    }

    return childKeyValueMap.get(childKey);
  }

  toJSON() {
    const json = Array.from(this._cache.keys()).reduce((memo, parentKey) => {
      const childKeyValueMap = this._cache.get(parentKey);

      memo[parentKey] = Array.from(childKeyValueMap.keys()).reduce((childMemo, childKey) => {
        childMemo[childKey] = childKeyValueMap.get(childKey);
        return childMemo;
      }, {});

      return memo;
    }, {});

    return JSON.stringify(json, null, 4);
  }

  * walk({ parent, parent: { key: parentKey } }) {
    if (!this._hasParent(parentKey)) {
      throw new Error(`没有相应的父级节点\nparent: ${parentKey}`);
    }

    const childKeyValueMap = this._cache.get(parentKey);
    const childKeysIterator = childKeyValueMap.keys();

    while (true) {
      const { done, value: childKey } = childKeysIterator.next();
      if (done) {
        break;
      }

      const childValue = childKeyValueMap.get(childKey);
      const isLeaf = !this._hasParent(childKey);

      yield {
        parent: {
          key: parentKey,
        },
        child: {
          key: childKey,
          value: childValue,
        },
        isLeaf,
      };

      // 如果已经到了叶子节点
      if (isLeaf) {
        break;
      }

      // 递归walk
      yield* this.walk({
        parent: {
          key: childKey,
        },
      });
    }
  }
}

Dependency.fromJSON = adjacentList => {
  const dependency = new Dependency;

  Object.keys(adjacentList).forEach(parentKey => {
    Object.keys(adjacentList[parentKey]).forEach(childKey => {
      const childValue = adjacentList[parentKey][childKey];

      dependency.add({
        parent: {
          key: parentKey,
        },
        child: {
          key: childKey,
          value: childValue,
        }
      });
    });
  });

  return dependency;
}

module.exports = Dependency;
