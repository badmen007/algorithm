// 子序列可以是不连续的 必须从前往后拿

function subs(s) {
  const str = s.split("");
  let path = "";
  const ans = [];
  process1(str, 0, ans, path);
  return ans;
}
// str是固定参数
// index 表示的是位置
// str[0 ... index]已经走过了 之前的决定都在path上
// 之前的决定是不能改变的 就是path
// str[index...]还能决定，之前已经确定了 而之后的还能自由选择
// 把所有生成的子序列放入到ans中
function process1(str, index, ans, path) {
  if (index == str.length) {
    ans.push(path);
    return;
  }
  process1(str, index + 1, ans, path);
  process1(str, index + 1, ans, path + str[index]);
}

// 生成的子序列不重复
function subNoRepeat(s) {
  const str = s.split("");
  let path = "";
  const set = new Set();
  process2(str, 0, set, path);
  const ans = [];
  for (const item of set.values()) {
    ans.push(item);
  }
  return ans;
}

function process2(str, index, set, path) {
  if (index == str.length) {
    set.add(path);
    return;
  }
  process2(str, index + 1, set, path);
  process2(str, index + 1, set, path + str[index]);
}

function test() {
  const test = "accc";
  const ans1 = subs(test);
  for (const item of ans1) {
    console.log(item);
  }

  console.log("====================");

  const ans2 = subNoRepeat(test);
  for (const item of ans2) {
    console.log(item);
  }
}

test();
