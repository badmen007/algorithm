// https://leetcode.com/problems/longest-palindromic-subsequence/

function lps1(s) {
  if (s == null || s.length == 0) {
    return 0;
  }
  const str = s.split("");
  return f(str, 0, str.length - 1);
}

function f(str, L, R) {
  // 中间的那个值
  if (L == R) {
    return 1;
  }

  if (L == R - 1) {
    return str[L] == str[R - 1] ? 2 : 1;
  }
  // L,R 位置都不要
  const p1 = f(str, L + 1, R - 1);
  // 要R 不要L
  const p2 = f(str, L + 1, R);
  // 要L 不要R
  const p3 = f(str, L, R - 1);
  // 两个位置都要 前提是两个位置的值要相等
  const p4 = (str[L] = str[R] ? 2 + f(str, L + 1, R - 1) : 0);
  return Math.max(p1, p2, p3, p4);
}

function lps2(s) {
  if (s == null || s.length == 0) {
    return 0;
  }
  const str = s.split("");
  const N = str.length;
  const dp = new Array(N).fill().map(() => new Array(N).fill(0));
  dp[N - 1][N - 1] = 1;
  for (let i = 0; i < N - 1; i++) {
    dp[i][i] = 1;
    dp[i][i + 1] = str[i] == str[i + 1] ? 2 : 1;
  }
  for (let L = N - 3; L >= 0; L--) {
    for (let R = L + 2; R < N; R++) {
      //本来是三个方向上求最大值分别是左边、下边、左下
      //但是左边的值一定比左下的大，因为左边的值是它左边、下边、左下的最大值
      //所以昨天的值一定比左下的大
      dp[L][R] = Math.max(dp[L][R - 1], dp[L + 1][R]);
      if (str[L] == str[R]) {
        dp[L][R] = 2 + dp[L + 1][R - 1];
      }
    }
  }
  return dp[0][N - 1];
}
