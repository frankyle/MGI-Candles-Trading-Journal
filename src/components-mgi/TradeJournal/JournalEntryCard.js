import React, { useEffect, useState } from 'react';

// Format date for readability
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

// Checklist items
const defaultChecklistItems = {
  fourHourTrend: 'Is the 4H trend in your direction?',
  fibZone: 'Are you in the Fib Discount Zone?',
  ictBox: 'Is the FVG Forming/Broken?',
  bos: 'Is there a Break of Structure in 15min(BoS)?',
  orderBlock: 'Do you see a 30min/1hr Order Block?',
  dailyMovement: 'Does it align with the Daily Movement direction?',
  amd: 'Is there a clear Accumulation-Manipulation-Distribution (AMD) pattern?',
  engulfingCandle: 'Do you see a Bullish/Bearish Engulfing Candle?',
  utAlert: 'Is there a UT Alert signal in No Wicks chart?',
};

// Main component
const JournalEntryCard = ({
  entry,
  index,
  onEdit,
  onDelete,
  visibleIdeas,
  toggleIdeaVisibility,
}) => {
  const checklistKey = `checklist-${index}`;
  const [visibleChecklist, setVisibleChecklist] = useState(false);
  const [checklist, setChecklist] = useState(() => {
    const saved = localStorage.getItem(checklistKey);
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem(checklistKey, JSON.stringify(checklist));
  }, [checklist, checklistKey]);

  const toggleChecklistItem = (itemKey) => {
    setChecklist((prev) => ({
      ...prev,
      [itemKey]: !prev[itemKey],
    }));
  };

  const toggleChecklistVisibility = () => {
    setVisibleChecklist((prev) => !prev);
  };

  const completed = Object.values(checklist).filter(Boolean).length;
  const total = Object.keys(defaultChecklistItems).length;

  return (
    <div className="border p-5 rounded-xl mb-6 bg-white shadow-md">
      {/* Basic info */}
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <p><strong>Pair:</strong> {entry.pair}</p>
        <p><strong>Type:</strong> {entry.type}</p>
        <p><strong>Date:</strong> {formatDate(entry.date)}</p>
        <p><strong>Time:</strong> {entry.time}</p>
        <p><strong>Session:</strong> <span className="text-indigo-700 font-medium">{entry.session}</span></p>
        <p className="sm:col-span-2"><strong>Emotions:</strong> {entry.emotions.join(', ') || 'None'}</p>
      </div>

      {/* Scrollable image row */}
      <div className="flex overflow-x-auto space-x-4 mt-4 pb-2">
        {entry.setupImage && <ImageCard label="Setup" src={entry.setupImage} />}
        {entry.entryImage && <ImageCard label="Entry" src={entry.entryImage} />}
        {entry.profitImage && <ImageCard label="Profit" src={entry.profitImage} />}
      </div>

      {/* Trader's Idea */}
      {entry.tradersIdeaImage && (
        <div className="mt-4">
          <button
            onClick={() => toggleIdeaVisibility(index)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mb-2"
          >
            {visibleIdeas[index] ? 'Hide Trader\'s Idea' : 'Show Trader\'s Idea'}
          </button>
          {visibleIdeas[index] && (
            <div>
              <p className="text-sm text-gray-600 mb-1 font-semibold">Trader's Idea</p>
              <img src={entry.tradersIdeaImage} alt="Trader's Idea" className="w-full rounded-md border" />
            </div>
          )}
        </div>
      )}

      {/* Checklist Toggle */}
      <div className="mt-4">
        <button
          onClick={toggleChecklistVisibility}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 mb-2"
        >
          {visibleChecklist ? 'Hide Checklist' : 'Show Checklist'}
        </button>

        {visibleChecklist && (
          <div className="bg-gray-50 border rounded-md p-4 mt-2">
            <p className="font-semibold text-gray-700 mb-1">Trade Checklist</p>
            <p className="text-sm text-gray-500 mb-3">Progress: {completed}/{total} completed</p>
            {Object.entries(defaultChecklistItems).map(([key, label]) => (
              <label key={key} className="flex items-center space-x-2 mb-2 text-sm text-gray-800">
                <input
                  type="checkbox"
                  checked={!!checklist[key]}
                  onChange={() => toggleChecklistItem(key)}
                  className="accent-green-600"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={() => onEdit(index)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(index)}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

// ✅ Reusable image card
const ImageCard = ({ label, src }) => (
  <div className="min-w-[200px] max-w-xs flex-shrink-0">
    <p className="text-sm text-gray-600 mb-1 font-semibold">{label} Image</p>
    <img src={src} alt={label} className="w-full rounded-md border" />
  </div>
);

export default JournalEntryCard;
