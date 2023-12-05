function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function partition(arr, L, R) {
  let lessR = L - 1;
  let moreL = R;
  let index = L;
  while (index < moreL) {
    if (arr[index] < arr[R]) {
      swap(arr, ++lessR, index++);
    } else if (arr[index] > arr[R]) {
      // 这里index不用++因为 换过去的那个值还没有比较
      swap(arr, --moreL, index);
    } else {
      index++;
    }
  }
  swap(arr, moreL, R);
  return [lessR + 1, moreL]; // moreL是最后一个
}

function process(arr, L, R) {
  if (L >= R) {
    return;
  }
  const [equalStart, equalEnd] = partition(arr, L, R);
  process(arr, L, equalStart - 1);
  process(arr, equalEnd + 1, R);
}

function quickSort(arr) {
  if (arr == null || arr.length < 2) {
    return;
  }
  process(arr, 0, arr.length - 1);
}

// 非递归的方式
function quickSort1(arr) {
  if (arr == null || arr.length < 2) {
    return;
  }

  const stack = [];
  stack.push(new Job(0, arr.length - 1));

  while (stack.length > 0) {
    const cur = stack.pop();
    const equalArea = partition(arr, cur.L, cur.R);

    if (equalArea[0] > cur.L) { // 表示有小于区域
      stack.push(new Job(cur.L, equalArea[0] - 1));
    }

    if(equalArea[1] < cur.R) { // 表示有大于区域
      stack.push(new Job(equalArea[1] + 1, cur.R))
    }
  }
}

class Job {
  constructor(left, right) {
    this.L = left;
    this.R = right;
  }
}

// Example usage:
const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
quickSort1(arr);
console.log(arr);
