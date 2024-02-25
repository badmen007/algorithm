// 压缩数组的方法 每次以一行为基础
// 当以第一行的为基础，加上第二行的值 第二行如果是0 就是0 否则加1 以此类推
// 压缩完成之后就转换成求直方图的最大长方形面积
// https://leetcode.com/problems/maximal-rectangle/
function maxImalRectangle(map) {
  if (map == null || map.length == 0 || map[0].length == 0) {
    return 0;
  }
  let maxArea = 0;
  let height = new Array(map[0].length).fill(0);
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      height[j] = map[i][j] == "0" ? 0 : height[j] + 1;
    }
    maxArea = Math.max(maxRecFromButton(height), maxArea);
  }
  return maxArea;
}

function maxRecFromButton(height) {
  if (height == null || height.length == 0) {
    return 0;
  }
  let maxArea = 0;
  const stack = [];

  for (let i = 0; i < height.length; i++) {
    while (stack.length > 0 && height[stack[stack.length - 1]] > height[i]) {
      const j = stack.pop();
      const k = stack.length == 0 ? -1 : stack[stack.length - 1];
      const curArea = (i - 1 - k) * height[j];
      maxArea = Math.max(maxArea, curArea);
    }
    stack.push(i);
  }
  while (stack.length > 0) {
    const j = stack.pop();
    const k = stack.length == 0 ? -1 : stack[stack.length - 1];
    const curArea = (height.length - 1 - k) * height[j];
    maxArea = Math.max(maxArea, curArea);
  }
  return maxArea;
}
