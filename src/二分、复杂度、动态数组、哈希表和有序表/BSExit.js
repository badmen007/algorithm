// 有序数组中找到num 用的是二分法
// arr是有序的
function find(arr, num) {
  // 表示不含有
  if (arr == null || arr.length == 0) {
			return false;
		}
		let L = 0;
		let R = arr.length - 1;
		while (L <= R) {
			let mid = Math.floor((L + R) / 2); // 注意这里的这个要向下取整
			if (arr[mid] == num) {
				return true;
			} else if (arr[mid] < num) {
				L = mid + 1;
			} else {
				R = mid - 1;
			}
		}
		return false;
}

// 对数器

function generateRandomArray(maxSize, maxValue) {
  const len = Math.floor(Math.random() * (maxSize + 1));
  const ans = new Array(len);
  for (let i = 0; i < ans.length; i++) {
    ans[i] =
      Math.floor(Math.random() * (maxValue + 1)) -
      Math.floor(Math.random() * maxValue);
  }
  return ans;
}

function test(sortedArr, num) {
  for(let i = 0; i < sortedArr.length; i++) {
    if (sortedArr[i] ===  num) {
      return true
    }
  }
  return false
}

function main() {
  const testTime = 100000;
  const maxSize = 10;
  const maxValue = 100;

  for (let i = 0; i < testTime; i++) {
    const arr = generateRandomArray(maxSize, maxValue);
    arr.sort((a, b) => a - b);
    // console.log(arr)
    // 这里为什么要这样写?
    const value = Math.floor(Math.random() * (maxValue + 1)) - Math.floor(Math.random() * maxValue)
    if (test(arr, value) !== find(arr, value)) {
      console.log(arr)
      console.log(test(arr, value), value);
      console.log(find(arr, value), value);
      console.log('出错了')
      break
    }
  }
}
main()

