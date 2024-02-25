// 测试链接：https://leetcode.com/problems/count-submatrices-with-all-ones
// 这个范围的数量是 n * (n + 1) / 2
function numSubmat(mat) {
  if (mat == null || mat.length == 0 || mat[0].length == 0) {
    return 0;
  }
  let nums = 0;
  const height = new Array(mat[0].length).fill(0);
  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[0].length; j++) {
      height[j] = mat[i][j] == 0 ? -1 : height[j] + 1;
    }
    nums += countFromButton(height);
  }
  return nums;
}
// 比如
//              1
//              1
//              1         1
//    1         1         1
//    1         1         1
//    1         1         1
//
//    2  ....   6   ....  9
// 如上图，假设在6位置，1的高度为6
// 在6位置的左边，离6位置最近、且小于高度6的位置是2，2位置的高度是3
// 在6位置的右边，离6位置最近、且小于高度6的位置是9，9位置的高度是4
// 此时我们求什么？
// 1) 求在3~8范围上，必须以高度6作为高的矩形，有几个？
// 2) 求在3~8范围上，必须以高度5作为高的矩形，有几个？
// 也就是说，<=4的高度，一律不求
// 那么，1) 求必须以位置6的高度6作为高的矩形，有几个？
// 3..3  3..4  3..5  3..6  3..7  3..8
// 4..4  4..5  4..6  4..7  4..8
// 5..5  5..6  5..7  5..8
// 6..6  6..7  6..8
// 7..7  7..8// 比如
//              1
//              1
//              1         1
//    1         1         1
//    1         1         1
//    1         1         1
//
//    2  ....   6   ....  9
// 如上图，假设在6位置，1的高度为6
// 在6位置的左边，离6位置最近、且小于高度6的位置是2，2位置的高度是3
// 在6位置的右边，离6位置最近、且小于高度6的位置是9，9位置的高度是4
// 此时我们求什么？
// 1) 求在3~8范围上，必须以高度6作为高的矩形，有几个？
// 2) 求在3~8范围上，必须以高度5作为高的矩形，有几个？
// 也就是说，<=4的高度，一律不求
// 那么，1) 求必须以位置6的高度6作为高的矩形，有几个？
// 3..3  3..4  3..5  3..6  3..7  3..8
// 4..4  4..5  4..6  4..7  4..8
// 5..5  5..6  5..7  5..8
// 6..6  6..7  6..8
// 7..7  7..8
// 8..8
// 这么多！= 21 = (9 - 2 - 1) * (9 - 2) / 2
// 这就是任何一个数字从栈里弹出的时候，计算矩形数量的方式
// 8..8
// 这么多！= 21 = (9 - 2 - 1) * (9 - 2) / 2
// 这就是任何一个数字从栈里弹出的时候，计算矩形数量的方式
function countFromButton(height) {
  if (height == null || height.length == 0) {
    return 0;
  }
  let nums = 0;
  const stack = [];
  for (let i = 0; i < height.length; i++) {
    while (stack.length > 0 && height[stack[stack.length - 1]] >= height[i]) {
      const cur = stack.pop();
      if (height[cur] > height[i]) {
        const left = stack.length == 0 ? -1 : stack[stack.length - 1];
        const n = i - 1 - left;
        const dowm = Math.max(left == -1 ? 0 : height[left], height[i]);
        nums += (height[cur] - dowm) * num(n);
      }
    }
    stack.push(i);
  }
  while (stack.length > 0) {
    const cur = stack.pop();
    const left = stack.length == 0 ? -1 : stack[stack.length - 1];
    const n = height.length - 1 - left;
    const down = left == -1 ? 0 : height[left];
    nums += (height[cur] - down) * num(n);
  }
  return nums;
}

function num(n) {
  return (n * (n + 1)) >> 1;
}
