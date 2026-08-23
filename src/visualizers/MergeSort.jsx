import { useEffect, useState } from "react";
import sleep from "../utils/sleep";
import algorithmInfo from "../data/algorithmInfo";
import AlgorithmInfo from "../components/AlgorithmInfo/AlgorithmInfo";
import PseudoCode from "../components/PseudoCode/PseudoCode";
import Statistics from "../components/Statistics/Statistics";
import CurrentStep from "../components/CurrentStep/CurrentStep";
import MergeTree from "../components/MergeTree/MergeTree";
import MergePanel from "../components/MergePanel/MergePanel";
const MergeSort = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(20);
  const [speed, setSpeed] = useState(50);

  const [treeKey, setTreeKey] = useState(0);
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
  const [treeZoom, setTreeZoom] = useState(1);
  const [showMergePanel, setShowMergePanel] = useState(false);

  const [leftMergeArray, setLeftMergeArray] = useState([]);

  const [rightMergeArray, setRightMergeArray] = useState([]);

  const [mergedArray, setMergedArray] = useState([]);

  const [leftPointer, setLeftPointer] = useState(-1);

  const [rightPointer, setRightPointer] = useState(-1);
  const [mergeLeft, setMergeLeft] = useState(0);
  const [mergeRight, setMergeRight] = useState(0);

  /* -------- Merge Tree -------- */

  const [treeNodes, setTreeNodes] = useState([]);
  const [treeLevels, setTreeLevels] = useState([]);
  const [activeNode, setActiveNode] = useState(null);
  const [currentPhase, setCurrentPhase] = useState("idle");
  const [visibleNodes, setVisibleNodes] = useState([]);

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

    setTreeNodes([]);
    setActiveNode(null);
    setCurrentPhase("idle");
    setVisibleNodes([]);
    setShowMergePanel(false);

    setLeftMergeArray([]);

    setRightMergeArray([]);

    setMergedArray([]);

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

  const buildTree = (
    arr,
    left,
    right,
    level = 0,
    parent = null,
    nodes = [],
  ) => {
    const id = nodes.length;

    const node = {
      id,
      parent,
      level,
      left,
      right,
      values: arr.slice(left, right + 1),
      state: "idle",

      x: 0,
      y: 0,
    };

    nodes.push(node);

    if (left === right) {
      return nodes;
    }

    const mid = Math.floor((left + right) / 2);

    buildTree(arr, left, mid, level + 1, id, nodes);

    buildTree(arr, mid + 1, right, level + 1, id, nodes);

    return nodes;
  };

  const buildLevels = (nodes) => {
    const levels = [];

    for (const node of nodes) {
      if (!levels[node.level]) {
        levels[node.level] = [];
      }

      levels[node.level].push(node);
    }

    return levels;
  };

  const calculatePositions = (nodes) => {
    const levelHeight = 170;
    const totalWidth = 4000;

    // Group nodes by level
    const levels = [];

    nodes.forEach((node) => {
      if (!levels[node.level]) {
        levels[node.level] = [];
      }

      levels[node.level].push(node);
    });

    // Assign x and y coordinates
    levels.forEach((levelNodes, level) => {
      const gap = totalWidth / (levelNodes.length + 1);

      levelNodes.forEach((node, index) => {
        node.x = (index + 1) * gap;
        node.y = level * levelHeight;
      });
    });

    return nodes;
  };

  const getDFSOrder = (nodes) => {
    const order = [];

    const dfs = (id) => {
      const node = nodes.find((n) => n.id === id);

      if (!node) return;

      order.push(node.id);

      const children = nodes.filter((n) => n.parent === node.id);

      children.forEach((child) => dfs(child.id));
    };

    const root = nodes.find((n) => n.parent === null);

    dfs(root.id);

    return order;
  };

  const startSorting = async () => {
    if (isSorting) return;

    setIsSorting(true);
    setIsSorted(false);

    setComparisons(0);
    setSwaps(0);
    setCurrentPass(0);

    setStatus("Dividing...");
    setStepTitle("Merge Sort Started");
    setReason("Recursively dividing the array.");
    setAction("Building recursion tree.");

    setTreeNodes([]);
    setVisibleNodes([]);
    setActiveNode(null);
    setCurrentPhase("divide");
    const workingArray = [...array];

    let id = 0;

    const levelWidth = {};

    const createNode = (left, right, level, parent) => {
      const totalWidth = Math.max(2200, array.length * 220);

      const center = (left + right) / 2;

      const x = ((center + 0.5) / array.length) * totalWidth;

      const node = {
        id: id++,
        parent,
        level,
        left,
        right,
        values: array.slice(left, right + 1),

        x,
        y: 40 + level * 170,

        state: "idle",
      };

      return node;
    };

    const merge = async (left, mid, right) => {
      const leftArray = workingArray.slice(left, mid + 1);
      const rightArray = workingArray.slice(mid + 1, right + 1);

      setShowMergePanel(true);

      setLeftMergeArray(leftArray);

      setRightMergeArray(rightArray);

      setMergedArray([]);

      setLeftPointer(0);

      setRightPointer(0);
      setMergeLeft(left);
      setMergeRight(right);

      let i = 0;
      let j = 0;
      let k = left;

      let currentMerged = [];

      while (i < leftArray.length && j < rightArray.length) {
        setLeftPointer(i);
        setRightPointer(j);

        await sleep(Math.max(150, 700 - speed));
        setComparisons((prev) => prev + 1);

        setActiveBars([left + i, mid + 1 + j]);

        await sleep(Math.max(60, 450 - speed));

        if (leftArray[i] <= rightArray[j]) {
          workingArray[k] = leftArray[i];

          currentMerged.push(leftArray[i]);
          setMergedArray([...currentMerged]);

          await sleep(Math.max(150, 700 - speed));

          i++;

          setLeftPointer(i);
        } else {
          workingArray[k] = rightArray[j];

          currentMerged.push(rightArray[j]);
          setMergedArray([...currentMerged]);

          await sleep(Math.max(150, 700 - speed));

          j++;

          setRightPointer(j);
        }

        setArray([...workingArray]);

        k++;

        await sleep(Math.max(60, 450 - speed));
      }

      while (i < leftArray.length) {
        workingArray[k] = leftArray[i];

        currentMerged.push(leftArray[i]);
        setMergedArray([...currentMerged]);

        setLeftPointer(i + 1);

        setArray([...workingArray]);

        i++;

        k++;

        await sleep(Math.max(50, 250 - speed));
      }

      while (j < rightArray.length) {
        workingArray[k] = rightArray[j];

        currentMerged.push(rightArray[j]);
        setMergedArray([...currentMerged]);

        setRightPointer(j + 1);

        setArray([...workingArray]);

        j++;

        k++;

        await sleep(Math.max(50, 250 - speed));
      }

      setTreeNodes((prev) =>
        prev.map((node) => {
          if (node.left === left && node.right === right) {
            return {
              ...node,
              values: workingArray.slice(left, right + 1),
              state: "done",
            };
          }

          return node;
        }),
      );

      setActiveBars([]);

      setSortedBars((prev) => {
        const s = new Set(prev);

        for (let x = left; x <= right; x++) {
          s.add(x);
        }

        return [...s];
      });

      await sleep(1000);

      setShowMergePanel(false);
    };

    const dfs = async (left, right, level = 0, parent = null) => {
      const node = createNode(left, right, level, parent);

      setTreeNodes((prev) => [...prev, node]);

      await sleep(50);

      setVisibleNodes((prev) => [...prev, node.id]);

      setActiveNode(node.id);

      // Line 0: mergeSort(left, right)
      setActiveLine(0);

      setStepTitle(`Divide [${left}-${right}]`);
      setReason(`Current subarray: ${node.values.join(", ")}`);
      setAction("Recursive Call");

      await sleep(Math.max(100, 650 - speed));

      // Line 1: base case
      setActiveLine(1);

      if (left >= right) {
        setStepTitle(`Base Case [${left}-${right}]`);
        setReason("Only one element remains, so it is already sorted.");
        setAction("Return");

        await sleep(Math.max(100, 500 - speed));

        return node.id;
      }

      // Line 2: calculate mid
      setActiveLine(2);

      const mid = Math.floor((left + right) / 2);

      setStepTitle(`Divide [${left}-${right}]`);
      setReason(`Split at midpoint ${mid}.`);
      setAction("Calculate midpoint");

      await sleep(Math.max(100, 500 - speed));

      // Line 3: left recursive call
      setActiveLine(3);

      setStepTitle(`Left Recursion [${left}-${mid}]`);
      setReason("Recursively sorting the left half.");
      setAction("Call mergeSort on left half");

      await sleep(Math.max(100, 500 - speed));

      await dfs(left, mid, level + 1, node.id);

      // Line 4: right recursive call
      setActiveLine(4);

      setStepTitle(`Right Recursion [${mid + 1}-${right}]`);
      setReason("Recursively sorting the right half.");
      setAction("Call mergeSort on right half");

      await sleep(Math.max(100, 500 - speed));

      await dfs(mid + 1, right, level + 1, node.id);

      // Line 5: merge
      setCurrentPhase("merge");
      setActiveNode(node.id);

      setActiveLine(5);

      setStatus("Merging...");

      setStepTitle(`Merge [${left}-${right}]`);
      setReason("Both child subarrays are sorted. Merge them.");
      setAction("Combining left and right halves");

      await merge(left, mid, right);

      await sleep(Math.max(120, 500 - speed));

      return node.id;
    };
    await dfs(0, array.length - 1);

    setActiveBars([]);

    setActiveNode(null);

    setCurrentPhase("completed");

    setStatus("Completed");

    setStepTitle("Merge Sort Completed");

    setReason("The array has been successfully sorted.");

    setAction("Sorting finished.");

    setIsSorted(true);

    setIsSorting(false);

    setSortedBars(Array.from({ length: workingArray.length }, (_, i) => i));

    setShowMergePanel(false);

    setActiveLine(-1);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-900">
        Merge Sort Visualizer
      </h1>
      <p className="mt-3 text-lg text-gray-600">
        Visualize Merge Sort step by step.
      </p>
      {/* Algorithm Information */}
      <AlgorithmInfo info={algorithmInfo.mergeSort} />
      {/* Pseudo Code */}
      <PseudoCode
        code={algorithmInfo.mergeSort.pseudoCode}
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

      <div className="mt-6 mb-4 flex flex-wrap items-center gap-3 rounded-xl border bg-white p-4 shadow">
        <span className="font-semibold text-gray-700">🔍 Recursion Tree</span>

        <button
          onClick={() => setTreeZoom((z) => Math.max(0.5, z - 0.1))}
          className="rounded-lg bg-gray-100 px-4 py-2 hover:bg-gray-200"
        >
          ➖
        </button>

        <span className="min-w-[60px] text-center font-semibold">
          {Math.round(treeZoom * 100)}%
        </span>

        <button
          onClick={() => setTreeZoom((z) => Math.min(3, z + 0.1))}
          className="rounded-lg bg-gray-100 px-4 py-2 hover:bg-gray-200"
        >
          ➕
        </button>

        <button
          onClick={() => setTreeZoom(1)}
          className="rounded-lg bg-violet-100 px-4 py-2 text-violet-700 hover:bg-violet-200"
        >
          Reset
        </button>
      </div>

      <MergeTree
        treeNodes={treeNodes}
        visibleNodes={visibleNodes}
        activeNode={activeNode}
        currentPhase={currentPhase}
        treeZoom={treeZoom}
      />

      <MergePanel
        visible={showMergePanel}
        leftArray={leftMergeArray}
        rightArray={rightMergeArray}
        mergedArray={mergedArray}
        leftPointer={leftPointer}
        rightPointer={rightPointer}
        left={mergeLeft}
        right={mergeRight}
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

export default MergeSort;
