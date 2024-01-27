function number(str) {
  if (str == null || str.length == 0) {
    return 0;
  }
  return process(str.split(""), 0);
}

function process(strArr, i) {
  if (i == strArr.length) {
    return 1;
  }

  if (strArr[i] == 0) {
    return 0;
  }

  let ways = process(strArr, i + 1);
  if (i + 1 < strArr.length && strArr[i] * 10 + Number(strArr[i + 1]) < 26) {
    ways += process(strArr, i + 2);
  }

  return ways;
}

function dp(s) {
  if (s == null || s.length == 0) {
    return 0;
  }
  const str = s.split("");
  const N = s.length;
  const dp = new Array(N + 1).fill(0);
  dp[N] = 1;
  for (let i = N - 1; i >= 0; i--) {
    if (str[i] !== 0) {
      let ways = dp[i + 1];
      if (i + 1 < str.length && str[i] * 10 + Number(str[i + 1]) < 26) {
        ways += dp[i + 2];
      }
      dp[i] = ways;
    }
  }
  return dp[0];
}

function test() {
  console.log(number("11122"));
  console.log(dp("11122"));
}
test();
