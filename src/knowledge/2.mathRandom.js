

// Math.random() 返回一个0-1之间的随机数 [0, 1) 0 <= x < 1
// const ans = Math.random()

const testTime = 1000000
let count = 0
for(let i = 0; i < testTime; i++) {
  if(Math.random() < 0.6) {
    count++
  }
}
// console.log(count / testTime) // 证明这个是等概率的 

//-----------------------------------

// const res = Math.floor(Math.random() * 10) // [0, 10) 0 <= x < 10  [0, 9]

const arr = new Array(9).fill(0)
for( let i = 0; i < testTime; i++) { 
  const res = Math.floor(Math.random() * 9) // [0, 9) 0 <= x < 9  [0, 8]
  arr[res]++
}
console.log(arr) // 证明这个是等概率的


// 任意x, x属于[0, 1), [0, x) 范围上出现的概率由原来的x变成了x^2 -- 为什么
// 因为Math.max() 是这两个数的最大值，证明这两个数都小于x，所以x^2
function xToPower2() {
  return Math.max(Math.random(), Math.random())
}

function xToPower3() {
  return Math.max(Math.random(), Math.max(Math.random(), Math.random()))
}
