// 测试链接 : https://leetcode.com/problems/copy-list-with-random-pointer/
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.random = null;
  }
}

// 利用map做一个映射 key是老节点 value是新节点
function copyRandomList1(head) {
  const map = new Map();
  let cur = head;
  while (cur) {
    map.set(cur, new Node(cur.val));
    cur = cur.next;
  }

  cur = head;
  while (cur) {
    map.get(cur).next = map.get(cur.next) || null;
    map.get(cur).random = map.get(cur.random);
    cur = cur.next;
  }
  return map.get(head);
}

// 将复制的节点插入到原来节点的后一个
function copyRandomList2(head) {
  if (!head) return null;

  let cur = head;
  let next = null;
  // 这个循环是创建新的节点
  while (cur) {
    next = cur.next;
    cur.next = new Node(cur.val);
    cur.next.next = next;
    cur = next;
  }

  cur = head;
  let copy = null;
  // 这个循环是更新新节点的指向
  while (cur) {
    next = cur.next.next;
    copy = cur.next;
    copy.random = cur.random ? cur.random.next : null;
    cur = next;
  }
  const res = head.next;
  cur = head;
  // 将原来的链表修复
  while (cur) {
    next = cur.next.next;
    copy = cur.next;
    cur.next = next;
    copy.next = next ? next.next : null;
    cur = next;
  }
  return res;
}

let node1 = new Node(1);
let node2 = new Node(2);
let node3 = new Node(3);

node1.next = node2;
node2.next = node3;
node1.random = node3;
node2.random = node1;

// 使用 copyRandomList1 复制链表
let copiedList1 = copyRandomList1(node1);
console.log(copiedList1);

// 使用 copyRandomList2 复制链表
console.log(node1);
let copiedList2 = copyRandomList2(node1);
console.log(copiedList2);


const map = new Map()
map.set(1, 2)
console.log(map.get(2));