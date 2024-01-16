// 深度优先遍历

function dfs(node) {
  if (node == null) {
    return
  }
  const stack = []
  const set = new Set()
  stack.push(node)
  set.add(node)
  console.log(node.value)
  while(stack.length) {
    const cur = stack.pop()
    // cur.nexts代表的是邻居
    for(const item of cur.nexts) {
      if (!set.has(item)) {
        stack.push(cur)
        stack.push(item)
        set.add(item);
        console.log(item.value)
        // 直接跳出循环
        break
      }
    }
  }
}