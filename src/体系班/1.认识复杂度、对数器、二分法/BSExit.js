// 有序 数组  看看是否有指定的数

function exit(sortedArr, num) {
  if (!sortedArr || sortedArr.length === 0) { // 边界值判断
    return false;
  }
  let L = 0;
  let R = sortedArr.length - 1;
  let mid = 0;

  while (L < R) {
    mid = L + ((R - L) >> 1);
    if (sortedArr[mid] === num) {
      return true;
    } else if (sortedArr[mid] > num) {
      R = mid - 1;
    } else {
      L = mid + 1;
    }
  }
  return sortedArr[L] === num;
}

// for test
function test(sortedArr, num) {
  return sortedArr.includes(num);
}

function generateRandomArray(maxSize, maxValue) {
  const arr = new Array(Math.floor((maxSize + 1) * Math.random()));
  for (let i = 0; i < arr.length; i++) {
    arr[i] =
      Math.floor((maxValue + 1) * Math.random()) -
      Math.floor(maxValue * Math.random());
  }
  return arr;
}

function printArray(arr) {
  console.log(arr.join(' '))
}

function main() {
  const testTime = 50000;
  const maxSize = 10;
  const maxValue = 100;
  let succeed = true;

  for (let i = 0; i < testTime; i++) {
    const arr = generateRandomArray(maxSize, maxValue);
    const sortedArr = [...arr].sort((a, b) => a - b);
    const value =
      Math.floor((maxValue + 1) * Math.random()) -
      Math.floor(maxValue * Math.random());
    if (test(sortedArr, value) !== exit(sortedArr, value)) {
      succeed = false;
      console.log(sortedArr, value)
      break;
    }
  }
  console.log(succeed ? "Nice!" : "Fucking fucked!");
}

main();
