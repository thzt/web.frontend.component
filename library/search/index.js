/**
 * 深度优先搜索
 * 
 * @param node tree 的当前节点
 * @param getChildren 获取子节点之方法
 * @param cb 访问每个节点时触发的回调，回调返回 true 则停止搜索
 */
export const dfs = (node, getChildren, cb) => {
  const stopSearchChildren = cb(node);
  // cb 返回真值就停止搜索子树，但仍然会搜索兄弟节点
  if (stopSearchChildren) {
    return;
  }

  for (const child of getChildren(node)) {
    dfs(child, getChildren, cb);
  }
};

/**
 * 深度优先搜索（非递归实现）
 * 
 * 用一个队列来保存下一个要遍历的节点
 * 每次从队列中取出一个元素，都将它的所有子节点放到列头
 */
export const dfsNonRecursive = (node, getChildren, cb) => {
  let queue = [node];
  const visitSet = new Set();

  while (queue.length !== 0) {
    const head = queue.shift();

    // 避免有环
    if (visitSet.has(head)) {
      return;
    }
    visitSet.add(head);

    const stopSearchChildren = cb(head);
    // cb 返回真值就停止搜索子树，但仍然会搜索兄弟节点
    if (stopSearchChildren) {
      continue;
    }

    const children = getChildren(head);
    // 放在列头，下次循环从列头取
    // 保证先遍历完子节点之后，再遍历兄弟节点
    queue = [...children, ...queue];
  };
};

/**
 * 广度优先搜索
 * 
 * @param node tree 的当前节点
 * @param getChildren 获取子节点之方法
 * @param cb 访问每个节点时触发的回调，回调返回 true 则停止搜索
 * 
 */
export const bfs = (node, getChildren, cb) => {
  const queue = [node];
  const visitSet = new Set();

  while (queue.length !== 0) {
    const head = queue.shift();

    // 避免有环
    if (visitSet.has(head)) {
      continue;
    }
    visitSet.add(head);

    const stopSearchChildren = cb(head);
    // cb 返回真值就停止搜索子树，但仍然会搜索兄弟节点
    if (stopSearchChildren) {
      continue;
    }

    const children = getChildren(head);
    // 放在列尾，下次循环从列头取
    // 能保证把所有兄弟节点遍历完之后再开始遍历子节点
    queue.push(...children);
  }
};
