// 连续结构  数组
// 适合寻址

// 跳转结构 链表 二叉树 图

// 或者是连续结构+跳转结构的结合

//-------------------------------
// 数组便于寻址，不便于插入和删除

// 链表不便于寻址，便于插入和删除

//-------------------------------

// const arr = [3, 4, 2, 1, 6, 7, 8]

// sum(arr, L, R) 找到L到R的和 -> 两种设计方式

// 二维数组 

function RangeSum1(arr, L, R) {
  let sum = 0
  for(let i = L; i <= R; i++) {
    sum += arr[i]
  }
  return sum
}



// 一维数组

function RangeSum2(arr, L, R) {
  const N = arr.length;
  const preSum = new Array(N).fill(0);
  preSum[0] = arr[0];
  for (let i = 1; i < N; i++) {
    preSum[i] = preSum[i - 1] + arr[i];
  }
  return L === 0 ? preSum[R] : preSum[R] - preSum[L - 1];
}
console.log(RangeSum2([3, 4, 2, 1, 6, 7, 8], 1, 3));
