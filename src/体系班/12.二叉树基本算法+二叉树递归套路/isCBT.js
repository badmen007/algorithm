// 1. 什么是完全二叉树(complete binary tree) 
// 不满的一定是最后一层 并且是从左往右变满的

// 思路：
// 1.如果头节点不存在的话，返回true
// 2.层序遍历，首先弹出一个 判断左右节点
// 3.如果之前的节点出现过子节点只有一个的话，只要当前节点的左右节点任何一个存在的话 就不是完全二叉树
// 4.如果当前节点的左子节点没有而右子节点有，就不是完全二叉树
// 5.如果当前节点的左节点或者右节点不存在的话，leaf就为true,标志着这种情况出现过，在下一轮循环判断

class Node {
  constructor(val) {
    this.value = val;
    this.left = null;
    this.right = null;
  }
}

function isCBT1(head) {
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
    if ((leaf && (l !== null || r !== null)) || (l === null && r !== null)) {
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

// 只能是三种情况
// 1. 左边是cbt, 右边一定是full满二叉树
// 2. 左边是full, 右边是full
// 3. 左边是full, 右边是cbt

function isCBT2(head) {
  if (head == null) {
    return true;
  }
  return process(head).isCBT;
}

class Info {
  constructor(cbt, full, h) {
    this.isCBT = cbt;
    this.isFull = full;
    this.height = h;
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
  } else {
    if (leftInfo.isCBT && rightInfo.isCBT) {
      if (
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
    }
  }

  return new Info(isCBT, isFull, height);
}

//for test
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
    if (isCBT1(head) !== isCBT2(head)) {
      succeed = false;
      console.log(isCBT1(head), isCBT2(head));
      console.dir(head);
      break;
    }
  }
  console.log(succeed ? "Nice" : "Fuck");
}

test();
