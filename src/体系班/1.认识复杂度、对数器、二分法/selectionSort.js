// 选择排序
function selectionSort(arr) {
  if (arr == null || arr.length < 2) {
    return;
  }
  for (let i = 0; i < arr.length - 1; i++) {
    let minValueIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      minValueIndex = arr[minValueIndex] < arr[j] ? minValueIndex : j;
    }
    swap(arr, i, minValueIndex);
  }
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
const arr = [2, 1, 5, 4, 6, 3];
selectionSort(arr);
console.log(arr);

// 从第一个开始，定义一个索引 这个索引用来记录那个第一轮循环最小值的位置
// 找到一个最小值和第一个数交换 后面依次类推

// 在0位置，从1位置开始找 找到那个最小的 和0位置交换
// 在1位置，从2位置开始找 找到小的，和1换位置