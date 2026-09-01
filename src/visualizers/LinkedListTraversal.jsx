import { useEffect, useState } from "react";

import algorithmInfo from "../data/algorithmInfo";

import AlgorithmInfo from "../components/AlgorithmInfo/AlgorithmInfo";
import PseudoCode from "../components/PseudoCode/PseudoCode";
import Statistics from "../components/Statistics/Statistics";
import CurrentStep from "../components/CurrentStep/CurrentStep";

const LinkedListTraversal = () => {
  const [list, setList] = useState([]);
  const [originalList, setOriginalList] = useState([]);

  const [listSize, setListSize] = useState(6);
  const [speed, setSpeed] = useState(700);

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [visited, setVisited] = useState([]);

  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [activeLine, setActiveLine] = useState(-1);

  const [comparisons, setComparisons] = useState(0);

  const [status, setStatus] = useState("Ready");

  const [stepTitle, setStepTitle] = useState(
    "Ready to Traverse"
  );

  const [reason, setReason] = useState(
    "The traversal starts at the HEAD node and moves through each next pointer."
  );

  const [action, setAction] = useState(
    "Waiting..."
  );

  const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // Generate linked list values
  const generateList = (size = listSize) => {
    if (isRunning) return;

    const newList = [];

    for (let i = 0; i < size; i++) {
      newList.push(
        Math.floor(Math.random() * 90) + 10
      );
    }

    setList(newList);
    setOriginalList([...newList]);

    setCurrentIndex(-1);
    setVisited([]);

    setComparisons(0);

    setIsCompleted(false);
    setActiveLine(-1);

    setStatus("Ready");

    setStepTitle("New Linked List Generated");

    setReason(
      "A new linked list has been created. Traversal will begin from the HEAD node."
    );

    setAction("Ready to start traversal");
  };

  useEffect(() => {
    generateList(listSize);
  }, []);

  const resetVisualizer = () => {
    if (isRunning) return;

    setList([...originalList]);

    setCurrentIndex(-1);
    setVisited([]);

    setComparisons(0);

    setIsCompleted(false);
    setActiveLine(-1);

    setStatus("Ready");

    setStepTitle("Ready to Run Again");

    setReason(
      "The linked list has been restored. Traversal can start again from HEAD."
    );

    setAction("Waiting...");
  };

  const startTraversal = async () => {
    if (
      isRunning ||
      isCompleted ||
      list.length === 0
    ) {
      return;
    }

    setIsRunning(true);
    setStatus("Running...");

    // current = head
    setActiveLine(0);

    setStepTitle("Starting at HEAD");

    setReason(
      "The current pointer is initialized to the HEAD node, which is the first node in the linked list."
    );

    setAction("current = HEAD");

    setCurrentIndex(0);

    await sleep(speed);

    for (let i = 0; i < list.length; i++) {
      // while current != null
      setActiveLine(1);

      setCurrentIndex(i);

      setStepTitle(`Visiting Node ${i}`);

      setReason(
        `The current pointer is at node ${i}, which contains the value ${list[i]}.`
      );

      setAction("Check current node");

      await sleep(speed);

      // visit current.data
      setActiveLine(2);

      setVisited((previous) => [
        ...previous,
        i,
      ]);

      setComparisons((previous) => previous + 1);

      setStepTitle(`Visited Value ${list[i]}`);

      setReason(
        `We process the current node and read its value: ${list[i]}.`
      );

      setAction("Visit current.data");

      await sleep(speed);

      // current = current.next
      setActiveLine(3);

      setStepTitle("Moving to Next Node");

      setReason(
        i === list.length - 1
          ? "This is the last node. Its next pointer leads to NULL."
          : `Following the next pointer from ${list[i]} to ${list[i + 1]}.`
      );

      setAction(
        i === list.length - 1
          ? "current → NULL"
          : "current = current.next"
      );

      await sleep(speed);
    }

    setCurrentIndex(-1);

    setActiveLine(4);

    setStepTitle("Traversal Completed!");

    setReason(
      "The current pointer has reached NULL, so every node in the linked list has been visited."
    );

    setAction("Traversal finished");

    setStatus("Completed");

    setIsCompleted(true);

    setIsRunning(false);
  };

  const changeListSize = (value) => {
    if (isRunning) return;

    const size = Number(value);

    setListSize(size);

    generateList(size);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">

      {/* HEADER */}

      <h1 className="text-4xl font-bold text-gray-900">
        Linked List Traversal
      </h1>

      <p className="mt-3 text-lg text-gray-600">
        Traverse a linked list node by node, starting from HEAD
        and following the next pointers until NULL.
      </p>

      {/* ALGORITHM INFO */}

      <AlgorithmInfo
        info={algorithmInfo.linkedListTraversal}
      />

      {/* PSEUDOCODE */}

      <PseudoCode
        code={algorithmInfo.linkedListTraversal.pseudoCode}
        activeLine={activeLine}
      />

      {/* CONTROLS */}

      <div className="mt-10 flex flex-wrap items-center gap-4">

        <button
          disabled={isRunning || isCompleted}
          onClick={startTraversal}
          className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-300"
        >
          {isRunning
            ? "Traversing..."
            : isCompleted
            ? "Completed"
            : "Start Traversal"}
        </button>

        <button
          disabled={isRunning}
          onClick={resetVisualizer}
          className="rounded-xl border border-orange-500 px-6 py-3 font-semibold text-orange-500 transition hover:bg-orange-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
        >
          Reset
        </button>

        <button
          disabled={isRunning}
          onClick={() => generateList(listSize)}
          className="rounded-xl border border-violet-600 px-6 py-3 font-semibold text-violet-600 transition hover:bg-violet-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
        >
          Generate New List
        </button>

      </div>

      {/* CURRENT VALUES */}

      <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">

        <div className="grid gap-6 sm:grid-cols-3">

          <div>
            <p className="text-sm font-medium text-gray-500">
              Current Node
            </p>

            <p className="mt-1 text-3xl font-bold text-orange-500">
              {currentIndex === -1
                ? isCompleted
                  ? "NULL"
                  : "-"
                : currentIndex}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              Nodes Visited
            </p>

            <p className="mt-1 text-3xl font-bold text-blue-600">
              {visited.length}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              List Size
            </p>

            <p className="mt-1 text-3xl font-bold text-green-600">
              {list.length}
            </p>
          </div>

        </div>

      </div>

      {/* STATISTICS */}

      <Statistics
        comparisons={comparisons}
        swaps={0}
        currentPass={visited.length}
        status={status}
      />

      {/* LINKED LIST VISUALIZATION */}

      <div className="mt-10 overflow-x-auto rounded-2xl border bg-gray-50 p-8">

        <h2 className="mb-12 text-center text-xl font-bold text-gray-800">
          Linked List
        </h2>

        <div className="flex min-w-max items-center justify-center px-6">

          {/* HEAD */}

          <div className="mr-4 flex flex-col items-center">

            <span className="mb-2 text-sm font-bold text-violet-600">
              HEAD
            </span>

            <span className="text-3xl text-violet-600">
              ↓
            </span>

          </div>

          {/* NODES */}

          {list.map((value, index) => {
            let nodeStyle =
              "border-violet-300 bg-white text-gray-800";

            if (visited.includes(index)) {
              nodeStyle =
                "border-blue-500 bg-blue-100 text-blue-800";
            }

            if (index === currentIndex) {
              nodeStyle =
                "scale-110 border-orange-500 bg-orange-500 text-white shadow-lg";
            }

            if (
              isCompleted &&
              visited.includes(index)
            ) {
              nodeStyle =
                "border-green-500 bg-green-100 text-green-800";
            }

            return (
              <div
                key={index}
                className="flex items-center"
              >

                {/* NODE */}

                <div className="flex flex-col items-center">

                  {/* CURRENT POINTER */}

                  {index === currentIndex && (
                    <div className="mb-2 flex flex-col items-center">

                      <span className="text-xs font-bold text-orange-500">
                        CURRENT
                      </span>

                      <span className="text-xl text-orange-500">
                        ↓
                      </span>

                    </div>
                  )}

                  {index !== currentIndex && (
                    <div className="mb-2 h-9" />
                  )}

                  <div
                    className={`flex overflow-hidden rounded-xl border-2 transition-all duration-300 ${nodeStyle}`}
                  >

                    <div className="flex h-16 min-w-16 items-center justify-center px-4 text-xl font-bold">
                      {value}
                    </div>

                    <div className="flex h-16 w-12 items-center justify-center border-l-2 border-current text-lg">
                      →
                    </div>

                  </div>

                  <span className="mt-2 text-sm text-gray-400">
                    Node {index}
                  </span>

                </div>

                {/* CONNECTING ARROW */}

                {index < list.length - 1 && (
                  <div className="mx-2 mt-8 text-3xl font-bold text-gray-400">
                    →
                  </div>
                )}

              </div>
            );
          })}

          {/* NULL */}

          <div className="ml-4 mt-8 rounded-lg border-2 border-gray-400 bg-white px-4 py-3 font-bold text-gray-500">
            NULL
          </div>

        </div>

      </div>

      {/* LEGEND */}

      <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-600">

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-white ring-1 ring-violet-400" />
          Unvisited Node
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-blue-300" />
          Visited Node
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-orange-500" />
          Current Pointer
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-green-400" />
          Traversal Complete
        </div>

      </div>

      {/* SETTINGS */}

      <div className="mt-10 grid gap-8 md:grid-cols-2">

        {/* LIST SIZE */}

        <div>

          <label className="mb-2 block font-semibold text-gray-700">
            List Size: {listSize}
          </label>

          <input
            type="range"
            min="3"
            max="10"
            value={listSize}
            disabled={isRunning}
            onChange={(e) =>
              changeListSize(e.target.value)
            }
            className="w-full"
          />

        </div>

        {/* SPEED */}

        <div>

          <label className="mb-2 block font-semibold text-gray-700">
            Animation Speed
          </label>

          <input
            type="range"
            min="200"
            max="1500"
            step="100"
            value={speed}
            disabled={isRunning}
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

export default LinkedListTraversal;