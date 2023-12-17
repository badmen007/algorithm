// ringArray问题
class MyQueue {
  constructor(limit) {
    this.arr = new Array(limit);
    this.pushi = 0;
    this.polli = 0;
    this.size = 0;
    this.limit = limit;
  }
  push(value) {
    if (this.size === this.limit) {
      throw new Error("队列满了，不能再加了");
    }
    this.size++;
    this.arr[this.pushi] = value;
    this.pushi = this.nextIndex(this.pushi);
  }
  pop() {
    if (this.size === 0) {
      throw new Error("队列空了，不能再拿了");
    }
    this.size--;
    const ans = this.arr[this.polli];
    this.polli = this.nextIndex(this.polli);
    return ans;
  }
  nextIndex(i) {
    return i > this.limit - 1 ? 0 : i + 1;
  }

  isEmpty() {
    return this.size === 0;
  }
}

const myQueue = new MyQueue(5);
myQueue.push(1);
myQueue.push(2);
myQueue.pop();
myQueue.push(3);

console.log(myQueue.pop()); // 输出：1
console.log(myQueue.pop()); // 输出：2
console.log(myQueue.isEmpty()); // 输出：false
