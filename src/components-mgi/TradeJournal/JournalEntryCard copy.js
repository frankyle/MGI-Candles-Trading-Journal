import React, { useEffect, useState } from 'react';

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
  <div
    className="min-w-[200px] max-w-xs flex-shrink-0 cursor-pointer"
    onClick={onClick}
  >
    <p className="text-sm text-gray-600 mb-1 font-semibold">{label} Image</p>
    <img src={src} alt={label} className="w-full rounded-md border" />
  </div>
);

const JournalEntryCard = ({ entry, index, onEdit, onDelete }) => {
  const [modalImage, setModalImage] = useState(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768); // md breakpoint

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openModal = (src, label) => {
    if (isDesktop) {
      setModalImage({ src, label });
    }
  };

  const closeModal = () => setModalImage(null);

  return (
    <div className="border p-5 rounded-xl mb-6 bg-white shadow-md">
      {/* ... your existing code for details ... */}

      {/* Trade Images */}
      <div className="flex overflow-x-auto space-x-4 mt-4 pb-2">
        {entry.setupImage && (
          <ImageCard
            label="Setup"
            src={entry.setupImage}
            onClick={() => openModal(entry.setupImage, "Setup")}
          />
        )}
        {entry.entryImage && (
          <ImageCard
            label="Entry"
            src={entry.entryImage}
            onClick={() => openModal(entry.entryImage, "Entry")}
          />
        )}
        {entry.profitImage && (
          <ImageCard
            label="Profit"
            src={entry.profitImage}
            onClick={() => openModal(entry.profitImage, "Profit")}
          />
        )}
      </div>

      {/* Trader Ideas (also clickable) */}
      <div className="flex overflow-x-auto space-x-4 mt-4 pb-2">
        {entry.traderIdeaMorning && (
          <ImageCard
            label="Trader Idea Morning"
            src={entry.traderIdeaMorning}
            onClick={() => openModal(entry.traderIdeaMorning, "Trader Idea Morning")}
          />
        )}
        {entry.traderIdeaNoon && (
          <ImageCard
            label="Trader Idea Noon"
            src={entry.traderIdeaNoon}
            onClick={() => openModal(entry.traderIdeaNoon, "Trader Idea Noon")}
          />
        )}
        {entry.traderIdeaEvening && (
          <ImageCard
            label="Trader Idea Evening"
            src={entry.traderIdeaEvening}
            onClick={() => openModal(entry.traderIdeaEvening, "Trader Idea Evening")}
          />
        )}
      </div>

      {/* Show modal only on desktop */}
      {isDesktop && modalImage && (
        <Modal
          src={modalImage.src}
          label={modalImage.label}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default JournalEntryCard;

