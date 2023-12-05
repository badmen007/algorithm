/**
 * 两个链表相加
 *
 * 给定两个链表的头部节点head1和head2
 *
 * 认为从左到右是某个数字从低位到高位，返回相加之后的链表
 *
 * 4 -> 3 -> 6  2 -> 5 -> 3
 *
 * 返回 6 -> 8 -> 9
 *
 * 解释 643 + 352 = 986
 */
// 构造两个链表
import LinkedList from "../data-structures/LinkedList/LinkList.js";
import { LinkedListNode } from "../data-structures/LinkedList/LinkedListNode.js";
const arr1 = [4, 3, 6];
const arr2 = [2, 5, 4];
const linkedList1 = new LinkedList();
for (let i = 0; i < arr1.length; i++) {
  linkedList1.append(arr1[i]);
}
const linkedList2 = new LinkedList();
for (let i = 0; i < arr2.length; i++) {
  linkedList2.append(arr2[i]);
}

//----------------------------------------
// 不生成新的链表了 直接用老的链表

const head1 = linkedList1.head;
const head2 = linkedList2.head;

function addTwoNumbers() {
  const len1 = listLength(head1);
  const len2 = listLength(head2);
  let l = len1 >= len2 ? head1 : head2;
  let s = l === head1 ? head2 : head1;
  let curL = l;
  let curS = s;
  let last = curL; // 这个是为了后面最后一位如果有进位的话 添加到末尾
  let carry = 0; // 进位
  let curNum = 0;
  while (curS != null) {
    curNum = curL.value + curS.value + carry;
    curL.value = curNum % 10;
    carry = parseInt(curNum / 10);
    last = curL;
    curL = curL.next;
    curS = curS.next;
  }
  while (curL != null) {
    curNum = curL.value + carry;
    curL.value = curNum % 10;
    carry = parseInt(curNum / 10);
    last = curL;
    curL = curL.next;
  }
  if (carry !== 0) {
    last.next = new LinkedListNode(1);
  }
  return l;
}

// 求链表长度
function listLength(head) {
  let len = 0;
  let curNode = head;
  while (curNode !== null) {
    len++;
    curNode = curNode.next;
  }
  return len;
}

console.dir(addTwoNumbers(), { depth: 100 });

/**
 * 总结：
 *  1. 就是要看两个链表 哪个链表长 定义好长的和短的链表
 *  2. 需要一个变量来存储进位
 *  3. 如果短的链表还没完的话，就用长链表当前节点的值加上短链表当前节点的值再加上进位的值，合起来的值取模就得到当前节点的值，除以10取整就得到进位的值，记录last,两个节点都往下走，
 *  4. 如果短链表没有了，长链表还有的话，那就用长链表当前节点的值加上进位，合起来的值取模得到节点的值，除以10取整就得到进位的值
 *  5. 最后如果是最后两个节点加起来的值超过10，有进位，这个时候要把进位的值创建一个新的节点放到last的下一个
 *  6. 最后返回节点(这里是将修改后的值赋值给长链表了)
 */
