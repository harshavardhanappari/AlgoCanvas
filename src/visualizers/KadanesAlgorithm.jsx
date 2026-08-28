import { useEffect, useState } from "react";

import algorithmInfo from "../data/algorithmInfo";

import AlgorithmInfo from "../components/AlgorithmInfo/AlgorithmInfo";
import PseudoCode from "../components/PseudoCode/PseudoCode";
import Statistics from "../components/Statistics/Statistics";
import CurrentStep from "../components/CurrentStep/CurrentStep";

const KadanesAlgorithm = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(10);
  const [speed, setSpeed] = useState(200);

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [activeLine, setActiveLine] = useState(-1);

  const [currentSum, setCurrentSum] = useState(0);
  const [maxSum, setMaxSum] = useState(0);

  const [bestStart, setBestStart] = useState(-1);
  const [bestEnd, setBestEnd] = useState(-1);

  const [currentStart, setCurrentStart] = useState(0);

  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [status, setStatus] = useState("Ready");

  const [stepTitle, setStepTitle] =
    useState("Ready to Start");

  const [reason, setReason] = useState(
    "Generate an array and find the maximum sum subarray."
  );

  const [action, setAction] =
    useState("Waiting...");

  const sleep = (ms) =>
    new Promise((resolve) =>
      setTimeout(resolve, ms)
    );

  const generateArray = (size) => {
    if (isRunning) return;

    const newArray = Array.from(
      { length: size },
      () => Math.floor(Math.random() * 21) - 10
    );

    setArray(newArray);

    setCurrentIndex(-1);
    setActiveLine(-1);

    setCurrentSum(0);
    setMaxSum(0);

    setBestStart(-1);
    setBestEnd(-1);

    setCurrentStart(0);

    setIsCompleted(false);

    setStatus("Ready");

    setStepTitle("Ready to Start");

    setReason(
      "Kadane's Algorithm finds the contiguous subarray with the maximum sum."
    );

    setAction("Waiting...");
  };

  useEffect(() => {
    generateArray(arraySize);
  }, [arraySize]);

  const reset = () => {
    if (isRunning) return;

    generateArray(arraySize);
  };

  const startKadane = async () => {
    if (
      isRunning ||
      array.length === 0
    ) {
      return;
    }

    /*
      Reset algorithm state.

      This allows the algorithm to run again
      on the exact same array.
    */

    setIsCompleted(false);

    setCurrentIndex(-1);
    setActiveLine(-1);

    setCurrentSum(0);
    setMaxSum(0);

    setBestStart(-1);
    setBestEnd(-1);

    setCurrentStart(0);

    setIsRunning(true);
    setStatus("Running...");

    let localCurrentSum = array[0];
    let localMaxSum = array[0];

    let localCurrentStart = 0;

    let localBestStart = 0;
    let localBestEnd = 0;

    /* INITIALIZATION */

    setCurrentIndex(0);

    setCurrentSum(localCurrentSum);
    setMaxSum(localMaxSum);

    setBestStart(0);
    setBestEnd(0);

    setActiveLine(0);

    setStepTitle("Initialize Current Sum");

    setReason(
      `Start with the first element ${array[0]}.`
    );

    setAction(
      `currentSum = ${array[0]}`
    );

    await sleep(speed);

    setActiveLine(1);

    setStepTitle("Initialize Maximum Sum");

    setReason(
      `Initially, the maximum sum is also ${array[0]}.`
    );

    setAction(
      `maxSum = ${array[0]}`
    );

    await sleep(speed);

    /* PROCESS ARRAY */

    for (let i = 1; i < array.length; i++) {
      setCurrentIndex(i);

      setActiveLine(2);

      setStepTitle(`Checking Index ${i}`);

      setReason(
        `Decide whether to extend the current subarray or start a new subarray with ${array[i]}.`
      );

      setAction("Compare two possibilities");

      await sleep(speed);

      const extendedSum =
        localCurrentSum + array[i];

      /* DECIDE WHETHER TO EXTEND OR START NEW */

      setActiveLine(3);

      if (array[i] > extendedSum) {
        localCurrentSum = array[i];

        localCurrentStart = i;

        setStepTitle(
          `Start New Subarray at Index ${i}`
        );

        setReason(
          `Starting fresh with ${array[i]} is better than extending the previous subarray to ${extendedSum}.`
        );

        setAction(
          `currentSum = ${array[i]}`
        );
      } else {
        localCurrentSum = extendedSum;

        setStepTitle(
          "Extend Current Subarray"
        );

        setReason(
          `Extending the current subarray gives ${extendedSum}.`
        );

        setAction(
          `currentSum = ${extendedSum}`
        );
      }

      setCurrentSum(localCurrentSum);
      setCurrentStart(localCurrentStart);

      await sleep(speed);

      /* UPDATE MAXIMUM */

      setActiveLine(4);

      if (localCurrentSum > localMaxSum) {
        localMaxSum = localCurrentSum;

        localBestStart =
          localCurrentStart;

        localBestEnd = i;

        setMaxSum(localMaxSum);

        setBestStart(localBestStart);
        setBestEnd(localBestEnd);

        setStepTitle(
          "New Maximum Subarray Found"
        );

        setReason(
          `The current subarray has a new maximum sum of ${localMaxSum}.`
        );

        setAction(
          `maxSum = ${localMaxSum}`
        );
      } else {
        setStepTitle(
          "Maximum Sum Unchanged"
        );

        setReason(
          `The current sum (${localCurrentSum}) does not exceed the maximum sum (${localMaxSum}).`
        );

        setAction(
          "Keep existing maximum"
        );
      }

      await sleep(speed);
    }

    /* COMPLETED */

    setCurrentIndex(-1);

    setActiveLine(5);

    setStatus("Completed");

    setStepTitle(
      "Maximum Subarray Found"
    );

    setReason(
      `The maximum sum is ${localMaxSum}, from index ${localBestStart} to ${localBestEnd}.`
    );

    setAction(
      "Algorithm completed"
    );

    setIsRunning(false);
    setIsCompleted(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">

      {/* HEADER */}

      <h1 className="text-4xl font-bold text-gray-900">
        Kadane's Algorithm Visualizer
      </h1>

      <p className="mt-3 text-lg text-gray-600">
        Find the maximum sum contiguous subarray.
      </p>

      {/* ALGORITHM INFO */}

      <AlgorithmInfo
        info={algorithmInfo.kadanesAlgorithm}
      />

      {/* PSEUDOCODE */}

      <PseudoCode
        code={
          algorithmInfo.kadanesAlgorithm
            .pseudoCode
        }
        activeLine={activeLine}
      />

      {/* CONTROLS */}

      <div className="mt-10 flex flex-wrap items-center gap-4">

        <button
          disabled={isRunning}
          onClick={() =>
            generateArray(arraySize)
          }
          className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-300"
        >
          Generate New Array
        </button>

        <button
          disabled={
            isRunning ||
            array.length === 0
          }
          onClick={startKadane}
          className="rounded-xl border border-violet-600 px-6 py-3 font-semibold text-violet-600 hover:bg-violet-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
        >
          {isRunning
            ? "Running..."
            : isCompleted
              ? "Run Again"
              : "Start"}
        </button>

        <button
          disabled={isRunning}
          onClick={reset}
          className="rounded-xl border border-red-500 px-6 py-3 font-semibold text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
        >
          Reset
        </button>

      </div>

      {/* PROGRESS */}

      <div className="mt-8 grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <p className="text-sm font-medium text-gray-500">
            Current Sum
          </p>

          <p className="mt-2 text-3xl font-bold text-orange-500">
            {currentSum}
          </p>

        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <p className="text-sm font-medium text-gray-500">
            Maximum Sum
          </p>

          <p className="mt-2 text-3xl font-bold text-green-600">
            {maxSum}
          </p>

        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <p className="text-sm font-medium text-gray-500">
            Status
          </p>

          <p className="mt-2 text-3xl font-bold text-violet-600">
            {status}
          </p>

        </div>

      </div>

      {/* STATISTICS */}

      <Statistics
        comparisons={
          currentIndex === -1
            ? 0
            : currentIndex
        }
        swaps={0}
        currentPass={
          currentIndex === -1
            ? 0
            : currentIndex + 1
        }
        status={status}
      />

      {/* ARRAY */}

      <div className="mt-10 rounded-2xl border bg-gray-50 p-8">

        <div className="flex flex-wrap justify-center gap-3">

          {array.map((value, index) => {

            const isCurrent =
              index === currentIndex;

            const isBest =
              index >= bestStart &&
              index <= bestEnd;

            const isCurrentSubarray =
              currentIndex !== -1 &&
              index >= currentStart &&
              index <= currentIndex;

            let style =
              "border-violet-300 bg-violet-100 text-violet-800";

            if (isBest) {
              style =
                "border-green-500 bg-green-100 text-green-700";
            }

            if (
              isCurrentSubarray &&
              !isBest
            ) {
              style =
                "border-orange-500 bg-orange-100 text-orange-700";
            }

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
                  className={`flex h-16 w-16 items-center justify-center rounded-xl border-2 text-xl font-bold transition-all duration-300 ${style}`}
                >
                  {value}
                </div>

                <div className="mt-2 text-sm text-gray-400">
                  {index}
                </div>

              </div>
            );
          })}

        </div>

      </div>

      {/* RESULT */}

      {isCompleted && (
        <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6">

          <h2 className="text-xl font-bold text-green-700">
            Maximum Subarray
          </h2>

          <p className="mt-2 text-lg text-green-700">
            Maximum Sum:{" "}
            <span className="font-bold">
              {maxSum}
            </span>
          </p>

          <p className="mt-1 text-green-700">
            Indices: {bestStart} to {bestEnd}
          </p>

          <p className="mt-3 text-green-700">
            Subarray: [
            {array
              .slice(
                bestStart,
                bestEnd + 1
              )
              .join(", ")}
            ]
          </p>

        </div>
      )}

      {/* LEGEND */}

      <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-600">

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-violet-300" />
          Not processed
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-orange-400" />
          Current subarray
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-green-500" />
          Maximum subarray
        </div>

      </div>

      {/* SLIDERS */}

      <div className="mt-10 grid gap-8 md:grid-cols-2">

        <div>

          <label className="mb-2 block font-semibold text-gray-700">
            Array Size: {arraySize}
          </label>

          <input
            type="range"
            min="5"
            max="20"
            value={arraySize}
            disabled={isRunning}
            onChange={(e) =>
              setArraySize(
                Number(e.target.value)
              )
            }
            className="w-full"
          />

        </div>

        <div>

          <label className="mb-2 block font-semibold text-gray-700">
            Animation Speed: {speed} ms
          </label>

          <input
            type="range"
            min="100"
            max="1000"
            step="50"
            value={speed}
            disabled={isRunning}
            onChange={(e) =>
              setSpeed(
                Number(e.target.value)
              )
            }
            className="w-full"
          />

        </div>

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

export default KadanesAlgorithm;