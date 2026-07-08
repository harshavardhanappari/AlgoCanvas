import CategoryCard from "../CategoryCard/CategoryCard";

const CategoriesSection = ({ categories }) => {
  return (
    <section className="bg-violet-50/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Explore Algorithm Categories
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600">
            Choose a topic and start mastering Data Structures and Algorithms
            through interactive visualizations.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="mt-16 grid grid-cols-3 gap-8">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;