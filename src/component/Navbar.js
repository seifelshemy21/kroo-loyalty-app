import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FiUser, FiLogOut, FiLayout, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <span className="text-3xl font-black tracking-tighter text-black">KROO</span>
              <span className="hidden md:block text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 bg-gray-50 px-2 py-1 rounded-md">Creative Collective</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={({ isActive }) => `text-sm font-bold uppercase tracking-widest ${isActive ? 'text-black' : 'text-gray-400 hover:text-black transition-colors'}`}>Home</NavLink>

            {isAuthenticated ? (
              <div className="relative ml-4" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-2xl border border-gray-100 transition-all group"
                >
                  <div className="w-8 h-8 bg-primary text-black rounded-full flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                    {user?.name?.charAt(0)}
                  </div>
                  <span className="text-sm font-bold text-gray-700">Hello, {user?.name?.split(' ')[0]}</span>
                  <FiChevronDown className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-[2rem] shadow-[0_15px_30px_-5px_rgba(0,0,0,0.1)] border border-gray-50 p-2 transform origin-top-right transition-all">
                    {isAdmin ? (
                      <>
                        <Link
                          to="/admin/dashboard"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 rounded-2xl transition"
                        >
                          <FiLayout className="text-lg" /> Admin Dashboard
                        </Link>
                        <Link
                          to="/admin/users"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 rounded-2xl transition"
                        >
                          <FiUser className="text-lg" /> Customers
                        </Link>
                      </>
                    ) : (
                      <Link
                        to="/dashboard"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 rounded-2xl transition"
                      >
                        <FiLayout className="text-lg" /> My Dashboard
                      </Link>
                    )}
                    <div className="my-2 border-t border-gray-50"></div>
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-rose-500 hover:bg-rose-50 rounded-2xl transition"
                    >
                      <FiLogOut className="text-lg" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-sm font-extrabold text-gray-900 hover:opacity-70 transition">Sign In</Link>
                <Link to="/signup" className="bg-primary text-black px-6 py-3 rounded-3xl text-sm font-bold shadow-lg hover:opacity-90 transition transform hover:scale-[1.05] active:scale-95">Get Started</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-900 p-2 rounded-xl bg-gray-50 border border-gray-100"
            >
              {isMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-6 space-y-4 animate-in slide-in-from-top duration-300">
          <NavLink to="/" onClick={() => setIsMenuOpen(false)} className="block py-2 text-lg font-bold">Home</NavLink>
          {isAuthenticated ? (
            <>
              <div className="py-4 border-y border-gray-50 my-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center font-bold text-xl uppercase">
                    {user?.name?.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold">{user?.name}</h3>
                    <p className="text-xs text-gray-400">{user?.email}</p>
                  </div>
                </div>
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="block py-3 font-bold text-gray-500">Dashboard</Link>
                <Link to="/admin/users" onClick={() => setIsMenuOpen(false)} className="block py-3 font-bold text-gray-500">Customers</Link>
              </div>
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          logout();
                        }}
                        className="w-full bg-rose-50 text-rose-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
                      >
                        <FiLogOut /> Logout
                      </button>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center py-4 font-bold border border-gray-100 rounded-2xl">Sign In</Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center py-4 bg-black text-white font-bold rounded-2xl shadow-lg">Register</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
