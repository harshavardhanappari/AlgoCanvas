import { useEffect, useState } from "react";

import algorithmInfo from "../data/algorithmInfo";

import AlgorithmInfo from "../components/AlgorithmInfo/AlgorithmInfo";
import PseudoCode from "../components/PseudoCode/PseudoCode";
import Statistics from "../components/Statistics/Statistics";
import CurrentStep from "../components/CurrentStep/CurrentStep";

const RotateArray = () => {
  const [array, setArray] = useState([]);
  const [originalArray, setOriginalArray] = useState([]);

  const [arraySize, setArraySize] = useState(8);
  const [k, setK] = useState(3);
  const [speed, setSpeed] = useState(600);

  const [highlighted, setHighlighted] = useState([]);
  const [currentStepIndexes, setCurrentStepIndexes] = useState([]);

  const [isRotating, setIsRotating] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [activeLine, setActiveLine] = useState(-1);

  const [swaps, setSwaps] = useState(0);
  const [currentPass, setCurrentPass] = useState(0);

  const [status, setStatus] = useState("Ready");

  const [stepTitle, setStepTitle] =
    useState("Ready to Rotate");

  const [reason, setReason] = useState(
    "Generate an array and choose how many positions to rotate it."
  );

  const [action, setAction] =
    useState("Waiting...");

  const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const generateArray = (size = arraySize) => {
    if (isRotating) return;

    const newArray = Array.from(
      { length: size },
      () => Math.floor(Math.random() * 90) + 10
    );

    setArray(newArray);
    setOriginalArray([...newArray]);

    setHighlighted([]);
    setCurrentStepIndexes([]);

    setSwaps(0);
    setCurrentPass(0);

    setIsCompleted(false);
    setActiveLine(-1);

    setStatus("Ready");

    setStepTitle("New Array Generated");

    setReason(
      "The array is ready. Choose k to rotate the array to the right."
    );

    setAction("Ready to rotate");
  };

  useEffect(() => {
    generateArray(arraySize);
  }, []);

  const resetVisualizer = () => {
    if (isRotating) return;

    setArray([...originalArray]);

    setHighlighted([]);
    setCurrentStepIndexes([]);

    setSwaps(0);
    setCurrentPass(0);

    setIsCompleted(false);
    setActiveLine(-1);

    setStatus("Ready");

    setStepTitle("Ready to Rotate Again");

    setReason(
      "The original array has been restored."
    );

    setAction("Choose k and start rotation");
  };

  const reverseSection = async (
    tempArray,
    left,
    right,
    line,
    title
  ) => {
    while (left < right) {
      setHighlighted([left, right]);

      setCurrentStepIndexes(
        Array.from(
          { length: right - left + 1 },
          (_, index) => left + index
        )
      );

      setActiveLine(line);

      setStepTitle(title);

      setReason(
        `Swap the elements at index ${left} and index ${right}.`
      );

      setAction("Reverse elements");

      await sleep(speed);

      [tempArray[left], tempArray[right]] = [
        tempArray[right],
        tempArray[left],
      ];

      setArray([...tempArray]);

      setSwaps((previous) => previous + 1);

      await sleep(speed / 2);

      left++;
      right--;
    }
  };

  const startRotation = async () => {
    if (
      isRotating ||
      isCompleted ||
      array.length === 0
    ) {
      return;
    }

    setIsRotating(true);

    setStatus("Rotating...");

    const n = array.length;

    const rotation =
      ((k % n) + n) % n;

    if (rotation === 0) {
      setStepTitle("No Rotation Needed");

      setReason(
        `Rotating by ${k} positions results in the same array.`
      );

      setAction("Finished");

      setStatus("Completed");

      setIsCompleted(true);
      setIsRotating(false);

      return;
    }

    let tempArray = [...array];

    // STEP 1
    setCurrentPass(1);

    setActiveLine(0);

    setStepTitle("Step 1: Reverse Entire Array");

    setReason(
      "First, reverse the complete array."
    );

    setAction("Reverse entire array");

    await sleep(speed);

    await reverseSection(
      tempArray,
      0,
      n - 1,
      0,
      "Reversing Entire Array"
    );

    await sleep(speed);

    // STEP 2
    setCurrentPass(2);

    setActiveLine(1);

    setHighlighted([]);

    setCurrentStepIndexes(
      Array.from(
        { length: rotation },
        (_, index) => index
      )
    );

    setStepTitle(
      `Step 2: Reverse First ${rotation} Elements`
    );

    setReason(
      `The first ${rotation} elements are reversed.`
    );

    setAction("Reverse first section");

    await sleep(speed);

    await reverseSection(
      tempArray,
      0,
      rotation - 1,
      1,
      `Reversing First ${rotation} Elements`
    );

    await sleep(speed);

    // STEP 3
    setCurrentPass(3);

    setActiveLine(2);

    setHighlighted([]);

    setCurrentStepIndexes(
      Array.from(
        { length: n - rotation },
        (_, index) => rotation + index
      )
    );

    setStepTitle(
      "Step 3: Reverse Remaining Elements"
    );

    setReason(
      "Reverse all remaining elements to restore their correct order."
    );

    setAction("Reverse remaining section");

    await sleep(speed);

    await reverseSection(
      tempArray,
      rotation,
      n - 1,
      2,
      "Reversing Remaining Elements"
    );

    setArray([...tempArray]);

    setHighlighted([]);
    setCurrentStepIndexes([]);

    setActiveLine(3);

    setStepTitle("Rotation Completed!");

    setReason(
      `The array has been successfully rotated to the right by ${rotation} positions.`
    );

    setAction("Finished");

    setStatus("Completed");

    setIsCompleted(true);

    setIsRotating(false);
  };

  const changeArraySize = (value) => {
    if (isRotating) return;

    const size = Number(value);

    setArraySize(size);

    if (k >= size) {
      setK(Math.max(1, size - 1));
    }

    generateArray(size);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">

      {/* HEADER */}

      <h1 className="text-4xl font-bold text-gray-900">
        Rotate Array
      </h1>

      <p className="mt-3 text-lg text-gray-600">
        Rotate an array to the right by k positions
        using the three-reversal technique.
      </p>

      {/* ALGORITHM INFO */}

      <AlgorithmInfo
        info={algorithmInfo.rotateArray}
      />

      {/* PSEUDOCODE */}

      <PseudoCode
        code={algorithmInfo.rotateArray.pseudoCode}
        activeLine={activeLine}
      />

      {/* CONTROLS */}

      <div className="mt-10 flex flex-wrap items-center gap-4">

        <button
          disabled={
            isRotating ||
            isCompleted
          }
          onClick={startRotation}
          className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-300"
        >
          {isRotating
            ? "Rotating..."
            : isCompleted
              ? "Completed"
              : "Start Rotation"}
        </button>

        <button
          disabled={isRotating}
          onClick={resetVisualizer}
          className="rounded-xl border border-orange-500 px-6 py-3 font-semibold text-orange-500 hover:bg-orange-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
        >
          Reset
        </button>

        <button
          disabled={isRotating}
          onClick={() =>
            generateArray(arraySize)
          }
          className="rounded-xl border border-violet-600 px-6 py-3 font-semibold text-violet-600 hover:bg-violet-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
        >
          Generate New Array
        </button>

      </div>

      {/* PROGRESS */}

      <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">

        <div className="grid gap-6 sm:grid-cols-3">

          <div>
            <p className="text-sm font-medium text-gray-500">
              Rotation (k)
            </p>

            <p className="mt-1 text-3xl font-bold text-blue-600">
              {k}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              Current Step
            </p>

            <p className="mt-1 text-3xl font-bold text-orange-500">
              {currentPass} / 3
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              Swaps
            </p>

            <p className="mt-1 text-3xl font-bold text-green-600">
              {swaps}
            </p>
          </div>

        </div>

      </div>

      {/* STATISTICS */}

      <Statistics
        comparisons={0}
        swaps={swaps}
        currentPass={currentPass}
        status={status}
      />

      {/* ARRAY */}

      <div className="mt-10 rounded-2xl border bg-gray-50 p-8">

        <h2 className="mb-6 text-center text-xl font-bold text-gray-800">
          Array
        </h2>

        <div className="flex flex-wrap justify-center gap-3">

          {array.map((value, index) => {
            const isHighlighted =
              highlighted.includes(index);

            const isInSection =
              currentStepIndexes.includes(index);

            let style =
              "border-violet-300 bg-violet-100 text-violet-800";

            if (isInSection) {
              style =
                "border-blue-400 bg-blue-100 text-blue-800";
            }

            if (isHighlighted) {
              style =
                "scale-110 border-orange-600 bg-orange-500 text-white shadow-lg";
            }

            if (isCompleted) {
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
          Normal
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-blue-300" />
          Current Section
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-orange-500" />
          Swapping
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-green-500" />
          Rotated
        </div>

      </div>

      {/* SETTINGS */}

      <div className="mt-10 grid gap-8 md:grid-cols-3">

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
            disabled={isRotating}
            onChange={(e) =>
              changeArraySize(e.target.value)
            }
            className="w-full"
          />

        </div>

        {/* ROTATION */}

        <div>

          <label className="mb-2 block font-semibold text-gray-700">
            Rotate by k: {k}
          </label>

          <input
            type="range"
            min="1"
            max={Math.max(1, array.length - 1)}
            value={Math.min(
              k,
              Math.max(1, array.length - 1)
            )}
            disabled={isRotating}
            onChange={(e) =>
              setK(Number(e.target.value))
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
            disabled={isRotating}
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

export default RotateArray;