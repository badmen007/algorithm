class Student {
  constructor(name, id, age) {
    this.name = name;
    this.id = id;
    this.age = age;
  }
}

class IdShengAgeJiangOrder {
  compare(o1, o2) {
    return o1.id !== o2.id ? o1.id - o2.id : o2.age - o1.age;
  }
}

class IdAscendingComparator {
  compare(o1, o2) {
    return o1.id - o2.id;
  }
}

class IdDescendingComparator {
  compare(o1, o2) {
    return o2.id - o1.id;
  }
}

class IdInAgeDe {
  compare(o1, o2) {
    return o1.id !== o2.id ? o1.id - o2.id : o2.age - o1.age;
  }
}

class MyComp {
  compare(o1, o2) {
    return o2 - o1;
  }
}

class AComp {
  compare(arg0, arg1) {
    return arg1 - arg0;
  }
}

function printArray(arr) {
  if (!arr) {
    return;
  }
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i] + " ");
  }
  console.log();
}

const arr = [5, 4, 3, 2, 7, 9, 1, 0];
arr.sort(new AComp().compare);
printArray(arr);

console.log("===========================");

const student1 = new Student("A", 4, 40);
const student2 = new Student("B", 4, 21);
const student3 = new Student("C", 3, 12);
const student4 = new Student("D", 3, 62);
const student5 = new Student("E", 3, 42);

const students = [student1, student2, student3, student4, student5];
console.log("第一条打印");

students.sort(new IdShengAgeJiangOrder().compare);
for (let i = 0; i < students.length; i++) {
  const s = students[i];
  console.log(s.name + "," + s.id + "," + s.age);
}

console.log("第二条打印");
const studentList = [student1, student2, student3, student4, student5];
studentList.sort(new IdShengAgeJiangOrder().compare);
for (let i = 0; i < studentList.length; i++) {
  const s = studentList[i];
  console.log(s.name + "," + s.id + "," + s.age);
}

console.log("第三条打印");
const treeMap = new Map();
treeMap.set(student1, "我是学生1，我的名字叫A");
treeMap.set(student2, "我是学生2，我的名字叫B");
treeMap.set(student3, "我是学生3，我的名字叫C");
treeMap.set(student4, "我是学生4，我的名字叫D");
treeMap.set(student5, "我是学生5，我的名字叫E");


const sortedTreeMap = new Map(
  [...treeMap.entries()].sort((a, b) => a[0].id - b[0].id)
);
for (const [key, value] of sortedTreeMap.entries()) {
  console.log(key.name + "," + key.id + "," + key.age);
}
