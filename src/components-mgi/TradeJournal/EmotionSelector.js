import React, { useState, useEffect } from "react";

const EmotionaSelector = () => {
  const defaultChecklist = {
    universalMindset: [
      "Detach emotions from market outcomes – focus on process, not results.",
      "Accept uncertainty – no one trade defines success or failure.",
      "Build discipline through consistent routines and risk management.",
      "Trade with confidence in your edge – probabilities matter, not predictions.",
      "Stay present: each trade is independent of the last.",
    ],
    tradingInTheZone: [
      "The market is random – stop seeking certainty.",
      "Let go of the need to be right – focus on execution.",
      "Confidence comes from trust in probabilities.",
      "Detach self-worth from trading outcomes.",
    ],
    disciplinedTrader: [
      "Master self-control – your emotions are your biggest obstacle.",
      "Take full responsibility for your results.",
      "Develop consistency through structure and rules.",
      "The real battle is within, not with the market.",
    ],
    marketMindGames: [
      "Emotions are not the enemy – they contain valuable market feedback.",
      "Use self-awareness to identify emotional patterns.",
      "Confidence comes from integrating logic + emotion.",
      "Learn to tolerate discomfort instead of avoiding it.",
    ],
  };

  const [checkedItems, setCheckedItems] = useState({});
  const [emotionsNote, setEmotionsNote] = useState("");

  // Load saved state from localStorage
  useEffect(() => {
    const savedChecklist = JSON.parse(localStorage.getItem("tradingChecklist"));
    const savedNote = localStorage.getItem("emotionsNote");
    if (savedChecklist) setCheckedItems(savedChecklist);
    if (savedNote) setEmotionsNote(savedNote);
  }, []);

  // Save to localStorage whenever changes happen
  useEffect(() => {
    localStorage.setItem("tradingChecklist", JSON.stringify(checkedItems));
    localStorage.setItem("emotionsNote", emotionsNote);
  }, [checkedItems, emotionsNote]);

  const handleCheck = (section, item) => {
    setCheckedItems((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [item]: !prev[section]?.[item],
      },
    }));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
       {/* First Reminder */}
      <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-md">
        <p className="text-gray-700 font-medium">
          ✅ Before trading each day, review this checklist to align your mindset
          with <span className="font-semibold">discipline, confidence,</span> and{" "}
          <span className="font-semibold">self-awareness.</span>
        </p>
      </div>
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        📌 Daily Trading Psychology Checklist
      </h1>

      {/* Render checklist sections */}
      {Object.entries(defaultChecklist).map(([section, items], idx) => (
        <div key={idx} className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            {idx + 1}.{" "}
            {section === "universalMindset"
              ? "Universal Mindset Principles"
              : section === "tradingInTheZone"
              ? "Trading in the Zone (Mark Douglas)"
              : section === "disciplinedTrader"
              ? "The Disciplined Trader (Mark Douglas)"
              : "Market Mind Games (Denise Shull)"}
          </h2>
          <ul className="space-y-2">
            {items.map((item, i) => (
              <li key={i} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={checkedItems[section]?.[item] || false}
                  onChange={() => handleCheck(section, item)}
                  className="w-5 h-5 text-blue-500 rounded"
                />
                <span
                  className={`text-gray-700 ${
                    checkedItems[section]?.[item] ? "line-through text-gray-400" : ""
                  }`}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Emotions tracker */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          🧠 Emotions Tracker
        </h2>
        <textarea
          value={emotionsNote}
          onChange={(e) => setEmotionsNote(e.target.value)}
          placeholder="Write down how you feel before/during/after trading..."
          className="w-full p-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400"
          rows="4"
        />
      </div>

     
    </div>
  );
};

export default EmotionaSelector;
