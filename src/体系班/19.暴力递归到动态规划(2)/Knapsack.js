// 背包问题
// w 代表的是货物的重量
// v 代表的是货物的价值 重量和价值的数组是等长的
// bag表示的是背包的载重量

function maxValue(w, v, bag) {
  if (w == null || v == null || w.length !== v.length || w.length == 0) {
    return 0;
  }
  // 0表示的是从位置开始尝试
  return process(w, v, 0, bag);
}

function process(w, v, index, rest) {
  if (rest < 0) {
    // 说明此时的值是无效的
    return -1;
  }
  if (index == w.length) {
    return 0;
  }

  // 第一种情况是不要当前位置
  const p1 = process(w, v, index + 1, rest);
  // 第二种情况是要当前的位置
  // 为什么这里要提前算一下
  // 因为当前位置的货物重量可能比背包的容量大 但是货物的价值可能会加到p2中去
  let p2 = 0;
  const next = process(w, v, index + 1, rest - w[index]);
  if (next != -1) {
    p2 = v[index] + next;
  }
  return Math.max(p1, p2);
}

// 优化
// 只有两个可变参数 index bag
// 范围 index: 0 ~ N, bag: 负数 ~ bag

function dp(w, v, bag) {
  if (w == null || v == null || w.length != v.length || w.length == 0) {
    return 0;
  }
  const N = w.length;
  // index 0 ~ N
  // rest 0 ~ bag
  // 根据basecase最后一行都是0 并且上一行都是依赖下一行的 所以从倒数第二行开始
  const dp = new Array(N + 1).fill(0).map(() => new Array(bag + 1).fill(0));
  for (let index = N - 1; index >= 0; index--) {
    for (let rest = 0; rest <= bag; rest++) {
      const p1 = dp[index + 1][rest];
      let p2 = 0;
      const next = rest - w[index] < 0 ? -1 : dp[index + 1][rest - w[index]];
      if (next != -1) {
        p2 = v[index] + next;
      }
      dp[index][rest] = Math.max(p1, p2);
    }
  }
  return dp[0][bag];
}

function test() {
  const weights = [3, 2, 4, 7, 3, 1, 7];
  const values = [5, 6, 3, 19, 12, 4, 2];
  const bag = 15;
  console.log(maxValue(weights, values, bag));
  console.log(dp(weights, values, bag));
}
test();
