import { useParams } from "react-router-dom";
import BubbleSort from "../../visualizers/BubbleSort";
import SelectionSort from "../../visualizers/SelectionSort";
import InsertionSort from "../../visualizers/InsertionSort";
import MergeSort from "../../visualizers/MergeSort";
import QuickSort from "../../visualizers/QuickSort";
import HeapSort from "../../visualizers/HeapSort";
import LinearSearch from "../../visualizers/LinearSearch";

const Visualizer = () => {
  const { algorithmSlug } = useParams();

  switch (algorithmSlug) {
    case "bubble-sort":
      return <BubbleSort />;
    case "selection-sort":
      return <SelectionSort />;
    case "insertion-sort":
      return <InsertionSort />;
    case "merge-sort":
      return <MergeSort />;
    case "quick-sort":
      return <QuickSort />;
    case "heap-sort":
      return <HeapSort />;
    case "linear-search":
      return <LinearSearch />;
    default:
      return (
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 capitalize">
            {algorithmSlug.replace(/-/g, " ")}
          </h1>

          <p className="mt-6 text-lg text-gray-500">
            Visualizer coming soon 🚀
          </p>
        </div>
      );
  }
};

export default Visualizer;
