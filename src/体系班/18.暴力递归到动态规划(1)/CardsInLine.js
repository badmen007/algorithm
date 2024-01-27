// 抽牌问题
// 要求返回的是抽到的纸牌的总和是多少

function win1(arr) {
  if (arr == null || arr.length == 0) {
    return 0;
  }
  // 先手
  const first = f1(arr, 0, arr.length - 1);
  // 后手
  const second = g1(arr, 0, arr.length - 1);
  return Math.max(first, second);
}

// 先手获得的最好的分数
function f1(arr, L, R) {
  if (L == R) {
    return arr[L];
  }
  const p1 = arr[L] + g1(arr, L + 1, R);
  const p2 = arr[R] + g1(arr, L, R - 1);
  return Math.max(p1, p2);
}

// 后手获得的最好的分数
function g1(arr, L, R) {
  if (L == R) {
    return 0;
  }
  const p1 = f1(arr, L + 1, R);
  const p2 = f1(arr, L, R - 1);
  return Math.min(p1, p2);
}

// -------------------------------------------------------

function win2(arr) {
  if (arr == null || arr.length == 0) {
    return 0;
  }
  const N = arr.length;
  const fmap = new Array(N).fill(0).map(() => new Array(N).fill(-1));
  const gmap = new Array(N).fill(0).map(() => new Array(N).fill(-1));

  const first = f2(arr, 0, N - 1, fmap, gmap);
  const second = g2(arr, 0, N - 1, fmap, gmap);
  return Math.max(first, second);
}

function f2(arr, L, R, fmap, gmap) {
  if (fmap[L][R] != -1) {
    return fmap[L][R];
  }
  let ans = 0;
  if (L == R) {
    ans = arr[L];
  } else {
    const p1 = arr[L] + g2(arr, L + 1, R, fmap, gmap);
    const p2 = arr[R] + g2(arr, L, R - 1, fmap, gmap);
    ans = Math.max(p1, p2);
  }
  fmap[L][R] = ans;
  return ans;
}

function g2(arr, L, R, fmap, gmap) {
  if (gmap[L][R] != -1) {
    return gmap[L][R];
  }

  let ans = 0;
  // 如果L==R的话 先手拿走了 后手就没有了
  if (L != R) {
    const p1 = f2(arr, L + 1, R, fmap, gmap);
    const p2 = f2(arr, L, R - 1, fmap, gmap);
    ans = Math.min(p1, p2);
  }
  gmap[L][R] = ans;
  return ans;
}

// -------------------------------------------------------

// 要根据原始的递归函数取看依赖关系
function win3(arr) {
  if (arr == null || arr.length == 0) {
    return 0;
  }
  const N = arr.length;
  const fmap = new Array(N).fill(0).map(() => new Array(N).fill(0));
  const gmap = new Array(N).fill(0).map(() => new Array(N).fill(0));
  // 这个是由f函数的basecase决定的
  for (let i = 0; i < N; i++) {
    fmap[i][i] = arr[i];
  }

  for (let startCol = 1; startCol < N; startCol++) {
    let L = 0;
    let R = startCol;
    while (R < N) {
      fmap[L][R] = Math.max(arr[L] + gmap[L + 1][R], arr[R] + gmap[L][R - 1]);
      gmap[L][R] = Math.min(fmap[L + 1][R], fmap[L][R - 1]);
      L++;
      R++;
    }
  }
  return Math.max(fmap[0][N - 1], gmap[0][N - 1]);
}

// -------------------------------------------------------
function test() {
  const arr = [5, 7, 4, 5, 8, 1, 6, 0, 3, 4, 6, 1, 7];
  console.log(win1(arr));
  console.log("====================");
  console.log(win2(arr));
  console.log("====================");
  console.log(win3(arr));
}

test();
