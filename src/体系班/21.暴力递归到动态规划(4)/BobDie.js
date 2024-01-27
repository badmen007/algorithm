function livePossibility1(row, col, k, N, M) {
  return process(row, col, k, N, M) / Math.pow(4, k);
}

function process(row, col, rest, N, M) {
  if (row < 0 || row == N || col < 0 || col == M) {
    return 0;
  }
  if (rest == 0) {
    return 1;
  }

  const up = process(row - 1, col, rest - 1, N, M);
  const down = process(row + 1, col, rest - 1, N, M);
  const left = process(row, col - 1, rest - 1, N, M);
  const right = process(row, col + 1, rest - 1, N, M);

  return up + down + left + right;
}

function livePossibility2(row, col, k, N, M) {
  const dp = new Array(N)
    .fill()
    .map(() => new Array(M).fill().map(() => new Array(k + 1).fill(0)));
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      dp[i][j][0] = 1;
    }
  }
  for (let rest = 1; rest <= k; rest++) {
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < M; c++) {
        dp[r][c][rest] = pick(dp, N, M, r - 1, c, rest - 1);
        dp[r][c][rest] += pick(dp, N, M, r + 1, c, rest - 1);
        dp[r][c][rest] += pick(dp, N, M, r, c - 1, rest - 1);
        dp[r][c][rest] += pick(dp, N, M, r, c + 1, rest - 1);
      }
    }
  }
  return dp[row][col][k] / Math.pow(4, k);
}

function pick(dp, N, M, r, c, rest) {
  if (r < 0 || r >= N || c < 0 || c >= M) {
    return 0;
  }
  return dp[r][c][rest];
}

//for test
console.log(livePossibility1(6, 6, 10, 50, 50));
console.log(livePossibility2(6, 6, 10, 50, 50));
