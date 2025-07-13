
import React from 'react';
import JournalEntryCard from './JournalEntryCard';

const JournalEntryList = ({ journal, onEdit, onDelete, visibleIdeas, toggleIdeaVisibility }) => {
  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Journal Entries</h3>
      {journal.map((entry, index) => (
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
