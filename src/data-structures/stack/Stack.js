import LinkedList from "../LinkedList/LinkList";

export default class Stack {
  constructor() {
    this.linkedList = new LinkedList();
  }
  isEmpty() {
    return !this.linkedList.head;
  }
  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.linkedList.head.value;
  }
  push(value) {
    this.linkedList.prepend(value);
  }
  pop() {
    const removedHead = this.linkedList.deleteHead();
    return removedHead ? removedHead.value : null;
  }
}
