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
          Upload Trade Documentation
        </h3>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">

          <ImageUploadField
            label="(1) External Trader Idea (Optional)"
            tooltip="Another trader’s idea used for influence or bias validation"
            value={form.traderIdeaMorning}
            onChange={(e) => onImageChange(e, 'traderIdeaMorning')}
            description="Optional external idea"
          />


         <ImageUploadField
            label="(2) Daily Chart - Daily Candle Price Action"
            tooltip="Daily narrative context using macro ICT model"
            value={form.traderIdeaEvening}
            onChange={(e) => onImageChange(e, 'traderIdeaEvening')}
            description="Higher timeframe narrative"
          />
          
          <ImageUploadField
            label="(3) MGI Strategy (1H Chart - Unbroken NYC Levels + ICT Concept)"
            tooltip="NY Session expectation based on unbroken liquidity levels & ICT Kill Zone"
            value={form.traderIdeaNoon}
            onChange={(e) => onImageChange(e, 'traderIdeaNoon')}
            description="NY Session directional thesis"
          />


          <ImageUploadField
            label="(4) Trading Setup (2H Chart - DHDL Movement + ICT Killzone)"
            tooltip="Show Higher Timeframe Bias • DHDL Structure • ICT Kill Zone"
            value={form.setupImage}
            onChange={(e) => onImageChange(e, 'setupImage')}
            description="2H Bias + DHDL movement + Kill Zone"
          />

          <ImageUploadField
            label="(5) Entry Execution (15m Chart Entry - ICT conept + ICT killzone)"
            tooltip="Liquidity Grab → Displacement → Entry inside Kill Zone using FVG/OB"
            value={form.entryImage}
            onChange={(e) => onImageChange(e, 'entryImage')}
            description="15m entry using FVG, OB or BB"
          />

          <ImageUploadField
            label="(6) Profit Result (1H Chart - DHDL Movement + ICT Killzone)"
            tooltip="Show how price reached target objective using DHDL draw & Kill Zone timing"
            value={form.profitImage}
            onChange={(e) => onImageChange(e, 'profitImage')}
            description="1H draw objective achieved"
          />

        </div>
      </div>

      {/* Submit */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        type="submit"
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold shadow-lg transition"
      >
        {editIndex !== null ? "Update Trade" : "Save Trade"}
      </motion.button>

      {/* Psychology Checklist */}
      <div className="mt-6">
        <TradingPsychologyChecklist />
      </div>
    </motion.form>
  );
};

export default TradeForm;
