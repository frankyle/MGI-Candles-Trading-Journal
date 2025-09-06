import React, { useState, useEffect } from "react";

const EmotionalChecklist = () => {
  const [entries, setEntries] = useState([]);
  const [showChecklist, setShowChecklist] = useState(false);

  const checklist = {
    before: {
      good: [
        "I followed my trading plan",
        "I defined entry, stop loss, and take profit before entry",
        "I’m calm and patient waiting for setup",
        "I accepted possible loss before placing trade",
      ],
      bad: [
        "I’m entering because of FOMO",
        "I’m increasing my lot size without reason",
        "I’m revenge trading after a loss",
        "I don’t have a clear setup",
      ],
    },
    during: {
      good: [
        "I’m sticking to my stop loss and take profit",
        "I’m not staring at charts anxiously",
        "I’m calm whether trade is in profit or loss",
        "I’m following my plan without emotions",
      ],
      bad: [
        "I’m moving stop loss further away",
        "I’m closing trade early due to fear/greed",
        "I’m adding positions impulsively",
        "I feel panic or over-excitement",
      ],
    },
    after: {
      good: [
        "I accepted the outcome without emotions",
        "I reviewed if I followed my rules",
        "I’m learning from the result (win or loss)",
        "I’m not rushing to open another trade immediately",
      ],
      bad: [
        "I’m blaming the market or broker",
        "I’m revenge trading right after",
        "I’m over-celebrating a win or over-mourning a loss",
        "I ignore reviewing my execution",
      ],
    },
  };

  const [selected, setSelected] = useState({
    before: [],
    during: [],
    after: [],
    outcome: "",
  });

  // Load from localStorage on mount
  useEffect(() => {
    const savedEntries = localStorage.getItem("emotionalJournal");
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save entries to localStorage whenever it changes
  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem("emotionalJournal", JSON.stringify(entries));
    }
  }, [entries]);

  const handleCheckbox = (stage, value) => {
    const current = selected[stage];
    const newSelection = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    setSelected({ ...selected, [stage]: newSelection });
  };

  // Calculate EI score
  const calculateScore = (entry) => {
    let goodCount = 0;
    let badCount = 0;

    ["before", "during", "after"].forEach((stage) => {
      entry[stage].forEach((item) => {
        if (checklist[stage].good.includes(item)) {
          goodCount++;
        } else if (checklist[stage].bad.includes(item)) {
          badCount++;
        }
      });
    });

    const total = goodCount + badCount;
    if (total === 0) return 0;

    return Math.round((goodCount / total) * 100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const score = calculateScore(selected);

    const newEntry = { ...selected, score };
    const updatedEntries = [...entries, newEntry];

    setEntries(updatedEntries);

    // Save immediately after submit
    localStorage.setItem("emotionalJournal", JSON.stringify(updatedEntries));

    // Reset form
    setSelected({ before: [], during: [], after: [], outcome: "" });
    setShowChecklist(false);
  };

  const scoreColor = (score) => {
    if (score >= 70) return "text-green-600 font-bold";
    if (score >= 40) return "text-yellow-600 font-bold";
    return "text-red-600 font-bold";
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        🧠 Emotional Intelligence Journal
      </h2>

      {/* Toggle Button */}
      <button
        onClick={() => setShowChecklist(!showChecklist)}
        className="mb-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
      >
        {showChecklist ? "Hide Checklist" : "Open Emotional Intelligence"}
      </button>

      {/* Checklist Form */}
      {showChecklist && (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 bg-white p-6 rounded-2xl shadow-lg mb-6"
        >
          {Object.keys(checklist).map((stage) => (
            <div key={stage} className="border-b pb-4">
              <h3 className="text-xl font-semibold capitalize mb-2">
                {stage} Trade
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Good EI */}
                <div>
                  <h4 className="font-semibold text-green-600 mb-1">
                    ✅ Good Emotional Intelligence
                  </h4>
                  {checklist[stage].good.map((item, i) => (
                    <label key={i} className="flex items-center space-x-2 mb-1">
                      <input
                        type="checkbox"
                        checked={selected[stage].includes(item)}
                        onChange={() => handleCheckbox(stage, item)}
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>

                {/* Bad EI */}
                <div>
                  <h4 className="font-semibold text-red-600 mb-1">
                    ❌ Bad Emotional Intelligence
                  </h4>
                  {checklist[stage].bad.map((item, i) => (
                    <label key={i} className="flex items-center space-x-2 mb-1">
                      <input
                        type="checkbox"
                        checked={selected[stage].includes(item)}
                        onChange={() => handleCheckbox(stage, item)}
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Outcome */}
          <select
            value={selected.outcome}
            onChange={(e) =>
              setSelected({ ...selected, outcome: e.target.value })
            }
            className="p-2 border rounded-lg"
          >
            <option value="">Select Outcome</option>
            <option value="Win">✅ Win</option>
            <option value="Loss">❌ Loss</option>
            <option value="Break-even">➖ Break-even</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            Save Entry
          </button>
        </form>
      )}

      {/* Journal Table */}
      <h3 className="text-xl font-semibold mt-6 mb-2">📊 Trade Journal</h3>
      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Before</th>
            <th className="border p-2">During</th>
            <th className="border p-2">After</th>
            <th className="border p-2">Outcome</th>
            <th className="border p-2">EI Score</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => (
            <tr key={i}>
              <td className="border p-2">{entry.before.join(", ")}</td>
              <td className="border p-2">{entry.during.join(", ")}</td>
              <td className="border p-2">{entry.after.join(", ")}</td>
              <td className="border p-2">{entry.outcome}</td>
              <td className={`border p-2 ${scoreColor(entry.score)}`}>
                {entry.score}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmotionalChecklist;
