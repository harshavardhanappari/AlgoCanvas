{array.map((value, index) => {
  const isCurrent = index === currentIndex;
  const isVisited = visited.includes(index);

  let boxClass =
    "flex h-16 w-16 items-center justify-center rounded-xl border-2 text-xl font-bold";

  if (isCurrent) {
    boxClass +=
      " scale-110 border-orange-600 bg-orange-500 text-white shadow-lg";
  } else if (isVisited) {
    boxClass +=
      " border-green-500 bg-green-100 text-green-700";
  } else {
    boxClass +=
      " border-violet-300 bg-violet-100 text-violet-800";
  }

  return (
    <div
      key={index}
      className="flex flex-col items-center"
    >
      <div className={boxClass}>
        {value}
      </div>

      <div className="mt-2 text-sm text-gray-400">
        {index}
      </div>
    </div>
  );
})}