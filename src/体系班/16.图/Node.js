// 点结构的描述
export default function Node(value) {
  this.value = value;
  // 多少个边是指向自己的
  this.in = 0;
  // 直接指向别人的
  this.out = 0;
  // 有哪些邻居(从自己出发能够找到的)
  this.nexts = [];
  // 从它出发有哪些直接的边
  this.edges = [];
}
