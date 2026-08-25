import { useEffect, useState } from "react";
import algorithmInfo from "../data/algorithmInfo";
import AlgorithmInfo from "../components/AlgorithmInfo/AlgorithmInfo";
import PseudoCode from "../components/PseudoCode/PseudoCode";
import Statistics from "../components/Statistics/Statistics";
import CurrentStep from "../components/CurrentStep/CurrentStep";

const ArrayTraversal = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(8);
  const [speed, setSpeed] = useState(50);

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [visited, setVisited] = useState([]);

  const [isTraversing, setIsTraversing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [activeLine, setActiveLine] = useState(-1);

  const [status, setStatus] = useState("Ready");
  const [stepTitle, setStepTitle] =
    useState("Ready to Start");

  const [reason, setReason] = useState(
    "Generate an array and start traversal."
  );

  const [action, setAction] = useState("Waiting...");

  const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const generateArray = (size) => {
    if (isTraversing) return;

    const newArray = Array.from(
      { length: size },
      () => Math.floor(Math.random() * 20) + 1
    );

    setArray(newArray);

    setCurrentIndex(-1);
    setVisited([]);

    setIsCompleted(false);
    setActiveLine(-1);

    setStatus("Ready");

    setStepTitle("Ready to Start");

    setReason(
      "Array traversal visits every element from left to right."
    );

    setAction("Waiting...");
  };

  useEffect(() => {
    generateArray(arraySize);
  }, [arraySize]);

  const resetArray = () => {
    if (isTraversing) return;

    generateArray(arraySize);
  };

  const startTraversal = async () => {
    if (
      isTraversing ||
      isCompleted ||
      array.length === 0
    ) {
      return;
    }

    setIsTraversing(true);
    setStatus("Traversing...");

    for (let i = 0; i < array.length; i++) {
      // Line 1: for loop
      setActiveLine(1);

      setCurrentIndex(i);

      setStepTitle(`Visiting Index ${i}`);

      setReason(
        `Current element is ${array[i]}.`
      );

      setAction("Visit element");

      await sleep(
        Math.max(100, 700 - speed)
      );

      // Line 2: visit array[i]
      setActiveLine(2);

      setVisited((previous) => [
        ...previous,
        i,
      ]);

      setStepTitle(
        `Visited Index ${i}`
      );

      setReason(
        `Element ${array[i]} has been visited.`
      );

      setAction("Move to next element");

      await sleep(
        Math.max(100, 500 - speed)
      );
    }

    setCurrentIndex(-1);

    setActiveLine(-1);

    setStatus("Completed");

    setStepTitle(
      "Traversal Completed"
    );

    setReason(
      "Every element in the array has been visited."
    );

    setAction("Finished");

    setIsTraversing(false);
    setIsCompleted(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">

      {/* HEADER */}

      <h1 className="text-4xl font-bold text-gray-900">
        Array Traversal Visualizer
      </h1>

      <p className="mt-3 text-lg text-gray-600">
        Visit each element of an array sequentially
        from left to right.
      </p>

      {/* ALGORITHM INFO */}

      <AlgorithmInfo
        info={algorithmInfo.arrayTraversal}
      />

      {/* PSEUDOCODE */}

      <PseudoCode
        code={algorithmInfo.arrayTraversal.pseudoCode}
        activeLine={activeLine}
      />

      {/* CONTROLS */}

      <div className="mt-10 flex flex-wrap items-center gap-4">

        <button
          disabled={isTraversing}
          onClick={() =>
            generateArray(arraySize)
          }
          className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-300"
        >
          Generate New Array
        </button>

        <button
          disabled={
            isTraversing ||
            isCompleted ||
            array.length === 0
          }
          onClick={startTraversal}
          className="rounded-xl border border-violet-600 px-6 py-3 font-semibold text-violet-600 hover:bg-violet-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
        >
          {isCompleted
            ? "Completed"
            : "Start"}
        </button>

        <button
          disabled={isTraversing}
          onClick={resetArray}
          className="rounded-xl border border-red-500 px-6 py-3 font-semibold text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
        >
          Reset
        </button>

      </div>

      {/* PROGRESS */}

      <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">

        <div className="grid gap-6 sm:grid-cols-3">

          <div>
            <p className="text-sm font-medium text-gray-500">
              Current Index
            </p>

            <p className="mt-1 text-3xl font-bold text-blue-600">
              {currentIndex === -1
                ? "—"
                : currentIndex}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              Visited
            </p>

            <p className="mt-1 text-3xl font-bold text-green-600">
              {visited.length} / {array.length}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              Status
            </p>

            <p className="mt-1 text-3xl font-bold text-violet-600">
              {status}
            </p>
          </div>

        </div>

      </div>

      {/* STATISTICS */}

      <Statistics
        comparisons={0}
        swaps={0}
        currentPass={visited.length}
        status={status}
      />

      {/* ARRAY */}

      <div className="mt-10 rounded-2xl border bg-gray-50 p-8">

        <div className="flex flex-wrap justify-center gap-3">

          {array.map((value, index) => {

            const isCurrent =
              index === currentIndex;

            const isVisited =
              visited.includes(index);

            return (
              <div
                key={index}
                className="flex flex-col items-center"
              >

                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-xl border-2 text-xl font-bold transition-all duration-300 ${
                    isCurrent
                      ? "scale-110 border-orange-600 bg-orange-500 text-white shadow-lg"
                      : isVisited
                        ? "border-green-500 bg-green-100 text-green-700"
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
          Not visited
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-orange-500" />
          Current
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-green-500" />
          Visited
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
            disabled={isTraversing}
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
            disabled={isTraversing}
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

export default ArrayTraversal;