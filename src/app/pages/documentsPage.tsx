import { FileText, Download } from "lucide-react";

interface Document {
  id: number;
  category: string;
  title: string;
  description: string;
  pages: number;
  size: string;
  downloads: number;
}

interface DocumentsPageProps {
  categories: string[];
  selectedCategory: string;
  handleFilterChange: (category: string) => void;
  filteredDocuments: Document[];
  documentsLimit: number;
  isAnimating: boolean;
  loadMoreDocuments: () => void;
}

export default function DocumentsPage({
  categories,
  selectedCategory,
  handleFilterChange,
  filteredDocuments,
  documentsLimit,
  isAnimating,
  loadMoreDocuments,
}: DocumentsPageProps) {
  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[#ffcb04]">
          <FileText className="w-6 h-6 text-white" />
        </div>

        <div>
          <h1 className="text-3xl font-bold">
            Documentos e Recursos
          </h1>

          <p className="text-gray-600">
            Material educativo sobre catástrofes climáticas
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-[6px_6px_8px_rgba(0,0,0,0.15)] mb-4 bg-[#f5f5f5]">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="font-medium text-gray-700">
            Categoria:
          </span>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilterChange(category)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-[#ffb000] text-white hover:bg-[#ffb000]"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-200 ${
          isAnimating
            ? "opacity-0 scale-95"
            : "opacity-100 scale-100"
        }`}
      >
        {filteredDocuments
          .slice(0, documentsLimit)
          .map((doc) => (
            <div
              key={doc.id}
              className="bg-white p-4 border border-gray-200 rounded-lg shadow-[6px_6px_8px_rgba(0,0,0,0.15)] hover:shadow-[6px_6px_8px_rgba(0,0,0,0.25)] transition-all bg-[#f5f5f5] hover:scale-101"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[#fbf2d7]">
                  <FileText className="w-6 h-6 text-[#FFCB04]" />
                </div>

                <span className="font-semibold px-2 py-1 bg-gray-100 text-gray-700 rounded text-[15px]">
                  {doc.category}
                </span>
              </div>

              <h3 className="font-bold text-lg mb-2">
                {doc.title}
              </h3>

              <p className="text-sm text-gray-600 mb-4">
                {doc.description}
              </p>

              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                <span>{doc.pages} páginas</span>
                <span>•</span>
                <span>{doc.size}</span>
                <span>•</span>
                <span>{doc.downloads} downloads</span>
              </div>

              <button className="w-full bg-[#FFCB04] hover:bg-[#ffb000] text-white py-2 rounded-md font-medium transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Baixar PDF
              </button>
            </div>
          ))}
      </div>

      {/* Load More Button */}
      {filteredDocuments.length > documentsLimit && (
        <div className="text-center mt-6">
          <button
            onClick={loadMoreDocuments}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mx-auto hover:scale-105 transition-transform"
          >
            <span>Carregar mais...</span>
          </button>
        </div>
      )}

      {/* Info Box */}
      <div className="border border-green-300 rounded-lg p-6 mt-8 bg-[#dcfce7]">
        <h3 className="font-bold text-lg mb-2 text-[#0cc561]">
          Sobre estes documentos
        </h3>

        <p className="text-sm text-[#0cc561]">
          Todos os materiais disponibilizados aqui são baseados
          em fontes oficiais e científicas confiáveis. Nosso
          objetivo é fornecer informação de qualidade para que
          você possa se preparar adequadamente e entender melhor
          a crise climática que enfrentamos. O conhecimento é a
          primeira linha de defesa.
        </p>
      </div>
    </div>
  );
}