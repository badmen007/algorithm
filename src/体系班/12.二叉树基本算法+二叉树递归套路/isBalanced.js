// 什么是平衡二叉树？
// 每一颗子树的最大高度相差不超过1

// 假设以x(x可能是任何一个节点)为头
// 1.x左树是平衡的
// 2.x右边是平衡的
// 3.｜x左树高度 - x右树高度｜ < 2

import {printTree} from '../11.二叉树基本算法(下)/printBinaryTree.js'

class Node {
  constructor(val) {
    this.value = val;
    this.left = null;
    this.right = null;
  }
}

function isBalanced1(head) {
  const ans = [true];
  process1(head, ans);
  return ans[0];
}

function process1(head, ans) {
  if (!ans[0] || head == null) {
    return -1;
  }
  const leftHeight = process1(head.left, ans);
  const rightHeight = process1(head.right, ans);

  if (Math.abs(leftHeight - rightHeight) > 1) {
    ans[0] = false;
  }

  return Math.max(leftHeight, rightHeight) + 1;
}

function isBalanced2(head) {
  if(head == null) {
    return true
  }
  return process(head).isBalance;
}

class Info {
  constructor(i, h) {
    this.isBalance = i;
    this.height = h;
  }
}

function process(x) {
  if (x == null) {
    return new Info(true, 0);
  }
  const leftInfo = process(x.left);
  const rightInfo = process(x.right);
  const height = Math.max(leftInfo.height, rightInfo.height) + 1;
  let isBalance = true;
  if (!leftInfo.isBalance) {
    isBalance = false;
  }
  if (!rightInfo.isBalance) {
    isBalance = false;
  }
  if (Math.abs(leftInfo.height - rightInfo.height) > 1) {
    isBalance = false;
  }

  return new Info(isBalance, height);
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
  const maxLevel = 5;
  const maxValue = 100;
  const testTimes = 100000;
  let succeed = true;
  for (let i = 0; i < testTimes; i++) {
    const head = generateRandomBST(maxLevel, maxValue);
    if (isBalanced1(head) !== isBalanced2(head)) {
      succeed = false;
      printTree(head)
      console.log(isBalanced1(head), isBalanced2(head));
      break;
    }
  }
  console.log(succeed ? "Nice" : "Fuck");
}
test();
