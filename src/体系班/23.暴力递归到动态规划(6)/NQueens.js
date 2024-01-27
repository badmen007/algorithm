
function num1(n) {
  if (n < 1) {
    return 0;
  }
  const record = new Array(n).fill(0);
  return process1(0, record, n);
}

function process1(i, record, n) {
  if (i === n) {
    return 1;
  }
  let res = 0;
  for (let j = 0; j < n; j++) {
    if (isValid(record, i, j)) {
      record[i] = j;
      res += process1(i + 1, record, n);
    }
  }
  return res;
}

function isValid(record, i, j) {
  for (let k = 0; k < i; k++) {
    if (j === record[k] || Math.abs(record[k] - j) === Math.abs(i - k)) {
      return false;
    }
  }
  return true;
}

function num2(n) {
  if (n < 1 || n > 32) {
    return 0;
  }
  const limit = n === 32 ? -1 : (1 << n) - 1;
  return process2(limit, 0, 0, 0);
}

function process2(limit, colLim, leftDiaLim, rightDiaLim) {
  if (colLim === limit) {
    return 1;
  }
  let pos = limit & ~(colLim | leftDiaLim | rightDiaLim);
  let mostRightOne = 0;
  let res = 0;
  while (pos !== 0) {
    mostRightOne = pos & (~pos + 1);
    pos = pos - mostRightOne;
    res += process2(
      limit,
      colLim | mostRightOne,
      (leftDiaLim | mostRightOne) << 1,
      (rightDiaLim | mostRightOne) >>> 1
    );
  }
  return res;
}

const n = 15;

let start = Date.now();
console.log(num2(n));
let end = Date.now();
console.log("cost time: " + (end - start) + "ms");

start = Date.now();
console.log(num1(n));
end = Date.now();
console.log("cost time: " + (end - start) + "ms");
