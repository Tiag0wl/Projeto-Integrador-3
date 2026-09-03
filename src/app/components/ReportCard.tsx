import React from "react";
import {
  Camera,
  Image as ImageIcon,
  Video,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

export interface Subreport {
  key: string;
  author: string;
  description: string;
  hasMedia: boolean;
  likes: number;
  dislikes: number;
}

interface MainReport {
  id: number;
  user: string;
  others: number;
  type: string;
  likes: number;
  dislikes: number;
  description?: string;
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
}) => {
  if (isMain) {
    const mainReport = report as MainReport;
    const mainKey = `${mainReport.id}-main`;

    const description = mainReport.description ||
      (mainReport.type.toUpperCase() === "GRANIZO"
        ? "Granizo intenso atingiu a região. Pedras grandes causaram danos em veículos e telhados."
        : mainReport.type.toUpperCase() === "ALAGAMENTO"
          ? "Ruas completamente alagadas. Água chegou a 50cm de altura em alguns pontos."
          : mainReport.type.toUpperCase() === "VENDAVAL"
            ? "Ventos muito fortes derrubaram árvores e placas. Muito perigoso."
            : `${mainReport.type.toLowerCase()} afetou toda a região. Situação crítica.`);

    return (
      <div className="break-inside-avoid bg-white border-gray-300 rounded-lg shadow-[6px_6px_8px_rgba(0,0,0,0.15)] p-4 border-l-4 border-green-500 bg-[#f5f5f5]">
        <div className="flex items-start gap-3 mb-3">
          <div className={`w-10 h-10 ${getProfileColor(mainReport.user)} rounded-full flex items-center justify-center`}>
            <span className="text-white text-lg font-bold">{getInitial(mainReport.user)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-semibold text-sm truncate">{mainReport.user}</p>
              <span className="text-xs text-gray-500">• ocorrência</span>
            </div>
            <p className="text-xs text-green-600 font-medium">Relato principal da ocorrência</p>
          </div>
        </div>

        <p className="text-sm text-gray-700 mb-3">{description}</p>

        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="aspect-square bg-gray-200 rounded flex items-center justify-center text-gray-400"><Camera className="w-5 h-5" /></div>
          <div className="aspect-square bg-gray-200 rounded flex items-center justify-center text-gray-400"><ImageIcon className="w-5 h-5" /></div>
          <div className="aspect-square bg-gray-200 rounded flex items-center justify-center text-gray-400"><Video className="w-5 h-5" /></div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm pt-3 border-t border-gray-100">
          <button
            onClick={(e) => { e.stopPropagation(); handleIndividualReportLike(mainKey); }}
            className={`flex items-center gap-1 rounded-md px-2 py-1 text-sm transition ${userIndividualReportLikes[mainKey] ? "bg-green-100 text-green-700" : "text-gray-600 hover:text-green-700 hover:bg-green-50"}`}
          >
            <ThumbsUp className="w-4 h-4" />
            <span>{reportLikes[mainKey] ?? mainReport.likes}</span>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleIndividualReportDislike(mainKey); }}
            className={`flex items-center gap-1 rounded-md px-2 py-1 text-sm transition ${userIndividualReportDislikes[mainKey] ? "bg-red-100 text-red-700" : "text-gray-600 hover:text-red-700 hover:bg-red-50"}`}
          >
            <ThumbsDown className="w-4 h-4" />
            <span>{reportDislikes[mainKey] ?? mainReport.dislikes}</span>
          </button>
        </div>
      </div>
    );
  }

  const subreport = report as Subreport;

  return (
    <div className="break-inside-avoid bg-white rounded-lg shadow-sm p-4 bg-[#f5f5f5]">
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-10 h-10 ${getProfileColor(subreport.author)} rounded-full flex items-center justify-center`}>
          <span className="text-white text-lg font-bold">{getInitial(subreport.author)}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-semibold text-sm truncate">{subreport.author}</p>
            <span className="text-xs text-gray-500">• relato</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-700 mb-3">{subreport.description}</p>

      {subreport.hasMedia && (
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="aspect-square bg-gray-200 rounded flex items-center justify-center text-gray-400"><Camera className="w-5 h-5" /></div>
          <div className="aspect-square bg-gray-200 rounded flex items-center justify-center text-gray-400"><ImageIcon className="w-5 h-5" /></div>
          <div className="aspect-square bg-gray-200 rounded flex items-center justify-center text-gray-400"><Video className="w-5 h-5" /></div>
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
      </div>
    </div>
  );
};

export default ReportCard;