import React, { useState } from "react";
import { X } from "lucide-react";

const sampleImages = {
  setup: "https://via.placeholder.com/600x300?text=Setup",
  entry: "https://via.placeholder.com/600x300?text=Entry",
  profit: "https://via.placeholder.com/600x300?text=Profit",
};

export default function TradingBlogPost() {
  const [modalImage, setModalImage] = useState(null);

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10 font-sans">
      {/* Header */}
      <header className="text-center border-b-2 border-gray-200 pb-4 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-700">
          Trading Strategy: From Setup to Profit
        </h1>
      </header>

      {/* Trading Cycle Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
          Understanding the Trading Cycle
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Every successful trade begins with a well-defined setup, proceeds
          through a calculated entry, and concludes with disciplined
          profit-taking. This structured approach helps in managing risk and
          maximizing potential gains.
        </p>

        {/* Images */}
        <div className="flex flex-wrap gap-6 justify-center">
          {Object.entries(sampleImages).map(([key, src]) => (
            <div
              key={key}
              className="flex-1 min-w-[220px] max-w-sm text-center cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setModalImage(src)}
            >
              <img
                src={src}
                alt={key}
                className="w-full h-40 object-cover rounded-xl shadow-md"
              />
              <p className="mt-2 font-semibold text-gray-800 capitalize">
                {key}
              </p>
            </div>
          ))}
        </div>
      </section>

      <hr className="my-8 border-gray-300" />

      {/* Checklists */}
      <section>
        <h2 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
          Checklists for Success ✅
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Trading Plan Checklist */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-bold text-gray-800 border-l-4 border-blue-600 pl-3 mb-4">
              Trading Plan Checklist
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li>
                <span className="font-semibold">1. Market Analysis Complete?</span>{" "}
                Analyzed trend, levels, and events.
              </li>
              <li>
                <span className="font-semibold">2. Setup Confirmed?</span> Clear
                setup aligned with my strategy.
              </li>
              <li>
                <span className="font-semibold">3. Entry Point Defined?</span>{" "}
                Entry point is precise.
              </li>
              <li>
                <span className="font-semibold">4. Stop-Loss Set?</span> Placed
                at a logical level.
              </li>
              <li>
                <span className="font-semibold">5. Profit Target Established?</span>{" "}
                Target is realistic.
              </li>
            </ul>
          </div>

          {/* Emotional Intelligence Checklist */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-bold text-gray-800 border-l-4 border-blue-600 pl-3 mb-4">
              Emotional Intelligence Checklist
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li>
                <span className="font-semibold">1. Am I calm and objective?</span>{" "}
                Decisions are strategy-based, not emotional.
              </li>
              <li>
                <span className="font-semibold">2. Have I accepted the risk?</span>{" "}
                I accept potential loss.
              </li>
              <li>
                <span className="font-semibold">3. Is this trade free from FOMO?</span>{" "}
                Entry meets my setup criteria.
              </li>
              <li>
                <span className="font-semibold">4. Is this a revenge trade?</span>{" "}
                No, independent of past results.
              </li>
              <li>
                <span className="font-semibold">5. Am I patient?</span> Waited
                until all conditions are met.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setModalImage(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-lg max-w-3xl w-[90%] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={modalImage}
              alt="Preview"
              className="w-full h-auto rounded-lg"
            />
            <button
              className="mt-4 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={() => setModalImage(null)}
            >
              <X className="w-5 h-5" /> Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
