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
  majorZones: 'How many PDL/PDH, Weekly Open, PWH/PWL, Daily Open?',
  newyork: 'PDL/PDH Newyork was not broken by Asian?',
  amd: 'Is there a clear Accumulation-Manipulation-Distribution (AMD) pattern?',
  bos: 'Is there a DIVERGENCE in 15min?',
  ictBox: 'Is there FVG / Invented FVG?',
  engulfingCandle: 'Do you see a Bullish/Bearish Engulfing Candle?',
};

// Probability calculation
const getProbabilityRiskColor = (completed, total) => {
  if (completed >= total) {
    return { probability: 'High Probability', risk: '3', color: 'text-green-600' };
  } else if (completed >= 5) {
    return { probability: 'Medium Probability', risk: '2', color: 'text-yellow-500' };
  } else if (completed >= 3) {
    return { probability: 'Low Probability', risk: '1', color: 'text-orange-500' };
  }
  return { probability: 'Very Low Probability', risk: '0.5', color: 'text-red-600' };
};

const JournalEntryCard = ({
  entry,
  index,
  onEdit,
  onDelete,
}) => {
  const checklistKey = `checklist-${index}`;
  const [visibleChecklist, setVisibleChecklist] = useState(false);
  const [showTraderIdeas, setShowTraderIdeas] = useState(false);

  const [checklist, setChecklist] = useState(() => {
    const saved = localStorage.getItem(checklistKey);
    const parsed = saved ? JSON.parse(saved) : {};
    const fullChecklist = {};
    for (const key of Object.keys(defaultChecklistItems)) {
      fullChecklist[key] = parsed[key] || false;
    }
    return fullChecklist;
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

  const toggleTraderIdeas = () => {
    setShowTraderIdeas((prev) => !prev);
  };

  const completed = Object.values(checklist).filter(Boolean).length;
  const total = Object.keys(defaultChecklistItems).length;
  const { probability, risk, color } = getProbabilityRiskColor(completed, total);

  // ✅ Archive entry handler
  const handleArchive = () => {
    const archived = JSON.parse(localStorage.getItem('archivedJournalEntries')) || [];
    const updatedArchive = [...archived, entry];
    localStorage.setItem('archivedJournalEntries', JSON.stringify(updatedArchive));
    onDelete(index);
  };

  return (
    <div className="border p-5 rounded-xl mb-6 bg-white shadow-md">
      {/* Basic Info */}
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <p><strong>Pair:</strong> {entry.pair}</p>
        <p><strong>Type:</strong> {entry.type}</p>
        <p><strong>Date:</strong> {formatDate(entry.date)}</p>
        <p><strong>Time:</strong> {entry.time}</p>
        <p><strong>Session:</strong> <span className="text-indigo-700 font-medium">{entry.session}</span></p>
        <p className="sm:col-span-2"><strong>Emotions:</strong> {entry.emotions.join(', ') || 'None'}</p>
      </div>

      {/* Trade Images Images */}
      <div className="flex overflow-x-auto space-x-4 mt-4 pb-2">
        {entry.setupImage && <ImageCard label="Setup" src={entry.setupImage} />}
        {entry.entryImage && <ImageCard label="Entry" src={entry.entryImage} />}
        {entry.profitImage && <ImageCard label="Profit" src={entry.profitImage} />}
      </div>

      {/* Trader Ideas */}
      <button
        onClick={toggleTraderIdeas}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        {showTraderIdeas ? 'Hide Traders Idea' : 'Show Traders Idea'}
      </button>

      {showTraderIdeas && (
        <div className="flex overflow-x-auto space-x-4 mt-4 pb-2">
          {entry.traderIdeaMorning && <ImageCard label="Trader Idea Morning" src={entry.traderIdeaMorning} />}
          {entry.traderIdeaNoon && <ImageCard label="Trader Idea Noon" src={entry.traderIdeaNoon} />}
          {entry.traderIdeaEvening && <ImageCard label="Trader Idea Evening" src={entry.traderIdeaEvening} />}
        </div>
      )}

      {/* Checklist */}
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
            <p className="text-sm text-gray-500 mb-2">
              Progress: {completed}/{total} completed
            </p>
            <p className={`text-sm font-bold mb-3 ${color}`}>
              {probability} → Recommended Risk: {risk}
            </p>

            {Object.entries(defaultChecklistItems).map(([key, label]) => (
              <label
                key={key}
                className="flex items-center space-x-2 mb-2 text-sm text-gray-800"
              >
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

      {/* Action Buttons */}
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
        <button
          onClick={handleArchive}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Archive
        </button>
      </div>
    </div>
  );
};

// ImageCard component
const ImageCard = ({ label, src }) => (
  <div className="min-w-[200px] max-w-xs flex-shrink-0">
    <p className="text-sm text-gray-600 mb-1 font-semibold">{label} Image</p>
    <img src={src} alt={label} className="w-full rounded-md border" />
  </div>
);

export default JournalEntryCard;
