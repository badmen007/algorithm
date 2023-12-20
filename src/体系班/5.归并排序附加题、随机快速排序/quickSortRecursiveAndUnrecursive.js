function netherlandsFlag(arr, L, R) {
  let less = L - 1;
  let more = R;
  let index = L;
  while (index < more) {
    if (arr[index] == arr[R]) {
      index++;
    } else if (arr[index] < arr[R]) {
      swap(arr, index++, ++less);
    } else {
      swap(arr, index, --more); // 当大于的时候index不能加加
    }
  }
  swap(arr, more, R);
  return [less + 1, more];
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function quickSort1(arr) {
  if (arr == null || arr.length < 2) {
    return;
  }
  process(arr, 0, arr.length - 1);
}

function process(arr, L, R) {
  // 当L== R的时候说明就是1个元素 就return
  // 当L > R 就是可能这个equalArea区域都等于R 那再执行equal[1] + 1就越界了 就return
  if (L >= R) {
    return;
  }
  swap(arr, L + Math.floor(Math.random() * (R - L + 1)), R);
  const equalArea = netherlandsFlag(arr, L, R);
  process(arr, L, equalArea[0] - 1);
  process(arr, equalArea[1] + 1, R);
}

// 2.0版本 用栈实现 stack
class Op {
  constructor(left, right) {
    this.l = left;
    this.r = right;
  }
}

function quickSort2(arr) {
  if (arr == null || arr.length < 2) {
    return;
  }
  const N = arr.length;
  swap(arr, Math.floor(Math.random() * N), N - 1);
  const equalArea = netherlandsFlag(arr, 0, N - 1);
  let el = equalArea[0];
  let er = equalArea[1];
  const stack = [new Op(0, el - 1), new Op(er + 1, N - 1)];

  while (stack.length > 0) {
    const op = stack.pop();
    if (op.l < op.r) {
      swap(arr, op.l + Math.floor(Math.random() * (op.r - op.l + 1)), op.r);
      const equalArea = netherlandsFlag(arr, op.l, op.r);
      const el = equalArea[0];
      const er = equalArea[1];
      stack.push(new Op(op.l, el));
      stack.push(new Op(er + 1, op.r));
    }
  }
}

// 3.0用队列实现 queue
function quickSort3(arr) {
  if (arr == null || arr.length < 2) {
    return;
  }
  const N = arr.length;
  swap(arr, Math.floor(Math.random() * N), N - 1);
  const equalArea = netherlandsFlag(arr, 0, N - 1);
  let el = equalArea[0];
  let er = equalArea[1];
  const queue = [new Op(0, el - 1), new Op(er + 1, N - 1)];

  while (queue.length > 0) {
    const op = queue.shift();
    if (op.l < op.r) {
      swap(arr, op.l + Math.floor(Math.random() * (op.r - op.l + 1)), op.r);
      const equalArea = netherlandsFlag(arr, op.l, op.r);
      const el = equalArea[0];
      const er = equalArea[1];
      queue.push(new Op(op.l, el));
      queue.push(new Op(er + 1, op.r));
    }
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
  const maxSize = 100;
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
