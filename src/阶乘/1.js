
// 阶乘 
function getFactorial(n) {
    if (n === 1) return n;
    let res = 0;
    for(let i = 1; i <= n; i++) {
        res += factorial(i)
    }
    return res
}

function factorial(n) {
    let res = 1
    for(let i = 1; i <= n; i++) {
        res *= i
    }
    return res
}

console.log(getFactorial(5))

function getFactorial2(n) {
    if (n === 1) return n;
    let res = 1;
    let total = 0;
    for(let i = 1; i <= n; i++) {
        res *= i
        total += res
    }
    return total
}
console.log(getFactorial2(5))