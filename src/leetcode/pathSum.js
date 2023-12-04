// https://leetcode.com/problems/path-sum/

// 从头节点开始找到一条路径上的数字之和等于目标数字

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

let isSum = false;

var hasPathSum = function (root, targetSum) {
  if (root == null) {
    return false;
  }
  // 防止在某些情况下 这个值被改成了true影响递归
  isSum = false;
  process(root, 0, targetSum);
  return isSum;
};

function process(x, preSum, sum) {
  // 主要是这个条件
  if (x.left == null && x.right == null) {
    if (x.val + preSum == sum) {
      isSum = true;
    }
    return;
  }
  preSum = x.val + preSum;
  if (x.left !== null) {
    process(x.left, preSum, sum);
  }
  if (x.right !== null) {
    process(x.right, preSum, sum);
  }
}

// 方法二
var hasPathSum = function (root, targetSum) {
  if (!root) return false;

  if (root.val === targetSum && !root.left && !root.right) return true;

  return (
    hasPathSum(root.left, targetSum - root.val) ||
    hasPathSum(root.right, targetSum - root.val)
  );
};

// Example usage:
// Assuming you have a tree like:
//      5
//     / \
//    4   8
//   /   / \
//  11  13  4
// /  \      \
// 7   2      1
const rootNode = new TreeNode(5);
rootNode.left = new TreeNode(4);
rootNode.right = new TreeNode(8);
rootNode.left.left = new TreeNode(11);
rootNode.left.left.left = new TreeNode(7);
rootNode.left.left.right = new TreeNode(2);
rootNode.right.left = new TreeNode(13);
rootNode.right.right = new TreeNode(4);
rootNode.right.right.right = new TreeNode(1);

const result = hasPathSum(rootNode, 22);
console.log(result); // Output: true
