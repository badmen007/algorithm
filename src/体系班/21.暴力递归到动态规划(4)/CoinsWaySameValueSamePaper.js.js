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

function coinsWay(arr, aim) {
  if (arr == null || arr.length == 0 || aim < 0) {
    return 0;
  }
  const info = getInfo(arr);
  return process(info.coins, info.zhangs, 0, aim);
}

function process(coins, zhangs, index, rest) {
  if (index == coins.length) {
    return rest == 0 ? 1 : 0;
  }
  let ways = 0;
  for (
    let zhang = 0;
    zhang * coins[index] <= rest && zhang <= zhangs[index];
    zhang++
  ) {
    ways += process(coins, zhangs, index + 1, rest - zhang * coins[index]);
  }
  return ways;
}

function dp1(arr, aim) {
  if (arr == null || arr.length == 0 || aim < 0) {
    return 0;
  }

  const info = getInfo(arr);
  const coins = info.coins;
  const zhangs = info.zhangs;
  const N = coins.length;
  const dp = new Array(N + 1).fill().map(() => new Array(aim + 1).fill(0));
  dp[N][0] = 1;
  for (let index = N - 1; index >= 0; index--) {
    for (let rest = 0; rest <= aim; rest++) {
      let ways = 0;
      for (
        let zhang = 0;
        zhang * coins[index] <= rest && zhang <= zhangs[index];
        zhang++
      ) {
        ways += dp[index + 1][rest - zhang * coins[index]];
      }
      dp[index][rest] = ways;
    }
  }

  return dp[0][aim];
}

function dp2(arr, aim) {
  if (arr == null || arr.length == 0 || aim < 0) {
    return 0;
  }

  const info = getInfo(arr);
  const coins = info.coins;
  const zhangs = info.zhangs;
  const N = coins.length;
  const dp = new Array(N + 1).fill().map(() => new Array(aim + 1).fill(0));
  dp[N][0] = 1;
  for (let index = N - 1; index >= 0; index--) {
    for (let rest = 0; rest <= aim; rest++) {
      dp[index][rest] = dp[index + 1][rest];
      // 同一层的张数和面值都是一样的
      if (rest - coins[index] >= 0) {
        dp[index][rest] += dp[index][rest - coins[index]];
      }
      if (rest - coins[index] * (zhangs[index] + 1) >= 0) {
        dp[index][rest] -=
          dp[index + 1][rest - coins[index] * (zhangs[index] + 1)];
      }
    }
  }

  return dp[0][aim];
}
// for test
function randomArray(maxLen, maxValue) {
  const N = Math.floor(Math.random() * maxLen);
  const arr = new Array(N);
  for (let i = 0; i < N; i++) {
    arr[i] = Math.floor(Math.random() * maxValue) + 1;
  }
  return arr;
}

function test() {
  const maxLen = 10;
  const maxValue = 100;
  const testTime = 100000;
  console.log("test begin");
  for (let i = 0; i < testTime; i++) {
    const arr = randomArray(maxLen, maxValue);
    const aim = Math.floor(Math.random() * maxValue);
    const ans1 = coinsWay(arr, aim);
    const ans2 = dp1(arr, aim);
    const ans3 = dp2(arr, aim);
    if (ans1 !== ans2 || ans1 !== ans3) {
      console.log(arr);
      console.log(ans1);
      console.log(ans2);
      console.log(ans3);
      break;
    }
  }
  console.log("test end");
}

test();
