import React, { useState } from "react";
import { motion } from "framer-motion";
import ImageUploadField from "./ImageUploadField";
import { supabase } from "../../supabaseClient";

const TradeForm = ({
  form,
  onChange,
  onSaveComplete,
  onImageChange,
  editIndex,
}) => {
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // ✅ Smooth loading guard – shows only if form is empty or undefined
  if (!form || Object.keys(form).length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center py-24"
      >
        <div className="relative w-16 h-16 mb-6">
          {/* Outer rotating ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute inset-0 border-4 border-emerald-400 border-t-transparent rounded-full"
          ></motion.div>

          {/* Inner pulse dot */}
          <motion.div
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-4 bg-emerald-500 rounded-full blur-sm"
          ></motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300 text-lg font-medium"
        >
          Loading trade data...
        </motion.p>
      </motion.div>
    );
  }

  // ✅ Upload image to Supabase Storage
  const uploadImage = async (file) => {
    if (!file) return null;

    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("trade-images").upload(fileName, file);
    if (error) throw new Error(`Image upload failed: ${error.message}`);

    const { data: publicUrlData } = supabase.storage.from("trade-images").getPublicUrl(fileName);
    return publicUrlData?.publicUrl;
  };

  // ✅ Handle Save or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setErrorMessage("");

    try {
      // Upload image fields
      const uploadedImages = {};
      for (const field of [
        "traderIdeaMorning",
        "traderIdeaEvening",
        "traderIdeaNoon",
        "setupImage",
        "entryImage",
        "profitImage",
      ]) {
        if (form[field] instanceof File) {
          uploadedImages[field] = await uploadImage(form[field]);
        } else {
          uploadedImages[field] = form[field] || null;
        }
      }

      // Prepare trade data
      const tradeData = {
        pair: form.pair || "",
        type: form.type || "",
        date: form.date || "",
        time: form.time || "",
        session: form.session || null,
        trader_idea_morning: uploadedImages.traderIdeaMorning,
        trader_idea_evening: uploadedImages.traderIdeaEvening,
        trader_idea_noon: uploadedImages.traderIdeaNoon,
        setup_image: uploadedImages.setupImage,
        entry_image: uploadedImages.entryImage,
        profit_image: uploadedImages.profitImage,
        created_at: new Date().toISOString(),
      };

      // Update or insert in Supabase
      if (editIndex !== null && form.id) {
        const { error: updateError } = await supabase
          .from("trades")
          .update(tradeData)
          .eq("id", form.id);

        if (updateError) throw new Error(updateError.message);
        alert("✅ Trade updated successfully!");
      } else {
        const { error: insertError } = await supabase.from("trades").insert([tradeData]);
        if (insertError) throw new Error(insertError.message);
        alert("✅ Trade saved successfully!");
      }

      if (onSaveComplete) onSaveComplete();
    } catch (err) {
      console.error("🔥 Error during trade save:", err);
      setErrorMessage(err.message || "Something went wrong while saving the trade.");
      alert(`❌ ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 max-w-3xl mx-auto border border-gray-100 dark:border-gray-700"
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">
        {editIndex !== null ? "✏️ Edit Trade" : "🧾 New Trade Entry"}
      </h2>

      {/* Pair */}
      <div>
        <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
          Currency Pair
        </label>
        <input
          name="pair"
          placeholder="e.g. EUR/USD"
          value={form.pair || ""}
          onChange={onChange}
          required
          className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
        />
      </div>

      {/* Type & Date */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
            Buy or Sell
          </label>
          <select
            name="type"
            value={form.type || ""}
            onChange={onChange}
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          >
            <option value="">Select Type</option>
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
            Date of Trade
          </label>
          <input
            type="date"
            name="date"
            value={form.date || ""}
            onChange={onChange}
            required
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />
        </div>
      </div>

      {/* Time */}
      <div>
        <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
          Time of Trade
        </label>
        <input
          type="time"
          name="time"
          value={form.time || ""}
          onChange={onChange}
          className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
        />
        {form.session && (
          <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
            Session: <strong>{form.session}</strong>
          </p>
        )}
      </div>

      {/* Upload Fields */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
          Upload Trade Documentation
        </h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            ["(1) External Trader Idea (Optional)", "traderIdeaMorning"],
            ["(2) Daily Chart - Daily Candle", "traderIdeaEvening"],
            ["(3) MGI Strategy (NYC Thesis)", "traderIdeaNoon"],
            ["(4) Setup (DHDL + Killzone)", "setupImage"],
            ["(5) Execution", "entryImage"],
            ["(6) Profit Result", "profitImage"],
          ].map(([label, key]) => (
            <ImageUploadField
              key={key}
              label={label}
              value={form[key]}
              onChange={(e) => onImageChange(e, key)}
            />
          ))}
        </div>
      </div>

      {/* Error */}
      {errorMessage && (
        <p className="text-red-500 text-sm font-medium text-center mt-2">
          ⚠️ {errorMessage}
        </p>
      )}

      {/* Submit */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        type="submit"
        disabled={uploading}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold shadow-lg transition"
      >
        {uploading
          ? "Saving..."
          : editIndex !== null
          ? "Update Trade"
          : "Save Trade"}
      </motion.button>
    </motion.form>
  );
};

export default TradeForm;
