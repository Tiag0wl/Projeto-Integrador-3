import React from "react";
import {
  MapPin,
  Clock,
  Users,
  ThumbsUp,
  ThumbsDown,
  ArrowLeft,
} from "lucide-react";
import { CustomDropdown } from "../components/CustomDropdown";
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
  currentUserId?: string | null;
  onDeleteReport?: (reportId: string) => void | Promise<void>;
  onDeleteOccurrence?: (occurrenceId: number | string) => void | Promise<void>;
}

type ReportSort = "popular" | "recent";

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
  currentUserId,
  onDeleteReport,
  onDeleteOccurrence,
}: OccurrenceDetailsPageProps) {
  const [reportSort, setReportSort] = React.useState<ReportSort[]>([]);
  const [reportSeverityFilter, setReportSeverityFilter] =
    React.useState("Todos");

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

  const city =
    selectedOccurrence.city ||
    selectedOccurrence.location?.split(" - ")[0] ||
    "";

  const state = selectedOccurrence.state || "";
  const neighborhood = selectedOccurrence.neighborhood || "";

  const locationText = `${city}${state ? ` - ${state}` : ""}${
    neighborhood ? ` • Bairro ${neighborhood}` : ""
  }`;

  const distanceKm =
    selectedOccurrence.distanceKm != null
      ? Number(selectedOccurrence.distanceKm)
      : null;

  const filteredAndSortedSubreports = React.useMemo(() => {
    const filtered = selectedOccurrenceSubreports.filter((report) => {
      if (reportSeverityFilter === "Todos") return true;
      return report.severity === reportSeverityFilter;
    });

    return [...filtered].sort((a, b) => {
      for (const sort of reportSort) {
        if (sort === "popular") {
          const aPopularity =
            Number(reportLikes[a.key] ?? a.likes ?? 0) -
            Number(reportDislikes[a.key] ?? a.dislikes ?? 0);
          const bPopularity =
            Number(reportLikes[b.key] ?? b.likes ?? 0) -
            Number(reportDislikes[b.key] ?? b.dislikes ?? 0);

          if (bPopularity !== aPopularity) {
            return bPopularity - aPopularity;
          }
        }

        if (sort === "recent") {
          const aDate = a.createdAt
            ? new Date(a.createdAt).getTime()
            : 0;
          const bDate = b.createdAt
            ? new Date(b.createdAt).getTime()
            : 0;

          if (bDate !== aDate) {
            return bDate - aDate;
          }
        }
      }

      return 0;
    });
  }, [
    selectedOccurrenceSubreports,
    reportLikes,
    reportDislikes,
    reportSort,
    reportSeverityFilter,
  ]);

  const toggleReportSort = (sort: ReportSort) => {
    setReportSort((current) =>
      current.includes(sort)
        ? current.filter((item) => item !== sort)
        : [...current, sort]
    );
  };

  return (
    <div>
      <button
        onClick={() => setSelectedOccurrence(null)}
        className="mb-4 flex items-center text-[18px] text-gray-600 hover:text-gray-900 hover:scale-105 transition"
      >
        <ArrowLeft strokeWidth={3} className="w-4 h-4 mr-2" />
        Voltar para ocorrências
      </button>

      <div className="bg-white border-2 border-gray-300 rounded-lg shadow-[6px_6px_8px_rgba(0,0,0,0.15)] p-6 mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-[40px] font-bold">
                {selectedOccurrence.type}
              </h1>

              <span
                className={`text-[15px] px-3 py-1 rounded text-white font-medium ${
                  selectedOccurrence.severityColor || "bg-gray-500"
                }`}
              >
                {selectedOccurrence.severity}
              </span>
            </div>

            <div className="mb-2 flex items-center gap-2 text-base text-gray-600">
              <MapPin className="w-5 h-5 shrink-0" />
              <span>{locationText}</span>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-base text-gray-500">
              <p className="flex items-center gap-2 whitespace-nowrap">
                <Clock className="w-5 h-5 shrink-0" />
                <span>{selectedOccurrence.date}</span>
              </p>

              {distanceKm != null && (
                <p
                  className={`flex items-center gap-2 whitespace-nowrap ${
                    distanceKm <= 20
                      ? "font-bold text-gray-700"
                      : "text-gray-500"
                  }`}
                >
                  <MapPin className="w-5 h-5 shrink-0" />
                  <span>
                    {distanceKm < 1
                      ? `${Math.round(distanceKm * 1000)} m de você`
                      : `${distanceKm.toFixed(1)} km de você`}
                  </span>
                </p>
              )}
            </div>
          </div>

          <div className="text-sm text-gray-600 flex items-center gap-2">
            <Users className="w-5 h-5" />
            <strong>{reportCount}</strong>{" "}
            {reportCount === 1
              ? "pessoa relatou"
              : "pessoas relataram"}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-5 pt-4 border-t border-gray-200">
          <button
            onClick={() => handleUsefulClick(selectedOccurrence.id)}
            className={`flex items-center gap-2 text-lg font-medium ${
              usefulReports[selectedOccurrence.id]
                ? "text-green-600"
                : "text-gray-600 hover:text-green-600"
            }`}
          >
            <ThumbsUp className="w-6 h-6" />
            Confirmo {usefulReports[selectedOccurrence.id] ? "✓" : ""}
          </button>

          <button
            onClick={() => handleNotUsefulClick(selectedOccurrence.id)}
            className={`flex items-center gap-2 text-lg font-medium ${
              notUsefulReports[selectedOccurrence.id]
                ? "text-red-600"
                : "text-gray-600 hover:text-red-600"
            }`}
          >
            <ThumbsDown className="w-6 h-6" />
            Não confirmo{" "}
            {notUsefulReports[selectedOccurrence.id] ? "✓" : ""}
          </button>

          <button
            onClick={openAddReport}
            className="ml-auto px-4 py-2 bg-[#089448] hover:bg-[#087b3d] text-white rounded-md font-medium transition-colors"
          >
            + Adicionar meu relato
          </button>
        </div>
      </div>

      {/* Título/explicação + filtros dos relatos */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-2xl font-bold">Relatos relacionados</h2>
          <p className="text-sm text-gray-600 mt-1">
            Pessoas que presenciaram o mesmo evento podem complementar esta ocorrência.
          </p>
        </div>

        <div className="shrink-0 bg-white border border-gray-200 rounded-lg shadow-[6px_6px_8px_rgba(0,0,0,0.15)] p-2 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => toggleReportSort("popular")}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              reportSort.includes("popular")
                ? "bg-[#089448] text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
            }`}
          >
            Mais populares
          </button>

          <button
            type="button"
            onClick={() => toggleReportSort("recent")}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              reportSort.includes("recent")
                ? "bg-[#089448] text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
            }`}
          >
            Mais recentes
          </button>

          <CustomDropdown
            value={reportSeverityFilter}
            onChange={setReportSeverityFilter}
            options={[
              { value: "Todos", label: "Todos os perigos" },
              { value: "Perigo Alto", label: "Perigo Alto" },
              { value: "Perigo Médio", label: "Perigo Médio" },
              { value: "Perigo Baixo", label: "Perigo Baixo" },
            ]}
          />
        </div>
      </div>

      <ReportsMasonry
        selectedOccurrence={selectedOccurrence}
        selectedOccurrenceSubreports={filteredAndSortedSubreports}
        reportLikes={reportLikes}
        reportDislikes={reportDislikes}
        userIndividualReportLikes={userIndividualReportLikes}
        userIndividualReportDislikes={userIndividualReportDislikes}
        handleIndividualReportLike={handleIndividualReportLike}
        handleIndividualReportDislike={handleIndividualReportDislike}
        getProfileColor={getProfileColor}
        getInitial={getInitial}
        currentUserId={currentUserId}
        onDeleteReport={onDeleteReport}
        onDeleteOccurrence={onDeleteOccurrence}
      />
    </div>
  );
}
