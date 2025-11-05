import React, { useState } from 'react';
import JournalChecklist from './JournalChecklist';
import TradeLightbox from './TradeLightbox';

// Format date
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

const JournalEntryCard = ({ entry, index, onEdit, onDelete }) => {
  const checklistKey = `checklist-${index}`;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // ✅ ALL images shown in one clean gallery
  // ✅ Ordered array for Lightbox
const allImages = [
  entry.traderIdeaMorning && {
    src: entry.traderIdeaMorning,
    label: "(1) External Trader Idea",
    description: "Optional external influence / bias validation."
  },
  entry.traderIdeaEvening && {
    src: entry.traderIdeaEvening,
    label: "(2) Daily Candle Narrative",
    description: "Higher timeframe narrative context."
  },
  entry.traderIdeaNoon && {
    src: entry.traderIdeaNoon,
    label: "(3) MGI Strategy - NYC Thesis",
    description: "NY session directional expectation."
  },
  entry.setupImage && {
    src: entry.setupImage,
    label: "(4) Setup (DHDL + Killzone)",
    description: "HTF structure aligned with session killzone."
  },
  entry.entryImage && {
    src: entry.entryImage,
    label: "(5) Execution",
    description: "Displacement → refined entry trigger."
  },
  entry.profitImage && {
    src: entry.profitImage,
    label: "(6) Draw Objective Result",
    description: "Price delivery to target objective."
  }
].filter(Boolean);

  // ✅ Archive entry
  const handleArchive = () => {
    const archived = JSON.parse(localStorage.getItem('archivedJournalEntries')) || [];
    const updatedArchive = [...archived, entry];
    localStorage.setItem('archivedJournalEntries', JSON.stringify(updatedArchive));
    onDelete(index);
  };

  return (
    <div className="border p-5 rounded-xl mb-6 bg-white shadow-md">

      {/* Basic Trade Info */}
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <p><strong>Pair:</strong> {entry.pair}</p>
        <p><strong>Type:</strong> {entry.type}</p>
        <p><strong>Date:</strong> {formatDate(entry.date)}</p>
        <p><strong>Time:</strong> {entry.time}</p>
        <p><strong>Session:</strong> <span className="text-indigo-700 font-medium">{entry.session}</span></p>
      </div>

      {/* ✅ Image Gallery */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Trade Documentation</h3>
      <div className="flex overflow-x-auto space-x-4 pb-2">
        {allImages.map((img, i) => (
          <ImageCard
            key={i}
            label={img.label}
            description={img.description}
            src={img.src}
            onClick={() => {
              setLightboxIndex(i);
              setLightboxOpen(true);
            }}
          />
        ))}
      </div>

      {/* ✅ Psychology Checklist */}
      <JournalChecklist checklistKey={checklistKey} />

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap gap-3">
        <button onClick={() => onEdit(index)} className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">Edit</button>
        <button onClick={() => onDelete(index)} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Delete</button>
        <button onClick={handleArchive} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Archive</button>
      </div>

      {/* ✅ Full-Screen Lightbox */}
      <TradeLightbox
        isOpen={lightboxOpen}
        slides={allImages}
        index={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
};

// Small Image Card
const ImageCard = ({ label, description, src, onClick }) => (
  <div className="min-w-[200px] max-w-xs flex-shrink-0 cursor-pointer" onClick={onClick}>
    <p className="text-sm font-semibold text-gray-800 mb-1">{label}</p>
    <img src={src} alt={label} className="w-full h-40 object-cover rounded-md border" />
    {description && <p className="text-xs text-gray-600 mt-1">{description}</p>}
  </div>
);

export default JournalEntryCard;
