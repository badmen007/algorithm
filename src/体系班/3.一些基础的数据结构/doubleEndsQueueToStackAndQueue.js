// 双链表实现队列
class Node {
  constructor(data) {
    this.value = data;
    this.last = null;
    this.next = null;
  }
}

class DoubleEndQueue {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  addFromHead(value) {
    const cur = new Node(value);
    if (!this.head) {
      this.head = cur;
      this.tail = cur;
    } else {
      cur.next = this.head;
      this.head.last = cur;
      this.head = cur;
    }
  }

  addFromBottom(value) {
    const cur = new Node(value);
    if (!this.head) {
      this.head = cur;
      this.tail = cur;
    } else {
      cur.last = this.tail;
      this.tail.next = cur;
      this.tail = cur;
    }
  }
  popFromHead() {
    if (!this.head) {
      return null;
    }
    const cur = this.head;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      // 就是要把指向别的节点的都指向null
      this.head = this.head.next;
      cur.next = null;
      this.head.last = null;
    }
    return cur.value;
  }
  popFromBottom() {
    if (!this.head) {
      return null;
    }
    const cur = this.tail;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.last;
      // 这里应该是cur.last = null
      cur.next = null;
      this.tail.next = null;
    }
    return cur.value;
  }
  isEmpty() {
    return !this.head;
  }
}

class MyStack {
  constructor() {
    this.queue = new DoubleEndQueue();
  }
  push(value) {
    this.queue.addFromHead(value);
  }
  pop() {
    return this.queue.popFromHead();
  }
  isEmpty() {
    return this.queue.isEmpty();
  }
}

class MyQueue {
  constructor() {
    this.queue = new DoubleEndQueue();
  }
  push(value) {
    this.queue.addFromHead(value);
  }
  poll() {
    return this.queue.popFromBottom();
  }
  isEmpty() {
    return this.queue.isEmpty();
  }
}

function isEqual(o1, o2) {
  if (o1 === null && o2 !== null) {
    return false;
  }
  if (o1 !== null && o2 === null) {
    return false;
  }
  if (o1 === null && o2 === null) {
    return true;
  }
  return o1 === o2;
}

function test() {
  const oneTestDataNum = 100;
  const value = 100;
  const testTime = 100000;

  for (let i = 0; i < testTime; i++) {
    const myStack = new MyStack();
    const myQueue = new MyQueue();
    const stack = [];
    const queue = [];
    for (let j = 0; j < oneTestDataNum; j++) {
      const num = Math.floor(Math.random() * value);
      if (stack.length === 0) {
        myStack.push(num);
        stack.push(num);
      } else {
        if (Math.random() < 0.5) {
          myStack.push(num);
          stack.push(num);
        } else {
          if (!isEqual(myStack.pop(), stack.pop())) {
            console.log("oops! stack");
            break;
          }
        }
      }

      const numq = Math.floor(Math.random() * value);
      if (queue.length === 0) {
        myQueue.push(numq);
        queue.push(numq);
      } else {
        if (Math.random() < 0.5) {
          myQueue.push(numq);
          queue.push(numq);
        } else {
          if (!isEqual(myQueue.poll(), queue.shift())) {
            console.log("oops! queue");
            break;
          }
        }
      }
    }
  }
  console.log("finish!");
}

test();
