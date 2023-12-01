// 树的最大深度
// https://leetcode.com/problems/maximum-depth-of-binary-tree

function maxDepth(root) {
  if (root == null) {
    return 0
  } 
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
}