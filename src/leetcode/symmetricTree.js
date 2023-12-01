// 镜面树
// https://leetcode.com/problems/symmetric-tree

function isSymmetric(root) {
  return isMirror(root, root);
}

function isMirror(h1, h2) {
  if ((h1 == null) ^ (h2 == null)) {
    return false;
  }
  if (h1 == null && h2 == null) {
    return true;
  }

  return (
    h1.val == h2.val &&
    isMirror(h1.left, h2.right) &&
    isMirror(h1.right, h2.left)
  );
}
