"use client";
import Typography from "@/components/Typography";
import { useState } from "react";
import { VictoryBar } from "victory";
import { bubbleSortStep, fillDataArray, sleep } from "../utils";
import Button from "@/components/Button";
import NumberPicker from "@/components/NumberPicker";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function Home() {
  const [data, setData] = useState<number[]>(fillDataArray(10));
  const [sortIndex, setSortIndex] = useState<number>(0);
  const [searchIndex, setSearchIndex] = useState<number>(0);
  const [arrLength, setArrLength] = useState<number>(0);
  const [started, setStarted] = useState<boolean>(false);
  const router = useRouter();

  const setDataArr = () => {
    setData(fillDataArray(arrLength ? arrLength : 10));
    setSortIndex(0);
  };

  const step = async () => {
    let tempData: number[] = data;
    let swapped: boolean = false;
    setStarted(true);
    for (let i = 0; i < tempData.length; i++) {
      swapped = false;
      for (let j = 0; j < tempData.length - i; j++) {
        var stepResult = bubbleSortStep(tempData, j);
        tempData = stepResult[0] as number[];
        swapped = stepResult[1] as boolean;
        //console.log(swapped);
        setSearchIndex(j);
        setSortIndex(i);
        setData(tempData);
        await sleep(0);
      }
      if (swapped === false && sortIndex > 1) break;
    }
    setStarted(false);
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center p-24 py-24 space-y-4">
      <Typography>Bubble sort</Typography>
      <div className="flex flex-row justify-center">
        <NumberPicker
          handleChange={(newValue: number) => setArrLength(newValue)}
          defaultValue={(arrLength ? arrLength : 10).toString()}
        />
      </div>
      <div className="flex flex-row space-x-4">
        <Button color="green" onClick={step} disabled={started}>
          Start
        </Button>
        <Button color="green" onClick={setDataArr} disabled={started}>
          Reset
        </Button>
        <Button color="yellow" onClick={() => router.push("/")}>
          Back
        </Button>
      </div>
      <VictoryBar
        name="bar"
        height={250}
        data={data}
        style={{
          data: {
            fill: ({ datum }) =>
              datum._x == sortIndex
                ? "green"
                : datum._x == searchIndex
                ? "blue"
                : "gray",
          },
        }}
      ></VictoryBar>
    </main>
  );
}
