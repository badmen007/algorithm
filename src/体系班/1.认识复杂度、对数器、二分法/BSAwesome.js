// 局部最小值问题 一个数左右两边的数都比自己大

function getLessIndex(arr) {
  if (!arr || arr.length === 0) {
    return -1;
  }
  if (arr.length === 1 || arr[0] < arr[1]) {
    return 0;
  }
  if (arr[arr.length - 1] < arr[arr.length - 2]) {
    return arr.length - 1;
  }
  // 下面的情况
  let left = 1;
  let right = arr.length - 2;
  let mid = 0;

  while (left < right) {
    // 这个while循环是两个值的情况
    mid = left + ((right - left) >> 1);
    if (arr[mid] > arr[mid - 1]) {
      right = mid - 1;
    } else if (arr[mid] > arr[mid + 1]) {
      left = mid + 1;
    } else {
      return mid;
    }
  }

  return left;
}

// for test
function isRight(arr, index) {
  if (arr.length <= 1) {
    return true;
  }
  if (index === 0) {
    return arr[index] < arr[index + 1];
  }
  if (index === arr.length - 1) {
    return arr[index] < arr[index - 1];
  }
  return arr[index] < arr[index - 1] && arr[index] < arr[index + 1];
}

// 生成的数组左右不相等
function generateRandomArray(maxSize, maxValue) {
  const arr = new Array(Math.floor(Math.random() * maxSize) + 1);
  arr[0] =
    Math.floor(Math.random() * maxValue) - Math.floor(Math.random() * maxValue);
  for (let i = 1; i < arr.length; i++) {
    do {
      arr[i] =
        Math.floor(Math.random() * maxValue) -
        Math.floor(Math.random() * maxValue);
    } while (arr[i] === arr[i - 1]);
  }
  return arr;
}

function main() {
  const testTime = 500000;
  const maxSize = 5;
  const maxValue = 100;
  let succeed = true;

  for (let i = 0; i < testTime; i++) {
    const arr = generateRandomArray(maxSize, maxValue);
    const ans = getLessIndex(arr);
    if (!isRight(arr, ans)) {
      succeed = false;
      break;
    }
  }
  console.log(succeed ? "Nice!" : "Fucking fucked");
}
