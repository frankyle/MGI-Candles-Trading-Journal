import React, { useState, useEffect } from "react";

const nySessionChecklist = [
  {
    step: "Macro Filter",
    checks: [
      "BUY → Previous NY low NOT broken",
      "SELL → Previous NY high NOT broken",
    ],
  },
  {
    step: "Swing Range & Discount Zone",
    checks: [
      "Draw Fib (Low → High for BUY, High → Low for SELL)",
      "Wait for retracement into 50–61.8%",
    ],
  },
  {
    step: "Risk Definition",
    checks: [
      "Kill Zone = Swing Low/High",
      "SL beyond Kill Zone",
      "If Kill Zone broken → INVALID",
    ],
  },
  {
    step: "Lower TF Confirmation",
    checks: [
      "Break of Structure inside Discount Zone",
      "OB Retest",
      "FVG confluence",
    ],
  },
  {
    step: "Execution & Targets",
    checks: [
      "Entry = OB/FVG after BOS",
      "SL = Below swing low (BUY) / Above swing high (SELL)",
      "TP1 = 100% Fib",
      "TP2 = Extension (new HH/LL)",
    ],
  },
];

const amdChecklist = [
  {
    step: "Accumulation",
    checks: [
      "Market sweeping liquidity at lows",
      "Consolidation forming",
      "Signs of reversal",
    ],
  },
  {
    step: "Manipulation",
    checks: [
      "Stop hunt (above/below structure)",
      "Fake breakout",
      "Liquidity grab confirmed",
    ],
  },
  {
    step: "Distribution",
    checks: [
      "Strong displacement in intended direction",
      "Retest of OB/FVG",
      "Trend continuation",
    ],
  },
];

const probabilityBoosters = [
  "Weekly Open",
  "Daily Open",
  "Previous Weekly High/Low",
];

const JournalChecklist = ({ currency }) => {
  const [checked, setChecked] = useState({});
  const [finalDecision, setFinalDecision] = useState(null);
  const [showChecklist, setShowChecklist] = useState(false);

  // Load saved checklist from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(`checklist_${currency}`);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setChecked(parsed.checked || {});
      setFinalDecision(parsed.finalDecision || null);
    }
  }, [currency]);

  // Save to localStorage whenever checked or finalDecision changes
  useEffect(() => {
    localStorage.setItem(
      `checklist_${currency}`,
      JSON.stringify({ checked, finalDecision })
    );
  }, [checked, finalDecision, currency]);

  const handleCheck = (item) => {
    setChecked((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const evaluateDecision = () => {
    const buySignals = Object.keys(checked).filter(
      (c) => checked[c] && c.includes("BUY")
    ).length;
    const sellSignals = Object.keys(checked).filter(
      (c) => checked[c] && c.includes("SELL")
    ).length;

    if (buySignals > sellSignals) {
      setFinalDecision("✅ Likely BUY Setup");
    } else if (sellSignals > buySignals) {
      setFinalDecision("🔻 Likely SELL Setup");
    } else {
      setFinalDecision("⚖️ No clear direction yet");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white text-gray-900 rounded-2xl shadow-lg border border-gray-200">
      {/* Toggle Checklist Button */}
      <button
        onClick={() => setShowChecklist(!showChecklist)}
        className="mb-6 px-6 py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-blue-500 transition"
      >
        {showChecklist ? "🙈 Hide Checklist" : `📋 View Checklist for ${currency}`}
      </button>

      {showChecklist && (
        <>
          <h1 className="text-2xl font-bold mb-4">📋 NY Session Checklist</h1>
          {nySessionChecklist.map((section, idx) => (
            <div key={idx} className="mb-4">
              <h2 className="font-semibold text-lg mb-2">{section.step}</h2>
              {section.checks.map((check, i) => (
                <label key={i} className="flex items-center gap-2 mb-1">
                  <input
                    type="checkbox"
                    className="accent-gray-800"
                    checked={checked[check] || false}
                    onChange={() => handleCheck(check)}
                  />
                  {check}
                </label>
              ))}
            </div>
          ))}

          <h1 className="text-2xl font-bold mt-8 mb-4">📊 AMD Concept Checklist</h1>
          {amdChecklist.map((section, idx) => (
            <div key={idx} className="mb-4">
              <h2 className="font-semibold text-lg mb-2">{section.step}</h2>
              {section.checks.map((check, i) => (
                <label key={i} className="flex items-center gap-2 mb-1">
                  <input
                    type="checkbox"
                    className="accent-gray-800"
                    checked={checked[check] || false}
                    onChange={() => handleCheck(check)}
                  />
                  {check}
                </label>
              ))}
            </div>
          ))}

          <h1 className="text-2xl font-bold mt-8 mb-4">🎯 Probability Boosters</h1>
          {probabilityBoosters.map((boost, i) => (
            <label key={i} className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                className="accent-gray-800"
                checked={checked[boost] || false}
                onChange={() => handleCheck(boost)}
              />
              {boost}
            </label>
          ))}

          <button
            onClick={evaluateDecision}
            className="mt-6 px-6 py-2 bg-gray-900 text-white hover:bg-gray-800 rounded-xl font-semibold transition"
          >
            ✅ Evaluate Setup
          </button>

          {finalDecision && (
            <div className="mt-6 p-4 bg-gray-100 rounded-xl text-lg font-bold border border-gray-300">
              {finalDecision}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default JournalChecklist;
