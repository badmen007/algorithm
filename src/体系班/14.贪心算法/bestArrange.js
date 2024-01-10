class Program {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
}

function bestArrange1(programs) {
  if (programs == null || programs.length == 0) {
    return 0;
  }
  return process(programs, 0, 0);
}

function process(programs, done, timeLine) {
  if (programs.length == 0) {
    return done;
  }
  let max = done;
  for (let i = 0; i < programs.length; i++) {
    if (timeLine < programs[i].start) {
      const next = copyButExcept(programs, i);
      max = Math.max(max, process(next, done + 1, programs[i].end));
    }
  }
  return max;
}

function copyButExcept(programs, index) {
  const next = [];
  for (let i = 0; i < programs.length; i++) {
    if (i !== index) {
      next.push(new Program(programs[i].start, programs[i].end));
    }
  }
  return next;
}

// 先按照会议的结束时间排序
// 定义一个timeLine表示的是满足条件的会议的结束时间，初始化为0
// 如果某个会议的开始时间小于等于
function bestArrange2(programs) {
  programs.sort((a, b) => a.end - b.end);
  let timeLine = 0;
  let result = 0;

  for (let i = 0; i < programs.length; i++) {
    if (timeLine <= programs[i].start) {
      timeLine = programs[i].end;
      result++;
    }
  }
  return result;
}


// for test
function generatePrograms(programSize, timeMax) {
  const programArr = new Array(Math.floor(Math.random() * programSize));
  for (let i = 0; i < programArr.length; i++) {
    let time1 = Math.random() * timeMax;
    let time2 = Math.random() * timeMax;
    if (time1 == time2) {
      programArr[i] = new Program(time1, time2 + 1);
    } else {
      programArr[i] = new Program(Math.min(time1, time2), Math.max(time1, time2));
    }
  }
  return programArr;
}

function test() {
  const programSize = 10;
  const timeMax = 24;
  const testTimes = 10000;
  for (let i = 0; i < testTimes; i++) {
    const programs = generatePrograms(programSize, timeMax);
    if (bestArrange1(programs) !== bestArrange2(programs)) {
      console.log(bestArrange1(programs));
      console.log(bestArrange2(programs));
      console.log(programs);
      break
    }
  }
  console.log('finish');
}

test();
