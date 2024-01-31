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

export function selectionSortStep(data: Array<number>, i: number): Array<any> {
  var newArr = [...data];
  var minValue;
  minValue = i;
  var iterCount = 0;
  var accessCount = 0;
  var swapCount = 0;
  for (var j = i + 1; j < data.length; j++) {
    if (newArr[j] < newArr[minValue]) {
      minValue = j;
      swapCount++;
    }
    iterCount++;
    accessCount += 2;
  }
  newArr = swap(newArr, minValue, i);
  accessCount += 6;
  return [newArr, iterCount, accessCount, swapCount];
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

export function insertionSortStep(data: Array<number>, i: number): Array<any> {
  var newArr: Array<number> = [...data];
  var iterCount: number = 0;
  var accessCount: number = 0;
  var swapCount: number = 0;
  while (i > 0 && newArr[i - 1] > newArr[i]) {
    newArr = swap(newArr, i, i - 1);
    accessCount += 8;
    swapCount++;
    iterCount++;
    i--;
  }
  return [newArr, iterCount, accessCount, swapCount];
}

var _iterCount: number = 0;
var _arrayAccessCount: number = 0;
var _swapCount: number = 0;

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
      _swapCount++;
      setSortIndex(leftIndex);
      leftIndex++;
      _iterCount++;
      _arrayAccessCount += 3;
    } else {
      newArr.push(right[rightIndex]);
      _swapCount++;
      setSortIndex(rightIndex);
      rightIndex++;
      _iterCount++;
      _arrayAccessCount += 1;
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
  setIterCount: (newValue: number) => void,
  iterCount: number,
  setArrayAccessCount: (newValue: number) => void,
  arrayAccessCount: number,
  setSwapCount: (newValue: number) => void,
  swapCount: number,
  slow: boolean
): Promise<Array<number>> {
  if (data.length <= 1) {
    return data;
  }

  const middle = Math.floor(data.length / 2);
  const left = data.slice(0, middle);
  const right = data.slice(middle);

  var res = merge(
    await mergeSort(
      left,
      setData,
      setSortIndex,
      setIterCount,
      iterCount,
      setArrayAccessCount,
      arrayAccessCount,
      setSwapCount,
      swapCount,
      slow
    ),
    await mergeSort(
      right,
      setData,
      setSortIndex,
      setIterCount,
      iterCount,
      setArrayAccessCount,
      arrayAccessCount,
      setSwapCount,
      swapCount,
      slow
    ),
    setData,
    setSortIndex,
    slow
  );

  setSwapCount(_swapCount);
  setArrayAccessCount(_arrayAccessCount);
  setIterCount(_iterCount);

  return res;
}

export function resetMergeSortStats() {
  _iterCount = 0;
  _arrayAccessCount = 0;
  _swapCount = 0;
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
