class Employee {
  constructor(happy) {
    this.happy = happy;
    this.nexts = [];
  }
}

class Info {
  constructor(no, yes) {
    this.no = no;
    this.yes = yes;
  }
}

function maxHappy1(boss) {
  if (boss === null) {
    return 0;
  }
  return process1(boss, false);
}

// 当前来到的节点叫cur，
// up表示cur的上级是否来，
// 该函数含义：
// 如果up为true，表示在cur上级已经确定来，的情况下，cur整棵树能够提供最大的快乐值是多少？
// 如果up为false，表示在cur上级已经确定不来，的情况下，cur整棵树能够提供最大的快乐值是多少？
function process1(cur, up) {
  if (up) {
    let ans = 0;
    for (const next of cur.nexts) {
      ans += process1(next, false);
    }
    return ans;
  } else {
    let p1 = cur.happy;
    let p2 = 0;
    for (const next of cur.nexts) {
      p1 += process1(next, true);
      p2 += process1(next, false);
    }
    return Math.max(p1, p2);
  }
}

function maxHappy2(head) {
  const allInfo = process(head);
  return Math.max(allInfo.no, allInfo.yes);
}

function process(x) {
  if (x === null) {
    return new Info(0, 0);
  }
  let no = 0;
  let yes = x.happy;
  for (const next of x.nexts) {
    const nextInfo = process(next);
    no += Math.max(nextInfo.no, nextInfo.yes);
    yes += nextInfo.no;
  }
  return new Info(no, yes);
}

// for test
function generateBoss(maxLevel, maxNexts, maxHappy) {
  if (Math.random() < 0.02) {
    return null;
  }
  const boss = new Employee(Math.floor(Math.random() * (maxHappy + 1)));
  generateNexts(boss, 1, maxLevel, maxNexts, maxHappy);
  return boss;
}

// for test
function generateNexts(e, level, maxLevel, maxNexts, maxHappy) {
  if (level > maxLevel) {
    return;
  }
  const nextsSize = Math.floor(Math.random() * (maxNexts + 1));
  for (let i = 0; i < nextsSize; i++) {
    const next = new Employee(Math.floor(Math.random() * (maxHappy + 1)));
    e.nexts.push(next);
    generateNexts(next, level + 1, maxLevel, maxNexts, maxHappy);
  }
}

// for test
function test() {
  const maxLevel = 4;
  const maxNexts = 7;
  const maxHappy = 100;
  const testTimes = 100000;
  for (let i = 0; i < testTimes; i++) {
    const boss = generateBoss(maxLevel, maxNexts, maxHappy);
    if (maxHappy1(boss) !== maxHappy2(boss)) {
      console.log("Oops!");
    }
  }
  console.log("finish!");
}

// Run the test
test();
