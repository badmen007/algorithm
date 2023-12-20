function mergeSort(arr) {
  if (arr == null || arr.length < 2) {
    return;
  }
  process(arr, 0, arr.length - 1);
}

function process(arr, L, R) {
  if (L === R) {
    return;
  }
  const m = L + ((R - L) >> 1);
  process(arr, L, m);
  process(arr, m + 1, R);
  merge(arr, L, m, R);
}

// 非递归方法实现
function mergeSort1(arr) {
  if (arr == null || arr.length < 2) {
    return;
  }
  const N = arr.length;
  // 每一步的长度
  let mergeSize = 1;
  while (mergeSize < N) {
    let L = 0;
    while (L < N) {
      if (mergeSize >= N - L) { // 相当于是一半都凑不齐了
        break;
      }
      let M = L + mergeSize - 1;
      let R = M + Math.min(mergeSize, N - (M + 1));
      merge(arr, L, M, R);
      L = R + 1;
    }
    // 防止溢出
    if (mergeSize > N / 2) {
      break;
    }
    mergeSize <<= 1;
  }
}

function merge(arr, L, mid, R) {
  const help = new Array(R - L + 1);
  let i = 0;
  let p1 = L;
  let p2 = mid + 1;
  while (p1 <= mid && p2 <= R) {
    help[i++] = arr[p1] <= arr[p2] ? arr[p1++] : arr[p2++];
  }
  while (p1 <= mid) {
    // p2越界了
    help[i++] = arr[p1++];
  }
  while (p2 <= R) {
    help[i++] = arr[p2++];
  }
  for (let i = 0; i < help.length; i++) {
    arr[L + i] = help[i];
  }
}

// for test
function generateRandomArray(maxSize, maxValue) {
  const arr = new Array(Math.floor(Math.random() * maxSize)).fill(0);
  for (let i = 0; i < arr.length; i++) {
    arr[i] =
      Math.floor(Math.random() * (maxValue + 1)) -
      Math.floor(Math.random() * maxValue);
  }
  return arr;
}

function copyArr(arr) {
  return arr.slice();
}

function comparator(arr) {
  arr.sort((a, b) => a - b);
}

function isEqual(arr1, arr2) {
  if (!arr1 && !arr2) return true;
  if (!arr1 || !arr2 || arr1.length !== arr2.length) return false;
  return arr1.every((value, index) => value === arr2[index]);
}

function test() {
  const maxSize = 10;
  const maxValue = 100;
  const testTime = 100000;
  console.log("begin");
  for (let i = 0; i < testTime; i++) {
    const arr1 = generateRandomArray(maxSize, maxValue);
    const arr2 = copyArr(arr1);
    mergeSort1(arr1);
    comparator(arr2);
    if (!isEqual(arr1, arr2)) {
      console.log(arr1, "arr1");
      console.log(arr2, "arr2");
      break;
    }
  }
  console.log("end");
}

test();
