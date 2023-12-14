let a = 16;
let b = 603;

a = a ^ b;
b = a ^ b;
a = a ^ b;

console.log(a, b);
// 前提 a 和 b 不能是同一个
// 自己异或自己是0 0异或任何数是其本身