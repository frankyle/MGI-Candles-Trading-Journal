import React, { useEffect, useState } from "react";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const Archive = () => {
  const [archivedEntries, setArchivedEntries] = useState([]);

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("archivedJournalEntries")) || [];

    // 🔑 Enrich each entry with checklist & emotional data from localStorage
    const enriched = data.map((entry) => {
      const checklist =
        JSON.parse(localStorage.getItem(`checklist_entry_${entry.id}`)) || null;

      const emotional =
        JSON.parse(localStorage.getItem(`emotional-${entry.id}`)) || [];

      return {
        ...entry,
        checklist,
        emotional,
      };
    });

    setArchivedEntries(enriched);
  }, []);

  // ✅ Delete one entry
  const handleDelete = (index) => {
    const updated = archivedEntries.filter((_, i) => i !== index);
    setArchivedEntries(updated);
    localStorage.setItem("archivedJournalEntries", JSON.stringify(updated));
  };

  // ✅ Clear all entries
  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear ALL archived entries?")) {
      setArchivedEntries([]);
      localStorage.removeItem("archivedJournalEntries");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📦 Archived Journal Entries</h1>

        {archivedEntries.length > 0 && (
          <button
            onClick={handleClearAll}
            className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800"
          >
            Clear All Archives
          </button>
        )}
      </div>

      {archivedEntries.length === 0 ? (
        <p>No archived entries yet.</p>
      ) : (
        archivedEntries.map((entry, i) => (
          <div
            key={i}
            className="mb-8 p-6 border rounded-xl shadow-sm bg-white"
          >
            {/* Details */}
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <p>
                <strong>Pair:</strong> {entry.pair}
              </p>
              <p>
                <strong>Type:</strong> {entry.type}
              </p>
              <p>
                <strong>Date:</strong> {formatDate(entry.date)}
              </p>
              <p>
                <strong>Time:</strong> {entry.time}
              </p>
              <p>
                <strong>Session:</strong> {entry.session}
              </p>
            </div>

            {/* Images */}
            <div className="flex overflow-x-auto space-x-4 mt-4 pb-2">
              {entry.setupImage && (
                <img
                  src={entry.setupImage}
                  alt="Setup"
                  className="w-40 rounded-md"
                />
              )}
              {entry.entryImage && (
                <img
                  src={entry.entryImage}
                  alt="Entry"
                  className="w-40 rounded-md"
                />
              )}
              {entry.profitImage && (
                <img
                  src={entry.profitImage}
                  alt="Profit"
                  className="w-40 rounded-md"
                />
              )}
            </div>

            {/* Journal Checklist Summary */}
            {entry.checklist && (
              <div className="mt-6">
                <h2 className="font-bold text-lg mb-2">📋 Journal Checklist</h2>
                <p>
                  <strong>Final Decision:</strong>{" "}
                  {entry.checklist.finalDecision || "N/A"}
                </p>
                <p>
                  <strong>Checked Items:</strong>
                </p>
                <ul className="list-disc ml-6 text-sm">
                  {Object.keys(entry.checklist.checked || {})
                    .filter((k) => entry.checklist.checked[k])
                    .map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                </ul>
              </div>
            )}

            {/* Emotional Checklist Summary */}
            {entry.emotional && entry.emotional.length > 0 && (
              <div className="mt-6">
                <h2 className="font-bold text-lg mb-2">
                  🧠 Emotional Intelligence
                </h2>
                {entry.emotional.map((emo, idx) => (
                  <div
                    key={idx}
                    className="mb-4 p-3 border rounded-lg bg-gray-50"
                  >
                    <p>
                      <strong>Before:</strong> {emo.before.join(", ")}
                    </p>
                    <p>
                      <strong>During:</strong> {emo.during.join(", ")}
                    </p>
                    <p>
                      <strong>After:</strong> {emo.after.join(", ")}
                    </p>
                    <p>
                      <strong>Outcome:</strong> {emo.outcome}
                    </p>
                    <p>
                      <strong>EI Score:</strong> {emo.score}%
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* ✅ Delete Button */}
            <div className="mt-6">
              <button
                onClick={() => handleDelete(i)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete from Archive
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Archive;
