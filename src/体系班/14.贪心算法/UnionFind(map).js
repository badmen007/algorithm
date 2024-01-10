
class UnionFind {
  constructor(values) {
    this.father = new Map()
    this.size = new Map()
    for(const cur of values) {
      this.father.set(cur, cur)
      this.size.set(cur, 1)
    }
  }
  findFather(cur) {
    const path = []
    while(cur !== this.father.get(cur)) {
      path.push(cur)
      cur = this.father.get(cur)
    }
    if (path.length > 0) {
      this.father.set(path.pop(), cur)
    }
    return cur
  }
  isSameSet(a, b) {
    return this.findFather(a) === this.findFather(b)
  }
  union(a, b) {
    const aFather = this.findFather(a)
    const bFather = this.findFather(b)
    if (aFather !== bFather) {
      const aSize = this.size.get(aFather);
      const bSize = this.size.get(bFather);
      if (aSize > bSize) {
        //挂b
        this.father.set(bFather, aFather)
        this.size.set(aFather, aSize + bSize)
        this.delete(bFather)
      } else {
        this.father.set(aFather, bFather)
        this.size.set(bFather, aSize + bSize)
        this.size.delete(aFather)
      }
    }
  }
  sizes() {
    return this.size.size
  }
}

// test
const values = ['A', 'B', 'C', 'D'];
const unionFind = new UnionFind(values);

unionFind.union('A', 'B');
unionFind.union('C', 'D');
console.log(unionFind.isSameSet('A', 'B')); // true
console.log(unionFind.isSameSet('A', 'C')); // false

console.log(unionFind.sizes()); // 2
