"use client";

import Button from "@/components/Button";
import Typography from "@/components/Typography";
import { VictoryBar } from "victory";

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center">
      <div className="absolute top-4 left-14 bg-red-400 rounded-lg">
        <Typography className="p-2">Selection sort</Typography>
        <VictoryBar />
      </div>

      <div className="absolute top-4 right-14 bg-green-400 rounded-lg">
        <Typography className="p-2">Bubble sort</Typography>
        <VictoryBar />
      </div>

      <div className="absolute bottom-4 left-14 bg-blue-400 rounded-lg">
        <Typography className="p-2">Merge sort</Typography>
        <VictoryBar />
      </div>

      <div className="absolute bottom-4 right-14 bg-yellow-400 rounded-lg">
        <Typography className="p-2">Insertion sort</Typography>
        <VictoryBar />
      </div>

      <div className="absolute space-x-4">
        <Button color="blue">Start</Button>
        <Button color="yellow">Back</Button>
      </div>
    </main>
  );
}
