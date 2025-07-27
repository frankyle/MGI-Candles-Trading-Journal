import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar,
} from 'recharts';

// Expect trades prop to be array of trade objects
const RiskTradeCharts = ({ trades }) => {
  // Sort trades by date ascending
  const sortedTrades = [...trades].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Format date label mm/dd
  const formatLabel = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return `${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')}`;
  };

  // Prepare data for line chart
  const lineData = sortedTrades.map((trade) => ({
    date: formatLabel(trade.date),
    'Risk (USD)': trade.riskUSD,
    'Gain (USD)': trade.gainUSD,
  }));

  // Prepare data for histogram (distribution of Risk Pips)
  // We'll bin riskPips into buckets for the histogram
  const binSize = 5; // pips per bin
  const maxRiskPips = Math.max(...trades.map(t => t.riskPips), 0);
  const binsCount = Math.ceil(maxRiskPips / binSize);
  const bins = new Array(binsCount).fill(0);

  trades.forEach(({ riskPips }) => {
    const binIndex = Math.min(Math.floor(riskPips / binSize), binsCount - 1);
    bins[binIndex]++;
  });

  const histogramData = bins.map((count, i) => ({
    range: `${i * binSize}-${(i + 1) * binSize - 1}`,
    count,
  }));

  return (
    <div className="mt-8 space-y-12 max-w-6xl mx-auto px-4">
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

      <div>
        <h3 className="text-xl font-semibold mb-2">Distribution of Risk (Pips)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={histogramData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" label={{ value: 'Risk Pips Range', position: 'insideBottomRight', offset: -5 }} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RiskTradeCharts;
