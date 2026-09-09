import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ReportCard, { Subreport } from "./ReportCard";

interface MainReport {
  id: number;
  user: string;
  others: number;
  type: string;
  likes: number;
  dislikes: number;
  neighborhood?: string;
  severity?: string;
  personalSeverity?: string;
  occurredAt?: string | null;
  date?: string;
  mediaFiles?: Array<{ url: string; name?: string; type?: string }>;
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
  currentUserId?: string | null;
  onDeleteReport?: (reportId: string) => void | Promise<void>;
}

interface MasonryItem {
  key: string;
  report: MainReport | Subreport;
  isMain?: boolean;
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
  currentUserId,
  onDeleteReport,
}: ReportsMasonryProps) {
  const [columnCount, setColumnCount] = useState(2);
  const [columnItems, setColumnItems] = useState<MasonryItem[][]>([[], []]);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const layoutFrame = useRef<number | null>(null);

  const items: MasonryItem[] = [
    {
      key: `occurrence-${selectedOccurrence.id}`,
      report: selectedOccurrence,
      isMain: true,
    },
    ...selectedOccurrenceSubreports.map((subreport) => ({
      key: `report-${subreport.key}`,
      report: subreport,
      isMain: false,
    })),
  ];

  // Mantém 2 colunas no desktop e 1 no mobile.
  useEffect(() => {
    const updateColumns = () => {
      setColumnCount(window.innerWidth <= 700 ? 1 : 2);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);

    return () => {
      window.removeEventListener("resize", updateColumns);
    };
  }, []);

  // Distribuição inicial simples enquanto as alturas ainda não foram medidas.
  useEffect(() => {
    const initialColumns: MasonryItem[][] = Array.from(
      { length: columnCount },
      () => []
    );

    items.forEach((item, index) => {
      initialColumns[index % columnCount].push(item);
    });

    setColumnItems(initialColumns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOccurrence.id, selectedOccurrenceSubreports, columnCount]);

  // Depois que os cards aparecem, mede suas alturas e coloca cada próximo
  // card na coluna que estiver menor, eliminando os grandes espaços vazios.
  useLayoutEffect(() => {
    if (columnCount === 1 || items.length === 0) return;

    if (layoutFrame.current !== null) {
      cancelAnimationFrame(layoutFrame.current);
    }

    layoutFrame.current = requestAnimationFrame(() => {
      const heights = new Map<string, number>();

      items.forEach((item) => {
        const element = itemRefs.current[item.key];
        if (element) {
          heights.set(item.key, element.getBoundingClientRect().height);
        }
      });

      // Só reorganiza quando todos os cards já tiverem uma altura mensurável.
      if (heights.size !== items.length) return;

      const columns: MasonryItem[][] = Array.from(
        { length: columnCount },
        () => []
      );
      const columnHeights = Array(columnCount).fill(0) as number[];

      // Mantém a ordem dos relatos e, a cada card, escolhe a coluna
      // atualmente mais curta.
      items.forEach((item) => {
        let shortestColumn = 0;

        for (let i = 1; i < columnCount; i++) {
          if (columnHeights[i] < columnHeights[shortestColumn]) {
            shortestColumn = i;
          }
        }

        columns[shortestColumn].push(item);
        columnHeights[shortestColumn] += heights.get(item.key) || 0;
      });

      setColumnItems((previous) => {
        const previousKeys = previous.map((column) =>
          column.map((item) => item.key).join("|")
        );
        const nextKeys = columns.map((column) =>
          column.map((item) => item.key).join("|")
        );

        if (previousKeys.join("||") === nextKeys.join("||")) {
          return previous;
        }

        return columns;
      });
    });

    return () => {
      if (layoutFrame.current !== null) {
        cancelAnimationFrame(layoutFrame.current);
        layoutFrame.current = null;
      }
    };
    // Recalcula quando os itens ou a quantidade de colunas mudarem.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnItems, columnCount, selectedOccurrence.id, selectedOccurrenceSubreports]);

  // Se uma imagem/vídeo terminar de carregar e mudar a altura do card,
  // recalcula o posicionamento automaticamente.
  useEffect(() => {
    if (columnCount === 1) return;

    const resizeObserver = new ResizeObserver(() => {
      if (layoutFrame.current !== null) {
        cancelAnimationFrame(layoutFrame.current);
      }

      layoutFrame.current = requestAnimationFrame(() => {
        const heights = new Map<string, number>();

        items.forEach((item) => {
          const element = itemRefs.current[item.key];
          if (element) {
            heights.set(item.key, element.getBoundingClientRect().height);
          }
        });

        if (heights.size !== items.length) return;

        const columns: MasonryItem[][] = Array.from(
          { length: columnCount },
          () => []
        );
        const columnHeights = Array(columnCount).fill(0) as number[];

        items.forEach((item) => {
          let shortestColumn = 0;

          for (let i = 1; i < columnCount; i++) {
            if (columnHeights[i] < columnHeights[shortestColumn]) {
              shortestColumn = i;
            }
          }

          columns[shortestColumn].push(item);
          columnHeights[shortestColumn] += heights.get(item.key) || 0;
        });

        setColumnItems((previous) => {
          const previousKeys = previous.map((column) =>
            column.map((item) => item.key).join("|")
          );
          const nextKeys = columns.map((column) =>
            column.map((item) => item.key).join("|")
          );

          return previousKeys.join("||") === nextKeys.join("||")
            ? previous
            : columns;
        });
      });
    });

    Object.values(itemRefs.current).forEach((element) => {
      if (element) resizeObserver.observe(element);
    });

    return () => {
      resizeObserver.disconnect();

      if (layoutFrame.current !== null) {
        cancelAnimationFrame(layoutFrame.current);
        layoutFrame.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnItems, columnCount, selectedOccurrence.id, selectedOccurrenceSubreports]);

  const renderItem = (item: MasonryItem) => (
    <div
      key={item.key}
      ref={(element) => {
        itemRefs.current[item.key] = element;
      }}
      className="mb-6"
    >
      <ReportCard
        report={item.report}
        isMain={item.isMain}
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
      />
    </div>
  );

  return (
    <div className="w-full">
      <div
        className={
          columnCount === 1
            ? "w-full"
            : "grid grid-cols-2 gap-4 items-start"
        }
      >
        {columnItems.map((column, columnIndex) => (
          <div key={columnIndex} className="min-w-0">
            {column.map(renderItem)}
          </div>
        ))}
      </div>
    </div>
  );
}