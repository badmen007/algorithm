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

/**
 * 总结：
 * 1. 要看两个链表谁的头比较小
 * 2. 定义两个链表开始比较的节点，头比较小的要从第二个节点开始比，头大的从第一个开始比
 * 3. 准备一个pre变量，用来改变指针的方向
 * 4. 开始循环比较，pre指向小的那个节点，谁小谁移动
 * 5. 看cur1和cur2谁指向空了，就跳出循环，pre.next就指向那个不为空的节点
 */
