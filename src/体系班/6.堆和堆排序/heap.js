class MyMaxHeap {
  constructor(limit) {
    this.heap = new Array(limit);
    this.limit = limit;
    this.heapSize = 0;
  }
  isEmpty() {
    return this.heapSize === 0;
  }
  isFull() {
    return this.heapSize === this.limit;
  }
  push(value) {
    if (this.heapSize === this.limit) {
      throw new Error("heap is full");
    }
    this.heap[this.heapSize] = value;
    this.heapInsert(this.heapSize++);
  }
  pop() {
    const ans = this.heap[0];
    this.swap(0, --this.heapSize);
    this.heapify(0);
    return ans;
  }
  heapInsert(index) {
    // 注意这里向下取整 一定要记住
    while (this.heap[index] > this.heap[Math.floor((index - 1) / 2)]) {
      this.swap(index, Math.floor((index - 1) / 2));
      index = Math.floor((index - 1) / 2);
    }
  }
  heapify(index) {
    let left = 2 * index + 1;
    while (left < this.heapSize) {
      //首先看看左边和右边哪个值更大
      let largest =
        left + 1 < this.heapSize && this.heap[left + 1] > this.heap[left]
          ? left + 1
          : left;
      // 再看跟父亲比较 哪个更大
      largest = this.heap[largest] > this.heap[index] ? largest : index;
      // 说明不用换了 当前值比儿子都大
      if (largest === index) {
        break;
      }
      this.swap(largest, index);
      index = largest;
      left = 2 * index + 1;
    }
  }
  swap(i, j) {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }
}

// 测试的
class RightMaxHeap {
  constructor(limit) {
    this.arr = new Array(limit);
    this.limit = limit;
    this.size = 0;
  }
  isEmpty() {
    return this.size === 0;
  }
  isFull() {
    return this.size === this.limit;
  }
  push(value) {
    if (this.size === this.limit) {
      throw new Error("heap is full");
    }
    this.arr[this.size++] = value;
  }
  pop() {
    let maxIndex = 0;
    for (let i = 1; i < this.size; i++) {
      if (this.arr[i] > this.arr[maxIndex]) {
        maxIndex = i;
      }
    }
    const ans = this.arr[maxIndex];
    // 把最后一个补上来
    this.arr[maxIndex] = this.arr[--this.size];
    return ans;
  }
}

// Test the heaps
// const heap = new MyMaxHeap(10);
// heap.push(5);
// heap.push(5);
// heap.push(5);
// heap.push(3);
// console.log(heap.pop()); // 5
// heap.push(7);
// heap.push(0);
// heap.push(7);
// heap.push(0);
// heap.push(7);
// heap.push(0);
// console.log(heap.pop()); // 7

function test() {
  const value = 1000;
  const limit = 100;
  const testTimes = 1000000;

  for (let i = 0; i < testTimes; i++) {
    const curLimit = Math.floor(Math.random() * limit) + 1;
    const my = new MyMaxHeap(curLimit);
    const test = new RightMaxHeap(curLimit);
    const curOpTimes = Math.floor(Math.random() * limit);
    for (let j = 0; j < curOpTimes; j++) {
      if (my.isEmpty() !== test.isEmpty()) {
        console.log("Oops1!");
        break;
      }
      if (my.isFull() !== test.isFull()) {
        console.log("Oops2!");
        break;
      }
      if (my.isEmpty()) {
        const curValue = Math.floor(Math.random() * value);
        my.push(curValue);
        test.push(curValue);
      } else if (my.isFull()) {
        if (my.pop() !== test.pop()) {
          console.log("Oops3!");
          console.log(my.pop(), test.pop());
          console.log(my.heap, test.arr);
          break;
        }
      } else {
        if (Math.random() < 0.5) {
          const curValue = Math.floor(Math.random() * value);
          my.push(curValue);
          test.push(curValue);
        } else {
          if (my.pop() !== test.pop()) {
            console.log("Oops4!");
            console.log(my.heap, test.arr);
            console.log(my.pop(), test.pop());
            break;
          }
        }
      }
    }
  }
}

test();
