export default class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  prepend(value) {
    const newNode = new DoublyLinkedList(value, this.head);
    if (this.head) {
      this.head.previous = newNode;
    }
    this.head = newNode;
    if (!this.tail) {
      this.tail = newNode;
    }
    return this;
  }
  append(value) {
    const newNode = new DoublyLinkedList(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }
    this.tail.next = newNode;
    newNode.previous = this.tail;
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
      this.head.previous = null;
    } else {
      this.head = null;
      this.tail = null;
    }
    return deletedHead;
  }
  deleteTail() {
    if (!this.tail) {
      return null;
    }

    if (this.head === this.tail) {
      const deletedTail = this.tail;
      this.head = null;
      this.tail = null;
      return deletedTail;
    }
    const deleteTail = this.tail;
    this.tail = this.tail.previous;
    this.tail.next = null;

    return deleteTail;
  }
  reverse() {
    let curNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while (curNode) {
      nextNode = curNode.next;
      prevNode = curNode.previous;

      curNode.next = prevNode;
      curNode.previous = nextNode;

      prevNode = curNode;
      curNode = nextNode;
    }

    this.tail = this.head;
    this.head = prevNode;

    return this;
  }
}
