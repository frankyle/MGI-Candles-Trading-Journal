import React from "react";
import { motion } from "framer-motion";
import ImageUploadField from "./ImageUploadField";
import TradingPsychologyChecklist from "./TradingPsychologyChecklist";

const TradeForm = ({
  form,
  onChange,
  onSubmit,
  onImageChange,
  onEmotionToggle,
  editIndex,
}) => {
  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 max-w-3xl mx-auto border border-gray-100 dark:border-gray-700"
    >
      {/* Heading */}
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
        {editIndex !== null ? "Edit Trade" : "New Trade Entry"}
      </h2>

      {/* Pair */}
      <div>
        <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
          Currency Pair
        </label>
        <input
          name="pair"
          placeholder="e.g. EUR/USD"
          value={form.pair}
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
            value={form.type}
            onChange={onChange}
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          >
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
            value={form.date}
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
          value={form.time}
          onChange={onChange}
          className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
        />
        {form.session && (
          <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
            Session: <strong>{form.session}</strong>
          </p>
        )}
      </div>

      {/* Image Upload Fields */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
          Upload Trade Images
        </h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          <ImageUploadField
            label="Setup"
            value={form.setupImage}
            onChange={(e) => onImageChange(e, "setupImage")}
          />
          <ImageUploadField
            label="Entry"
            value={form.entryImage}
            onChange={(e) => onImageChange(e, "entryImage")}
          />
          <ImageUploadField
            label="Profit"
            value={form.profitImage}
            onChange={(e) => onImageChange(e, "profitImage")}
          />
          <ImageUploadField
            label="Trader Idea 05:00–08:00"
            value={form.traderIdeaMorning}
            onChange={(e) => onImageChange(e, "traderIdeaMorning")}
          />
          <ImageUploadField
            label="Trader Idea 12:00–14:00"
            value={form.traderIdeaNoon}
            onChange={(e) => onImageChange(e, "traderIdeaNoon")}
          />
          <ImageUploadField
            label="Trader Idea 16:00–18:00"
            value={form.traderIdeaEvening}
            onChange={(e) => onImageChange(e, "traderIdeaEvening")}
          />
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        type="submit"
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold shadow-lg transition"
      >
        {editIndex !== null ? "Update Trade" : "Save Trade"}
      </motion.button>

      {/* Trading Psychology Checklist */}
      <div className="mt-6">
        <TradingPsychologyChecklist />
      </div>
    </motion.form>
  );
};

export default TradeForm;
