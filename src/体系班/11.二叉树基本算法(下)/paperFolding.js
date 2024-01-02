/**
 *
 * @param {*} N 对折多少次
 */
function printAllFolds(N) {
  process(1, N, true);
}

function process(i, N, down) {
  if (i > N) {
    return;
  }
  process(i + 1, N, true);
  console.log(down ? "凹" : "凸");
  process(i + 1, N, false);
}

const N = 4;
printAllFolds(N);
