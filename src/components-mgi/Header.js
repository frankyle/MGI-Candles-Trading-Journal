import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../images/MGI logo.png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lessonsOpen, setLessonsOpen] = useState(false);

  const toggleAuth = () => setIsLoggedIn(!isLoggedIn);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleLessons = () => setLessonsOpen(!lessonsOpen);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="backdrop-blur-md bg-white/60 border-b border-green-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <img src={logo} alt="MGI" className="h-10 w-10 object-contain" />
            <div>
              <h1 className="text-lg font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
                MGI Candles
              </h1>
              <p className="text-xs text-gray-600">
                Trading psychology · Signals · Journals
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 items-center ml-12 relative">
            <NavLink to="/" label="Home" />
            <NavLink to="/trades" label="Trades" />

            {/* Lessons Dropdown */}
            <div className="relative">
              <button
                onClick={toggleLessons}
                className="flex items-center text-gray-800 hover:text-green-600 font-medium transition-colors focus:outline-none"
              >
                Lessons <ChevronDown size={16} className="ml-1" />
              </button>
              {lessonsOpen && (
                <div className="absolute mt-2 w-56 bg-white shadow-xl rounded-lg py-2 border border-green-100 animate-fadeIn z-50">
                  <DropdownLink
                    to="/riskmanagement"
                    label="📊 Risk Management (Personal)"
                    close={() => setLessonsOpen(false)}
                  />
                  <DropdownLink
                    to="/riskmanagementfunded"
                    label="💼 Risk Management (Funded)"
                    close={() => setLessonsOpen(false)}
                  />
                </div>
              )}
            </div>

            <NavLink to="/journal" label="Journal" />
            <NavLink to="/contactus" label="Contacts" />

            {!isLoggedIn ? (
              <>
                <Link
                  to="/free-signals"
                  className="bg-white px-4 py-2 rounded-full font-medium border border-green-400 text-green-700 hover:bg-green-50 shadow-sm transition"
                >
                  Get Free Signals
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full font-medium shadow-md hover:opacity-95 transition"
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

      {/* Mobile Nav with Animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="md:hidden backdrop-blur-lg bg-white/95 shadow-lg px-6 pb-5 space-y-3"
          >
            <NavLink to="/" label="Home" close={() => setMobileMenuOpen(false)} />
            <NavLink
              to="/trades"
              label="Trades"
              close={() => setMobileMenuOpen(false)}
            />

            {/* Mobile Lessons Dropdown */}
            <div className="space-y-1">
              <button
                onClick={toggleLessons}
                className="flex items-center justify-between w-full text-gray-800 font-medium hover:text-green-600"
              >
                Lessons <ChevronDown size={16} />
              </button>

              <AnimatePresence>
                {lessonsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pl-4 space-y-1"
                  >
                    <DropdownLink
                      to="/riskmanagement"
                      label="📊 Risk (Personal)"
                      close={() => {
                        setMobileMenuOpen(false);
                        setLessonsOpen(false);
                      }}
                    />
                    <DropdownLink
                      to="/riskmanagementfunded"
                      label="💼 Risk (Funded)"
                      close={() => {
                        setMobileMenuOpen(false);
                        setLessonsOpen(false);
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink
              to="/journal"
              label="Journal"
              close={() => setMobileMenuOpen(false)}
            />
            <NavLink
              to="/contactus"
              label="Contacts"
              close={() => setMobileMenuOpen(false)}
            />

            {!isLoggedIn ? (
              <>
                <Link
                  to="/free-signals"
                  className="w-full text-center block bg-white px-4 py-2 rounded-full font-medium border border-green-400 text-green-700 hover:bg-green-50 shadow-sm transition"
                >
                  Get Free Signals
                </Link>
                <Link
                  to="/signup"
                  className="w-full text-center block bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full font-medium shadow-md hover:opacity-95 transition"
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

/* --- Reusable Subcomponents --- */
function NavLink({ to, label, close }) {
  return (
    <Link
      to={to}
      onClick={close}
      className="block py-2 text-gray-800 hover:text-green-600 font-medium transition-colors"
    >
      {label}
    </Link>
  );
}

function DropdownLink({ to, label, close }) {
  return (
    <Link
      to={to}
      onClick={close}
      className="block px-4 py-2 text-gray-800 hover:bg-green-50 hover:text-green-700 rounded-md transition"
    >
      {label}
    </Link>
  );
}

export default Header;
