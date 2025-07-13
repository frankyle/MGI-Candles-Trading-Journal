import React from 'react';
import { Routes, Route } from 'react-router-dom'; // ✅ No BrowserRouter here
import Header from './components-mgi/Header';
import TradingJournalForm from './components-mgi/TradeJournal/TradingJournalForm';
import Strategy from './components-mgi/Strategy';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen pt-20">
      <Header />
      <div className="max-w-5xl mx-auto px-4">
        <Routes>
          <Route path="/" element={<TradingJournalForm />} />
          <Route path="/strategy" element={<Strategy />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
