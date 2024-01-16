
// https://www.lintcode.com/problem/topological-sorting

// 这道题这里只是写的思路 具体的这道题的图结构 没有构建出来

class DirectedGraphNode {
  constructor(x) {
    this.label = x;
    this.neighbors = [];
  }
}

class Record {
  constructor(n, o) {
    this.node = n;
    this.nodes = o
  }
}

function topSort(graph) {
  const order = new Map()

  for(const cur of graph) {
    f(cur, order)
  }
  const recordArr = []
  for(const item of order.values()) {
    recordArr.push(item)
  }
  recordArr.sort((a, b) => b.nodes - a.nodes);
  const ans = recordArr.map(item => item.node)
  return ans
}

function f(cur, order) {
  if (order.has(cur)) {
    return order.get(cur)
  }
  let nodes = 0
  for(const next of cur.neighbors) {
    nodes += f(next, order).nodes
  }
  const ans = new Record(cur, nodes+1)
  order.set(cur, ans)
  return ans
}

