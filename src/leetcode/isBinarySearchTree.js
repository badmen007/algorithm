// 测试链接
// https://leetcode.cn/problems/validate-binary-search-tree/
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class Info {
  constructor(isBST, max, min) {
    this.isBST = isBST;
    this.max = max;
    this.min = min;
  }
}

function process(x) {
  if (x === null) {
    return null;
  }

  const leftInfo = process(x.left);
  const rightInfo = process(x.right);

  let max = x.val;
  let min = x.val;

  if (leftInfo !== null) {
    max = Math.max(leftInfo.max, max);
    min = Math.min(leftInfo.min, min);
  }

  if (rightInfo !== null) {
    max = Math.max(rightInfo.max, max);
    min = Math.min(rightInfo.min, min);
  }

  let isBST = true;

  if (leftInfo !== null && !leftInfo.isBST) {
    isBST = false;
  }

  if (rightInfo !== null && !rightInfo.isBST) {
    isBST = false;
  }

  const leftMaxLessX = leftInfo === null ? true : leftInfo.max < x.val;
  const rightMinMoreX = rightInfo === null ? true : rightInfo.min > x.val;

  if (!(leftMaxLessX && rightMinMoreX)) {
    isBST = false;
  }

  return new Info(isBST, max, min);
}

// Example usage:
// Assuming you have a tree like:
//      2
//     / \
//    1   3
const rootNode = new TreeNode(2);
rootNode.left = new TreeNode(1);
rootNode.right = new TreeNode(3);
debugger
const result = process(rootNode).isBST;
console.log(result);

// 把自己的值作为最大最小值的起点 然后每一轮递归都去更新最大和最小值