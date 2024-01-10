class PriorityQueue {
  constructor() {
    this.heap = [];
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
      return this.heap.pop();
    }
    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return root;
  }
  heapifyDown(index) {
    let left = index * 2 + 1;

    while (index < this.heap.length) {
      let smallestIndex =
        left + 1 < this.heap.length && this.heap[left + 1] < this.heap[left] ? left + 1 : left;
      smallestIndex = this.heap[index] > this.heap[smallestIndex] ? smallestIndex : index;
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
      if (this.heap[currentIndex] < this.heap[parentIndex]) {
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

// 首先这里要用的是 优先级队列 也就是小根堆
// 先弹出两个计算出和
// 再把计算出的值放入到优先级队列中

// 为什么这样能得到最小值？
function lessMoney2(arr) {
  const pQ = new PriorityQueue();

  for (const item of arr) {
    pQ.add(item);
  }
  let sum = 0;
  let cur = 0;
  while (pQ.size() > 1) {
    cur = pQ.poll() + pQ.poll();
    sum += cur;
    pQ.add(cur);
  }
  return sum
}

// 当数组中只有一个值的时候就停止了
function lessMoney1(arr) {
  if (arr == null || arr.length == 0) {
    return 0
  }
  return process(arr, 0)
}
// 这个终止的条件
function process(arr, pre) {
  if (arr.length === 1) {
    return pre;
  }
  let ans = Number.MAX_VALUE;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      ans = Math.min(
        ans,
        process(copyAndMergeTwo(arr, i, j), pre + arr[i] + arr[j])
      );
    }
  }
  return ans;
}

function copyAndMergeTwo(arr, i, j) {
  const ans = new Array(arr.length - 1);
  let ansi = 0;
  for (let arrI = 0; arrI < arr.length; arrI++) {
    if (arrI !== i && arrI !== j) {
      ans[ansi++] = arr[arrI];
    }
  }
  ans[ansi] = arr[i] + arr[j];
  return ans;
}

// for test
function generateRandomArray(maxSize, maxValue) {
  const arr = new Array(Math.floor(Math.random() * (maxSize + 1)));
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Math.floor(Math.random() * (maxValue + 1));
  }
  return arr;
}

function test() {
  const maxSize = 3;
  const maxValue = 10;
  const testTimes = 10000;
  for (let i = 0; i < testTimes; i++) {
    const arr = generateRandomArray(maxSize, maxValue);
    if (lessMoney2(arr) !== lessMoney1(arr)) {
      console.log(lessMoney2(arr), "lessMoney2");
      console.log(lessMoney1(arr), "lessMoney1");
      console.log(arr);
      break
    }
  }
  console.log('finish');
}
test();
