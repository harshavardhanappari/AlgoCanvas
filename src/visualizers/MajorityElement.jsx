import { useEffect, useState } from "react";

import algorithmInfo from "../data/algorithmInfo";

import AlgorithmInfo from "../components/AlgorithmInfo/AlgorithmInfo";
import PseudoCode from "../components/PseudoCode/PseudoCode";
import Statistics from "../components/Statistics/Statistics";
import CurrentStep from "../components/CurrentStep/CurrentStep";

const MajorityElement = () => {
  const [array, setArray] = useState([]);
  const [originalArray, setOriginalArray] = useState([]);

  const [arraySize, setArraySize] = useState(9);
  const [speed, setSpeed] = useState(700);

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [candidateIndex, setCandidateIndex] = useState(-1);

  const [candidate, setCandidate] = useState(null);
  const [count, setCount] = useState(0);

  const [processed, setProcessed] = useState([]);
  const [cancelled, setCancelled] = useState([]);

  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [activeLine, setActiveLine] = useState(-1);

  const [comparisons, setComparisons] = useState(0);
  const [status, setStatus] = useState("Ready");

  const [stepTitle, setStepTitle] = useState(
    "Ready to Find Majority Element"
  );

  const [reason, setReason] = useState(
    "Generate an array containing a majority element and start the visualization."
  );

  const [action, setAction] = useState("Waiting...");

  const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // Generate an array that always contains a majority element
  const generateArray = (size = arraySize) => {
    if (isRunning) return;

    const majorityValue = Math.floor(Math.random() * 8) + 1;

    // Majority count will always be greater than n / 2
    const majorityCount =
      Math.floor(size / 2) + 1 +
      Math.floor(Math.random() * Math.max(1, size - Math.floor(size / 2) - 1));

    const newArray = [];

    for (let i = 0; i < majorityCount; i++) {
      newArray.push(majorityValue);
    }

    while (newArray.length < size) {
      let value;

      do {
        value = Math.floor(Math.random() * 8) + 1;
      } while (value === majorityValue);

      newArray.push(value);
    }

    // Shuffle array
    for (let i = newArray.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(
        Math.random() * (i + 1)
      );

      [newArray[i], newArray[randomIndex]] = [
        newArray[randomIndex],
        newArray[i],
      ];
    }

    setArray(newArray);
    setOriginalArray([...newArray]);

    setCurrentIndex(-1);
    setCandidateIndex(-1);

    setCandidate(null);
    setCount(0);

    setProcessed([]);
    setCancelled([]);

    setComparisons(0);

    setIsCompleted(false);
    setActiveLine(-1);

    setStatus("Ready");

    setStepTitle("New Array Generated");

    setReason(
      "This array contains an element that appears more than n / 2 times."
    );

    setAction("Ready to start Boyer-Moore Voting");
  };

  useEffect(() => {
    generateArray(arraySize);
  }, []);

  const resetVisualizer = () => {
    if (isRunning) return;

    setArray([...originalArray]);

    setCurrentIndex(-1);
    setCandidateIndex(-1);

    setCandidate(null);
    setCount(0);

    setProcessed([]);
    setCancelled([]);

    setComparisons(0);

    setIsCompleted(false);
    setActiveLine(-1);

    setStatus("Ready");

    setStepTitle("Ready to Run Again");

    setReason(
      "The original array has been restored. You can run the algorithm again."
    );

    setAction("Waiting...");
  };

  const startAlgorithm = async () => {
    if (
      isRunning ||
      isCompleted ||
      array.length === 0
    ) {
      return;
    }

    setIsRunning(true);
    setStatus("Running...");

    let currentCandidate = null;
    let currentCount = 0;
    let currentCandidateIndex = -1;

    for (let i = 0; i < array.length; i++) {
      const value = array[i];

      setCurrentIndex(i);

      setActiveLine(2);

      setStepTitle(`Checking Element at Index ${i}`);

      setReason(
        `Current element is ${value}. We compare it with the current candidate.`
      );

      setAction("Inspect current element");

      await sleep(speed);

      // If count is zero, choose a new candidate
      if (currentCount === 0) {
        setActiveLine(3);

        currentCandidate = value;
        currentCandidateIndex = i;

        setCandidate(value);
        setCandidateIndex(i);

        setStepTitle("New Candidate Selected");

        setReason(
          `The count is 0, so ${value} becomes the new candidate.`
        );

        setAction("Select candidate");

        await sleep(speed);
      }

      setComparisons((previous) => previous + 1);

      if (value === currentCandidate) {
        setActiveLine(5);

        currentCount++;

        setCount(currentCount);

        setProcessed((previous) => [
          ...previous,
          i,
        ]);

        setStepTitle("Vote Added");

        setReason(
          `${value} matches the candidate, so the vote count increases to ${currentCount}.`
        );

        setAction("Increase vote count");

        await sleep(speed);
      } else {
        setActiveLine(7);

        currentCount--;

        setCount(currentCount);

        setCancelled((previous) => [
          ...previous,
          i,
        ]);

        setStepTitle("Vote Cancelled");

        setReason(
          `${value} does not match candidate ${currentCandidate}, so one vote is cancelled. Count becomes ${currentCount}.`
        );

        setAction("Decrease vote count");

        await sleep(speed);
      }

      setProcessed((previous) =>
        previous.includes(i)
          ? previous
          : [...previous, i]
      );
    }

    setCurrentIndex(-1);

    setCandidateIndex(-1);

    setActiveLine(8);

    setStepTitle("Majority Element Found!");

    setReason(
      `After all cancellations, ${currentCandidate} remains as the majority element candidate.`
    );

    setAction("Algorithm completed");

    setCandidate(currentCandidate);

    setStatus("Completed");

    setIsCompleted(true);
    setIsRunning(false);
  };

  const changeArraySize = (value) => {
    if (isRunning) return;

    const size = Number(value);

    setArraySize(size);

    generateArray(size);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">

      {/* HEADER */}

      <h1 className="text-4xl font-bold text-gray-900">
        Majority Element
      </h1>

      <p className="mt-3 text-lg text-gray-600">
        Find the element appearing more than n / 2 times using
        the Boyer-Moore Voting Algorithm.
      </p>

      {/* ALGORITHM INFO */}

      <AlgorithmInfo
        info={algorithmInfo.majorityElement}
      />

      {/* PSEUDOCODE */}

      <PseudoCode
        code={algorithmInfo.majorityElement.pseudoCode}
        activeLine={activeLine}
      />

      {/* CONTROLS */}

      <div className="mt-10 flex flex-wrap items-center gap-4">

        <button
          disabled={isRunning || isCompleted}
          onClick={startAlgorithm}
          className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-300"
        >
          {isRunning
            ? "Running..."
            : isCompleted
              ? "Completed"
              : "Find Majority Element"}
        </button>

        <button
          disabled={isRunning}
          onClick={resetVisualizer}
          className="rounded-xl border border-orange-500 px-6 py-3 font-semibold text-orange-500 hover:bg-orange-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
        >
          Reset
        </button>

        <button
          disabled={isRunning}
          onClick={() =>
            generateArray(arraySize)
          }
          className="rounded-xl border border-violet-600 px-6 py-3 font-semibold text-violet-600 hover:bg-violet-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
        >
          Generate New Array
        </button>

      </div>

      {/* CURRENT VALUES */}

      <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">

        <div className="grid gap-6 sm:grid-cols-4">

          <div>
            <p className="text-sm font-medium text-gray-500">
              Candidate
            </p>

            <p className="mt-1 text-3xl font-bold text-violet-600">
              {candidate ?? "-"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              Vote Count
            </p>

            <p className="mt-1 text-3xl font-bold text-blue-600">
              {count}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              Current Index
            </p>

            <p className="mt-1 text-3xl font-bold text-orange-500">
              {currentIndex === -1
                ? "-"
                : currentIndex}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              Array Size
            </p>

            <p className="mt-1 text-3xl font-bold text-green-600">
              {array.length}
            </p>
          </div>

        </div>

      </div>

      {/* STATISTICS */}

      <Statistics
        comparisons={comparisons}
        swaps={0}
        currentPass={currentIndex + 1}
        status={status}
      />

      {/* ARRAY */}

      <div className="mt-10 rounded-2xl border bg-gray-50 p-8">

        <h2 className="mb-6 text-center text-xl font-bold text-gray-800">
          Array
        </h2>

        <div className="flex flex-wrap justify-center gap-3">

          {array.map((value, index) => {
            let style =
              "border-violet-300 bg-violet-100 text-violet-800";

            if (processed.includes(index)) {
              style =
                "border-blue-400 bg-blue-100 text-blue-800";
            }

            if (cancelled.includes(index)) {
              style =
                "border-red-400 bg-red-100 text-red-700";
            }

            if (
              index === candidateIndex &&
              !isCompleted
            ) {
              style =
                "scale-110 border-violet-600 bg-violet-600 text-white shadow-lg";
            }

            if (index === currentIndex) {
              style =
                "scale-110 border-orange-600 bg-orange-500 text-white shadow-lg";
            }

            if (
              isCompleted &&
              value === candidate
            ) {
              style =
                "border-green-600 bg-green-500 text-white shadow-md";
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

      {/* LEGEND */}

      <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-600">

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-violet-300" />
          Unprocessed
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-blue-300" />
          Processed
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-orange-500" />
          Current Element
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-red-300" />
          Vote Cancelled
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-green-500" />
          Majority Element
        </div>

      </div>

      {/* SETTINGS */}

      <div className="mt-10 grid gap-8 md:grid-cols-2">

        {/* ARRAY SIZE */}

        <div>

          <label className="mb-2 block font-semibold text-gray-700">
            Array Size: {arraySize}
          </label>

          <input
            type="range"
            min="5"
            max="15"
            value={arraySize}
            disabled={isRunning}
            onChange={(e) =>
              changeArraySize(e.target.value)
            }
            className="w-full"
          />

        </div>

        {/* SPEED */}

        <div>

          <label className="mb-2 block font-semibold text-gray-700">
            Animation Speed
          </label>

          <input
            type="range"
            min="200"
            max="1500"
            step="100"
            value={speed}
            disabled={isRunning}
            onChange={(e) =>
              setSpeed(Number(e.target.value))
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

export default MajorityElement;