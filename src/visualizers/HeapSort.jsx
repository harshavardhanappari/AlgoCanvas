import { useEffect, useState } from "react";
import algorithmInfo from "../data/algorithmInfo";
import AlgorithmInfo from "../components/AlgorithmInfo/AlgorithmInfo";
import PseudoCode from "../components/PseudoCode/PseudoCode";
import Statistics from "../components/Statistics/Statistics";
import CurrentStep from "../components/CurrentStep/CurrentStep";

const HeapSort = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(10);
  const [speed, setSpeed] = useState(50);

  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);

  const [activeNodes, setActiveNodes] = useState([]);
  const [sortedNodes, setSortedNodes] = useState([]);

  const [heapSize, setHeapSize] = useState(0);
  const [activeRoot, setActiveRoot] = useState(-1);
  const [largestIndex, setLargestIndex] = useState(-1);

  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

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
    if (isSorting) return;

    const newArray = [];

    for (let i = 0; i < size; i++) {
      newArray.push(Math.floor(Math.random() * 300) + 40);
    }

    setArray(newArray);

    setIsSorted(false);

    setActiveNodes([]);
    setSortedNodes([]);

    setHeapSize(0);
    setActiveRoot(-1);
    setLargestIndex(-1);

    setComparisons(0);
    setSwaps(0);

    setActiveLine(-1);

    setStatus("Ready");
    setStepTitle("Ready to Start");
    setReason("Generate an array and click Start.");
    setAction("Waiting...");
  };

  useEffect(() => {
    generateArray(arraySize);
  }, [arraySize]);

  const resetArray = () => {
    if (isSorting) return;

    generateArray(arraySize);
  };

  const startSorting = async () => {
    if (isSorting || isSorted || array.length === 0) {
      return;
    }

    setIsSorting(true);
    setIsSorted(false);

    const workingArray = [...array];

    let comparisonsCount = 0;
    let swapsCount = 0;

    const updateStats = () => {
      setComparisons(comparisonsCount);
      setSwaps(swapsCount);
    };

    const heapify = async (root, size) => {
      setActiveLine(6);

      let largest = root;

      const left = 2 * root + 1;
      const right = 2 * root + 2;

      setActiveRoot(root);
      setLargestIndex(root);

      setActiveNodes(
        [root, left, right].filter(
          (index) => index < size
        )
      );

      setStepTitle(`Heapify at Index ${root}`);

      setReason(
        "Compare the root with its left and right children."
      );

      setAction("Find largest");

      await sleep(Math.max(100, 650 - speed));

      if (left < size) {
        comparisonsCount++;

        setComparisons(comparisonsCount);

        setActiveNodes([root, left]);

        setLargestIndex(largest);

        await sleep(
          Math.max(100, 500 - speed)
        );

        if (workingArray[left] > workingArray[largest]) {
          largest = left;
        }
      }

      if (right < size) {
        comparisonsCount++;

        setComparisons(comparisonsCount);

        setActiveNodes([root, right]);

        setLargestIndex(largest);

        await sleep(
          Math.max(100, 500 - speed)
        );

        if (workingArray[right] > workingArray[largest]) {
          largest = right;
        }
      }

      setLargestIndex(largest);

      if (largest !== root) {
        setActiveLine(8);

        setActiveNodes([root, largest]);

        setStepTitle(
          `Swap ${workingArray[root]} and ${workingArray[largest]}`
        );

        setReason(
          `${workingArray[largest]} is larger than ${workingArray[root]}.`
        );

        setAction("Swap elements");

        [
          workingArray[root],
          workingArray[largest],
        ] = [
          workingArray[largest],
          workingArray[root],
        ];

        swapsCount++;

        updateStats();

        setArray([...workingArray]);

        await sleep(
          Math.max(100, 650 - speed)
        );

        await heapify(largest, size);
      }
    };

    setStatus("Building Max Heap...");
    setStepTitle("Build Max Heap");
    setReason(
      "Rearrange the array so every parent is greater than its children."
    );
    setAction("Build heap");

    setActiveLine(1);

    await sleep(
      Math.max(150, 700 - speed)
    );

    // BUILD MAX HEAP

    setHeapSize(workingArray.length);

    for (
      let i = Math.floor(workingArray.length / 2) - 1;
      i >= 0;
      i--
    ) {
      await heapify(
        i,
        workingArray.length
      );
    }

    // SORT

    for (
      let end = workingArray.length - 1;
      end > 0;
      end--
    ) {
      setActiveLine(2);

      setHeapSize(end + 1);

      setActiveRoot(0);
      setLargestIndex(end);

      setActiveNodes([0, end]);

      setStepTitle(
        `Move Maximum to Position ${end}`
      );

      setReason(
        `The root ${workingArray[0]} is the largest element in the heap.`
      );

      setAction("Swap root with last heap element");

      await sleep(
        Math.max(100, 650 - speed)
      );

      setActiveLine(3);

      [
        workingArray[0],
        workingArray[end],
      ] = [
        workingArray[end],
        workingArray[0],
      ];

      swapsCount++;

      updateStats();

      setArray([...workingArray]);

      setSortedNodes((prev) => [
        ...prev,
        end,
      ]);

      await sleep(
        Math.max(100, 650 - speed)
      );

      setActiveLine(4);

      setHeapSize(end);

      setStepTitle(
        `Reduce Heap Size`
      );

      setReason(
        `Position ${end} is now sorted and removed from the heap.`
      );

      setAction("Reduce active heap");

      await sleep(
        Math.max(100, 450 - speed)
      );

      if (end > 1) {
        await heapify(0, end);
      }
    }

    setSortedNodes(
      Array.from(
        { length: workingArray.length },
        (_, index) => index
      )
    );

    setHeapSize(0);

    setActiveNodes([]);
    setActiveRoot(-1);
    setLargestIndex(-1);

    setActiveLine(-1);

    setArray([...workingArray]);

    setStatus("Completed");
    setStepTitle("Heap Sort Completed");
    setReason(
      "All elements are now in ascending order."
    );
    setAction("Sorting finished.");

    setIsSorted(true);
    setIsSorting(false);
  };

  /*
   * Convert an array index into a tree position.
   */
  const getNodePosition = (index) => {
    const level = Math.floor(
      Math.log2(index + 1)
    );

    const firstIndex =
      Math.pow(2, level) - 1;

    const positionInLevel =
      index - firstIndex;

    const nodesInLevel =
      Math.pow(2, level);

    const left =
      ((positionInLevel + 0.5) /
        nodesInLevel) *
      100;

    const top =
      level * 130 + 20;

    return {
      left: `${left}%`,
      top: `${top}px`,
    };
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">

      <h1 className="text-4xl font-bold text-gray-900">
        Heap Sort Visualizer
      </h1>

      <p className="mt-3 text-lg text-gray-600">
        Visualize Max Heap construction, heapify,
        and repeated maximum extraction.
      </p>

      <AlgorithmInfo
        info={algorithmInfo.heapSort}
      />

      <PseudoCode
        code={
          algorithmInfo.heapSort.pseudoCode
        }
        activeLine={activeLine}
      />

      {/* CONTROLS */}

      <div className="mt-10 flex flex-wrap gap-4">

        <button
          disabled={isSorting}
          onClick={() =>
            generateArray(arraySize)
          }
          className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-300"
        >
          Generate New Array
        </button>

        <button
          disabled={isSorting || isSorted}
          onClick={startSorting}
          className="rounded-xl border border-violet-600 px-6 py-3 font-semibold text-violet-600 hover:bg-violet-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
        >
          {isSorted ? "✓ Sorted" : "Start"}
        </button>

        <button
          disabled={isSorting}
          onClick={resetArray}
          className="rounded-xl border border-red-500 px-6 py-3 font-semibold text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
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

      {/* HEAP INFORMATION */}

      <div className="mt-8 grid gap-4 md:grid-cols-3">

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Heap Size
          </p>

          <p className="mt-2 text-2xl font-bold text-violet-700">
            {heapSize || "—"}
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Active Root
          </p>

          <p className="mt-2 text-2xl font-bold text-blue-700">
            {activeRoot === -1
              ? "—"
              : activeRoot}
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Largest
          </p>

          <p className="mt-2 text-2xl font-bold text-orange-600">
            {largestIndex === -1
              ? "—"
              : largestIndex}
          </p>
        </div>

      </div>

      {/* ARRAY */}

      <div className="mt-10 overflow-x-auto rounded-2xl border bg-gray-50 p-6">

        <div className="flex min-w-max items-end justify-center gap-1">

          {array.map((value, index) => {

            const isActive =
              activeNodes.includes(index);

            const isSortedPosition =
              sortedNodes.includes(index);

            return (
              <div
                key={index}
                className="flex w-7 flex-col items-center"
              >

                <span className="mb-1 text-xs font-semibold text-gray-700">
                  {value}
                </span>

                <div
                  style={{
                    height: `${value}px`,
                    width: "28px",
                  }}
                  className={`rounded-t-md transition-all duration-300 ${
                    isSortedPosition
                      ? "bg-green-500"
                      : isActive
                        ? "bg-red-500"
                        : "bg-violet-600"
                  }`}
                />

                <span className="mt-1 text-xs text-gray-400">
                  {index}
                </span>

              </div>
            );
          })}

        </div>

      </div>

      {/* HEAP TREE */}

      <div className="mt-10 rounded-2xl border bg-gray-50 p-6">

        <h2 className="mb-6 text-center text-2xl font-bold text-violet-700">
          Max Heap
        </h2>

        <div
          className="relative mx-auto"
          style={{
            height: "550px",
            minWidth: "700px",
          }}
        >

          {/* EDGES */}

          <svg
            className="absolute inset-0 h-full w-full"
          >
            {array.map((_, index) => {

              if (index === 0) {
                return null;
              }

              const parent =
                Math.floor(
                  (index - 1) / 2
                );

              const parentPos =
                getNodePosition(parent);

              const childPos =
                getNodePosition(index);

              return (
                <line
                  key={`edge-${index}`}
                  x1={parentPos.left}
                  y1={parentPos.top}
                  x2={childPos.left}
                  y2={childPos.top}
                  stroke="currentColor"
                  className="text-gray-300"
                  strokeWidth="2"
                />
              );
            })}
          </svg>

          {/* NODES */}

          {array.map((value, index) => {

            const position =
              getNodePosition(index);

            const isActive =
              activeNodes.includes(index);

            const isSortedPosition =
              sortedNodes.includes(index);

            return (
              <div
                key={`node-${index}`}
                className={`absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 text-lg font-bold shadow transition-all duration-300 ${
                  isSortedPosition
                    ? "border-green-500 bg-green-100 text-green-700"
                    : isActive
                      ? "border-red-500 bg-red-500 text-white scale-110"
                      : "border-violet-400 bg-violet-100 text-violet-800"
                }`}
                style={position}
              >
                {value}
              </div>
            );
          })}

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
            max="20"
            value={arraySize}
            disabled={isSorting}
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

      <CurrentStep
        title={stepTitle}
        reason={reason}
        action={action}
      />

    </div>
  );
};

export default HeapSort;