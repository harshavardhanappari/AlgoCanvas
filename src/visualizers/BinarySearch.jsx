import { useEffect, useState } from "react";
import algorithmInfo from "../data/algorithmInfo";
import AlgorithmInfo from "../components/AlgorithmInfo/AlgorithmInfo";
import PseudoCode from "../components/PseudoCode/PseudoCode";
import Statistics from "../components/Statistics/Statistics";
import CurrentStep from "../components/CurrentStep/CurrentStep";

const BinarySearch = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(8);
  const [speed, setSpeed] = useState(50);
  const [target, setTarget] = useState(null);

  const [left, setLeft] = useState(-1);
  const [mid, setMid] = useState(-1);
  const [right, setRight] = useState(-1);

  const [foundIndex, setFoundIndex] = useState(-1);
  const [comparisons, setComparisons] = useState(0);

  const [isSearching, setIsSearching] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [activeLine, setActiveLine] = useState(-1);

  const [status, setStatus] = useState("Ready");
  const [stepTitle, setStepTitle] = useState("Ready to Start");
  const [reason, setReason] = useState(
    "Generate a sorted array and choose a target."
  );
  const [action, setAction] = useState("Waiting...");

  const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const generateArray = (size) => {
    if (isSearching) return;

    const newArray = Array.from(
      { length: size },
      (_, index) => (index + 1) * 3
    );

    setArray(newArray);

    const randomIndex = Math.floor(
      Math.random() * newArray.length
    );

    setTarget(newArray[randomIndex]);

    setLeft(-1);
    setMid(-1);
    setRight(-1);

    setFoundIndex(-1);
    setComparisons(0);

    setIsCompleted(false);
    setActiveLine(-1);

    setStatus("Ready");
    setStepTitle("Ready to Start");
    setReason(
      "Binary Search works on a sorted array."
    );
    setAction("Waiting...");
  };

  useEffect(() => {
    generateArray(arraySize);
  }, [arraySize]);

  const resetArray = () => {
    if (isSearching) return;

    generateArray(arraySize);
  };

  const startSearch = async () => {
    if (
      isSearching ||
      isCompleted ||
      array.length === 0 ||
      target === null
    ) {
      return;
    }

    setIsSearching(true);
    setStatus("Searching...");

    let currentLeft = 0;
    let currentRight = array.length - 1;
    let comparisonCount = 0;

    while (currentLeft <= currentRight) {
      // Line 3: while left <= right
      setActiveLine(3);

      setLeft(currentLeft);
      setRight(currentRight);

      const currentMid = Math.floor(
        (currentLeft + currentRight) / 2
      );

      setMid(currentMid);

      setStepTitle(
        `Checking Middle Index ${currentMid}`
      );

      setReason(
        `Search range is [${currentLeft}-${currentRight}].`
      );

      setAction("Calculate midpoint");

      await sleep(
        Math.max(100, 700 - speed)
      );

      // Line 4: calculate mid
      setActiveLine(4);

      comparisonCount++;

      setComparisons(comparisonCount);

      setStepTitle(
        `Compare ${array[currentMid]} with ${target}`
      );

      setReason(
        `Middle value is ${array[currentMid]}, target is ${target}.`
      );

      setAction("Compare");

      await sleep(
        Math.max(100, 700 - speed)
      );

      // Line 5: target found
      setActiveLine(5);

      if (array[currentMid] === target) {
        setFoundIndex(currentMid);

        setStatus("Found");

        setStepTitle(
          `Target Found at Index ${currentMid}`
        );

        setReason(
          `${array[currentMid]} matches the target ${target}.`
        );

        setAction("Return index");

        await sleep(
          Math.max(100, 700 - speed)
        );

        setIsSearching(false);
        setIsCompleted(true);

        return;
      }

      // Target is greater than mid
      if (array[currentMid] < target) {
        setActiveLine(6);

        setStepTitle("Target is Larger");

        setReason(
          `${target} is greater than ${array[currentMid]}, so the left half can be eliminated.`
        );

        setAction(
          `Move left to ${currentMid + 1}`
        );

        currentLeft = currentMid + 1;

        await sleep(
          Math.max(100, 700 - speed)
        );
      } else {
        // Target is smaller than mid
        setActiveLine(7);

        setStepTitle("Target is Smaller");

        setReason(
          `${target} is smaller than ${array[currentMid]}, so the right half can be eliminated.`
        );

        setAction(
          `Move right to ${currentMid - 1}`
        );

        currentRight = currentMid - 1;

        await sleep(
          Math.max(100, 700 - speed)
        );
      }
    }

    // Line 8: return -1
    setActiveLine(8);

    setLeft(-1);
    setMid(-1);
    setRight(-1);

    setStatus("Not Found");

    setStepTitle("Target Not Found");

    setReason(
      `The target ${target} is not present in the array.`
    );

    setAction("Return -1");

    await sleep(
      Math.max(100, 700 - speed)
    );

    setIsSearching(false);
    setIsCompleted(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">

      {/* HEADER */}

      <h1 className="text-4xl font-bold text-gray-900">
        Binary Search Visualizer
      </h1>

      <p className="mt-3 text-lg text-gray-600">
        Search a sorted array by repeatedly eliminating
        half of the remaining elements.
      </p>

      {/* ALGORITHM INFO */}

      <AlgorithmInfo
        info={algorithmInfo.binarySearch}
      />

      {/* PSEUDOCODE */}

      <PseudoCode
        code={algorithmInfo.binarySearch.pseudoCode}
        activeLine={activeLine}
      />

      {/* CONTROLS */}

      <div className="mt-10 flex flex-wrap items-center gap-4">

        <button
          disabled={isSearching}
          onClick={() => generateArray(arraySize)}
          className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-300"
        >
          Generate New Array
        </button>

        <button
          disabled={
            isSearching ||
            isCompleted ||
            array.length === 0
          }
          onClick={startSearch}
          className="rounded-xl border border-violet-600 px-6 py-3 font-semibold text-violet-600 hover:bg-violet-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
        >
          {isCompleted ? "Completed" : "Start"}
        </button>

        <button
          disabled={isSearching}
          onClick={resetArray}
          className="rounded-xl border border-red-500 px-6 py-3 font-semibold text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
        >
          Reset
        </button>

      </div>

      {/* TARGET + POINTERS */}

      <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">

          <div>
            <p className="text-sm font-medium text-gray-500">
              Target
            </p>

            <p className="mt-1 text-3xl font-bold text-violet-700">
              {target ?? "—"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              Left
            </p>

            <p className="mt-1 text-3xl font-bold text-blue-600">
              {left === -1 ? "—" : left}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              Mid
            </p>

            <p className="mt-1 text-3xl font-bold text-orange-600">
              {mid === -1 ? "—" : mid}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              Right
            </p>

            <p className="mt-1 text-3xl font-bold text-red-600">
              {right === -1 ? "—" : right}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              Result
            </p>

            <p
              className={`mt-1 text-3xl font-bold ${
                foundIndex !== -1
                  ? "text-green-600"
                  : status === "Not Found"
                    ? "text-red-600"
                    : "text-gray-700"
              }`}
            >
              {foundIndex !== -1
                ? `Index ${foundIndex}`
                : status === "Not Found"
                  ? "Not Found"
                  : "—"}
            </p>
          </div>

        </div>

      </div>

      {/* STATISTICS */}

      <Statistics
        comparisons={comparisons}
        swaps={0}
        currentPass={0}
        status={status}
      />

      {/* ARRAY */}

      <div className="mt-10 rounded-2xl border bg-gray-50 p-8">

        <div className="flex flex-wrap justify-center gap-3">

          {array.map((value, index) => {
            const isFound = index === foundIndex;
            const isMid = index === mid;

            const isOutsideRange =
              left !== -1 &&
              right !== -1 &&
              (index < left || index > right);

            return (
              <div
                key={index}
                className="flex flex-col items-center"
              >

                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-xl border-2 text-xl font-bold transition-all duration-300 ${
                    isFound
                      ? "scale-110 border-green-600 bg-green-500 text-white shadow-lg"
                      : isMid
                        ? "scale-110 border-orange-600 bg-orange-500 text-white shadow-lg"
                        : isOutsideRange
                          ? "border-gray-200 bg-gray-200 text-gray-400 opacity-50"
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

      {/* LEGEND */}

      <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-600">

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-gray-300" />
          Eliminated
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-violet-300" />
          Search range
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-orange-500" />
          Mid
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-green-500" />
          Found
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
            disabled={isSearching}
            onChange={(e) =>
              setArraySize(Number(e.target.value))
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
            disabled={isSearching}
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

export default BinarySearch;