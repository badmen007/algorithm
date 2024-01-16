// https://leetcode.com/problems/number-of-islands-ii/

function numIslands2(m, n, positions) {
  const uf = new UnionFind1(m, n);
  const ans = [];
  for (const position of positions) {
    ans.push(uf.connect(position[0], position[1]));
  }
  return ans;
}

class UnionFind1 {
  constructor(m, n) {
    this.row = m;
    this.col = n;
    this.sets = 0;
    this.len = this.row * this.col;
    this.parent = new Array(this.len).fill(0);
    this.size = new Array(this.len).fill(0);
    this.help = new Array(this.len).fill(0);
  }

  index(r, c) {
    return r * this.col + c;
  }

  find(i) {
    let hi = 0;
    if (i != this.parent[i]) {
      this.help[hi++] = i
      i = this.parent[i]
    }
    for(hi--; hi >=0; hi--){ 
      this.parent[this.help[hi]] = i
    }
    return i
  }

  union(r1, c1, r2, c2) {
    if (
      r1 < 0 ||
      r1 == this.row ||
      r2 < 0 ||
      r2 == this.row ||
      c1 < 0 ||
      c1 == this.col ||
      c2 < 0 ||
      c2 == this.col
    ) {
      return
    }
    const i1 = this.index(r1, c1)
    const i2 = this.index(r2, c2)
    // 初始化过了
    if (this.size[i1] == 0 || this.size[i2] == 0) {
      return;
    }
    const f1 = this.find(i1)
    const f2 = this.find(i2)
    
    if (f1 != f2) {
      if (this.size[f1] >= this.size[f2]) {
        this.size[f1] += this.size[f2]
        this.parent[f2] = f1;
      } else {
        this.size[f2] += this.size[f1];
        this.parent[f1] = f2;
      }
      this.sets--
    }
  }

  connect(r, c) {
    const index = this.index(r, c);
    if (this.size[index] == 0) {
      this.parent[index] = index;
      this.size[index] = 1;
      this.sets++;
      this.union(r - 1, c, r, c);
      this.union(r + 1, c, r, c);
      this.union(r, c - 1, r, c);
      this.union(r, c + 1, r, c);
    }
    return this.sets
  }
}

//=========================================================================
// 如果m*n比较大，会经历很重的初始化，而k比较小，怎么优化的方法  感觉太变态 折磨
class UnionFind2 {
  constructor() {
    this.parent = new Map();
    this.size = new Map();
    this.help = [];
    this.sets = 0;
  }

  find(cur) {
    while (cur !== this.parent.get(cur)) {
      this.help.push(cur);
      cur = this.parent.get(cur);
    }
    for (const str of this.help) {
      this.parent.set(str, cur);
    }
    this.help = [];
    return cur;
  }

  union(s1, s2) {
    if (this.parent.has(s1) && this.parent.has(s2)) {
      const f1 = this.find(s1);
      const f2 = this.find(s2);
      if (f1 !== f2) {
        const size1 = this.size.get(f1);
        const size2 = this.size.get(f2);
        const big = size1 >= size2 ? f1 : f2;
        const small = big === f1 ? f2 : f1;
        this.parent.set(small, big);
        this.size.set(big, size1 + size2);
        this.sets--;
      }
    }
  }

  connect(r, c) {
    const key = `${r}_${c}`;
    if (!this.parent.has(key)) {
      this.parent.set(key, key);
      this.size.set(key, 1);
      this.sets++;
      const up = `${r - 1}_${c}`;
      const down = `${r + 1}_${c}`;
      const left = `${r}_${c - 1}`;
      const right = `${r}_${c + 1}`;
      this.union(up, key);
      this.union(down, key);
      this.union(left, key);
      this.union(right, key);
    }
    return this.sets;
  }
}

function numIslands22(m, n, positions) {
  const uf = new UnionFind2();
  const ans = [];
  for (const position of positions) {
    ans.push(uf.connect(position[0], position[1]));
  }
  return ans;
}

