function getMax(arr) {
  return process(arr, 0, arr.length - 1);
}

function process(arr, L, R) {
  if (L === R) {
    return arr[L];
  }
  let mid = L + ((R - L) >> 1);
  const leftMax = process(arr, L, mid);
  const rightMax = process(arr, mid + 1, R);
  return Math.max(leftMax, rightMax);
}
