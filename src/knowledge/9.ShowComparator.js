class Student {
  constructor(name, id, age) {
    this.name = name;
    this.age = age;
    this.id = id;
  }
}

const studentArr = [
  ["章三", 3, 20],
  ["李思", 1, 10],
  ["王武", 4, 21],
  ["找刘", 2, 18],
];

const arr = [];

for(let value of studentArr) {
  arr.push(new Student(...value))
}


function compareId(o1, o2) {
  if (o1.id === o2.id) {
    return 0;
  }
  return o1.id < o2.id ? -1 : 1;
}

function printArr(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i].name + " " + arr[i].id + " " + arr[i].age);
  }
}

printArr(arr)
arr.sort(compareId);
console.log('--------------')
printArr(arr)