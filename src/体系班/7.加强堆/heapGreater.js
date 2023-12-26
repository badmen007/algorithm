// 加强堆
class HeapGreater {
  constructor(comparator) {
    this.heap = [];
    this.indexMap = new Map();
    this.heapSize = 0;
    this.comp = comparator;
  }
  isEmpty() {
    return this.heap.length === 0;
  }
  size() {
    return this.heap.length;
  }
  contains(obj) {
    return this.indexMap.has(obj);
  }
  peek() {
    return this.heap[0];
  }
  push(obj) {
    this.heap.push(obj);
    this.indexMap.set(obj, this.heapSize);
    this.heapInsert(this.heapSize++);
  }
  pop() {
    const ans = this.heap[0];
    this.swap(0, this.heap.length - 1);
    this.heap.pop();
    this.indexMap.delete(ans);
    this.heapSize--;
    this.heapify(0);
    return ans;
  }
  remove(obj) {
    const replace = this.heap[this.heap.length - 1];
    const index = this.indexMap.get(obj);
    this.indexMap.delete(obj);
    this.heap.pop();
    this.heapSize--;

    if (obj !== replace) {
      this.heap[index] = replace;
      this.indexMap.set(replace, index);
      this.resign(replace);
    }
  }
  resign(obj) {
    this.heapInsert(this.indexMap.get(obj));
    this.heapify(this.indexMap.get(obj));
  }
  hasParent(index) {
    return Math.floor((index - 1) / 2) >= 0;
  }
  getAllElements() {
    return [...this.heap];
  }
  heapInsert(index) {
    while (
      this.hasParent(index) &&
      this.comp(this.heap[index], this.heap[Math.floor((index - 1) / 2)]) < 0
    ) {
      this.swap(index, Math.floor((index - 1) / 2));
      index = Math.floor((index - 1) / 2);
    }
  }
  heapify(index) {
    let left = 2 * index + 1;

    while (left < this.heapSize) {
      let best =
        left + 1 < this.heapSize &&
        this.comp(this.heap[left + 1], this.heap[left]) < 0
          ? left + 1
          : left;
      best = this.comp(this.heap[best], this.heap[index]) < 0 ? best : index;
      if (index === best) {
        break;
      }
      this.swap(best, index);
      index = best;
      left = 2 * index + 1;
    }
  }
  swap(i, j) {
    const o1 = this.heap[i];
    const o2 = this.heap[j];
    this.heap[i] = o2;
    this.heap[j] = o1;
    this.indexMap.set(o2, i);
    this.indexMap.set(o1, j);
  }
}

export default HeapGreater;
