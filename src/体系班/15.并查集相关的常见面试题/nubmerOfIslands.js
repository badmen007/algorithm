// 测试链接：https://leetcode.com/problems/number-of-islands/

function numIslands3(board) {
  let islands = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] == "1") {
        islands++;
        infect(board, i, j);
      }
    }
  }
  return islands;
}

function infect(board, i, j) {
  if (
    i < 0 ||
    i == board.length ||
    j < 0 ||
    j == board[0].length ||
    board[i][j] !== "1"
  ) {
    return;
  }
  // 不改值的话 递归走不完 栈溢出了并且在下次进来遍历到该数的时候可以跳过
  board[i][j] = 0;
  infect(board, i - 1, j);
  infect(board, i + 1, j);
  infect(board, i, j - 1);
  infect(board, i, j + 1);
}

// ===================================================================

class Node {
  constructor(value) {
    this.value = value;
  }
}

class UnionFind1 {
  constructor(values) {
    this.nodes = new Map();
    this.parents = new Map();
    this.sizeMap = new Map();

    for (const cur of values) {
      const node = new Node(cur);
      this.nodes.set(cur, node);
      this.parents.set(node, node);
      this.sizeMap.set(node, 1);
    }
  }

  findFather(cur) {
    const path = [];
    while (cur !== this.parents.get(cur)) {
      path.push(cur);
      cur = this.parents.get(cur);
    }
    while (path.length > 0) {
      this.parents.set(path.pop(), cur);
    }
    return cur;
  }

  union(a, b) {
    const aHead = this.findFather(this.nodes.get(a));
    const bHead = this.findFather(this.nodes.get(b));
    if (aHead != bHead) {
      const aSetSize = this.sizeMap.get(aHead);
      const bSetSize = this.sizeMap.get(bHead);
      const big = aSetSize >= bSetSize ? aHead : bHead;
      const small = big == aHead ? bHead : aHead;

      this.parents.set(small, big);
      this.sizeMap.set(big, aSetSize + bSetSize);
      this.sizeMap.delete(small);
    }
  }

  sets() {
    return this.sizeMap.size;
  }
}

function numIslands1(board) {
  const row = board.length;
  const col = board[0].length;
  const dots = new Array(row).fill(null).map(() => new Array(col));
  const dotList = [];

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (board[i][j] === "1") {
        dots[i][j] = new Node();
        dotList.push(dots[i][j]);
      }
    }
  }

  const uf = new UnionFind1(dotList);

  for (let j = 1; j < col; j++) {
    if (board[0][j - 1] === "1" && board[0][j] == "1") {
      uf.union(dots[0][j - 1], dots[0][j]);
    }
  }

  for (let i = 1; i < row; i++) {
    if (board[i - 1][0] == "1" && board[i][0] === "1") {
      uf.union(dots[i - 1][0], dots[i][0]);
    }
  }

  // 只要左边 和上边 就足够了
  for (let i = 1; i < row; i++) {
    for (let j = 1; j < col; j++) {
      if (board[i][j] == "1") {
        if (board[i][j - 1] === "1") {
          uf.union(dots[i][j - 1], dots[i][j]);
        }
        if (board[i - 1][j] === "1") {
          uf.union(dots[i - 1][j], dots[i][j]);
        }
      }
    }
  }

  return uf.sets();
}

// Example usage
const board = [
  ["1", "1", "0", "0"],
  ["1", "1", "0", "1"],
  ["0", "0", "1", "0"],
  ["1", "0", "1", "1"],
];

//===================================================================

function numIslands2(board) {
  const row = board.length;
  const col = board[0].length;
  const uf = new UnionFind2(board);

  for (let j = 1; j < col; j++) {
    if (board[0][j - 1] === "1" && board[0][j] === "1") {
      uf.union(0, j - 1, 0, j);
    }
  }

  for (let i = 1; i < row; i++) {
    if (board[i - 1][0] === "1" && board[i][0] === "1") {
      uf.union(i - 1, 0, i, 0);
    }
  }

  for (let i = 1; i < row; i++) {
    for (let j = 1; j < col; j++) {
      if (board[i][j] === "1") {
        if (board[i][j - 1] === "1") {
          uf.union(i, j - 1, i, j);
        }
        if (board[i - 1][j] === "1") {
          uf.union(i - 1, j, i, j);
        }
      }
    }
  }

  return uf.sets;
}

class UnionFind2 {
  constructor(board) {
    this.col = board[0].length;
    this.sets = 0;
    const row = board.length;
    const len = row * this.col;
    this.parent = new Array(len);
    this.size = new Array(len);
    this.help = new Array(len);

    for (let r = 0; r < row; r++) {
      for (let c = 0; c < this.col; c++) {
        if (board[r][c] === "1") {
          const i = this.index(r, c);
          this.parent[i] = i;
          this.size[i] = 1;
          this.sets++;
        }
      }
    }
  }

  index(r, c) {
    return r * this.col + c;
  }

  find(i) {
    let hi = 0;
    while (i !== this.parent[i]) {
      this.help[hi++] = i;
      i = this.parent[i];
    }
    for (hi--; hi >= 0; hi--) {
      this.parent[this.help[hi]] = i;
    }
    return i;
  }

  union(r1, c1, r2, c2) {
    const i1 = this.index(r1, c1);
    const i2 = this.index(r2, c2);
    const f1 = this.find(i1);
    const f2 = this.find(i2);

    if (f1 !== f2) {
      if (this.size[f1] >= this.size[f2]) {
        this.size[f1] += this.size[f2];
        this.parent[f2] = f1;
      } else {
        this.size[f2] += this.size[f1];
        this.parent[f1] = f2;
      }
      this.sets--;
    }
  }
}

//-----------------------------for test---------------------------

function generateRandomMatrix(row, col) {
  const board = new Array(row).fill(null).map(() => new Array(col));
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      board[i][j] = Math.random() < 0.5 ? "1" : "0";
    }
  }
  return board;
}

function copy(board) {
  const row = board.length;
  const col = board[0].length;
  const ans = new Array(row).fill(null).map(() => new Array(col));
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      ans[i][j] = board[i][j];
    }
  }
  return ans;
}


function main() {
  let row = 0;
  let col = 0;
  let board1 = null;
  let board2 = null;
  let board3 = null;
  let start = 0;
  let end = 0;

  row = 1000;
  col = 1000;
  board1 = generateRandomMatrix(row, col);
  board2 = copy(board1);
  board3 = copy(board1);

  console.log(
    "感染方法、并查集(map实现)、并查集(数组实现)的运行结果和运行时间"
  );
  console.log("随机生成的二维矩阵规模 : " + row + " * " + col);

  start = Date.now();
  console.log("感染方法的运行结果: " + numIslands3(board1));
  end = Date.now();
  console.log("感染方法的运行时间: " + (end - start) + " ms");

  start = Date.now();
  console.log("并查集(map实现)的运行结果: " + numIslands1(board2));
  end = Date.now();
  console.log("并查集(map实现)的运行时间: " + (end - start) + " ms");

  start = Date.now();
  console.log("并查集(数组实现)的运行结果: " + numIslands2(board3));
  end = Date.now();
  console.log("并查集(数组实现)的运行时间: " + (end - start) + " ms");

  console.log();

  row = 10000;
  col = 10000;
  board1 = generateRandomMatrix(row, col);
  board3 = copy(board1);
  console.log("感染方法、并查集(数组实现)的运行结果和运行时间");
  console.log("随机生成的二维矩阵规模 : " + row + " * " + col);

  start = Date.now();
  console.log("感染方法的运行结果: " + numIslands3(board1));
  end = Date.now();
  console.log("感染方法的运行时间: " + (end - start) + " ms");

  start = Date.now();
  console.log("并查集(数组实现)的运行结果: " + numIslands2(board3));
  end = Date.now();
  console.log("并查集(数组实现)的运行时间: " + (end - start) + " ms");
}

main()