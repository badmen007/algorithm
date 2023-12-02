//  测试链接：https://leetcode.com/problems/balanced-binary-tree

// 左右树的高度小于等于1

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class Info {
  constructor(isBalanced, height) {
    this.isBalanced = isBalanced;
    this.height = height;
  }
}

function isBalanced(root) {
  return process(root).isBalanced;
}

function process(root) {
  if (root === null) {
    return new Info(true, 0);
  }

  const leftInfo = process(root.left);

  const rightInfo = process(root.right);

  const height = Math.max(leftInfo.height, rightInfo.height) + 1;

  const isBalanced =
    leftInfo.isBalanced &&
    rightInfo.isBalanced &&
    Math.abs(leftInfo.height - rightInfo.height) < 2;

  return new Info(isBalanced, height);
}

// Example usage:
// Assuming you have a tree like:
//      3
//     / \
//    9  20
//      /  \
//     15   7
const rootNode = new TreeNode(3);
rootNode.left = new TreeNode(9);
rootNode.right = new TreeNode(20);
rootNode.right.left = new TreeNode(15);
rootNode.right.right = new TreeNode(7);
debugger
const result = isBalanced(rootNode);
console.log(result);
