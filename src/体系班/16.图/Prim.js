
// Prim算法
class PriorityQueue {
  constructor(comparator) {
    this.heap = [];
    this.compare = comparator;
  }
  size() {
    return this.heap.length;
  }
  isEmpty() {
    return this.size() === 0
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
    let index = 0;
    while (true) {
      const leftIndex = 2 * index + 1;
      const rightIndex = 2 * index + 2;
      let smallestIndex = index;
      if (
        leftIndex < this.size() &&
        this.compare(this.heap[leftIndex], this.heap[index]) < 0
      ) {
        smallestIndex = leftIndex;
      }

      if (
        rightIndex < this.size() &&
        this.compare(this.heap[rightIndex], this.heap[index]) < 0
      ) {
        smallestIndex = rightIndex;
      }

      if (smallestIndex == index) {
        break;
      }
      this.swap(smallestIndex, index);
      index = smallestIndex;
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

function primMST(graph) {
  const priorityQueue = new PriorityQueue((e1, e2) => e1.weight - e2.weight);
  const nodeSet = new Set();
  const result = new Set();

  for(const node of Object.values(graph.nodes)) {
    if (!nodeSet.has(node)) {
      nodeSet.add(node)
      for(const edge of node.edges) {
        priorityQueue.add(edge)
      }

      while(!priorityQueue.isEmpty()) {
        const edge = priorityQueue.poll()
        const toNode = edge.to

        if (!nodeSet.has(toNode)) {
          nodeSet.add(node);
          result.push(edge)

          for(const nextEdge of toNode.edges) {
            priorityQueue.add(nextEdge)
          }
        }
      }
    }
  }
  return result;
}

