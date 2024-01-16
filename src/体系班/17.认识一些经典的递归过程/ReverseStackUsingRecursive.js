
// // 完全是递归 
function reverse(stack) {
  if (stack.length == 0) {
    return
  }
  let i = f(stack)
  reverse(stack)
  stack.push(i)
}


// 这个递归就是弹出栈中最底下的那个元素
function f(stack) {
  const result = stack.pop()
  if (stack.length == 0) {
    return result
  } else {
    const last = f(stack)
    stack.push(result)
    return last
  }
}



function test() {
  const arr = [1, 2, 3, 4, 5]
  reverse(arr)
  console.log(arr)
}
test()