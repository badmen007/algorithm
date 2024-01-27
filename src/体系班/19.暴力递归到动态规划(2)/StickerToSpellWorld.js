// https://leetcode.com/problems/stickers-to-spell-word
function minStackers1(stickers, target) {
  const ans = process1(stickers, target);
  return ans == Infinity ? -1 : ans;
}

function process1(stickers, target) {
  if (target.length == 0) {
    return 0;
  }
  let min = Infinity;
  for (const item of stickers) {
    let rest = minus(target, item);
    if (rest.length !== target.length) {
      min = Math.min(min, process1(stickers, rest));
    }
  }
  return min + (min == Infinity ? 0 : 1);
}

function minus(s1, s2) {
  const str1 = s1.split("");
  const str2 = s2.split("");
  const count = new Array(26).fill(0);

  for (const char of str1) {
    count[char.charCodeAt(0) - "a".charCodeAt(0)]++;
  }

  for (const char of str2) {
    count[char.charCodeAt(0) - "a".charCodeAt(0)]--;
  }

  const builder = [];
  for (let i = 0; i < 26; i++) {
    if (count[i] > 0) {
      for (let j = 0; j < count[i]; j++) {
        builder.push(String.fromCharCode(i + "a".charCodeAt(0)));
      }
    }
  }
  return builder.join("");
}

// ----------------------------------------

function minStackers2(stickers, target) {
  const N = stickers.length;
  const counts = new Array(N).fill(0).map(() => new Array(26).fill(0));

  for (let i = 0; i < N; i++) {
    const str = stickers[i].split("");
    for (const item of str) {
      counts[i][item.charCodeAt(0) - "a".charCodeAt(0)]++;
    }
  }
  const ans = process2(counts, target);
  return ans == Infinity ? -1 : ans;
}

function process2(stickers, t) {
  if (t.length == 0) {
    return 0;
  }
  const target = t.split("");
  const tcounts = new Array(26).fill(0);

  for (const char of target) {
    tcounts[char.charCodeAt(0) - "a".charCodeAt(0)]++;
  }
  const N = stickers.length;
  let min = Infinity;

  for (let i = 0; i < N; i++) {
    const sticker = stickers[i];
    // 比较重要
    if (sticker[target[0].charCodeAt(0) - "a".charCodeAt(0)] > 0) {
      const builder = [];
      for (let j = 0; j < 26; j++) {
        if (tcounts[j] > 0) {
          const nums = tcounts[j] - sticker[j];
          for (let k = 0; k < nums; k++) {
            builder.push(String.fromCharCode(j + "a".charCodeAt(0)));
          }
        }
      }
      const rest = builder.join("");
      min = Math.min(min, process2(stickers, rest));
    }
  }
  return min + (min == Infinity ? 0 : 1);
}

// ---------------------------------------------------

function minSticker3(stickers, target) {
  const N = stickers.length;
  const counts = new Array(N).fill(0).map(() => new Array(26).fill(0));
  for (let i = 0; i < N; i++) {
    const str = stickers[i].split("");
    for (const item of str) {
      counts[i][item.charCodeAt(0) - "a".charCodeAt(0)]++;
    }
  }
  const dp = new Map();
  dp.set("", 0);
  const ans = process3(counts, target, dp);
  return ans === Infinity ? -1 : ans;
}

function process3(stickers, t, dp) {
  if (dp.has(t)) {
    return dp.get(t);
  }
  const target = t.split("");
  const tcounts = new Array(26).fill(0);
  for (const char of target) {
    tcounts[char.charCodeAt(0) - "a".charCodeAt(0)]++;
  }
  const N = stickers.length;
  let min = Infinity;
  for (let i = 0; i < N; i++) {
    const sticker = stickers[i];

    if (sticker[target[0].charCodeAt(0) - "a".charCodeAt(0)] > 0) {
      const builder = [];
      for (let j = 0; j < 26; j++) {
        if (tcounts[j] > 0) {
          const nums = tcounts[j] - sticker[j];
          for (let k = 0; k < nums; k++) {
            builder.push(String.fromCharCode(j + "a".charCodeAt(0)));
          }
        }
      }
      const rest = builder.join("");
      min = Math.min(min, process3(stickers, rest, dp));
    }
  }
  let ans = min + (min == Infinity ? 0 : 1);
  dp.set(t, ans);
  return ans;
}
