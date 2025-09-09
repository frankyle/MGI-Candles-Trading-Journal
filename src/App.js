import React from 'react';
import { Routes, Route } from 'react-router-dom'; // ✅ No BrowserRouter here
import Header from './components-mgi/Header';
import TradingJournalForm from './components-mgi/TradeJournal/TradingJournalForm';
import RiskManagement from './components-mgi/RiskManagement/RiskManagement';
import FundedAccount from './components-mgi/FundedAccount/FundedAccount';
import ArchivedTradesView from './components-mgi/ArchiveForder/ArchivedTradesView';
import Homepage from './components-mgi/Home/Homepage';
import Membership from './components-mgi/Membership/Membership';
import ContactUs from './components-mgi/Home/ContactUs';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen pt-20">
      <Header />
      <div className="max-w-5xl mx-auto px-4">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/trades" element={<TradingJournalForm />} />
          <Route path="/riskmanagement" element={<RiskManagement />} />
          <Route path="/riskmanagementfunded" element={<FundedAccount />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/archive" element={<ArchivedTradesView />} />
          <Route path="/contactus" element={<ContactUs />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
