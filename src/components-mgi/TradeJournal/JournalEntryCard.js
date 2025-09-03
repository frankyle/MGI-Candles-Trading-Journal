import React, { useEffect, useState } from 'react';
import JournalChecklist from './JournalChecklist';

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

const JournalEntryCard = ({ entry, index, onEdit, onDelete }) => {
  const checklistKey = `checklist-${index}`;
  const [showTraderIdeas, setShowTraderIdeas] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  // Handle window resize to check desktop/mobile
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ✅ Archive entry handler
  const handleArchive = () => {
    const archived = JSON.parse(localStorage.getItem('archivedJournalEntries')) || [];
    const updatedArchive = [...archived, entry];
    localStorage.setItem('archivedJournalEntries', JSON.stringify(updatedArchive));
    onDelete(index);
  };

  const openModal = (src, label) => {
    if (isDesktop) {
      setModalImage({ src, label });
    }
  };

  const closeModal = () => setModalImage(null);

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

      {/* Trade Images */}
      <div className="flex overflow-x-auto space-x-4 mt-4 pb-2">
        {entry.setupImage && <ImageCard label="Setup" src={entry.setupImage} onClick={() => openModal(entry.setupImage, "Setup")} />}
        {entry.entryImage && <ImageCard label="Entry" src={entry.entryImage} onClick={() => openModal(entry.entryImage, "Entry")} />}
        {entry.profitImage && <ImageCard label="Profit" src={entry.profitImage} onClick={() => openModal(entry.profitImage, "Profit")} />}
      </div>

      {/* Trader Ideas */}
      <button
        onClick={() => setShowTraderIdeas((prev) => !prev)}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        {showTraderIdeas ? 'Hide Traders Idea' : 'Show Traders Idea'}
      </button>

      {showTraderIdeas && (
        <div className="flex overflow-x-auto space-x-4 mt-4 pb-2">
          {entry.traderIdeaMorning && <ImageCard label="Trader Idea Morning" src={entry.traderIdeaMorning} onClick={() => openModal(entry.traderIdeaMorning, "Trader Idea Morning")} />}
          {entry.traderIdeaNoon && <ImageCard label="Trader Idea Noon" src={entry.traderIdeaNoon} onClick={() => openModal(entry.traderIdeaNoon, "Trader Idea Noon")} />}
          {entry.traderIdeaEvening && <ImageCard label="Trader Idea Evening" src={entry.traderIdeaEvening} onClick={() => openModal(entry.traderIdeaEvening, "Trader Idea Evening")} />}
        </div>
      )}

      {/* Checklist (separated component) */}
      <JournalChecklist checklistKey={checklistKey} />

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

      {/* Show modal only on desktop */}
      {isDesktop && modalImage && (
        <Modal src={modalImage.src} label={modalImage.label} onClose={closeModal} />
      )}
    </div>
  );
};

// Modal Component
const Modal = ({ src, label, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
    <div className="bg-white p-4 rounded-lg max-w-4xl w-full relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600"
      >
        ✕
      </button>
      <p className="text-center mb-2 font-semibold">{label} Image</p>
      <img src={src} alt={label} className="w-full max-h-[80vh] object-contain rounded-md" />
    </div>
  </div>
);

// ImageCard Component
const ImageCard = ({ label, src, onClick }) => (
  <div className="min-w-[200px] max-w-xs flex-shrink-0 cursor-pointer" onClick={onClick}>
    <p className="text-sm text-gray-600 mb-1 font-semibold">{label} Image</p>
    <img src={src} alt={label} className="w-full rounded-md border" />
  </div>
);

export default JournalEntryCard;
