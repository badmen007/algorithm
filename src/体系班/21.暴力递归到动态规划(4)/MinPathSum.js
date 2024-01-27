// 最小路径
function minPathSum1(m) {
  if (m == null || m.length == 0 || m[0] == null || m[0].length == 0) {
    return 0;
  }
  const row = m.length;
  const col = m[0].length;
  const dp = new Array(row).fill().map(() => new Array(col).fill(0));
  dp[0][0] = m[0][0];
  for (let j = 1; j < col; j++) {
    dp[0][j] = dp[0][j - 1] + m[0][j];
  }
  for (let i = 1; i < row; i++) {
    dp[i][0] = dp[i - 1][0] + m[i][0];
  }
  for (let i = 1; i < row; i++) {
    for (let j = 1; j < col; j++) {
      dp[i][j] = m[i][j] + Math.min(dp[i][j - 1], dp[i - 1][j]);
    }
  }
  return dp[row - 1][col - 1];
}

// 优化的点在于用一个一维数组代替了 上面方法的二维数组 空间上的优化
function minPathSum2(m) {
  if (m == null || m.length == 0 || m[0] == null || m[0].length == 0) {
    return 0;
  }
  const row = m.length;
  const col = m[0].length;
  const dp = new Array(col).fill(0);
  dp[0] = m[0][0];
  for (let j = 1; j < col; j++) {
    dp[j] = dp[j - 1] + m[0][j];
  }
  for (let i = 1; i < row; i++) {
    dp[0] += m[i][0];
    for (let j = 1; j < col; j++) {
      dp[j] = Math.min(dp[j - 1], dp[j]) + m[i][j];
    }
  }
  return dp[col - 1];
}

// for test

function generateRandomMatrix(rowSize, colSize) {
  if (rowSize < 0 || colSize < 0) {
    return null;
  }
  const result = new Array(rowSize)
    .fill()
    .map(() => new Array(colSize).fill(0));
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[0].length; j++) {
      result[i][j] = Math.floor(Math.random() * 100);
    }
  }
  return result;
}
function test() {
  const rowSize = 10;
  const colSize = 10;
  const m = generateRandomMatrix(rowSize, colSize);
  console.log(minPathSum1(m));
  console.log(minPathSum2(m));
}

test();
