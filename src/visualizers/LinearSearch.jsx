import { useEffect, useState } from "react";
import algorithmInfo from "../data/algorithmInfo";
import AlgorithmInfo from "../components/AlgorithmInfo/AlgorithmInfo";
import PseudoCode from "../components/PseudoCode/PseudoCode";
import Statistics from "../components/Statistics/Statistics";
import CurrentStep from "../components/CurrentStep/CurrentStep";

const LinearSearch = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(8);
  const [speed, setSpeed] = useState(50);
  const [target, setTarget] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [foundIndex, setFoundIndex] = useState(-1);

  const [comparisons, setComparisons] = useState(0);

  const [isSearching, setIsSearching] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [activeLine, setActiveLine] = useState(-1);

  const [status, setStatus] = useState("Ready");
  const [stepTitle, setStepTitle] = useState("Ready to Start");
  const [reason, setReason] = useState(
    "Generate an array and click Start."
  );
  const [action, setAction] = useState("Waiting...");

  const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const generateArray = (size) => {
    if (isSearching) return;

    const newArray = Array.from(
      { length: size },
      () => Math.floor(Math.random() * 20) + 1
    );

    setArray(newArray);

    // Pick a target that exists in the array
    const randomIndex = Math.floor(
      Math.random() * newArray.length
    );

    setTarget(newArray[randomIndex]);

    setCurrentIndex(-1);
    setFoundIndex(-1);

    setComparisons(0);

    setIsCompleted(false);

    setActiveLine(-1);

    setStatus("Ready");
    setStepTitle("Ready to Start");
    setReason(
      "Search for the target element from left to right."
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

    let comparisonCount = 0;

    setStatus("Searching...");

    for (let i = 0; i < array.length; i++) {
      setCurrentIndex(i);

      // Line 1: for loop
      setActiveLine(1);

      setStepTitle(`Checking Index ${i}`);

      setReason(
        `Compare ${array[i]} with target ${target}.`
      );

      setAction("Compare");

      await sleep(
        Math.max(100, 700 - speed)
      );

      // Line 2: comparison
      setActiveLine(2);

      comparisonCount++;

      setComparisons(comparisonCount);

      if (array[i] === target) {
        // Line 3: return
        setActiveLine(3);

        setFoundIndex(i);

        setStatus("Found");

        setStepTitle(
          `Target Found at Index ${i}`
        );

        setReason(
          `${array[i]} matches the target ${target}.`
        );

        setAction("Return index");

        await sleep(
          Math.max(100, 700 - speed)
        );

        setCurrentIndex(-1);
        setIsSearching(false);
        setIsCompleted(true);

        return;
      }

      setStepTitle(
        `Not Found at Index ${i}`
      );

      setReason(
        `${array[i]} does not match ${target}. Move to the next element.`
      );

      setAction("Move to next index");

      await sleep(
        Math.max(100, 500 - speed)
      );
    }

    // Line 4: return -1
    setActiveLine(4);

    setCurrentIndex(-1);

    setStatus("Not Found");

    setStepTitle("Target Not Found");

    setReason(
      `The target ${target} does not exist in the array.`
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
        Linear Search Visualizer
      </h1>

      <p className="mt-3 text-lg text-gray-600">
        Search for an element by checking each value from
        left to right.
      </p>

      {/* ALGORITHM INFO */}

      <AlgorithmInfo
        info={algorithmInfo.linearSearch}
      />

      {/* PSEUDOCODE */}

      <PseudoCode
        code={
          algorithmInfo.linearSearch.pseudoCode
        }
        activeLine={activeLine}
      />

      {/* CONTROLS */}

      <div className="mt-10 flex flex-wrap items-center gap-4">

        <button
          disabled={isSearching}
          onClick={() =>
            generateArray(arraySize)
          }
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

      {/* TARGET */}

      <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">

        <div className="flex flex-wrap items-center justify-between gap-4">

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
              Current Index
            </p>

            <p className="mt-1 text-3xl font-bold text-blue-700">
              {currentIndex === -1
                ? "—"
                : currentIndex}
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

            const isCurrent =
              index === currentIndex;

            const isFound =
              index === foundIndex;

            return (
              <div
                key={index}
                className="flex flex-col items-center"
              >

                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-xl border-2 text-xl font-bold transition-all duration-300 ${
                    isFound
                      ? "scale-110 border-green-500 bg-green-500 text-white shadow-lg"
                      : isCurrent
                        ? "scale-110 border-red-500 bg-red-500 text-white shadow-lg"
                        : "border-violet-300 bg-violet-100 text-violet-800"
                  }`}
                >
                  {value}
                </div>

                <span className="mt-2 text-sm text-gray-400">
                  {index}
                </span>

              </div>
            );
          })}

        </div>

      </div>

      {/* CONTROLS */}

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
            disabled={isSearching}
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

export default LinearSearch;