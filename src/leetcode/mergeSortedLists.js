import LinkedList from "../data-structures/linkedList/LinkList.js";
const arr1 = [3, 4, 6];
const arr2 = [2, 4, 5];
const arr3 = [1, 8, 9];
const linkedList1 = new LinkedList();
for (let i = 0; i < arr1.length; i++) {
  linkedList1.append(arr1[i]);
}
const linkedList2 = new LinkedList();
for (let i = 0; i < arr2.length; i++) {
  linkedList2.append(arr2[i]);
}

const linkedList3 = new LinkedList();
for (let i = 0; i < arr3.length; i++) {
  linkedList3.append(arr3[i]);
}

//-----------------------------------------
// 合并两个有序链表
// 测试链接：https://leetcode.com/problems/merge-k-sorted-lists/

class Heap {
  constructor(comparator = (a, b) => a - b) {
    this.heapContainer = [];
    this.comparator = comparator;
  }

  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }
  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }
  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }
  hasParent(childIndex) {
    return this.getParentIndex(childIndex) >= 0;
  }
  hasLeftChild(parentIndex) {
    return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
  }
  hasRightChild(parentIndex) {
    return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
  }
  leftChild(parentIndex) {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)];
  }
  rightChild(parentIndex) {
    return this.heapContainer[this.getRightChildIndex(parentIndex)];
  }
  parent(childIndex) {
    return this.heapContainer[this.getParentIndex(childIndex)];
  }
  swap(indexOne, indexTwo) {
    const tmp = this.heapContainer[indexTwo];
    this.heapContainer[indexTwo] = this.heapContainer[indexOne];
    this.heapContainer[indexOne] = tmp;
  }
  peek() {
    if (this.heapContainer.length === 0) {
      return null;
    }
    return this.heapContainer[0];
  }
  poll() {
    if (this.heapContainer.length === 0) {
      return null;
    }
    if (this.heapContainer.length === 1) {
      return this.heapContainer.pop();
    }
    const item = this.heapContainer[0];
    this.heapContainer[0] = this.heapContainer.pop();
    this.heapifyDown();

    return item;
  }
  add(item) {
    this.heapContainer.push(item);
    this.heapifyUp();
    return this;
  }
  isEmpty() {
    return !this.heapContainer.length;
  }
  heapifyUp(customStartIndex) {
    let currentIndex = customStartIndex || this.heapContainer.length - 1;

    while (
      this.hasParent(currentIndex) &&
      !this.pairIsInCorrectOrder(
        this.parent(currentIndex),
        this.heapContainer[currentIndex]
      )
    ) {
      this.swap(currentIndex, this.getParentIndex(currentIndex));
      currentIndex = this.getParentIndex(currentIndex);
    }
  }
  heapifyDown(customStartIndex = 0) {
    let currentIndex = customStartIndex;
    let nextIndex = 0;

    while (this.hasLeftChild(currentIndex)) {
      if (
        this.hasRightChild(currentIndex) &&
        this.pairIsInCorrectOrder(
          this.rightChild(currentIndex),
          this.leftChild(currentIndex)
        )
      ) {
        nextIndex = this.getRightChildIndex(currentIndex);
      } else {
        nextIndex = this.getLeftChildIndex(currentIndex);
      }
      if (
        this.pairIsInCorrectOrder(
          this.heapContainer[currentIndex],
          this.heapContainer[nextIndex]
        )
      ) {
        break;
      }

      this.swap(currentIndex, nextIndex);
      currentIndex = nextIndex;
    }
  }
  pairIsInCorrectOrder(firstElement, secondElement) {
    return firstElement.value < secondElement.value;
  }
}

function mergeList(lists) {
  if (lists == null) {
    return null;
  }
  // 优先级队列
  const heap = new Heap();
  for (let i = 0; i < lists.length; i++) {
    if (lists[i] != null) {
      heap.add(lists[i]);
    }
  }
  if (heap.isEmpty()) {
    return null;
  }

  let head = heap.poll();
  let pre = head;

  if (pre.next != null) {
    heap.add(pre.next);
  }

  while (!heap.isEmpty()) {
    let cur = heap.poll();
    pre.next = cur;
    pre = cur;
    if (cur.next != null) {
      heap.add(cur.next);
    }
  }
  return head;
}
// mergeList([linkedList1.head, linkedList2.head, linkedList3.head]);
console.dir(mergeList([linkedList1.head, linkedList2.head, linkedList3.head]), {
  depth: 100,
});

/**
 * 这个题目数组中放的都是这些链表的头节点
 * 
 * 1. 首先把数组中的头节点都放到优先级队列中(其实这个堆实现的就是优先级队列)
 * 2. 弹出一个(那肯定是最小的),然后把弹出的那个的下一个节点放入优先级队列中，此时要记住第一个弹出的pre它将作为移动的节点
 * 3. 当优先级队列不为空的话就弹出，把弹出的节点赋值给pre的下一个，然后弹出的节点赋值给pre
 * 4. 如果弹出的节点有下一个节点next的话，就把下一个节点放到优先级队列中
 */
