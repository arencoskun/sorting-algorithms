"use client";
import Typography from "@/components/Typography";
import { useEffect, useState } from "react";
import {
  VictoryBar,
} from "victory";
import { fillDataArray, selectionSortStep } from "./utils";
import Button from "@/components/Button";
import NumberPicker from "@/components/NumberPicker";

const Home = () => {
  const [data, setData] = useState<number[]>(fillDataArray(200))
  const [sortIndex, setSortIndex] = useState<number>(0)
  const [arrLength, setArrLength] = useState(0)

  const setDataArr = () => {
    setData(fillDataArray(arrLength))
    setSortIndex(0)
  }

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const step = async () => {
    let tempData: number[] = data;
    for (let i = 0; i < tempData.length; i++) {
      tempData = (selectionSortStep(tempData, i))
      setSortIndex(i);
      setData(tempData);
      await sleep(100);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Typography>Selection sort</Typography>
      <NumberPicker setInp={setArrLength} />
      <div className="flex flex-row space-x-4">
        <Button
          onClick={step}
        >
          Start
        </Button>
        <Button
          onClick={() => setDataArr()}
        >
          Reset
        </Button>
      </div>
      <VictoryBar
        name="bar"
        height={250}
        data={data}
        style={{
          data: {
            fill: ({ datum }) => datum._x == sortIndex ? "red" : "gray",
            fillOpacity: 0.7,
            strokeWidth: 3
          },
        }}
      ></VictoryBar>
    </main>
  );
}

export default Home