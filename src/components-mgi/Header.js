import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../images/MGI logo.png'; // Ensure this path is correct

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock login state

  const toggleAuth = () => setIsLoggedIn(!isLoggedIn);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo & Title */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
          <span className="text-xl font-bold text-indigo-700">MGI Candles</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium transition">Trades</Link>
          <Link to="/riskmanagement" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 font-medium hover:text-indigo-600">Risk Management (Personal)</Link>
          <Link to="/riskmanagementfunded" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 font-medium hover:text-indigo-600">Risk Management (Funded)</Link>
          <Link to="/graphs" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 font-medium hover:text-indigo-600"> Progress Graphs</Link>
          <Link to="/archive" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 font-medium hover:text-indigo-600"> Archive Trades</Link>
     
          {!isLoggedIn ? (
            <>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-full font-medium hover:bg-indigo-700 transition">
                Sign In
              </button>
              <button className="bg-white border border-indigo-600 text-indigo-600 px-4 py-2 rounded-full font-medium hover:bg-indigo-50 transition">
                Register
              </button>
            </>
          ) : (
            <button
              onClick={toggleAuth}
              className="bg-red-600 text-white px-4 py-2 rounded-full font-medium hover:bg-red-700 transition"
            >
              Sign Out
            </button>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-3 shadow-md">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 font-medium hover:text-indigo-600">Trades</Link>
          <Link to="/riskmanagement" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 font-medium hover:text-indigo-600">Risk Management (Personal)</Link>
          <Link to="/riskmanagementfunded" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 font-medium hover:text-indigo-600">Risk Management (Funded)</Link>
          <Link to="/graphs" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 font-medium hover:text-indigo-600"> Progress Graphs</Link>
          <Link to="/archive" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 font-medium hover:text-indigo-600"> Archive Trades</Link>
     
          {!isLoggedIn ? (
            <>
              <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-full font-medium hover:bg-indigo-700">
                Sign In
              </button>
              <button className="w-full bg-white border border-indigo-600 text-indigo-600 px-4 py-2 rounded-full font-medium hover:bg-indigo-50">
                Register
              </button>
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
