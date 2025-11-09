import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import TradeForm from "./TradeForm";
import JournalEntryList from "./journal/JournalEntryList";

const TradePage = () => {
  const [form, setForm] = useState({
    id: null,
    pair: "",
    type: "Buy",
    date: "",
    time: "",
    session: "",
    setupImage: "",
    entryImage: "",
    profitImage: "",
    traderIdeaMorning: "",
    traderIdeaNoon: "",
    traderIdeaEvening: "",
    notes: "",
  });

  const [editIndex, setEditIndex] = useState(null);

  // ✅ Handle form text inputs
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ✅ Handle image upload input
  const handleImageChange = (e, field) => {
    const file = e.target.files ? e.target.files[0] : null;
    setForm((prev) => ({ ...prev, [field]: file }));
  };

  // ✅ Reset form after save/update
  const handleSaveComplete = () => {
    setEditIndex(null);
    setForm({
      id: null,
      pair: "",
      type: "Buy",
      date: "",
      time: "",
      session: "",
      setupImage: "",
      entryImage: "",
      profitImage: "",
      traderIdeaMorning: "",
      traderIdeaNoon: "",
      traderIdeaEvening: "",
      notes: "",
    });
  };

  // ✅ Populate form when editing an existing trade
  const handleEdit = (entry) => {
    setForm({
      id: entry.id,
      pair: entry.pair,
      type: entry.type,
      date: entry.date,
      time: entry.time,
      session: entry.session,
      setupImage: entry.setup_image,
      entryImage: entry.entry_image,
      profitImage: entry.profit_image,
      traderIdeaMorning: entry.trader_idea_morning,
      traderIdeaNoon: entry.trader_idea_noon,
      traderIdeaEvening: entry.trader_idea_evening,
      notes: entry.notes || "",
    });
    setEditIndex(entry.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-12 py-8 px-4 sm:px-8 max-w-6xl mx-auto">
      <TradeForm
        form={form}
        onChange={handleChange}
        onImageChange={handleImageChange}
        onSaveComplete={handleSaveComplete}
        editIndex={editIndex}
      />
      <JournalEntryList onEdit={handleEdit} />
    </div>
  );
};

export default TradePage;
