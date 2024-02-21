function right(arr, w) {
  if (arr == null || w < 1 || arr.length < w) {
    return null;
  }
  const N = arr.length;
  const res = new Array(N - w + 1);
  let index = 0;
  let L = 0;
  let R = w - 1;
  while (R < N) {
    let max = arr[L];
    for (let i = L + 1; i <= R; i++) {
      max = Math.max(max, arr[i]);
    }
    res[index++] = max;
    L++;
    R++;
  }
  return res;
}

// 会收集到N - w + 1个数字
// N 代表的是总数 w代表的是窗口的大小
function getMaxWindow(arr, w) {
  if (arr == null || w < 1 || arr.length < w) {
    return null;
  }
  const qmax = [];
  const res = new Array(arr.length - w + 1);
  let index = 0;
  for (let R = 0; R < arr.length; R++) {
    while (qmax.length > 0 && arr[qmax[qmax.length - 1]] <= arr[R]) {
      qmax.pop();
    }
    qmax.push(R);

    // 其实可以这么理解 就是每一次都有一个下标要过期
    // 当这个下标是在这个双端队列中的话 就弹出
    if (qmax[0] == R - w) {
      qmax.shift();
    }

    // R < w - 1说明这个时候窗口还没有形成
    if (R >= w - 1) {
      res[index++] = arr[qmax[0]];
    }
  }
  return res;
}
// for test
function generateRandomArray(maxSize, maxValue) {
  const arr = new Array(Math.floor((maxSize + 1) * Math.random()));
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Math.floor(Math.random() * (maxValue + 1));
  }
  return arr;
}

function isEqual(arr1, arr2) {
  if ((arr1 == null && arr2 != null) || (arr1 !== null && arr2 == null)) {
    return false;
  }
  if (arr1 == null || arr2 == null) {
    return true;
  }
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

function test() {
  const testTime = 100000;
  const maxSize = 100;
  const maxValue = 100;
  console.log("test begin");
  for (let i = 0; i < testTime; i++) {
    const arr = generateRandomArray(maxSize, maxValue);
    const w = Math.floor(Math.random() * (arr.length + 1));
    const ans1 = getMaxWindow(arr, w);
    const ans2 = right(arr, w);
    if (!isEqual(ans1, ans2)) {
      console.log(ans1);
      console.log(ans2);
      break;
    }
  }
  console.log("test end");
}
test();
