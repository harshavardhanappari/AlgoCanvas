const CategoryCard = ({ category }) => {
  const Icon = category.icon;

  return (
    <div className="group cursor-pointer rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-violet-300 hover:shadow-xl">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-violet-100 transition-all duration-300 group-hover:bg-violet-600">
        <Icon className="text-4xl text-violet-600 transition-all duration-300 group-hover:text-white" />
      </div>

      <h3 className="mt-6 text-2xl font-bold text-gray-900">
        {category.title}
      </h3>

      <p className="mt-4 leading-7 text-gray-600">
        {category.description}
      </p>

      <div className="mt-8 flex items-center justify-center gap-2 font-semibold text-violet-600 transition-all duration-300 group-hover:gap-3">
        Explore
        <span>→</span>
      </div>
    </div>
  );
};

export default CategoryCard;