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
  description?: string;
}

interface ReportsMasonryProps {
  selectedOccurrence: MainReport;
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

export default function ReportsMasonry({
  selectedOccurrence,
  selectedOccurrenceSubreports,
  reportLikes,
  reportDislikes,
  userIndividualReportLikes,
  userIndividualReportDislikes,
  handleIndividualReportLike,
  handleIndividualReportDislike,
  getProfileColor,
  getInitial,
}: ReportsMasonryProps) {
  const breakpointColumnsObj = {
    default: 2,
    1100: 2,
    700: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex w-auto -ml-4"
      columnClassName="pl-4 bg-clip-padding"
    >
      {/* Ocorrência principal */}
      <div className="mb-4">
        <ReportCard
          report={selectedOccurrence}
          isMain
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

      {/* Relatos */}
      {selectedOccurrenceSubreports.map((subreport) => (
        <div key={subreport.key} className="mb-4">
          <ReportCard
            report={subreport}
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
      ))}
    </Masonry>
  );
}