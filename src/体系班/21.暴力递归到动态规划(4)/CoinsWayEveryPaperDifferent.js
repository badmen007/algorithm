function coinWays(arr, aim) {
  return process(arr, 0, aim);
}

function process(arr, index, rest) {
  if (index == arr.length) {
    return rest == 0 ? 1 : 0;
  } else {
    return (
      process(arr, index + 1, rest) + process(arr, index + 1, rest - arr[index])
    );
  }
}

function dp(arr, aim) {
  if (aim == 0) {
    return 1;
  }
  const N = arr.length;
  const dp = new Array(N + 1).fill().map(() => new Array(aim + 1).fill(0));

  dp[N][0] = 1;
  for (let index = N - 1; index >= 0; index--) {
    for (let rest = 0; rest <= aim; rest++) {
      dp[index][rest] =
        dp[index + 1][rest] +
        (rest - arr[index] >= 0 ? dp[index + 1][rest - arr[index]] : 0);
    }
  }
  return dp[0][aim];
}

// for test
function randomArray(maxLen, maxValue) {
  const N = Math.floor(Math.random() * maxLen);
  const arr = new Array(N).fill(0);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Math.floor(Math.random() * maxValue) + 1;
  }
  return arr;
}

function test() {
  const maxLen = 20;
  const maxValue = 30;
  const testTime = 100000;
  console.log("test begin");
  for (let i = 0; i < testTime; i++) {
    const arr = randomArray(maxLen, maxValue);
    const aim = Math.floor(Math.random() * maxValue);
    const ans1 = coinWays(arr, aim);
    const ans2 = dp(arr, aim);
    if (ans1 != ans2) {
      console.log(ans1);
      console.log(ans2);
      console.log(arr);
      break;
    }
  }
  console.log("test over");
}
test();
