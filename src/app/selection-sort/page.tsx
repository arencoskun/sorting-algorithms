"use client";
import Typography from "@/components/Typography";
import { useEffect, useState } from "react";
import { VictoryBar } from "victory";
import { fillDataArray, selectionSortStep, sleep } from "../utils";
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

  useEffect(() => {
    setDataArr();
  }, [arrLength]);

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
    for (let i = 0; i < tempData.length; i++) {
      var output = selectionSortStep(tempData, i);
      tempData = output[0] as Array<number>;
      var newIterCount = output[1] as number;
      var newAccessCount = output[2] as number;
      var newswapCount = output[3] as number;
      tempIterCount += newIterCount + 1;
      tempAccessCount += newAccessCount;
      tempSwapCount += newswapCount;
      console.log(newIterCount);
      setSortIndex(i);
      setIterCount(tempIterCount);
      setArrayAccessCount(tempAccessCount);
      setData(tempData);
      setSwapCount(tempSwapCount);
      await sleep(100);
    }
    setStarted(false);
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center p-24 py-32 space-y-4">
      <Typography>Selection sort</Typography>
      <div className="flex flex-row justify-center">
        <NumberPicker
          handleChange={(newValue: number) => setArrLength(newValue)}
          defaultValue={(arrLength ? arrLength : 10).toString()}
        />
      </div>
      <div className="flex flex-row space-x-4">
        <Button color="red" onClick={step} disabled={started}>
          Start
        </Button>
        <Button color="red" onClick={setDataArr} disabled={started}>
          Reset
        </Button>
        <Button color="yellow" onClick={() => router.back()}>
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
            fill: ({ datum }) => (datum._x == sortIndex ? "red" : "gray"),
          },
        }}
      ></VictoryBar>
    </main>
  );
}
