// 线段最大重合问题

// 小根堆
class MinHeap {
  constructor() {
    this.heap = [];
  }
  isEmpty() {
    return this.heap.length === 0;
  }
  size() {
    return this.heap.length;
  }
  peek() {
    if (!this.isEmpty()) {
      return this.heap[0];
    }
  }
  add(value) {
    this.heap.push(value);
    this.heapInsert();
  }
  poll() {
    if (this.isEmpty()) {
      throw new Error("heap is empty");
    }
    const value = this.heap[0];
    this.swap(0, this.heap.length - 1)
    this.heap.pop()
    this.heapify(0);
    return value;
  }
  heapify(index) {
    let left = 2 * index + 1;
    while (left < this.heap.length) {
      let smaller =
        left + 1 < this.heap.length && this.heap[left + 1] < this.heap[left]
          ? left + 1
          : left;
      smaller = this.heap[smaller] < this.heap[index] ? smaller : index;
      if (smaller === index) {
        break;
      }
      this.swap(smaller, index);
      index = smaller;
      left = 2 * index + 1;
    }
  }
  heapInsert() {
    let index = this.heap.length - 1;
    let parentIndex = Math.floor((index - 1) / 2);
    while (this.heap[index] < this.heap[parentIndex]) {
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }
  swap(i, j) {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }
}

class Line {
  constructor(s, e) {
    this.start = s;
    this.end = e;
  }
}
// 找点 看有多少条线过这个点 找到那个最大的值就行了
// 这个点可以是min加上0-1上任何的数

function maxCover1(lines) {
  //  确保不会过界
  let min = Number.MAX_VALUE;
  let max = Number.MIN_VALUE;

  // 这个lines [1, 2] 这样的数据结构 代表两个点
  for (let i = 0; i < lines.length; i++) {
    min = Math.min(min, lines[i][0]);
    max = Math.max(max, lines[i][1]);
  }

  let cover = 0;

  for (let p = min + 0.5; p < max; p++) {
    let cur = 0;

    for (let i = 0; i < lines.length; i++) {
      if (lines[i][0] < p && p < lines[i][1]) {
        cur++;
      }
    }
    cover = Math.max(cover, cur);
  }

  return cover;
}

function maxCover2(lines) {
  // 首先lines要按照左端点的大小从小到大排序
  lines = lines.map(([start, end]) => new Line(start, end));
  lines.sort((a, b) => a.start - b.start);

  const heap = new MinHeap();
  let max = 0;
  for (let i = 0; i < lines.length; i++) {
    // 先弹出堆里面比当前数小的
    while (!heap.isEmpty() && heap.peek() <= lines[i].start) {
      heap.poll();
    }
    // 把右端点放到小根堆中
    heap.add(lines[i].end);
    // 求一下最大值
    max = Math.max(max, heap.size());
  }
  return max;
}

function maxCover3(lines) {
  lines = lines.map(([start, end]) => new Line(start, end));
  lines.sort((a, b) => a.start - b.start);

  const heap = [];
  let max = 0;
  for (let i = 0; i < lines.length; i++) {
    while (heap.length > 0 && heap[0] <= lines[i].start) {
      heap.shift();
    }

    heap.push(lines[i].end);
    heap.sort((a, b) => a - b); // 维护小根堆
    max = Math.max(max, heap.length);
  }
  return max;
}

// for test
function generateLines(N, L, R) {
  const size = Math.floor(Math.random() * N) + 1;
  const ans = [];
  for (let i = 0; i < size; i++) {
    let a = Math.floor(Math.random() * (R - L + 1));
    let b = Math.floor(Math.random() * (R - L + 1));
    if (a == b) {
      b = a + 1;
    }
    ans.push([Math.min(a, b), Math.max(a, b)]);
  }
  return ans;
}

function test() {
  const N = 3;
  const L = 0;
  const R = 200;
  const testTime = 100000;
  let succeed = true;
  for (let i = 0; i < testTime; i++) {
    const lines = generateLines(N, L, R);
    const ans1 = maxCover1(lines);
    const ans2 = maxCover2(lines);
    const ans3 = maxCover3(lines);

    if (ans1 !== ans2 || ans1 !== ans3) {
      console.log(lines)
      console.log(ans1);
      console.log(ans2);
      succeed = false;
      break;
    }
  }
  console.log(succeed ? "Nice" : "Fuck");
}

test();
