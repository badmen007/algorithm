// 测试链接：https://leetcode.com/problems/friend-circles/

// M是个二维数组
function findCircleNum(M) {
  const N = M.length;
  const unionFind = new UnionFind(N);
  // 只遍历上半区的 因为你认识我 我也认识你 题目规定
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      if (M[i][j] == 1) {
        unionFind.union(i, j);
      }
    }
  }
  return unionFind.sets
}

class UnionFind {
  constructor(N) {
    this.parent = new Array(N);
    this.size = new Array(N);
    this.help = [N];
    this.sets = N;

    for (let i = 0; i < N; i++) {
      this.parent[i] = i;
      this.size[i] = 1;
    }
  }
  find(i) {
    // [0, 1, 2, 3, 4]
    let hi = 0
    while(i !== this.parent[i]) {
      help[hi++] = i
      i = this.parent[i]
    }

    for(hi--; hi >= 0; hi--) {
      parent[help[hi]] = i
    }

    return i
  }
  union(i, j) {
    const f1 = this.find(i)
    const f2 = this.find(j)
    if (f1 !== f2) {
      if (this.size[f1] >= this.size[f2]) {
        // f1当爹
        this.size[f1] += this.size[f2]
        this.parent[f2] = f1; 
      } else {
        this.size[f2] += this.size[f1]
        this.parent[f1] = f2;
      }
      this.sets--
    }
  }
}

// Example usage
const matrix = [
  [1, 1, 0],
  [1, 1, 0],
  [0, 0, 1],
];

const result = findCircleNum(matrix);
console.log(result);
