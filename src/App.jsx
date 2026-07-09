import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Visualizer from "./pages/Visualizer/Visualizer";
import Layout from "./components/Layout/Layout";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Practice from "./pages/Practice/Practice";
import Algorithms from "./pages/Algorithms/Algorithms";
import AlgorithmDetails from "./pages/AlgorithmDetails/AlgorithmDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "practice",
        element: <Practice />,
      },
      {
        path: "algorithms",
        element: <Algorithms />,
      },
      {
        path: "algorithms/:slug",
        element: <AlgorithmDetails />,
      },
      {
        path: "algorithms/:slug/:algorithmSlug",
        element: <Visualizer />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
