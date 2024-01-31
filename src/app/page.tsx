"use client";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex h-screen flex-col items-center justify-center p-24 py-24 space-y-4">
      <Typography>Sorting Algorithms</Typography>
      <Button color="red" onClick={() => router.push("selection-sort/")}>
        Selection sort
      </Button>
      <Button color="green" onClick={() => router.push("bubble-sort/")}>
        Bubble sort
      </Button>
      <Button color="yellow" onClick={() => router.push("insertion-sort/")}>
        Insertion sort
      </Button>
    </main>
  );
}
