class PriorityQueue {
  constructor(compare) {
    this.compare = compare;
    this.heap = [];
  }
  add(value) {
    this.heap.push(value);
    this.heapifyUp();
  }
  poll() {
    if (this.heap.length == 0) {
      return null;
    }
    if (this.heap.length == 1) {
      return this.heap[0];
    }
    const ans = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return ans;
  }
  heapifyDown() {
    let index = 0;
    let left = 2 * index + 1;
    while (left < this.heap.length) {
      let smallestIndex =
        left + 1 < this.heap.length &&
        this.compare(this.heap[left + 1], this.heap[left + 1]) < 0
          ? left + 1
          : left;
      smallestIndex = this.compare(this.heap[smallestIndex],this.heap[index]) < 0
        ? smallestIndex
        : index;
      if (smallestIndex == index) {
        break;
      }
      this.swap(smallestIndex, index);
      index = smallestIndex;
      left = 2 * index + 1;
    }
  }
  heapifyUp() {
    let currentIndex = this.heap.length - 1;
    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      if (this.compare(this.heap[currentIndex], this.heap[parentIndex]) < 0) {
        this.swap(parentIndex, currentIndex);
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

export default PriorityQueue;
