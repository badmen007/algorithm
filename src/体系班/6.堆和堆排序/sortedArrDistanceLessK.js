// 1. 从数组的第一个位置开始 弄成长度不大于k的小根队
// 2. 小根堆依次弹出第一个，然后小根堆在push一个
// 3. 当index到达arr.length的时候说明只剩下小根队中的数了，依次弹出即可
function sortedArrDistanceLessK(arr, k) {
  if (k == 0) {
    return;
  }
  const heap = new MinHeap();
  let index = 0;

  for (; index <= Math.min(arr.length - 1, k - 1); index++) {
    heap.push(arr[index]);
  }

  let i = 0;

  for (; index < arr.length; i++, index++) {
    arr[i] = heap.pop();
    heap.push(arr[index]);
  }

  while (!heap.isEmpty()) {
    arr[i++] = heap.pop();
  }
}

// 小根堆
class MinHeap {
  constructor() {
    this.heap = [];
  }
  isEmpty() {
    return this.heap.length === 0;
  }
  push(value) {
    this.heap.push(value);
    this.heapInsert();
  }
  pop() {
    if (this.isEmpty()) {
      throw new Error("heap is empty");
    }
    const value = this.heap[0];
    this.swap(0, this.heap.length - 1);
    this.heap.pop();
    this.heapify(0);
    return value;
  }

  heapify(index) {
    let left = index * 2 + 1;

    while (left < this.heap.length) {
      let smallest =
        left + 1 < this.heap.length && this.heap[left + 1] < this.heap[left]
          ? left + 1
          : left;
      smallest = this.heap[smallest] < this.heap[index] ? smallest : index;

      if (smallest === index) {
        break;
      }
      this.swap(smallest, index);
      index = smallest;
      left = index * 2 + 1;
    }
  }

  heapInsert() {
    let index = this.heap.length - 1;
    const parentIndex = Math.floor((index - 1) / 2);
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

// for test
function randomArrayNoMoveMoreK(maxSize, maxValue, k) {
  const arr = new Array(Math.floor(Math.random() * (maxSize + 1)));

  // 先排个序
  arr.sort((a, b) => a - b);

  const isSwap = new Array(arr.length).fill(false);

  for (let i = 0; i < arr.length; i++) {
    // 为什么要用Math.min呢  因为数组的长度可能没有k的值大
    const j = Math.min(i + Math.floor(Math.random() * (k + 1)), arr.length - 1);
    // 然后开始随意交换，但是保证每个数距离不超过K
    // swap[i] == true, 表示i位置已经参与过交换
    // swap[i] == false, 表示i位置没有参与过交换
    if (!isSwap[i] && !isSwap[j]) {
      isSwap[i] = true;
      isSwap[j] = true;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  return arr;
}

function copyArr(arr) {
  return arr.slice();
}

function comparator(arr) {
  return arr.sort((a, b) => a - b);
}

function isEqual(arr1, arr2) {
  if (!arr1 && !arr2) return true;
  if (!arr1 || !arr2 || arr1.length !== arr2.length) return false;
  return arr1.every((item, index) => item == arr2[index]);
}

function test() {
  const maxSize = 100;
  const maxValue = 100;
  const testTime = 100000;
  let succeed = true;
  for (let i = 0; i < testTime; i++) {
    const k = Math.floor(Math.random() * maxSize) + 1;
    const arr1 = randomArrayNoMoveMoreK(maxSize, maxValue, k);
    const arr2 = copyArr(arr1);
    sortedArrDistanceLessK(arr1, k);
    comparator(arr2);
    if (!isEqual(arr1, arr2)) {
      console.log(arr1, arr2);
      succeed = false;
      break;
    }
  }
  console.log(succeed ? "Nice" : "Fuck");
}

test();
