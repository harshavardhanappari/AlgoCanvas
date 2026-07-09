import { useNavigate } from "react-router-dom";

const AlgorithmCard = ({ algorithm }) => {
  const Icon = algorithm.icon;
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate(
          `/algorithms/${algorithm.title
            .toLowerCase()
            .replace(/\s+/g, "-")}`
        )
      }
      className="group cursor-pointer rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-violet-300 hover:shadow-xl"
    >
      {/* Icon + Title */}
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 transition-all duration-300 group-hover:bg-violet-600">
          <Icon className="text-3xl text-violet-600 transition-all duration-300 group-hover:text-white" />
        </div>

        <h2 className="text-2xl font-semibold text-gray-900">
          {algorithm.title}
        </h2>
      </div>

      {/* Description */}
      <p className="mt-6 leading-7 text-gray-600">
        {algorithm.description}
      </p>

      {/* Footer */}
      <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-5">
        <span className="text-sm font-medium text-gray-500">
          {algorithm.algorithms} Algorithms
        </span>

        <span className="font-semibold text-violet-600 transition-all duration-300 group-hover:translate-x-1">
          Explore →
        </span>
      </div>
    </div>
  );
};

export default AlgorithmCard;