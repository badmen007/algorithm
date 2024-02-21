class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// 这个解法超时了
// o1, o2代表的是哪两个值的最近祖先;
function lowestAncestor1(head, o1, o2) {
  if (head === null) {
    return null;
  }

  const parentMap = new Map();
  parentMap.set(head, null);
  fillParentMap(head, parentMap);

  const o1Set = new Set();
  let cur = o1;
  o1Set.add(cur);
  while (parentMap.get(cur)) {
    cur = parentMap.get(cur);
    o1Set.add(cur);
  }

  cur = o2;
  while (!o1Set.has(cur)) {
    cur = parentMap.get(cur);
  }

  return cur;
}

function fillParentMap(head, parentMap) {
  if (head.left !== null) {
    parentMap.set(head.left, head);
    fillParentMap(head.left, parentMap);
  }
  if (head.right !== null) {
    parentMap.set(head.right, head);
    fillParentMap(head.right, parentMap);
  }
}

// 分析
// 不经过x 1.x的左子树有ans 2.x的右子树有ans
// 进过x 1.a和b的祖先是x 2.x等于a,并且是b的祖先 3.x等于b，并且是a的祖先

function lowestAncestor2(head, a, b) {
  if (head == null) {
    return null;
  }
  return process(head, a, b).ans;
}

class Info {
  constructor(findA, findB, ans) {
    this.findA = findA;
    this.findB = findB;
    this.ans = ans;
  }
}

function process(x, a, b) {
  if (x == null) {
    return new Info(false, false, null);
  }
  const leftInfo = process(x.left, a, b);
  const rightInfo = process(x.right, a, b);

  const findA = x == a || leftInfo.findA || rightInfo.findA;
  const findB = x == b || leftInfo.findB || rightInfo.findB;
  let ans = null;
  if (leftInfo.ans !== null) {
    ans = leftInfo.ans;
  } else if (rightInfo.ans !== null) {
    ans = rightInfo.ans;
  } else {
    if (findA && findB) {
      ans = x;
    }
  }
  return new Info(findA, findB, ans);
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

function pickRandomOne(head) {
  if (head == null) {
    return null;
  }
  const arr = [];
  fillPreList(head, arr);
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

function fillPreList(head, arr) {
  if (head == null) {
    return;
  }
  arr.push(head);
  fillPreList(head.left, arr);
  fillPreList(head.right, arr);
}

function test() {
  const maxLevel = 5;
  const maxValue = 100;
  const testTimes = 100000;
  let succeed = true;
  for (let i = 0; i < testTimes; i++) {
    const head = generateRandomBST(maxLevel, maxValue);
    const o1 = pickRandomOne(head);
    const o2 = pickRandomOne(head);
    if (lowestAncestor1(head, o1, o2) !== lowestAncestor2(head, o1, o2)) {
      console.log(lowestAncestor1(head, o1, o2), lowestAncestor2(head, o1, o2));
      console.log(o1, "o1");
      console.log(o2, "o2");
      succeed = false;
      break;
    }
  }
  console.log(succeed ? "Nice" : "Fuck");
}

test();
