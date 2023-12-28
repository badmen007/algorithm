class Node {
  constructor(data) {
    this.value = data;
    this.next = null;
  }
}

function listPartition1(head, pivot) {
  if (!head) {
    return head;
  }
  let cur = head;
  let l = 0;
  while (cur) {
    l++;
    cur = cur.next;
  }
  const nodeArray = new Array(l);

  cur = head;
  for (let i = 0; i < nodeArray.length; i++) {
    nodeArray[i] = cur;
    cur = cur.next;
  }
  arrPartition(nodeArray, pivot);
  for (let i = 1; i < nodeArray.length; i++) {
    nodeArray[i - 1].next = nodeArray[i];
  }
  nodeArray[nodeArray.length - 1].next = null;
  return nodeArray[0];
}

function arrPartition(nodeArray, pivot) {
  let small = -1;
  let big = nodeArray.length;
  let index = 0;
  while (index != big) {
    if (nodeArray[index].value < pivot) {
      swap(nodeArray, ++small, index++);
    } else if (nodeArray[index].value === pivot) {
      index++;
    } else {
      // 大于 注意这里index不加
      swap(nodeArray, --big, index);
    }
  }
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// --------------------------------

function listPartition2(head, pivot) {
  let sH = null;
  let sT = null;
  let eH = null;
  let eT = null;
  let mH = null;
  let mT = null;

  while (head) {
    let next = head.next;
    head.next = null;
    if (head.value < pivot) {
      if (!sH) {
        sH = head;
        sT = head;
      } else {
        sT.next = head;
        sT = head;
      }
    } else if (head.value === pivot) {
      if (!eH) {
        eH = head;
        eT = head;
      } else {
        eT.next = head;
        eT = head;
      }
    } else {
      if (!mH) {
        mH = head;
        mT = head;
      } else {
        mT.next = head;
        mT = head;
      }
    }
    head = next;
  }

  if (sT) {
    sT.next = eH;
    eT = !eT ? sT : eT;
  }

  // 可能小于区没有
  if (eT) {
    eT.next = mH;
  }

  return sH ? sH : eH ? eH : mH;
}

let head1 = new Node(7);
head1.next = new Node(9);
head1.next.next = new Node(1);
head1.next.next.next = new Node(8);
head1.next.next.next.next = new Node(5);
head1.next.next.next.next.next = new Node(2);
head1.next.next.next.next.next.next = new Node(5);

head1 = listPartition2(head1, 5);

console.dir(head1, { depth: 100 });
