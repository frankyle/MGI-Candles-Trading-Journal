import React, { useState, useEffect } from 'react';
import RiskTradeModal from './RiskTradeModal'; // Make sure this file exists and exports the modal
import RiskTradeCharts from './RiskTradeCharts';

const usdToTshRate = 2500;
const convertUSDToTSH = (usd) => usd * usdToTshRate;

// Format date mm/dd/yyyy and day of week
const formatDateAndDay = (dateStr) => {
  if (!dateStr) return { date: '', day: '' };
  const d = new Date(dateStr);
  const date = `${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate()
    .toString()
    .padStart(2, '0')}/${d.getFullYear()}`;
  const day = d.toLocaleDateString('en-US', { weekday: 'long' });
  return { date, day };
};

function RiskManagement() {
  // Load saved trades from localStorage or default empty array
  const [trades, setTrades] = useState(() => {
    const saved = localStorage.getItem('riskTrades');
    return saved ? JSON.parse(saved) : [];
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editTrade, setEditTrade] = useState(null);

  // Save trades to localStorage on every change
  useEffect(() => {
    localStorage.setItem('riskTrades', JSON.stringify(trades));
  }, [trades]);

  // Add new trade
  const addTrade = (trade) => {
    setTrades((prev) => [...prev, { id: Date.now(), ...trade }]);
  };

  // Update existing trade
  const updateTrade = (updatedTrade) => {
    setTrades((prev) =>
      prev.map((t) => (t.id === editTrade.id ? { ...t, ...updatedTrade } : t))
    );
    setEditTrade(null);
  };

  // Delete trade by id
  const deleteTrade = (id) => {
    if (window.confirm('Are you sure you want to delete this trade?')) {
      setTrades((prev) => prev.filter((t) => t.id !== id));
    }
  };

  // Open modal for editing trade
  const handleEdit = (trade) => {
    setEditTrade(trade);
    setModalOpen(true);
  };

  // Close modal and reset edit state
  const handleCloseModal = () => {
    setModalOpen(false);
    setEditTrade(null);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <button
        onClick={() => setModalOpen(true)}
        className="mb-6 px-5 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Add New Risk Trade
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border border-gray-300 px-3 py-2">Date of Trade</th>
              <th className="border border-gray-300 px-3 py-2">Day of Week</th>
              <th className="border border-gray-300 px-3 py-2">Currency Pair</th>
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
            {trades.length === 0 ? (
              <tr>
                <td colSpan={11} className="text-center p-4 text-gray-500">
                  No trades available.
                </td>
              </tr>
            ) : (
              trades.map((trade) => {
                const { date, day } = formatDateAndDay(trade.date);
                const riskTZS = convertUSDToTSH(trade.riskUSD);
                const gainTZS = convertUSDToTSH(trade.gainUSD);

                return (
                  <tr
                    key={trade.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="border border-gray-300 px-3 py-2 whitespace-nowrap">
                      {date}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 whitespace-nowrap">
                      {day}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 whitespace-nowrap">
                      {trade.pair}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 whitespace-nowrap">
                      {trade.signal}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 whitespace-nowrap">
                      {trade.riskPips}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 whitespace-nowrap">
                      ${trade.riskUSD.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 whitespace-nowrap">
                      {riskTZS.toFixed(0)} TZS
                    </td>
                    <td className="border border-gray-300 px-3 py-2 whitespace-nowrap">
                      {trade.gainPips}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 whitespace-nowrap">
                      ${trade.gainUSD.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 whitespace-nowrap">
                      {gainTZS.toFixed(0)} TZS
                    </td>
                    <td className="border border-gray-300 px-3 py-2 whitespace-nowrap space-x-2">
                      <button
                        onClick={() => handleEdit(trade)}
                        className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTrade(trade.id)}
                        className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
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


        {/* Charts Section */}
      <RiskTradeCharts trades={trades} />


      {modalOpen && (
        <RiskTradeModal
          onClose={handleCloseModal}
          onSave={editTrade ? updateTrade : addTrade}
          initialData={editTrade}
        />
      )}
    </div>
  );
}

export default RiskManagement;
