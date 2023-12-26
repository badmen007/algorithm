import HeapGreater from "./heapGreater.js";
class Customer {
  constructor(id, buy, enterTime) {
    this.id = id;
    this.buy = buy;
    this.enterTime = enterTime;
  }
}

// 候选区是倒序的
class CandidateComparator {
  compare(o1, o2) {
    return o1.buy !== o2.buy ? o2.buy - o1.buy : o1.enterTime - o2.enterTime;
  }
}

// 中奖区是正序的
class DaddyComparator {
  compare(o1, o2) {
    return o1.buy !== o2.buy ? o1.buy - o2.buy : o1.enterTime - o2.enterTime;
  }
}

class WhoIsYourDaddy {
  constructor(limit) {
    this.customers = new Map();
    this.candleHeap = new HeapGreater(new CandidateComparator().compare);
    this.daddyHeap = new HeapGreater(new DaddyComparator().compare);
    this.daddyLimit = limit;
  }
  operate(time, id, buyOrRefund) {
    if (!buyOrRefund && !this.customers.has(id)) {
      return;
    }
    if (!this.customers.has(id)) {
      this.customers.set(id, new Customer(id, 0, 0));
    }

    const c = this.customers.get(id);

    if (buyOrRefund) {
      c.buy++;
    } else {
      c.buy--;
    }

    if (c.buy === 0) {
      this.customers.delete(id);
    }

    // 候选区和中奖区都没有
    if (!this.candleHeap.contains(c) && !this.daddyHeap.contains(c)) {
      // 如果中奖区没满的话 就放中奖区
      if (this.daddyHeap.size() < this.daddyLimit) {
        c.enterTime = time;
        this.daddyHeap.push(c);
      } else {
        c.enterTime = time;
        this.candleHeap.push(c);
      }
    } else if (this.candleHeap.contains(c)) {
      // 候选区有 我觉得这里应该是小于等于0
      if (c.buy === 0) {
        this.candleHeap.remove(c);
      } else {
        this.candleHeap.resign(c);
      }
    } else {
      // 中奖区有
      if (c.buy === 0) {
        this.daddyHeap.remove(c);
      } else {
        this.daddyHeap.resign(c);
      }
    }

    this.daddyMove(time);
  }
  daddyMove(time) {
    if (this.candleHeap.isEmpty()) {
      return;
    }
    if (this.daddyHeap.size() < this.daddyLimit) {
      // 这里是第一个
      const p = this.candleHeap.pop();
      p.enterTime = time;
      this.daddyHeap.push(p);
    } else {
      if (this.candleHeap.peek().buy > this.daddyHeap.peek().buy) {
        const oldDaddy = this.daddyHeap.pop();
        const newDaddy = this.candleHeap.pop();
        oldDaddy.enterTime = time;
        newDaddy.enterTime = time;
        this.daddyHeap.push(newDaddy);
        this.candleHeap.push(oldDaddy);
      }
    }
  }
  getDaddies() {
    const customers = this.daddyHeap.getAllElements();
    const ans = [];
    for (const c of customers) {
      ans.push(c.id);
    }
    return ans;
  }
}

function topK(arr, op, k) {
  const ans = [];
  const whoDaddies = new WhoIsYourDaddy(k);

  for (let i = 0; i < arr.length; i++) {
    whoDaddies.operate(i, arr[i], op[i]);
    ans.push(whoDaddies.getDaddies());
  }

  return ans;
}

// -------------------------
function compare(arr, op, k) {
  const map = new Map();
  const candy = [];
  const daddy = [];
  const ans = [];

  for (let i = 0; i < arr.length; i++) {
    const id = arr[i];
    const buyOrRefund = op[i];

    if (!buyOrRefund && !map.has(id)) {
      ans.push(getCurAns(daddy));
      continue;
    }

    if (!map.has(id)) {
      map.set(id, new Customer(id, 0, 0));
    }

    const c = map.get(id);

    if (buyOrRefund) {
      c.buy++;
    } else {
      c.buy--;
    }

    if (c.buy == 0) {
      map.delete(id);
    }

    if (!candy.includes(c) && !daddy.includes(c)) {
      if (daddy.length < k) {
        c.enterTime = i;
        daddy.push(c);
      } else {
        c.enterTime = i;
        candy.push(c);
      }
    }
    cleanZeroBuy(candy);
    cleanZeroBuy(daddy);

    candy.sort((a, b) => new CandidateComparator().compare(a, b));
    daddy.sort((a, b) => new DaddyComparator().compare(a, b));

    // 这里是两个数组中都有的情况
    move(candy, daddy, k, i);
    ans.push(getCurAns(daddy));
  }

  return ans;
}

function move(candy, daddy, k, time) {
  if (candy.length === 0) return;

  if (daddy.length < k) {
    const c = candy[0];
    c.enterTime = time;
    daddy.push(c);
    candy.shift();
  } else {
    if (candy[0].buy > daddy[0].buy) {
      const oldDaddy = daddy[0];
      daddy.shift();
      const newDaddy = candy[0];
      candy.shift();
      oldDaddy.enterTime = time;
      newDaddy.enterTime = time;
      daddy.push(newDaddy);
      candy.push(oldDaddy);
    }
  }
}

function cleanZeroBuy(arr) {
  const noZero = arr.filter((item) => item.buy !== 0);
  arr.length = 0;
  arr.push(...noZero);
}

function getCurAns(daddy) {
  return daddy.map((c) => c.id);
}

// for test
class Data {
  constructor(arr, op) {
    this.arr = arr;
    this.op = op;
  }
}

function randomData(maxValue, maxLen) {
  const len = Math.floor(Math.random() * maxLen) + 1;
  const arr = new Array(len);
  const op = new Array(len);

  for (let i = 0; i < arr.length; i++) {
    arr[i] = Math.floor(Math.random() * maxValue);
    op[i] = Math.random() < 0.5 ? true : false;
  }
  return new Data(arr, op);
}

function sameAnswer(ans1, ans2) {
  if (ans1.length !== ans2.length) {
    return false;
  }

  for (let i = 0; i < ans1.length; i++) {
    const cur1 = ans1[i];
    const cur2 = ans2[i];

    if (cur1.length !== cur2.length) {
      return false;
    }

    cur1.sort((a, b) => a - b);
    cur2.sort((a, b) => a - b);

    for (let j = 0; j < cur1.length; j++) {
      if (cur1[j] !== cur2[j]) {
        return false;
      }
    }
  }

  return true;
}

function test() {
  const maxValue = 10;
  const maxLen = 100;
  const maxK = 6;
  const testTimes = 100000;
  console.log("begin");
  for (let i = 0; i < testTimes; i++) {
    const testData = randomData(maxValue, maxLen);
    const k = Math.floor(Math.random() * maxK) + 1;
    const arr = testData.arr;
    const op = testData.op;
    const ans1 = topK(arr, op, k);
    const ans2 = compare(arr, op, k);

    if (!sameAnswer(ans1, ans2)) {
      console.log(arr);
      console.log(op);
      console.log(ans1);
      console.log(ans2);
      console.log(k);
      break;
    }
  }
  console.log("end");
}
test();
