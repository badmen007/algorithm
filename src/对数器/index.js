// java中的int是向下取整

//选择排序
function selectSort(arr) {
  if (arr === null || arr.length < 2) return
  const N = arr.length;
  for(let i = 0; i < N; i++) {
    let minValueIndex = i
    for(let j = i + 1; j < N; j++) {
      minValueIndex = arr[minValueIndex] > arr[j] ? j : minValueIndex
    }
    swap(arr, i, minValueIndex);
  }
}

function insertSort(arr) {
  if (arr === null || arr.length < 2) return;
  const  N = arr.length;
  for(let end = 1; end < N; end++) {
    for(let pre = end - 1; pre >= 0 && arr[pre] > arr[pre + 1]; pre--) { // 这里注意要有等号
      swap(arr, pre, pre + 1)
    }
  }
}

function swap(arr, i, j) {
  const temp = arr[j];
  arr[i] = arr[j];
  arr[j] = temp;
}


//--------------------------------对数器-----

function lenRandomValueRandom(maxLen, maxValue) {
  // 长度随机 大小随机
  const len = Math.floor(Math.random() * maxLen)
  const ans = new Array(len)
  for(let i = 0; i < ans.length; i++) {
    ans[i] = Math.floor(Math.random() * maxValue)
  }
  return ans
}

function copyArray(arr) {
  const ans = new Array(arr.length)
  for (let i = 0; i < arr.length; i++) {
    ans[i] = arr[i]
  }
  return ans
}

function isSorted(arr) {
  if (arr.length < 2) {
    return true
  }
  let max = arr[0]
  for(let i = 1; i < arr.length; i++) {
    if (max > arr[i]) {
      return false
    }
    max = Math.max(max, arr[i])
  }
  return true
}


function main() {
  const maxLen = 100
  const maxValue = 1000
  const testTime = 10000
  for(let i = 0; i < testTime; i++) {
    const arr1 = lenRandomValueRandom(maxLen, maxValue)
    const tmp = copyArray(arr1)
    insertSort(arr1);
    if (!isSorted(arr1)) {
      for(let i = 0; i < tmp.length; i++) {
        console.log(tmp[i])
      }
      console.log('选择排序错了')
    }
  }
}

main()
