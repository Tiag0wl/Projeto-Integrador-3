import {
  MapPin,
  Clock,
  Users,
  ThumbsUp,
  ThumbsDown,
  Star,
} from "lucide-react";

import type { PageType } from "../App";
import ReportsMasonry from "../components/ReportsMasonry";

interface OccurrenceDetailsPageProps {
  selectedOccurrence: any;

  setSelectedOccurrence: (value: any) => void;

  setCurrentPage: React.Dispatch<React.SetStateAction<PageType>>;

  user: any;

  usefulReports: Record<number, boolean>;
  notUsefulReports: Record<number, boolean>;

  handleUsefulClick: (reportId: number) => void;
  handleNotUsefulClick: (reportId: number) => void;

  favorites: number[];
  toggleFavorite: (id: number) => void;

  favoriteSelectedOccurrenceSubreports: any[];
  regularSelectedOccurrenceSubreports: any[];

  reportLikes: Record<number, number>;
  reportDislikes: Record<number, number>;

  userIndividualReportLikes: Record<number, boolean>;
  userIndividualReportDislikes: Record<number, boolean>;

  individualFavoriteReports: Record<number, boolean>;

  handleIndividualReportLike: (id: any) => void;
  handleIndividualReportDislike: (id: any) => void;
  toggleIndividualFavoriteReport: (id: any) => void;

  isOccurrenceFavorited: (id: number) => boolean;

  getProfileColor: (profile?: any) => string;
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

  favorites,
  toggleFavorite,

  favoriteSelectedOccurrenceSubreports,
  regularSelectedOccurrenceSubreports,

  reportLikes,
  reportDislikes,

  userIndividualReportLikes,
  userIndividualReportDislikes,

  individualFavoriteReports,

  handleIndividualReportLike,
  handleIndividualReportDislike,
  toggleIndividualFavoriteReport,

  isOccurrenceFavorited,

  getProfileColor,
  getInitial,
}: OccurrenceDetailsPageProps) {
  return (
    <div>

      {/* Botão voltar */}
      <button
        onClick={() => setSelectedOccurrence(null)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 hover:scale-105 transition-transform"
      >
        <span className="text-xl">«</span>
        <span>Voltar para Rede Social</span>
      </button>

      {/* Cabeçalho da ocorrência */}
      <div className="bg-white border-gray-300 rounded-lg shadow-[6px_6px_8px_rgba(0,0,0,0.15)] p-6 mb-6 bg-[#f5f5f5]">

        <div className="flex items-start justify-between mb-4">

          <div className="flex-1">

            <div className="flex items-center gap-3 mb-3">

              <h1 className="text-3xl font-bold">
                {selectedOccurrence.type}
              </h1>

              <span
                className={`text-sm px-3 py-1 rounded ${selectedOccurrence.severityColor} text-white font-medium`}
              >
                {selectedOccurrence.severity}
              </span>

            </div>

            {/* Informações */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">

              <p className="text-gray-700 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>
                  {selectedOccurrence.location}
                </span>
              </p>

              <p className="text-gray-600 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>
                  {selectedOccurrence.date}
                </span>
              </p>

              <p className="text-gray-600 flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>
                  {selectedOccurrence.others + 1} pessoas relataram
                </span>
              </p>

              <p className="text-green-600 flex items-center gap-2 font-medium">
                <ThumbsUp className="w-4 h-4" />
                <span>
                  {selectedOccurrence.likes} confirmações
                </span>
              </p>

            </div>

          </div>

        </div>

        {/* Ações */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-200">

          {/* Útil */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleUsefulClick(selectedOccurrence.id);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors text-sm ${
              usefulReports[selectedOccurrence.id]
                ? "bg-green-200 text-green-700 hover:bg-green-200"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
          >
            <ThumbsUp
              className={`w-4 h-4 ${
                usefulReports[selectedOccurrence.id]
                  ? "fill-green-600"
                  : ""
              }`}
            />

            <span>Útil</span>
          </button>

          {/* Não útil */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNotUsefulClick(selectedOccurrence.id);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors text-sm ${
              notUsefulReports[selectedOccurrence.id]
                ? "bg-red-200 text-red-700 hover:bg-red-200"
                : "bg-red-100 text-red-700 hover:bg-red-200"
            }`}
          >
            <ThumbsDown
              className={`w-4 h-4 ${
                notUsefulReports[selectedOccurrence.id]
                  ? "fill-red-600"
                  : ""
              }`}
            />

            <span>Não Útil</span>
          </button>

          {/* Favoritar */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(selectedOccurrence.id);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors text-sm ${
              favorites.includes(selectedOccurrence.id)
                ? "bg-yellow-200 text-yellow-700 hover:bg-yellow-200"
                : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
            }`}
          >
            <Star
              className={`w-4 h-4 ${
                favorites.includes(selectedOccurrence.id)
                  ? "fill-yellow-500 text-yellow-500"
                  : ""
              }`}
            />

            <span>Favoritar</span>
          </button>

          {/* Adicionar relato */}
          <button
            onClick={() =>
              user
                ? setCurrentPage("add-report")
                : setCurrentPage("login")
            }
            className="ml-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium"
          >
            + Adicionar meu relato
          </button>

        </div>

      </div>

      {/* Relatos */}
      <ReportsMasonry
        selectedOccurrence={selectedOccurrence}
        favoriteSelectedOccurrenceSubreports={
          favoriteSelectedOccurrenceSubreports
        }
        regularSelectedOccurrenceSubreports={
          regularSelectedOccurrenceSubreports
        }
        reportLikes={reportLikes}
        reportDislikes={reportDislikes}
        userIndividualReportLikes={userIndividualReportLikes}
        userIndividualReportDislikes={userIndividualReportDislikes}
        individualFavoriteReports={individualFavoriteReports}
        handleIndividualReportLike={handleIndividualReportLike}
        handleIndividualReportDislike={handleIndividualReportDislike}
        toggleIndividualFavoriteReport={toggleIndividualFavoriteReport}
        toggleFavorite={toggleFavorite}
        isOccurrenceFavorited={isOccurrenceFavorited}
        getProfileColor={getProfileColor}
        getInitial={getInitial}
      />

    </div>
  );
}