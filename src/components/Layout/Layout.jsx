import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        <Outlet />
      </main>

      <footer className="border-t py-8 text-center text-gray-500">
        © 2026 AlgoCanvas. Built with React & Tailwind CSS.
      </footer>
    </div>
  );
};

export default Layout;