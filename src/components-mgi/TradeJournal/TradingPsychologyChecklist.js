import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, RefreshCw } from "lucide-react";

const tradingChecklist = {
  morningMindset: [
    "Clarity Over Noise – Focus on one or two high-quality setups.",
    "Luck & Risk – Risk and luck are siblings. Control only what you can.",
    "Never Enough – Happiness = Results - Expectations. Be grateful.",
    "Confounding Compounding – Small consistent gains beat reckless big wins.",
    "Getting Wealthy vs. Staying Wealthy – The best trader is the best loser.",
    "Tails, You Win – Stay alive long enough to catch the big wins.",
  ],
  beforeTrade: [
    "Check AMD Cycle (Accumulation → Manipulation → Distribution).",
    "Risk Defined – Know your stop loss and be okay losing it.",
    "Bias Confirmation – Align trade with higher timeframe & liquidity.",
    "Emotion Check – No FOMO, no revenge trading.",
    "Compounding Mindset – One trade doesn’t matter, the series does.",
  ],
};

// ✅ Helper to load from localStorage safely
const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem("tradingChecklist");
    return saved ? JSON.parse(saved) : {};
  } catch (e) {
    console.error("Failed to load checklist from storage:", e);
    return {};
  }
};

const TradingPsychologyChecklist = () => {
  const [checked, setChecked] = useState(loadFromStorage);
  const [isOpen, setIsOpen] = useState(false);

  // Save to localStorage whenever checked changes
  useEffect(() => {
    localStorage.setItem("tradingChecklist", JSON.stringify(checked));
  }, [checked]);

  // Toggle checkboxes
  const toggleCheck = (section, index) => {
    const key = `${section}-${index}`;
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Reset checklist
  const resetChecklist = () => {
    setChecked({});
    localStorage.removeItem("tradingChecklist");
  };

  return (
    <div className="max-w-3xl mx-auto mt-4">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl shadow-md transition 
          ${isOpen 
            ? "bg-orange-700 hover:bg-orange-800 text-white"   // Hide state (darker orange)
            : "bg-orange-500 hover:bg-orange-600 text-white"   // Show state (lighter orange)
          }`}
      >
        {isOpen ? (
          <>
            <ChevronUp size={20} /> Hide Checklist
          </>
        ) : (
          <>
            <ChevronDown size={20} /> Show Checklist
          </>
        )}
      </button>


      {/* Checklist Content */}
      {isOpen && (
        <div className="mt-4 p-6 bg-white rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6">
            📋 Trading Psychology Checklist
          </h1>

          {/* Morning Mindset */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">🔑 Morning Mindset</h2>
            <ul className="space-y-3">
              {tradingChecklist.morningMindset.map((item, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    checked={checked[`morning-${i}`] || false}
                    onChange={() => toggleCheck("morning", i)}
                    className="mt-1"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Before Trade */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">🎯 Before Every Trade</h2>
            <ul className="space-y-3">
              {tradingChecklist.beforeTrade.map((item, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    checked={checked[`trade-${i}`] || false}
                    onChange={() => toggleCheck("trade", i)}
                    className="mt-1"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mantra */}
          <div className="p-4 bg-gray-100 rounded-lg text-center mb-4">
            <p className="italic font-medium">
              “My edge is patience, my power is discipline, my wealth is
              survival.”
            </p>
          </div>

          {/* Reset Button */}
          <button
            onClick={resetChecklist}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl shadow-md hover:bg-red-600 transition mx-auto"
          >
            <RefreshCw size={18} /> Reset Checklist
          </button>
        </div>
      )}
    </div>
  );
};

export default TradingPsychologyChecklist;
