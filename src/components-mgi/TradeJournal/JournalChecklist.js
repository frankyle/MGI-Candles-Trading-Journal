import { Crosshair } from "lucide-react";
import React, { useState, useEffect } from "react";

const nySessionChecklist = [
  {
    step: "Swing Range & Discount Zone (4hr Timeframe)",
    checks: [
      "Fib retracement at 50–61.8%",
      "Fib retracement at 61.8-75%",
      "Fib retracement at 75–100%",
    ],
  },
  {
    step: "Macro Filter(1hr TimeFrame)",
    checks: [
      "BUY → Previous NY low NOT broken (1.Old & 2.New)",
      "SELL → Previous NY high NOT broken (1.Old & 2.New)",
    ],
  },
  {
    step: "Risk Definition(1hr TimeFrame)",
    checks: [
      "Kill Zone = Recent Newyork",
      "SL beyond Second Newyork",
      "If Kill Zone broken → INVALID",
    ],
  },
  {
    step: "Lower TF Confirmation (15min/5min)",
    checks: [
      "Break block inside Discount Zone (15min->Simple)/5min->Aggresive)",
      "OB Retest",
      "FVG confluence",
    ],
  },
  {
    step: (
      <span className="flex items-center gap-3">
        <Crosshair className="w-5 h-5 text-red-600" />
        <span className="flex items-center gap-2">
          <span className="font-semibold text-gray-800">
            Execution & Targets (Sniper Concept)
          </span>
          <span
            title="Entry (primary)"
            className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full"
          >
            <span className="text-sm">🎯</span>
            <span>Entry</span>
          </span>
        </span>
      </span>
    ),
    checks: [
      "Entry = Breaker Block (BOS)--->(Green=Buys & Red=Sells)",
      "SL = Below Newyork low (BUY) / Above Newyork high (SELL)",
      "TP1 = 100% Fib",
      "TP2 = Extension (new HH/LL)",
    ],
  },
];

const amdChecklist = [
  {
    step: "Accumulation",
    checks: [
      "Asian Session created liquidity",
      "(Asian + London) Session  created liquidity",
    ],
  },
  {
    step: "Manipulation",
    checks: ["Liquidity grab by LONDON", "Liquidity grab by LONDON & NEWYORK"],
  },
  { step: "Distribution", checks: ["Mitigated FVG", "FVG", "Engulfing Candle"] },
];

const probabilityBoosters = [
  "Weekly Open",
  "Daily Open",
  "Previous Daily High/Low",
  "Previous Weekly High/Low",
];

const JournalChecklist = ({ entryId }) => {
  const [checked, setChecked] = useState({});
  const [finalDecision, setFinalDecision] = useState(null);
  const [showChecklist, setShowChecklist] = useState(false);

  const coreSteps = [
    "Macro Filter",
    "Swing Range & Discount Zone",
    "Risk Definition",
    "Lower TF Confirmation",
    "Execution & Targets",
    "Accumulation",
    "Manipulation",
    "Distribution",
  ];

  // Load saved checklist from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(`checklist_entry_${entryId}`);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setChecked(parsed.checked || {});
      setFinalDecision(parsed.finalDecision || null);
    }
  }, [entryId]);

  // Save to localStorage whenever checked/finalDecision changes
  useEffect(() => {
    localStorage.setItem(
      `checklist_entry_${entryId}`,
      JSON.stringify({ checked, finalDecision })
    );
  }, [checked, finalDecision, entryId]);

  const handleCheck = (item) => {
    setChecked((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  // Count how many core steps are completed (substring match instead of exact match)
  const completedCoreSteps = coreSteps.filter((coreStep) => {
    const nySection = nySessionChecklist.find((s) =>
      typeof s.step === "string" ? s.step.includes(coreStep) : false
    );
    const amdSection = amdChecklist.find((s) =>
      typeof s.step === "string" ? s.step.includes(coreStep) : false
    );

    const allChecks = [
      ...(nySection?.checks || []),
      ...(amdSection?.checks || []),
    ];

    return allChecks.some((c) => checked[c]);
  }).length;

  const minRequired = 6;
  const isReady = completedCoreSteps >= minRequired;

  const evaluateDecision = () => {
    if (!isReady) {
      setFinalDecision("⚠️ You need at least 6 core steps before evaluating.");
      return;
    }

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
      <button
        onClick={() => setShowChecklist(!showChecklist)}
        className="mb-6 px-6 py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-blue-500 transition"
      >
        {showChecklist ? "🙈 Hide Checklist" : "📋 View Checklist"}
      </button>

      {showChecklist && (
        <>
          {/* Core progress & status */}
          <div className="mb-6 p-4 bg-gray-100 rounded-xl border border-gray-300">
            <p className="font-semibold text-lg">
              Core Steps Completed: {completedCoreSteps} / {coreSteps.length}
            </p>
            <p
              className={`mt-2 text-xl font-bold ${
                isReady ? "text-green-600" : "text-red-600"
              }`}
            >
              {isReady
                ? "✅ READY to Enter Trade"
                : "❌ NOT READY (Need at least 6)"}
            </p>

            {finalDecision && (
              <div
                className={`mb-6 p-4 rounded-xl border text-xl font-bold flex items-center gap-3 ${
                  finalDecision.includes("BUY")
                    ? "bg-green-50 border-green-300 text-blue-900"
                    : finalDecision.includes("SELL")
                    ? "bg-red-50 border-red-300 text-red-900"
                    : finalDecision.includes("No clear")
                    ? "bg-blue-50 border-blue-300 text-blue-800"
                    : "bg-yellow-50 border-yellow-300 text-yellow-800"
                }`}
              >
                {finalDecision.includes("BUY") && <span>📈</span>}
                {finalDecision.includes("SELL") && <span>📉</span>}
                {finalDecision.includes("No clear") && <span>⚖️</span>}
                {finalDecision.includes("⚠️") && <span>⚠️</span>}
                <span>{finalDecision}</span>
              </div>
            )}
          </div>

          {/* NY Checklist */}
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

          {/* AMD Checklist */}
          <h1 className="text-2xl font-bold mt-8 mb-4">
            📊 AMD Concept Checklist
          </h1>
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

          {/* Probability Boosters */}
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
            className={`mt-6 px-6 py-2 rounded-xl font-semibold transition ${
              isReady
                ? "bg-gray-900 text-white hover:bg-gray-800"
                : "bg-gray-400 text-white"
            }`}
          >
            ✅ Evaluate Setup
          </button>
        </>
      )}
    </div>
  );
};

export default JournalChecklist;
