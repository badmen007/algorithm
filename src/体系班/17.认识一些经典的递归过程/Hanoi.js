// 汉诺塔问题
// 2^n - 1 这么多步

function hanoi1(n) {
  leftToRight(n);
}

function leftToRight(n) {
  if (n == 1) {
    console.log("move 1 from left to right");
    return;
  }
  leftToMid(n - 1);
  console.log("move " + n + " from left to right");
  midToRight(n - 1);
}

function leftToMid(n) {
  if (n == 1) {
    console.log("move 1 from left to mid");
    return;
  }
  leftToRight(n - 1);
  console.log("move " + n + " from left to mid");
  rightToMid(n - 1);
}

function midToRight(n) {
  if (n == 1) {
    console.log("move 1 from mid to right");
    return;
  }
  midToLeft(n - 1);
  console.log("move " + n + " from mid to right");
  leftToRight(n - 1);
}

function midToLeft(n) {
  if (n == 1) {
    console.log("move 1 from mid to left");
    return;
  }
  midToRight(n - 1);
  console.log("move " + n + " from mid to left");
  rightToLeft(n - 1);
}

function rightToMid(n) {
  if (n == 1) {
    console.log("move 1 from right to mid");
    return;
  }
  rightToLeft(n - 1);
  console.log("move " + n + " from right to mid");
  leftToMid(n - 1);
}

function rightToLeft(n) {
  if (n == 1) {
    console.log("move 1 from right to left");
    return;
  }
  rightToMid(n - 1);
  console.log("move " + n + " from right to left");
  midToLeft(n - 1);
}

// -----------------------------------------------
// 其实就是两步 第一步从from 到 other
// other最为from 到 to
function hanoi2(n) {
  if (n > 0) {
    process(n, "left", "right", "mid");
  }
}

// 一个递归函数可以通过增加参数的形式来增加更多的功能
// 进一步抽象化
function process(n, from, to, other) {
  if (n == 1) { // base
    console.log("move 1 from " + from + " to " + to);
    return;
  }
  process(n - 1, from, other, to);
  console.log("move " + n + " from " + from + " to " + to);
  process(n - 1, other, to, from);
}

//-------------------------------------------

// 这个是非递归的版本 任何递归行为都能够写成迭代的形式
// 不是很重要
function hanoi3(n) {
  if (n < 1) {
    return;
  }
  const stack = [];
  const finishLeft = new Set();
  stack.push(new Record(n, "left", "right", "mid"));

  while (stack.length > 0) {
    const cur = stack.pop();
    if (cur.level == 1) {
      console.log("move 1 from " + cur.from + " to " + cur.to);
    } else {
      if (!finishLeft.has(cur)) {
        finishLeft.add(cur);
        stack.push(cur);
        stack.push(new Record(cur.level - 1, cur.from, cur.other, cur.to));
      } else {
        // 第二次弹出的时候证明左子树的任务完成了 可以打印自己了
        console.log("move " + cur.level + " from " + cur.from + " to " + cur.to);
        stack.push(new Record(cur.level - 1, cur.other, cur.to, cur.from));
      }
    }
  }
}

class Record {
  constructor(l, f, t, o) {
    this.level = l;
    this.from = f;
    this.to = t;
    this.other = o;
  }
}

function test() {
  const n = 3;
  hanoi1(n);
  console.log("=========================");
  hanoi2(n);
  console.log("=========================");
  hanoi3(n);
}

test();
