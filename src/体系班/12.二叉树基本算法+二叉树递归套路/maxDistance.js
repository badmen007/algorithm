class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// 这个方法 实在是晦涩难懂
function maxDistance1(head) {
  if (head === null) {
    return 0;
  }
  const arr = getPrelist(head);
  const parentMap = getParentMap(head);
  let max = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      max = Math.max(max, distance(parentMap, arr[i], arr[j]));
    }
  }
  return max;
}

function getPrelist(head) {
  const arr = [];
  fillPrelist(head, arr);
  return arr;
}

function fillPrelist(head, arr) {
  if (head === null) {
    return;
  }
  arr.push(head);
  fillPrelist(head.left, arr);
  fillPrelist(head.right, arr);
}

function getParentMap(head) {
  const map = new Map();
  map.set(head, null);
  fillParentMap(head, map);
  return map;
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

function distance(parentMap, o1, o2) {
  const o1Set = new Set();
  let cur = o1;
  o1Set.add(cur);
  while (parentMap.get(cur) !== null) {
    cur = parentMap.get(cur);
    o1Set.add(cur);
  }
  cur = o2;
  while (!o1Set.has(cur)) {
    cur = parentMap.get(cur);
  }
  const lowestAncestor = cur;
  cur = o1;
  let distance1 = 1;
  while (cur !== lowestAncestor) {
    cur = parentMap.get(cur);
    distance1++;
  }
  cur = o2;
  let distance2 = 1;
  while (cur !== lowestAncestor) {
    cur = parentMap.get(cur);
    distance2++;
  }
  return distance1 + distance2 - 1;
}

function maxDistance2(head) {
  return process(head).maxDistance;
}

class Info {
  constructor(dis, h) {
    this.maxDistance = dis;
    this.height = h;
  }
}

function process(x) {
  if (x == null) {
    return new Info(0, 0);
  }
  const leftInfo = process(x.left);
  const rightInfo = process(x.right);
  const height = Math.max(leftInfo.height, rightInfo.height) + 1;
  // 不经过x 左边
  const p1 = leftInfo.maxDistance;
  // 不经过x 右边
  const p2 = rightInfo.maxDistance;
  // 经过x
  const p3 = leftInfo.height + rightInfo.height + 1;
  const maxDistance = Math.max(p1, p2, p3);
  return new Info(maxDistance, height);
}

// for test
function generateRandomBST(maxLevel, maxValue) {
  return generate(1, maxLevel, maxValue)
}

function generate(level, maxLevel, maxValue) {
  if (level > maxLevel || Math.random() < 0.5) {
    return null;
  }
  const head = new TreeNode(Math.floor(Math.random() * maxValue))
  head.left = generate(level + 1, maxLevel, maxValue)
  head.right = generate(level + 1, maxLevel, maxValue)
  return head
}


function test() {
  const maxLevel = 3;
  const maxValue = 100;
  const testTimes = 3;
  for(let i = 0; i < testTimes; i++) {
    const head = generateRandomBST(maxLevel, maxValue)
    if (maxDistance1(head) !== maxDistance2(head)) {
      console.log('wrong')
    }
  }
  console.log('finish');
}

test()