import React, { useState, useEffect } from 'react';
import FundedTradeModal from './FundedTradeModal'; // Create a separate modal file
import FundedTradeCharts from './FundedTradeCharts'; // Create a separate chart file

const usdToTshFundedRate = 2500;
const convertFundedUSDToTSH = (usd) => usd * usdToTshFundedRate;

// Format date mm/dd/yyyy + weekday
const formatFundedDateAndDay = (dateStr) => {
  if (!dateStr) return { date: '', day: '' };
  const d = new Date(dateStr);
  const date = `${(d.getMonth() + 1).toString().padStart(2, '0')}/${d
    .getDate()
    .toString()
    .padStart(2, '0')}/${d.getFullYear()}`;
  const day = d.toLocaleDateString('en-US', { weekday: 'long' });
  return { date, day };
};

function FundedAccount() {
  // ✅ Different localStorage key
  const [fundedTrades, setFundedTrades] = useState(() => {
    const saved = localStorage.getItem('fundedTrades');
    return saved ? JSON.parse(saved) : [];
  });

  const [isFundedModalOpen, setIsFundedModalOpen] = useState(false);
  const [fundedEditTrade, setFundedEditTrade] = useState(null);

  // ✅ Save trades to its own storage
  useEffect(() => {
    localStorage.setItem('fundedTrades', JSON.stringify(fundedTrades));
  }, [fundedTrades]);

  // ✅ Add new funded trade
  const addFundedTrade = (trade) => {
    setFundedTrades((prev) => [...prev, { id: Date.now(), ...trade }]);
  };

  // ✅ Update funded trade
  const updateFundedTrade = (updatedTrade) => {
    setFundedTrades((prev) =>
      prev.map((t) =>
        t.id === fundedEditTrade.id ? { ...t, ...updatedTrade } : t
      )
    );
    setFundedEditTrade(null);
  };

  // ✅ Delete funded trade
  const deleteFundedTrade = (id) => {
    if (window.confirm('Are you sure you want to delete this funded trade?')) {
      setFundedTrades((prev) => prev.filter((t) => t.id !== id));
    }
  };

  // ✅ Edit modal open
  const handleFundedEdit = (trade) => {
    setFundedEditTrade(trade);
    setIsFundedModalOpen(true);
  };

  // ✅ Close modal
  const handleFundedCloseModal = () => {
    setIsFundedModalOpen(false);
    setFundedEditTrade(null);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <button
        onClick={() => setIsFundedModalOpen(true)}
        className="mb-6 px-5 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Add Funded Account Trade
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border border-gray-300 px-3 py-2">Date</th>
              <th className="border border-gray-300 px-3 py-2">Day</th>
              <th className="border border-gray-300 px-3 py-2">Pair</th>
              <th className="border border-gray-300 px-3 py-2">Signal</th>
              <th className="border border-gray-300 px-3 py-2">Risk (Pips)</th>
              <th className="border border-gray-300 px-3 py-2">Risk (USD)</th>
              <th className="border border-gray-300 px-3 py-2">Risk (TZS)</th>
              <th className="border border-gray-300 px-3 py-2">Gain (Pips)</th>
              <th className="border border-gray-300 px-3 py-2">Gain (USD)</th>
              <th className="border border-gray-300 px-3 py-2">Gain (TZS)</th>
              <th className="border border-gray-300 px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fundedTrades.length === 0 ? (
              <tr>
                <td colSpan={11} className="text-center p-4 text-gray-500">
                  No funded trades yet.
                </td>
              </tr>
            ) : (
              fundedTrades.map((trade) => {
                const { date, day } = formatFundedDateAndDay(trade.date);
                const riskTZS = convertFundedUSDToTSH(trade.riskUSD);
                const gainTZS = convertFundedUSDToTSH(trade.gainUSD);

                return (
                  <tr key={trade.id} className="hover:bg-gray-50 transition">
                    <td className="border px-3 py-2">{date}</td>
                    <td className="border px-3 py-2">{day}</td>
                    <td className="border px-3 py-2">{trade.pair}</td>
                    <td className="border px-3 py-2">{trade.signal}</td>
                    <td className="border px-3 py-2">{trade.riskPips}</td>
                    <td className="border px-3 py-2">
                      ${trade.riskUSD.toFixed(2)}
                    </td>
                    <td className="border px-3 py-2">
                      {riskTZS.toFixed(0)} TZS
                    </td>
                    <td className="border px-3 py-2">{trade.gainPips}</td>
                    <td className="border px-3 py-2">
                      ${trade.gainUSD.toFixed(2)}
                    </td>
                    <td className="border px-3 py-2">
                      {gainTZS.toFixed(0)} TZS
                    </td>
                    <td className="border px-3 py-2 space-x-2">
                      <button
                        onClick={() => handleFundedEdit(trade)}
                        className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteFundedTrade(trade.id)}
                        className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Funded Charts */}
      <FundedTradeCharts trades={fundedTrades} />

      {/* ✅ Funded Modal */}
      {isFundedModalOpen && (
        <FundedTradeModal
          onClose={handleFundedCloseModal}
          onSave={fundedEditTrade ? updateFundedTrade : addFundedTrade}
          initialData={fundedEditTrade}
        />
      )}
    </div>
  );
}

export default FundedAccount;
