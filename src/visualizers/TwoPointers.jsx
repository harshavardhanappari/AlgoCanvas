import { useEffect, useState } from "react";
import algorithmInfo from "../data/algorithmInfo";
import AlgorithmInfo from "../components/AlgorithmInfo/AlgorithmInfo";
import PseudoCode from "../components/PseudoCode/PseudoCode";
import CurrentStep from "../components/CurrentStep/CurrentStep";

const TwoPointers = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(7);
  const [target, setTarget] = useState(10);
  const [speed, setSpeed] = useState(50);

  const [left, setLeft] = useState(-1);
  const [right, setRight] = useState(-1);

  const [currentSum, setCurrentSum] = useState(null);
  const [comparisons, setComparisons] = useState(0);

  const [foundPair, setFoundPair] = useState(null);

  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [activeLine, setActiveLine] = useState(-1);

  const [status, setStatus] = useState("Ready");

  const [stepTitle, setStepTitle] =
    useState("Ready to Start");

  const [reason, setReason] = useState(
    "Choose a target sum and start the two-pointer search."
  );

  const [action, setAction] = useState("Waiting...");

  const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // --------------------------------------------------
  // Generate sorted array
  // --------------------------------------------------

  const generateArray = (size) => {
    if (isRunning) return;

    const newArray = Array.from(
      { length: size },
      () => Math.floor(Math.random() * 20) + 1
    ).sort((a, b) => a - b);

    setArray(newArray);

    setTarget(
      newArray.length >= 2
        ? newArray[0] + newArray[newArray.length - 1]
        : 10
    );

    setLeft(-1);
    setRight(-1);

    setCurrentSum(null);
    setComparisons(0);
    setFoundPair(null);

    setIsCompleted(false);
    setActiveLine(-1);

    setStatus("Ready");

    setStepTitle("Ready to Start");

    setReason(
      "The array is sorted. Two pointers will start from opposite ends."
    );

    setAction("Waiting...");
  };

  useEffect(() => {
    generateArray(arraySize);
  }, [arraySize]);

  // --------------------------------------------------
  // Reset
  // --------------------------------------------------

  const reset = () => {
    if (isRunning) return;

    generateArray(arraySize);
  };

  // --------------------------------------------------
  // Start Two Pointer Search
  // --------------------------------------------------

  const startSearch = async () => {
    if (
      isRunning ||
      array.length < 2
    ) {
      return;
    }

    setIsRunning(true);
    setIsCompleted(false);

    setLeft(0);
    setRight(array.length - 1);

    setCurrentSum(null);
    setComparisons(0);
    setFoundPair(null);

    setStatus("Searching");

    let l = 0;
    let r = array.length - 1;

    while (l < r) {
      // ------------------------------------------------
      // Set pointers
      // ------------------------------------------------

      setActiveLine(0);

      setLeft(l);
      setRight(r);

      setStepTitle(
        `Checking Indices ${l} and ${r}`
      );

      setReason(
        `The left pointer is at ${array[l]} and the right pointer is at ${array[r]}.`
      );

      setAction("Compare pair");

      await sleep(
        Math.max(150, 700 - speed)
      );

      // ------------------------------------------------
      // Calculate sum
      // ------------------------------------------------

      const sum =
        array[l] + array[r];

      setActiveLine(3);

      setCurrentSum(sum);

      setComparisons(
        (previous) => previous + 1
      );

      setStepTitle(
        `${array[l]} + ${array[r]} = ${sum}`
      );

      setReason(
        `Compare the current pair sum ${sum} with the target ${target}.`
      );

      setAction("Calculate sum");

      await sleep(
        Math.max(150, 700 - speed)
      );

      // ------------------------------------------------
      // Found
      // ------------------------------------------------

      if (sum === target) {
        setActiveLine(4);

        setFoundPair([l, r]);

        setStatus("Found");

        setStepTitle(
          "Pair Found!"
        );

        setReason(
          `${array[l]} + ${array[r]} = ${target}.`
        );

        setAction("Target pair found");

        await sleep(
          Math.max(150, 700 - speed)
        );

        setIsRunning(false);
        setIsCompleted(true);

        setActiveLine(-1);

        return;
      }

      // ------------------------------------------------
      // Sum smaller than target
      // ------------------------------------------------

      if (sum < target) {
        setActiveLine(5);

        setStepTitle(
          `${sum} < ${target}`
        );

        setReason(
          "The sum is too small, so move the left pointer to increase the sum."
        );

        setAction("Move left pointer");

        await sleep(
          Math.max(150, 700 - speed)
        );

        l++;

        setLeft(l);

        continue;
      }

      // ------------------------------------------------
      // Sum greater than target
      // ------------------------------------------------

      setActiveLine(7);

      setStepTitle(
        `${sum} > ${target}`
      );

      setReason(
        "The sum is too large, so move the right pointer to decrease the sum."
      );

      setAction("Move right pointer");

      await sleep(
        Math.max(150, 700 - speed)
      );

      r--;

      setRight(r);
    }

    // --------------------------------------------------
    // No pair found
    // --------------------------------------------------

    setLeft(-1);
    setRight(-1);

    setStatus("Not Found");

    setStepTitle(
      "No Pair Found"
    );

    setReason(
      `No two elements in the array add up to ${target}.`
    );

    setAction("Search finished");

    setIsRunning(false);
    setIsCompleted(true);

    setActiveLine(-1);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">

      {/* ==================================================
          HEADER
      ================================================== */}

      <div>
        <h1 className="text-4xl font-bold text-gray-900">
          Two Pointers
        </h1>

        <p className="mt-3 max-w-3xl text-lg leading-8 text-gray-600">
          Use two pointers from opposite ends of a sorted
          array to find a pair whose sum equals the target.
        </p>
      </div>

      {/* ==================================================
          ALGORITHM INFO
      ================================================== */}

      <AlgorithmInfo
        info={algorithmInfo.twoPointers}
      />

      {/* ==================================================
          PSEUDOCODE
      ================================================== */}

      <PseudoCode
        code={
          algorithmInfo.twoPointers.pseudoCode
        }
        activeLine={activeLine}
      />

      {/* ==================================================
          CONTROLS
      ================================================== */}

      <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">

        <div className="grid gap-6 md:grid-cols-3">

          {/* TARGET */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Target Sum
            </label>

            <input
              type="number"
              value={target}
              disabled={isRunning}
              onChange={(e) =>
                setTarget(
                  Number(e.target.value)
                )
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />
          </div>

          {/* START */}

          <div className="flex items-end">

            <button
              disabled={
                isRunning ||
                array.length < 2
              }
              onClick={startSearch}
              className="w-full rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-300"
            >
              {isRunning
                ? "Searching..."
                : "Find Pair"}
            </button>

          </div>

          {/* RESET */}

          <div className="flex items-end">

            <button
              disabled={isRunning}
              onClick={reset}
              className="w-full rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400"
            >
              Reset
            </button>

          </div>

        </div>

      </div>

      {/* ==================================================
          SUMMARY
      ================================================== */}

      <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          <div>
            <p className="text-sm font-medium text-gray-500">
              Target Sum
            </p>

            <p className="mt-2 text-2xl font-bold text-violet-600">
              {target}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              Current Sum
            </p>

            <p className="mt-2 text-2xl font-bold text-orange-500">
              {currentSum ?? "—"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              Comparisons
            </p>

            <p className="mt-2 text-2xl font-bold text-blue-600">
              {comparisons}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              Result
            </p>

            <p
              className={`mt-2 text-2xl font-bold ${
                status === "Found"
                  ? "text-green-600"
                  : status === "Not Found"
                    ? "text-red-500"
                    : "text-gray-900"
              }`}
            >
              {foundPair
                ? `${foundPair[0]}, ${foundPair[1]}`
                : status === "Not Found"
                  ? "No Pair"
                  : "—"}
            </p>
          </div>

        </div>

      </div>

      {/* ==================================================
          ARRAY VISUALIZATION
      ================================================== */}

      <div className="mt-10 rounded-3xl border border-gray-200 bg-gray-50 p-8">

        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Sorted Array
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Find two values whose sum is{" "}
              <span className="font-semibold text-violet-600">
                {target}
              </span>
            </p>
          </div>

          <div
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              status === "Found"
                ? "bg-green-100 text-green-700"
                : status === "Not Found"
                  ? "bg-red-100 text-red-700"
                  : status === "Ready"
                    ? "bg-gray-100 text-gray-600"
                    : "bg-orange-100 text-orange-700"
            }`}
          >
            {status}
          </div>

        </div>

        {/* ARRAY */}

        <div className="flex flex-wrap items-end justify-center gap-4">

          {array.map((item, index) => {

            const isLeft =
              index === left;

            const isRight =
              index === right;

            const isFound =
              foundPair?.includes(index);

            const isPointer =
              isLeft || isRight;

            return (
              <div
                key={index}
                className="flex flex-col items-center"
              >

                {/* POINTER LABEL */}

                <div className="mb-2 h-7 text-sm font-bold">

                  {isFound ? (
                    <span className="text-green-600">
                      ✓
                    </span>
                  ) : isLeft && isRight ? (
                    <span className="text-orange-500">
                      L / R
                    </span>
                  ) : isLeft ? (
                    <span className="text-orange-500">
                      L
                    </span>
                  ) : isRight ? (
                    <span className="text-orange-500">
                      R
                    </span>
                  ) : null}

                </div>

                {/* VALUE */}

                <div
                  className={
                    isFound
                      ? "flex h-16 w-16 scale-110 items-center justify-center rounded-2xl border-2 border-green-600 bg-green-500 text-xl font-bold text-white shadow-lg"
                      : isPointer
                        ? "flex h-16 w-16 scale-110 items-center justify-center rounded-2xl border-2 border-orange-600 bg-orange-500 text-xl font-bold text-white shadow-lg"
                        : "flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-violet-300 bg-white text-xl font-bold text-gray-800 shadow-sm"
                  }
                >
                  {item}
                </div>

                {/* INDEX */}

                <div className="mt-3 text-sm font-medium text-gray-400">
                  index {index}
                </div>

              </div>
            );
          })}

        </div>

        {/* CURRENT EQUATION */}

        {left !== -1 &&
          right !== -1 &&
          left < right && (
            <div className="mt-10 text-center">

              <p className="text-sm font-medium text-gray-500">
                Current Pair
              </p>

              <p className="mt-2 text-3xl font-bold text-gray-900">
                {array[left]} + {array[right]} ={" "}
                {currentSum ?? "?"}
              </p>

            </div>
          )}

      </div>

      {/* ==================================================
          LEGEND
      ================================================== */}

      <div className="mt-6 flex flex-wrap justify-center gap-8 text-sm text-gray-600">

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded-md bg-white ring-2 ring-violet-300" />
          Normal
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded-md bg-orange-500" />
          Active Pointer
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded-md bg-green-500" />
          Found Pair
        </div>

      </div>

      {/* ==================================================
          ARRAY SIZE + SPEED
      ================================================== */}

      <div className="mt-10 grid gap-8 rounded-3xl border border-gray-200 bg-white p-7 md:grid-cols-2">

        {/* ARRAY SIZE */}

        <div>

          <div className="mb-2 flex items-center justify-between">

            <label className="font-semibold text-gray-700">
              Array Size
            </label>

            <span className="font-bold text-violet-600">
              {arraySize}
            </span>

          </div>

          <input
            type="range"
            min="5"
            max="12"
            value={arraySize}
            disabled={isRunning}
            onChange={(e) =>
              setArraySize(
                Number(e.target.value)
              )
            }
            className="w-full accent-violet-600"
          />

        </div>

        {/* SPEED */}

        <div>

          <div className="mb-2 flex items-center justify-between">

            <label className="font-semibold text-gray-700">
              Animation Speed
            </label>

            <span className="font-bold text-violet-600">
              {speed < 180
                ? "Fast"
                : speed < 350
                  ? "Medium"
                  : "Slow"}
            </span>

          </div>

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
            className="w-full accent-violet-600"
          />

        </div>

      </div>

      {/* ==================================================
          CURRENT STEP
      ================================================== */}

      <CurrentStep
        title={stepTitle}
        reason={reason}
        action={action}
      />

    </div>
  );
};

export default TwoPointers;