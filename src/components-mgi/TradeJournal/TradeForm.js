import React from 'react';
import ImageUploadField from './ImageUploadField';
// import EmotionSelector from './EmotionSelector';
import TradingPsychologyChecklist from './TradingPsychologyChecklist';

const TradeForm = ({ form, onChange, onSubmit, onImageChange, onEmotionToggle, editIndex }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto"
    >
      {/* Pair */}
      <input
        name="pair"
        placeholder="Currency Pair (e.g. EUR/USD)"
        value={form.pair}
        onChange={onChange}
        required
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      {/* Type & Date */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-1">Buy or Sell:</label>
          <select
            name="type"
            value={form.type}
            onChange={onChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Date of Trade:</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={onChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>
      </div>

      {/* Time */}
      <div>
        <label className="block text-gray-700 mb-1">Time of Trade:</label>
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={onChange}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        {form.session && (
          <p className="text-sm text-green-600 mt-1">
            Session: <strong>{form.session}</strong>
          </p>
        )}
      </div>


      {/* Image Upload Fields */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        <ImageUploadField
          label="Setup"
          value={form.setupImage}
          onChange={(e) => onImageChange(e, 'setupImage')}
        />
        <ImageUploadField
          label="Entry"
          value={form.entryImage}
          onChange={(e) => onImageChange(e, 'entryImage')}
        />
        <ImageUploadField
          label="Profit"
          value={form.profitImage}
          onChange={(e) => onImageChange(e, 'profitImage')}
        />

        {/* Traders Idea Images */}
        <ImageUploadField
          label="Trader Idea 05:00–08:00"
          value={form.traderIdeaMorning}
          onChange={(e) => onImageChange(e, 'traderIdeaMorning')}
        />
        <ImageUploadField
          label="Trader Idea 12:00–14:00"
          value={form.traderIdeaNoon}
          onChange={(e) => onImageChange(e, 'traderIdeaNoon')}
        />
        <ImageUploadField
          label="Trader Idea 16:00–18:00"
          value={form.traderIdeaEvening}
          onChange={(e) => onImageChange(e, 'traderIdeaEvening')}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition font-semibold"
      >
        {editIndex !== null ? 'Update Trade' : 'Save Trade'}
      </button>

            {/* Emotions */}
      {/* <EmotionSelector emotions={form.emotions} onToggle={onEmotionToggle} /> */}
      <TradingPsychologyChecklist/>
    </form>
  );
};

export default TradeForm;
