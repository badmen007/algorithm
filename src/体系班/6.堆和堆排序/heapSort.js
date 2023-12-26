// 1.先把数组heapify变成大根堆
// 2.交换第一个和最后一个数，heapSize-- 最大的数就放到了数组的最后一个
// 3.循环 就行
function heapSort(arr) {
  if (arr == null || arr.length < 2) {
    return;
  }
  // 对于数组排序来说heapify的复杂度比heapInsert要低
  for (let i = arr.length - 1; i >= 0; i--) {
    heapify(arr, i, arr.length);
  }
  let heapSize = arr.length;
  swap(arr, 0, --heapSize);
  while (heapSize > 0) {
    heapify(arr, 0, heapSize);
    swap(arr, 0, --heapSize);
  }
}

function heapInsert(arr, index) {
  while (arr[index] > arr[Math.floor((index - 1) / 2)]) {
    swap(arr, index, Math.floor((index - 1) / 2));
    index = Math.floor((index - 1) / 2);
  }
}

function heapify(arr, index, heapSize) {
  let left = index * 2 + 1;

  while (left < heapSize) {
    let largest =
      left + 1 < heapSize && arr[left + 1] > arr[left] ? left + 1 : left;

    largest = arr[largest] > arr[index] ? largest : index;

    if (largest === index) {
      break;
    }

    swap(arr, largest, index);

    index = largest;

    left = index * 2 + 1;
  }
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

//for test below

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
  return arr.sort((a, b) => a - b);
}

function isEqual(arr1, arr2) {
  if (!arr1 && !arr2) return true;
  if (!arr1 || !arr2 || arr1.length !== arr2.length) return false;
  return arr1.every((item, index) => item == arr2[index]);
}

function test() {
  const maxSize = 100;
  const maxValue = 100;
  const testTime = 100000;
  let succeed = true;
  for (let i = 0; i < testTime; i++) {
    const arr1 = generateRandomArray(maxSize, maxValue);
    const arr2 = copyArr(arr1);
    heapSort(arr1);
    comparator(arr2);
    if (!isEqual(arr1, arr2)) {
      console.log(arr1, arr2);
      succeed = false;
      break;
    }
  }
  console.log(succeed ? "Nice" : "Fuck");
}

test();
