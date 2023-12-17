// 单链表
class LinkedListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

function removeValue(head, num) {
  // head来到第一个不需要删的位置
  while (head !== null) {
    if (head.value !== num) {
      break;
    }
    head = head.next;
  }
  // 1 ) head == null
  // 2 ) head !== null
  let pre = head;
  let cur = head;
  while (cur !== null) {
    if (cur.value === num) {
      pre.next = cur.next;
    } else {
      pre = cur;
    }
    cur = cur.next;
  }
  return head;
}

// for test
function generateRandomLinkedList(len, value) {
  const head = new LinkedListNode(Math.floor(Math.random() * value));
  let current = head;
  for (let i = 0; i < len; i++) {
    current.next = new LinkedListNode(Math.floor(Math.random() * value));
    current = current.next;
  }
  return head;
}

function getOriginLinkedListOrder(head) {
  let curNode = head;
  const list = [];
  while (curNode) {
    list.push(curNode.value);
    curNode = curNode.next;
  }
  return list;
}

function check(list, head) {
  let current = head;
  for (let i = 0; i < list.length; i++) {
    if (list[i] !== current.value) {
      return false;
    }
    current = current.next;
  }
  return true;
}

function test() {
  const len = 5;
  const value = 100;
  const testTime = 100000;
  console.log("begin");
  for (let i = 0; i < testTime; i++) {
    let node1 = generateRandomLinkedList(len, value);
    let list = getOriginLinkedListOrder(node1);
    let num;
    do {
      num = Math.floor(Math.random() * value);
    } while (!list.includes(num));
    let node2 = removeValue(node1, num);
    list = list.filter((item) => item !== num);
    if (!check(list, node2)) {
      console.log(num)
      console.log(list);
      console.dir(node2, { depth: 100 });
      break;
    }
  }
  console.log("end");
}

test();
