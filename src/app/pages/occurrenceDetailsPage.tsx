import React from "react";
import { MapPin, Clock, Users, ThumbsUp, ThumbsDown } from "lucide-react";
import ReportsMasonry from "../components/ReportsMasonry";
import type { PageType } from "../App";
import type { Subreport } from "../components/ReportCard";

interface OccurrenceDetailsPageProps {
  selectedOccurrence: any;
  setSelectedOccurrence: React.Dispatch<React.SetStateAction<any>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<PageType>>;
  user: any;
  usefulReports: Record<number, boolean>;
  notUsefulReports: Record<number, boolean>;
  handleUsefulClick: (id: number) => void;
  handleNotUsefulClick: (id: number) => void;
  selectedOccurrenceSubreports: Subreport[];
  reportLikes: { [key: string]: number };
  reportDislikes: { [key: string]: number };
  userIndividualReportLikes: { [key: string]: boolean };
  userIndividualReportDislikes: { [key: string]: boolean };
  handleIndividualReportLike: (reportKey: string) => void;
  handleIndividualReportDislike: (reportKey: string) => void;
  getProfileColor: (name: string) => string;
  getInitial: (name: string) => string;
}

export default function OccurrenceDetailsPage({
  selectedOccurrence,
  setSelectedOccurrence,
  setCurrentPage,
  user,
  usefulReports,
  notUsefulReports,
  handleUsefulClick,
  handleNotUsefulClick,
  selectedOccurrenceSubreports,
  reportLikes,
  reportDislikes,
  userIndividualReportLikes,
  userIndividualReportDislikes,
  handleIndividualReportLike,
  handleIndividualReportDislike,
  getProfileColor,
  getInitial,
}: OccurrenceDetailsPageProps) {
  const reportCount = Number(
    selectedOccurrence.reportsCount ??
    selectedOccurrence.reports_count ??
    selectedOccurrence.others + 1
  );

  const openAddReport = () => {
    if (!user) {
      setCurrentPage("login");
      return;
    }
    setCurrentPage("add-report");
  };

  return (
    <div>
      <button
        onClick={() => setSelectedOccurrence(null)}
        className="mb-4 text-sm text-gray-600 hover:text-gray-900"
      >
        ← Voltar para ocorrências
      </button>

      <div className="bg-white border-2 border-gray-300 rounded-lg shadow-[6px_6px_8px_rgba(0,0,0,0.15)] p-6 mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{selectedOccurrence.type}</h1>
              <span className={`text-xs px-3 py-1 rounded text-white font-medium ${selectedOccurrence.severityColor || "bg-gray-500"}`}>
                {selectedOccurrence.severity}
              </span>
            </div>

            <p className="text-gray-600 flex items-center gap-1 mb-1">
              <MapPin className="w-4 h-4" /> {selectedOccurrence.location}
            </p>
            <p className="text-gray-500 flex items-center gap-1">
              <Clock className="w-4 h-4" /> {selectedOccurrence.date}
            </p>
          </div>

          <div className="text-sm text-gray-600 flex items-center gap-2">
            <Users className="w-5 h-5" />
            <strong>{reportCount}</strong> {reportCount === 1 ? "pessoa relatou" : "pessoas relataram"}
          </div>
        </div>

        {selectedOccurrence.description && (
          <p className="mt-5 text-gray-700 leading-relaxed">
            {selectedOccurrence.description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4 mt-5 pt-4 border-t border-gray-100">
          <button
            onClick={() => handleUsefulClick(selectedOccurrence.id)}
            className={`flex items-center gap-2 text-sm font-medium ${usefulReports[selectedOccurrence.id] ? "text-green-600" : "text-gray-600 hover:text-green-600"}`}
          >
            <ThumbsUp className="w-4 h-4" />
            Útil {usefulReports[selectedOccurrence.id] ? "✓" : ""}
          </button>

          <button
            onClick={() => handleNotUsefulClick(selectedOccurrence.id)}
            className={`flex items-center gap-2 text-sm font-medium ${notUsefulReports[selectedOccurrence.id] ? "text-red-600" : "text-gray-600 hover:text-red-600"}`}
          >
            <ThumbsDown className="w-4 h-4" />
            Não útil {notUsefulReports[selectedOccurrence.id] ? "✓" : ""}
          </button>

          <button
            onClick={openAddReport}
            className="ml-auto px-4 py-2 bg-[#089448] hover:bg-[#087b3d] text-white rounded-md font-medium transition-colors"
          >
            + Adicionar meu relato
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-bold">Relatos relacionados</h2>
        <p className="text-sm text-gray-600 mt-1">
          Pessoas que presenciaram o mesmo evento podem complementar esta ocorrência.
        </p>
      </div>

      <ReportsMasonry
        selectedOccurrence={selectedOccurrence}
        selectedOccurrenceSubreports={selectedOccurrenceSubreports}
        reportLikes={reportLikes}
        reportDislikes={reportDislikes}
        userIndividualReportLikes={userIndividualReportLikes}
        userIndividualReportDislikes={userIndividualReportDislikes}
        handleIndividualReportLike={handleIndividualReportLike}
        handleIndividualReportDislike={handleIndividualReportDislike}
        getProfileColor={getProfileColor}
        getInitial={getInitial}
      />
    </div>
  );
}