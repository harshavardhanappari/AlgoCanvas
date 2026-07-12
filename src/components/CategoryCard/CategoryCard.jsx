import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const Icon = category.icon;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(category.route)}
      className="group flex cursor-pointer flex-col rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-indigo-600 hover:shadow-xl"
    >
      {/* Icon */}
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 transition-all duration-300 group-hover:bg-indigo-600">
        <Icon className="text-4xl text-indigo-600 transition-all duration-300 group-hover:text-white" />
      </div>

      {/* Title */}
      <h3 className="mt-6 text-center text-2xl font-bold text-gray-900">
        {category.title}
      </h3>

      {/* Description */}
      <p className="mt-4 min-h-[84px] text-center leading-7 text-gray-600">
        {category.description}
      </p>

      {/* Explore */}
      <div className="mt-auto flex items-center justify-center gap-2 pt-8 font-semibold text-indigo-600 transition-all duration-300 group-hover:gap-3">
        Explore
        <span>→</span>
      </div>
    </div>
  );
};

export default CategoryCard;