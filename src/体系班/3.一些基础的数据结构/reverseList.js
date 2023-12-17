// 单链表
class LinkedListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}
// 双链表
class DoubleLinkedListNode {
  constructor(value, last = null, next = null) {
    this.value = value;
    this.last = last;
    this.next = next;
  }
}

function reverseLinkedList(head) {
  let pre = null;
  let next = null;
  while (head !== null) {
    next = head.next;
    head.next = pre;
    pre = head;
    head = next;
  }
  return pre;
}

function reverseDoubleLinkedList(head) {
  let pre = null;
  let next = null;
  while (head != null) {
    next = head.next;
    head.next = pre;
    head.last = next;
    pre = head;
    head = next;
  }
  return pre;
}

// for test
function testReverseLinkedList(head) {
  if (head == null) {
    return null;
  }

  const list = [];
  while (head !== null) {
    list.push(head);
    head = head.next;
  }
  list[0].next = null;
  const N = list.length;
  for (let i = 1; i < N; i++) {
    list[i].next = list[i - 1];
  }
  return list[N - 1];
}

// for test
function testDoubleLinkedList(head) {
  if (head == null) {
    return null;
  }
  const list = [];
  while (head !== null) {
    list.push(head);
    head = head.next;
  }

  list[0].next = null;
  let pre = list[0];
  const N = list.length;

  // 这里不好理解
  for (let i = 1; i < N; i++) {
    let curNode = list[i];
    curNode.last = null;
    curNode.next = pre;
    pre.last = curNode;
    pre = curNode;
  }
  return list[N - 1];
}

// for test
// 怎样去随机生成一个链表
function generateRandomLinkedList(len, value) {
  const head = new LinkedListNode(Math.floor(Math.random() * value));
  let current = head;
  for (let i = 0; i < len; i++) {
    current.next = new LinkedListNode(Math.floor(Math.random() * value));
    current = current.next;
  }
  return head;
}

function getLinkedListOriginOrder(head) {
  let list = [];
  while (head) {
    list.push(head.value);
    head = head.next;
  }
  return list;
}

function checkLinkedListReverse(originList, reversedHead) {
  let current = reversedHead;
  for (let i = originList.length - 1; i >= 0; i--) {
    if (!current || current.value !== originList[i]) {
      return false;
    }
    current = current.next;
  }
  return true;
}

// 双链表 for test
function generateRandomDoubleList(len, value) {
  const head = new DoubleLinkedListNode(Math.floor(Math.random() * value));
  let current = head;

  for (let i = 0; i < len; i++) {
    const newNode = new DoubleLinkedListNode(Math.floor(Math.random() * value));
    current.next = newNode;
    newNode.last = current;
    current = newNode;
  }
  return head;
}

function getDoubleListOriginOrder(head) {
  const list = [];
  while (!head) {
    list.push(head.value);
    head = head.next;
  }
  return list;
}

function checkDoubleListReverse(originList, reversedHead) {
  const current = reversedHead;
  for (let i = originList.length - 1; i >= 0; i--) {
    if (!current || originList[i] !== current.value) {
      return false;
    }
    current = current.next;
  }
  return true;
}

function test() {
  const len = 50;
  const value = 100;
  const testTime = 100000;
  console.log("开始");
  for (let i = 0; i < testTime; i++) {
    // 测试单链表的反转
    let node1 = generateRandomLinkedList(len, value);
    const list1 = getLinkedListOriginOrder(node1);
    node1 = reverseLinkedList(node1);
    if (!checkLinkedListReverse(list1, node1)) {
      console.log("operation1");
    }

    // 测试单链表测试函数
    let node2 = generateRandomLinkedList(len, value);
    const list2 = getLinkedListOriginOrder(node2);
    node2 = testReverseLinkedList(node2);
    if (!checkLinkedListReverse(list2, node2)) {
      console.log("operation2");
    }

    // 测试双链表反转
    let node3 = generateRandomDoubleList(len, value);
    const list3 = getDoubleListOriginOrder(node3);
    node3 = reverseDoubleLinkedList(node3);
    if (!checkDoubleListReverse(list3, node3)) {
      console.log("operation3");
    }

    // 测试双向链表测试函数
    let node4 = generateRandomDoubleList(len, value);
    const list4 = getDoubleListOriginOrder(node3);
    node4 = testDoubleLinkedList(node4);
    if (!checkDoubleListReverse(list4, node4)) {
      console.log("operation4");
    }
  }
  console.log("结束");
}

test();

// 示例
// let nodeA = new LinkedListNode('a');
// let nodeB = new LinkedListNode('b');
// let nodeC = new LinkedListNode('c');
// nodeA.next = nodeB;
// nodeB.next = nodeC;

// console.log(testReverseLinkedList(nodeA));
