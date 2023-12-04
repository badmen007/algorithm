// https://leetcode.com/problems/path-sum-ii/

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

function pathSum(root, sum) {
  const ans = [];
  if (root === null) {
    return ans;
  }

  const path = [];
  process(root, path, 0, sum, ans);

  return ans;
}

function process(x, path, preSum, sum, ans) {
  if (x.left === null && x.right === null) {
    if (preSum + x.val === sum) {
      path.push(x.val);
      ans.push([...path]);
      path.pop();
    }
    return;
  }

  path.push(x.val);
  // path需要pop但是preSum为什么不用减呢？
  // 因为这里是按值传递的
  preSum += x.val; 

  if (x.left !== null) {
    process(x.left, path, preSum, sum, ans);
  }

  if (x.right !== null) {
    process(x.right, path, preSum, sum, ans);
  }
  // 这个pop很重要
  path.pop();
}

// Example usage:
// Assuming you have a tree like:
//      5
//     / \
//    4   8
//   /   / \
//  11  13  4
// /  \    / \
// 7   2  5   1
const rootNode = new TreeNode(5);
rootNode.left = new TreeNode(4);
rootNode.right = new TreeNode(8);
rootNode.left.left = new TreeNode(11);
rootNode.left.left.left = new TreeNode(7);
rootNode.left.left.right = new TreeNode(2);
rootNode.right.left = new TreeNode(13);
rootNode.right.right = new TreeNode(4);
rootNode.right.right.left = new TreeNode(5);
rootNode.right.right.right = new TreeNode(1);

const result = pathSum(rootNode, 22);
console.log(result);
