import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../images/MGI logo.png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lessonsOpen, setLessonsOpen] = useState(false);

  const toggleAuth = () => setIsLoggedIn(!isLoggedIn);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="backdrop-blur-md bg-white/40 border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <img src={logo} alt="MGI" className="h-10 w-10 object-contain" />
            <div>
              <h1 className="text-lg font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                MGI Candles
              </h1>
              <p className="text-xs text-gray-600">
                Trading psychology · Signals · Journals
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 items-center ml-12 relative">
            <Link
              to="/"
              className="text-gray-800 hover:text-indigo-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/trades"
              className="text-gray-800 hover:text-indigo-600 font-medium transition-colors"
            >
              Trades
            </Link>
            <Link
              to="/membership"
              className="text-gray-800 hover:text-indigo-600 font-medium transition-colors"
            >
              Membership
            </Link>

            {/* Lessons Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setLessonsOpen(true)}
              onMouseLeave={() => setLessonsOpen(false)}
            >
              <button className="flex items-center text-gray-800 hover:text-indigo-600 font-medium transition-colors">
                Lessons <ChevronDown size={16} className="ml-1" />
              </button>
              {lessonsOpen && (
                <div className="absolute mt-2 w-48 bg-white/90 backdrop-blur-md shadow-lg rounded-lg py-2 z-50">
                  <Link
                    to="/riskmanagement"
                    className="block px-4 py-2 text-gray-800 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    Risk (Personal)
                  </Link>
                  <Link
                    to="/riskmanagementfunded"
                    className="block px-4 py-2 text-gray-800 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    Risk (Funded)
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/journal"
              className="text-gray-800 hover:text-indigo-600 font-medium transition-colors"
            >
              Journal
            </Link>
            <Link
              to="/contactus"
              className="text-gray-800 hover:text-indigo-600 font-medium transition-colors"
            >
              Contacts
            </Link>

            {!isLoggedIn ? (
              <>
                <Link
                  to="/free-signals"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full font-medium hover:opacity-95 transition"
                >
                  Get Free Signals
                </Link>
                <Link
                  to="/signup"
                  className="bg-white/80 border border-indigo-500 text-indigo-600 px-4 py-2 rounded-full font-medium hover:bg-indigo-50 transition"
                >
                  Join Premium
                </Link>
              </>
            ) : (
              <button
                onClick={toggleAuth}
                className="bg-red-600 text-white px-5 py-2 rounded-full font-medium hover:bg-red-700 transition"
              >
                Sign Out
              </button>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-800 ml-4"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden backdrop-blur-lg bg-white/80 shadow-lg px-6 pb-5 space-y-3 animate-fadeIn">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-800 font-medium hover:text-indigo-600"
          >
            Home
          </Link>
          <Link
            to="/trades"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-800 font-medium hover:text-indigo-600"
          >
            Trades
          </Link>
          <Link
            to="/membership"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-800 font-medium hover:text-indigo-600"
          >
            Membership
          </Link>

          {/* Lessons dropdown for mobile */}
          <div className="space-y-1">
            <span className="block font-medium text-gray-800">Lessons</span>
            <Link
              to="/riskmanagement"
              onClick={() => setMobileMenuOpen(false)}
              className="block pl-4 text-gray-700 hover:text-indigo-600"
            >
              Risk (Personal)
            </Link>
            <Link
              to="/riskmanagementfunded"
              onClick={() => setMobileMenuOpen(false)}
              className="block pl-4 text-gray-700 hover:text-indigo-600"
            >
              Risk (Funded)
            </Link>
          </div>

          <Link
            to="/journal"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-800 font-medium hover:text-indigo-600"
          >
            Journal
          </Link>
          <Link
            to="/contactus"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-800 font-medium hover:text-indigo-600"
          >
            Contacts
          </Link>

          {!isLoggedIn ? (
            <>
              <Link
                to="/free-signals"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full font-medium hover:opacity-95 transition"
              >
                Get Free Signals
              </Link>
              <Link
                to="/signup"
                className="bg-white/80 border border-indigo-500 text-indigo-600 px-4 py-2 rounded-full font-medium hover:bg-indigo-50 transition"
              >
                Join Premium
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                toggleAuth();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-red-600 text-white px-4 py-2 rounded-full font-medium hover:bg-red-700"
            >
              Sign Out
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
