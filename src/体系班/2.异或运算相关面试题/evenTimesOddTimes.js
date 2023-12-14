// 1. 在arr中只有一种数出现了奇数次
// 因为异或就是无进位相加 出现偶数次的异或在一起那就是0 所以剩下了奇数次的
function printOddTimesNum1(arr) {
  let eor = 0;
  // for(let i = 0; i < arr.length; i++) {
  //   eor ^= arr[i]
  // }
  for (const item of arr) {
    eor ^= item;
  }
  console.log(eor);
}
const arr1 = [3, 3, 2, 3, 1, 1, 1, 3, 1, 1, 1];
printOddTimesNum1(arr1);

// 2. 在arr中，有两种数，出现了奇数次
function printOddTimesNum2(arr) {
  let eor = 0;
  for (let i = 0; i < arr.length; i++) {
    eor ^= arr[i];
  }
  // a ^ b 的结果 eor 两个数异或不等于0 那么其中有一位是1
  //        00101
  //取反     11010
  //取反+1   11011
  //&原来的值 00001 这就找到最右边的那个1的值了
  let rightOne = eor & -eor; //拿到那一位是1 其余的位置都是0

  let onlyOne = 0;
  for (let i = 0; i < arr.length; i++) {
    if ((arr[i] & rightOne) !== 0) {
      // 说明那一位是1 两个都是1才是1 因为这一位是1的个数是偶数个 最后就得到了这个这个奇数
      onlyOne ^= arr[i];
    }
  }
  console.log(onlyOne, eor ^ onlyOne);
}
const arr2 = [4, 2, 4, 5, 2, 3, 3, 1];
printOddTimesNum2(arr2);


// 数1的个数
function bit1counts(N) {
  let count = 0;

  while (N != 0) {
    const rightOne = N & (~N + 1);
    count++;
    N ^= rightOne;
  }
  return count
}
// 001101
console.log(bit1counts(13))

// 总的来说 异或 两个场景使用
// 1. 消除1
// 2. 找到奇数
