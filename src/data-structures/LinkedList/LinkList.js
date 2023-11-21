import { LinkedListNode } from "./LinkedListNode.js";

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  prepend(value) {
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;
    if (!this.tail) {
      this.tail = newNode;
    }
    return this;
  }
  append(value) {
    const newNode = new LinkedListNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }
    this.tail.next = newNode;
    this.tail = newNode;
    return this;
  }
  deleteHead() {
    if (!this.head) {
      return null;
    }

    const deletedHead = this.head;
    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }
  reverse() {
    let curNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while (curNode) {
      nextNode = curNode.next;
      curNode.next = prevNode;
      prevNode = curNode;
      curNode = nextNode;
    }

    this.tail = this.head;
    this.head = prevNode;
  }
}

export default LinkedList;
