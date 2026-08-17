import {
  Users,
  MapPin,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Star,
  FileText,
} from "lucide-react";

import {CustomDropdown} from "../components/CustomDropdown";
import type { PageType } from "../App";

interface SocialPageProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<PageType>>;

  user: any;

  filterCity: string;
  setFilterCity: (value: string) => void;

  filterSeverity: string;
  setFilterSeverity: (value: string) => void;

  filterType: string;
  setFilterType: (value: string) => void;

  filterDate: string;
  setFilterDate: (value: string) => void;

  searchQuery: string;
  setSearchQuery: (value: string) => void;

  filteredReports: any[];
  reports: any[];
  reportsLimit: number;

  isAnimating: boolean;

  setSelectedOccurrence: (report: any) => void;

  getSocialProfileColor: () => string;

  usefulReports: Record<string, boolean>;
  usefulCounts: Record<string, number>;

  notUsefulReports: Record<string, boolean>;
  notUsefulCounts: Record<string, number>;

  individualFavoriteReports: Record<string, boolean>;

  handleUsefulClick: (id: number) => void;
  handleNotUsefulClick: (id: number) => void;
  handleFavoriteClick: (id: number) => void;

  loadMoreReports: () => void;
}

export default function SocialPage({
  setCurrentPage,
  user,

  filterCity,
  setFilterCity,

  filterSeverity,
  setFilterSeverity,

  filterType,
  setFilterType,

  filterDate,
  setFilterDate,

  searchQuery,
  setSearchQuery,

  filteredReports,
  reports,
  reportsLimit,

  isAnimating,

  setSelectedOccurrence,

  getSocialProfileColor,

  usefulReports,
  usefulCounts,

  notUsefulReports,
  notUsefulCounts,

  individualFavoriteReports,

  handleUsefulClick,
  handleNotUsefulClick,
  handleFavoriteClick,

  loadMoreReports,
}: SocialPageProps) {
  return (
    <div>

      {/* Page Header */}
      <div className="flex items-center justify-between mb-4">

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 bg-[#ee302f] rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              Rede Social
            </h1>

            <p className="text-gray-600">
              Ocorrências e relatos próximos a você
            </p>
          </div>

        </div>

        <button
          onClick={() =>
            user
              ? setCurrentPage("add-occurrence")
              : setCurrentPage("login")
          }
          className="bg-[#089448] hover:bg-[#089448] text-white rounded-md font-medium transition-colors custom-button px-6 py-2"
        >
          + Adicionar Ocorrência
        </button>

      </div>

      {/* Filters */}
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-[6px_6px_8px_rgba(0,0,0,0.15)] mb-6 flex flex-wrap items-center gap-4 bg-[#f5f5f5]">

        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700">
            Filtros:
          </span>
        </div>

        {/* Cidade */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 font-medium">
            Cidade:
          </label>

          <CustomDropdown
            value={filterCity}
            onChange={setFilterCity}
            options={[
              { value: "Todas", label: "Todas" },
              { value: "Erechim", label: "Erechim" },
              { value: "Porto Alegre", label: "Porto Alegre" },
              { value: "Caxias do Sul", label: "Caxias do Sul" },
            ]}
          />
        </div>

        {/* Perigo */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 font-medium">
            Perigo:
          </label>

          <CustomDropdown
            value={filterSeverity}
            onChange={setFilterSeverity}
            options={[
              { value: "Todos", label: "Todos" },
              { value: "Perigo Alto", label: "Perigo Alto" },
              { value: "Perigo Médio", label: "Perigo Médio" },
              { value: "Perigo Baixo", label: "Perigo Baixo" },
            ]}
          />
        </div>

        {/* Tipo */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 font-medium">
            Tipo:
          </label>

          <CustomDropdown
            value={filterType}
            onChange={setFilterType}
            options={[
              { value: "Todos", label: "Todos" },
              { value: "GRANIZO", label: "Granizo" },
              { value: "ALAGAMENTO", label: "Alagamento" },
              { value: "VENDAVAL", label: "Vendaval" },
              { value: "TEMPESTADE", label: "Tempestade" },
              { value: "ENCHENTE", label: "Enchente" },
              { value: "DESLIZAMENTO", label: "Deslizamento" },
              { value: "CICLONE", label: "Ciclone" },
            ]}
          />
        </div>

        {/* Data */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 font-medium">
            Data:
          </label>

          <input
            type="text"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            placeholder="DD/MM/AAAA"
            className="px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-32"
          />
        </div>

        {/* Pesquisa */}
        <div className="ml-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 Pesquisar..."
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm w-56 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
          />
        </div>

      </div>

      {/* Reports Grid */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 transition-all duration-200 ${
          isAnimating
            ? "opacity-0 scale-95"
            : "opacity-100 scale-100"
        }`}
      >

        {filteredReports.length > 0 ? (

          filteredReports
            .slice(0, reportsLimit)
            .map((report) => (

              <button
                key={report.id}
                onClick={() => setSelectedOccurrence(report)}
                className="border-2 border-gray-300 rounded-lg shadow-[6px_6px_8px_rgba(0,0,0,0.15)] hover:shadow-[6px_6px_8px_rgba(0,0,0,0.25)] transition-all overflow-hidden text-left transform hover:border-gray-200 relative group bg-[#f5f5f5] hover:scale-101"
              >

                <div className="relative group p-4 bg-white">

                  {/* User Info */}
                  <div className="flex items-center gap-2 mb-3">

                    <div
                      className={`w-8 h-8 ${getSocialProfileColor()} rounded-full flex items-center justify-center`}
                    >
                      <Users className="w-4 h-4 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {report.user}
                      </p>

                      <p className="text-xs text-gray-500">
                        + {report.others} pessoas
                      </p>
                    </div>

                    <span
                      className={`text-xs px-2 py-1 rounded ${report.severityColor} text-white font-medium whitespace-nowrap`}
                    >
                      {report.severity}
                    </span>

                  </div>

                  {/* Event Type */}
                  <h3 className="text-2xl font-bold mb-2">
                    {report.type}
                  </h3>

                  {/* Location */}
                  <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {report.location}
                  </p>

                  {/* Date */}
                  <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {report.date}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">

                    <div className="flex items-center gap-3">

                      {/* Useful */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUsefulClick(report.id);
                        }}
                        className={`flex items-center gap-1 text-sm font-medium ${
                          usefulReports[report.id]
                            ? "text-green-600"
                            : "text-gray-600 hover:text-green-600"
                        } transition-colors`}
                      >
                        <ThumbsUp className="w-4 h-4" />

                        <span>
                          {usefulCounts[report.id] || 0}
                        </span>
                      </button>

                      {/* Not useful */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNotUsefulClick(report.id);
                        }}
                        className={`flex items-center gap-1 text-sm font-medium ${
                          notUsefulReports[report.id]
                            ? "text-red-600"
                            : "text-gray-600 hover:text-red-600"
                        } transition-colors`}
                      >
                        <ThumbsDown className="w-4 h-4" />

                        <span>
                          {notUsefulCounts[report.id] || 0}
                        </span>
                      </button>

                    </div>

                    {/* Favorite */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFavoriteClick(report.id);
                      }}
                      className="text-gray-600 hover:text-yellow-500 transition-colors"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          individualFavoriteReports[report.id]
                            ? "fill-yellow-500 text-yellow-500"
                            : ""
                        }`}
                      />
                    </button>

                  </div>

                </div>

              </button>
            ))

        ) : (

          <div className="col-span-full text-center py-12">

            <div className="text-gray-500">

              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />

              <p className="text-lg font-medium mb-2">
                Nenhum relato encontrado
              </p>

              <p className="text-sm">
                Tente ajustar os filtros para ver mais resultados
              </p>

            </div>

          </div>

        )}

      </div>

      {/* Results Summary */}
      <div className="mt-4 text-sm text-gray-600 text-center">

        {filteredReports.slice(0, reportsLimit).length}{" "}

        {filteredReports.slice(0, reportsLimit).length === 1
          ? "ocorrência encontrada"
          : "ocorrências encontradas"}

        {filteredReports.length !== reports.length &&
          ` de ${filteredReports.length} totais`}

      </div>

      {/* Load More */}
      {filteredReports.length > reportsLimit && (
        <div className="text-center">

          <button
            onClick={loadMoreReports}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mx-auto my-[13px] hover:scale-105 transition-transform"
          >
            <span>Carregar mais...</span>
          </button>

        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mx-[0px] mt-[15px] mb-[17px]">

        <p className="text-sm text-blue-800">
          <strong>ℹ️ Como funciona:</strong> Clique em uma
          ocorrência para ver todos os relatos relacionados.
          Ocorrências com mais confirmações aparecem no topo.
          Se você foi afetado pelo mesmo evento, adicione seu
          relato à ocorrência existente ao invés de criar uma nova.
        </p>

      </div>

    </div>
  );
}