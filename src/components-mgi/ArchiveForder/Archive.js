import React, { useEffect, useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const Archive = () => {
  const [archivedEntries, setArchivedEntries] = useState([]);
  const archiveRef = useRef(null);

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("archivedJournalEntries")) || [];

    const enriched = data.map((entry) => {
      const checklist =
        JSON.parse(localStorage.getItem(`checklist_entry_${entry.id}`)) || null;

      const emotional =
        JSON.parse(localStorage.getItem(`emotionalJournal_${entry.pair}`)) || [];

      return { ...entry, checklist, emotional };
    });

    setArchivedEntries(enriched);
  }, []);

  const handleDelete = (index) => {
    const updated = archivedEntries.filter((_, i) => i !== index);
    setArchivedEntries(updated);
    localStorage.setItem("archivedJournalEntries", JSON.stringify(updated));
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear ALL archived entries?")) {
      setArchivedEntries([]);
      localStorage.removeItem("archivedJournalEntries");
    }
  };

  // Generate PDF
  const handleDownloadPDF = async () => {
    const element = archiveRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgProps = pdf.getImageProperties(imgData);
    const imgHeight = (imgProps.height * pageWidth) / imgProps.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("Archived_Journal.pdf");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-800">
          📦 Archived Journal Entries
        </h1>

        <div className="space-x-3">
          {archivedEntries.length > 0 && (
            <>
              <button
                onClick={handleDownloadPDF}
                className="px-4 py-2 bg-blue-700 text-white rounded-lg shadow hover:bg-blue-800"
              >
                Download PDF
              </button>
              <button
                onClick={handleClearAll}
                className="px-4 py-2 bg-red-700 text-white rounded-lg shadow hover:bg-red-800"
              >
                Clear All
              </button>
            </>
          )}
        </div>
      </div>

      {/* Content to export */}
      <div ref={archiveRef}>
        {archivedEntries.length === 0 ? (
          <p className="text-gray-600 text-center italic">
            No archived entries yet. Start journaling your trades to see them
            here.
          </p>
        ) : (
          archivedEntries.map((entry, i) => (
            <article
              key={i}
              className="mb-12 p-6 rounded-2xl shadow-lg bg-white border border-gray-200"
            >
              {/* Title / Header */}
              <header className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {entry.pair} — {entry.type}
                </h2>
                <p className="text-sm text-gray-500">
                  {formatDate(entry.date)} • {entry.time} • {entry.session}
                </p>
              </header>

              {/* Images Section */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {entry.setupImage && (
                  <img
                    src={entry.setupImage}
                    alt="Setup"
                    className="w-full h-40 object-cover rounded-lg shadow"
                  />
                )}
                {entry.entryImage && (
                  <img
                    src={entry.entryImage}
                    alt="Entry"
                    className="w-full h-40 object-cover rounded-lg shadow"
                  />
                )}
                {entry.profitImage && (
                  <img
                    src={entry.profitImage}
                    alt="Profit"
                    className="w-full h-40 object-cover rounded-lg shadow"
                  />
                )}
              </div>

              {/* Checklist + Emotional Intelligence */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Checklist */}
                {entry.checklist && (
                  <section>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      📋 Journal Checklist
                    </h3>
                    <p className="mb-2">
                      <strong>Final Decision:</strong>{" "}
                      {entry.checklist.finalDecision || "N/A"}
                    </p>
                    <ul className="list-disc ml-6 text-sm text-gray-700">
                      {Object.keys(entry.checklist.checked || {})
                        .filter((k) => entry.checklist.checked[k])
                        .map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                    </ul>
                  </section>
                )}

                {/* Emotional Intelligence */}
                {entry.emotional && entry.emotional.length > 0 && (
                  <section>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      🧠 Emotional Intelligence Review
                    </h3>
                    {entry.emotional.map((emo, idx) => (
                      <div
                        key={idx}
                        className="mb-4 p-4 border border-gray-200 rounded-xl bg-gray-50"
                      >
                        <p>
                          <strong>Before:</strong> {emo.before.join(", ")}
                        </p>
                        <p>
                          <strong>During:</strong> {emo.during.join(", ")}
                        </p>
                        <p>
                          <strong>After:</strong> {emo.after.join(", ")}
                        </p>
                        <p>
                          <strong>Outcome:</strong> {emo.outcome}
                        </p>
                        <p>
                          <strong>EI Score:</strong>{" "}
                          <span className="font-semibold">{emo.score}%</span>
                        </p>
                      </div>
                    ))}
                  </section>
                )}
              </div>

              {/* Footer Actions */}
              <footer className="flex justify-end">
                <button
                  onClick={() => handleDelete(i)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
                >
                  Delete Entry
                </button>
              </footer>
            </article>
          ))
        )}
      </div>
    </div>
  );
};

export default Archive;
