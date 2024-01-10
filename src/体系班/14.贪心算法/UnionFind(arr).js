const MAXN = 1000001;

const father = new Array(MAXN);
const size = new Array(MAXN);
const help = new Array(MAXN);

// Initialize the Union-Find data structure
function init(n) {
  for (let i = 0; i <= n.length; i++) {
    father[i] = i;
    size[i] = 1;
  }
}

// Find the representative of the set that contains element i
function find(i) {
  let hi = 0;
  while (i !== father[i]) {
    help[hi++] = i;
    i = father[i];
  }
  for (hi--; hi >= 0; hi--) {
    father[help[hi]] = i;
  }
  return i;
}

function isSameSet(x, y) {
  return find(x) === find(y);
}

function union(x, y) {
  const fx = find(x);
  const fy = find(y);
  if (fx !== fy) {
    if (size[fx] >= size[fy]) {
      size[fx] += size[fy];
      father[fy] = fx;
    } else {
      size[fy] += size[fx];
      father[fx] = fy;
    }
  }
}

// test
const values = ['A', 'B', 'C', 'D'];
init(values);
console.log(father, size)
// 
union('C', 'D');
console.log(isSameSet('A', 'B')); // true
console.log(isSameSet('A', 'C')); // false

