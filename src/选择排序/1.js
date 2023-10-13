// 选择排序就是双层for循环 第一层便遍历整个数组，第二层是从比第一层多一项开始遍历 找到那个最小的 然后换位置
function selectSort(arr) {
    if (arr === null || arr.length < 2) return;
    const N = arr.length;
    for( let i = 0; i < N; i++ ) { // 最外层就是遍历整个数组
        let minValueIndex = i; // 定义最小值的下标
        for (let j = i + 1; j < N; j++) {
            minValueIndex = arr[j] < arr[minValueIndex] ? j : minValueIndex
        }
        swap(arr, i, minValueIndex)
    }
}

function swap(arr, i, j) {
    const temp = arr[j]
    arr[i] = arr[j]
    arr[j] = temp
}

const arr = [ 8, 1 ,3 ,5, 1, 6, 8, 1, 3, 5, 7]
console.log(arr)
selectSort(arr)
console.log(arr)