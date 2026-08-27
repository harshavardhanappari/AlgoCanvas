import { useEffect, useState } from "react";
import algorithmInfo from "../data/algorithmInfo";
import AlgorithmInfo from "../components/AlgorithmInfo/AlgorithmInfo";
import PseudoCode from "../components/PseudoCode/PseudoCode";
import Statistics from "../components/Statistics/Statistics";
import CurrentStep from "../components/CurrentStep/CurrentStep";

const PrefixSum = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(8);
  const [speed, setSpeed] = useState(50);

  const [prefixArray, setPrefixArray] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [processed, setProcessed] = useState([]);

  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(3);

  const [rangeSum, setRangeSum] = useState(null);

  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [activeLine, setActiveLine] = useState(-1);

  const [status, setStatus] = useState("Ready");

  const [stepTitle, setStepTitle] =
    useState("Ready to Start");

  const [reason, setReason] = useState(
    "Generate an array and build its Prefix Sum array."
  );

  const [action, setAction] =
    useState("Waiting...");

  const sleep = (ms) =>
    new Promise((resolve) =>
      setTimeout(resolve, ms)
    );

  // ==========================================
  // GENERATE ARRAY
  // ==========================================

  const generateArray = (size) => {
    if (isRunning) return;

    const newArray = Array.from(
      { length: size },
      () => Math.floor(Math.random() * 20) + 1
    );

    setArray(newArray);

    setPrefixArray([]);

    setCurrentIndex(-1);
    setProcessed([]);

    setLeft(0);
    setRight(Math.min(3, size - 1));

    setRangeSum(null);

    setActiveLine(-1);

    setIsCompleted(false);

    setStatus("Ready");

    setStepTitle("Ready to Build Prefix Sum");

    setReason(
      "Each prefix value stores the sum of all elements from index 0 to the current index."
    );

    setAction("Waiting...");
  };

  useEffect(() => {
    generateArray(arraySize);
  }, [arraySize]);

  // ==========================================
  // RESET
  // ==========================================

  const reset = () => {
    if (isRunning) return;

    setPrefixArray([]);

    setCurrentIndex(-1);
    setProcessed([]);

    setLeft(0);
    setRight(
      Math.min(3, array.length - 1)
    );

    setRangeSum(null);

    setActiveLine(-1);

    setIsCompleted(false);

    setStatus("Ready");

    setStepTitle("Ready to Build Prefix Sum");

    setReason(
      "The same array is ready to build the Prefix Sum again."
    );

    setAction("Waiting...");
  };

  // ==========================================
  // BUILD PREFIX SUM
  // ==========================================

  const buildPrefixSum = async () => {
    if (
      isRunning ||
      array.length === 0
    ) {
      return;
    }

    setPrefixArray([]);

    setCurrentIndex(-1);
    setProcessed([]);

    setRangeSum(null);

    setIsCompleted(false);

    setIsRunning(true);

    setStatus("Building Prefix Sum");

    const delay =
      Math.max(150, 800 - speed);

    const newPrefix = [];

    for (let i = 0; i < array.length; i++) {
      setCurrentIndex(i);

      setActiveLine(
        i === 0 ? 0 : 1
      );

      setStepTitle(
        `Process Index ${i}`
      );

      setReason(
        `Calculate the prefix sum up to index ${i}.`
      );

      setAction("Process current element");

      await sleep(delay);

      let value;

      if (i === 0) {
        value = array[i];
      } else {
        value =
          newPrefix[i - 1] +
          array[i];
      }

      newPrefix.push(value);

      setPrefixArray([...newPrefix]);

      setProcessed((previous) => [
        ...previous,
        i,
      ]);

      setActiveLine(
        i === 0 ? 0 : 2
      );

      setStepTitle(
        `Prefix[${i}] = ${value}`
      );

      if (i === 0) {
        setReason(
          `The first prefix value is equal to the first array element: ${array[i]}.`
        );
      } else {
        setReason(
          `Prefix[${i}] = Prefix[${i - 1}] + Array[${i}] = ${newPrefix[i - 1]} + ${array[i]} = ${value}.`
        );
      }

      setAction("Store prefix value");

      await sleep(delay);
    }

    setCurrentIndex(-1);

    setActiveLine(-1);

    setStatus("Completed");

    setStepTitle(
      "Prefix Sum Array Completed"
    );

    setReason(
      "The Prefix Sum array is ready. You can now calculate any range sum."
    );

    setAction("Select a range");

    setIsRunning(false);

    setIsCompleted(true);
  };

  // ==========================================
  // CALCULATE RANGE SUM
  // ==========================================

  const calculateRangeSum = () => {
    if (
      !isCompleted ||
      prefixArray.length === 0
    ) {
      return;
    }

    let result;

    if (left === 0) {
      result = prefixArray[right];
    } else {
      result =
        prefixArray[right] -
        prefixArray[left - 1];
    }

    setRangeSum(result);

    setActiveLine(
      left === 0 ? 4 : 6
    );

    setStatus("Range Calculated");

    setStepTitle(
      `Range Sum [${left}, ${right}] = ${result}`
    );

    if (left === 0) {
      setReason(
        `Because the range starts at index 0, the answer is Prefix[${right}] = ${prefixArray[right]}.`
      );
    } else {
      setReason(
        `Range Sum = Prefix[${right}] - Prefix[${left - 1}] = ${prefixArray[right]} - ${prefixArray[left - 1]} = ${result}.`
      );
    }

    setAction("Calculate range sum");
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">

      {/* HEADER */}

      <h1 className="text-4xl font-bold text-gray-900">
        Prefix Sum Visualizer
      </h1>

      <p className="mt-3 text-lg text-gray-600">
        Build a Prefix Sum array and quickly calculate range sums.
      </p>

      {/* ALGORITHM INFO */}

      <AlgorithmInfo
        info={algorithmInfo.prefixSum}
      />

      {/* PSEUDOCODE */}

      <PseudoCode
        code={algorithmInfo.prefixSum.pseudoCode}
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
          onClick={buildPrefixSum}
          className="rounded-xl border border-violet-600 px-6 py-3 font-semibold text-violet-600 hover:bg-violet-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
        >
          {isRunning
            ? "Building..."
            : "Build Prefix Sum"}
        </button>

        <button
          disabled={isRunning}
          onClick={reset}
          className="rounded-xl border border-red-500 px-6 py-3 font-semibold text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
        >
          Reset
        </button>

      </div>

      {/* RANGE CONTROLS */}

      {isCompleted && (
        <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">

          <h2 className="text-lg font-bold text-gray-900">
            Calculate Range Sum
          </h2>

          <div className="mt-5 grid gap-6 md:grid-cols-3">

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Left Index: {left}
              </label>

              <input
                type="range"
                min="0"
                max={right}
                value={left}
                onChange={(e) => {
                  const value =
                    Number(e.target.value);

                  setLeft(value);
                  setRangeSum(null);
                }}
                className="w-full"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Right Index: {right}
              </label>

              <input
                type="range"
                min={left}
                max={array.length - 1}
                value={right}
                onChange={(e) => {
                  const value =
                    Number(e.target.value);

                  setRight(value);
                  setRangeSum(null);
                }}
                className="w-full"
              />

            </div>

            <div className="flex items-end">

              <button
                onClick={calculateRangeSum}
                className="w-full rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
              >
                Calculate Sum
              </button>

            </div>

          </div>

        </div>
      )}

      {/* RANGE RESULT */}

      {rangeSum !== null && (
        <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6">

          <h2 className="text-lg font-bold text-green-800">
            Range Sum Result
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">

            <div>
              <p className="text-sm text-green-700">
                Range
              </p>

              <p className="text-2xl font-bold text-green-800">
                [{left}, {right}]
              </p>
            </div>

            <div>
              <p className="text-sm text-green-700">
                Elements
              </p>

              <p className="text-xl font-bold text-green-800">
                [
                {array
                  .slice(left, right + 1)
                  .join(", ")}
                ]
              </p>
            </div>

            <div>
              <p className="text-sm text-green-700">
                Sum
              </p>

              <p className="text-2xl font-bold text-green-800">
                {rangeSum}
              </p>
            </div>

          </div>

        </div>
      )}

      {/* STATISTICS */}

      <Statistics
        comparisons={0}
        swaps={0}
        currentPass={processed.length}
        status={status}
      />

      {/* ORIGINAL ARRAY */}

      <div className="mt-10">

        <h2 className="mb-4 text-xl font-bold text-gray-900">
          Original Array
        </h2>

        <div className="rounded-2xl border bg-gray-50 p-8">

          <div className="flex flex-wrap justify-center gap-3">

            {array.map((value, index) => {

              const isCurrent =
                index === currentIndex;

              const isInRange =
                rangeSum !== null &&
                index >= left &&
                index <= right;

              return (
                <div
                  key={index}
                  className="flex flex-col items-center"
                >

                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-xl border-2 text-xl font-bold transition-all duration-300 ${
                      isCurrent
                        ? "scale-110 border-orange-600 bg-orange-500 text-white shadow-lg"
                        : isInRange
                          ? "border-green-600 bg-green-500 text-white"
                          : "border-violet-300 bg-violet-100 text-violet-800"
                    }`}
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

      </div>

      {/* PREFIX ARRAY */}

      <div className="mt-10">

        <h2 className="mb-4 text-xl font-bold text-gray-900">
          Prefix Sum Array
        </h2>

        <div className="rounded-2xl border bg-gray-50 p-8">

          <div className="flex flex-wrap justify-center gap-3">

            {array.map((_, index) => {

              const value =
                prefixArray[index];

              const isProcessed =
                processed.includes(index);

              return (
                <div
                  key={index}
                  className="flex flex-col items-center"
                >

                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-xl border-2 text-xl font-bold transition-all duration-300 ${
                      isProcessed
                        ? "border-green-500 bg-green-100 text-green-700"
                        : "border-gray-300 bg-white text-gray-400"
                    }`}
                  >
                    {isProcessed
                      ? value
                      : "?"}
                  </div>

                  <div className="mt-2 text-sm text-gray-400">
                    {index}
                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </div>

      {/* LEGEND */}

      <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-600">

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-violet-300" />
          Normal Element
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-orange-500" />
          Current Element
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-green-500" />
          Selected Range
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
            max="15"
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
            Animation Speed
          </label>

          <input
            type="range"
            min="10"
            max="500"
            step="10"
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

export default PrefixSum;