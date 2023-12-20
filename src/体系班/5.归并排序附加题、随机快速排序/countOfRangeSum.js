// 这道题直接在leetcode测评：
// https://leetcode.com/problems/count-of-range-sum/

function countRangeSum(nums, lower, upper) {
  if (nums == null || nums.length === 0) {
    return 0;
  }
  const sum = new Array(nums.length);
  sum[0] = nums[0];
  for (let i = 1; i < nums.length; i++) {
    sum[i] = nums[i] + sum[i - 1];
  }
  return process(sum, 0, sum.length - 1, lower, upper);
}

function process(sum, L, R, lower, upper) {
  // 找到的是原始数组中在这个范围内 0-L
  if (L == R) {
    return sum[L] >= lower && sum[L] <= upper ? 1 : 0;
  }
  // 范围上不止一个数
  const M = L + ((R - L) >> 1);
  return (
    process(sum, L, M, lower, upper) +
    process(sum, M + 1, R, lower, upper) +
    merge(sum, L, M, R, lower, upper)
  );
}

function merge(sum, L, M, R, lower, upper) {
  let ans = 0;
  let windowL = L;
  let windowR = L;

  for (let i = M + 1; i <= R; i++) {
    const max = sum[i] - lower;
    const min = sum[i] - upper;
    // 这个的写法就是包含左闭右开
    while (windowR <= M && sum[windowR] <= max) {
      windowR++;
    }

    while (windowL <= M && sum[windowL] < min) {
      windowL++;
    }

    ans += windowR - windowL;
  }

  const help = new Array(R - L + 1);
  let i = 0;
  let p1 = L;
  let p2 = M + 1;

  while (p1 <= M && p2 <= R) {
    help[i++] = sum[p1] <= sum[p2] ? sum[p1++] : sum[p2++];
  }

  while (p1 <= M) {
    help[i++] = sum[p1++];
  }

  while (p2 <= R) {
    help[i++] = sum[p2++];
  }

  for (let i = 0; i < help.length; i++) {
    sum[L + i] = help[i];
  }

  return ans;
}

// 1.先算出前缀和
// 2.转换过程 
