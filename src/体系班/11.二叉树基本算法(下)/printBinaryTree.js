// 这个就当作是工具就好了 不用掌握
// 向上的箭头代表的是左边那一排上边离我最近的
// 向下的箭头代表的是左边那一排下边离我最近的

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export function printTree(head) {
  console.log("Binary Tree:");
  printInOrder(head, 0, "H", 17);
  console.log();
}

function printInOrder(head, height, to, len) {
  if (head === null) {
    return;
  }
  printInOrder(head.right, height + 1, "v", len);
  let val = to + head.value + to;
  let lenM = val.length;
  let lenL = Math.floor((len - lenM) / 2);
  let lenR = len - lenM - lenL;
  val = getSpace(lenL) + val + getSpace(lenR);
  console.log(getSpace(height * len) + val);
  printInOrder(head.left, height + 1, "^", len);
}

function getSpace(num) {
  let space = " ";
  let buf = "";
  for (let i = 0; i < num; i++) {
    buf += space;
  }
  return buf;
}

// Test cases
// let head1 = new Node(1);
// head1.left = new Node(-222222222);
// head1.right = new Node(3);
// head1.left.left = new Node(Number.MIN_VALUE);
// head1.right.left = new Node(55555555);
// head1.right.right = new Node(66);
// head1.left.left.right = new Node(777);
// printTree(head1);

// let head2 = new Node(1);
// head2.left = new Node(2);
// head2.right = new Node(3);
// head2.left.left = new Node(4);
// head2.right.left = new Node(5);
// head2.right.right = new Node(6);
// head2.left.left.right = new Node(7);
// printTree(head2);

// let head3 = new Node(1);
// head3.left = new Node(1);
// head3.right = new Node(1);
// head3.left.left = new Node(1);
// head3.right.left = new Node(1);
// head3.right.right = new Node(1);
// head3.left.left.right = new Node(1);
// printTree(head3);
