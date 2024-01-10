
function minLight1(road) {
  if (road == null || road.length == 0) {
    return 0
  }
  return process([...road], 0, new Set())
}

function process(str, index, lights) {
  if (index == str.length) {
    // 是最后一个
    for(let i = 0; i < str.length;i++) {
      if (str[i] !== 'X') {
        if (!lights.has(i - 1) && !lights.has(i) && !lights.has(i+1)) {
          return Number.MAX_VALUE
        }
      }
    }
    return lights.size
  } else {
    const no = process(str, index + 1, new Set(lights))
    let yes = Number.MAX_VALUE;
    if (str[index] == '.') {
      lights.add(index)
      yes = process(str, index + 1, new Set(lights));
      lights.delete(index)
    }
    return Math.min(no, yes)
  }
}

function minLight2(road) {
  const str = [...road]
  let i = 0;
  let light = 0;
  while(i < str.length) {
    if (str[i] === 'X') {
      i++
    } else {
      // str[i] !== 'X'
      // 可能的情况 x + 1 == 'x', x + 2 !== 'x' 
      light++;
      if (i + 1 == str.length) {
        break
      } else {
        // 如果x + 1位置是x 
        if (str[i + 1] == 'X') {
          i = i + 2
        } else {
          // 加了3也能保证中间有两个并且都能照到
          i = i + 3
        }
      }
    }
  }
  return light
}

// 数两个x中间有多少个点除3 然后向上取整
function minLight3(road) {
  const str = road.split('')
  let cur = 0;
  let light = 0;

  for(const c of str) {
    if (c == 'X') {
      light += Math.ceil(cur / 3)
      cur = 0
    } else {
      cur++
    }
  }
  light += Math.ceil(cur / 3);
  return light
}

// for test
// 随机生成一个字符串
function generateRandomString(len) {
  const res = []
  const length = Math.floor(Math.random() * len) + 1
  for(let i = 0; i < length; i++) {
    res[i] = Math.random() < 0.5 ? '.' : 'X'
  }
  return res.join('')
}

function test() {
  const len = 20;
  const testTimes = 100000;
  for(let i = 0; i < testTimes; i++) {
    const testStr = generateRandomString(len)
    const ans1 = minLight1(testStr)
    const ans2 = minLight2(testStr)
    const ans3 = minLight3(testStr);
    if (ans1 !== ans2 || ans1 !== ans3) {
      console.log(testStr)
      console.log(ans1, ans2, ans3)
      break;
    }
  }
  console.log('finish')
}

test()