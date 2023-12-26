// 只适用于非负的数
// 就是准备0-9个队列或者是栈
// 首先 按照各位的数字 依次入桶(就是上面准备的队列)
// 0-9的桶，按照大小依次倒出 后面每一位都一样的操作 ，最后就有序了
// 下面这个就是把上面的桶做了优化

function radixSort(arr) {
  if (arr == null || arr.length < 2) {
    return;
  }
  radixSortHelper(arr, 0, arr.length - 1, maxBits(arr));
}

function radixSortHelper(arr, L, R, digit) {
  const radix = 10;
  let i = 0,
    j = 0;
  const help = new Array(R - L + 1);
  for (let d = 1; d <= digit; d++) {
    // 相当于那10个桶
    const count = new Array(radix).fill(0);
    // 放到桶中去了
    for (i = L; i <= R; i++) {
      j = getDigit(arr[i], d);
      count[j]++;
    }
    // 创建一个个数和的数组
    for (i = 1; i < radix; i++) {
      count[i] = count[i] + count[i - 1];
    }
    // 从右往左循环
    for (i = R; i >= L; i--) {
      j = getDigit(arr[i], d);
      help[count[j] - 1] = arr[i];
      count[j]--;
    }
    for (i = L, j = 0; i <= R; i++, j++) {
      arr[i] = help[j];
    }
  }
}

function maxBits(arr) {
  let max = Number.MIN_VALUE;
  for (let i = 0; i < arr.length; i++) {
    max = Math.max(max, arr[i]);
  }
  let res = 0;
  while (max !== 0) {
    res++;
    max = Math.floor(max / 10);
  }
  return res;
}

function getDigit(x, d) {
  return Math.floor((x / Math.pow(10, d - 1)) % 10);
}

// for test
function generateRandomArray(maxSize, maxValue) {
  const arr = new Array(Math.floor(Math.random() * (maxSize + 1)));
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Math.floor(Math.random() * (maxValue + 1));
  }
  return arr;
}

function copyArr(arr) {
  return arr.slice(0);
}

function comparator(arr) {
  arr.sort((a, b) => a - b);
}

function isEqual(arr1, arr2) {
  if (!arr1 && !arr2) return true;
  if (!arr1 || !arr2 || arr1.length !== arr2.length) return false;
  return arr1.every((item, index) => item == arr2[index]);
}

function test() {
  const testTime = 50000;
  const maxSize = 100;
  const maxValue = 150;
  let success = true;
  for (let i = 0; i < testTime; i++) {
    const arr1 = generateRandomArray(maxSize, maxValue);
    const arr2 = copyArr(arr1);
    radixSort(arr1);
    comparator(arr2);
    if (!isEqual(arr1, arr2)) {
      success = false;
      console.log(arr1);
      console.log(arr2);
      break;
    }
  }
  console.log(success ? "Nice" : "Fuck");
}
test();
