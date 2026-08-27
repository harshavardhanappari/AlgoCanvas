import { useEffect, useState } from "react";
import algorithmInfo from "../data/algorithmInfo";
import AlgorithmInfo from "../components/AlgorithmInfo/AlgorithmInfo";
import PseudoCode from "../components/PseudoCode/PseudoCode";
import Statistics from "../components/Statistics/Statistics";
import CurrentStep from "../components/CurrentStep/CurrentStep";

const SlidingWindow = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(8);
  const [windowSize, setWindowSize] = useState(3);
  const [speed, setSpeed] = useState(50);

  const [windowStart, setWindowStart] = useState(-1);
  const [windowEnd, setWindowEnd] = useState(-1);

  const [currentSum, setCurrentSum] = useState(0);
  const [maxSum, setMaxSum] = useState(null);
  const [bestStart, setBestStart] = useState(-1);

  const [comparisons, setComparisons] = useState(0);

  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [activeLine, setActiveLine] = useState(-1);

  const [status, setStatus] = useState("Ready");

  const [stepTitle, setStepTitle] =
    useState("Ready to Start");

  const [reason, setReason] = useState(
    "Generate an array and start the Sliding Window algorithm."
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

    setWindowStart(-1);
    setWindowEnd(-1);

    setCurrentSum(0);
    setMaxSum(null);
    setBestStart(-1);

    setComparisons(0);

    setActiveLine(-1);

    setIsCompleted(false);

    setStatus("Ready");

    setStepTitle("Ready to Start");

    setReason(
      "Choose a window size and find the maximum sum subarray."
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

    setWindowStart(-1);
    setWindowEnd(-1);

    setCurrentSum(0);
    setMaxSum(null);
    setBestStart(-1);

    setComparisons(0);

    setActiveLine(-1);

    setIsCompleted(false);

    setStatus("Ready");

    setStepTitle("Ready to Start");

    setReason(
      "The array is ready for another Sliding Window operation."
    );

    setAction("Waiting...");
  };

  // ==========================================
  // START ALGORITHM
  // ==========================================

  const startSlidingWindow = async () => {
    if (
      isRunning ||
      array.length === 0 ||
      windowSize > array.length
    ) {
      return;
    }

    // Reset previous run

    setWindowStart(-1);
    setWindowEnd(-1);

    setCurrentSum(0);
    setMaxSum(null);
    setBestStart(-1);

    setComparisons(0);

    setIsCompleted(false);

    setIsRunning(true);

    setStatus("Running");

    const delay =
      Math.max(150, 800 - speed);

    let currentWindowSum = 0;

    // ==========================================
    // BUILD FIRST WINDOW
    // ==========================================

    setWindowStart(0);
    setWindowEnd(windowSize - 1);

    setActiveLine(0);

    setStepTitle("Build First Window");

    setReason(
      `Calculate the sum of the first ${windowSize} elements.`
    );

    setAction("Create first window");

    await sleep(delay);

    for (let i = 0; i < windowSize; i++) {
      currentWindowSum += array[i];
    }

    setCurrentSum(currentWindowSum);

    setActiveLine(1);

    setStepTitle(
      `First Window Sum = ${currentWindowSum}`
    );

    setReason(
      `The first window covers index 0 to ${windowSize - 1}.`
    );

    setAction("Calculate window sum");

    await sleep(delay);

    // ==========================================
    // INITIAL MAXIMUM
    // ==========================================

    let maximumSum = currentWindowSum;
    let maximumStart = 0;

    setMaxSum(maximumSum);
    setBestStart(maximumStart);

    setActiveLine(2);

    setStepTitle("Initial Maximum Sum");

    setReason(
      `The first window sum ${maximumSum} becomes our initial maximum.`
    );

    setAction("Store maximum sum");

    await sleep(delay);

    // ==========================================
    // SLIDE WINDOW
    // ==========================================

    for (
      let right = windowSize;
      right < array.length;
      right++
    ) {
      const left =
        right - windowSize;

      // Move window

      setWindowStart(left + 1);
      setWindowEnd(right);

      setActiveLine(3);

      setStepTitle("Slide Window Right");

      setReason(
        `Move the window by removing ${array[left]} and adding ${array[right]}.`
      );

      setAction("Slide window");

      await sleep(delay);

      // Remove left element

      currentWindowSum -= array[left];

      setCurrentSum(currentWindowSum);

      setActiveLine(4);

      setStepTitle(
        `Remove ${array[left]}`
      );

      setReason(
        `The element at index ${left} leaves the window.`
      );

      setAction("Remove left element");

      await sleep(delay);

      // Add right element

      currentWindowSum += array[right];

      setCurrentSum(currentWindowSum);

      setActiveLine(5);

      setStepTitle(
        `Add ${array[right]}`
      );

      setReason(
        `The element at index ${right} enters the window.`
      );

      setAction("Add right element");

      await sleep(delay);

      // Compare with maximum

      setComparisons(
        (previous) => previous + 1
      );

      setActiveLine(6);

      setStepTitle(
        `Compare ${currentWindowSum} with ${maximumSum}`
      );

      setReason(
        "Check whether the current window has a larger sum."
      );

      setAction("Compare with maximum");

      await sleep(delay);

      // New maximum found

      if (currentWindowSum > maximumSum) {
        maximumSum = currentWindowSum;
        maximumStart = left + 1;

        setMaxSum(maximumSum);
        setBestStart(maximumStart);

        setStepTitle("New Maximum Found!");

        setReason(
          `This window has a new maximum sum of ${maximumSum}.`
        );

        setAction("Store best window");

        await sleep(delay);
      }
    }

    // ==========================================
    // COMPLETED
    // ==========================================

    setWindowStart(maximumStart);
    setWindowEnd(
      maximumStart + windowSize - 1
    );

    setCurrentSum(maximumSum);

    setActiveLine(-1);

    setStatus("Completed");

    setStepTitle(
      "Sliding Window Completed"
    );

    setReason(
      `Maximum sum ${maximumSum} was found using a window of size ${windowSize}.`
    );

    setAction("Maximum window found");

    setIsRunning(false);
    setIsCompleted(true);
  };

  const bestWindowValues =
    bestStart === -1
      ? []
      : array.slice(
          bestStart,
          bestStart + windowSize
        );

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">

      {/* HEADER */}

      <h1 className="text-4xl font-bold text-gray-900">
        Sliding Window Visualizer
      </h1>

      <p className="mt-3 text-lg text-gray-600">
        Find the maximum sum subarray of size K
        using the Sliding Window technique.
      </p>

      {/* ALGORITHM INFO */}

      <AlgorithmInfo
        info={algorithmInfo.slidingWindow}
      />

      {/* PSEUDOCODE */}

      <PseudoCode
        code={
          algorithmInfo.slidingWindow.pseudoCode
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
          onClick={startSlidingWindow}
          className="rounded-xl border border-violet-600 px-6 py-3 font-semibold text-violet-600 hover:bg-violet-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
        >
          {isRunning
            ? "Running..."
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

      {/* WINDOW SIZE */}

      <div className="mt-8 max-w-sm">

        <label className="mb-2 block font-semibold text-gray-700">
          Window Size: {windowSize}
        </label>

        <input
          type="range"
          min="2"
          max={array.length}
          value={windowSize}
          disabled={isRunning}
          onChange={(e) =>
            setWindowSize(
              Number(e.target.value)
            )
          }
          className="w-full"
        />

      </div>

      {/* PROGRESS */}

      <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">

        <div className="grid gap-6 sm:grid-cols-4">

          <div>
            <p className="text-sm font-medium text-gray-500">
              Window Size
            </p>

            <p className="mt-1 text-3xl font-bold text-violet-600">
              {windowSize}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              Current Sum
            </p>

            <p className="mt-1 text-3xl font-bold text-orange-500">
              {currentSum === 0
                ? "—"
                : currentSum}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              Maximum Sum
            </p>

            <p className="mt-1 text-3xl font-bold text-green-600">
              {maxSum ?? "—"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              Status
            </p>

            <p className="mt-1 text-3xl font-bold text-blue-600">
              {status}
            </p>
          </div>

        </div>

      </div>

      {/* BEST WINDOW RESULT */}

      {maxSum !== null && (
        <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6">

          <h2 className="text-lg font-bold text-green-800">
            Best Window Found
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">

            <div>
              <p className="text-sm text-green-700">
                Maximum Sum
              </p>

              <p className="text-2xl font-bold text-green-800">
                {maxSum}
              </p>
            </div>

            <div>
              <p className="text-sm text-green-700">
                Indices
              </p>

              <p className="text-2xl font-bold text-green-800">
                {bestStart} →{" "}
                {bestStart + windowSize - 1}
              </p>
            </div>

            <div>
              <p className="text-sm text-green-700">
                Window Elements
              </p>

              <p className="text-xl font-bold text-green-800">
                [{bestWindowValues.join(", ")}]
              </p>
            </div>

          </div>

        </div>
      )}

      {/* STATISTICS */}

      <Statistics
        comparisons={comparisons}
        swaps={0}
        currentPass={
          windowStart === -1
            ? 0
            : windowStart + 1
        }
        status={status}
      />

      {/* ARRAY */}

      <div className="mt-10 rounded-2xl border bg-gray-50 p-8">

        <div className="flex flex-wrap justify-center gap-3">

          {array.map((value, index) => {

            const isCurrentWindow =
              index >= windowStart &&
              index <= windowEnd;

            const isFinalBestWindow =
              isCompleted &&
              index >= bestStart &&
              index <
                bestStart + windowSize;

            return (
              <div
                key={index}
                className="flex flex-col items-center"
              >

                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-xl border-2 text-xl font-bold transition-all duration-300 ${
                    isFinalBestWindow
                      ? "scale-110 border-green-600 bg-green-500 text-white shadow-lg"
                      : isCurrentWindow
                        ? "scale-105 border-orange-600 bg-orange-500 text-white shadow-lg"
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
          <span className="h-4 w-4 rounded bg-violet-300" />
          Outside Window
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-orange-500" />
          Current Window
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-green-500" />
          Final Maximum Window
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

export default SlidingWindow;