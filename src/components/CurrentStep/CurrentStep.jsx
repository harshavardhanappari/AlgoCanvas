const CurrentStep = ({ title, reason, action }) => {
  return (
    <section className="mt-10 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-bold text-gray-900">
        🧠 Current Step
      </h2>

      <div className="mt-8 space-y-6">
        <div>
          <p className="text-sm uppercase tracking-wide text-gray-500">
            Step
          </p>

          <p className="mt-2 text-xl font-semibold text-violet-600">
            {title}
          </p>
        </div>

        <div>
          <p className="text-sm uppercase tracking-wide text-gray-500">
            Reason
          </p>

          <p className="mt-2 text-lg text-gray-700">
            {reason}
          </p>
        </div>

        <div>
          <p className="text-sm uppercase tracking-wide text-gray-500">
            Action
          </p>

          <p className="mt-2 text-lg font-medium text-green-600">
            {action}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CurrentStep;