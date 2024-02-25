function max1(arr) {
  let max = Number.MIN_VALUE;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      let minNum = Number.MAX_VALUE;
      let sum = 0;
      for (let k = i; k <= j; k++) {
        sum += arr[k];
        minNum = Math.min(minNum, arr[k]);
      }
      max = Math.max(max, minNum * sum);
    }
  }
  return max;
}

function max2(arr) {
  const size = arr.length;
  const sums = [];
  sums[0] = arr[0];
  for (let i = 1; i < size; i++) {
    sums[i] = sums[i - 1] + arr[i];
  }
  const stack = [];
  let max = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < size; i++) {
    while (stack.length > 0 && arr[stack[stack.length - 1]] >= arr[i]) {
      const j = stack.pop();
      max = Math.max(
        max,
        (stack.length == 0
          ? sums[i - 1]
          : sums[i - 1] - sums[stack[stack.length - 1]]) * arr[j],
      );
    }
    stack.push(i);
  }
  while (stack.length > 0) {
    const j = stack.pop();
    max = Math.max(
      max,
      (stack.length == 0
        ? sums[size - 1]
        : sums[size - 1] - sums[stack[stack.length - 1]]) * arr[j],
    );
  }
  return max;
}
// for test

function generateRandomArray() {
  const arr = new Array(Math.floor(Math.random() * 20 + 10));
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Math.floor(Math.random() * 101);
  }
  return arr;
}

function test() {
  const testTimes = 100000;
  console.log("test begin");
  for (let i = 0; i < testTimes; i++) {
    const arr = generateRandomArray();
    if (max1(arr) !== max2(arr)) {
      console.log(max1(arr));
      console.log(max2(arr));
      break;
    }
  }
  console.log("test finish");
}

test();
