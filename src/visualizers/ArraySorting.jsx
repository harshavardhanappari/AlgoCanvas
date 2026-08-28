import { useEffect, useState } from "react";

import algorithmInfo from "../data/algorithmInfo";

import AlgorithmInfo from "../components/AlgorithmInfo/AlgorithmInfo";
import PseudoCode from "../components/PseudoCode/PseudoCode";
import Statistics from "../components/Statistics/Statistics";
import CurrentStep from "../components/CurrentStep/CurrentStep";

const ArraySorting = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(10);
  const [speed, setSpeed] = useState(300);

  const [comparing, setComparing] = useState([]);
  const [sorted, setSorted] = useState([]);

  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [currentPass, setCurrentPass] = useState(0);

  const [isSorting, setIsSorting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [status, setStatus] = useState("Ready");
  const [activeLine, setActiveLine] = useState(-1);

  const [stepTitle, setStepTitle] =
    useState("Ready to Sort");

  const [reason, setReason] = useState(
    "Generate an array and start sorting."
  );

  const [action, setAction] = useState("Waiting...");

  const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const resetStates = () => {
    setComparing([]);
    setSorted([]);
    setComparisons(0);
    setSwaps(0);
    setCurrentPass(0);
    setIsCompleted(false);
    setActiveLine(-1);
  };

  const generateArray = (size = arraySize) => {
    if (isSorting) return;

    const newArray = Array.from(
      { length: size },
      () => Math.floor(Math.random() * 90) + 10
    );

    setArray(newArray);

    resetStates();

    setStatus("Ready");

    setStepTitle("New Array Generated");

    setReason(
      "The array contains unsorted values. Start the algorithm to arrange them in ascending order."
    );

    setAction("Ready to sort");
  };

  useEffect(() => {
    generateArray(arraySize);
  }, []);

  const resetSort = () => {
    if (isSorting) return;

    resetStates();

    setStatus("Ready");

    setStepTitle("Ready to Sort Again");

    setReason(
      "The same array has been restored to its current order and can be sorted again."
    );

    setAction("Click Start Sorting");
  };

  const startSorting = async () => {
    if (
      isSorting ||
      array.length === 0 ||
      isCompleted
    ) {
      return;
    }

    setIsSorting(true);
    setStatus("Sorting...");

    let tempArray = [...array];

    const n = tempArray.length;

    for (let i = 0; i < n - 1; i++) {
      setCurrentPass(i + 1);

      setActiveLine(0);

      setStepTitle(`Pass ${i + 1}`);

      setReason(
        `Starting pass ${i + 1}. The largest unsorted value will move toward its correct position.`
      );

      setAction("Begin comparisons");

      await sleep(speed);

      for (let j = 0; j < n - i - 1; j++) {
        setComparing([j, j + 1]);

        setActiveLine(1);

        setStepTitle(
          `Comparing Index ${j} and ${j + 1}`
        );

        setReason(
          `Compare ${tempArray[j]} and ${tempArray[j + 1]}.`
        );

        setAction("Compare adjacent elements");

        setComparisons((previous) => previous + 1);

        await sleep(speed);

        if (tempArray[j] > tempArray[j + 1]) {
          setActiveLine(2);

          setStepTitle("Swap Required");

          setReason(
            `${tempArray[j]} is greater than ${tempArray[j + 1]}, so they are swapped.`
          );

          setAction("Swap elements");

          await sleep(speed / 2);

          const newArray = [...tempArray];

          [newArray[j], newArray[j + 1]] = [
            newArray[j + 1],
            newArray[j],
          ];

          tempArray = newArray;

          setArray([...tempArray]);

          setSwaps((previous) => previous + 1);

          setActiveLine(3);

          await sleep(speed / 2);
        }
      }

      setComparing([]);

      const sortedIndex = n - i - 1;

      setSorted((previous) => [
        ...previous,
        sortedIndex,
      ]);

      setStepTitle(
        `Index ${sortedIndex} Sorted`
      );

      setReason(
        `${tempArray[sortedIndex]} is now in its correct final position.`
      );

      setAction("Mark element as sorted");

      await sleep(speed);
    }

    setSorted(
      Array.from(
        { length: n },
        (_, index) => index
      )
    );

    setComparing([]);

    setActiveLine(4);

    setStepTitle("Sorting Completed!");

    setReason(
      "Every element is now arranged in ascending order."
    );

    setAction("Array sorted successfully");

    setStatus("Completed");

    setIsCompleted(true);
    setIsSorting(false);
  };

  const changeArraySize = (value) => {
    if (isSorting) return;

    const size = Number(value);

    setArraySize(size);

    generateArray(size);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">

      {/* HEADER */}

      <h1 className="text-4xl font-bold text-gray-900">
        Sorting an Array
      </h1>

      <p className="mt-3 text-lg text-gray-600">
        Visualize how adjacent elements are compared
        and swapped until the array becomes sorted.
      </p>

      {/* ALGORITHM INFO */}

      <AlgorithmInfo
        info={algorithmInfo.arraySorting}
      />

      {/* PSEUDOCODE */}

      <PseudoCode
        code={algorithmInfo.arraySorting.pseudoCode}
        activeLine={activeLine}
      />

      {/* CONTROLS */}

      <div className="mt-10 flex flex-wrap items-center gap-4">

        <button
          disabled={
            isSorting ||
            isCompleted
          }
          onClick={startSorting}
          className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-300"
        >
          {isSorting
            ? "Sorting..."
            : isCompleted
              ? "Completed"
              : "Start Sorting"}
        </button>

        <button
          disabled={isSorting}
          onClick={resetSort}
          className="rounded-xl border border-orange-500 px-6 py-3 font-semibold text-orange-500 hover:bg-orange-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
        >
          Reset Sort
        </button>

        <button
          disabled={isSorting}
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

        <div className="grid gap-6 sm:grid-cols-4">

          <div>
            <p className="text-sm font-medium text-gray-500">
              Pass
            </p>

            <p className="mt-1 text-3xl font-bold text-blue-600">
              {currentPass}
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
              Swaps
            </p>

            <p className="mt-1 text-3xl font-bold text-red-500">
              {swaps}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              Sorted
            </p>

            <p className="mt-1 text-3xl font-bold text-green-600">
              {sorted.length} / {array.length}
            </p>
          </div>

        </div>

      </div>

      {/* STATISTICS */}

      <Statistics
        comparisons={comparisons}
        swaps={swaps}
        currentPass={currentPass}
        status={status}
      />

      {/* ARRAY */}

      <div className="mt-10 rounded-2xl border bg-gray-50 p-8">

        <div className="flex flex-wrap justify-center gap-3">

          {array.map((value, index) => {
            const isComparing =
              comparing.includes(index);

            const isSorted =
              sorted.includes(index);

            let style =
              "border-violet-300 bg-violet-100 text-violet-800";

            if (isSorted) {
              style =
                "border-green-600 bg-green-500 text-white shadow-md";
            } else if (isComparing) {
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

      {/* LEGEND */}

      <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-600">

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-violet-300" />
          Unsorted
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-orange-500" />
          Comparing
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-green-500" />
          Sorted
        </div>

      </div>

      {/* SETTINGS */}

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
            disabled={isSorting}
            onChange={(e) =>
              changeArraySize(
                e.target.value
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
            min="100"
            max="1000"
            step="100"
            value={speed}
            disabled={isSorting}
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

export default ArraySorting;