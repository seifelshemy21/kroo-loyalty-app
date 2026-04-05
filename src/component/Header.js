import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Header() {
  const cookie = new Cookies();
  const getToken = cookie.get("Bearer");

  async function handleLogout() {
    await axios.post("http://127.0.0.1:8000/api/logout", null, {
      headers: {
        Authorization: "Bearer " + getToken,
      },
    });
    cookie.remove("Bearer");
    window.location.pathname = "/";
  }

  return (
    <header className="shadow-xl bg-white">
      <nav className="container mx-auto flex flex-wrap justify-between items-center p-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-700 transition">
            KROO <span className="text-gray-500">Coworking</span>
          </Link>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2 mt-3 md:mt-0 md:flex-row md:items-center md:gap-6">
          {!getToken ? (
            <>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-lg bg-black text-white text-center hover:bg-gray-800 transition"
              >
                Sign up
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg bg-gray-200 text-black text-center hover:bg-gray-300 transition"
              >
                Log in
              </Link>
              <Link
                to="/admin"
                className="px-4 py-2 rounded-lg border border-gray-400 text-center hover:bg-gray-100 transition"
              >
                Admin
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            >
              Log Out
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
