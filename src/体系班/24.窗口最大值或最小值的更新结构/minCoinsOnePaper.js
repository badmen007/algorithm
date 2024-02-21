function minCoins(arr, aim) {
  return process(arr, 0, aim);
}

function process(arr, index, rest) {
  if (rest < 0) {
    return Number.MAX_VALUE;
  }
  if (index === arr.length) {
    return rest == 0 ? 0 : Number.MAX_VALUE;
  } else {
    const p1 = process(arr, index + 1, rest);
    let p2 = process(arr, index + 1, rest - arr[index]);
    if (p2 !== Number.MAX_VALUE) {
      p2++;
    }
    return Math.min(p1, p2);
  }
}

function dp1(arr, aim) {
  if (aim == 0) {
    return 0;
  }
  const N = arr.length;
  const dp = new Array(N + 1).fill().map(() => new Array(aim + 1).fill(0));
  dp[N][0] = 0;
  for (let j = 1; j <= aim; j++) {
    dp[N][j] = Number.MAX_VALUE;
  }

  for (let index = N - 1; index >= 0; index--) {
    for (let rest = 0; rest <= aim; rest++) {
      const p1 = dp[index + 1][rest];
      let p2 =
        rest - arr[index] >= 0
          ? dp[index + 1][rest - arr[index]]
          : Number.MAX_VALUE;
      // 因为要加上自己
      if (p2 !== Number.MAX_VALUE) {
        p2++;
      }
      dp[index][rest] = Math.min(p1, p2);
    }
  }
  return dp[0][aim];
}
// ---dp 2
class Info {
  constructor(c, z) {
    this.coins = c;
    this.zhangs = z;
  }
}

function getInfo(arr) {
  const counts = new Map();
  for (const value of arr) {
    if (!counts.has(value)) {
      counts.set(value, 1);
    } else {
      counts.set(value, counts.get(value) + 1);
    }
  }
  const N = counts.size;
  const coins = new Array(N);
  const zhangs = new Array(N);
  let index = 0;
  for (const [key, value] of counts.entries()) {
    coins[index] = key;
    zhangs[index++] = value;
  }
  return new Info(coins, zhangs);
}

function dp2(arr, aim) {
  if (aim == 0) {
    return 0;
  }
  const info = getInfo(arr);
  const coins = info.coins;
  const zhangs = info.zhangs;
  const N = coins.length;
  const dp = new Array(N + 1).fill().map(() => new Array(aim + 1).fill());
  dp[N][0] = 0;
  for (let j = 1; j <= aim; j++) {
    dp[N][j] = Number.MAX_VALUE;
  }

  for (let index = N - 1; index >= 0; index--) {
    for (let rest = 0; rest <= aim; rest++) {
      dp[index][rest] = dp[index + 1][rest];
      for (
        let zhang = 1;
        zhang * coins[index] <= aim && zhang <= zhangs[index];
        zhang++
      ) {
        if (
          rest - zhang * coins[index] >= 0 &&
          dp[index + 1][rest - zhang * coins[index]] !== Number.MAX_VALUE
        ) {
          dp[index][rest] = Math.min(
            dp[index][rest],
            zhang + dp[index + 1][rest - zhang * coins[index]],
          );
        }
      }
    }
  }
  return dp[0][aim];
}

function dp3(arr, aim) {
  if (aim === 0) {
    return 0;
  }

  const info = getInfo(arr);
  const c = info.coins;
  const z = info.zhangs;
  const N = c.length;
  const dp = new Array(N + 1).fill(0).map(() => new Array(aim + 1).fill(0));

  dp[N][0] = 0;
  for (let j = 1; j <= aim; j++) {
    dp[N][j] = Number.MAX_VALUE;
  }

  for (let i = N - 1; i >= 0; i--) {
    for (let mod = 0; mod < Math.min(aim + 1, c[i]); mod++) {
      let w = [];
      w.push(mod);
      dp[i][mod] = dp[i + 1][mod];

      for (let r = mod + c[i]; r <= aim; r += c[i]) {
        while (
          w.length > 0 &&
          (dp[i + 1][w[w.length - 1]] === Number.MAX_VALUE ||
            dp[i + 1][w[w.length - 1]] + compensate(w[w.length - 1], r, c[i]) >=
              dp[i + 1][r])
        ) {
          w.pop();
        }

        w.push(r);
        const overdue = r - c[i] * (z[i] + 1);

        if (w[0] === overdue) {
          w.shift();
        }

        if (dp[i + 1][w[0]] === Number.MAX_VALUE) {
          dp[i][r] = Number.MAX_VALUE;
        } else {
          dp[i][r] = dp[i + 1][w[0]] + compensate(w[0], r, c[i]);
        }
      }
    }
  }

  return dp[0][aim];
}

function compensate(pre, cur, coin) {
  return Math.floor((cur - pre) / coin);
}

// for test
function randomArray(N, maxValue) {
  const arr = [];
  for (let i = 0; i < N; i++) {
    arr[i] = Math.floor(Math.random() * maxValue) + 1;
  }
  return arr;
}

function printArray(arr) {
  console.log(arr.join(" "));
}

function test() {
  const maxLen = 20;
  const maxValue = 32;
  const testTime = 300000;

  console.log("Functionality test starts");

  for (let i = 0; i < testTime; i++) {
    const N = Math.floor(Math.random() * maxLen);
    const arr = randomArray(N, maxValue);
    const aim = Math.floor(Math.random() * maxValue);

    const ans1 = minCoins(arr, aim);
    const ans2 = dp1(arr, aim);
    const ans3 = dp2(arr, aim);
    const ans4 = dp3(arr, aim);

    if (ans1 !== ans2 || ans3 !== ans4 || ans1 !== ans3) {
      console.log("Oops!");
      printArray(arr);
      console.log(aim);
      console.log(ans1);
      console.log(ans2);
      console.log(ans3);
      console.log(ans4);
      break;
    }
  }

  console.log("Functionality test ends");

  console.log("==========");

  let aim = 0;
  let arr = null;
  let start;
  let end;
  let ans2;
  let ans3;

  console.log("Performance test starts");

  let maxLenPerf = 30000;
  let maxValuePerf = 20;
  aim = 60000;
  arr = randomArray(maxLenPerf, maxValuePerf);

  start = Date.now();
  ans2 = dp2(arr, aim);
  end = Date.now();
  console.log(
    "dp2 answer: " + ans2 + ", dp2 runtime: " + (end - start) + " ms",
  );

  start = Date.now();
  ans3 = dp3(arr, aim);
  end = Date.now();
  console.log(
    "dp3 answer: " + ans3 + ", dp3 runtime: " + (end - start) + " ms",
  );

  console.log("Performance test ends");

  console.log("===========");

  console.log("In cases of significant coin repetition,");
  console.log("Large-scale testing dp3 begins");
  maxLenPerf = 20000000;
  aim = 10000;
  maxValuePerf = 10000;
  arr = randomArray(maxLenPerf, maxValuePerf);

  start = Date.now();
  ans3 = dp3(arr, aim);
  end = Date.now();
  console.log("dp3 runtime: " + (end - start) + " ms");
  console.log("Large-scale testing dp3 ends");

  console.log("===========");

  console.log("When coins rarely repeat, dp2 has constant time advantage");
  console.log(
    "When coins heavily repeat, dp3 time complexity is significantly better than dp2",
  );
  console.log(
    "The optimization in dp3 involves using a structure for updating the minimum value within a window",
  );
}

test();
