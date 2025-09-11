import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowUpDown } from "lucide-react";
import JournalEntryCard from "./JournalEntryCard";

const JournalEntryList = ({ journal, onEdit, onDelete, onArchive }) => {
  const [sortOption, setSortOption] = useState("date-desc");
  const [visibleIdeas, setVisibleIdeas] = useState({});

  const toggleIdeaVisibility = (index) => {
    setVisibleIdeas((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const sortedJournal = useMemo(() => {
    const entries = [...journal];
    if (sortOption === "pair-asc")
      return entries.sort((a, b) => a.pair.localeCompare(b.pair));
    if (sortOption === "pair-desc")
      return entries.sort((a, b) => b.pair.localeCompare(a.pair));
    if (sortOption === "date-asc")
      return entries.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
    if (sortOption === "date-desc")
      return entries.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    return entries;
  }, [journal, sortOption]);

  return (
    <div className="mt-12 max-w-5xl mx-auto">
      {/* Header with Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-white dark:bg-gray-900 shadow-md rounded-2xl px-6 py-4 border border-gray-100 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-0">
          Journal Entries
        </h3>

        <div className="flex items-center space-x-2">
          <ArrowUpDown className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          >
            <option value="date-desc">Date (Newest)</option>
            <option value="date-asc">Date (Oldest)</option>
            <option value="pair-asc">Pair (A–Z)</option>
            <option value="pair-desc">Pair (Z–A)</option>
          </select>
        </div>
      </div>

      {/* Journal Entries */}
      {sortedJournal.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-500 dark:text-gray-400 text-center"
        >
          No journal entries yet.
        </motion.p>
      ) : (
        <div className="space-y-6">
          {sortedJournal.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <JournalEntryCard
                entry={entry}
                index={index}
                onEdit={onEdit}
                onDelete={onDelete}
                onArchive={onArchive}
                visibleIdeas={visibleIdeas}
                toggleIdeaVisibility={toggleIdeaVisibility}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JournalEntryList;
