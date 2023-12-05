
function insertSort(arr) { // 就是前面的数是有序的， 后面的数插入到前面的数中
  if (arr === null || arr.length < 2) return;
  const N = arr.length
  for (let end = 1; end < N; end++) {
    let newNumIndex = end
    while(newNumIndex - 1 >= 0 && arr[newNumIndex - 1] > arr[newNumIndex]) {
      swap(arr, newNumIndex - 1, newNumIndex)
      newNumIndex--
    }
  }
}

function insertSort1(arr) {
  if (arr === null || arr.length < 2) return;
  const N = arr.length
  for (let end = 1; end < N; end++) {
    for (let pre = end - 1; pre >= 0 && arr[pre] > arr[pre + 1]; pre--) {
      swap(arr, pre, pre + 1)
    }
  }
}

function swap(arr, i, j) {
  const temp = arr[j];
  arr[i] = arr[j];
  arr[j] = temp;
}

const arr = [8, 1, 3, 5, 1, 6, 8, 1, 3, 5, 7];
console.log(arr);
insertSort1(arr);
console.log(arr);

// 插入排序就是 从一个位置 往前看，遇到比自己小的就就交换，前面都是有序的 因为从1位置和0位置开始比的，所以前面一定是有序的
