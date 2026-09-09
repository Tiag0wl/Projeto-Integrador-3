import React from "react";
import MediaViewer, {
  MediaFile,
} from "../components/mediaViewer";
import videoPlayIcon from "./playIcon.png"; 
import {
  ThumbsUp,
  ThumbsDown,
  Trash2,
} from "lucide-react";

export interface Subreport {
  key: string;
  author: string;
  description: string;
  hasMedia: boolean;
  neighborhood: string;
  severity: string;
  createdAt?: string | null;
  likes: number;
  dislikes: number;
  mediaFiles?: MediaFile[];
  userId?: string | null;
}

interface MainReport {
  id: number;
  user: string;
  others: number;
  type: string;
  likes: number;
  dislikes: number;
  description?: string;
  mediaFiles?: MediaFile[];
  neighborhood?: string;
  severity?: string;
  personalSeverity?: string;
  occurredAt?: string | null;
  date?: string;
}

interface ReportCardProps {
  report: MainReport | Subreport;
  isMain?: boolean;
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
}

const ReportCard: React.FC<ReportCardProps> = ({
  report,
  isMain = false,
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
}) => {
  const [viewerOpen, setViewerOpen] = React.useState(false);
  const [viewerIndex, setViewerIndex] = React.useState(0);
  const [isConfirmingDelete, setIsConfirmingDelete] = React.useState(false);

  const openMedia = (index: number) => {
    setViewerIndex(index);
    setViewerOpen(true);
  };

  const formatDate = (date?: string | null) => {
    if (!date) return "Data não informada";

    const formattedDate = date.match(/^(\d{2}\/\d{2}\/\d{4})(?:\s*-\s*\d{2}:\d{2})?$/);
    if (formattedDate) return formattedDate[1];

    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) return "Data não informada";

    return parsedDate.toLocaleDateString("pt-BR");
  };

  const formatTime = (date?: string | null) => {
    if (!date) return "Horário não informado";

    const formattedTime = date.match(/^\d{2}\/\d{2}\/\d{4}\s*-\s*(\d{2}:\d{2})$/);
    if (formattedTime) return formattedTime[1];

    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) return "Horário não informado";

    return parsedDate.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatSeverity = (severity?: string) =>
    (severity || "Perigo Baixo").replace(/^Perigo\s+/i, "");

  if (isMain) {
    const mainReport = report as MainReport;
    const mainKey = `${mainReport.id}-main`;

    const mainMedia = Array.isArray(mainReport.mediaFiles)
      ? mainReport.mediaFiles.filter((file) => file?.url)
      : [];

    return (
      <div className="break-inside-avoid bg-white border border-gray-300 rounded-lg shadow-[6px_6px_8px_rgba(0,0,0,0.15)] p-4 bg-[#f5f5f5]">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className={`w-10 h-10 ${getProfileColor(mainReport.user)} rounded-full flex items-center justify-center flex-shrink-0`}>
              <span className="text-white text-lg font-bold">{getInitial(mainReport.user)}</span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold text-sm truncate">{mainReport.user}</p>
                <span className="text-xs text-gray-500">
                  • {formatDate(mainReport.occurredAt || mainReport.date)}
                </span>
              </div>

              <p className="text-xs text-gray-500">
                Bairro: {mainReport.neighborhood || "Não informado"} • {formatTime(mainReport.occurredAt || mainReport.date)}
              </p>
            </div>
          </div>

          <span className="text-sm text-gray-500 font-semibold text-right whitespace-nowrap flex-shrink-0">
            Perigo sofrido: {formatSeverity(mainReport.personalSeverity)}
          </span>
        </div>

        {mainReport.description && (
          <p className="text-sm text-gray-700 mb-3">{mainReport.description}</p>
        )}

        {mainMedia.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mb-3">
            {mainMedia.slice(0, 3).map((file, index) => {
              const type = file.type || "";
              const isVideo =
                type.startsWith("video/") ||
                /\.(mp4|webm|mov|avi|mkv)$/i.test(file.url);

              return (
                <div
                  key={`${file.url}-${index}`}
                  className="aspect-square rounded overflow-hidden bg-gray-200 relative group cursor-pointer"
                  onClick={() => !isVideo && openMedia(index)}
                  role={!isVideo ? "button" : undefined}
                  tabIndex={!isVideo ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (!isVideo && (e.key === "Enter" || e.key === " ")) {
                      e.preventDefault();
                      openMedia(index);
                    }
                  }}
                >
                  {isVideo ? (
                    <video
                      src={file.url}
                      controls
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200 cursor-pointer"
                    />
                  ) : (
                    <img
                      src={file.url}
                      alt={file.name || "Imagem da ocorrência"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200 cursor-pointer"
                      loading="lazy"
                    />
                  )}

                  {isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                      <img
                        src={videoPlayIcon}
                        alt=""
                        aria-hidden="true"
                        className="w-16 h-16 object-contain drop-shadow-lg"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 text-sm pt-3 border-t border-gray-100">
          <button
            onClick={(e) => { e.stopPropagation(); handleIndividualReportLike(mainKey); }}
            className={`flex items-center gap-1 rounded-md px-2 py-1 transition ${userIndividualReportLikes[mainKey] ? "bg-green-100 text-green-700" : "text-gray-600 hover:text-green-700 hover:bg-green-50"}`}
          >
            <ThumbsUp className="w-4 h-4" />
            <span>{reportLikes[mainKey] ?? mainReport.likes}</span>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); handleIndividualReportDislike(mainKey); }}
            className={`flex items-center gap-1 rounded-md px-2 py-1 transition ${userIndividualReportDislikes[mainKey] ? "bg-red-100 text-red-700" : "text-gray-600 hover:text-red-700 hover:bg-red-50"}`}
          >
            <ThumbsDown className="w-4 h-4" />
            <span>{reportDislikes[mainKey] ?? mainReport.dislikes}</span>
          </button>
        </div>

        {mainMedia.length > 0 && viewerOpen && (
          <MediaViewer
            files={mainMedia}
            initialIndex={viewerIndex}
            onClose={() => setViewerOpen(false)}
          />
        )}
      </div>
    );
  }

  const subreport = report as Subreport;

  const canDelete =
    !!currentUserId &&
    !!subreport.userId &&
    currentUserId === subreport.userId;

  const mediaFiles = Array.isArray(subreport.mediaFiles)
    ? subreport.mediaFiles.filter((file) => file?.url)
    : [];

  return (
    <div className="relative break-inside-avoid bg-white border border-gray-300 rounded-lg shadow-[6px_6px_8px_rgba(0,0,0,0.15)] p-4 bg-[#f5f5f5]">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className={`w-10 h-10 ${getProfileColor(subreport.author)} rounded-full flex items-center justify-center flex-shrink-0`}>
            <span className="text-white text-lg font-bold">{getInitial(subreport.author)}</span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-semibold text-sm truncate">{subreport.author}</p>
              <span className="text-xs text-gray-500">
                • {formatDate(subreport.createdAt)}
              </span>
            </div>

            <p className="text-xs text-gray-500">
              Bairro: {subreport.neighborhood || "Não informado"} • {formatTime(subreport.createdAt)}
            </p>
          </div>
        </div>

        <span className="text-sm text-gray-500 font-semibold text-right whitespace-nowrap flex-shrink-0">
          Perigo sofrido: {formatSeverity(subreport.severity)}
        </span>
      </div>

      <p className="text-sm text-gray-700 mb-3">{subreport.description}</p>

      {subreport.hasMedia && subreport.mediaFiles && subreport.mediaFiles.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-3">
          {subreport.mediaFiles.map((file, index) => {
            const video =
              file.type?.startsWith("video/") ||
              /\.(mp4|webm|ogg|mov|m4v)(\?|$)/i.test(file.url);

            return (
              <button
                key={`${file.url}-${index}`}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openMedia(index);
                }}
                className="aspect-square rounded-lg overflow-hidden bg-gray-200 relative group cursor-pointer"
              >
                {video ? (
                  <video
                    src={file.url}
                    muted
                    preload="metadata"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200 cursor-pointer"
                  />
                ) : (
                  <img
                    src={file.url}
                    alt={file.name || "Imagem do relato"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200 cursor-pointer"
                  />
                )}

                {video && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                    <img
                      src={videoPlayIcon}
                      alt=""
                      aria-hidden="true"
                      className="w-16 h-16 object-contain drop-shadow-lg"
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 text-sm pt-3 border-t border-gray-100">
        <button
          onClick={(e) => { e.stopPropagation(); handleIndividualReportLike(subreport.key); }}
          className={`flex items-center gap-1 rounded-md px-2 py-1 transition ${userIndividualReportLikes[subreport.key] ? "bg-green-100 text-green-700" : "text-gray-600 hover:text-green-700 hover:bg-green-50"}`}
        >
          <ThumbsUp className="w-4 h-4" />
          <span>{reportLikes[subreport.key] ?? subreport.likes}</span>
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); handleIndividualReportDislike(subreport.key); }}
          className={`flex items-center gap-1 rounded-md px-2 py-1 transition ${userIndividualReportDislikes[subreport.key] ? "bg-red-100 text-red-700" : "text-gray-600 hover:text-red-700 hover:bg-red-50"}`}
        >
          <ThumbsDown className="w-4 h-4" />
          <span>{reportDislikes[subreport.key] ?? subreport.dislikes}</span>
        </button>

        {canDelete && onDeleteReport && (
          <button
            type="button"
            title="Apagar relato"
            aria-label="Apagar relato"
            onClick={(e) => {
              e.stopPropagation();
              setIsConfirmingDelete(true);
            }}
            className="ml-auto w-10 h-10 rounded-full bg-red-100 text-red-500 hover:bg-red-200 hover:text-red-600 flex items-center justify-center transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>

      {subreport.mediaFiles &&
        subreport.mediaFiles.length > 0 &&
        viewerOpen && (
          <MediaViewer
            files={subreport.mediaFiles}
            initialIndex={viewerIndex}
            onClose={() => setViewerOpen(false)}
          />
        )}

      {isConfirmingDelete && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-white/20 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xs rounded-lg border border-gray-200 bg-white p-4 text-center shadow-lg">
            <p className="text-sm font-semibold text-gray-800">
              Deseja mesmo apagar o relato?
            </p>

            <div className="mt-4 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsConfirmingDelete(false)}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Não
              </button>

              <button
                type="button"
                onClick={async () => {
                  await onDeleteReport?.(subreport.key);
                  setIsConfirmingDelete(false);
                }}
                className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
              >
                Sim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportCard;