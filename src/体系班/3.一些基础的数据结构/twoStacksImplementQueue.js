// 两个栈实现队列
// 1. 准备两个栈push栈和pop栈
// 2. 当pop栈为空的时候，将push栈中所有值弹出到push栈中, 每次操作之前都要先走pushToPop

class TwoStacksQueue {
  constructor() {
    this.stackPush = [];
    this.stackPop = [];
  }
  pushToPop() {
    if (this.stackPop.length === 0) {
      while (this.stackPush.length) {
        this.stackPop.push(this.stackPush.pop());
      }
    }
  }
  add(pushInt) {
    this.stackPush.push(pushInt);
    this.pushToPop();
  }
  poll() {
    if (this.stackPop.length === 0 && !this.stackPush.length) {
      throw new Error("queue is empty");
    }
    this.pushToPop();
    return this.stackPop.pop();
  }
  peek() {
    if (this.stackPop.length === 0 && !this.stackPush.length) {
      throw new Error("queue is empty");
    }
    this.pushToPop();
    return this.stackPop[this.stackPop.length - 1];
  }
}

const twoStacksQueue = new TwoStacksQueue();
twoStacksQueue.add(1);
twoStacksQueue.add(2);
twoStacksQueue.add(3);

console.log(twoStacksQueue.poll()); // 输出：1
console.log(twoStacksQueue.peek()); // 输出：2
twoStacksQueue.add(4);
console.log(twoStacksQueue.poll()); // 输出：2
console.log(twoStacksQueue.poll()); // 输出：3
