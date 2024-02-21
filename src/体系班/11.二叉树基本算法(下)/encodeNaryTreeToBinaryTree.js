
// 儿子都放在左树的右边界上

// Definition for a Node.
function Node(val, children) {
  this.val = val;
  this.children = children;
}

// Definition for a binary tree node.
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

function encode(root) {
  if (!root) {
    return null;
  }

  let head = new TreeNode(root.val);
  head.left = en(root.children);

  return head;
}
// 深度优先
function en(children) {
  let head = null;
  let cur = null;

  for (let child of children) {
    let tNode = new TreeNode(child.val);
    if (!head) {
      head = tNode;
    } else {
      cur.right = tNode;
    }
    cur = tNode;
    cur.left = en(child.children);
  }

  return head;
}

function decode(root) {
  if (!root) {
    return null;
  }

  return new Node(root.val, de(root.left));
}

function de(root) {
  let children = [];

  while (root) {
    let cur = new Node(root.val, de(root.left));
    children.push(cur);
    root = root.right;
  }

  return children;
}
