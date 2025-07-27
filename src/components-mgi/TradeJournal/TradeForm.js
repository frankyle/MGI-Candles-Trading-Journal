import React from 'react';
import ImageUploadField from './ImageUploadField';
import EmotionSelector from './EmotionSelector';


const TradeForm = ({ form, onChange, onSubmit, onImageChange, onEmotionToggle, editIndex }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6 bg-white shadow-lg rounded-lg p-6">
      <input
        name="pair"
        placeholder="Currency Pair (e.g. EUR/USD)"
        value={form.pair}
        onChange={onChange}
        required
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

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

      <EmotionSelector emotions={form.emotions} onToggle={onEmotionToggle} />

      {/* ✅ Image Upload Fields */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        <ImageUploadField label="Setup" onChange={(e) => onImageChange(e, 'setupImage')} />
        <ImageUploadField label="Entry" onChange={(e) => onImageChange(e, 'entryImage')} />
        <ImageUploadField label="Profit" onChange={(e) => onImageChange(e, 'profitImage')} />

        {/* ✅ Replace single tradersIdeaImage with three */}
        <ImageUploadField label="Trader Idea 05:00–08:00" onChange={(e) => onImageChange(e, 'traderIdeaMorning')} />
        <ImageUploadField label="Trader Idea 12:00–14:00" onChange={(e) => onImageChange(e, 'traderIdeaNoon')} />
        <ImageUploadField label="Trader Idea 16:00–18:00" onChange={(e) => onImageChange(e, 'traderIdeaEvening')} />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition font-semibold"
      >
        {editIndex !== null ? 'Update Trade' : 'Save Trade'}
      </button>
    </form>
  );
};

export default TradeForm;
