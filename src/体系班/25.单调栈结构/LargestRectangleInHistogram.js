// 测试链接：https://leetcode.com/problems/largest-rectangle-in-histogram
function largestRectangleArea(heights) {
  if (heights == null || heights.length == 0) {
    return 0;
  }
  let maxArea = 0;
  const stack = [];

  for (let i = 0; i < heights.length; i++) {
    while (stack.length > 0 && heights[stack[stack.length - 1]] >= heights[i]) {
      const j = stack.pop();
      const k = stack.length == 0 ? -1 : stack[stack.length - 1];
      const curArea = (i - 1 - k) * heights[j];
      maxArea = Math.max(maxArea, curArea);
    }
    stack.push(i);
  }
  while (stack.length > 0) {
    const j = stack.pop();
    const k = stack.length == 0 ? -1 : stack[stack.length - 1];
    const curArea = (heights.length - 1 - k) * heights[j];
    maxArea = Math.max(maxArea, curArea);
  }
  return maxArea;
}
