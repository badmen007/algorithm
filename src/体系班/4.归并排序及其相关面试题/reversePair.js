// 什么是逆序对？
// 3, 2, 1 => (3,1) (3, 2) (3, 1) (2,1)就是逆序对

function reversePairNumber(arr) {
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
  const help = new Array(R - L + 1);
  let i = help.length - 1;
  let p1 = M;
  let p2 = R;
  let ans = 0;

  while (p1 >= L && p2 > M) {
    // 这里的p2-M 就说明了个数 因为是排好序的 所以可以这么算
    ans += arr[p1] > arr[p2] ? p2 - M : 0;
    help[i--] = arr[p1] > arr[p2] ? arr[p1--] : arr[p2--];
  }

  while (p1 >= L) {
    help[i--] = arr[p1--];
  }

  while (p2 > M) {
    help[i--] = arr[p2--];
  }

  for (i = 0; i < help.length; i++) {
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
  let ans = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        ans++;
      }
    }
  }
  return ans;
}

function test() {
  const testTime = 100000;
  const maxValue = 100;
  const maxSize = 4;
  let succeed = true;
  for (let i = 0; i < testTime; i++) {
    const arr1 = generateRandomArray(maxSize, maxValue);
    const arr2 = copyArr(arr1);
    if (reversePairNumber(arr1) !== comparator(arr2)) {
      succeed = false;
      break;
    }
  }
  console.log(succeed ? "Nice" : "Fuck");
}

test();
