// 宽度优先遍历
// 准备一个队列和栈 将开始的节点放到队列和栈中
// 当队列中还有值的时候 ，队列中弹出一个 打印
// 遍历弹出节点所有的邻居
// 如果邻居在set中有的话 就不往队列中放了 
function bfs(start) {
  if (start === null) {
    return;
  }

  const queue = [];
  const set = new Set();

  queue.push(start);
  set.add(start);

  while (queue.length > 0) {
    const cur = queue.shift();
    console.log(cur.value);

    for (const next of cur.nexts) {
      if (!set.has(next)) {
        set.add(next);
        queue.push(next);
      }
    }
  }
}

