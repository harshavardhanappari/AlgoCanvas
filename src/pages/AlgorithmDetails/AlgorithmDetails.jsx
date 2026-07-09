import { useNavigate, useParams } from "react-router-dom";
import algorithmData from "../../data/algorithmData";

const AlgorithmDetails = () => {
  const { slug } = useParams();

  const navigate = useNavigate();

  const category = algorithmData[slug];

  if (!category) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h1 className="text-4xl font-bold text-red-500">Category Not Found</h1>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      {/* Heading */}
      <div>
        <h1 className="text-5xl font-bold text-gray-900">{category.title}</h1>

        <p className="mt-5 max-w-3xl text-lg text-gray-600">
          {category.description}
        </p>
      </div>

      {/* Algorithms List */}
      <div className="mt-14 space-y-5">
        {category.algorithms.map((algorithm) => (
          <div
            key={algorithm.id}
            className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-violet-300 hover:shadow-md"
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {algorithm.name}
              </h2>

              <p className="mt-2 text-gray-500">
                Difficulty: {algorithm.difficulty}
              </p>
            </div>

            <button
              onClick={() => navigate(`/algorithms/${slug}/${algorithm.slug}`)}
              className="rounded-xl bg-violet-600 px-5 py-2 font-medium text-white transition-all duration-300 hover:bg-violet-700"
            >
              Visualize
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AlgorithmDetails;
