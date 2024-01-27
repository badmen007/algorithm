function way1(N, start, aim, K) {
  if (N < 2 || start < 1 || start > N || aim < 1 || aim > N || K < 1) {
    return;
  }
  return process1(start, K, aim, N);
}

function process1(cur, rest, aim, N) {
  // 当剩余的步数为0 如果当前位置是目标位置的话 就为1一种走法
  if (rest == 0) {
    return cur == aim ? 1 : 0;
  }
  // 当在1位置的时候 只能往右走
  if (cur == 1) {
    return process1(2, rest - 1, aim, N);
  }
  // 当在N位置的时候只能往左边走
  if (cur == N) {
    return process1(N - 1, rest - 1, aim, N);
  }
  // 除了上面的情况就是 既能往左边走也能往右边走
  return (
    process1(cur - 1, rest - 1, aim, N) + process1(cur + 1, rest - 1, aim, N)
  );
}

// 上面的代码怎么优化
// 肯定存在 在某一个位置剩余的步数都是一样的 这种情况下产生的结果也一样
// 将出现的位置和步数做一个缓存，下次再走到的时候直接取出来就行

function way2(N, start, aim, K) {
  if (N < 2 || start < 1 || start > N || aim < 1 || aim > N || K < 1) {
    return;
  }
  // K 代表的是走多少步
  // N 代表总共有多少个位置 范围 1 ~ N
  // 注意这两个dp的声明方式上面的这个是错的
  // 区别：上面的这个 外部数组fill的内层数组都是同一个数组 引用地址同一个
  // const dp = new Array(N + 1).fill(new Array(K + 1).fill(-1));
  // 生成一个二维数组
  const dp = new Array(N + 1).fill(0).map(() => new Array(K + 1).fill(-1));
  return process2(start, K, aim, N, dp);
}

// cur: 1 ~ N
// rest: 0 ~ K
function process2(cur, rest, aim, N, dp) {
  if (dp[cur][rest] !== -1) {
    return dp[cur][rest];
  }
  let ans = 0;
  if (rest == 0) {
    ans = cur == aim ? 1 : 0;
  } else if (cur == 1) {
    ans = process2(2, rest - 1, aim, N, dp);
  } else if (cur == N) {
    ans = process2(N - 1, rest - 1, aim, N, dp);
  } else {
    ans =
      process2(cur - 1, rest - 1, aim, N, dp) +
      process2(cur + 1, rest - 1, aim, N, dp);
  }
  dp[cur][rest] = ans;
  return ans;
}

function way3(N, start, aim, K) {
  if (N < 2 || start < 1 || start > N || aim < 1 || aim > N || K < 1) {
    return;
  }
  const dp = new Array(N + 1).fill(0).map(() => new Array(K + 1).fill(0));
  // 这个就是递归的那个basecase
  dp[aim][0] = 1;
  for (let rest = 1; rest <= K; rest++) {
    dp[1][rest] = dp[2][rest - 1];
    for (let cur = 2; cur < N; cur++) {
      dp[cur][rest] = dp[cur - 1][rest - 1] + dp[cur + 1][rest - 1];
    }
    dp[N][rest] = dp[N - 1][rest - 1];
  }
  return dp[start][K];
}

function test() {
  console.log(way1(5, 2, 4, 6));
  console.log(way2(5, 2, 4, 6));
  console.log(way3(5, 2, 4, 6));
}
test();
