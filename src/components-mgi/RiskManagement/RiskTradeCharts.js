import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, LabelList,
} from 'recharts';

const usdToTshRate = 2500;
const convertUSDToTSH = (usd) => usd * usdToTshRate;

const RiskTradeCharts = ({ trades }) => {
  const sortedTrades = [...trades].sort((a, b) => new Date(a.date) - new Date(b.date));

  const formatLabel = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return `${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')}`;
  };

  // ✅ Line Chart Data (USD)
  const lineData = sortedTrades.map((trade) => ({
    date: formatLabel(trade.date),
    'Risk (USD)': trade.riskUSD,
    'Gain (USD)': trade.gainUSD,
  }));

  // ✅ Group Risk per Date
  const riskByDate = {};
  const usdByDate = {};

  sortedTrades.forEach((trade) => {
    const dateKey = formatLabel(trade.date);
    const riskTZS = convertUSDToTSH(trade.riskUSD);
    riskByDate[dateKey] = (riskByDate[dateKey] || 0) + riskTZS;
    usdByDate[dateKey] = (usdByDate[dateKey] || 0) + trade.riskUSD;
  });

  const histogramData = Object.keys(riskByDate).map((date) => ({
    date,
    riskTZS: riskByDate[date],
    usdTotal: usdByDate[date].toFixed(2), // For label display
  }));

  return (
    <div className="mt-8 space-y-12 max-w-6xl mx-auto px-4">
      {/* Line Chart */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Risk and Gain Over Time (USD)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Risk (USD)" stroke="#ff4d4d" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="Gain (USD)" stroke="#4caf50" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ✅ Histogram (Green Bars + USD Labels) */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Total Risk (TZS) per Date</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={histogramData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              formatter={(value, name, props) => [
                `${value.toLocaleString()} TZS`,
                'Risk (TZS)',
              ]}
            />
            <Bar dataKey="riskTZS" fill="#4caf50" radius={[5, 5, 0, 0]}>
              {/* ✅ USD label beside bar */}
              <LabelList
                dataKey="usdTotal"
                position="right"
                formatter={(value) => `${value} USD`}
                className="text-sm font-semibold fill-gray-700"
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RiskTradeCharts;
