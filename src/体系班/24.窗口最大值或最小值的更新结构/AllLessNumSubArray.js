function right(arr, num) {
  if (arr == null || arr.length < 0 || num < 0) {
    return 0;
  }
  const N = arr.length;
  let count = 0;
  for (let L = 0; L < N; L++) {
    for (let R = L; R < N; R++) {
      let max = arr[L];
      let min = arr[L];
      for (let i = L + 1; i <= R; i++) {
        max = Math.max(max, arr[i]);
        min = Math.min(min, arr[i]);
      }
      if (max - min <= num) {
        count++;
      }
    }
  }
  return count;
}

// 结论: 当一个数组范围内满足最大值减去最小值小于等于给定的数
// 那么它的子数组必然满足 因为 最大值只可能变小 最小是只可能变大
// 那么差值就只能减小 所以一定满足小于给定的数
function num(arr, sum) {
  if (arr == null || arr.length < 0 || num < 0) {
    return 0;
  }
  const N = arr.length;
  let count = 0;
  const maxWindow = [];
  const minWindow = [];
  let R = 0;
  for (let L = 0; L < N; L++) {
    // 看R能够向右边扩到什么地方
    while (R < N) {
      while (
        maxWindow.length > 0 &&
        arr[maxWindow[maxWindow.length - 1]] <= arr[R]
      ) {
        maxWindow.pop();
      }
      maxWindow.push(R);
      while (
        minWindow.length > 0 &&
        arr[minWindow[minWindow.length - 1]] >= arr[R]
      ) {
        minWindow.pop();
      }
      minWindow.push(R);
      if (arr[maxWindow[0]] - arr[minWindow[0]] > sum) {
        break;
      } else {
        R++;
      }
    }

    count += R - L;
    // 上一题这里的控制是R - w算出来的左侧下标
    // 但是这题变量就是左侧下标
    if (maxWindow[0] == L) {
      maxWindow.shift();
    }
    if (minWindow[0] == L) {
      minWindow.shift();
    }
  }
  return count;
}

// for test

function generateRandomArray(maxLen, maxValue) {
  const len = Math.floor(Math.random() * (maxLen + 1));
  const arr = new Array(len);
  for (let i = 0; i < len; i++) {
    arr[i] =
      Math.floor(Math.random() * (maxValue + 1)) -
      Math.floor(Math.random() * (maxValue + 1));
  }
  return arr;
}

function printArray(arr) {
  if (arr !== null && arr !== undefined) {
    console.log(arr.join(" "));
  }
}

function test() {
  const maxLen = 100;
  const maxValue = 200;
  const testTime = 100000;

  console.log("测试开始");

  for (let i = 0; i < testTime; i++) {
    const arr = generateRandomArray(maxLen, maxValue);
    const sum = Math.floor(Math.random() * (maxValue + 1));
    const ans1 = right(arr, sum);
    const ans2 = num(arr, sum);

    if (ans1 !== ans2) {
      console.log("Oops!");
      printArray(arr);
      console.log(sum);
      console.log(ans1);
      console.log(ans2);
      break;
    }
  }

  console.log("测试结束");
}
test();
