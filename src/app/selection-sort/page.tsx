"use client";
import Typography from "@/components/Typography";
import { useState } from "react";
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
  const router = useRouter();

  const setDataArr = () => {
    setData(fillDataArray(arrLength ? arrLength : 10));
    setSortIndex(0);
  };

  const step = async () => {
    let tempData: number[] = data;
    setStarted(true);
    for (let i = 0; i < tempData.length; i++) {
      tempData = selectionSortStep(tempData, i);
      setSortIndex(i);
      setData(tempData);
      await sleep(100);
    }
    setStarted(false);
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center p-24 py-24 space-y-4">
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
