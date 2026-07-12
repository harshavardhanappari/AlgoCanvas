import { useEffect, useState } from "react";
import sleep from "../utils/sleep";
import algorithmInfo from "../data/algorithmInfo";
import AlgorithmInfo from "../components/AlgorithmInfo/AlgorithmInfo";
import PseudoCode from "../components/PseudoCode/PseudoCode";
import Statistics from "../components/Statistics/Statistics";
import CurrentStep from "../components/CurrentStep/CurrentStep";

const SelectionSort = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(20);
  const [speed, setSpeed] = useState(50);

  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);

  const [activeBars, setActiveBars] = useState([]);
  const [sortedBars, setSortedBars] = useState([]);

  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [currentPass, setCurrentPass] = useState(0);
  const [status, setStatus] = useState("Ready");
  const [stepTitle, setStepTitle] = useState("Ready to Start");
  const [reason, setReason] = useState("Generate a new array and click Start.");
  const [action, setAction] = useState("Waiting...");
  const [showValues, setShowValues] = useState(false);
  const [activeLine, setActiveLine] = useState(-1);

  const generateArray = (size) => {
    if (isSorting) return;

    const newArray = [];

    for (let i = 0; i < size; i++) {
      newArray.push(Math.floor(Math.random() * 350) + 30);
    }

    setArray(newArray);
    setActiveBars([]);
    setSortedBars([]);
    setIsSorted(false);

    setComparisons(0);
    setSwaps(0);
    setCurrentPass(0);
    setStatus("Ready");
    setStepTitle("Ready to Start");
    setReason("Generate a new array and click Start.");
    setAction("Waiting...");
  };

  useEffect(() => {
    generateArray(arraySize);
  }, [arraySize]);

  const startSorting = async () => {
    setIsSorting(true);

    setStatus("Sorting...");
    setStepTitle("Selection Sort Started");
    setReason("Selection Sort repeatedly finds the minimum element.");
    setAction("Searching for the minimum element...");

    setComparisons(0);
    setSwaps(0);
    setCurrentPass(0);
    setActiveLine(0);

    let comparisonCount = 0;
    let swapCount = 0;

    const tempArray = [...array];
    const sorted = [];

    const delay = 510 - speed;

    for (let i = 0; i < tempArray.length - 1; i++) {
      let minIndex = i;

      setCurrentPass(i + 1);

      setStepTitle(`Pass ${i + 1}`);
      setReason(`Assume ${tempArray[minIndex]} is the minimum element.`);
      setAction("Searching for a smaller element...");

      setActiveLine(0);
      await sleep(delay / 2);

      setActiveLine(1);
      await sleep(delay / 2);

      for (let j = i + 1; j < tempArray.length; j++) {
        setActiveLine(2);

        setActiveBars([minIndex, j]);

        comparisonCount++;
        setComparisons(comparisonCount);

        await sleep(delay);

        setActiveLine(3);

        if (tempArray[j] < tempArray[minIndex]) {
          minIndex = j;

          setActiveLine(4);

          setStepTitle("New Minimum Found");
          setReason(`${tempArray[minIndex]} is the new minimum element.`);
          setAction("Updating minimum element.");

          await sleep(delay);
        }
      }

      if (minIndex !== i) {
        setActiveLine(5);

        setStepTitle("Swapping Elements");
        setReason(
          `Swap ${tempArray[i]} with the minimum element ${tempArray[minIndex]}.`,
        );
        setAction("Placing minimum element in its correct position.");

        [tempArray[i], tempArray[minIndex]] = [
          tempArray[minIndex],
          tempArray[i],
        ];

        swapCount++;
        setSwaps(swapCount);

        setArray([...tempArray]);

        await sleep(delay);
      }

      setActiveBars([]);

      sorted.push(i);
      setSortedBars([...sorted]);

      await sleep(delay / 2);
    }

    sorted.push(tempArray.length - 1);
    setSortedBars([...sorted]);

    setActiveBars([]);

    setStatus("Completed");

    setStepTitle("Selection Sort Completed");
    setReason("All elements are now in ascending order.");
    setAction("Done!");

    setActiveLine(-1);

    setIsSorting(false);
    setIsSorted(true);
  };

  const resetArray = () => {
    if (isSorting) return;

    generateArray(arraySize);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {/* Heading */}

      <h1 className="text-4xl font-bold text-gray-900">
        Selection Sort Visualizer
      </h1>

      <p className="mt-3 text-lg text-gray-600">
        Visualize Selection Sort step by step.
      </p>

      {/* Algorithm Information */}

      <AlgorithmInfo info={algorithmInfo.selectionSort} />

      {/* Pseudo Code */}

      <PseudoCode
        code={algorithmInfo.selectionSort.pseudoCode}
        activeLine={activeLine}
      />

      {/* Controls */}

      <div className="mt-10 flex flex-wrap items-center gap-6">
        <button
          disabled={isSorting}
          onClick={() => generateArray(arraySize)}
          className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-300"
        >
          Generate New Array
        </button>

        <button
          disabled={isSorting || isSorted}
          onClick={startSorting}
          className={`rounded-xl px-6 py-3 font-semibold transition ${
            isSorted
              ? "cursor-not-allowed border border-green-500 bg-green-50 text-green-600"
              : "border border-violet-600 text-violet-600 hover:bg-violet-50"
          } disabled:cursor-not-allowed`}
        >
          {isSorted ? "✓ Sorted" : "Start"}
        </button>

        <button
          disabled={isSorting}
          onClick={resetArray}
          className="rounded-xl border border-red-500 px-6 py-3 font-semibold text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:border-red-300 disabled:text-red-300"
        >
          Reset
        </button>

        <button
          onClick={() => setShowValues(!showValues)}
          className="rounded-xl border border-violet-600 px-6 py-3 font-semibold text-violet-600 transition hover:bg-violet-50"
        >
          {showValues ? "Hide Values" : "Show Values"}
        </button>
      </div>

      {/* Statistics */}

      <Statistics
        comparisons={comparisons}
        swaps={swaps}
        currentPass={currentPass}
        status={status}
      />

      {/* Sliders */}

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-semibold text-gray-700">
            Array Size : {arraySize}
          </label>

          <input
            type="range"
            min="5"
            max="50"
            value={arraySize}
            disabled={isSorting}
            onChange={(e) => setArraySize(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="mb-2 flex justify-between font-semibold text-gray-700">
            <span>Animation Speed</span>

            <span className="text-sm text-gray-500">Slow ← → Fast</span>
          </label>

          <input
            type="range"
            min="10"
            max="500"
            step="10"
            value={speed}
            disabled={isSorting}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Visualization */}

      <div className="mt-16 flex h-[450px] items-end justify-center gap-1 rounded-2xl border bg-gray-50 p-6">
        {array.map((value, index) => (
          <div key={index} className="flex flex-col items-center">
            {showValues && (
              <span className="mb-1 text-xs font-semibold text-gray-700">
                {value}
              </span>
            )}

            <div
              style={{
                height: `${value}px`,
                width: `${Math.max(8, 700 / arraySize)}px`,
              }}
              className={`rounded-t-md transition-all duration-300 ${
                sortedBars.includes(index)
                  ? "bg-green-500"
                  : activeBars.includes(index)
                    ? "bg-red-500"
                    : "bg-violet-600"
              }`}
            />
          </div>
        ))}
      </div>
      <CurrentStep title={stepTitle} reason={reason} action={action} />
    </div>
  );
};

export default SelectionSort;
