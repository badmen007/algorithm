// 这个题的核心思想就是
// 1. 两个栈，一个用来存数据，一个用来存最小值
// 2. 存储值的时候：
//    存数据的栈直接往里面放就行
//    存最小值栈 逻辑是 此时栈为空或者当前存入的值小于之前存入的数就push当前值，否则就存入此时栈中最小的值
// 3. pop 的话俩个一起pop就行了 没有额外逻辑
class MyStack {
  constructor() {
    this.stackData = [];
    this.stackMin = [];
  }

  push(newNum) {
    if (this.stackMin.length === 0 || newNum <= this.getMin()) {
      this.stackMin.push(newNum);
    }
    this.stackData.push(newNum);
  }

  pop() {
    if (this.stackData.length === 0) {
      throw new Error("Your stack is empty.");
    }
    const value = this.stackData.pop();
    if (value === this.getMin()) {
      this.stackMin.pop();
    }
    return value;
  }

  getMin() {
    if (this.stackMin.length === 0) {
      throw new Error("your stack is empty");
    }
    return this.stackMin[this.stackMin.length - 1];
  }
}

class MyStack1 {
  constructor() {
    this.stackData = [];
    this.stackMin = [];
  }

  push(newNum) {
    if (this.stackMin.length === 0 || newNum < this.getMin()) {
      this.stackMin.push(newNum);
    } else {
      this.stackMin.push(this.getMin());
    }
    this.stackData.push(newNum);
  }

  pop() {
    if (this.stackData.length === 0) {
      throw new Error("Your stack is empty.");
    }
    this.stackMin.pop();
    return this.stackData.pop();
  }

  getMin() {
    if (this.stackMin.length === 0) {
      throw new Error("your stack is empty");
    }
    return this.stackMin[this.stackMin.length - 1];
  }
}

function test() {
  const stack = new MyStack();
  stack.push(3);
  console.log(stack.getMin());
  stack.push(4);
  console.log(stack.getMin());
  stack.push(1);
  console.log(stack.getMin());

  const stack1 = new MyStack();
  stack1.push(3);
  console.log(stack1.getMin());
  stack1.push(4);
  console.log(stack1.getMin());
  stack1.push(1);
  console.log(stack1.getMin());
}
test();
