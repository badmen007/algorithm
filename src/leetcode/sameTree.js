// https://leetcode.com/problems/same-tree
function isSameTree(p, q) {
  // 只有p或者q其中的一个为null的时候这个表达式才能成立
  if ((p == null) ^ (q == null)) {
    return false;
  }
  if (p == null && q == null) {
    return true;
  }
  return (
    p.val == q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
  );
}
