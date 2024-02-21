// 测试链接：https://leetcode.com/problems/gas-station
function canCompleteCircuit(gas, cost) {
  const good = goodArray(gas, cost);
  for (let i = 0; i < gas.length; i++) {
    if (good[i]) {
      return i;
    }
  }
  return -1;
}

function goodArray(g, c) {
  const N = g.length;
  const M = N * 2;
  const arr = new Array(M);

  for (let i = 0; i < N; i++) {
    arr[i] = g[i] - c[i];
    arr[i + N] = g[i] - c[i];
  }

  for (let i = 1; i < M; i++) {
    arr[i] += arr[i - 1];
  }

  const w = [];
  // 这个滑动窗口是最小值
  for (let i = 0; i < N; i++) {
    while (w.length > 0 && arr[w[w.length - 1]] >= arr[i]) {
      w.pop();
    }
    w.push(i);
  }

  const ans = new Array(N).fill(false);

  // offset 代表的是窗口的前一个值
  for (let offset = 0, i = 0, j = N; j < M; offset = arr[i++], j++) {
    if (arr[w[0]] - offset >= 0) {
      ans[i] = true;
    }

    // 过期了要出去
    if (w[0] == i) {
      w.shift();
    }

    while (w.length > 0 && arr[w[w.length - 1]] >= arr[j]) {
      w.pop();
    }
    w.push(j);
  }
  return ans;
}
