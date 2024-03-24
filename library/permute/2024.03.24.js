/**
 * 回溯法生成全排列
 */
const permute = (arr) => {
  if (arr.length === 1) {
    return [arr];
  }

  let total = [];
  for (let i = 0; i < arr.length; i++) {
    const cur = arr[i];
    const reminder = [...arr.slice(0, i), ...arr.slice(i + 1, arr.length)];

    const recursive = permute(reminder);
    for (let j = 0; j < recursive.length; j++) {
      total.push([cur, ...recursive[j]]);
    }
  }
  return total;
};

debugger
const r = permute(['a', 'b', 'c']);
debugger;