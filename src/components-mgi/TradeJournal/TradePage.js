import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import TradeForm from "./TradeForm";

const TradePage = () => {
  const [form, setForm] = useState({
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e, field) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("📤 Submitting form:", form); // 👈 log before insert

    const { data, error } = await supabase.from("trades").insert([
      {
        pair: form.pair,
        type: form.type,
        trade_date: form.date, // must match DB column
        trade_time: form.time,
        session: form.session,
        setup_image: form.setupImage,
        entry_image: form.entryImage,
        profit_image: form.profitImage,
        trader_idea_morning: form.traderIdeaMorning,
        trader_idea_noon: form.traderIdeaNoon,
        trader_idea_evening: form.traderIdeaEvening,
        notes: form.notes,
      },
    ]);

    if (error) {
      console.error("❌ Supabase insert error:", error);
      alert("Insert failed: " + error.message);
    } else {
      console.log("✅ Saved to Supabase:", data);
      alert("Trade saved successfully!");
      setForm({
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
    }
  };

  return (
    <TradeForm
      form={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onImageChange={handleImageChange}
    />
  );
};

export default TradePage;
