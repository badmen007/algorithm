class PriorityQueue {
  constructor(comparator) {
    this.comparator = comparator;
    this.heap = [];
  }
  isEmpty() {
    return this.heap.length == 0;
  }
  peek() {
    return this.heap[0];
  }
  add(value) {
    this.heap.unshift(value);
    this.heapify();
  }
  poll() {
    if (this.heap.length == 1) {
      return this.heap.pop()
    }
    const ans = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapify(0);
    return ans;
  }
  heapify(customIndex = 0) {
    let left = 2 * customIndex + 1;
    while (left < this.heap.length) {
      let index =
        left + 1 < this.heap.length &&
        this.comparator(this.heap[left + 1], this.heap[left]) < 0
          ? left + 1
          : left;
      index =
        this.comparator(this.heap[index], this.heap[customIndex]) < 0
          ? index
          : customIndex;
      if (index === customIndex) {
        break;
      }
      this.swap(index, customIndex);
      customIndex = index;
    }
  }
  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    // const temp = this.heap[i]
    // this.heap[i] = this.heap[j]
    // this.heap[j] = temp
  }
}

class Program {
  constructor(p, c) {
    this.p = p; // 利润
    this.c = c; // 花费
  }
}

/**
 *
 * @param {*} K 项目个数
 * @param {*} W 初始资金
 * @param {*} profits 利润
 * @param {*} capital
 */
function findMaximizedCapital(K, W, profits, capital) {
  const minCost = new PriorityQueue((a, b) => a.c - b.c);
  const maxProfit = new PriorityQueue((a, b) => b.p - a.p);

  for (let i = 0; i < profits.length; i++) {
    minCost.add(new Program(profits[i], capital[i]));
  }

  for (let i = 0; i < K; i++) {
    while (!minCost.isEmpty() && minCost.peek().c <= W) {
      maxProfit.add(minCost.poll());
    }

    if (maxProfit.isEmpty()) {
      return W;
    }

    W += maxProfit.poll().p;
  }
  return W;
}

const K = 3;
const W = 0;
const Profits = [1, 2, 3];
const Capital = [0, 1, 1];

const result = findMaximizedCapital(K, W, Profits, Capital);
console.log(result);
