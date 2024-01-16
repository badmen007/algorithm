// 拓扑排序
function sortedTopology(graph) {
  const inMap = new Map()
  const zeroInQueue = []

  for(const node of Object.values(graph.nodes)) {
    inMap.set(node, node.in);
    if (node.in == 0) {
      zeroInQueue.push(node)
    }
  }

  const result = []

  // 消掉影响其实就是把当前节点的所有邻居的入度都减去1
  // 然后看那些节点的入度为0 ，为0就放入队列中，周而复始
  while(zeroInQueue.length > 0) {
    const cur = zeroInQueue.shift()
    result.push(cur)

    for(const next of cur.nexts) {
      inMap.set(next, inMap.get(next) - 1)
      if (inMap.get(next) == 0) {
        zeroInQueue.push(next)
      }
    }
  }

  return result
}