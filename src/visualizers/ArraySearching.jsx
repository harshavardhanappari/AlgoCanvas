import { useEffect, useState } from "react";
import algorithmInfo from "../data/algorithmInfo";
import AlgorithmInfo from "../components/AlgorithmInfo/AlgorithmInfo";
import PseudoCode from "../components/PseudoCode/PseudoCode";
import CurrentStep from "../components/CurrentStep/CurrentStep";

const ArraySearching = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(8);
  const [target, setTarget] = useState(7);
  const [speed, setSpeed] = useState(50);

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [foundIndex, setFoundIndex] = useState(-1);
  const [checkedCount, setCheckedCount] = useState(0);

  const [isSearching, setIsSearching] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [activeLine, setActiveLine] = useState(-1);

  const [status, setStatus] = useState("Ready");

  const [stepTitle, setStepTitle] =
    useState("Ready to Start");

  const [reason, setReason] = useState(
    "Choose a target and start searching through the array."
  );

  const [action, setAction] = useState("Waiting...");

  const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // --------------------------------------------------
  // Generate Array
  // --------------------------------------------------

  const generateArray = (size) => {
    if (isSearching) return;

    const newArray = Array.from(
      { length: size },
      () => Math.floor(Math.random() * 20) + 1
    );

    setArray(newArray);

    setTarget(newArray[2] ?? newArray[0]);

    setCurrentIndex(-1);
    setFoundIndex(-1);
    setCheckedCount(0);

    setIsCompleted(false);
    setActiveLine(-1);

    setStatus("Ready");

    setStepTitle("Ready to Start");

    setReason(
      "Choose a target and search the array from left to right."
    );

    setAction("Waiting...");
  };

  // --------------------------------------------------
  // Generate initial array
  // --------------------------------------------------

  useEffect(() => {
    generateArray(arraySize);
  }, [arraySize]);

  // --------------------------------------------------
  // Reset
  // --------------------------------------------------

  const reset = () => {
    if (isSearching) return;

    generateArray(arraySize);
  };

  // --------------------------------------------------
  // Start Search
  // --------------------------------------------------

  const startSearch = async () => {
    // Only prevent starting while another search is running
    if (
      isSearching ||
      array.length === 0
    ) {
      return;
    }

    // Reset previous search state
    setCurrentIndex(-1);
    setFoundIndex(-1);
    setCheckedCount(0);
    setActiveLine(-1);

    setIsCompleted(false);
    setIsSearching(true);

    setStatus("Searching");

    setStepTitle("Starting Search");

    setReason(
      `Searching for ${target} from left to right.`
    );

    setAction("Start searching");

    await sleep(
      Math.max(100, 400 - speed)
    );

    // --------------------------------------------------
    // Traverse array
    // --------------------------------------------------

    for (let i = 0; i < array.length; i++) {
      // Highlight for loop
      setActiveLine(1);

      setCurrentIndex(i);

      setStepTitle(
        `Checking Index ${i}`
      );

      setReason(
        `Comparing ${array[i]} with the target ${target}.`
      );

      setAction("Check element");

      await sleep(
        Math.max(150, 700 - speed)
      );

      // Count checked element
      setCheckedCount(
        (previous) => previous + 1
      );

      // Highlight comparison
      setActiveLine(2);

      // ------------------------------------------------
      // Target found
      // ------------------------------------------------

      if (array[i] === target) {
        setFoundIndex(i);

        setStepTitle(
          `Target Found at Index ${i}`
        );

        setReason(
          `${array[i]} equals the target ${target}.`
        );

        setAction("Target found");

        await sleep(
          Math.max(150, 600 - speed)
        );

        setCurrentIndex(-1);
        setActiveLine(-1);

        setStatus("Found");

        setStepTitle("Search Completed");

        setReason(
          `The first occurrence of ${target} is at index ${i}.`
        );

        setAction(
          "You can search for another target."
        );

        setIsSearching(false);
        setIsCompleted(true);

        return;
      }

      // ------------------------------------------------
      // Target not found at current index
      // ------------------------------------------------

      setReason(
        `${array[i]} is not equal to ${target}. Continue searching.`
      );

      setAction("Move to next element");

      await sleep(
        Math.max(100, 400 - speed)
      );
    }

    // --------------------------------------------------
    // Target not found
    // --------------------------------------------------

    setCurrentIndex(-1);
    setActiveLine(-1);

    setStatus("Not Found");

    setStepTitle("Target Not Found");

    setReason(
      `${target} does not exist in the array.`
    );

    setAction(
      "You can search for another target."
    );

    setIsSearching(false);
    setIsCompleted(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">

      {/* ==================================================
          HEADER
      ================================================== */}

      <div>
        <h1 className="text-4xl font-bold text-gray-900">
          Searching in Arrays
        </h1>

        <p className="mt-3 max-w-3xl text-lg leading-8 text-gray-600">
          Search through an array sequentially to find
          the first occurrence of a target element.
        </p>
      </div>

      {/* ==================================================
          ALGORITHM INFO
      ================================================== */}

      <AlgorithmInfo
        info={algorithmInfo.arraySearching}
      />

      {/* ==================================================
          PSEUDOCODE
      ================================================== */}

      <PseudoCode
        code={
          algorithmInfo.arraySearching.pseudoCode
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
              Target Value
            </label>

            <input
              type="number"
              value={target}
              disabled={isSearching}
              onChange={(e) =>
                setTarget(
                  Number(e.target.value)
                )
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />
          </div>

          {/* SEARCH */}

          <div className="flex items-end">

            <button
              disabled={
                isSearching ||
                array.length === 0
              }
              onClick={startSearch}
              className="w-full rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-300"
            >
              {isSearching
                ? "Searching..."
                : "Search"}
            </button>

          </div>

          {/* RESET */}

          <div className="flex items-end">

            <button
              disabled={isSearching}
              onClick={reset}
              className="w-full rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400"
            >
              Reset
            </button>

          </div>

        </div>

      </div>

      {/* ==================================================
          SEARCH SUMMARY
      ================================================== */}

      <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {/* TARGET */}

          <div>
            <p className="text-sm font-medium text-gray-500">
              Target
            </p>

            <p className="mt-2 text-2xl font-bold text-violet-600">
              {target}
            </p>
          </div>

          {/* CURRENT INDEX */}

          <div>
            <p className="text-sm font-medium text-gray-500">
              Current Index
            </p>

            <p className="mt-2 text-2xl font-bold text-orange-500">
              {currentIndex === -1
                ? "—"
                : currentIndex}
            </p>
          </div>

          {/* CHECKED */}

          <div>
            <p className="text-sm font-medium text-gray-500">
              Elements Checked
            </p>

            <p className="mt-2 text-2xl font-bold text-blue-600">
              {checkedCount}
            </p>
          </div>

          {/* RESULT */}

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
              {foundIndex !== -1
                ? `Index ${foundIndex}`
                : status === "Not Found"
                  ? "Not Found"
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
              Array
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Searching for{" "}
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

        <div className="flex flex-wrap items-center justify-center gap-4">

          {array.map((item, index) => {

            const isCurrent =
              index === currentIndex;

            const isFound =
              index === foundIndex;

            const wasChecked =
              checkedCount > index &&
              !isCurrent &&
              !isFound;

            return (
              <div
                key={index}
                className="flex flex-col items-center"
              >

                {/* POINTER */}

                {isCurrent ? (
                  <div className="mb-2 text-xl font-bold text-orange-500">
                    ↓
                  </div>
                ) : (
                  <div className="mb-2 h-7" />
                )}

                {/* VALUE */}

                <div
                  className={
                    isFound
                      ? "flex h-16 w-16 scale-110 items-center justify-center rounded-2xl border-2 border-green-600 bg-green-500 text-xl font-bold text-white shadow-lg"
                      : isCurrent
                        ? "flex h-16 w-16 scale-110 items-center justify-center rounded-2xl border-2 border-orange-600 bg-orange-500 text-xl font-bold text-white shadow-lg"
                        : wasChecked
                          ? "flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-gray-300 bg-gray-200 text-xl font-bold text-gray-500"
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

      </div>

      {/* ==================================================
          LEGEND
      ================================================== */}

      <div className="mt-6 flex flex-wrap justify-center gap-8 text-sm text-gray-600">

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded-md bg-white ring-2 ring-violet-300" />
          Not checked
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded-md bg-orange-500" />
          Current
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded-md bg-gray-300" />
          Checked
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded-md bg-green-500" />
          Found
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
            disabled={isSearching}
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
            disabled={isSearching}
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

export default ArraySearching;