// 最小生成树

// 写一个并查集
class UnionFind {
  constructor() {
    this.fatherMap = new Map();
    this.sizeMap = new Map();
  }
  makeSets(nodes) {
    for (const node of nodes) {
      this.fatherMap.set(node, node);
      this.sizeMap.set(node, 1);
    }
  }
  findFather(n) {
    const path = [];
    while (n !== this.fatherMap.get(n)) {
      path.push(n);
      n = this.fatherMap.get(n);
    }
    while (path.length > 0) {
      this.fatherMap.set(path.pop(), n);
    }
    return n;
  }
  isSameSet(a, b) {
    return this.findFather(a) === this.findFather(b);
  }
  union(a, b) {
    if (a == null || b == null) {
      return;
    }
    const aFather = this.findFather(a);
    const bFather = this.findFather(b);
    if (aFather !== bFather) {
      const aFatherSize = this.sizeMap.get(aFather);
      const bFatherSize = this.sizeMap.get(bFather);

      if (aFatherSize >= bFatherSize) {
        this.fatherMap.set(bFather, aFather);
        this.sizeMap.set(aFather, aFatherSize + bFatherSize);
        this.sizeMap.delete(bFather);
      } else {
        this.fatherMap.set(aFather, bFather);
        this.sizeMap.set(bFather, aFatherSize + bFatherSize);
        this.sizeMap.delete(aFather);
      }
    }
  }
}
// 写一个优先级队列 小根堆或者是大根堆
class PriorityQueue {
  constructor(comparator) {
    this.heap = [];
    this.compare = comparator;
  }
  size() {
    return this.heap.length;
  }
  add(value) {
    this.heap.push(value);
    this.heapifyUp();
  }
  poll() {
    if (this.size() == 0) {
      return null;
    }
    if (this.size() === 1) {
      return this.heap[0];
    }
    const ans = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return ans;
  }
  heapifyDown() {
    // let index = 0;
    // let leftIndex = 2 * index + 1;
    // while (leftIndex < this.size()) {
    //   let smallestIndex =
    //     leftIndex + 1 < this.size() &&
    //     this.compare(this.heap[leftIndex + 1], this.heap[leftIndex]) < 0
    //       ? leftIndex + 1
    //       : leftIndex;
    //   smallestIndex = this.compare(this.heap[smallestIndex], this.heap[index])
    //     ? smallestIndex
    //     : index;
    //   if (smallestIndex == index) {
    //     break;
    //   }
    //   this.swap(smallestIndex, index);
    //   index = smallestIndex;
    //   leftIndex = index * 2 + 1
    // }
    let index = 0
    while(true) {
      const leftIndex = 2 * index + 1;
      const rightIndex = 2 * index + 2;
      let smallestIndex = index
      if (leftIndex < this.size() && this.compare(this.heap[leftIndex], this.heap[index]) < 0) {
        smallestIndex = leftIndex
      }

      if (rightIndex < this.size()&& this.compare(this.heap[rightIndex], this.heap[index]) < 0) {
        smallestIndex = rightIndex
      }

      if (smallestIndex == index) {
        break
      }
      this.swap(smallestIndex, index)
      index = smallestIndex
    }
  }
  heapifyUp() {
    let currentIndex = this.size() - 1;

    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      if (this.compare(this.heap[currentIndex], this.heap[parentIndex]) < 0) {
        this.swap(currentIndex, parentIndex);
        currentIndex = parentIndex;
      } else {
        break;
      }
    }
  }
  swap(i, j) {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }
}


function kruskalMST(graph) {
  const unionFind = new UnionFind();
  unionFind.makeSets(Object.values(graph.nodes));
  const priority = new priorityQueue((a, b) => a.weight - b.weight);
  for (const edge of graph.edges) {
    priority.add(edge);
  }
  const result = new Set();
  while (priority.length > 0) {
    const edge = priority.poll();
    if (!unionFind.isSameSet(edge.from, edge.to)) {
      result.push(edge);
      unionFind.union(edge.from, edge.to);
    }
  }
  return result;
}
