// 前缀树
// 测试链接 https://leetcode.cn/problems/implement-trie-ii-prefix-tree/
// 首先有一个根节点

class Trie {
  constructor() {
    this.root = new Node();
  }
  insert(word) {
    if (word === null) {
      return;
    }
    const chs = word.split("");
    let node = this.root;
    node.pass++;
    let index = 0;
    for (let i = 0; i < chs.length; i++) {
      index = chs[i].charCodeAt(0);
      if (!node.nexts.has(index)) {
        node.nexts.set(index, new Node());
      }
      node = node.nexts.get(index);
      node.pass++;
    }
    node.end++;
  }
  erase(word) {
    if (this.countWordsEqualTo(word) !== 0) {
      const chs = word.split("");
      let node = this.root;
      node.pass--;
      let index = 0;
      for (let i = 0; i < chs.length; i++) {
        index = chs[i].charCodeAt(0);
        if (--node.nexts.get(index).pass === 0) {
          node.nexts.delete(index);
          return;
        }
        node = node.nexts.get(index);
      }
      node.end--;
    }
  }
  countWordsEqualTo(word) {
    if (!word) return;
    const chs = word.split("");
    let node = this.root;
    let index = 0;
    for (let i = 0; i < chs.length; i++) {
      index = chs[i].charCodeAt(0);
      if (!node.nexts.has(index)) {
        return 0;
      }
      node = node.nexts.get(index);
    }
    return node.end;
  }
  countWordsStartingWith(pre) {
    if (!pre) return;
    const chs = pre.split("");
    let node = this.root;
    let index = 0;
    for (let i = 0; i < chs.length; i++) {
      index = chs[i].charCodeAt(0);
      if (!node.nexts.get(index)) {
        return 0;
      }
      node = node.nexts.get(index);
    }
    return node.pass;
  }
}

class Node {
  constructor() {
    this.pass = 0;
    this.end = 0;
    this.nexts = new Map();
  }
}
