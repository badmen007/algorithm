// 测试链接 : https://leetcode.com/problems/check-completeness-of-a-binary-tree/

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

function isCompleteTree1(head) {
  if (head == null) {
    return true;
  }
  const queue = [];
  queue.push(head);
  let l, r;
  let leaf = false;
  while (queue.length > 0) {
    const cur = queue.shift();
    l = cur.left;
    r = cur.right;
    if ((leaf && (l !== null || r !== null)) || (l == null && r !== null)) {
      return false;
    }
    if (l == null || r == null) {
      leaf = true;
    }
    if (l !== null) {
      queue.push(l);
    }
    if (r !== null) {
      queue.push(r);
    }
  }
  return true;
}

function isCompleteTree2(head) {
  if (head == null) {
    return true;
  }
  return process(head).isCBT;
}

class Info {
  constructor(full, cbt, height) {
    this.isFull = full;
    this.isCBT = cbt;
    this.height = height;
  }
}

function process(x) {
  if (x == null) {
    return new Info(true, true, 0);
  }
  const leftInfo = process(x.left);
  const rightInfo = process(x.right);

  const isFull =
    leftInfo.isFull && rightInfo.isFull && leftInfo.height == rightInfo.height;
  const height = Math.max(leftInfo.height, rightInfo.height) + 1;

  let isCBT = false;
  if (isFull) {
    isCBT = true;
  } else if (
    leftInfo.isCBT &&
    rightInfo.isFull &&
    leftInfo.height == rightInfo.height + 1
  ) {
    isCBT = true;
  } else if (
    leftInfo.isFull &&
    rightInfo.isFull &&
    leftInfo.height == rightInfo.height + 1
  ) {
    isCBT = true;
  } else if (
    leftInfo.isFull &&
    rightInfo.isCBT &&
    leftInfo.height == rightInfo.height
  ) {
    isCBT = true;
  }

  return new Info(isFull, isCBT, height);
}

// for test
function generateRandomBST(maxLevel, maxValue) {
  return generate(1, maxLevel, maxValue);
}

function generate(level, maxLevel, maxValue) {
  if (level > maxLevel || Math.random() < 0.5) {
    return null;
  }
  const head = new TreeNode(Math.floor(Math.random() * maxValue));
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
    if (isCompleteTree1(head) !== isCompleteTree2(head)) {
      succeed = false;
      break;
    }
  }
  console.log(succeed ? "Nice" : "Fuck");
}

test();
