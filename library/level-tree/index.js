const inputs = [
  { level: 1, label: 'item 1' },
  { level: 1, label: 'item 2' },
  { level: 4, label: 'item 3' },
  { level: 2, label: 'item 4' },
  { level: 3, label: 'item 5' },
  { level: 4, label: 'item 6' },
];

const createTree = (inputs) => {
  const root = {
    children: [],
  };

  for (let i = 0; i < inputs.length; i++) {
    const element = inputs[i];
    setElementToTree(root, element);
  }

  return root;
};

const setElementToTree = (root, element) => {
  const { level, label } = element;

  let curLevel = 0;
  let curNode = root;
  while (true) {
    // 从 level 0 开始检查 children

    // 如果检查到了 level-1 层，那就直接 append
    if (curLevel === level - 1) {
      const node = {
        label,
      };
      curNode.children.push(node);
      return;
    }

    // 如果还没到 level-1 层，那就下钻

    // 从第一个 branch 开始下钻，如果没有 branch 那就创建一个
    let hasFoundBranch = false;
    for (let i = 0; i < curNode.children.length; i++) {
      const child = curNode.children[i];
      const isBranch = child.label == null && child.children != null;
      if (isBranch) {
        curLevel++;
        curNode = child;
        hasFoundBranch = true;
        break;
      }
    }
    if (hasFoundBranch) {
      continue;
    }

    const node = {
      children: [],
    };
    curNode.children.push(node);
    curLevel++;
    curNode = node;
  }

};

const print = (node, level) => {
  const isBranch = node.label == null && node.children != null;
  if (!isBranch) {
    return `<ul><li>${node.label}</li></ul>`;
  }

  let s = '<ul>';
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    s += `<li>${print(child, level + 1)}</li>`;
  }
  s += '</ul>'

  return s;
};

const tree = createTree(inputs);
const str = print(tree, 0);
debugger