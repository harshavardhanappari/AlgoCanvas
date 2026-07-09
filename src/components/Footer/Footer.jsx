const Footer = () => {
  return (
    <footer className="mt-24 border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-12">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-lg font-semibold text-white">
            A
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
            AlgoCanvas
          </h2>
        </div>

        {/* Tagline */}
        <p className="mt-4 text-center text-gray-500">
          Learn • Visualize • Practice
        </p>

        {/* Copyright */}
        <p className="mt-8 text-sm text-gray-400">
          © 2026 AlgoCanvas. Built with React & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
};

export default Footer;