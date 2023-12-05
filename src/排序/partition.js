function splitNum(arr) {
  let lessEqualR = -1;
  let index = 0;
  const N = arr.length;

  while (index < N) {
    if (arr[index] <= arr[N - 1]) {
      swap(arr, ++lessEqualR, index++);
    } else {
      index++;
    }
  }
}

function splitNum1(arr) {
  const N = arr.length;
  let lessR = -1;
  let moreL = N - 1;
  let index = 0;

  while (index < moreL) {
    if (arr[index] < arr[N - 1]) {
      swap(arr, ++lessR, index++)
    } else if (arr[index] > arr[N - 1]) {
      swap(arr, --moreL, index++)
    } else {
      index++
    }
  }
  swap(arr, moreL, N - 1)
}


function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// Example usage:
const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
splitNum(arr);
console.log(arr); // Output: [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]
