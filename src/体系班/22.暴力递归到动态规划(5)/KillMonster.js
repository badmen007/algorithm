// N 代表怪兽的血量
// M 代表每一伤害再[0, M] 上
// K 代表的是能砍的次数
function right(N, M, K) {
  if (N < 1 || M < 1 || K < 1) {
    return 0;
  }

  const all = Math.pow(M + 1, K);
  const kill = process(K, M, N);
  return kill / all;
}

function process(times, M, hp) {
  // 次数用完了刚好血量也没了
  if (times == 0) {
    return hp <= 0 ? 1 : 0;
  }
  // 第二种情况 次数还没用完 血量就没了
  if (hp <= 0) {
    return Math.pow(M + 1, times);
  }
  let ways = 0;
  for (let i = 0; i <= M; i++) {
    ways += process(times - 1, M, hp - i);
  }
  return ways;
}

function dp1(N, M, K) {
  if (N < 1 || M < 1 || K < 1) {
    return 0;
  }
  const all = Math.pow(M + 1, K);
  const dp = new Array(K + 1).fill().map(() => new Array(N + 1).fill(0));
  dp[0][0] = 1;
  for (let times = 1; times <= K; times++) {
    dp[times][0] = Math.pow(M + 1, times);
    for (let hp = 1; hp <= N; hp++) {
      let ways = 0;
      for (let i = 0; i <= M; i++) {
        // hp - i 可能小于0了 小于0 的时候概率就是Math.pow(M+1, times)
        if (hp - i > 0) {
          ways += dp[times - 1][hp - i];
        } else {
          ways += Math.pow(M + 1, times - 1);
        }
      }
      dp[times][hp] = ways;
    }
  }
  const kill = dp[K][N];
  return kill / all;
}

function dp2(N, M, K) {
  if (N < 1 || M < 1 || K < 1) {
    return 0;
  }
  const all = Math.pow(M + 1, K);
  const dp = new Array(K + 1).fill().map(() => new Array(N + 1).fill(0));
  dp[0][0] = 1;
  for (let times = 1; times <= K; times++) {
    dp[times][0] = Math.pow(M + 1, times);
    for (let hp = 1; hp <= N; hp++) {
      dp[times][hp] = dp[times][hp - 1] + dp[times - 1][hp];
      if (hp - 1 - M > 0) {
        dp[times][hp] -= dp[times - 1][hp - 1 - M];
      } else {
        dp[times][hp] -= Math.pow(M + 1, times - 1);
      }
    }
  }
  const kill = dp[K][N];
  return kill / all;
}

// for test

function test() {
  const NMax = 10;
  const MMax = 10;
  const KMax = 10;
  const testTime = 200;
  console.log("test begin");
  for (let i = 0; i < testTime; i++) {
    const N = Math.floor(Math.random() * NMax);
    const M = Math.floor(Math.random() * MMax);
    const K = Math.floor(Math.random() * KMax);
    const ans1 = right(N, M, K);
    const ans2 = dp1(N, M, K);
    const ans3 = dp2(N, M, K);
    if (ans1 != ans2 || ans1 != ans3) {
      console.log(ans1);
      console.log(ans2);
      console.log(ans3);
      break;
    }
  }
  console.log("test end");
}

test();
