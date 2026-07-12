const Statistics = ({
  comparisons,
  swaps,
  currentPass,
  status,
}) => {
  return (
    <section className="mt-10 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-bold text-gray-900">
        Statistics
      </h2>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl bg-violet-50 p-5">
          <p className="text-gray-500">
            Comparisons
          </p>

          <h3 className="mt-2 text-3xl font-bold text-violet-600">
            {comparisons}
          </h3>
        </div>

        <div className="rounded-2xl bg-violet-50 p-5">
          <p className="text-gray-500">
            Swaps
          </p>

          <h3 className="mt-2 text-3xl font-bold text-violet-600">
            {swaps}
          </h3>
        </div>

        <div className="rounded-2xl bg-violet-50 p-5">
          <p className="text-gray-500">
            Current Pass
          </p>

          <h3 className="mt-2 text-3xl font-bold text-violet-600">
            {currentPass}
          </h3>
        </div>

        <div className="rounded-2xl bg-violet-50 p-5">
          <p className="text-gray-500">
            Status
          </p>

          <h3
            className={`mt-2 text-xl font-bold ${
              status === "Sorting..."
                ? "text-orange-500"
                : status === "Completed"
                ? "text-green-600"
                : "text-gray-600"
            }`}
          >
            {status}
          </h3>
        </div>
      </div>
    </section>
  );
};

export default Statistics;