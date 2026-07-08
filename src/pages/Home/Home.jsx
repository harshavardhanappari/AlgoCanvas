import { FaCode } from "react-icons/fa";
import { MdOutlineAutoGraph } from "react-icons/md";
import { LuBookOpen } from "react-icons/lu";
import CategoriesSection from "../../components/CategoriesSection/CategoriesSection";
import features from "../../data/features";
import categories from "../../data/categories";


const Home = () => {
  return (
    <div>
      <section className="flex min-h-[80vh] flex-col items-center justify-center text-center">

        {/* Heading */}
        <div>
          <h1 className="text-6xl font-extrabold leading-tight tracking-tight text-gray-900">
            Learn Data Structures &
            <br />
            Algorithms Visually
          </h1>
        </div>

        {/* Description */}
        <div className="mt-6">
          <p className="max-w-3xl text-lg leading-8 text-gray-600">
            Master Data Structures and Algorithms through interactive
            visualizations, step-by-step explanations, and hands-on practice.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex gap-6">
          <button className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-violet-700">
            Explore Algorithms
          </button>

          <button className="rounded-xl border border-violet-600 px-6 py-3 font-semibold text-violet-600 transition-all duration-300 hover:scale-105 hover:bg-violet-50">
            Start Practicing
          </button>
        </div>

        {/* Features */}
        <div className="mt-16 flex gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="flex w-64 flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <Icon className="mb-4 text-5xl text-violet-600" />

                <h3 className="text-lg font-semibold text-gray-800">
                  {feature.title}
                </h3>
              </div>
            );
          })}
        </div>
      </section>
      <CategoriesSection categories={categories}/>
    </div>
  );
};

export default Home;