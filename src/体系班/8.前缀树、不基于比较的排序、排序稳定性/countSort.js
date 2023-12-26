// 这个整体思路就是
// 1. 找到这个数组中最大的数
// 2. 创建一个以这个最大的数为最后一个数的数组 长度要加1
// 3. 循环老的数组，对应创建新数组中 每个数的个数 加加
// 4. 循环新的数组，看每个数出现多少次，赋值到原数组 就行
function countSort(arr) {
  if (arr == null || arr.length < 2) {
    return;
  }
  // 最小安全整数
  let max = Number.MIN_SAFE_INTEGER;
  // 找到那个最大的
  for (let i = 0; i < arr.length; i++) {
    max = Math.max(max, arr[i]);
  }

  const bucket = new Array(max + 1).fill(0);

  for (let i = 0; i < arr.length; i++) {
    bucket[arr[i]]++;
  }

  let i = 0;
  for (let j = 0; j < bucket.length; j++) {
    while (bucket[j]-- > 0) {
      arr[i++] = j;
    }
  }
}

// for test

function generateRandomArray(maxSize, maxValue) {
  const arr = new Array(Math.floor(Math.random() * (maxSize + 1)));
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Math.floor(Math.random() * (maxValue + 1));
  }
  return arr;
}

function copyArr(arr) {
  return arr.slice(0);
}

function comparator(arr) {
  arr.sort((a, b) => a - b);
}

function isEqual(arr1, arr2) {
  if (!arr1 && !arr2) return true;
  if (!arr1 || !arr2 || arr1.length !== arr2.length) return false;
  return arr1.every((item, index) => item == arr2[index]);
}

function test() {
  const testTime = 50000;
  const maxSize = 100;
  const maxValue = 150;
  let success = true;
  for (let i = 0; i < testTime; i++) {
    const arr1 = generateRandomArray(maxSize, maxValue);
    const arr2 = copyArr(arr1);
    countSort(arr1);
    comparator(arr2);
    if (!isEqual(arr1, arr2)) {
      success = false;
      console.log(arr1);
      console.log(arr2);
      break;
    }
  }
  console.log(success ? "Nice" : "Fuck");
}
test();
