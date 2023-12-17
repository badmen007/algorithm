// 两个队列，queue 和 help
// 往queue中push
// 当要弹出的时候，将queue中的数放入help中，只留下一个，将这个数弹出
// 交换两个队列的内存地址
class TwoQueueStack {
  constructor() {
    this.queue = [];
    this.help = [];
  }
  push(value) {
    this.queue.push(value);
  }
  // 移除并返回头部元素
  poll() {
    while (this.queue.length > 1) {
      this.help.push(this.queue.shift());
    }
    const ans = this.queue.shift();
    [this.queue, this.help] = [this.help, this.queue];
    return ans;
  }
  // 返回头部元素
  peek() {
    while (this.queue.length > 1) {
      this.help.push(this.queue.shift());
    }
    const ans = this.queue.shift();
    this.help.push(ans);
    [this.queue, this.help] = [this.help, this.queue];
    return ans;
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

function test() {
  const myStack = new TwoQueueStack();
  const test = [];
  const testTime = 100000;
  const max = 100000;
  console.log("begin");
  for (let i = 0; i < testTime; i++) {
    if (myStack.isEmpty()) {
      if (test.length) {
        console.log("wrong");
        break;
      }
      const num = Math.floor(Math.random() * max);
      myStack.push(num);
      test.push(num);
    } else {
      if (Math.random() < 0.25) {
        const num = Math.floor(Math.random() * max);
        myStack.push(num);
        test.push(num);
      } else if (Math.random() < 0.5) {
        if (myStack.peek() !== test[test.length - 1]) {
          console.log("wrong");
          break;
        }
      } else {
        if (myStack.poll() !== test.pop()) {
          console.log("wrong");
          break;
        }
      }
    }
  }
  console.log("end");
}
test();
