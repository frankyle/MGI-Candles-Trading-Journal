// src/components/SignUp.js (au popote lilipo)

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // Ongeza useNavigate
import { supabase } from "../../supabaseClient"; // Agiza supabase hapa

export default function SignUp() {
  const [name, setName] = useState(""); // Hili tutalitumia baadaye
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Andaa navigate kwa uelekezaji

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          // Unaweza kuongeza data ya ziada hapa
          data: {
            full_name: name,
          },
        },
      });

      if (error) throw error;

      // Ikiwa usajili umefanikiwa
      alert("Registration successful! Please check your email to verify your account.");
      navigate("/signin"); // Mpeleke mtumiaji kwenye ukurasa wa kuingia

    } catch (error) {
      alert(error.message);
      console.error("Error signing up:", error);
    }
  };

  // Nambari zako zingine zote za JSX zinabaki kama zilivyo...
  // ...
  // Hapa nitaweka sehemu ya form tu kwa ufupi
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-100 via-white to-green-100">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-3xl font-bold text-center text-emerald-700 mb-6">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Input ya Jina */}
            <div className="relative">
                <User className="absolute left-3 top-3 text-emerald-500" size={20} />
                <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none" required />
            </div>
            {/* Input ya Email */}
            <div className="relative">
                <Mail className="absolute left-3 top-3 text-emerald-500" size={20} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none" required />
            </div>
            {/* Input ya Password */}
            <div className="relative">
                <Lock className="absolute left-3 top-3 text-emerald-500" size={20} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none" required />
            </div>

            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white py-2 rounded-lg font-medium shadow-md">
                Sign Up
            </motion.button>
        </form>
        <p className="text-center mt-5 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/signin" className="text-emerald-600 font-semibold">
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}