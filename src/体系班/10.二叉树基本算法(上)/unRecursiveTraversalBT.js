class Node {
  constructor(data) {
    this.value = data;
    this.left = null;
    this.right = null;
  }
}

function pre(head) {
  if (head) {
    const stack = [];
    stack.push(head);
    while (stack.length > 0) {
      let cur = stack.pop();
      console.log(cur.value);
      if (cur.right) {
        stack.push(cur.right);
      }
      if (cur.left) {
        stack.push(cur.left);
      }
    }
  }
}

// 先把所有的左边都放进栈中
function inOrder(cur) {
  if (cur) {
    const stack = [];
    // 这个cur是保证当根节点只有右边 的时候能进来
    while (stack.length > 0 || cur !== null) {
      if (cur !== null) {
        stack.push(cur);
        cur = cur.left;
      } else {
        cur = stack.pop();
        console.log(cur.value);
        cur = cur.right;
      }
    }
  }
}

// 准备两个栈  头右左  -> 左右头
function posOrder1(head) {
  if (head) {
    const stack1 = [];
    const stack2 = [];
    stack1.push(head);
    while (stack1.length > 0) {
      let cur = stack1.pop();
      stack2.push(cur);
      if (cur.left) {
        stack1.push(cur.left);
      }
      if (cur.right) {
        stack1.push(cur.right);
      }
    }
    while (stack2.length > 0) {
      console.log(stack2.pop().value);
    }
  }
}

// 这个理解起来有点难
function posOrder2(h) {
  if (h) {
    const stack = [];
    stack.push(h);
    let c = null;
    while (stack.length > 0) {
      c = stack[stack.length - 1];
      if (c.left !== null && h !== c.left && h !== c.right) {
        stack.push(c.left);
      } else if (c.right !== null && h !== c.right) {
        stack.push(c.right);
      } else {
        console.log(stack.pop().value + " ");
        h = c;
      }
    }
  }
}

let head = new Node(1);
head.left = new Node(2);
head.right = new Node(3);
head.left.left = new Node(4);
head.left.right = new Node(5);
head.right.left = new Node(6);
head.right.right = new Node(7);

console.log("PreOrder:");
pre(head);
console.log("========");
console.log("InOrder:");
inOrder(head);
console.log("========");
console.log("PostOrder:");
posOrder1(head);
console.log("========");
