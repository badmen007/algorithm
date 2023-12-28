class Node {
  constructor(v) {
    this.value = v;
    this.next = null;
  }
}
// 中点或者是上中点
function midOrUpMidNode(head) {
  if (!head || !head.next || !head.next.next) {
    return head;
  }
  // 有三个数
  let slow = head.next
  let fast = head.next.next;
  while(fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow
}
// 中点或者是下中点
function midOrDownMidNode(head) {
  if (!head || !head.next) {
    return head;
  }
  let slow = head.next;
  let fast = head.next;
  while(fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow
}
// 中点或者上中点前一个
function midOrUpMidPreNode(head) {
  // 满足这个条件首先要有三个数
  if (!head || !head.next || !head.next.next) {
    return head;
  }
  let slow = head;
  let fast = head.next.next;
  while(fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next
  }
  return slow
}
// 中点或者下中点前一个
function midOrDownMidPreNode(head) {
  if (!head || !head.next) {
    return head;
  }
  let slow = head;
  let fast = head.next;
  while(fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next
  }
  return slow;
}

function right1(head) {
  if (!head) {
    return null;
  }
  let cur = head;
  let arr = [];
  while (cur) {
    arr.push(cur);
    cur = cur.next;
  }
  return arr[Math.floor((arr.length - 1) / 2)];
}

function right2(head) {
  if (!head) {
    return null;
  }
  let cur = head;
  let arr = [];
  while (cur) {
    arr.push(cur);
    cur = cur.next;
  }
  return arr[Math.floor(arr.length / 2)];
}

function right3(head) {
  if (!head || !head.next || !head.next.next) {
    return null;
  }
  let cur = head;
  let arr = [];
  while (cur) {
    arr.push(cur);
    cur = cur.next;
  }
  return arr[Math.floor((arr.length - 3) / 2)];
}

function right4(head) {
  if (!head || !head.next) {
    return null;
  }
  let cur = head;
  let arr = [];
  while (cur) {
    arr.push(cur);
    cur = cur.next;
  }
  return arr[Math.floor((arr.length - 2) / 2)];
}

// 示例用法
let test = new Node(0);
test.next = new Node(1);
test.next.next = new Node(2);
test.next.next.next = new Node(3);
test.next.next.next.next = new Node(4);
test.next.next.next.next.next = new Node(5);
test.next.next.next.next.next.next = new Node(6);
test.next.next.next.next.next.next.next = new Node(7);
test.next.next.next.next.next.next.next.next = new Node(8);

let ans1 = null;
let ans2 = null;

ans1 = midOrUpMidNode(test);
ans2 = right1(test);
console.log(ans1 ? ans1.value : "无");
console.log(ans2 ? ans2.value : "无");

ans1 = midOrDownMidNode(test);
ans2 = right2(test);
console.log(ans1 ? ans1.value : "无");
console.log(ans2 ? ans2.value : "无");

ans1 = midOrUpMidPreNode(test);
ans2 = right3(test);
console.log(ans1 ? ans1.value : "无");
console.log(ans2 ? ans2.value : "无");

ans1 = midOrDownMidPreNode(test);
ans2 = right4(test);
console.log(ans1 ? ans1.value : "无");
console.log(ans2 ? ans2.value : "无");
