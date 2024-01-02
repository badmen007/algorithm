// 二叉树的最大宽度
// 在中序遍历的基础上也就是 要用一个队列去记录遇到的节点
// 两种思路
// 1. 利用map设置当前是哪一层，头节点是第一层，后面在放入左右子树的时候 层级加一
// 2. 在放入左右子节点的时候记录最右的节点，当队列中弹出的值等于记录的那个值时 就说明当前层完了

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function maxWidthUseMap(head) {
  if (head === null) {
    return 0;
  }
  let queue = [];
  queue.push(head);
  // key 在 哪一层，value
  let levelMap = new Map();
  levelMap.set(head, 1);
  let curLevel = 1; // 当前你正在统计哪一层的宽度
  let curLevelNodes = 0; // 当前层curLevel层，宽度目前是多少
  let max = 0;
  while (queue.length > 0) {
    let cur = queue.shift();
    let curNodeLevel = levelMap.get(cur);
    if (cur.left !== null) {
      levelMap.set(cur.left, curNodeLevel + 1);
      queue.push(cur.left);
    }
    if (cur.right !== null) {
      levelMap.set(cur.right, curNodeLevel + 1);
      queue.push(cur.right);
    }
    if (curNodeLevel === curLevel) {
      curLevelNodes++;
    } else {
      max = Math.max(max, curLevelNodes);
      curLevel++;
      curLevelNodes = 1;
    }
  }
  max = Math.max(max, curLevelNodes);
  return max;
}

function maxWidthNoMap(head) {
  if (head === null) {
    return 0;
  }
  let queue = [];
  queue.push(head);
  let curEnd = head; // 当前层，最右节点是谁
  let nextEnd = null; // 下一层，最右节点是谁
  let max = 0;
  let curLevelNodes = 0; // 当前层的节点数
  while (queue.length > 0) {
    let cur = queue.shift();
    if (cur.left !== null) {
      queue.push(cur.left);
      nextEnd = cur.left;
    }
    if (cur.right !== null) {
      queue.push(cur.right);
      nextEnd = cur.right;
    }
    curLevelNodes++;
    if (cur === curEnd) {
      max = Math.max(max, curLevelNodes);
      curLevelNodes = 0;
      curEnd = nextEnd;
    }
  }
  return max;
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
  const maxLevel = 10;
  const maxValue = 100;
  const testTimes = 100000;
  let succeed = true;
  for (let i = 0; i < testTimes; i++) {
    const head = generateRandomBST(maxLevel, maxValue);
    if (maxWidthUseMap(head) != maxWidthNoMap(head)) {
      console.log("wrong");
      succeed = false;
      break;
    }
  }
  console.log(succeed ? "Nice" : "Fuck");
}
test();
