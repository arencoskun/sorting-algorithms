"use client";
import Typography from "@/components/Typography";
import { useEffect, useState } from "react";
import { VictoryBar } from "victory";
import { fillDataArray, mergeSort, resetMergeSortStats, sleep } from "../utils";
import Button from "@/components/Button";
import NumberPicker from "@/components/NumberPicker";
import { useRouter } from "next/navigation";
import TypographyCheckbox from "@/components/TypographyCheckbox";

export default function Home() {
  const [data, setData] = useState<number[]>(fillDataArray(10));
  const [sortIndex, setSortIndex] = useState<number>(0);
  const [arrLength, setArrLength] = useState<number>(0);
  const [started, setStarted] = useState<boolean>(false);
  const [slow, setSlow] = useState<boolean>(true);
  const [iterCount, setIterCount] = useState<number>(0);
  const [arrayAccessCount, setArrayAccessCount] = useState<number>(0);
  const [swapCount, setSwapCount] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    setDataArr();
  }, [arrLength]);

  const setDataArr = () => {
    setData(fillDataArray(arrLength ? arrLength : 10));
    setSortIndex(0);
    setIterCount(0);
    setArrayAccessCount(0);
    setSwapCount(0);
    resetMergeSortStats();
  };

  const step = async () => {
    let tempData: number[] = data;
    setStarted(true);
    await mergeSort(
      tempData,
      setData,
      setSortIndex,
      setIterCount,
      iterCount,
      setArrayAccessCount,
      arrayAccessCount,
      setSwapCount,
      swapCount,
      slow
    );
    setStarted(false);
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center p-24 py-32 space-y-4">
      <Typography>Merge sort</Typography>
      <div className="flex flex-row justify-center space-x-4">
        <NumberPicker
          handleChange={(newValue: number) => setArrLength(newValue)}
          defaultValue={(arrLength ? arrLength : 10).toString()}
        />
        <TypographyCheckbox
          handleChange={(newValue: boolean) => setSlow(newValue)}
          valueOverrideState={slow}
          disabled={started}
        >
          Slow
        </TypographyCheckbox>
      </div>
      <div className="flex flex-row space-x-4">
        <Button color="blue" onClick={step} disabled={started}>
          Start
        </Button>
        <Button color="blue" onClick={setDataArr} disabled={started}>
          Reset
        </Button>
        <Button color="yellow" onClick={() => router.push("/")}>
          Back
        </Button>
      </div>
      <Typography>
        {iterCount} iterations, {arrayAccessCount} array accesses, {swapCount}{" "}
        swaps
      </Typography>
      <VictoryBar
        name="bar"
        height={250}
        data={data}
        style={{
          data: {
            fill: ({ datum }) => (datum._x == sortIndex ? "#03d7fc" : "gray"),
          },
        }}
      ></VictoryBar>
    </main>
  );
}
