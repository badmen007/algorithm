function smallSum(arr) {
  if (arr == null || arr.length < 2) {
    return 0;
  }
  return process(arr, 0, arr.length - 1);
}

function process(arr, L, R) {
  if (L === R) {
    return 0; // 说明这个时候只有一个数
  }
  const mid = L + ((R - L) >> 1);
  return (
    process(arr, L, mid) + process(arr, mid + 1, R) + merge(arr, L, mid, R)
  );
}

function merge(arr, L, mid, R) {
  const help = new Array(R - L + 1);
  let i = 0;
  let p1 = L;
  let p2 = mid + 1;
  let ans = 0;

  while (p1 <= mid && p2 <= R) {
    ans += arr[p1] < arr[p2] ? (R - p2 + 1) * arr[p1] : 0;
    help[i++] = arr[p1] < arr[p2] ? arr[p1++] : arr[p2++];
  }

  while (p1 <= mid) {
    help[i++] = arr[p1++];
  }

  while (p2 <= R) {
    help[i++] = arr[p2++];
  }

  for (let i = 0; i < help.length; i++) {
    arr[L + i] = help[i];
  }

  return ans;
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
  if (arr == null || arr.length < 2) {
    return 0;
  }
  let ans = 0;
  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      ans += arr[j] < arr[i] ? arr[j] : 0;
    }
  }
  return ans;
}

function test() {
  const testTime = 500000;
  const maxValue = 100;
  const maxSize = 5;
  let succeed = true;
  for (let i = 0; i < testTime; i++) {
    const arr1 = generateRandomArray(maxSize, maxValue);
    const arr2 = copyArr(arr1);
    if (smallSum(arr1) !== comparator(arr2)) {
      console.log(arr1);
      console.log(arr2);
      succeed = false;
      break;
    }
  }
  console.log(succeed ? "Nice" : "Fuck");
}

test();
