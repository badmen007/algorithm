function minCoins(arr, aim) {
  return process(arr, 0, aim);
}

function process(arr, index, rest) {
  // 没钱了 剩余的为0元 需要0张
  if (index == arr.length) {
    return rest == 0 ? 0 : Infinity;
  } else {
    let ans = Infinity;
    for (let zhang = 0; zhang * arr[index] <= rest; zhang++) {
      const next = process(arr, index + 1, rest - zhang * arr[index]);
      if (next != Infinity) {
        ans = Math.min(ans, zhang + next);
      }
    }
    return ans;
  }
}

function dp1(arr, aim) {
  if (aim === 0) {
    return 0;
  }
  const N = arr.length;
  const dp = new Array(N + 1).fill(0).map(() => new Array(aim + 1).fill(0));
  dp[N][0] = 0;
  for (let j = 1; j <= aim; j++) {
    dp[N][j] = Infinity;
  }
  for (let index = N - 1; index >= 0; index--) {
    for (let rest = 0; rest <= aim; rest++) {
      let ans = Infinity;
      for (let zhang = 0; zhang * arr[index] <= rest; zhang++) {
        const next = dp[index + 1][rest - zhang * arr[index]];
        if (next !== Infinity) {
          ans = Math.min(ans, zhang + next);
        }
      }
      dp[index][rest] = ans;
    }
  }
  return dp[0][aim];
}

function dp2(arr, aim) {
  if (aim === 0) {
    return 0;
  }
  const N = arr.length;
  const dp = new Array(N + 1).fill(0).map(() => new Array(aim + 1).fill(0));
  dp[N][0] = 0;
  for (let j = 1; j <= aim; j++) {
    dp[N][j] = Infinity;
  }
  for (let index = N - 1; index >= 0; index--) {
    for (let rest = 0; rest <= aim; rest++) {
      dp[index][rest] = dp[index + 1][rest];
      if (rest - arr[index] >= 0 && dp[index][rest - arr[index]] != Infinity) {
        dp[index][rest] = Math.min(
          dp[index][rest],
          // 这里加上当前的钱的面值也是对的
          //dp[index][rest - arr[index]] + arr[index],
          dp[index][rest - arr[index]] + 1,
        );
      }
    }
  }
  return dp[0][aim];
}

// for test

function randomArray(maxLen, maxValue) {
  const N = Math.floor(Math.random() * maxLen);
  const arr = new Array(N);
  const has = new Array(maxValue + 1);
  for (let i = 0; i < N; i++) {
    do {
      arr[i] = Math.floor(Math.random() * maxValue) + 1;
    } while (has[arr[i]]);
    has[arr[i]] = true;
  }
  return arr;
}

function test() {
  const maxLen = 20;
  const maxValue = 30;
  const testTimes = 300000;
  console.log("test begin");
  for (let i = 0; i < testTimes; i++) {
    const N = Math.floor(Math.random() * maxLen);
    const arr = randomArray(N, maxValue);
    const aim = Math.floor(Math.random() * maxValue);
    const ans1 = minCoins(arr, aim);
    const ans2 = dp1(arr, aim);
    const ans3 = dp2(arr, aim);
    if (ans1 != ans2) {
      console.log(ans1);
      console.log(ans2);
      console.log(ans3);
      break;
    }
  }
  console.log("test end");
}
test();
