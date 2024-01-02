// 二叉树某个节点的后继节点 -> 中序遍历之后 x的后一个节点

import { printTree } from "./printBinaryTree.js";

// 两种情况
// 第一种情况 x有右树 那么后继节点就是x右树上的最左孩子  没问题
// 第二种情况 x没有右树 看x是哪一个节点左树上的最右
class Node {
  constructor(data) {
    this.value = data;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

function getSuccessorNode(node) {
  if (node == null) {
    return node;
  }
  if (node.right !== null) {
    return getLeftMost(node.right);
  } else {
    let parent = node.parent;
    while (parent !== null && node === parent.right) {
      node = parent;
      parent = node.parent;
    }
    return parent;
  }
}

function getLeftMost(node) {
  while (node.left !== null) {
    node = node.left;
  }
  return node;
}

// 中序遍历
function inOrder(head) {
  if (head == null) {
    return null;
  }
  inOrder(head.left);
  console.log(head.value);
  inOrder(head.right);
}

let head = new Node(6);
head.parent = null;
head.left = new Node(3);
head.left.parent = head;
head.left.left = new Node(1);
head.left.left.parent = head.left;
head.left.left.right = new Node(2);
head.left.left.right.parent = head.left.left;
head.left.right = new Node(4);
head.left.right.parent = head.left;
head.left.right.right = new Node(5);
head.left.right.right.parent = head.left.right;
head.right = new Node(9);
head.right.parent = head;
head.right.left = new Node(8);
head.right.left.parent = head.right;
head.right.left.left = new Node(7);
head.right.left.left.parent = head.right.left;
head.right.right = new Node(10);
head.right.right.parent = head.right;

printTree(head);
inOrder(head);

let test = head.left.left;
console.log(`${test.value} next: ${getSuccessorNode(test).value}`);
test = head.left.left.right;
console.log(`${test.value} next: ${getSuccessorNode(test).value}`);
test = head.left;
console.log(`${test.value} next: ${getSuccessorNode(test).value}`);
test = head.left.right;
console.log(`${test.value} next: ${getSuccessorNode(test).value}`);
test = head.left.right.right;
console.log(`${test.value} next: ${getSuccessorNode(test).value}`);
test = head;
console.log(`${test.value} next: ${getSuccessorNode(test).value}`);
test = head.right.left.left;
console.log(`${test.value} next: ${getSuccessorNode(test).value}`);
test = head.right.left;
console.log(`${test.value} next: ${getSuccessorNode(test).value}`);
test = head.right;
console.log(`${test.value} next: ${getSuccessorNode(test).value}`);
test = head.right.right; // 10's next is null
console.log(`${test.value} next: ${getSuccessorNode(test)}`);
