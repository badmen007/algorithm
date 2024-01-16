import Graph from "./Graph.js";
import Node from "./Node.js";
import Edge from "./Edge.js";

// [3, 2, 1] -> 3: 权重 2: from  1: to
// 二维数组 矩阵
/** matrix
[
  [2, 3, 1]
  [4, 6, 8]
]
 */
function createGraph(matrix) {
  const graph = new Graph();

  for (let i = 0; i < matrix.length; i++) {
    // matrix[i] 代表每一条边
    const weight = matrix[i][0];
    const from = matrix[i][1];
    const to = matrix[i][2];

    if (!graph.nodes[from]) {
      graph.nodes[from] = new Node(from);
    }
    if (!graph.nodes[to]) {
      graph.nodes[to] = new Node(to);
    }
    // 拿到from to 的节点
    const fromNode = graph.nodes[from];
    const toNode = graph.nodes[to];
    // 建好一个边
    const newEdge = new Edge(weight, fromNode, toNode);

    // 从from出发的邻居
    fromNode.nexts.push(toNode);
    fromNode.out++;
    toNode.in++;
    fromNode.edges.push(newEdge);
    graph.edges.add(newEdge);
  }

  return graph;
}

const matrix = [
  [5, 1, 2],
  [8, 2, 3],
  // Add more edges as needed
];

const myGraph = createGraph(matrix);
console.log(myGraph.nodes); // Output: { '1': Node { value: 1, in: 0, out: 1, nexts: [Node], edges: [Edge] }, '2': Node { value: 2, in: 1, out: 1, nexts: [Node], edges: [Edge] }, '3': Node { value: 3, in: 1, out: 0, nexts: [], edges: [] } }
console.log(myGraph.edges); //
