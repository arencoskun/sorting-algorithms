"use client";
import Typography from "@/components/Typography";
import { useEffect, useState } from "react";
import {
  EventCallbackInterface,
  StringOrNumberOrList,
  VictoryBar,
  VictoryBarProps,
} from "victory";
import { fillDataArray, selectionSortStep, swap } from "./utils";
import Button from "@/components/Button";

interface BarData {
  x: number;
  y: number;
}

export default function Home() {
  const [data, setData] = useState<Array<number>>();
  const [sortIndex, setSortIndex] = useState<number>(0);
  const [started, setStarted] = useState<boolean>(false);
  const [resetNeeded, setResetNeeded] = useState<boolean>(false);
  const [externalMutations, setExternalMutations] = useState<
    EventCallbackInterface<string | string[], StringOrNumberOrList>[]
  >([]);
  let interval: NodeJS.Timeout;

  useEffect(() => {
    if (data === undefined) setData(fillDataArray(20));
    if (resetNeeded) {
      setResetNeeded(false);
      setData(fillDataArray(20));
      setStarted(false);
      setSortIndex(0);
      clearInterval(interval);
      setExternalMutations([]);
    }
  }, [resetNeeded]);

  useEffect(() => {
    const step = () => {
      setExternalMutations([
        {
          target: "data",
          childName: "bar",
          eventKey: sortIndex.toString(),
          mutation: () => ({ style: { fill: "red" } }),
          callback: () => {
            setTimeout(() => {
              setExternalMutations([]);
            }, 500);
          },
        },
      ]);

      setData((prevData) => selectionSortStep(prevData!, sortIndex));
      if (sortIndex < 19) {
        setSortIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(interval);
      }
    };

    if (started) {
      //step();
      if (!interval) interval = setInterval(step, 1000);
    }

    return () => clearInterval(interval);
  }, [started, sortIndex]);

  const getBarData = (): BarData[] => {
    return (data || []).map(
      (_, index) => ({ x: index, y: data![index] } as BarData)
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Typography>Selection sort</Typography>
      <div className="flex flex-row space-x-4">
        <Button
          onClick={() => {
            setStarted(true);
          }}
        >
          Start
        </Button>
        <Button
          onClick={() => {
            setResetNeeded(true);
          }}
        >
          Reset
        </Button>
      </div>

      <VictoryBar
        name="bar"
        height={250}
        data={getBarData()}
        style={{
          data: {
            fill: (datum: any, index: number) =>
              index === sortIndex ? "red" : "grey",
          },
        }}
      ></VictoryBar>
    </main>
  );
}
