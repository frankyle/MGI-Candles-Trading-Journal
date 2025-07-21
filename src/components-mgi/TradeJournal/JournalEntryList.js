import React, { useState, useMemo } from 'react';
import JournalEntryCard from './JournalEntryCard';

const JournalEntryList = ({ journal, onEdit, onDelete, visibleIdeas, toggleIdeaVisibility }) => {
  const [sortOption, setSortOption] = useState('date-desc');

  const sortedJournal = useMemo(() => {
    const entries = [...journal];
    if (sortOption === 'pair-asc') {
      return entries.sort((a, b) => a.pair.localeCompare(b.pair));
    }
    if (sortOption === 'pair-desc') {
      return entries.sort((a, b) => b.pair.localeCompare(a.pair));
    }
    if (sortOption === 'date-asc') {
      return entries.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    if (sortOption === 'date-desc') {
      return entries.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    return entries;
  }, [journal, sortOption]);

  return (
    <div className="mt-10">
      {/* Heading and Sort Dropdown in one row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 px-2">
        <h3 className="text-xl font-bold text-gray-800 text-center sm:text-left mb-2 sm:mb-0">
          Journal Entries
        </h3>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full sm:w-auto"
        >
          <option value="date-desc">Sort by Date (Newest)</option>
          <option value="date-asc">Sort by Date (Oldest)</option>
          <option value="pair-asc">Sort by Pair (A–Z)</option>
          <option value="pair-desc">Sort by Pair (Z–A)</option>
        </select>
      </div>

      {sortedJournal.map((entry, index) => (
        <JournalEntryCard
          key={index}
          entry={entry}
          index={index}
          onEdit={onEdit}
          onDelete={onDelete}
          visibleIdeas={visibleIdeas}
          toggleIdeaVisibility={toggleIdeaVisibility}
        />
      ))}
    </div>
  );
};

export default JournalEntryList;
