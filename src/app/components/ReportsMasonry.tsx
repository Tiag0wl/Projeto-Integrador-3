import React from "react";
import Masonry from "react-masonry-css";
import ReportCard, { Subreport } from "./ReportCard";

interface MainReport {
  id: number;
  user: string;
  others: number;
  type: string;
  likes: number;
  dislikes: number;
}

interface ReportsMasonryProps {
  selectedOccurrence: MainReport | null;

  favoriteSelectedOccurrenceSubreports: Subreport[];
  regularSelectedOccurrenceSubreports: Subreport[];

  reportLikes: { [key: string]: number };
  reportDislikes: { [key: string]: number };

  userIndividualReportLikes: { [key: string]: boolean };
  userIndividualReportDislikes: { [key: string]: boolean };
  individualFavoriteReports: { [key: string]: boolean };

  handleIndividualReportLike: (reportKey: string) => void;
  handleIndividualReportDislike: (reportKey: string) => void;
  toggleIndividualFavoriteReport: (reportKey: string) => void;

  toggleFavorite: (reportId: number) => void;
  isOccurrenceFavorited: (reportId: number) => boolean;

  getProfileColor: (name: string) => string;
  getInitial: (name: string) => string;
}

const ReportsMasonry: React.FC<ReportsMasonryProps> = ({
  selectedOccurrence,
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
  toggleFavorite,
  isOccurrenceFavorited,
  getProfileColor,
  getInitial,
}) => {
  if (!selectedOccurrence) {
    return null;
  }

  const breakpointColumnsObj = {
    default: 2,
    1024: 2,
    768: 1,
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Relatos ({selectedOccurrence.others + 1})
      </h2>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex -ml-4 w-auto"
        columnClassName="pl-4 bg-clip-padding"
      >
        {/* Relato principal */}
        <div className="mb-4">
          <ReportCard
            report={selectedOccurrence}
            isMain
            reportLikes={reportLikes}
            reportDislikes={reportDislikes}
            userIndividualReportLikes={userIndividualReportLikes}
            userIndividualReportDislikes={userIndividualReportDislikes}
            individualFavoriteReports={individualFavoriteReports}
            handleIndividualReportLike={handleIndividualReportLike}
            handleIndividualReportDislike={handleIndividualReportDislike}
            toggleIndividualFavoriteReport={
              toggleIndividualFavoriteReport
            }
            toggleFavorite={toggleFavorite}
            isOccurrenceFavorited={isOccurrenceFavorited}
            getProfileColor={getProfileColor}
            getInitial={getInitial}
          />
        </div>

        {/* Relatos favoritos */}
        {favoriteSelectedOccurrenceSubreports.map((report) => (
          <div key={report.key} className="mb-4">
            <ReportCard
              report={report}
              isFavorite
              reportLikes={reportLikes}
              reportDislikes={reportDislikes}
              userIndividualReportLikes={userIndividualReportLikes}
              userIndividualReportDislikes={
                userIndividualReportDislikes
              }
              individualFavoriteReports={individualFavoriteReports}
              handleIndividualReportLike={
                handleIndividualReportLike
              }
              handleIndividualReportDislike={
                handleIndividualReportDislike
              }
              toggleIndividualFavoriteReport={
                toggleIndividualFavoriteReport
              }
              toggleFavorite={toggleFavorite}
              isOccurrenceFavorited={isOccurrenceFavorited}
              getProfileColor={getProfileColor}
              getInitial={getInitial}
            />
          </div>
        ))}

        {/* Relatos normais */}
        {regularSelectedOccurrenceSubreports.map((report) => (
          <div key={report.key} className="mb-4">
            <ReportCard
              report={report}
              reportLikes={reportLikes}
              reportDislikes={reportDislikes}
              userIndividualReportLikes={userIndividualReportLikes}
              userIndividualReportDislikes={
                userIndividualReportDislikes
              }
              individualFavoriteReports={individualFavoriteReports}
              handleIndividualReportLike={
                handleIndividualReportLike
              }
              handleIndividualReportDislike={
                handleIndividualReportDislike
              }
              toggleIndividualFavoriteReport={
                toggleIndividualFavoriteReport
              }
              toggleFavorite={toggleFavorite}
              isOccurrenceFavorited={isOccurrenceFavorited}
              getProfileColor={getProfileColor}
              getInitial={getInitial}
            />
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default ReportsMasonry;