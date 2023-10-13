
function bubbleSort(arr) {
    if (arr === null || arr.length < 2) return
    // 0 ~ N-1
    // 0 ~ N-2
    // 0 ~ N-3
    // 0 ~ N-i
    for( let end = arr.length - 1; end > 0; end--) {
        // 01 12 23 34 45...end-1 end
        for (let second = 1; second <= end; second++) {
            if (arr[second - 1] > arr[second]) {
                swap(arr, second - 1, second)
            }
        }
    }
}

function swap(arr, i, j) {
    const temp = arr[j]
    arr[i] = arr[j]
    arr[j] = temp
}

const arr = [ 8, 1 ,3 ,5, 1, 6, 8, 1, 3, 5, 7]
console.log(arr)
bubbleSort(arr)
console.log(arr)

// 冒泡排序就是 拿前一项和后一项比较，前一项比后一项大救交换，因为一轮循环结束后都有一个最大的出现，所以第一层循环是从最后面往最前面走的