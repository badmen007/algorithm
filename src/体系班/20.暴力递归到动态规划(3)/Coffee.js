// 题目
// 数组arr代表每一个咖啡机冲一杯咖啡的时间，每个咖啡机只能串行的制造咖啡。
// 现在有n个人需要喝咖啡，只能用咖啡机来制造咖啡。
// 认为每个人喝咖啡的时间非常短，冲好的时间即是喝完的时间。
// 每个人喝完之后咖啡杯可以选择洗或者自然挥发干净，只有一台洗咖啡杯的机器，只能串行的洗咖啡杯。
// 洗杯子的机器洗完一个杯子时间为a，任何一个杯子自然挥发干净的时间为b。
// 四个参数：arr, n, a, b
// 假设时间点从0开始，返回所有人喝完咖啡并洗完咖啡杯的全部过程结束后，至少来到什么时间点。
import PriorityQueue from "./PriorityQueue.js";
class Machine {
  constructor(t, w) {
    this.timePoint = t;
    this.workTime = w;
  }
}
// right方法好像有问题 得到的结果总是少一种
function right(arr, n, a, b) {
  const times = new Array(arr.length).fill(0);
  const drink = new Array(n).fill(0);
  return forceMake(arr, times, 0, drink, n, a, b);
}

function forceMake(arr, times, kth, drink, n, a, b) {
  if (kth === n) {
    const drinkSorted = [...drink];
    drinkSorted.sort((a, b) => a - b);
    return forceWash(drinkSorted, a, b, 0, 0, 0);
  }
  let time = Number.MAX_VALUE;
  for (let i = 0; i < arr.length; i++) {
    const work = arr[i];
    const pre = times[i];
    drink[kth] = pre + work;
    times[i] = pre + work;
    time = Math.min(time, forceMake(arr, times, kth + 1, drink, n, a, b));
    drink[kth] = 0;
    times[i] = pre;
  }
  return time;
}

function forceWash(drinks, a, b, index, washLine, time) {
  if (index === drinks.length) {
    return time;
  }
  // 选择一：当前index号咖啡杯，选择用洗咖啡机刷干净
  const wash = Math.max(drinks[index], washLine) + a;
  const ans1 = forceWash(drinks, a, b, index + 1, wash, Math.max(wash, time));

  // 选择二：当前index号咖啡杯，选择自然挥发
  const dry = drinks[index] + b;
  const ans2 = forceWash(
    drinks,
    a,
    b,
    index + 1,
    washLine,
    Math.max(dry, time),
  );
  return Math.min(ans1, ans2);
}
// --------------------------------------------------------
// arr 代表咖啡机的数组
// n 代表人数
// a 代表洗杯子机器洗一台
function minTime1(arr, n, a, b) {
  const heap = new PriorityQueue(
    (a, b) => a.timePoint + a.workTime - (b.timePoint + b.workTime),
  );
  for (let i = 0; i < arr.length; i++) {
    heap.add(new Machine(0, arr[i]));
  }
  const drinks = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    const cur = heap.poll();
    cur.timePoint += cur.workTime;
    drinks[i] = cur.timePoint;
    heap.add(cur);
  }
  return bestTime(drinks, a, b, 0, 0);
}

function bestTime(drinks, wash, air, index, free) {
  if (index === drinks.length) {
    return 0;
  }
  // 我选择用洗杯子的机器洗得到的最终时间点
  const selfClean1 = Math.max(drinks[index], free) + wash;
  const restClean1 = bestTime(drinks, wash, air, index + 1, selfClean1);
  // 这里为什么要max 因为drinks都是每个人喝完的时间点
  // 所有都喝完的话 肯定是以最大的那个喝完的时间点为准的
  const p1 = Math.max(selfClean1, restClean1);

  //我选择自然挥发得到的最终时间点
  const selfClean2 = drinks[index] + air;
  const restClean2 = bestTime(drinks, wash, air, index + 1, free);
  const p2 = Math.max(selfClean2, restClean2);

  return Math.min(p1, p2);
}

function minTime2(arr, n, a, b) {
  const heap = new PriorityQueue(
    (a, b) => a.timePoint + a.workTime - (b.timePoint + b.workTime),
  );
  for (let i = 0; i < arr.length; i++) {
    heap.add(new Machine(0, arr[i]));
  }
  const drinks = new Array(n);
  for (let i = 0; i < n; i++) {
    const cur = heap.poll();
    cur.timePoint += cur.workTime;
    drinks[i] = cur.timePoint;
    heap.add(cur);
  }
  return bestTimeDp(drinks, a, b);
}

function bestTimeDp(drinks, wash, air) {
  const N = drinks.length;
  let maxFree = 0;
  for (let i = 0; i < drinks.length; i++) {
    maxFree = Math.max(maxFree, drinks[i]) + wash;
  }
  const dp = new Array(N + 1)
    .fill(null)
    .map(() => new Array(maxFree + 1).fill(0));

  for (let index = N - 1; index >= 0; index--) {
    for (let free = 0; free <= maxFree; free++) {
      const selfClean1 = Math.max(drinks[index], free) + wash;
      if (selfClean1 > maxFree) {
        break; // Because the rest doesn't need to be filled
      }
      const restClean1 = dp[index + 1][selfClean1];
      const p1 = Math.max(selfClean1, restClean1);

      const selfClean2 = drinks[index] + air;
      const restClean2 = dp[index + 1][free];
      const p2 = Math.max(selfClean2, restClean2);

      dp[index][free] = Math.min(p1, p2);
    }
  }
  return dp[0][0];
}

// for test
// -----------------------------------------------

function randomArray(len, max) {
  const arr = new Array(len);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Math.floor(Math.random() * max) + 1;
  }

  return arr;
}

function printArray(arr) {
  console.log("arr:");
  for (let j = 0; j < arr.length; j++) {
    console.log(arr[j] + ", ");
  }
}

function test() {
  const len = 10;
  const max = 10;
  const testTime = 10;
  console.log("测试开始");
  for (let i = 0; i < testTime; i++) {
    const arr = randomArray(len, max);
    const n = Math.floor(Math.random() * 7) + 1;
    const a = Math.floor(Math.random() * 7) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    const ans1 = right(arr, n, a, b);
    const ans2 = minTime1(arr, n, a, b);
    const ans3 = minTime2(arr, n, a, b);
    if (ans1 != ans2 || ans2 != ans3) {
      printArray(arr);
      console.log("n : " + n);
      console.log("a : " + a);
      console.log("b : " + b);
      console.log(ans1 + " , " + ans2 + " , " + ans3);
      console.log("===============");
      break;
    }
  }
  console.log("测试结束");
}

test();
