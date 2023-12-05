import LinkedList from "../data-structures/LinkedList/LinkList.js";

const arr = [1, 2, 3, 4, 5, 6, 7];
const linkedList = new LinkedList();
for (let i = 0; i < arr.length; i++) {
  linkedList.append(arr[i]);
}

function reverseKGroup(head, k) {
  let start = head;
  let end = getKGroupEnd(start, k)
  if (end == null) {
    return head
  }
  // 第一组
  head = end
  reverse(start, end)
  // 上一组的结尾节点
  let lastEnd = start
  while(lastEnd.next !== null) {
    start = lastEnd.next;
    end = getKGroupEnd(start, k)
    if (end == null) {
      return head;
    }
    reverse(start, end)
    lastEnd.next = end;
    lastEnd = start
  }
  return head
}

function getKGroupEnd(start, k) {
  while (--k != 0 && start != null) {
    start = start.next;
  }
  return start;
}

function reverse(start, end) {
  end = end.next;
  let pre = null;
  let cur = start;
  let next = null;
  while (cur != end) {
    next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  start.next = end
}

console.dir(reverseKGroup(linkedList.head, 3), {depth: 200})