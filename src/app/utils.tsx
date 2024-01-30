export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

export function compareArrays(a: Array<any>, b: Array<any>): boolean {
  return a.toString() === b.toString();
}

export function fillDataArray(
  length: number,
  boundaryBottom: number = 0,
  boundaryTop: number = 1000
): Array<number> {
  var array: Array<number> = [];

  for (var i = 0; i < length; i++) {
    array.push(getRandomNumber(boundaryBottom, boundaryTop));
  }
  return array;
}

export function swap(
  array: Array<number>,
  index1: number,
  index2: number
): Array<number> {
  var newArr = [...array];
  [newArr[index1], newArr[index2]] = [newArr[index2], newArr[index1]];
  return newArr;
}

export function selectionSortStep(
  data: Array<number>,
  i: number
): Array<number> {
  var newArr = [...data];
  var minValue;
  minValue = i;
  for (var j = i + 1; j < data.length; j++) {
    if (newArr[j] < newArr[minValue]) minValue = j;
  }

  newArr = swap(newArr, minValue, i);
  return newArr;
}

export function bubbleSortStep(data: Array<number>, i: number) {
  var newArr = [...data];
  var swapped = false;

  if (newArr[i] > newArr[i + 1]) {
    newArr = swap(newArr, i, i + 1);
    swapped = true;
  }
  return [newArr, swapped];
}

// export function bubbleSort(data: Array<number>): Array<number> {
//   var newArr = [...data];
//   for (let i = 0; i < newArr.length - 1; i++) {
//     for (let j = 0; j < newArr.length - i - 1; j++) {
//       newArr = bubbleSortStep(newArr, j);
//     }
//   }

//   return newArr;
// }

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
