const MergePanel = ({
  visible,
  leftArray = [],
  rightArray = [],
  mergedArray = [],
  leftPointer = -1,
  rightPointer = -1,
  left,
  right,
}) => {
  if (!visible) return null;

  const Box = ({ value, active, color }) => (
    <div
      className={`flex h-14 w-14 items-center justify-center rounded-xl border-2 text-lg font-bold transition-all duration-300 ${
        active
          ? "scale-110 border-red-500 bg-red-500 text-white shadow-lg"
          : color
      }`}
    >
      {value}
    </div>
  );

  return (
    <div className="mt-8 rounded-2xl border bg-white p-8 shadow-xl">

      <h2 className="mb-8 text-center text-3xl font-bold text-violet-700">
        MERGING RANGE [{left} - {right}]
      </h2>

      {/* LEFT HALF */}

      <div className="mb-8">
        <h3 className="mb-3 text-xl font-bold text-violet-700">
          Left Half
        </h3>

        <div className="flex flex-wrap gap-3">
          {leftArray.map((value, index) => (
            <Box
              key={index}
              value={value}
              active={index === leftPointer}
              color="border-violet-300 bg-violet-100"
            />
          ))}
        </div>
      </div>

      <hr className="my-6" />

      {/* RIGHT HALF */}

      <div className="mb-8">
        <h3 className="mb-3 text-xl font-bold text-blue-700">
          Right Half
        </h3>

        <div className="flex flex-wrap gap-3">
          {rightArray.map((value, index) => (
            <Box
              key={index}
              value={value}
              active={index === rightPointer}
              color="border-blue-300 bg-blue-100"
            />
          ))}
        </div>
      </div>

      <hr className="my-6" />

      {/* MERGED */}

      <div>
        <h3 className="mb-3 text-xl font-bold text-green-700">
          Merged
        </h3>

        <div className="flex flex-wrap gap-3">
          {Array.from({
            length: leftArray.length + rightArray.length,
          }).map((_, index) => (
            <div
              key={index}
              className={`flex h-14 w-14 items-center justify-center rounded-xl border-2 text-lg font-bold transition-all duration-300 ${
                index < mergedArray.length
                  ? "border-green-500 bg-green-500 text-white"
                  : "border-dashed border-gray-300 bg-gray-50"
              }`}
            >
              {index < mergedArray.length ? mergedArray[index] : ""}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default MergePanel;