function right(arr) {
  if (arr == null || arr.length < 2) {
    return 0;
  }

  let sum = 0;
  for (let item of arr) {
    sum += item;
  }
  return process(arr, 0, sum / 2);
}

function process(arr, i, rest) {
  if (i == arr.length) {
    return 0;
  } else {
    const p1 = process(arr, i + 1, rest);

    let p2 = 0;
    if (arr[i] <= rest) {
      p2 = process(arr, i + 1, rest - arr[i]);
    }

    return Math.max(p1, p2);
  }
}

function dp(arr) {
  if (arr == null || arr.length < 2) {
    return 0;
  }

  let sum = 0;
  for (let item of arr) {
    sum += item;
  }
  sum = Math.floor(sum / 2);
  const N = arr.length;
  const dp = new Array(N + 1).fill().map(() => new Array(sum + 1).fill(0));

  for (let i = N - 1; i >= 0; i--) {
    for (let rest = 0; rest <= sum; rest++) {
      const p1 = dp[i + 1][rest];
      let p2 = 0;
      if (arr[i] <= rest) {
        p2 = dp[i + 1][rest - arr[i]];
      }
      dp[i][rest] = Math.max(p1, p2);
    }
  }
  return dp[0][sum];
}

// for test

function randomArray(len, value) {
  const arr = new Array(len);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Math.floor(Math.random() * value);
  }
  return arr;
}

function test() {
  const maxLen = 20;
  const maxValue = 50;
  const testTime = 10000;
  console.log("test beigin");
  for (let i = 0; i < testTime; i++) {
    const len = Math.floor(Math.random() * maxLen);
    const arr = randomArray(len, maxValue);
    const ans1 = right(arr);
    const ans2 = dp(arr);
    if (ans1 != ans2) {
      console.log(arr);
      console.log(ans1);
      console.log(ans2);
      break;
    }
  }
  console.log("test end");
}
test();
