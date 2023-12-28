// 判断链表是不是回文

class Node {
  constructor(data) {
    this.value = data;
    this.next = null;
  }
}

// need n extra space
function isPalindrome1(head) {
  const stack = [];
  let cur = head;
  while (cur) {
    stack.push(cur);
    cur = cur.next;
  }
  while (head) {
    if (head.value !== stack.pop().value) {
      return false;
    }
    head = head.next;
  }
  return true;
}

// need n/2 extra space
function isPalindrome2(head) {
  if (!head || !head.next) {
    return true;
  }
  let right = head.next;
  let cur = head;
  while (cur.next && cur.next.next) {
    right = right.next;
    cur = cur.next.next;
  }
  const stack = [];
  while (right) {
    stack.push(right);
    right = right.next;
  }
  while (stack.length > 0) {
    if (stack.pop().value !== head.value) {
      return false;
    }
    head = head.next;
  }
  return true;
}

// need O(1) extra space
function isPalindrome3(head) {
  if (head == null || !head.next) {
    return true;
  }
  let n1 = head;
  let n2 = head;
  while (n2.next && n2.next.next) {
    n1 = head.next;
    n2 = head.next.next;
  }
  // n1是此时的上中点
  n2 = n1.next;
  n1.next = null;
  let n3 = null;
  // 反转链表
  while (n2) {
    n3 = n2.next;
    n2.next = n1;
    n1 = n2;
    n2 = n3;
  }

  n3 = n1; // 这里记录的是最后一个元素
  n2 = head;
  let res = true;
  while (n1 && n2) {
    if (n1.value !== n2.value) {
      res = false;
      break;
    }
    n1 = n1.next;
    n2 = n2.next;
  }

  n1 = n3.next; // next
  n3.next = null; // pre
  while (n1) {
    n2 = n1.next;
    n1.next = n3;
    n3 = n1;
    n1 = n2;
  }
  return res;
}
// for test

function test() {
  let head = null;
  console.log(head);
  console.log(
    isPalindrome1(head) +
      " | " +
      isPalindrome2(head) +
      " | " +
      isPalindrome3(head) +
      " | "
  );
  console.log(head);
  console.log("=========================");

  head = new Node(1);
  console.log(head);
  console.log(
    isPalindrome1(head) +
      " | " +
      isPalindrome2(head) +
      " | " +
      isPalindrome3(head) +
      " | "
  );
  console.log(head);
  console.log("=========================");

  head = new Node(1);
  head.next = new Node(2);
  console.log(head);
  console.log(
    isPalindrome1(head) +
      " | " +
      isPalindrome2(head) +
      " | " +
      isPalindrome3(head) +
      " | "
  );
  console.log(head);
  console.log("=========================");

  head = new Node(1);
  head.next = new Node(1);
  console.log(head);
  console.log(
    isPalindrome1(head) +
      " | " +
      isPalindrome2(head) +
      " | " +
      isPalindrome3(head) +
      " | "
  );
  console.log(head);
  console.log("=========================");

  head = new Node(1);
  head.next = new Node(2);
  head.next.next = new Node(3);
  console.log(head);
  console.log(
    isPalindrome1(head) +
      " | " +
      isPalindrome2(head) +
      " | " +
      isPalindrome3(head) +
      " | "
  );
  console.log(head);
  console.log("=========================");

  head = new Node(1);
  head.next = new Node(2);
  head.next.next = new Node(1);
  console.log(head);
  console.log(
    isPalindrome1(head) +
      " | " +
      isPalindrome2(head) +
      " | " +
      isPalindrome3(head) +
      " | "
  );
  console.log(head);
  console.log("=========================");

  head = new Node(1);
  head.next = new Node(2);
  head.next.next = new Node(3);
  head.next.next.next = new Node(1);
  console.log(head);
  console.log(
    isPalindrome1(head) +
      " | " +
      isPalindrome2(head) +
      " | " +
      isPalindrome3(head) +
      " | "
  );
  console.log(head);
  console.log("=========================");

  head = new Node(1);
  head.next = new Node(2);
  head.next.next = new Node(2);
  head.next.next.next = new Node(1);
  console.log(head);
  console.log(
    isPalindrome1(head) +
      " | " +
      isPalindrome2(head) +
      " | " +
      isPalindrome3(head) +
      " | "
  );
  console.log(head);
  console.log("=========================");

  head = new Node(1);
  head.next = new Node(2);
  head.next.next = new Node(3);
  head.next.next.next = new Node(2);
  head.next.next.next.next = new Node(1);
  console.log(head);
  console.log(
    isPalindrome1(head) +
      " | " +
      isPalindrome2(head) +
      " | " +
      isPalindrome3(head) +
      " | "
  );
  console.log(head);
  console.log("=========================");
}
test();
