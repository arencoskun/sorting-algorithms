export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
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

export function swap(array: Array<number>, index1: number, index2: number): Array<number> {
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


// 34, 21, 56, 11, 89
// 11, 21, 56, 34, 89
// 11, 21, 34, 56, 89
