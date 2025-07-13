// src/components/Strategy.js
import React, { useState } from 'react';

const initialChecks = {
  fourHourTrend: false,
  fibZone: false,
  ictBox: false,
  bos: false,
  orderBlock: false,
  dailyMovement: false,
  amd: false,
  engulfingCandle: false,
  utAlert: false,
};

const questions = {
  fourHourTrend: 'Is the 4H trend in your direction?',
  fibZone: 'Are you in the Fib Discount/Premium Zone?',
  ictBox: 'Is the price within the ICT Kill Zone or Box?',
  bos: 'Is there a Break of Structure (BoS)?',
  orderBlock: 'Do you see a valid Order Block?',
  dailyMovement: 'Does it align with the Daily Movement direction?',
  amd: 'Is there a clear Accumulation-Manipulation-Distribution (AMD) pattern?',
  engulfingCandle: 'Do you see a Bullish/Bearish Engulfing Candle?',
  utAlert: 'Is there a UT Alert signal?',
};

function Strategy({ setShowModal, setTrades }) {
  const [checks, setChecks] = useState(initialChecks);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { id, checked } = e.target;
    const updatedChecks = { ...checks, [id]: checked };
    setChecks(updatedChecks);
    evaluate(updatedChecks);
  };

  const evaluate = (c) => {
    const base = c.fourHourTrend && c.fibZone && c.ictBox && c.bos && c.orderBlock;
    const premium = c.dailyMovement && c.amd && c.engulfingCandle && c.utAlert;
    const early = !base && c.bos;
    if (!Object.values(c).some(Boolean)) return setResult(null);

    if (!c.fibZone && c.bos) return setResult({ type: 'No Discount', risk: '0.5%', bg: 'bg-yellow-800' });
    if (base && premium) return setResult({ type: 'Premium Confluence Setup', risk: '3%', bg: 'bg-purple-800' });
    if (base) return setResult({ type: 'High Probability Setup', risk: '2%', bg: 'bg-green-800' });
    if (early) return setResult({ type: 'Early / Counter-Trend', risk: '0.5%', bg: 'bg-yellow-800' });
    return setResult({ type: 'Incomplete Setup', risk: 'Awaiting Confirmation...', bg: 'bg-gray-700' });
  };

  return (
    <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 space-y-4">
      <form className="space-y-4">
        {Object.keys(initialChecks).map((key) => (
          <div key={key} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
            <span className="font-medium text-gray-200 text-sm">{questions[key]}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" id={key} checked={checks[key]} onChange={handleChange} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-blue-500"></div>
              <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-full"></span>
            </label>
          </div>
        ))}
      </form>

      {result && (
        <div className={`mt-6 p-5 rounded-lg text-center transition-all ${result.bg}`}>
          <h3 className="text-xl font-bold text-white">{result.type}</h3>
          <p className="text-lg mt-1 text-gray-200">Recommended Risk: {result.risk}</p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg"
          >
            Log This Setup
          </button>
        </div>
      )}
    </div>
  );
}

export default Strategy;
