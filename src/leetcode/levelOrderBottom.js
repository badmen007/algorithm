// https://leetcode.com/problems/binary-tree-level-order-traversal-ii/description/

const levelOrderBottom = (root) => {
  const levels = [];
  if (!root) return levels;
  const queue = [root];

  while (queue.length) {
    const level = [];
    const queueLength = queue.length;

    for (let i = 0; i < queueLength; i++) {
      const currentNode = queue.shift();
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
      level.push(currentNode.val);
    }
    levels.push(level)
  }
  return levels.reverse();
};

// 思路

// 1.准备一个队列把root放进去
// 2.准备一个最终返回的数组
// 3.队列依此弹出，并把节点的左边和右边放到队列中每一层的个数由queue的size决定，
// ⚠️ 这里的虽然队列的长度在不断的变化，但是在循环前就将队列的长度记住了且用const定义了,所以是不会变的

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

function levelOrderBottom(root) {
  const ans = []
  if (!root) return ans;

  const queue = []
  queue.push(root)

  while(queue.length) {
    const size = queue.length;
    const curAns = []

    for(let i = 0; i < size; i++) {
      const curNode=  queue.shift()
      curAns.push(curNode.val)

      if (curNode.left) {
        queue.push(curNode.left)
      }

      if (curNode.right) {
        queue.push(curNode.right)
      }
    }
    
    ans.unshift(curAns)
  }
  return ans
}

// Example usage:
// Assuming you have a tree like:
//      3
//     / \
//    9  20
//      /  \
//     15   7

const rootNode = new TreeNode(3)
rootNode.left = new TreeNode(9)
rootNode.right = new TreeNode(20)
rootNode.right.left = new TreeNode(15)
rootNode.right.right = new TreeNode(7)

console.log(levelOrderBottom(rootNode));