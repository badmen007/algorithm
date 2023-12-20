function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function partition(arr, L, R) {
  if (L > R) {
    return -1;
  }
  if (L == R) {
    return L;
  }
  let lessEqual = L - 1;
  let index = L;

  while (index < R) {
    if (arr[index] <= arr[R]) {
      swap(arr, ++lessEqual, index);
    }
    index++;
  }
  swap(arr, ++lessEqual, R);
  return lessEqual;
}

// 荷兰国旗问题 以arr中最后一个最为划分的值  划分小于区 等于区 大于区
function netherlandsFlag(arr, L, R) {
  if (L > R) {
    return [-1, -1];
  }
  if (L === R) {
    return [L, R];
  }
  let less = L - 1;
  let more = R;
  let index = L;

  while (index < more) {
    if (arr[index] === arr[R]) {
      index++;
    } else if (arr[index] < arr[R]) {
      swap(arr, index++, ++less);
    } else {
      swap(arr, index, --more);
    }
  }
  swap(arr, more, R);
  return [less + 1, more];
}

function quickSort1(arr) {
  if (arr == null || arr.length < 2) {
    return;
  }
  process1(arr, 0, arr.length - 1);
}

function process1(arr, L, R) {
  if (L >= R) {
    return;
  }
  const M = partition(arr, L, R); // M不用放到范围中因为已经有序了
  process1(arr, L, M - 1);
  process1(arr, M + 1, R);
}

function quickSort2(arr) {
  if (arr == null || arr.length < 2) {
    return;
  }
  process2(arr, 0, arr.length - 1);
}

function process2(arr, L, R) {
  // 当equalArea得出的区域L和R是相等的时候 递归调用的时候就会出现L >= R
  // L传到子过程的时候会减 所以会出现相等
  // equalArea作为子过程的时候会加 所以会大于
  if (L >= R) {
    return;
  }
  const equalArea = netherlandsFlag(arr, L, R);
  process2(arr, L, equalArea[0] - 1);
  process2(arr, equalArea[1] + 1, R);
}

function quickSort3(arr) {
  if (arr == null || arr.length < 2) {
    return;
  }
  process3(arr, 0, arr.length - 1);
}

// 随机快排
function process3(arr, L, R) {
  if (L >= R) {
    return;
  }
  // 比2.0版本多了这一行 有什么好处 最好的就是划分的值很靠近中点的位置
  swap(arr, L + Math.floor(Math.random() * (R - L + 1)), R);
  const equalArea = netherlandsFlag(arr, L, R);
  process3(arr, L, equalArea[0] - 1);
  process3(arr, equalArea[1] + 1, R);
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

function copyArray(arr) {
  return arr.slice();
}

function comparator(arr) {
  if (arr.length < 2) {
    return;
  }
  arr.sort((a, b) => a - b);
}

function isEqual(arr1, arr2) {
  if (!arr1 && !arr2) return true;
  if (!arr1 || !arr2 || arr1.length !== arr2.length) return false;
  return arr1.every((item, index) => item === arr2[index]);
}

function test() {
  const testTime = 100000;
  const maxSize = 5;
  const maxValue = 100;
  let succeed = true;
  for (let i = 0; i < testTime; i++) {
    const arr1 = generateRandomArray(maxSize, maxValue);
    const arr2 = copyArray(arr1);
    quickSort3(arr1);
    comparator(arr2);
    if (!isEqual(arr1, arr2)) {
      succeed = false;
      console.log(arr1);
      console.log(arr2);
      break;
    }
  }
  console.log(succeed ? "Nice" : "Fuck");
}

test();
