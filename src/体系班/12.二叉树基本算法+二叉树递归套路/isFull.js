import { printTree } from "../11.二叉树基本算法(下)/printBinaryTree.js";

class Node {
  constructor(val) {
    this.value = val;
    this.left = null;
    this.right = null;
  }
}

// 收集整棵树的高度和节点数
// 满二叉树满足 2^n - 1（n代表的是高度）
function isFull1(head) {
  if (head == null) {
    return true;
  }
  const all = process1(head);
  return (1 << all.height) - 1 == all.nodes;
}

class Info1 {
  constructor(h, n) {
    this.height = h;
    this.nodes = n;
  }
}

function process1(head) {
  if (head == null) {
    return new Info1(0, 0);
  }
  const leftInfo = process1(head.left);
  const rightInfo = process1(head.right);
  const height = Math.max(leftInfo.height, rightInfo.height) + 1;
  const nodes = leftInfo.nodes + rightInfo.nodes + 1;
  return new Info1(height, nodes);
}

// x左子树是满的  右子树是满的 左子树的高度等于右子树的高度
function isFull2(head) {
  if (head == null) {
    return true;
  }
  return process2(head).isFull;
}

class Info2 {
  constructor(full, h) {
    this.isFull = full;
    this.height = h;
  }
}

function process2(x) {
  if (x == null) {
    return new Info2(true, 0);
  }
  const leftInfo = process2(x.left);
  const rightInfo = process2(x.right);

  const height = Math.max(leftInfo.height, rightInfo.height) + 1;
  const isFull =
    leftInfo.isFull && rightInfo.isFull && leftInfo.height == rightInfo.height;
  return new Info2(isFull, height);
}

// for test
function generateRandomBST(maxLevel, maxValue) {
  return generate(1, maxLevel, maxValue);
}

function generate(level, maxLevel, maxValue) {
  if (level > maxLevel || Math.random() < 0.5) {
    return null;
  }
  const head = new Node(Math.floor(Math.random() * maxValue));
  head.left = generate(level + 1, maxLevel, maxValue);
  head.right = generate(level + 1, maxLevel, maxValue);
  return head;
}

function test() {
  const maxValue = 100;
  const maxLevel = 5;
  const testTimes = 100000;
  let succeed = true;
  for (let i = 0; i < testTimes; i++) {
    const head = generateRandomBST(maxLevel, maxValue);
    if (isFull1(head) !== isFull2(head)) {
      succeed = false;
      console.log(isFull1(head), isFull2(head));
      printTree(head);
      break;
    }
  }
  console.log(succeed ? "Nice" : "Fuck");
}

test();
