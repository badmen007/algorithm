// 棋盘是10*9的
// 思路：
// 如果剩余步数是0 当走到了a,b位置的时候 此时找到了一种方式
// 马在一个位置上 能够跳的位置有8种，穷举就可以了
function jump(a, b, k) {
  return process(0, 0, k, a, b);
}

function process(x, y, rest, a, b) {
  if (x < 0 || x > 9 || y < 0 || y > 8) {
    return 0;
  }
  if (rest == 0) {
    return x == a && y == b ? 1 : 0;
  }

  let ways = process(x + 2, y + 1, rest - 1, a, b);
  ways += process(x + 1, y + 2, rest - 1, a, b);
  ways += process(x - 1, y + 2, rest - 1, a, b);
  ways += process(x - 2, y + 1, rest - 1, a, b);
  ways += process(x - 2, y - 1, rest - 1, a, b);
  ways += process(x - 1, y - 2, rest - 1, a, b);
  ways += process(x + 1, y - 2, rest - 1, a, b);
  ways += process(x + 2, y - 1, rest - 1, a, b);
  return ways;
}

function dp(a, b, k) {
  const dp = new Array(10)
    .fill()
    .map(() => new Array(9).fill(0).map(() => new Array(k + 1).fill(0)));
  dp[a][b][0] = 1;
  for (let rest = 1; rest <= k; rest++) {
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 9; y++) {
        let ways = pick(dp, x + 2, y + 1, rest - 1);
        ways += pick(dp, x + 1, y + 2, rest - 1);
        ways += pick(dp, x - 1, y + 2, rest - 1);
        ways += pick(dp, x - 2, y + 1, rest - 1);
        ways += pick(dp, x - 2, y - 1, rest - 1);
        ways += pick(dp, x - 1, y - 2, rest - 1);
        ways += pick(dp, x + 1, y - 2, rest - 1);
        ways += pick(dp, x + 2, y - 1, rest - 1);
        dp[x][y][rest] = ways;
      }
    }
  }
  return dp[0][0][k];
}

function pick(dp, x, y, rest) {
  if (x < 0 || x > 9 || y < 0 || y > 8) {
    return 0;
  }
  return dp[x][y][rest];
}

function test() {
  const x = 7;
  const y = 7;
  const step = 10;
  console.log(jump(x, y, step));
  console.log(dp(x, y, step));
}

test();
