import {
  MapPin,
  Shield,
  AlertTriangle,
  Newspaper,
  ExternalLink,
} from "lucide-react";

import {ImageWithFallback } from "../components/ImageWithFallback.tsx";
import type { PageType } from "../App";

interface News {
  id: string | number;
  link: string;
  image: string;
  title: string;
  category: string;
  date: string;
  summary: string;
}

interface HomePageProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<PageType>>;
  getRandomAlertMessage: () => React.ReactNode;
  getRandomAlertDescription: () => React.ReactNode;
  mockNews: any[];
}

export default function HomePage({
  setCurrentPage,
  getRandomAlertMessage,
  getRandomAlertDescription,
  mockNews,
}: HomePageProps) {
  return (
    <div>
      {/* Hero principal */}
      <div className="relative overflow-hidden text-white rounded-2xl p-8 mb-8 bg-[#1e8549]">

        {/* Formas geométricas */}
        <div className="absolute -top-10 -right-10 w-64 h-64 opacity-30 rounded-tl-full bg-[#45b52b]" />

        <div className="absolute -bottom-16 -left-16 w-72 h-72 opacity-40 rounded-br-full bg-[#306746]" />

        {/* Conteúdo */}
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-3">
            Informação que salva vidas
          </h1>

          <p className="text-white/90 mb-6 max-w-xl">
            Acompanhe alertas em tempo real, acesse orientações
            de segurança e compartilhe relatos sobre eventos
            climáticos na sua região. Juntos somos mais fortes.
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => setCurrentPage("social")}
              className="bg-yellow-400 text-black px-5 py-2 rounded-lg font-medium hover:scale-105 transition flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              Ver relatos próximos
            </button>

            <button
              onClick={() => setCurrentPage("safety")}
              className="border border-white/40 px-5 py-2 rounded-lg hover:bg-white/10 transition flex items-center gap-2"
            >
              <Shield className="w-4 h-4" />
              Orientações
            </button>
          </div>
        </div>
      </div>

      {/* Alerta */}
      <div className="relative overflow-hidden bg-[#dc2626] text-white rounded-2xl p-8 mb-8">

        {/* Formas geométricas */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-orange-400 opacity-30 rounded-bl-full" />

        <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-red-900 opacity-40 rounded-tr-full" />

        {/* Conteúdo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-8 h-8" />

            <h2 className="text-2xl font-bold">
              {getRandomAlertMessage()}
            </h2>
          </div>

          <p className="text-white/90 mb-6 max-w-xl">
            {getRandomAlertDescription()}
          </p>

          <button
            onClick={() => setCurrentPage("documents")}
            className="text-white text-lg font-medium hover:scale-105 transition inline-block"
          >
            Clique para saber mais →
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-6 rounded-lg shadow-[6px_6px_8px_rgba(0,0,0,0.25)] border-l-4 border-red-500 bg-[#f2f2f2]">
          <div className="text-3xl font-bold text-red-600 mb-2">
            +300%
          </div>

          <p className="text-gray-600">
            Aumento em desastres naturais na última década
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-[6px_6px_8px_rgba(0,0,0,0.25)] border-l-4 border-orange-500 bg-[#f2f2f2]">
          <div className="text-3xl font-bold text-orange-600 mb-2">
            1.5°C
          </div>

          <p className="text-gray-600">
            Aumento da temperatura global desde era
            pré-industrial
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-[6px_6px_8px_rgba(0,0,0,0.25)] border-l-4 border-yellow-500 bg-[#f2f2f2]">
          <div className="text-3xl font-bold mb-2 text-[#f6a511]">
            Milhões
          </div>

          <p className="text-gray-600">
            De pessoas afetadas por eventos climáticos
            extremos anualmente
          </p>
        </div>
      </div>

      {/* Notícias */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Newspaper className="w-6 h-6 text-gray-700" />

          <h2 className="text-2xl font-bold">
            Últimas Notícias
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockNews.map((news) => (
            <a
              key={news.id}
              href={news.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#ffffff] rounded-lg shadow-[6px_6px_8px_rgba(0,0,0,0.15)] hover:shadow-lg transition-all overflow-hidden text-left hover:scale-102 transform hover:border-2 hover:border-gray-200 border-2 border-transparent relative group block"
            >
              <ImageWithFallback
                src={news.image}
                alt={news.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      news.category === "Crítico"
                        ? "bg-red-100 text-red-700"
                        : news.category === "Alerta"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {news.category}
                  </span>

                  <span className="text-sm text-gray-500">
                    {news.date}
                  </span>
                </div>

                <h3 className="font-bold text-lg mb-2">
                  {news.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4">
                  {news.summary}
                </p>

                <span className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-2">
                  Ler mais
                  <ExternalLink className="w-4 h-4" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
        <h3 className="text-xl font-bold text-green-800 mb-2">
          Faça sua parte!
        </h3>

        <p className="text-green-700 mb-4">
          Compartilhe informações sobre eventos climáticos
          na sua região. Sua contribuição pode salvar vidas
          e ajudar a construir comunidades mais resilientes.
        </p>

        <button
          onClick={() => setCurrentPage("social")}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
        >
          Relatar Ocorrência
        </button>
      </div>
    </div>
  );
}