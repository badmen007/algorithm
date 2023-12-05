// ^ 无进位相加
// a + b 等于 a ^ b + 进位

// a = 46  b = 20
// 46的二进制 32 + 14(8 + 4 + 2) ->   0101110
// 20的二进制 16 + 4             ->   0010100

// ^  0110110
//    1110111
//    1000001  相加

// 获取进位信息
// &  0110110
//    1110111
//    0110110 然后再左移一位 <<1
//    1101100

// a + b 等于 无进位相加 再加上进位信息

// 什么时候进位信息没了 就得到结果了

// 两个数相加 这个就是计算机底层实现的加法
function add(a, b) {
  let sum = a;
  while (b != 0) {
    sum = a ^ b; // 无进位相加
    b = (a & b) << 1; // 进位信息
    a = sum;
  }
  return sum;
}

// 取反
function negNum(n) {
  return add(~n, 1);
}

// 减法
function minus(a, b) {
  return add(a, negNum(b));
}
//  a 0110
//  b 0111

// 从右边开始 如果是1 就将a抄下来末尾补上0
// ans = 0110 + 01100 + 011000
// 乘法
function multi(a, b) {
  let res = 0;
  while (b != 0) {
    if ((b & 1) != 0) {
      res = add(res, a);
    }
    a <<= 1; // a左移一位 就是在末尾补0
    b >>>= 1; // b不带符号右移一位
  }
  return res;
}

function isNeg(n) {
  return n < 0;
}

// 除法
function div(a, b) {
  let x = isNeg(a) ? negNum(a) : a;
  let y = isNeg(b) ? negNum(b) : b;
  let res = 0;
  for(let i = 30; i >=0; i = minus(i, 1)) {
    if ((x >> i) >= y) {
      res |= (1 << i)
      x = minus(x, y << i)
    }
  }
  return isNeg(a) ^ isNeg(b) ? negNum(res) : res
}

console.log(div(4,2))

