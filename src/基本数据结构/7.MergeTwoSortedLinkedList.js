/**
 *
 * 给定两个有序链表的头节点 head1 和 head2
 * 返回合并之后的大链表
 * 例子：1 -> 3 -> 3 -> 5 -> 7  2 -> 2 -> 3 -> 3 -> 7
 * 返回：1 -> 2 -> 2 -> 3 -> 3 -> 3 -> 3 -> 5 -> 7 -> 7
 */

import LinkedList from "../data-structures/LinkedList/LinkList.js";
const arr1 = [1, 3, 3, 5, 7];
const arr2 = [2, 2, 3, 3, 7];
const linkedList1 = new LinkedList();
for (let i = 0; i < arr1.length; i++) {
  linkedList1.append(arr1[i]);
}
const linkedList2 = new LinkedList();
for (let i = 0; i < arr2.length; i++) {
  linkedList2.append(arr2[i]);
}

function mergeTwoSortedList(head1, head2) {
  if (head1 == null || head2 == null) {
    return head1 == null ? head2 : head1;
  }

  // 1.先要把头小的作为开始的头
  let head = head1.value <= head2.value ? head1 : head2;
  let cur1 = head.next;
  let cur2 = head == head1 ? head2 : head1;
  let pre = head;
  while (cur1 != null && cur2 != null) {
    if (cur1.value <= cur2.value) {
      pre.next = cur1;
      cur1 = cur1.next;
    } else {
      pre.next = cur2;
      cur2 = cur2.next;
    }
    pre = pre.next;
  }
  pre.next = cur1 != null ? cur1 : cur2;
  return head;
}

const res = mergeTwoSortedList(linkedList1.head, linkedList2.head);
console.dir(res, { depth: 100 });
