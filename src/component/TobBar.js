import { Link } from "react-router-dom";

export default function TopBar() {
  return (
    <header className="bg-white shadow-xl">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-black">
          KROO <span className="text-gray-500">Coworking</span>
        </h1>

        {/* Button */}
        <Link
          to="/"
          className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
        >
          Go To Website
        </Link>
      </div>
    </header>
  );
}
