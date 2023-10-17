// arr 整体无序 相邻不等 类似抛物线
// 1. 如果数组的长度只有1的话，直接返回0位置
// 2. 如果0位置的数小于1位置的数，那么0位置就是局部最小
// 3. 如果倒数第二个数大于倒数第一个数的话，那么倒数第一个数就是局部最小
// 4. 其他情况
//    4.1、如果中间位置的数小于左边，也小于右边那么中间位置的数就是局部最小
//    4.2、剩下的有三种情况 
      // 1. 左边 > mid, mid > 右边
      // 2. 左边 < mid, mid > 右边
      // 3. 左边 < mid, mid < 右边
//  如果只有两个数比较的话，直接返回小的那个数就行
//  L < R - 1 保证的是在三个数的前提下
function oneMinIndex(arr) {
  if (arr == null || arr.length === 0) {
    return -1;
  }
  const N = arr.length;
  if (N === 1) {
    return 0;
  }
  if (arr[0] < arr[1]) {
    return 0;
  }
  if (arr[N - 1] < arr[N - 2]) {
    return N - 1;
  }

  let L = 0;
  let R = N - 1;
  while (L < R - 1) {
    //  L < R - 1 这个边界条件是有三个数的情况下
    const mid = Math.floor((L + R) / 2);
    // mid的值比两边都要小, 直接返回局部最小
    if (arr[mid] < arr[mid - 1] && arr[mid] < arr[mid + 1]) {
      return mid;
    } else {
      // 1. 左边 > mid, mid > 右边
      // 2. 左边 < mid, mid > 右边
      // 3. 左边 < mid, mid < 右边
      if (arr[mid] > arr[mid - 1]) {
        R = mid - 1;
      } else {
        L = mid + 1;
      }
    }
  }
  // 到最后可能是2个数，那就世界返回小的那一个就行了
  return arr[L] < arr[R] ? L : R;
}

//-----------------------------------对数器----------------------------------

// 随机生成一个相邻位置不想等的数组
function randomArray(maxLen, maxValue) {
  const len = Math.floor(maxLen * Math.random());
  const ans = new Array(len);
  if (len > 0) {
    ans[0] = Math.floor(maxValue * Math.random());
    for (let i = 1; i < len; i++) {
      do {
        ans[i] = Math.floor(Math.random() * maxValue);
      } while (ans[i] === ans[i - 1]);
    }
  }
  return ans;
}

// 检测中间的数是不是比两边的都小
function check(arr, minIndex) {
  if (arr.length == 0) {
    return minIndex === -1;
  }
  const left = minIndex - 1;
  const right = minIndex + 1;
  const leftBigger = left >= 0 ? arr[left] > arr[minIndex] : true;
  const rightBigger = right < arr.length ? arr[right] > arr[minIndex] : true
  return leftBigger && rightBigger
}

function main() {
  const testTime = 10000000;
  const maxValue = 20;
  const maxLen = 10;

  for(let i = 0; i < testTime; i++) {
    const arr = randomArray(maxLen, maxValue)
    const ans = oneMinIndex(arr)
    if (!check(arr, ans)) {
      console.log(arr)
      break
    }
  }
}
main()