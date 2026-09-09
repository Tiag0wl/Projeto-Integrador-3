import React, { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface MediaFile {
  url: string;
  name?: string;
  type?: string;
}

interface MediaViewerProps {
  files: MediaFile[];
  initialIndex?: number;
  onClose: () => void;
}

const isVideo = (file: MediaFile) => {
  const type = file.type?.toLowerCase() || "";
  const url = file.url.toLowerCase();

  return (
    type.startsWith("video/") ||
    /\.(mp4|webm|ogg|mov|m4v)(\?|$)/i.test(url)
  );
};

const MediaViewer: React.FC<MediaViewerProps> = ({
  files,
  initialIndex = 0,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const currentFile = files[currentIndex];

  const previous = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? files.length - 1 : prev - 1
    );
  };

  const next = () => {
    setCurrentIndex((prev) =>
      prev === files.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [files.length]);

  if (!currentFile) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg"
      >
        <X className="w-6 h-6 text-gray-800" />
      </button>

      {files.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              previous();
            }}
            className="absolute left-4 md:left-8 z-10 w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg"
          >
            <ChevronLeft className="w-7 h-7 text-gray-800" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 md:right-8 z-10 w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg"
          >
            <ChevronRight className="w-7 h-7 text-gray-800" />
          </button>
        </>
      )}

      <div
        className="relative max-w-6xl max-h-[90vh] w-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {isVideo(currentFile) ? (
          <video
            src={currentFile.url}
            controls
            autoPlay
            className="max-h-[85vh] max-w-full rounded-lg shadow-2xl object-contain"
          />
        ) : (
          <img
            src={currentFile.url}
            alt={currentFile.name || "Mídia do relato"}
            className="max-h-[85vh] max-w-full rounded-lg shadow-2xl object-contain"
          />
        )}

        {files.length > 1 && (
          <div className="absolute bottom-[-35px] left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
            {currentIndex + 1} / {files.length}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaViewer;