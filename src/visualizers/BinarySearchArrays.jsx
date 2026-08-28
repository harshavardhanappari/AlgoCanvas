import { useEffect, useState } from "react";

import algorithmInfo from "../data/algorithmInfo";

import AlgorithmInfo from "../components/AlgorithmInfo/AlgorithmInfo";
import PseudoCode from "../components/PseudoCode/PseudoCode";
import Statistics from "../components/Statistics/Statistics";
import CurrentStep from "../components/CurrentStep/CurrentStep";

const BinarySearchArrays = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(10);

  const [target, setTarget] = useState("");

  const [speed, setSpeed] = useState(300);

  const [left, setLeft] = useState(-1);
  const [right, setRight] = useState(-1);
  const [mid, setMid] = useState(-1);

  const [foundIndex, setFoundIndex] = useState(-1);

  const [comparisons, setComparisons] = useState(0);

  const [isSearching, setIsSearching] = useState(false);

  const [status, setStatus] = useState("Ready");

  const [activeLine, setActiveLine] = useState(-1);

  const [stepTitle, setStepTitle] =
    useState("Ready to Search");

  const [reason, setReason] = useState(
    "Enter a target value and start Binary Search."
  );

  const [action, setAction] = useState(
    "Waiting..."
  );

  const sleep = (ms) =>
    new Promise((resolve) =>
      setTimeout(resolve, ms)
    );

  const generateArray = (size = arraySize) => {
    if (isSearching) return;

    const newArray = Array.from(
      { length: size },
      () => Math.floor(Math.random() * 50) + 1
    ).sort((a, b) => a - b);

    setArray(newArray);

    setTarget("");

    resetSearchState();

    setStatus("Ready");

    setStepTitle("New Array Generated");

    setReason(
      "The array is sorted because Binary Search requires a sorted array."
    );

    setAction("Enter a target value");
  };

  const resetSearchState = () => {
    setLeft(-1);
    setRight(-1);
    setMid(-1);

    setFoundIndex(-1);

    setComparisons(0);

    setActiveLine(-1);
  };

  useEffect(() => {
    generateArray(arraySize);
  }, []);

  const resetSearch = () => {
    if (isSearching) return;

    resetSearchState();

    setStatus("Ready");

    setStepTitle("Ready to Search");

    setReason(
      "The same sorted array is ready for another Binary Search."
    );

    setAction("Enter a new target");
  };

  const startSearch = async () => {
    if (
      isSearching ||
      array.length === 0 ||
      target === ""
    ) {
      return;
    }

    const targetValue = Number(target);

    if (Number.isNaN(targetValue)) {
      return;
    }

    resetSearchState();

    setIsSearching(true);

    setStatus("Searching...");

    let start = 0;
    let end = array.length - 1;

    // Initialize left and right
    setLeft(start);
    setRight(end);

    setActiveLine(0);

    setStepTitle("Initialize Search Range");

    setReason(
      `Searching for ${targetValue} in the sorted array.`
    );

    setAction(
      `Set left = ${start} and right = ${end}`
    );

    await sleep(speed);

    while (start <= end) {
      setActiveLine(2);

      setLeft(start);
      setRight(end);

      setStepTitle("Search Range");

      setReason(
        `The target must be between index ${start} and ${end}.`
      );

      setAction(
        "Calculate the middle element"
      );

      await sleep(speed);

      const middle = Math.floor(
        start + (end - start) / 2
      );

      setMid(middle);

      setActiveLine(3);

      setStepTitle(`Check Middle Index ${middle}`);

      setReason(
        `Middle value is ${array[middle]}.`
      );

      setAction(
        `Compare ${array[middle]} with ${targetValue}`
      );

      await sleep(speed);

      setComparisons((previous) => previous + 1);

      if (array[middle] === targetValue) {
        setActiveLine(4);

        setFoundIndex(middle);

        setStepTitle("Target Found!");

        setReason(
          `${targetValue} is found at index ${middle}.`
        );

        setAction(
          `Return index ${middle}`
        );

        setStatus("Found");

        setIsSearching(false);

        return;
      }

      if (array[middle] < targetValue) {
        setActiveLine(6);

        setStepTitle(
          "Discard Left Half"
        );

        setReason(
          `${array[middle]} is smaller than ${targetValue}, so the target can only be in the right half.`
        );

        setAction(
          `Move left to ${middle + 1}`
        );

        await sleep(speed);

        start = middle + 1;

        setLeft(start);
      } else {
        setActiveLine(8);

        setStepTitle(
          "Discard Right Half"
        );

        setReason(
          `${array[middle]} is greater than ${targetValue}, so the target can only be in the left half.`
        );

        setAction(
          `Move right to ${middle - 1}`
        );

        await sleep(speed);

        end = middle - 1;

        setRight(end);
      }
    }

    setActiveLine(9);

    setMid(-1);

    setStepTitle("Target Not Found");

    setReason(
      `${targetValue} does not exist in the array.`
    );

    setAction("Return -1");

    setStatus("Not Found");

    setIsSearching(false);
  };

  const changeArraySize = (value) => {
    if (isSearching) return;

    const size = Number(value);

    setArraySize(size);

    generateArray(size);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">

      {/* HEADER */}

      <h1 className="text-4xl font-bold text-gray-900">
        Binary Search on Arrays
      </h1>

      <p className="mt-3 text-lg text-gray-600">
        Search efficiently by repeatedly dividing
        the sorted array into halves.
      </p>

      {/* ALGORITHM INFO */}

      <AlgorithmInfo
        info={algorithmInfo.binarySearchArrays}
      />

      {/* PSEUDOCODE */}

      <PseudoCode
        code={
          algorithmInfo.binarySearchArrays
            .pseudoCode
        }
        activeLine={activeLine}
      />

      {/* CONTROLS */}

      <div className="mt-10 flex flex-wrap items-center gap-4">

        <input
          type="number"
          value={target}
          disabled={isSearching}
          onChange={(e) =>
            setTarget(e.target.value)
          }
          placeholder="Enter target"
          className="w-40 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-violet-500"
        />

        <button
          disabled={
            isSearching ||
            target === ""
          }
          onClick={startSearch}
          className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-300"
        >
          {isSearching
            ? "Searching..."
            : "Search"}
        </button>

        <button
          disabled={isSearching}
          onClick={resetSearch}
          className="rounded-xl border border-orange-500 px-6 py-3 font-semibold text-orange-500 hover:bg-orange-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
        >
          Reset Search
        </button>

        <button
          disabled={isSearching}
          onClick={() =>
            generateArray(arraySize)
          }
          className="rounded-xl border border-violet-600 px-6 py-3 font-semibold text-violet-600 hover:bg-violet-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
        >
          Generate New Array
        </button>

      </div>

      {/* STATUS */}

      <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">

        <div className="grid gap-6 sm:grid-cols-4">

          <div>
            <p className="text-sm font-medium text-gray-500">
              Left
            </p>

            <p className="mt-1 text-3xl font-bold text-blue-600">
              {left === -1 ? "—" : left}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              Middle
            </p>

            <p className="mt-1 text-3xl font-bold text-orange-500">
              {mid === -1 ? "—" : mid}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              Right
            </p>

            <p className="mt-1 text-3xl font-bold text-red-500">
              {right === -1 ? "—" : right}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              Target
            </p>

            <p className="mt-1 text-3xl font-bold text-violet-600">
              {target === "" ? "—" : target}
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

            const isLeft = index === left;

            const isRight = index === right;

            const isMiddle = index === mid;

            const isFound =
              index === foundIndex;

            let style =
              "border-violet-300 bg-violet-100 text-violet-800";

            if (isFound) {
              style =
                "scale-110 border-green-600 bg-green-500 text-white shadow-lg";
            } else if (isMiddle) {
              style =
                "scale-110 border-orange-600 bg-orange-500 text-white shadow-lg";
            } else if (isLeft) {
              style =
                "border-blue-500 bg-blue-100 text-blue-700";
            } else if (isRight) {
              style =
                "border-red-500 bg-red-100 text-red-700";
            }

            return (
              <div
                key={index}
                className="flex flex-col items-center"
              >

                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-xl border-2 text-xl font-bold transition-all duration-300 ${style}`}
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
          Normal
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-blue-500" />
          Left
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-orange-500" />
          Middle
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-red-500" />
          Right
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-green-500" />
          Found
        </div>

      </div>

      {/* SETTINGS */}

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
            disabled={isSearching}
            onChange={(e) =>
              changeArraySize(
                e.target.value
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
            min="100"
            max="1000"
            step="100"
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

export default BinarySearchArrays;