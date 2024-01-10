class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
function getBSTSize(head) {
  if (head == null) {
    return 0;
  }
  const arr = [];
  inOrder(head, arr);
  for (let i = 1; i < arr.length; i++) {
    if (arr[i].value <= arr[i - 1].value) {
      return 0;
    }
  }
  return arr.length;
}

function inOrder(head, arr) {
  if (head == null) {
    return;
  }
  inOrder(head.left, arr);
  arr.push(head);
  inOrder(head.right, arr);
}

function maxSubBSTHead1(head) {
  if (head == null) {
    return null;
  }
  if (getBSTSize(head) != 0) {
    return head;
  }
  let leftAns = maxSubBSTHead1(head.left);
  let rightAns = maxSubBSTHead1(head.right);
  return getBSTSize(leftAns) >= getBSTSize(rightAns) ? leftAns : rightAns;
}

function maxSubBSTHead2(head) {
  if (head == null) {
    return null;
  }
  return process(head).maxSubBSTHead;
}

class Info {
  constructor(mh, size, min, max) {
    this.maxSubBSTHead = mh;
    this.maxSubBSTSize = size;
    this.min = min;
    this.max = max;
  }
}

function process(x) {
  if (x == null) {
    return null;
  }
  const leftInfo = process(x.left);
  const rightInfo = process(x.right);
  let min = x.value;
  let max = x.value;
  let maxSubBSTSize = 0;
  let maxSubBSTHead = null;
  if (leftInfo !== null) {
    min = Math.min(min, leftInfo.min);
    max = Math.max(max, leftInfo.max);
    maxSubBSTSize = leftInfo.maxSubBSTSize;
    maxSubBSTHead = leftInfo.maxSubBSTHead;
  }
  if (rightInfo !== null) {
    min = Math.min(min, rightInfo.min);
    max = Math.max(max, rightInfo.max);
    if (rightInfo.maxSubBSTSize > maxSubBSTSize) {
      maxSubBSTSize = rightInfo.maxSubBSTSize;
      maxSubBSTHead = rightInfo.maxSubBSTHead;
    }
  }

  const p1 =
    leftInfo == null
      ? true
      : leftInfo.maxSubBSTHead == x.left && leftInfo.max < x.value;
  const p2 =
    rightInfo == null
      ? true
      : rightInfo.maxSubBSTHead == x.right && rightInfo.min > x.value;

  if (p1 && p2) {
    maxSubBSTHead = x;
    maxSubBSTSize =
      (leftInfo == null ? 0 : leftInfo.maxSubBSTSize) +
      (rightInfo == null ? 0 : rightInfo.maxSubBSTSize) +
      1;
  }

  return new Info(maxSubBSTHead, maxSubBSTSize, min, max);
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
  const maxLevel = 5;
  const maxValue = 100;
  const testTimes = 100000;
  let succeed = true;
  for (let i = 0; i < testTimes; i++) {
    const head = generateRandomBST(maxLevel, maxValue);
    if (maxSubBSTHead1(head) !== maxSubBSTHead2(head)) {
      console.log(maxSubBSTHead1(head), maxSubBSTHead2(head));
      succeed = false;
      break;
    }
  }
  console.log(succeed ? "Nice" : "Fuck");
}

test();
