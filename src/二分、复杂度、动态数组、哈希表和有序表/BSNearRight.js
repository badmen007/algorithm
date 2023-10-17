
// 有序数组中找到<=num的最右位置

// arr 有序
function mostRightLessNumIndex(arr, num) {
  if (arr == null || arr.length == 0) {
    return -1;
  }
  let L = 0;
  let R = arr.length - 1;
  let ans = -1;
  while(L <= R) {
    const mid = Math.floor((L + R) / 2)
    if (arr[mid] <= num) { // 最右边的位置 那就是不停的向右边找
      ans = mid;
      L = mid + 1
    } else {
      R = mid - 1
    }
  }
  return ans
}

//---------------对数器-----------------

function generateRandomArray(maxSize, maxValue) {
  const len = (maxSize + 1) * Math.random()
  const ans = new Array(len);
  for(let i = 0; i < ans.length; i++) {
    ans[i] = Math.floor((maxValue + 1) * Math.random()) - Math.floor(maxValue * Math.random())
  }
  return ans
}

function test(arr, value) {
  for(let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] <= value) {
      return i
    } 
  }
  return -1
}

function main() {
  const testTime = 1000000;
  const maxSize = 10;
  const maxValue = 100;

  for(let i = 0; i < testTime; i++) {
    const arr = generateRandomArray(maxSize, maxValue)
    arr.sort((a, b) => a - b)
    const value = Math.floor((maxValue + 1) * Math.random()) - Math.floor(maxValue * Math.random())
    if (test(arr, value) !== mostRightLessNumIndex(arr, value)) {
      console.log(arr)
      console.log(test(arr, value), value);
      console.log(mostRightLessNumIndex(arr, value), value);
      break
    }
  }
}