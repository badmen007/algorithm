// https://leetcode.com/problems/longest-common-subsequence/

// 可能性分析
// str1[0...i]
// str2[0...j]
// 想一下边界条件
// 样本对应模型 以最后一个字符的可能性为基础

function longestCommonSubsequence1(s1, s2) {
  if (s1 == null || s2 == null || s1.length == 0 || s2.length == 0) {
    return 0;
  }
  const str1 = s1.split("");
  const str2 = s2.split("");

  return process1(str1, str2, str1.length - 1, str2.length - 1);
}

function process1(str1, str2, i, j) {
  if (i == 0 && j == 0) {
    return str1[i] == str2[j] ? 1 : 0;
  } else if (i == 0) {
    if (str1[i] == str2[j]) {
      return 1;
    } else {
      return process1(str1, str2, i, j - 1);
    }
  } else if (j == 0) {
    if (str1[i] == str2[j]) {
      return 1;
    } else {
      return process1(str1, str2, i - 1, j);
    }
  } else {
    // 1.完全不考虑i位置，可能考虑也可能不考虑j位置
    // 2.完全不考虑j位置，可能考虑也可能不考虑i位置
    // 3.以i位置和j位置结尾，但是得相等
    const p1 = process1(str1, str2, i - 1, j);
    const p2 = process1(str1, str2, i, j - 1);
    const p3 = str1[i] == str2[j] ? 1 + process1(str1, str2, i - 1, j - 1) : 0;
    return Math.max(p1, p2, p3);
  }
}

function longestCommonSubsequence2(s1, s2) {
  if (s1 == null || s2 == null || s1.length == 0 || s2.length == 0) {
    return 0;
  }
  const str1 = s1.split("");
  const str2 = s2.split("");

  const N = str1.length;
  const M = str2.length;

  const dp = new Array(N).fill(0).map(() => new Array(M).fill(0));
  dp[0][0] = str1[0] == str2[0] ? 1 : 0;
  for (let j = 1; j < M; j++) {
    dp[0][j] = str1[0] == str2[j] ? 1 : dp[0][j - 1];
  }

  for (let i = 1; i < N; i++) {
    dp[i][0] = str1[i] == str2[0] ? 1 : dp[i - 1][0];
  }

  for (let i = 1; i < N; i++) {
    for (let j = 1; j < M; j++) {
      const p1 = dp[i - 1][j];
      const p2 = dp[i][j - 1];
      const p3 = str1[i] == str2[j] ? 1 + dp[i - 1][j - 1] : 0;
      dp[i][j] = Math.max(p1, p2, p3);
    }
  }

  return dp[N - 1][M - 1];
}
