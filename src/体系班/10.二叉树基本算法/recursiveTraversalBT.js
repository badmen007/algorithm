class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function f(head) {
  if (head == null) {
    return;
  }
  //1
  f(head.left);
  //2
  f(head.right);
}

// 先序打印所有节点
function pre(head) {
  if (head == null) {
    return null;
  }
  console.log(head.value);
  pre(head.left);
  pre(head.right);
}

// 中序打印所有节点
function inOrder(head) {
  if (head == null) {
    return null;
  }
  inOrder(head.left);
  console.log(head.value);
  inOrder(head.right);
}

// 后序打印所有节点
function posOrder(head) {
  if (head == null) {
    return null;
  }
  posOrder(head.left);
  posOrder(head.right);
  console.log(head.value);
}

let head = new Node(1);
head.left = new Node(2);
head.right = new Node(3);
head.left.left = new Node(4);
head.left.right = new Node(5);
head.right.left = new Node(6);
head.right.right = new Node(7);

console.log("PreOrder:");
pre(head);
console.log("========");
console.log("InOrder:");
inOrder(head);
console.log("========");
console.log("PostOrder:");
posOrder(head);
console.log("========");