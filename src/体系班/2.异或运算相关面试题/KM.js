// 输入一定能保证 数组中有一种数出现了M次，只有一种数出现了K次
// 1 <= K < M
// 返回这种数

function test(arr, k, m) {
  const map = new Map();
  for (const num of arr) {
    if (map.has(num)) {
      map.set(num, map.get(num) + 1);
    } else {
      map.set(num, 1);
    }
  }
  for (const num of map.keys()) {
    if (map.get(num) === k) {
      return num;
    }
  }
  return -1;
}

function onlyKTimes(arr, k, m) {
  const t = new Array(32).fill(0);

  for (const num of arr) {
    for (let i = 0; i <= 31; i++) {
      t[i] += (num >> i) & 1;
    }
  }

  let ans = 0;
  for (let i = 0; i < 32; i++) {
    if (t[i] % m !== 0) {
      // 证明这一位是出现k次的数;
      ans |= 1 << i;
    }
  }
  return ans;
}

// const map = new Map();

// function onlyKTimes(arr, k, m) {
//   if (map.size === 0) {
//     mapCreater(map);
//   }
//   let t = new Array(32).fill(0);
//   for (let num of arr) {
//     while (num !== 0) {
//       const rightOne = num & -num;
//       t[map.get(rightOne)]++;
//       num ^= rightOne;
//     }
//   }

//   let ans = 0;
//   for (let i = 0; i < 32; i++) {
//     if (t[i] % m !== 0) {
//       ans |= 1 << i;
//     }
//   }
//   return ans;
// }

// function mapCreater(map) {
//   let value = 1;
//   for (let i = 0; i < 32; i++) {
//     map.set(value, i);
//     注意这里 <<=  就相当于多了赋值的逻辑 value = value << 1
//     value <<= 1;
//   }
// }

// Example usage:
// let arr = [4, 3, 1, 3, 3, 1, 1, 4];
// let k = 2;
// let m = 3;
// console.log(onlyKTimes(arr, k, m));

function randomNumber(range) {
  return (
    Math.floor(Math.random() * (range + 1)) -
    Math.floor(Math.random() * (range + 1))
  );
}

function randomArray(maxKinds, range, k, m) {
  const kTimeNum = randomNumber(range);
  // 起码是两种以上
  let numKinds = Math.floor(Math.random() * maxKinds) + 2;
  const times = k;
  // 数组长度就是 k + (maxKinds - 1) * m
  const arr = new Array(times + (numKinds - 1) * m);
  let index = 0;

  for (; index < times; index++) {
    arr[index] = kTimeNum;
  }

  numKinds--;

  const set = new Set();
  set.add(kTimeNum);

  while (numKinds !== 0) {
    let curNum = 0;
    do {
      curNum = randomNumber(range);
    } while (set.has(curNum));

    numKinds--;
    set.add(curNum);

    for (let i = 0; i < m; i++) {
      arr[index++] = curNum;
    }
  }
  for (let i = 0; i < arr.length; i++) {
    const j = Math.floor(Math.random() * arr.length);
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

function main() {
  const kinds = 3;
  const range = 5;
  const testTime = 100000;
  const max = 9;
  console.log("开始");
  for (let i = 0; i < testTime; i++) {
    const a = Math.floor(Math.random() * max) + 1;
    const b = Math.floor(Math.random() * max) + 1;
    const k = Math.min(a, b);
    let m = Math.max(a, b);
    if (k === m) {
      m++;
    }
    const arr = randomArray(kinds, range, k, m);
    const arr1 = test(arr, k, m);
    const arr2 = onlyKTimes(arr, k, m);
    if (arr1 !== arr2) {
      console.log(arr1, arr2);
      console.log("出错了");
    }
  }
  console.log("结束");
}
main();
