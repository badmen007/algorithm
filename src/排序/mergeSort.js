function mergeSort(arr) {
  if (arr == null || arr.length < 2) {
    return;
  }
  process(arr, 0, arr.length - 1);
}

function process(arr, L, R) {
  if (L == R) {
    return;
  }
  // const mid = L + ((R - L) >> 1);
  const mid = L + Math.floor((R - L) / 2);
  process(arr, L, mid);
  process(arr, mid + 1, R);
  merge(arr, L, mid, R);
}

//-------非递归实现

function mergeSort1(arr) {
  if (arr === null || arr.length < 2) {
    return;
  }

  let step = 1;
  const N = arr.length;

  while (step < N) {
    let L = 0;

    while (L < N) {
      let M = 0;
      // 最后一组凑不足step不用merge: N - 1 - （L+step-1) > 0
      // L + step - 1可能会溢出
      if (N - L >= step) {
        M = L + step - 1;
      } else {
        M = N - 1;
      }

      if (M === N - 1) {
        break;
      }

      let R = 0;
      // 右边的第一个数是 M + 1 ， (N - 1) - (M + 1) + 1
      if (N - 1 - M >= step) {
        R = M + step;
      } else {
        R = N - 1;
      }

      merge(arr, L, M, R);

      if (R === N - 1) {
        break;
      } else {
        L = R + 1;
      }
    }

    if (step > Math.floor(N / 2)) {
      break;
    }

    step *= 2;
  }
}

function merge(arr, L, M, R) {
  const ans = new Array(R - L + 1);

  let i = 0;
  let p1 = L;
  let p2 = M + 1;

  while (p1 <= M && p2 <= R) {
    ans[i++] = arr[p1] <= arr[p2] ? arr[p1++] : arr[p2++];
  }

  while (p1 <= M) {
    ans[i++] = arr[p1++];
  }

  while (p2 <= R) {
    ans[i++] = arr[p2++];
  }

  for (let i = 0; i < ans.length; i++) {
    // 这里为什么从L开始的
    arr[L + i] = ans[i];
  }
}

// Example usage:
const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
mergeSort(arr);
console.log(arr); // Output: [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]
