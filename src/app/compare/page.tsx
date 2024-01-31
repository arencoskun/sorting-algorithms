"use client";

import Button from "@/components/Button";
import Typography from "@/components/Typography";
import { useState } from "react";
import { VictoryBar } from "victory";
import {
  bubbleSortStep,
  fillDataArray,
  insertionSortStep,
  mergeSort,
  selectionSortStep,
  sleep,
} from "../utils";
import { useRouter } from "next/navigation";
import NumberPicker from "@/components/NumberPicker";

export default function Home() {
  const initialData = fillDataArray(100);
  const [selectionSortData, setSelectionSortData] =
    useState<Array<number>>(initialData);
  const [selectionSortIndex, setSelectionSortIndex] = useState<number>(0);
  const [bubbleSortData, setBubbleSortData] =
    useState<Array<number>>(initialData);
  const [bubbleSortIndex, setBubbleSortIndex] = useState<number>(0);
  const [bubbleSearchIndex, setBubbleSearchIndex] = useState<number>(0);
  const [mergeSortData, setMergeSortData] =
    useState<Array<number>>(initialData);
  const [mergeSortIndex, setMergeSortIndex] = useState<number>(0);
  const [insertionSortData, setInsertionSortData] =
    useState<Array<number>>(initialData);
  const [insertionSortIndex, setInsertionSortIndex] = useState<number>(0);
  const [arrLength, setArrLength] = useState<number>(100);

  const [selectionSortStarted, setSelectionSortStarted] =
    useState<boolean>(false);
  const [bubbleSortStarted, setBubbleSortStarted] = useState<boolean>(false);
  const [mergeSortStarted, setMergeSortStarted] = useState<boolean>(false);
  const [insertionSortStarted, setInsertionSortStarted] =
    useState<boolean>(false);

  const router = useRouter();

  function setAllData(data: Array<number>) {
    setSelectionSortData(data);
    setBubbleSortData(data);
    setMergeSortData(data);
    setInsertionSortData(data);
    setSelectionSortIndex(0);
    setBubbleSortIndex(0);
    setBubbleSearchIndex(0);
    setMergeSortIndex(0);
  }

  async function startSelectionSort() {
    setSelectionSortStarted(true);
    let tempData: number[] = selectionSortData;
    for (let i = 0; i < tempData.length; i++) {
      var output = selectionSortStep(tempData, i);
      tempData = output[0] as Array<number>;
      setSelectionSortIndex(i);
      setSelectionSortData(tempData);
      await sleep(100);
    }
    setSelectionSortStarted(false);
  }

  async function startBubbleSort() {
    setBubbleSortStarted(true);
    let tempData: number[] = bubbleSortData;
    let swapped: boolean = false;
    for (let i = 0; i < tempData.length; i++) {
      swapped = false;
      for (let j = 0; j < tempData.length - i; j++) {
        var stepResult = bubbleSortStep(tempData, j);
        tempData = stepResult[0] as number[];
        setBubbleSearchIndex(j);
        setBubbleSortIndex(i);
        setBubbleSortData(tempData);
        await sleep(100);
      }
      if (swapped === false && bubbleSortIndex > 1) break;
    }
    setBubbleSortStarted(false);
  }

  async function startMergeSort() {
    setMergeSortStarted(true);
    let tempData: number[] = mergeSortData;
    await mergeSort(tempData, setMergeSortData, setMergeSortIndex);
    setMergeSortStarted(false);
  }

  async function startInsertionSort() {
    setInsertionSortStarted(true);
    let tempData: number[] = insertionSortData;
    for (var i = 1; i < tempData.length; i++) {
      var output = insertionSortStep(tempData, i);
      tempData = output[0] as Array<number>;

      setInsertionSortIndex(i);
      setInsertionSortData(tempData);
      await sleep(100);
    }
    setInsertionSortStarted(false);
  }

  function startAllSorts() {
    startSelectionSort();
    startBubbleSort();
    startMergeSort();
    startInsertionSort();
  }

  const setDataArr = () => {
    setAllData(fillDataArray(arrLength));
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center">
      <div className="absolute top-4 left-14 bg-red-400 rounded-lg">
        <Typography className="p-2">Selection sort</Typography>
        <VictoryBar
          data={selectionSortData}
          style={{
            data: {
              fill: ({ datum }) =>
                datum._x == selectionSortIndex ? "red" : "#252525",
            },
          }}
        />
      </div>

      <div className="absolute top-4 right-14 bg-green-400 rounded-lg">
        <Typography className="p-2">Bubble sort</Typography>
        <VictoryBar
          data={bubbleSortData}
          style={{
            data: {
              fill: ({ datum }) =>
                datum._x == bubbleSortIndex
                  ? "green"
                  : datum._x == bubbleSearchIndex
                  ? "blue"
                  : "#252525",
            },
          }}
        />
      </div>

      <div className="absolute bottom-4 left-14 bg-blue-400 rounded-lg">
        <Typography className="p-2">Merge sort</Typography>
        <VictoryBar
          data={mergeSortData}
          style={{
            data: {
              fill: ({ datum }) =>
                datum._x == mergeSortIndex ? "#03d7fc" : "#252525",
            },
          }}
        />
      </div>

      <div className="absolute bottom-4 right-14 bg-yellow-400 rounded-lg">
        <Typography className="p-2">Insertion sort</Typography>
        <VictoryBar
          data={insertionSortData}
          style={{
            data: {
              fill: ({ datum }) =>
                datum._x == insertionSortIndex ? "#dedc52" : "#252525",
            },
          }}
        />
      </div>
      <div className="mb-28 w-full">
        <NumberPicker
          className="text-center"
          handleChange={(newNumber) => setArrLength(newNumber)}
          defaultValue={arrLength.toString()}
          minValue={10}
          maxValue={10000}
        />
      </div>
      <div className="absolute space-x-4">
        <Button
          color="slate"
          onClick={startAllSorts}
          disabled={
            selectionSortStarted ||
            bubbleSortStarted ||
            mergeSortStarted ||
            insertionSortStarted
          }
        >
          Start
        </Button>
        <Button
          color="slate"
          onClick={setDataArr}
          disabled={
            selectionSortStarted ||
            bubbleSortStarted ||
            mergeSortStarted ||
            insertionSortStarted
          }
        >
          Reset
        </Button>
        <Button color="yellow" onClick={() => router.push("/")}>
          Back
        </Button>
      </div>
    </main>
  );
}
