import React, { useEffect, useState } from 'react';

// Format date for display
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Reusable image card
const ImageCard = ({ label, src }) => (
  <div className="min-w-[200px] max-w-xs flex-shrink-0">
    <p className="text-sm text-gray-600 mb-1 font-semibold">{label} Image</p>
    <img src={src} alt={label} className="w-full rounded-md border" />
  </div>
);

const ArchivedTradesView = () => {
  const [archivedEntries, setArchivedEntries] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('archivedJournalEntries');
    if (saved) {
      setArchivedEntries(JSON.parse(saved));
    }
  }, []);

  const handleUnarchive = (index) => {
    const updated = [...archivedEntries];
    const entryToRestore = updated.splice(index, 1)[0];

    // Save back to main journal (optional)
    const current = JSON.parse(localStorage.getItem('journalEntries')) || [];
    localStorage.setItem('journalEntries', JSON.stringify([...current, entryToRestore]));

    // Save updated archive
    localStorage.setItem('archivedJournalEntries', JSON.stringify(updated));
    setArchivedEntries(updated);
  };

  const handleDelete = (index) => {
    const updated = [...archivedEntries];
    updated.splice(index, 1);
    localStorage.setItem('archivedJournalEntries', JSON.stringify(updated));
    setArchivedEntries(updated);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 mt-6">
      <h2 className="text-2xl font-bold mb-6 text-center">📁 Archived Journal Entries</h2>

      {archivedEntries.length === 0 ? (
        <p className="text-gray-500 text-center">No archived entries found.</p>
      ) : (
        archivedEntries.map((entry, index) => (
          <div key={index} className="border p-5 rounded-xl mb-6 bg-white shadow-md">
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <p><strong>Pair:</strong> {entry.pair}</p>
              <p><strong>Type:</strong> {entry.type}</p>
              <p><strong>Date:</strong> {formatDate(entry.date)}</p>
              <p><strong>Time:</strong> {entry.time}</p>
              <p><strong>Session:</strong> <span className="text-indigo-700 font-medium">{entry.session}</span></p>
              </div>

            {/* Images */}
            <div className="flex overflow-x-auto space-x-4 mt-4 pb-2">
              {entry.setupImage && <ImageCard label="Setup" src={entry.setupImage} />}
              {entry.entryImage && <ImageCard label="Entry" src={entry.entryImage} />}
              {entry.profitImage && <ImageCard label="Profit" src={entry.profitImage} />}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => handleUnarchive(index)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Unarchive
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ArchivedTradesView;
