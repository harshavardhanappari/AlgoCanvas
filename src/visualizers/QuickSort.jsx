import { useEffect, useState } from "react";
import sleep from "../utils/sleep";
import algorithmInfo from "../data/algorithmInfo";
import AlgorithmInfo from "../components/AlgorithmInfo/AlgorithmInfo";
import PseudoCode from "../components/PseudoCode/PseudoCode";
import Statistics from "../components/Statistics/Statistics";
import CurrentStep from "../components/CurrentStep/CurrentStep";

const QuickSort = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(20);
  const [speed, setSpeed] = useState(50);

  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);

  const [activeBars, setActiveBars] = useState([]);
  const [sortedBars, setSortedBars] = useState([]);

  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  const [status, setStatus] = useState("Ready");
  const [stepTitle, setStepTitle] = useState("Ready to Start");
  const [reason, setReason] = useState("Generate a new array and click Start.");
  const [action, setAction] = useState("Waiting...");

  const [activeLine, setActiveLine] = useState(-1);

  const [pivotIndex, setPivotIndex] = useState(-1);
  const [leftPointer, setLeftPointer] = useState(-1);
  const [rightPointer, setRightPointer] = useState(-1);

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

    setStatus("Ready");
    setStepTitle("Ready to Start");
    setReason("Generate a new array and click Start.");
    setAction("Waiting...");

    setActiveLine(-1);

    setPivotIndex(-1);
    setLeftPointer(-1);
    setRightPointer(-1);
  };

  useEffect(() => {
    generateArray(arraySize);
  }, [arraySize]);

  const resetArray = () => {
    if (isSorting) return;

    generateArray(arraySize);
  };

  const startSorting = async () => {
    if (isSorting || isSorted || array.length === 0) return;

    setIsSorting(true);
    setIsSorted(false);

    setComparisons(0);
    setSwaps(0);

    const workingArray = [...array];

    const partition = async (left, right) => {
      setActiveLine(2);

      const pivot = workingArray[right];

      setPivotIndex(right);

      setLeftPointer(left);
      setRightPointer(right - 1);

      setStatus("Partitioning...");
      setStepTitle(`Choosing Pivot: ${pivot}`);

      setReason(`Using ${pivot} as the pivot for range [${left}-${right}].`);

      setAction("Choose pivot");

      await sleep(Math.max(100, 700 - speed));

      let i = left;

      for (let j = left; j < right; j++) {
        setActiveLine(7);

        setLeftPointer(i);
        setRightPointer(j);

        setActiveBars([i, j, right]);

        setStepTitle(`Comparing ${workingArray[j]} with Pivot ${pivot}`);

        setReason(
          `${workingArray[j]} is being compared with the pivot ${pivot}.`,
        );

        setAction("Compare with pivot");

        setComparisons((prev) => prev + 1);

        await sleep(Math.max(100, 650 - speed));

        if (workingArray[j] <= pivot) {
          setActiveLine(8);

          if (i !== j) {
            [workingArray[i], workingArray[j]] = [
              workingArray[j],
              workingArray[i],
            ];

            setSwaps((prev) => prev + 1);

            setArray([...workingArray]);

            setStepTitle(`Swap ${workingArray[j]} and ${workingArray[i]}`);

            setReason(
              `${workingArray[i]} belongs on the left side of the pivot.`,
            );

            setAction("Swap elements");

            await sleep(Math.max(100, 600 - speed));
          }

          i++;
        }
      }

      setActiveLine(9);

      [workingArray[i], workingArray[right]] = [
        workingArray[right],
        workingArray[i],
      ];

      setSwaps((prev) => prev + 1);

      setArray([...workingArray]);

      setPivotIndex(i);
      setLeftPointer(-1);
      setRightPointer(-1);

      setActiveBars([i]);

      setStepTitle(`Pivot ${pivot} Placed`);

      setReason(`Pivot ${pivot} is now in its correct position.`);

      setAction("Place pivot");

      await sleep(Math.max(150, 750 - speed));

      return i;
    };

    const quickSort = async (left, right) => {
      if (left >= right) {
        if (left === right) {
          setSortedBars((prev) =>
            prev.includes(left) ? prev : [...prev, left],
          );
        }

        return;
      }

      setActiveLine(0);

      setStepTitle(`Quick Sort [${left}-${right}]`);

      setReason(`Sorting the subarray from index ${left} to ${right}.`);

      setAction("Recursive call");

      await sleep(Math.max(100, 500 - speed));

      const pivotPosition = await partition(left, right);

      setSortedBars((prev) => {
        const updated = new Set(prev);
        updated.add(pivotPosition);
        return [...updated];
      });

      setActiveBars([]);

      await sleep(Math.max(100, 450 - speed));

      setActiveLine(3);

      await quickSort(left, pivotPosition - 1);

      setActiveLine(4);

      await quickSort(pivotPosition + 1, right);
    };

    setStatus("Sorting...");
    setStepTitle("Quick Sort Started");
    setReason("Selecting a pivot and partitioning the array.");
    setAction("Start Quick Sort");

    await sleep(300);

    await quickSort(0, workingArray.length - 1);

    setActiveBars([]);
    setPivotIndex(-1);
    setLeftPointer(-1);
    setRightPointer(-1);

    setSortedBars(Array.from({ length: workingArray.length }, (_, i) => i));

    setActiveLine(-1);

    setStatus("Completed");
    setStepTitle("Quick Sort Completed");
    setReason("The array has been successfully sorted.");
    setAction("Sorting finished.");

    setIsSorted(true);
    setIsSorting(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {/* HEADING */}

      <h1 className="text-4xl font-bold text-gray-900">
        Quick Sort Visualizer
      </h1>

      <p className="mt-3 text-lg text-gray-600">
        Visualize Quick Sort step by step using pivot-based partitioning.
      </p>

      {/* ALGORITHM INFO */}

      <AlgorithmInfo info={algorithmInfo.quickSort} />

      {/* PSEUDOCODE */}

      <PseudoCode
        code={algorithmInfo.quickSort.pseudoCode}
        activeLine={activeLine}
      />

      {/* CONTROLS */}

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
      </div>

      {/* STATISTICS */}

      <Statistics
        comparisons={comparisons}
        swaps={swaps}
        currentPass={0}
        status={status}
      />

      {/* PARTITION INFO */}

      <div className="mt-8 rounded-2xl border bg-white p-6 shadow">
        <h2 className="text-2xl font-bold text-violet-700">
          Current Partition
        </h2>

        <div className="mt-6 flex flex-wrap gap-4">
          <div className="rounded-xl bg-violet-50 px-5 py-3">
            <span className="font-semibold">Pivot:</span>{" "}
            {pivotIndex !== -1 ? array[pivotIndex] : "—"}
          </div>

          <div className="rounded-xl bg-blue-50 px-5 py-3">
            <span className="font-semibold">Left Pointer:</span>{" "}
            {leftPointer !== -1 ? leftPointer : "—"}
          </div>

          <div className="rounded-xl bg-orange-50 px-5 py-3">
            <span className="font-semibold">Right Pointer:</span>{" "}
            {rightPointer !== -1 ? rightPointer : "—"}
          </div>
        </div>
      </div>

      {/* ARRAY VISUALIZATION */}

      <div className="mt-10 flex h-[450px] items-end justify-center gap-1 rounded-2xl border bg-gray-50 p-6">
        {array.map((value, index) => (
          <div key={index} className="flex flex-col items-center">
            <span className="mb-1 text-xs font-semibold text-gray-700">
              {value}
            </span>

            <div
              style={{
                height: `${value}px`,
                width: `${Math.max(8, 700 / arraySize)}px`,
              }}
              className={`rounded-t-md transition-all duration-300 ${
                sortedBars.includes(index)
                  ? "bg-green-500"
                  : index === pivotIndex
                    ? "bg-yellow-500"
                    : activeBars.includes(index)
                      ? "bg-red-500"
                      : "bg-violet-600"
              }`}
            />
          </div>
        ))}
      </div>

      {/* SLIDERS */}

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

      {/* CURRENT STEP */}

      <CurrentStep title={stepTitle} reason={reason} action={action} />
    </div>
  );
};

export default QuickSort;
