import { useParams } from "react-router-dom";

const Visualizer = () => {
  const { slug, algorithmSlug } = useParams();

  const formattedName = algorithmSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div>
        <h1 className="text-5xl font-bold text-gray-900">
          {formattedName}
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          Category: {slug}
        </p>
      </div>

      <div className="mt-12 flex h-96 items-center justify-center rounded-3xl border-2 border-dashed border-gray-300 bg-gray-50">
        <h2 className="text-3xl font-semibold text-gray-400">
          Visualizer Coming Soon 🚀
        </h2>
      </div>
    </section>
  );
};

export default Visualizer;