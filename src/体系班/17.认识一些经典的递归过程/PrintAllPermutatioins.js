// 字符串的全部排列
// 技巧：恢复现场 

// 这个还是比较好理解的
function permutation1(s) {
  const ans = [];

  if (s == null || s.length == 0) {
    return ans;
  }

  const str = s.split("");
  const rest = new Set(str);
  const path = "";

  f(rest, path, ans);
  return ans;
}

function f(rest, path, ans) {
  if (rest.size == 0) {
    ans.push(path);
  } else {
    const restArray = Array.from(rest);

    for (let i = 0; i < restArray.length; i++) {
      const cur = restArray[i];
      rest.delete(cur);
      f(rest, path + cur, ans);
      rest.add(cur);
    }
  }
}

// 这个递归不是很好理解 有很多重复的
function permutation2(s) {
  const ans = [];
  if (s == null || s.length == 0) {
    return ans;
  }
  const str = s.split("");
  g1(str, 0, ans);
  return ans;
}
// 这里的下标控制一下就可以避免重复的情况
// 从0开始的话就会有很多重复的
function g1(str, index, ans) {
  if (index == str.length) {
    ans.push(str.join(""));
  } else {
    for(let i = index; i < str.length; i++) {
      swap(str, index, i);
      g1(str, index + 1, ans);
      swap(str, index, i);
    }
  }
}


function permutation3(s) {
  const ans = [];
  if (!s || s.length === 0) {
    return ans;
  }
  const str = s.split("");
  g2(str, 0, ans);
  return ans;
}

function g2(str, index, ans) {
  if (index === str.length) {
    ans.push(str.join(""));
  } else {
    const visited = Array(256).fill(false);
    for (let i = index; i < str.length; i++) {
      if (!visited[str[i].charCodeAt(0)]) {
        visited[str[i].charCodeAt(0)] = true;
        swap(str, index, i);
        g2(str, index + 1, ans);
        swap(str, index, i);
      }
    }
  }
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}


function test() {
  const s = 'abc'
  const ans1 = permutation1(s)
  console.log(ans1)

  console.log('=====================')

  const ans2 = permutation2(s)
  console.log(ans2)

  console.log("=====================");

  const ans3 = permutation3(s)
  console.log(ans3)
}

test()