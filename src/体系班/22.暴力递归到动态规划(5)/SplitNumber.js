function ways(n) {
  if (n < 0) {
    return 0;
  }

  if (n == 1) {
    return 1;
  }

  return process(1, n);
}

function process(pre, rest) {
  if (rest == 0) {
    return 1;
  }
  if (pre > rest) {
    return 0;
  }

  let ways = 0;
  for (let first = pre; first <= rest; first++) {
    ways += process(first, rest - first);
  }

  return ways;
}

function dp1(n) {
  if (n < 0) {
    return 0;
  }

  if (n == 1) {
    return 1;
  }

  const dp = new Array(n + 1).fill(0).map(() => new Array(n + 1).fill(0));
  for (let pre = 1; pre <= n; pre++) {
    dp[pre][0] = 1;
    dp[pre][pre] = 1;
  }
  for (let pre = n - 1; pre >= 0; pre--) {
    for (let rest = pre + 1; rest <= n; rest++) {
      let ways = 0;
      for (let first = pre; first <= rest; first++) {
        ways += dp[first][rest - first];
      }
      dp[pre][rest] = ways;
    }
  }
  return dp[1][n];
}

function dp2(n) {
  if (n < 0) {
    return 0;
  }

  if (n == 1) {
    return 1;
  }

  const dp = new Array(n + 1).fill(0).map(() => new Array(n + 1).fill(0));
  for (let pre = 1; pre <= n; pre++) {
    dp[pre][0] = 1;
    dp[pre][pre] = 1;
  }
  for (let pre = n - 1; pre >= 0; pre--) {
    for (let rest = pre + 1; rest <= n; rest++) {
      // 下面的格子
      dp[pre][rest] = dp[pre + 1][rest];
      // 依赖的左边的格子
      dp[pre][rest] += dp[pre][rest - pre];
    }
  }
  return dp[1][n];
}

console.log(ways(13));
console.log(dp1(13));
console.log(dp2(13));
