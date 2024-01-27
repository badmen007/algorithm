function coinsWay(arr, aim) {
  if (arr == null || arr.length == 0 || aim < 0) {
    return 0;
  }
  return process(arr, 0, aim);
}

// 每一张都去找一个结果
function process(arr, index, rest) {
  if (index == arr.length) {
    return rest == 0 ? 1 : 0;
  }
  let ways = 0;
  for (let zhang = 0; zhang * arr[index] <= rest; zhang++) {
    ways += process(arr, index + 1, rest - zhang * arr[index]);
  }
  return ways;
}

// 这个dp求一个各自有一个for循环 复杂度不为1了
// 各自中有枚举行为的话 需要再优化
function dp1(arr, aim) {
  if (arr == null || arr.length == 0 || aim < 0) {
    return 0;
  }
  const N = arr.length;
  const dp = new Array(N + 1).fill().map(() => new Array(aim + 1).fill(0));
  dp[N][0] = 1;
  for (let index = N - 1; index >= 0; index--) {
    for (let rest = 0; rest <= aim; rest++) {
      let ways = 0;
      for (let zhang = 0; zhang * arr[index] <= rest; zhang++) {
        ways += dp[index + 1][rest - zhang * arr[index]];
        dp[index][rest] = ways;
      }
    }
  }
  return dp[0][aim];
}

// 省去枚举行为

function dp2(arr, aim) {
  if (arr == null || arr.length == 0 || aim < 0) {
    return 0;
  }
  const N = arr.length;
  const dp = new Array(N + 1).fill().map(() => new Array(aim + 1).fill(0));
  dp[N][0] = 1;
  for (let index = N - 1; index >= 0; index--) {
    for (let rest = 0; rest <= aim; rest++) {
      // 根据递归行为 当前的值可以变成自己前一个和自己下面的那个值相加
      // 递归行为从0开始看
      dp[index][rest] = dp[index + 1][rest];
      if (rest - arr[index] >= 0) {
        dp[index][rest] += dp[index][rest - arr[index]];
      }
    }
  }
  return dp[0][aim];
}

// for test
// 生成一个值没有相同的数组
function randomArray(maxLen, maxValue) {
  const N = Math.floor(Math.random() * maxLen);
  const arr = new Array(N);
  const has = new Array(maxValue + 1).fill(false);
  for (let i = 0; i < arr.length; i++) {
    let randomValue;
    do {
      randomValue = Math.floor(Math.random() * maxValue) + 1;
    } while (has[randomValue]);
    arr[i] = randomValue;
    has[randomValue] = true;
  }

  return arr;
}

function test() {
  const maxLen = 10;
  const maxValue = 30;
  const testTime = 100000;
  console.log("test begin");
  for (let i = 0; i < testTime; i++) {
    const arr = randomArray(maxLen, maxValue);
    const aim = Math.floor(Math.random() * maxValue);
    const ans1 = coinsWay(arr, aim);
    const ans2 = dp1(arr, aim);
    const ans3 = dp2(arr, aim);

    if (ans1 !== ans2 || ans1 !== ans3) {
      console.log(arr);
      console.log(ans1, "ans1");
      console.log(ans2, "ans2");
      console.log(ans3, "ans3");
      break;
    }
  }

  console.log("test begin");
}

test();
