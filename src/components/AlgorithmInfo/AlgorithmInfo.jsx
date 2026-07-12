const AlgorithmInfo = ({ info }) => {
  return (
    <section className="mt-12 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
     

      <p className="leading-8 text-gray-600">
        {info.description}
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-violet-50 p-5">
          <h3 className="font-semibold text-gray-700">
            Best Case
          </h3>

          <p className="mt-2 text-2xl font-bold text-violet-600">
            {info.complexity.best}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-violet-50 p-5">
          <h3 className="font-semibold text-gray-700">
            Average Case
          </h3>

          <p className="mt-2 text-2xl font-bold text-violet-600">
            {info.complexity.average}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-violet-50 p-5">
          <h3 className="font-semibold text-gray-700">
            Worst Case
          </h3>

          <p className="mt-2 text-2xl font-bold text-violet-600">
            {info.complexity.worst}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-violet-50 p-5">
          <h3 className="font-semibold text-gray-700">
            Space Complexity
          </h3>

          <p className="mt-2 text-2xl font-bold text-violet-600">
            {info.complexity.space}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-violet-50 p-5">
          <h3 className="font-semibold text-gray-700">
            Stable
          </h3>

          <p className="mt-2 text-2xl font-bold text-green-600">
            {info.stable}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-violet-50 p-5">
          <h3 className="font-semibold text-gray-700">
            In-place
          </h3>

          <p className="mt-2 text-2xl font-bold text-green-600">
            {info.inPlace}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AlgorithmInfo;