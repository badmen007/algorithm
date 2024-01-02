class Node {
  constructor(data) {
    this.value = data;
    this.next = null;
  }
}
// 不可能出现一个有环一个没有环的情况
function getIntersectNode(head1, head2) {
  if (head1 === null || head2 === null) {
    return null;
  }
  const loop1 = getLoopNode(head1);
  const loop2 = getLoopNode(head2);
  if (loop1 === null && loop2 === null) {
    return noLoop(head1, head2);
  }
  if (loop1 !== null && loop2 !== null) {
    return bothLoop(head1, loop1, head2, loop2);
  }
  return null;
}

// 找到链表第一个入环节点，如果无环，返回null
function getLoopNode(head) {
  if (head === null || head.next === null || head.next.next === null) {
    return null;
  }
  //这个就是要求 慢指针走一步 快指针走两步 就是会追上 然后快指针从头开始每次走一步
  // 当快慢指针再次相遇时 那个节点就是入环的第一个点
  let slow = head.next;
  let fast = head.next.next;
  while (slow !== fast) {
    if (fast.next === null || fast.next.next === null) {
      return null;
    }
    fast = fast.next.next;
    slow = slow.next;
  }
  fast = head;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }
  return slow;
}

// 如果两个链表都无环，返回第一个相交节点，如果不相交，返回null
function noLoop(head1, head2) {
  if (head1 === null || head2 === null) {
    return null;
  }
  let cur1 = head1;
  let cur2 = head2;
  let n = 0;
  while (cur1.next !== null) {
    n++;
    cur1 = cur1.next;
  }
  while (cur2.next !== null) {
    n--;
    cur2 = cur2.next;
  }
  if (cur1 !== cur2) {
    return null;
  }
  cur1 = n > 0 ? head1 : head2;
  cur2 = cur1 === head1 ? head2 : head1;
  n = Math.abs(n);
  while (n !== 0) {
    n--;
    cur1 = cur1.next;
  }
  while (cur1 !== cur2) {
    cur1 = cur1.next;
    cur2 = cur2.next;
  }
  return cur1;
}

// 两个有环链表，返回第一个相交节点，如果不相交，返回null
function bothLoop(head1, loop1, head2, loop2) {
  let cur1 = null;
  let cur2 = null;
  if (loop1 === loop2) {
    cur1 = head1;
    cur2 = head2;
    let n = 0;
    while (cur1 !== loop1) {
      n++;
      cur1 = cur1.next;
    }
    while (cur2 !== loop2) {
      n--;
      cur2 = cur2.next;
    }
    cur1 = n > 0 ? head1 : head2;
    cur2 = cur1 === head1 ? head2 : head1;
    n = Math.abs(n);
    while (n !== 0) {
      n--;
      cur1 = cur1.next;
    }
    while (cur1 !== cur2) {
      cur1 = cur1.next;
      cur2 = cur2.next;
    }
    return cur1;
  } else {
    cur1 = loop1.next;
    while (cur1 !== loop1) {
      if (cur1 === loop2) {
        return loop1;
      }
      cur1 = cur1.next;
    }
    return null;
  }
}

// 创建两个示例链表
let node1 = new Node(1);
let node2 = new Node(2);
let node3 = new Node(3);
let node4 = new Node(4);

node1.next = node2;
node2.next = node3;
node3.next = node4;

let node5 = new Node(5);
let node6 = new Node(6);

node5.next = node6;
node6.next = node3; // 共享 node3 节点

// 使用 getIntersectNode 找到相交节点
let intersectNode = getIntersectNode(node1, node5);
console.log(intersectNode);
