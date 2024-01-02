// 二叉树按层遍历 核心就是要遇到左右树 要用队列来存放

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
function levelOrder(head) {
  if (head === null) {
    return;
  }
  const queue = [];
  queue.push(head);
  while (queue.length > 0) {
    const cur = queue.shift();
    console.log(cur.value);
    if (cur.left !== null) {
      queue.push(cur.left);
    }
    if (cur.right !== null) {
      queue.push(cur.right);
    }
  }
}

let head = new Node(1);
head.left = new Node(2);
head.right = new Node(3);
head.left.left = new Node(4);
head.left.right = new Node(5);
head.right.left = new Node(6);
head.right.right = new Node(7);

levelOrder(head);
console.log("========");
