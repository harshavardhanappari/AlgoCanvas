import { useState } from "react";
import AlgorithmInfo from "../components/AlgorithmInfo/AlgorithmInfo";
import PseudoCode from "../components/PseudoCode/PseudoCode";
import CurrentStep from "../components/CurrentStep/CurrentStep";
import algorithmInfo from "../data/algorithmInfo";
import sleep from "../utils/sleep";

const InsertAtBeginning = () => {
  const [input, setInput] = useState("10, 20, 30, 40");
  const [value, setValue] = useState("5");

  const [list, setList] = useState([10, 20, 30, 40]);
  const [originalList, setOriginalList] = useState([10, 20, 30, 40]);

  const [newNode, setNewNode] = useState(null);

  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [activeLine, setActiveLine] = useState(-1);

  const [stepTitle, setStepTitle] = useState(
    "Ready to Insert at Beginning"
  );

  const [reason, setReason] = useState(
    "Enter a value and create a new node that will become the new HEAD."
  );

  const [action, setAction] = useState("Waiting...");

  const parseInput = () => {
    return input
      .split(",")
      .map((item) => Number(item.trim()))
      .filter((item) => !Number.isNaN(item));
  };

  const resetVisualizer = () => {
    if (isRunning) return;

    const values = parseInput();

    setList([...values]);
    setOriginalList([...values]);

    setNewNode(null);

    setIsCompleted(false);
    setActiveLine(-1);

    setStepTitle("Ready to Insert Again");

    setReason(
      "The linked list has been restored to its original state."
    );

    setAction("Waiting...");
  };

  const insertAtBeginning = async () => {
    if (isRunning) return;

    const values = parseInput();
    const nodeValue = Number(value);

    if (values.length === 0) {
      setStepTitle("Invalid Linked List");

      setReason(
        "Please enter at least one valid number for the linked list."
      );

      return;
    }

    if (Number.isNaN(nodeValue)) {
      setStepTitle("Invalid Node Value");

      setReason(
        "Please enter a valid value for the new node."
      );

      return;
    }

    setIsRunning(true);

    // Restore original list before running again
    setList([...values]);
    setOriginalList([...values]);

    setNewNode(null);
    setIsCompleted(false);

    /*
      STEP 1
      Create new node
    */

    setActiveLine(0);

    setStepTitle("Creating New Node");

    setReason(
      `A new node containing ${nodeValue} is created in memory.`
    );

    setAction(`newNode = ${nodeValue}`);

    await sleep(900);

    setNewNode(nodeValue);

    /*
      STEP 2
      newNode.next = head
    */

    setActiveLine(1);

    setStepTitle("Connecting New Node");

    setReason(
      `The next pointer of the new node will point to the current HEAD node (${values[0]}).`
    );

    setAction("newNode.next = HEAD");

    await sleep(1200);

    /*
      STEP 3
      head = newNode
    */

    setActiveLine(2);

    setStepTitle("Updating HEAD");

    setReason(
      `HEAD is moved from ${values[0]} to the new node ${nodeValue}.`
    );

    setAction("HEAD = newNode");

    await sleep(1200);

    /*
      FINAL STEP
    */

    setList([nodeValue, ...values]);

    setNewNode(null);

    setActiveLine(3);

    setStepTitle("Insertion Completed!");

    setReason(
      `${nodeValue} is now the first node and the new HEAD of the linked list.`
    );

    setAction("Insertion finished");

    setIsCompleted(true);

    setIsRunning(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">

      {/* HEADER */}

      <h1 className="text-4xl font-bold text-gray-900">
        Insert at Beginning
      </h1>

      <p className="mt-3 text-lg text-gray-600">
        Insert a new node at the beginning of a linked list and
        update the HEAD pointer.
      </p>

      {/* ALGORITHM INFO */}

      <div className="mt-8">
        <AlgorithmInfo
          info={algorithmInfo.insertAtBeginning}
        />
      </div>

      {/* PSEUDOCODE */}

      <div className="mt-8">
        <PseudoCode
          code={algorithmInfo.insertAtBeginning.pseudoCode}
          activeLine={activeLine}
        />
      </div>

      {/* INPUTS */}

      <div className="mt-10 grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-semibold text-gray-700">
            Linked List Values
          </label>

          <input
            type="text"
            value={input}
            disabled={isRunning}
            onChange={(e) => setInput(e.target.value)}
            placeholder="10, 20, 30, 40"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-violet-500"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold text-gray-700">
            New Node Value
          </label>

          <input
            type="number"
            value={value}
            disabled={isRunning}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-violet-500"
          />
        </div>

      </div>

      {/* CONTROLS */}

      <div className="mt-6 flex flex-wrap gap-4">

        <button
          onClick={insertAtBeginning}
          disabled={isRunning || isCompleted}
          className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-300"
        >
          {isRunning
            ? "Inserting..."
            : isCompleted
            ? "Completed"
            : "Insert at Beginning"}
        </button>

        <button
          onClick={resetVisualizer}
          disabled={isRunning}
          className="rounded-xl border border-orange-500 px-6 py-3 font-semibold text-orange-500 transition hover:bg-orange-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
        >
          Reset
        </button>

      </div>

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

          {/* NEW NODE DURING INSERTION */}

          {newNode !== null && (
            <div className="flex items-center">

              <div className="flex flex-col items-center">

                <div className="mb-2 flex flex-col items-center">

                  <span className="text-xs font-bold text-orange-500">
                    NEW NODE
                  </span>

                  <span className="text-xl text-orange-500">
                    ↓
                  </span>

                </div>

                <div className="flex overflow-hidden rounded-xl border-2 border-orange-500 bg-orange-500 text-white shadow-lg transition-all duration-300">

                  {/* DATA */}

                  <div className="flex h-16 min-w-16 items-center justify-center px-4 text-xl font-bold">
                    {newNode}
                  </div>

                  {/* NEXT POINTER */}

                  <div className="flex h-16 w-12 items-center justify-center border-l-2 border-current text-lg">
                    →
                  </div>

                </div>

                <span className="mt-2 text-sm text-gray-400">
                  New Node
                </span>

              </div>

              <div className="mx-2 mt-8 text-3xl font-bold text-orange-400">
                →
              </div>

            </div>
          )}

          {/* EXISTING NODES */}

          {list.map((node, index) => {

            let nodeStyle =
              "border-violet-300 bg-white text-gray-800";

            if (
              isCompleted &&
              index === 0
            ) {
              nodeStyle =
                "border-green-500 bg-green-100 text-green-800";
            }

            return (
              <div
                key={`${node}-${index}`}
                className="flex items-center"
              >

                <div className="flex flex-col items-center">

                  {/* SPACER */}

                  <div className="mb-2 h-9" />

                  {/* NODE */}

                  <div
                    className={`flex overflow-hidden rounded-xl border-2 transition-all duration-300 ${nodeStyle}`}
                  >

                    {/* DATA */}

                    <div className="flex h-16 min-w-16 items-center justify-center px-4 text-xl font-bold">
                      {node}
                    </div>

                    {/* NEXT POINTER */}

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
          Existing Node
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-orange-500" />
          New Node
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-green-400" />
          New HEAD
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

export default InsertAtBeginning;