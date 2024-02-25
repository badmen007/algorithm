// 单调栈

// 不重复的情况
// 流程：
// 首先准备一个栈 这个栈的顺序是由小到大的 当进入的数字比栈顶的数字要小的话
// 要弹出栈顶的值，并且要记录左边比他小的值和右边比他小的值，否则直接放入
// 当数组循环完了 栈中还有值的话 那么依次弹出(此时栈顶元素右边比它小的值没有用-1记录)

function getNearLessNoRepeat(arr) {
  const res = new Array(arr.length).fill(0).map(() => new Array(2));
  const stack = [];
  for (let i = 0; i < arr.length; i++) {
    while (stack.length > 0 && arr[stack[stack.length - 1]] > arr[i]) {
      const j = stack.pop();
      const leftLessIndex = stack.length > 0 ? stack[stack.length - 1] : -1;
      res[j][0] = leftLessIndex;
      res[j][1] = i;
    }
    stack.push(i);
  }
  while (stack.length > 0) {
    const j = stack.pop();
    const leftLessIndex = stack.length > 0 ? stack[stack.length - 1] : -1;
    res[j][0] = leftLessIndex;
    res[j][1] = -1;
  }
  return res;
}

// 数组中的值有重复的

function getNearLess(arr) {
  const res = new Array(arr.length).fill(0).map(() => new Array(2));
  const stack = [];

  for (let i = 0; i < arr.length; i++) {
    while (stack.length > 0 && arr[stack[stack.length - 1][0]] > arr[i]) {
      const popIs = stack.pop();
      const leftLessIndex =
        stack.length == 0
          ? -1
          : stack[stack.length - 1][stack[stack.length - 1].length - 1];
      for (const popi of popIs) {
        res[popi][1] = i;
        res[popi][0] = leftLessIndex;
      }
    }
    if (stack.length > 0 && arr[i] === arr[stack[stack.length - 1][0]]) {
      stack[stack.length - 1].push(i);
    } else {
      stack.push([i]);
    }
  }
  while (stack.length > 0) {
    const popIs = stack.pop();
    const leftLessindex =
      stack.length === 0
        ? -1
        : stack[stack.length - 1][stack[stack.length - 1].length - 1];
    for (const popi of popIs) {
      res[popi][1] = -1;
      res[popi][0] = leftLessindex;
    }
  }
  return res;
}

// for test

function getRandomArrayNoRepeat(size) {
  const arr = new Array(Math.floor(Math.random() * size + 1));
  for (let i = 0; i < arr.length; i++) {
    arr[i] = i;
  }
  for (let i = 0; i < arr.length; i++) {
    const swapIndex = Math.floor(Math.random() * arr.length);
    const temp = arr[swapIndex];
    arr[swapIndex] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

function getRandomArray(size, max) {
  const arr = new Array(Math.floor(Math.random() * size + 1));
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Math.floor(Math.random() * max) + Math.floor(Math.random() * max);
  }
  return arr;
}

function rightWay(arr) {
  const res = new Array(arr.length).fill(0).map(() => new Array(2));
  for (let i = 0; i < arr.length; i++) {
    let leftLessIndex = -1;
    let rightLessIndex = -1;
    let cur = i - 1;
    while (cur >= 0) {
      if (arr[cur] < arr[i]) {
        leftLessIndex = cur;
        break;
      }
      cur--;
    }
    cur = i + 1;
    while (cur < arr.length) {
      if (arr[cur] < arr[i]) {
        rightLessIndex = cur;
        break;
      }
      cur++;
    }
    res[i][0] = leftLessIndex;
    res[i][1] = rightLessIndex;
  }
  return res;
}

function isEqual(res1, res2) {
  if (res1.length !== res2.length) {
    return false;
  }
  for (let i = 0; i < res1.length; i++) {
    if (res1[i][0] !== res2[i][0] || res1[i][1] !== res2[i][1]) {
      return false;
    }
  }
  return true;
}

function test() {
  const size = 10;
  const max = 20;
  const testTime = 100000;
  console.log("test begin");
  for (let i = 0; i < testTime; i++) {
    const arr1 = getRandomArrayNoRepeat(size);
    const arr2 = getRandomArray(size, max);
    if (!isEqual(getNearLessNoRepeat(arr1), rightWay(arr1))) {
      console.log(getNearLessNoRepeat(arr1));
      console.log(rightWay(arr1));
      console.log(arr1.join(","), "noRepeat");
      break;
    }
    if (!isEqual(getNearLess(arr2), rightWay(arr2))) {
      console.log(arr2.join(","), "repeat");
      console.log(getNearLess(arr2));
      console.log(rightWay(arr2));
      break;
    }
  }
  console.log("test End");
}
test();
