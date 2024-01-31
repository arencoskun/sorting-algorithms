"use client";
import Typography from "@/components/Typography";
import { useState } from "react";
import { VictoryBar } from "victory";
import { fillDataArray, sleep, insertionSortStep } from "../utils";
import Button from "@/components/Button";
import NumberPicker from "@/components/NumberPicker";
import { useRouter } from "next/navigation";

export default function Home() {
  const [data, setData] = useState<number[]>(fillDataArray(10));
  const [sortIndex, setSortIndex] = useState<number>(0);
  const [arrLength, setArrLength] = useState<number>(0);
  const [started, setStarted] = useState<boolean>(false);
  const [iterCount, setIterCount] = useState<number>(0);
  const [arrayAccessCount, setArrayAccessCount] = useState<number>(0);
  const [swapCount, setSwapCount] = useState<number>(0);
  const router = useRouter();

  const setDataArr = () => {
    setData(fillDataArray(arrLength ? arrLength : 10));
    setSortIndex(0);
    setIterCount(0);
    setArrayAccessCount(0);
    setSwapCount(0);
  };

  const step = async () => {
    let tempData: number[] = data;
    let tempIterCount: number = 0;
    let tempAccessCount: number = 0;
    let tempSwapCount: number = 0;
    setStarted(true);
    for (var i = 1; i < tempData.length; i++) {
      var output = insertionSortStep(tempData, i);
      tempData = output[0] as Array<number>;
      tempIterCount += output[1] as number;
      tempAccessCount += output[2] as number;
      tempSwapCount += output[3] as number;

      setSortIndex(i);
      setIterCount(tempIterCount);
      setArrayAccessCount(tempAccessCount);
      setSwapCount(tempSwapCount);
      setData(tempData);
      await sleep(100);
      tempIterCount++;
    }
    setStarted(false);
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center p-24 py-32 space-y-4">
      <Typography>Insertion sort</Typography>
      <div className="flex flex-row justify-center">
        <NumberPicker
          handleChange={(newValue: number) => setArrLength(newValue)}
          defaultValue={(arrLength ? arrLength : 10).toString()}
        />
      </div>
      <div className="flex flex-row space-x-4">
        <Button color="yellow" onClick={step} disabled={started}>
          Start
        </Button>
        <Button color="yellow" onClick={setDataArr} disabled={started}>
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
            fill: ({ datum }) => (datum._x == sortIndex ? "#d9db48" : "gray"),
          },
        }}
      ></VictoryBar>
    </main>
  );
}
