// 这只是一种思路 对练习递归有好处 非常的麻烦
function lowestString1(strs) {
  if (!strs || strs.length === 0) {
    return "";
  }
  // 拿到所有组合的可能性
  const ans = process(strs);
  return ans.size === 0 ? "" : [...ans].sort((a, b) => a.localeCompare(b))[0];
}

function process(strs) {
  const ans = new Set();
  if (strs.length === 0) {
    ans.add("");
    return ans;
  }
  for (let i = 0; i < strs.length; i++) {
    const first = strs[i];
    const nexts = removeIndexString(strs, i);
    const next = process(nexts);
    for (const cur of next) {
      ans.add(first + cur);
    }
  }
  return ans;
}

function removeIndexString(arr, index) {
  const ans = new Array(arr.length - 1);
  let ansIndex = 0;
  for (let i = 0; i < arr.length; i++) {
    if (i !== index) {
      ans[ansIndex++] = arr[i];
    }
  }
  return ans;
}

function lowestString2(strs) {
  if (!strs || strs.length === 0) {
    return "";
  }
  strs.sort((a, b) => (a + b).localeCompare(b + a));
  return strs.join("");
}

function generateRandomString(strLen) {
  const ans = new Array(Math.floor(Math.random() * strLen) + 1);
  for (let i = 0; i < ans.length; i++) {
    const value = Math.floor(Math.random() * 5);
    ans[i] =
      Math.random() <= 0.5
        ? String.fromCharCode(65 + value)
        : String.fromCharCode(97 + value);
  }
  return ans.join("");
}

function generateRandomStringArray(arrLen, strLen) {
  const ans = new Array(Math.floor(Math.random() * arrLen) + 1);
  for (let i = 0; i < ans.length; i++) {
    ans[i] = generateRandomString(strLen);
  }
  return ans;
}

function copyStringArray(arr) {
  return arr.slice();
}

function main() {
  const arrLen = 6;
  const strLen = 5;
  const testTimes = 10000;
  console.log("test begin");
  for (let i = 0; i < testTimes; i++) {
    const arr1 = generateRandomStringArray(arrLen, strLen);
    const arr2 = copyStringArray(arr1);
    if (lowestString1(arr1) !== lowestString2(arr2)) {
      console.log(arr1);
      console.log(lowestString1(arr1));
      console.log(lowestString2(arr2));
      break
    }
  }
  console.log("finish!");
}

main();

