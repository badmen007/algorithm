// https://leetcode.cn/problems/largest-bst-subtree/description/

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

function largestBSTSubtree(head) {
  if (head == null) {
    return 0;
  }
  return process(head).maxBSTSubtreeSize;
}

class Info {
  constructor(m, size, max, min) {
    this.maxBSTSubtreeSize = m;
    this.allSize = size;
    this.max = max;
    this.min = min;
  }
}

function process(x) {
  if (x == null) {
    return null;
  }
  const leftInfo = process(x.left);
  const rightInfo = process(x.right);

  let max = x.val;
  let min = x.val;
  let allSize = 1;
  if (leftInfo !== null) {
    max = Math.max(max, leftInfo.max);
    min = Math.min(min, leftInfo.min);
    allSize += leftInfo.allSize;
  }
  if (rightInfo !== null) {
    max = Math.max(max, rightInfo.max);
    min = Math.min(min, rightInfo.min);
    allSize += rightInfo.allSize;
  }
  let p1 = -1;
  if (leftInfo !== null) {
    p1 = leftInfo.maxBSTSubtreeSize;
  }
  let p2 = -1;
  if (rightInfo !== null) {
    p2 = rightInfo.maxBSTSubtreeSize;
  }
  let p3 = -1;
  const leftBST =
    leftInfo == null ? true : leftInfo.allSize == leftInfo.maxBSTSubtreeSize;
  const rightBST =
    rightInfo == null ? true : rightInfo.allSize == rightInfo.maxBSTSubtreeSize;
  if (leftBST && rightBST) {
    const leftMaxLessX = leftInfo == null ? true : leftInfo.max < x.val;
    const rightMinMoreX = rightInfo == null ? true : rightInfo.min > x.val;
    if (leftMaxLessX && rightMinMoreX) {
      const leftSize = leftInfo == null ? 0 : leftInfo.allSize;
      const rightSize = rightInfo == null ? 0 : rightInfo.allSize;
      p3 = leftSize + rightSize + 1;
    }
  }

  return new Info(Math.max(p1, Math.max(p2, p3)), allSize, max, min);
}

// for test
function right(head) {
  if (head == null) {
    return 0;
  }
  // 这个的意思是整体是不是搜索二叉树 是就返回
  const h = getBSTSize(head);
  if (h !== 0) {
    return h;
  }
  // 不是走下面
  return Math.max(right(head.left), right(head.right));
}

function getBSTSize(head) {
  if (head == null) {
    return 0;
  }
  const arr = [];
  inOrder(head, arr);
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= arr[i - 1]) {
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
  arr.push(head.val);
  inOrder(head.right, arr);
}

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
  const maxValue = 100;
  const maxLevel = 4;
  const testTimes = 100000;
  let succeed = true;
  for (let i = 0; i < testTimes; i++) {
    const head = generateRandomBST(maxLevel, maxValue);
    if (largestBSTSubtree(head) !== right(head)) {
      succeed = false;
      console.log(largestBSTSubtree(head), right(head));
      console.dir(head, { depth: 100 });
      break;
    }
  }
  console.log(succeed ? "Nice" : "Fuck");
}

test();
