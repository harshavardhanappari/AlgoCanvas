import { useEffect, useState } from "react";
import algorithmInfo from "../data/algorithmInfo";
import AlgorithmInfo from "../components/AlgorithmInfo/AlgorithmInfo";
import PseudoCode from "../components/PseudoCode/PseudoCode";
import CurrentStep from "../components/CurrentStep/CurrentStep";

const ArrayInsertionDeletion = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(7);

  const [operation, setOperation] = useState("insert");
  const [index, setIndex] = useState(2);
  const [value, setValue] = useState(99);

  const [speed, setSpeed] = useState(50);

  const [activeIndices, setActiveIndices] = useState([]);
  const [resultIndex, setResultIndex] = useState(-1);

  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [activeLine, setActiveLine] = useState(-1);

  const [status, setStatus] = useState("Ready");
  const [shiftCount, setShiftCount] = useState(0);

  const [stepTitle, setStepTitle] =
    useState("Ready to Start");

  const [reason, setReason] = useState(
    "Choose an operation and start the visualization."
  );

  const [action, setAction] = useState("Waiting...");

  const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // --------------------------------------------------
  // Generate Array
  // --------------------------------------------------

  const generateArray = (size) => {
    if (isRunning) return;

    const newArray = Array.from(
      { length: size },
      (_, i) => (i + 1) * 10
    );

    setArray(newArray);

    setIndex(
      operation === "insert"
        ? Math.min(2, size)
        : Math.min(2, Math.max(0, size - 1))
    );

    setValue(99);

    setActiveIndices([]);
    setResultIndex(-1);

    setShiftCount(0);

    setIsCompleted(false);
    setActiveLine(-1);

    setStatus("Ready");

    setStepTitle("Ready to Start");

    setReason(
      "Choose an operation and start the visualization."
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
  // Operation Change
  // --------------------------------------------------

  const handleOperationChange = (newOperation) => {
    if (isRunning) return;

    setOperation(newOperation);

    setActiveIndices([]);
    setResultIndex(-1);

    setShiftCount(0);

    setIsCompleted(false);
    setActiveLine(-1);

    setStatus("Ready");

    setStepTitle("Ready to Start");

    setReason(
      "Choose an index and start the operation."
    );

    setAction("Waiting...");

    if (newOperation === "insert") {
      setIndex(Math.min(2, array.length));
    } else {
      setIndex(
        Math.min(
          2,
          Math.max(0, array.length - 1)
        )
      );
    }
  };

  // --------------------------------------------------
  // Start Operation
  // --------------------------------------------------

  const startOperation = async () => {
    if (isRunning || array.length === 0) {
      return;
    }

    // Validate insertion
    if (operation === "insert") {
      if (
        index < 0 ||
        index > array.length
      ) {
        return;
      }
    }

    // Validate deletion
    if (operation === "delete") {
      if (
        index < 0 ||
        index >= array.length
      ) {
        return;
      }
    }

    setIsRunning(true);
    setIsCompleted(false);
    setShiftCount(0);
    setResultIndex(-1);
    setActiveIndices([]);

    // ==================================================
    // INSERTION
    // ==================================================

    if (operation === "insert") {
      let workingArray = [...array];

      setStatus("Inserting");

      setStepTitle(
        `Insert ${value} at Index ${index}`
      );

      setReason(
        `Elements from index ${index} onward must move one position to the right.`
      );

      setAction("Preparing insertion");

      await sleep(
        Math.max(150, 700 - speed)
      );

      // Shift elements right
      for (
        let i = workingArray.length - 1;
        i >= index;
        i--
      ) {
        setActiveLine(2);

        setActiveIndices([i]);

        setStepTitle(
          `Shift Element at Index ${i}`
        );

        setReason(
          `${workingArray[i]} moves from index ${i} to index ${i + 1}.`
        );

        setAction("Shift right");

        await sleep(
          Math.max(150, 650 - speed)
        );

        workingArray[i + 1] =
          workingArray[i];

        setArray([...workingArray]);

        setShiftCount(
          (previous) => previous + 1
        );
      }

      // Insert value
      setActiveLine(3);

      setActiveIndices([index]);
      setResultIndex(index);

      setStepTitle(
        `Insert ${value}`
      );

      setReason(
        `${value} is placed at index ${index}.`
      );

      setAction("Place new element");

      await sleep(
        Math.max(150, 650 - speed)
      );

      workingArray[index] = value;

      setArray([...workingArray]);

      await sleep(
        Math.max(150, 400 - speed)
      );

      // Complete
      setActiveIndices([]);

      setStatus("Completed");

      setStepTitle(
        "Insertion Completed"
      );

      setReason(
        `${value} was successfully inserted at index ${index}.`
      );

      setAction("Finished");

      setIsRunning(false);
      setIsCompleted(true);

      return;
    }

    // ==================================================
    // DELETION
    // ==================================================

    let workingArray = [...array];

    const deletedValue = workingArray[index];

    setStatus("Deleting");

    setStepTitle(
      `Delete Element at Index ${index}`
    );

    setReason(
      `${deletedValue} will be removed and the following elements will shift left.`
    );

    setAction("Select element");

    await sleep(
      Math.max(150, 700 - speed)
    );

    // Highlight target
    setActiveLine(6);

    setActiveIndices([index]);

    setStepTitle(
      `Remove ${deletedValue}`
    );

    setReason(
      `The element ${deletedValue} at index ${index} is being deleted.`
    );

    setAction("Delete element");

    await sleep(
      Math.max(150, 650 - speed)
    );

    // Shift elements left
    for (
      let i = index;
      i < workingArray.length - 1;
      i++
    ) {
      setActiveLine(7);

      setActiveIndices([
        i,
        i + 1,
      ]);

      setStepTitle(
        `Shift Element at Index ${i + 1}`
      );

      setReason(
        `${workingArray[i + 1]} moves from index ${i + 1} to index ${i}.`
      );

      setAction("Shift left");

      await sleep(
        Math.max(150, 650 - speed)
      );

      workingArray[i] =
        workingArray[i + 1];

      setArray([...workingArray]);

      setShiftCount(
        (previous) => previous + 1
      );
    }

    // Remove duplicate last element
    setActiveLine(8);

    setActiveIndices([
      workingArray.length - 1,
    ]);

    setStepTitle(
      "Reduce Array Size"
    );

    setReason(
      "The duplicate last element is removed."
    );

    setAction("Remove last element");

    await sleep(
      Math.max(150, 650 - speed)
    );

    workingArray.pop();

    setArray([...workingArray]);

    setResultIndex(
      Math.min(
        index,
        workingArray.length - 1
      )
    );

    await sleep(
      Math.max(150, 400 - speed)
    );

    // Complete
    setActiveIndices([]);

    setStatus("Completed");

    setStepTitle(
      "Deletion Completed"
    );

    setReason(
      `${deletedValue} was successfully deleted from index ${index}.`
    );

    setAction("Finished");

    setIsRunning(false);
    setIsCompleted(true);
  };

  // --------------------------------------------------
  // Index validation
  // --------------------------------------------------

  const maxIndex =
    operation === "insert"
      ? array.length
      : Math.max(0, array.length - 1);

  const isInvalidIndex =
    index < 0 ||
    index > maxIndex ||
    !Number.isInteger(index);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">

      {/* ==================================================
          HEADER
      ================================================== */}

      <div>
        <h1 className="text-4xl font-bold text-gray-900">
          Array Insertion & Deletion
        </h1>

        <p className="mt-3 max-w-3xl text-lg leading-8 text-gray-600">
          Visualize how elements shift when an element
          is inserted into or deleted from an array.
        </p>
      </div>

      {/* ==================================================
          ALGORITHM INFO
      ================================================== */}

      <AlgorithmInfo
        info={
          algorithmInfo.arrayInsertionDeletion
        }
      />

      {/* ==================================================
          PSEUDOCODE
      ================================================== */}

      <PseudoCode
        code={
          algorithmInfo.arrayInsertionDeletion
            .pseudoCode
        }
        activeLine={activeLine}
      />

      {/* ==================================================
          CONTROLS
      ================================================== */}

      <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {/* OPERATION */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Operation
            </label>

            <select
              value={operation}
              disabled={isRunning}
              onChange={(e) =>
                handleOperationChange(
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            >
              <option value="insert">
                Insert
              </option>

              <option value="delete">
                Delete
              </option>
            </select>
          </div>

          {/* INDEX */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Target Index
            </label>

            <input
              type="number"
              min="0"
              max={maxIndex}
              value={index}
              disabled={isRunning}
              onChange={(e) =>
                setIndex(
                  Number(e.target.value)
                )
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />
          </div>

          {/* VALUE */}

          {operation === "insert" ? (
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Value
              </label>

              <input
                type="number"
                value={value}
                disabled={isRunning}
                onChange={(e) =>
                  setValue(
                    Number(e.target.value)
                  )
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              />
            </div>
          ) : (
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Selected Value
              </label>

              <div className="flex h-[50px] items-center rounded-xl border border-gray-200 bg-gray-50 px-4 font-semibold text-gray-700">
                {array[index] ?? "—"}
              </div>
            </div>
          )}

          {/* BUTTONS */}

          <div className="flex items-end gap-3">

            <button
              disabled={
                isRunning ||
                array.length === 0 ||
                isInvalidIndex
              }
              onClick={startOperation}
              className="flex-1 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-300"
            >
              {isRunning
                ? "Running..."
                : "Start"}
            </button>

            <button
              disabled={isRunning}
              onClick={reset}
              className="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400"
            >
              Reset
            </button>

          </div>

        </div>

        {/* INVALID INDEX */}

        {isInvalidIndex && (
          <p className="mt-4 text-sm font-medium text-red-500">
            Please enter a valid index between 0 and{" "}
            {maxIndex}.
          </p>
        )}

      </div>

      {/* ==================================================
          OPERATION SUMMARY
      ================================================== */}

      <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {/* OPERATION */}

          <div>
            <p className="text-sm font-medium text-gray-500">
              Operation
            </p>

            <p className="mt-2 text-2xl font-bold capitalize text-violet-600">
              {operation}
            </p>
          </div>

          {/* ARRAY SIZE */}

          <div>
            <p className="text-sm font-medium text-gray-500">
              Array Size
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
              {array.length}
            </p>
          </div>

          {/* INDEX */}

          <div>
            <p className="text-sm font-medium text-gray-500">
              Target Index
            </p>

            <p className="mt-2 text-2xl font-bold text-orange-500">
              {index}
            </p>
          </div>

          {/* SHIFTS */}

          <div>
            <p className="text-sm font-medium text-gray-500">
              Elements Shifted
            </p>

            <p className="mt-2 text-2xl font-bold text-blue-600">
              {shiftCount}
            </p>
          </div>

        </div>

      </div>

      {/* ==================================================
          ARRAY VISUALIZATION
      ================================================== */}

      <div className="mt-10 rounded-3xl border border-gray-200 bg-gray-50 p-8">

        {/* Visualization heading */}

        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Array
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {operation === "insert"
                ? `Insert ${value} at index ${index}`
                : `Delete element at index ${index}`}
            </p>
          </div>

          <div
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              status === "Completed"
                ? "bg-green-100 text-green-700"
                : status === "Ready"
                  ? "bg-gray-100 text-gray-600"
                  : "bg-orange-100 text-orange-700"
            }`}
          >
            {status}
          </div>

        </div>

        {/* Array */}

        <div className="flex min-h-[150px] flex-wrap items-center justify-center gap-4">

          {array.map((item, i) => {

            const isActive =
              activeIndices.includes(i);

            const isResult =
              i === resultIndex &&
              isCompleted;

            return (
              <div
                key={i}
                className="flex flex-col items-center"
              >

                {/* Arrow */}

                {isActive && (
                  <div className="mb-2 text-xl font-bold text-orange-500">
                    ↓
                  </div>
                )}

                {!isActive && (
                  <div className="mb-2 h-7" />
                )}

                {/* Element */}

                <div
                  className={
                    isActive
                      ? "flex h-16 w-16 scale-110 items-center justify-center rounded-2xl border-2 border-orange-600 bg-orange-500 text-xl font-bold text-white shadow-lg"
                      : isResult
                        ? "flex h-16 w-16 scale-105 items-center justify-center rounded-2xl border-2 border-green-600 bg-green-500 text-xl font-bold text-white shadow-lg"
                        : "flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-violet-300 bg-white text-xl font-bold text-gray-800 shadow-sm"
                  }
                >
                  {item}
                </div>

                {/* Index */}

                <div className="mt-3 text-sm font-medium text-gray-400">
                  index {i}
                </div>

              </div>
            );
          })}

        </div>

        {/* Empty state */}

        {array.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            Array is empty
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
          Active / Shifting
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded-md bg-green-500" />
          Result
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
            min="4"
            max="10"
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

export default ArrayInsertionDeletion;