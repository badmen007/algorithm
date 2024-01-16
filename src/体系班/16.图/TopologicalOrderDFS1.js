// https://www.lintcode.com/problem/topological-sorting

class DirectedGraphNode {
  constructor(x) {
    this.label = x;
    this.neighbors = [];
  }
}

class Record {
  constructor(node, deep) {
    this.node = node;
    this.deep = deep;
  }
}

class MyComparator {
  compare(o1, o2) {
    return o2.deep - o1.deep;
  }
}

function topSort(graph) {
  const order = new Map();

  function f(cur) {
    if (order.has(cur)) {
      return order.get(cur);
    }
    let follow = 0;
    for (const next of cur.neighbors) {
      follow = Math.max(follow, f(next).deep);
    }
    const ans = new Record(cur, follow + 1);
    order.set(cur, ans);
    return ans;
  }

  for (const cur of graph) {
    f(cur, order);
  }

  const recordArr = Array.from(order.values());
  recordArr.sort((a, b) => new MyComparator().compare(a, b));

  const ans = recordArr.map((r) => r.node);
  return ans;
}
