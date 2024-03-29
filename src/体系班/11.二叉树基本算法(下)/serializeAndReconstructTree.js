import { printTree } from "./printBinaryTree.js";

/**
 * 二叉树可以通过先序、后序 或者是按层遍历的方式序列化和反序列化
 * 但是不能通过中序遍历的方式来实现序列化和反序列化
 *         __2
 *        /
 *       1
 *       和
 *       1__
 *          \
 *           2
 * 补足空位置的中序遍历结果都是{ null, 1, null, 2, null}
 */
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function preSerial(head) {
  const ans = [];
  pres(head, ans);
  return ans;
}

function pres(head, ans) {
  if (head === null) {
    ans.push(null);
  } else {
    ans.push(String(head.value));
    pres(head.left, ans);
    pres(head.right, ans);
  }
}

function inSerial(head) {
  const ans = [];
  ins(head, ans);
  return ans;
}

function ins(head, ans) {
  if (head === null) {
    ans.push(null);
  } else {
    ins(head.left, ans);
    ans.push(String(head.value));
    ins(head.right, ans);
  }
}

function posSerial(head) {
  const ans = [];
  poss(head, ans);
  return ans;
}

function poss(head, ans) {
  if (head === null) {
    ans.push(null);
  } else {
    poss(head.left, ans);
    poss(head.right, ans);
    ans.push(String(head.value));
  }
}

// 反序列化 前序的
function buildByPreQueue(preList) {
  if (preList === null || preList.length === 0) {
    return null;
  }
  return preb(preList);
}

function preb(preList) {
  const value = preList.shift();
  if (value === null) {
    return null;
  }
  const head = new Node(parseInt(value));
  head.left = preb(preList);
  head.right = preb(preList);
  return head;
}

// 反序列化 后序的
function buildByPosQueue(posList) {
  if (posList === null || posList.length === 0) {
    return null;
  }
  const stack = [];
  while (posList.length > 0) {
    stack.push(posList.shift());
  }
  return posb(stack);
}

function posb(posStack) {
  const value = posStack.pop();
  if (value === null) {
    return null;
  }
  const head = new Node(parseInt(value));
  head.right = posb(posStack);
  head.left = posb(posStack);
  return head;
}

// 层序遍历
function levelSerial(head) {
  const ans = [];
  if (head === null) {
    ans.push(null);
  } else {
    ans.push(String(head.value));
    const queue = [];
    queue.push(head);
    while (queue.length > 0) {
      head = queue.shift();
      if (head.left !== null) {
        ans.push(String(head.left.value));
        queue.push(head.left);
      } else {
        ans.push(null);
      }
      if (head.right !== null) {
        ans.push(String(head.right.value));
        queue.push(head.right);
      } else {
        ans.push(null);
      }
    }
  }
  return ans;
}

// 层序遍历的反序列化
function buildByLevelQueue(levelList) {
  if (levelList === null || levelList.length === 0) {
    return null;
  }
  const head = generateNode(levelList.shift());
  const queue = [];
  if (head !== null) {
    queue.push(head);
  }
  let node = null;
  while (queue.length > 0) {
    node = queue.shift();
    node.left = generateNode(levelList.shift());
    node.right = generateNode(levelList.shift());
    if (node.left !== null) {
      queue.push(node.left);
    }
    if (node.right !== null) {
      queue.push(node.right);
    }
  }
  return head;
}

function generateNode(val) {
  if (val === null) {
    return null;
  }
  return new Node(parseInt(val));
}

// 示例用法
let head = new Node(1);
head.left = new Node(2);
head.right = new Node(3);
head.left.left = new Node(4);
head.left.right = new Node(5);
head.right.left = new Node(6);
head.right.right = new Node(7);

console.log(preSerial(head));
console.log("========");
console.log(inSerial(head));
console.log("========");
console.log(posSerial(head));
console.log("========");
console.log(levelSerial(head));
console.log("========");

const arr = [1, 3, 3, null, null];
console.log(arr.join(","));
