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

export function bubbleSortStep(data: Array<number>, i: number): Array<any> {
  var newArr = [...data];
  var swapped = false;

  if (newArr[i] > newArr[i + 1]) {
    newArr = swap(newArr, i, i + 1);
    swapped = true;
  }
  return [newArr, swapped];
}

export function insertionSortStep(
  data: Array<number>,
  i: number
): Array<number> {
  var newArr: Array<number> = [...data];
  while (i > 0 && newArr[i - 1] > newArr[i]) {
    newArr = swap(newArr, i, i - 1);
    i--;
  }
  return newArr;
}

async function merge(
  left: Array<number>,
  right: Array<number>,
  setData: (newValue: Array<number>) => void,
  setSortIndex: (newValue: number) => void,
  slow: boolean
): Promise<Array<number>> {
  var newArr: Array<number> = [];
  var leftIndex: number = 0;
  var rightIndex: number = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      newArr.push(left[leftIndex]);
      setSortIndex(leftIndex);
      leftIndex++;
    } else {
      newArr.push(right[rightIndex]);
      setSortIndex(rightIndex);
      rightIndex++;
    }
  }
  setData(newArr.concat(left.slice(leftIndex)).concat(right.slice(rightIndex)));
  await sleep(slow ? 500 : 100);
  return newArr.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

export async function mergeSort(
  data: Array<number>,
  setData: (newValue: Array<number>) => void,
  setSortIndex: (newValue: number) => void,
  slow: boolean
): Promise<Array<number>> {
  if (data.length <= 1) {
    return data;
  }

  const middle = Math.floor(data.length / 2);
  const left = data.slice(0, middle);
  const right = data.slice(middle);

  return merge(
    await mergeSort(left, setData, setSortIndex, slow),
    await mergeSort(right, setData, setSortIndex, slow),
    setData,
    setSortIndex,
    slow
  );
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
