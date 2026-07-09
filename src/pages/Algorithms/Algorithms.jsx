import { useState } from "react";
import algorithmCategories from "../../data/algorithmCategories";
import AlgorithmCard from "../../components/AlgorithmCard/AlgorithmCard";

const Algorithms = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAlgorithms = algorithmCategories.filter((algorithm) =>
    algorithm.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900">
            Algorithms Library
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
            Explore algorithms by category and learn them through beautiful
            visualizations and interactive animations.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mx-auto mt-12 max-w-xl">
          <input
            type="text"
            placeholder="Search algorithms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-2xl border border-gray-200 px-5 py-4 text-lg outline-none transition-all duration-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
          />
        </div>

        {/* Algorithm Cards */}
        <div className="mt-16 grid grid-cols-3 gap-8">
          {filteredAlgorithms.map((algorithm) => (
            <AlgorithmCard
              key={algorithm.id}
              algorithm={algorithm}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Algorithms;