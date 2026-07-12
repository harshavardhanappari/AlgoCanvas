const PseudoCode = ({ code, activeLine = -1 }) => {
  return (
    <section className="mt-10 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-bold text-gray-900">
        Pseudo Code
      </h2>

      <div className="mt-6 rounded-2xl bg-gray-900 p-6">
        {code.map((line, index) => (
          <div
            key={index}
            className={`rounded-lg px-4 py-1 font-mono text-lg leading-9 transition-all duration-300 ${
              activeLine === index
                ? "bg-yellow-400 font-bold text-gray-900"
                : "text-green-400"
            }`}
          >
            {line}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PseudoCode;