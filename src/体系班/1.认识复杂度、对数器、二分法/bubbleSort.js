function bubbleSort(arr) {
  if (arr == null || arr.length < 2) {
    return;
  }
  for (let end = arr.length - 1; end > 0; end--) {
    for (let i = 1; i <= end; i++) {
      if (arr[i] < arr[i - 1]) {
        swap(arr, i - 1, i);
      }
    }
  }
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// 冒泡排序每次都放一个到最后面 这个值是最大的值
// 从1位置开始向前，比较前一个
// 注意 i <= end 因为等于也可以

// for test

function generateRandomArray(maxSize, maxValue) {
  const arr = new Array(Math.floor((maxSize + 1) * Math.random()));
  for (let i = 0; i < arr.length; i++) {
    arr[i] =
      Math.floor((maxValue + 1) * Math.random()) -
      Math.floor(maxValue * Math.random());
  }
  return arr;
}

function copyArray(arr) {
  return arr.slice();
}

function comparator(arr) {
  return arr.sort((a, b) => a - b);
}

function isEqual(arr1, arr2) {
  if (!arr1 && !arr2) return true;
  if (!arr1 || !arr2 || arr1.length !== arr2.length) return false;
  return arr1.every((value, index) => value === arr2[index]);
}

function printArray(arr) {
  console.log(arr.join(" "));
}

function main() {
  const testTime = 500000;
  const maxSize = 100;
  const maxValue = 100;
  let succeed = true;
  for (let i = 0; i < testTime; i++) {
    const arr1 = generateRandomArray(maxSize, maxValue);
    const arr2 = copyArray(arr1);
    bubbleSort(arr1);
    comparator(arr2);
    if (!isEqual(arr1, arr2)) {
      console.log("Random test failed:");
      succeed = false;
      printArray(arr);
      printArray(arr1);
      printArray(arr2);
      break;
    }
  }
  console.log(succeed ? "Nice!" : "Fucking fucked!");
}
main();
