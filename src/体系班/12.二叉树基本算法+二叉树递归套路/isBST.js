// 二叉搜索树
// 左子树不为空， 左子树上所有的节点的值都小于它的根节点
// 右子树不为空， 右子树上所有的节点的值都大于它的根节点

// 基于二叉搜索树的特点，中序遍历得到的值一定是有序的

class Node {
  constructor(val) {
    this.value = val;
    this.left = null;
    this.right = null;
  }
}

function isBST1(head) {
  if (head == null) {
    return true;
  }
  const arr = [];
  inOrder(head, arr);
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= arr[i - 1]) {
      return false;
    }
  }
  return true;
}

function inOrder(head, arr) {
  if (head == null) {
    return;
  }
  inOrder(head.left, arr);
  arr.push(head.value);
  inOrder(head.right, arr);
}

class Info {
  constructor(bst, max, min) {
    this.isBST = bst;
    this.max = max;
    this.min = min;
  }
}

function isBST2(head) {
  if (head == null) {
    return true;
  }
  return process(head).isBST;
}

function process(x) {
  if (x == null) {
    return null;
  }
  const leftInfo = process(x.left);
  const rightInfo = process(x.right);

  let max = x.value;
  let min = x.value;
  if (leftInfo != null) {
    max = Math.max(max, leftInfo.max);
    min = Math.min(min, leftInfo.min);
  }
  if (rightInfo !== null) {
    max = Math.max(max, rightInfo.max);
    min = Math.min(min, rightInfo.min);
  }
  let isBST = true;
  if (leftInfo !== null && !leftInfo.isBST) {
    isBST = false;
  }
  if (rightInfo !== null && !rightInfo.isBST) {
    isBST = false;
  }
  if (leftInfo !== null && leftInfo.max >= x.value) {
    isBST = false;
  }
  if (rightInfo !== null && rightInfo.min <= x.value) {
    isBST = false;
  }
  return new Info(isBST, max, min);
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
  const maxLevel = 4;
  const maxValue = 100;
  const testTimes = 100000;
  let succeed = true;
  for (let i = 0; i < testTimes; i++) {
    const head = generateRandomBST(maxLevel, maxValue);
    if (isBST1(head) !== isBST2(head)) {
      console.dir(head, { depth: 100 });
      succeed = false;
      break;
    }
  }
  console.log(succeed ? "Nice" : "Fuck");
}
test();
