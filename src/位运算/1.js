// 计算机存储的是32位的二进制数
// 一个数左移 就是所有的位置左移 后面用0来补充
// 一个数左移一位 就是 * 2
// 0-30位 最高位31位表示的是符号位 0表示正数 1表示负数  -2^31 ~ 2^31-1 之间的数
// 无符号的数是0-2^32-1之间的数
// 负数就是 符号位 后面 31位取反 + 1 -> 就是最末尾加1
// 取反就是0变1 1变0

function print(num) {
    let res = ''
    for (let i = 31; i >= 0; i--) {
        res += (num & (1 << i)) == 0 ? '0' : '1'
    }
    console.log(res)
}

const num = 1234
print(num >> 1) // 带符号右移 用符号位补充
print(num >>> 1) // 无符号右移 用0补充

const a = 1234
const b = 3455
print(a)
print(b)
console.log('-------------')
print(a & b) // 与运算 两个都是1 结果才是1
print(a | b) // 或运算 两个都是0 结果才是0
print(a ^ b) // 异或运算 两个相同为0 不同为1

const c = 5
let d = -c
d = ~c + 1 // 表示一个数的相反数 负数最小值取反+1还是最小值 
console.log(c)
console.log(d)
