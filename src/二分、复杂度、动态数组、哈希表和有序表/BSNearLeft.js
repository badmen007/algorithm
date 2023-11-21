// 有序数组中找到>=num的最左的位置

// arr是有序的
function mostLeftNoLessNumIndex(arr, num) {
  debugger;
  if (arr === null || arr.length == 0) {
    return -1;
  }
  let L = 0;
  let R = arr.length - 1;
  let ans = -1;
  while (L <= R) {
    const mid = Math.floor((L + R) / 2);
    if (arr[mid] >= num) { // 就是满足条件不停的往左边去找
      ans = mid;
      R = mid - 1;
    } else {
      L = mid + 1;
    }
  }
  return ans;
}

// -------------对数器------------------------

function generateRandomArray(maxSize, maxValue) {
  const len = Math.floor((maxSize + 1) * Math.random());
  const arr = new Array(len);
  for (let i = 0; i < arr.length; i++) {
    arr[i] =
      Math.floor((maxValue + 1) * Math.random()) -
      Math.floor(maxValue * Math.random());
  }
  return arr;
}

function test(arr, num) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= num) {
      return i;
    }
  }
  return -1;
}

function main() {
  const testTime = 1000000;
  const maxSize = 10;
  const maxValue = 100;

  for (let i = 0; i < testTime; i++) {
    const arr = generateRandomArray(maxSize, maxValue);
    arr.sort((a, b) => a - b);
    const value =
      Math.floor((maxValue + 1) * Math.random()) -
      Math.floor(maxValue * Math.random());
    if (test(arr, value) !== mostLeftNoLessNumIndex(arr, value)) {
      console.log(arr);
      console.log(test(arr, value), value);
      console.log(mostLeftNoLessNumIndex(arr, value), value);
      console.log("出错了");
      break;
    }
  }
}

main();