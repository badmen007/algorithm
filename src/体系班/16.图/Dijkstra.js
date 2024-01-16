function dijkstra1(from) {
  const distanceMap = new Map();
  distanceMap.set(from, 0);
  const selectedNodes = new Set();

  function getMinDistanceAndUnselectedNode(distanceMap, selectedNodes) {
    let minNode = null;
    let minDistance = Infinity;

    for (const [node, distance] of distanceMap.entries()) {
      if (!selectedNodes.has(node) && distance < minDistance) {
        minNode = node;
        minDistance = distance;
      }
    }
    return minNode;
  }

  let minNode = getMinDistanceAndUnselectedNode(distanceMap, selectedNodes);

  while (minNode !== null) {
    const distance = distanceMap.get(minNode);

    for (const edge of minNode.edges) {
      const toNode = edge.to;
      const newDistance = distance + edge.weight;

      if (!distanceMap.has(toNode)) {
        distanceMap.set(toNode, newDistance);
      } else {
        distanceMap.set(toNode, Math.min(distanceMap.get(toNode), newDistance));
      }
    }

    selectedNodes.add(minNode);
    minNode = getMinDistanceAndUnselectedNode(distanceMap, selectedNodes);
  }
  return distanceMap;
}

function dijkstra2(head, size) {
  const nodeHeap = new NodeHeap(size);
  nodeHeap.addOrUpdateOrIgnore(head, 0);
  const result = new Map();

  while (!nodeHeap.isEmpty()) {
    const record = nodeHeap.pop();
    const cur = record.node;
    const distance = record.distance;

    for (const edge of cur.edges) {
      nodeHeap.addOrUpdateOrIgnore(edge.to, edge.weight + distance);
    }

    result.set(cur, distance);
  }

  return result;
}

class NodeRecord {
  constructor(node, distance) {
    this.node = node;
    this.distance = distance;
  }
}

class NodeHeap {
  constructor(size) {
    this.nodes = new Array(size);
    this.heapIndexMap = new Map();
    this.distanceMap = new Map();
    this.size = 0;
  }

  isEmpty() {
    return this.size === 0;
  }

  addOrUpdateOrIgnore(node, distance) {
    if (this.inHeap(node)) {
      this.distanceMap.set(
        node,
        Math.min(this.distanceMap.get(node), distance)
      );
      this.insertHeapify(node, this.heapIndexMap.get(node));
    }
    if (!this.isEntered(node)) {
      this.nodes[this.size] = node;
      this.heapIndexMap.set(node, this.size);
      this.distanceMap.set(node, distance);
      this.insertHeapify(node, this.size++);
    }
  }

  pop() {
    const nodeRecord = new NodeRecord(
      this.nodes[0],
      this.distanceMap.get(this.nodes[0])
    );
    this.swap(0, this.size - 1);
    this.heapIndexMap.set(this.nodes[this.size - 1], -1);
    this.distanceMap.delete(this.nodes[this.size - 1]);
    this.nodes[this.size - 1] = null;
    this.heapify(0, --this.size);
    return nodeRecord;
  }

  insertHeapify(node, index) {
    while (
      this.distanceMap.get(this.nodes[index]) <
      this.distanceMap.get(this.nodes[(index - 1) / 2])
    ) {
      this.swap(index, (index - 1) / 2);
      index = (index - 1) / 2;
    }
  }

  heapify(index, size) {
    let left = index * 2 + 1;
    while (left < size) {
      let smallest =
        left + 1 < size &&
        this.distanceMap.get(this.nodes[left + 1]) <
          this.distanceMap.get(this.nodes[left])
          ? left + 1
          : left;
      smallest =
        this.distanceMap.get(this.nodes[smallest]) <
        this.distanceMap.get(this.nodes[index])
          ? smallest
          : index;
      if (smallest === index) {
        break;
      }
      this.swap(smallest, index);
      index = smallest;
      left = index * 2 + 1;
    }
  }

  isEntered(node) {
    return this.heapIndexMap.has(node);
  }

  inHeap(node) {
    return this.isEntered(node) && this.heapIndexMap.get(node) !== -1;
  }

  swap(index1, index2) {
    this.heapIndexMap.set(this.nodes[index1], index2);
    this.heapIndexMap.set(this.nodes[index2], index1);
    const tmp = this.nodes[index1];
    this.nodes[index1] = this.nodes[index2];
    this.nodes[index2] = tmp;
  }
}
