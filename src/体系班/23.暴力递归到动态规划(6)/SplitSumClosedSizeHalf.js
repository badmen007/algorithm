function right(arr) {
  if (arr == null || arr.length < 2) {
    return 0;
  }
  let sum = 0;
  for (const item of arr) {
    sum += item;
  }
  sum = Math.floor(sum / 2);
  if ((arr.length & 1) == 0) {
    return process(arr, 0, arr.length / 2, sum);
  } else {
    return Math.max(
      process(arr, 0, Math.floor(arr.length / 2), sum),
      process(arr, 0, Math.floor(arr.length / 2) + 1, sum),
    );
  }
}

function process(arr, i, picks, rest) {
  if (i == arr.length) {
    return picks == 0 ? 0 : -1;
  } else {
    const p1 = process(arr, i + 1, picks, rest);

    let p2 = -1;
    let next = -1;
    if (arr[i] <= rest) {
      next = process(arr, i + 1, picks - 1, rest - arr[i]);
    }

    if (next != -1) {
      p2 = arr[i] + next;
    }

    return Math.max(p1, p2);
  }
}

function dp(arr) {
  if (arr == null || arr.length < 2) {
    return 0;
  }
  let sum = 0;
  for (const item of arr) {
    sum += item;
  }
  sum = Math.floor(sum / 2);
  const N = arr.length;
  const M = Math.floor((1 + N) / 2);
  const dp = new Array(N + 1)
    .fill()
    .map(() => new Array(M + 1).fill().map(() => new Array(sum + 1).fill(-1)));

  for (let rest = 0; rest <= sum; rest++) {
    dp[N][0][rest] = 0;
  }

  for (let i = N - 1; i >= 0; i--) {
    for (let picks = 0; picks <= M; picks++) {
      for (let rest = 0; rest <= sum; rest++) {
        const p1 = dp[i + 1][picks][rest];
        let p2 = -1;
        let next = -1;
        if (picks - 1 >= 0 && arr[i] <= rest) {
          next = dp[i + 1][picks - 1][rest - arr[i]];
        }
        if (next != -1) {
          p2 = arr[i] + next;
        }
        dp[i][picks][rest] = Math.max(p1, p2);
      }
    }
  }
  if ((arr.length & 1) == 0) {
    return dp[0][arr.length / 2][sum];
  } else {
    return Math.max(
      dp[0][Math.floor(arr.length / 2)][sum],
      dp[0][Math.floor(arr.length / 2) + 1][sum],
    );
  }
}

function dp2(arr) {
  if (!arr || arr.length < 2) {
    return 0;
  }
  let sum = arr.reduce((acc, num) => acc + num, 0);
  sum >>= 1;
  const N = arr.length;
  const M = (arr.length + 1) >> 1;
  const dp = new Array(N)
    .fill(0)
    .map(() =>
      new Array(M + 1)
        .fill(0)
        .map(() => new Array(sum + 1).fill(Number.MIN_SAFE_INTEGER)),
    );

  for (let i = 0; i < N; i++) {
    for (let j = 0; j <= M; j++) {
      for (let k = 0; k <= sum; k++) {
        dp[i][j][k] = Number.MIN_SAFE_INTEGER;
      }
    }
  }

  for (let i = 0; i < N; i++) {
    for (let k = 0; k <= sum; k++) {
      dp[i][0][k] = 0;
    }
  }

  for (let k = 0; k <= sum; k++) {
    dp[0][1][k] = arr[0] <= k ? arr[0] : Number.MIN_SAFE_INTEGER;
  }

  for (let i = 1; i < N; i++) {
    for (let j = 1; j <= Math.min(i + 1, M); j++) {
      for (let k = 0; k <= sum; k++) {
        dp[i][j][k] = dp[i - 1][j][k];
        if (k - arr[i] >= 0) {
          dp[i][j][k] = Math.max(
            dp[i][j][k],
            dp[i - 1][j - 1][k - arr[i]] + arr[i],
          );
        }
      }
    }
  }

  return Math.max(dp[N - 1][M][sum], dp[N - 1][N - M][sum]);
}

// 测试
function randomArray(len, value) {
  const arr = new Array(len)
    .fill(0)
    .map(() => Math.floor(Math.random() * value));
  return arr;
}

function printArray(arr) {
  console.log(arr.join(" "));
}

// 测试开始
const maxLen = 10;
const maxValue = 50;
const testTime = 10000;
console.log("测试开始");
for (let i = 0; i < testTime; i++) {
  const len = Math.floor(Math.random() * maxLen);
  const arr = randomArray(len, maxValue);
  const ans1 = right(arr);
  const ans2 = dp(arr);
  const ans3 = dp2(arr);
  if (ans1 !== ans2 || ans1 !== ans3) {
    printArray(arr);
    console.log(ans1);
    console.log(ans2);
    console.log(ans3);
    console.log("Oops!");
    break;
  }
}
console.log("测试结束");
