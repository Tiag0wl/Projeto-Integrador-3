import {
  Users,
  MapPin,
  Clock,
  ThumbsUp,
  ThumbsDown,
  FileText,
} from "lucide-react";

import { useEffect, useState } from "react";
import { CustomDropdown } from "../components/CustomDropdown";
import { supabase } from "../lib/supabase";
import type { PageType } from "../App";

interface SocialPageProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<PageType>>;

  user: any;

  filterCity: string;
  setFilterCity: (value: string) => void;

  filterSeverity: string;
  setFilterSeverity: (value: string) => void;

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


  handleUsefulClick: (id: number) => void;
  handleNotUsefulClick: (id: number) => void;

  loadMoreReports: () => void;

  socialSort: Array<"popular" | "recent" | "nearby">;
  setSocialSort: React.Dispatch<
    React.SetStateAction<Array<"popular" | "recent" | "nearby">>
  >;

  locationStatus:
    | "unknown"
    | "loading"
    | "granted"
    | "denied"
    | "unavailable";
  userLocation: { latitude: number; longitude: number } | null;
}

export default function SocialPage({
  setCurrentPage,
  user,

  filterCity,
  setFilterCity,

  filterSeverity,
  setFilterSeverity,

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


  handleUsefulClick,
  handleNotUsefulClick,

  loadMoreReports,

  socialSort,
  setSocialSort,
  locationStatus,
  userLocation,
}: SocialPageProps) {
  const [socialInfoDismissed, setSocialInfoDismissed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadDismissedState = async () => {
      if (!user?.id) {
        setSocialInfoDismissed(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("dismissed_social_info")
        .eq("id", user.id)
        .maybeSingle();

      if (!cancelled && !error) {
        setSocialInfoDismissed(data?.dismissed_social_info === true);
      }
    };

    loadDismissedState();

    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const dismissSocialInfo = async () => {
    if (!user?.id) return;

    setSocialInfoDismissed(true);

    const { error } = await supabase
      .from("profiles")
      .update({ dismissed_social_info: true })
      .eq("id", user.id);

    if (error) {
      setSocialInfoDismissed(false);
      console.error("Erro ao dispensar mensagem da rede social:", error);
    }
  };

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
          className="bg-[#089448] hover:bg-[#087b3d] text-white rounded-md font-semibold text-[20px] transition-colors custom-button px-6 py-3"
        >
          + Criar Ocorrência
        </button>

      </div>

      {/* Filters */}
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-[6px_6px_8px_rgba(0,0,0,0.15)] mb-6 flex flex-wrap items-center gap-3 bg-[#f5f5f5]">

        <span className="font-medium text-gray-700">Filtros:</span>

        {/* Perigo */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 font-medium">Perigo:</span>
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

        {/* Data */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 font-medium">Data:</span>
          <input
            type="text"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            placeholder="DD/MM/AAAA"
            className="px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-32 bg-white"
          />
        </div>

        {/* Ordenação - os três critérios podem ficar ativos juntos */}
        <button
          type="button"
          onClick={() =>
            setSocialSort((current) =>
              current.includes("popular")
                ? current.filter((item) => item !== "popular")
                : [...current, "popular"]
            )
          }
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            socialSort.includes("popular")
              ? "bg-[#089448] text-white"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
          }`}
        >
          Mais populares
        </button>

        <button
          type="button"
          onClick={() =>
            setSocialSort((current) =>
              current.includes("recent")
                ? current.filter((item) => item !== "recent")
                : [...current, "recent"]
            )
          }
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            socialSort.includes("recent")
              ? "bg-[#089448] text-white"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
          }`}
        >
          Mais recentes
        </button>

        <button
          type="button"
          onClick={() =>
            setSocialSort((current) =>
              current.includes("nearby")
                ? current.filter((item) => item !== "nearby")
                : [...current, "nearby"]
            )
          }
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors inline-flex items-center gap-1 ${
            socialSort.includes("nearby")
              ? "bg-[#089448] text-white"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
          }`}
        >
          Próximas de você
        </button>

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

      {/* Info Box */}
      {!socialInfoDismissed && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mx-[0px] mt-[15px] mb-[17px]">
          <div className="flex items-end justify-between gap-4">
            <p className="text-sm text-blue-800">
              <strong>ℹ️ Como funciona:</strong> Clique em uma
              ocorrência para ver todos os relatos relacionados.
              Você pode ordenar por popularidade, data ou proximidade.
              No modo "Próximas de você", as ocorrências são ordenadas
              da mais próxima para a mais distante. Se você foi afetado
              pelo mesmo evento, adicione seu relato à ocorrência
              existente ao invés de criar uma nova.
            </p>

            {user && (
              <button
                type="button"
                onClick={dismissSocialInfo}
                className="shrink-0 text-sm font-medium text-blue-700 hover:text-blue-900 hover:underline transition-colors"
              >
                Dispensar
              </button>
            )}
          </div>
        </div>
      )}

      {/* Reports Grid */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 transition-all duration-200 ${isAnimating
            ? "opacity-0 scale-95"
            : "opacity-100 scale-100"
          }`}
      >

        {socialSort.includes("nearby") && !userLocation ? (

          <div className="col-span-full text-center py-12">
            <div className="text-gray-500">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-300" />

              <p className="text-lg font-medium mb-2">
                Localização necessária
              </p>

              <p className="text-sm">
                {!user
                  ? "Entre na sua conta para encontrar ocorrências próximas de você."
                  : locationStatus === "denied"
                    ? "Permita o acesso à sua localização no navegador para ordenar as ocorrências por proximidade."
                    : locationStatus === "loading"
                      ? "Estamos obtendo sua localização..."
                      : "Sua localização não está disponível no momento."}
              </p>
            </div>
          </div>

        ) : filteredReports.length > 0 ? (

          filteredReports
            .slice(0, reportsLimit)
            .map((report) => (

              <button
                key={report.id}
                onClick={() => setSelectedOccurrence(report)}
                className="border border-gray-300 rounded-xl shadow-[6px_6px_8px_rgba(0,0,0,0.15)] hover:shadow-[6px_6px_8px_rgba(0,0,0,0.22)] transition-all overflow-hidden text-left relative group bg-white hover:border-gray-200 hover:scale-[1.005]"
              >
                <div className="relative p-5 bg-white">
                  {/* User Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-12 h-12 ${getSocialProfileColor()} rounded-full flex items-center justify-center shrink-0`}
                    >
                      <Users className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-lg font-semibold truncate">
                        {report.user}
                      </p>
                      <p className="text-base text-gray-500">
                        + {report.others} pessoas
                      </p>
                    </div>

                    <span
                      className={`text-sm px-4 py-2 rounded-md ${report.severityColor} text-white font-semibold whitespace-nowrap`}
                    >
                      {report.severity}
                    </span>
                  </div>

                  {/* Event Type */}
                  <h3 className="text-[30px] md:text-[40px] leading-none font-bold mb-4 tracking-tight">
                    {report.type}
                  </h3>

                  {/* Localização */}
                  <div className="mb-2 flex items-center gap-2 text-base text-gray-600">
                    <MapPin className="w-5 h-5 shrink-0" />
                    <span>
                      {report.city || report.location.split(" - ")[0]}
                      {report.state ? ` - ${report.state}` : ""}
                      {report.neighborhood ? ` • Bairro ${report.neighborhood}` : ""}
                    </span>
                  </div>

                  {/* Data / hora + proximidade */}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-base text-gray-500 mb-5">
                    <p className="flex items-center gap-2 whitespace-nowrap">
                      <Clock className="w-5 h-5 shrink-0" />
                      <span>{report.date}</span>
                    </p>

                    {report.distanceKm != null && (
                      <p
                        className={`flex items-center gap-2 whitespace-nowrap ${
                          Number(report.distanceKm) <= 20
                            ? "font-bold text-gray-700"
                            : "text-gray-500"
                        }`}
                      >
                        <MapPin className="w-5 h-5 shrink-0" />
                        <span>
                          {Number(report.distanceKm) < 1
                            ? `${Math.round(Number(report.distanceKm) * 1000)} m de você`
                            : `${Number(report.distanceKm).toFixed(1)} km de você`}
                        </span>
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-6">
                      {/* Useful */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!user) {
                            setCurrentPage("login");
                            return;
                          }
                          handleUsefulClick(report.id);
                        }}
                        className={`flex items-center gap-2 text-lg font-medium ${
                          usefulReports[report.id]
                            ? "text-green-600"
                            : "text-gray-600 hover:text-green-600"
                        } transition-colors`}
                      >
                        <ThumbsUp className="w-5 h-5" />
                        <span className="text-xl font-semibold">
                          {usefulCounts[report.id] || 0}
                        </span>
                      </button>

                      {/* Not useful */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!user) {
                            setCurrentPage("login");
                            return;
                          }
                          handleNotUsefulClick(report.id);
                        }}
                        className={`flex items-center gap-2 text-lg font-medium ${
                          notUsefulReports[report.id]
                            ? "text-red-600"
                            : "text-gray-600 hover:text-red-600"
                        } transition-colors`}
                      >
                        <ThumbsDown className="w-5 h-5" />
                        <span className="text-xl font-semibold">
                          {notUsefulCounts[report.id] || 0}
                        </span>
                      </button>
                    </div>
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


    </div>
  );
}