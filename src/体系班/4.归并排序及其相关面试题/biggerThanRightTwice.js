function biggerThanRightTwice(arr) {
  if (arr == null || arr.length < 2) {
    return 0;
  }
  return process(arr, 0, arr.length - 1);
}

function process(arr, L, R) {
  if (L == R) {
    return 0;
  }
  const mid = L + ((R - L) >> 1);
  return (
    process(arr, L, mid) + process(arr, mid + 1, R) + merge(arr, L, mid, R)
  );
}

function merge(arr, L, M, R) {
  let ans = 0;
  let windowR = M + 1;
  for (let i = L; i <= M; i++) {
    while (windowR <= R && arr[i] > arr[windowR] * 2) {
      windowR++;
    }
    // 走到后面了都是有序的 所以这里可以这么写 最小的就是两个数
    ans += windowR - M - 1;
  }

  const help = new Array(R - L + 1);
  let i = 0;
  let p1 = L;
  let p2 = M + 1;

  while (p1 <= M && p2 <= R) {
    help[i++] = arr[p1] < arr[p2] ? arr[p1++] : arr[p2++];
  }

  while (p1 <= M) {
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
  const arr = new Array(Math.floor(Math.random() * maxSize));
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
  let ans = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j] << 1) {
        ans++;
      }
    }
  }
  return ans;
}

function test() {
  const testTime = 100000;
  const maxSize = 100;
  const maxValue = 100;
  let succeed = true;
  for (let i = 0; i < testTime; i++) {
    const arr1 = generateRandomArray(maxSize, maxValue);
    const arr2 = copyArr(arr1);
    if (biggerThanRightTwice(arr1) !== comparator(arr2)) {
      succeed = false;
      console.log(arr1, biggerThanRightTwice(arr1));
      console.log(arr2, comparator(arr2));
      break;
    }
  }
  console.log(succeed ? "Nice" : "Fuck");
}

test();
