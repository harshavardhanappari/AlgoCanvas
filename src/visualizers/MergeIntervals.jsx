import { useEffect, useState } from "react";

import algorithmInfo from "../data/algorithmInfo";

import AlgorithmInfo from "../components/AlgorithmInfo/AlgorithmInfo";
import PseudoCode from "../components/PseudoCode/PseudoCode";
import Statistics from "../components/Statistics/Statistics";
import CurrentStep from "../components/CurrentStep/CurrentStep";

const MergeIntervals = () => {
  const [intervals, setIntervals] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [compareIndex, setCompareIndex] = useState(-1);

  const [mergedIntervals, setMergedIntervals] = useState([]);

  const [isMerging, setIsMerging] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [comparisons, setComparisons] = useState(0);
  const [currentPass, setCurrentPass] = useState(0);

  const [speed, setSpeed] = useState(700);

  const [status, setStatus] = useState("Ready");
  const [activeLine, setActiveLine] = useState(-1);

  const [stepTitle, setStepTitle] =
    useState("Ready to Merge");

  const [reason, setReason] = useState(
    "Generate intervals and start the algorithm."
  );

  const [action, setAction] =
    useState("Waiting...");

  const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const generateIntervals = () => {
    if (isMerging) return;

    const count = Math.floor(
      Math.random() * 3
    ) + 5;

    const newIntervals = [];

    for (let i = 0; i < count; i++) {
      const start =
        Math.floor(Math.random() * 15);

      const end =
        start +
        Math.floor(Math.random() * 8) +
        2;

      newIntervals.push([start, end]);
    }

    setIntervals(newIntervals);

    setCurrentIndex(-1);
    setCompareIndex(-1);

    setMergedIntervals([]);

    setComparisons(0);
    setCurrentPass(0);

    setIsCompleted(false);

    setActiveLine(-1);

    setStatus("Ready");

    setStepTitle("Intervals Generated");

    setReason(
      "Intervals may overlap. The algorithm will first sort them and then merge overlapping intervals."
    );

    setAction("Ready to start");
  };

  useEffect(() => {
    generateIntervals();
  }, []);

  const resetVisualizer = () => {
    if (isMerging) return;

    setCurrentIndex(-1);
    setCompareIndex(-1);

    setMergedIntervals([]);

    setComparisons(0);
    setCurrentPass(0);

    setIsCompleted(false);

    setActiveLine(-1);

    setStatus("Ready");

    setStepTitle("Ready to Merge Again");

    setReason(
      "The same intervals can be processed again."
    );

    setAction("Click Start Merge");
  };

  const startMerge = async () => {
    if (
      isMerging ||
      isCompleted ||
      intervals.length === 0
    ) {
      return;
    }

    setIsMerging(true);

    setStatus("Merging...");

    let sortedIntervals = [...intervals].sort(
      (a, b) => a[0] - b[0]
    );

    setActiveLine(0);

    setStepTitle("Sorting Intervals");

    setReason(
      "Intervals are sorted according to their starting values."
    );

    setAction("Sort by start value");

    await sleep(speed);

    setIntervals([...sortedIntervals]);

    await sleep(speed);

    setActiveLine(1);

    setStepTitle("Create Merged Array");

    setReason(
      "An empty array is created to store the final merged intervals."
    );

    setAction("Initialize merged array");

    await sleep(speed);

    const result = [];

    for (
      let i = 0;
      i < sortedIntervals.length;
      i++
    ) {
      setCurrentIndex(i);

      setCompareIndex(-1);

      setCurrentPass(i + 1);

      setActiveLine(2);

      setStepTitle(
        `Processing Interval [${sortedIntervals[i][0]}, ${sortedIntervals[i][1]}]`
      );

      setReason(
        "The current interval is compared with the last merged interval."
      );

      setAction("Process interval");

      await sleep(speed);

      if (result.length === 0) {
        setActiveLine(3);

        setStepTitle("First Interval");

        setReason(
          "The merged list is empty, so the first interval is added."
        );

        setAction("Add interval");

        result.push([...sortedIntervals[i]]);

        setMergedIntervals([...result]);

        await sleep(speed);

        continue;
      }

      const last =
        result[result.length - 1];

      setCompareIndex(i);

      setActiveLine(3);

      setComparisons(
        (previous) => previous + 1
      );

      setStepTitle("Checking Overlap");

      setReason(
        `Compare the current start value ${sortedIntervals[i][0]} with the previous merged end value ${last[1]}.`
      );

      setAction("Check for overlap");

      await sleep(speed);

      if (sortedIntervals[i][0] <= last[1]) {
        setActiveLine(5);

        setStepTitle("Intervals Overlap");

        setReason(
          `The intervals overlap because ${sortedIntervals[i][0]} is less than or equal to ${last[1]}.`
        );

        setAction("Merge intervals");

        await sleep(speed);

        last[1] = Math.max(
          last[1],
          sortedIntervals[i][1]
        );

        setMergedIntervals([...result]);

        setStepTitle("Intervals Merged");

        setReason(
          `The merged interval is now [${last[0]}, ${last[1]}].`
        );

        setAction("Update merged interval");

        await sleep(speed);
      } else {
        setActiveLine(4);

        setStepTitle("No Overlap");

        setReason(
          "The current interval does not overlap with the previous merged interval, so it is added separately."
        );

        setAction("Add new interval");

        result.push([...sortedIntervals[i]]);

        setMergedIntervals([...result]);

        await sleep(speed);
      }
    }

    setCurrentIndex(-1);
    setCompareIndex(-1);

    setActiveLine(6);

    setStepTitle("Merging Completed!");

    setReason(
      "All overlapping intervals have been combined successfully."
    );

    setAction("Finished");

    setStatus("Completed");

    setIsCompleted(true);

    setIsMerging(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">

      {/* HEADER */}

      <h1 className="text-4xl font-bold text-gray-900">
        Merge Intervals
      </h1>

      <p className="mt-3 text-lg text-gray-600">
        Sort intervals and combine the ones that overlap.
      </p>

      {/* ALGORITHM INFO */}

      <AlgorithmInfo
        info={algorithmInfo.mergeIntervals}
      />

      {/* PSEUDOCODE */}

      <PseudoCode
        code={algorithmInfo.mergeIntervals.pseudoCode}
        activeLine={activeLine}
      />

      {/* CONTROLS */}

      <div className="mt-10 flex flex-wrap items-center gap-4">

        <button
          disabled={
            isMerging ||
            isCompleted
          }
          onClick={startMerge}
          className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-300"
        >
          {isMerging
            ? "Merging..."
            : isCompleted
              ? "Completed"
              : "Start Merge"}
        </button>

        <button
          disabled={isMerging}
          onClick={resetVisualizer}
          className="rounded-xl border border-orange-500 px-6 py-3 font-semibold text-orange-500 hover:bg-orange-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
        >
          Reset
        </button>

        <button
          disabled={isMerging}
          onClick={generateIntervals}
          className="rounded-xl border border-violet-600 px-6 py-3 font-semibold text-violet-600 hover:bg-violet-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
        >
          Generate New Intervals
        </button>

      </div>

      {/* PROGRESS */}

      <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">

        <div className="grid gap-6 sm:grid-cols-3">

          <div>
            <p className="text-sm font-medium text-gray-500">
              Current Interval
            </p>

            <p className="mt-1 text-3xl font-bold text-blue-600">
              {currentIndex === -1
                ? "—"
                : currentIndex}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              Comparisons
            </p>

            <p className="mt-1 text-3xl font-bold text-orange-500">
              {comparisons}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              Merged Intervals
            </p>

            <p className="mt-1 text-3xl font-bold text-green-600">
              {mergedIntervals.length}
            </p>
          </div>

        </div>

      </div>

      {/* STATISTICS */}

      <Statistics
        comparisons={comparisons}
        swaps={0}
        currentPass={currentPass}
        status={status}
      />

      {/* ORIGINAL INTERVALS */}

      <div className="mt-10 rounded-2xl border bg-gray-50 p-8">

        <h2 className="mb-6 text-center text-xl font-bold text-gray-800">
          Intervals
        </h2>

        <div className="flex flex-wrap justify-center gap-4">

          {intervals.map(
            (interval, index) => {
              const isCurrent =
                index === currentIndex;

              let style =
                "border-violet-300 bg-violet-100 text-violet-800";

              if (isCurrent) {
                style =
                  "scale-110 border-orange-600 bg-orange-500 text-white shadow-lg";
              }

              return (
                <div
                  key={index}
                  className="flex flex-col items-center"
                >
                  <div
                    className={`rounded-xl border-2 px-6 py-4 text-xl font-bold transition-all duration-300 ${style}`}
                  >
                    [{interval[0]}, {interval[1]}]
                  </div>

                  <div className="mt-2 text-sm text-gray-400">
                    Index {index}
                  </div>
                </div>
              );
            }
          )}

        </div>

      </div>

      {/* MERGED RESULT */}

      <div className="mt-8 rounded-2xl border bg-green-50 p-8">

        <h2 className="mb-6 text-center text-xl font-bold text-green-800">
          Merged Intervals
        </h2>

        {mergedIntervals.length === 0 ? (
          <p className="text-center text-gray-500">
            Merged intervals will appear here.
          </p>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">

            {mergedIntervals.map(
              (interval, index) => (
                <div
                  key={index}
                  className="rounded-xl border-2 border-green-600 bg-green-500 px-6 py-4 text-xl font-bold text-white shadow-md"
                >
                  [{interval[0]}, {interval[1]}]
                </div>
              )
            )}

          </div>
        )}

      </div>

      {/* LEGEND */}

      <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-600">

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-violet-300" />
          Unprocessed
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-orange-500" />
          Current Interval
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-green-500" />
          Merged Result
        </div>

      </div>

      {/* SPEED */}

      <div className="mt-10">

        <label className="mb-2 block font-semibold text-gray-700">
          Animation Speed
        </label>

        <input
          type="range"
          min="200"
          max="1500"
          step="100"
          value={speed}
          disabled={isMerging}
          onChange={(e) =>
            setSpeed(
              Number(e.target.value)
            )
          }
          className="w-full"
        />

      </div>

      {/* CURRENT STEP */}

      <CurrentStep
        title={stepTitle}
        reason={reason}
        action={action}
      />

    </div>
  );
};

export default MergeIntervals;