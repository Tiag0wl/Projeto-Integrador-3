import {
  Bell,
  FileText,
  Mail,
  LogOut,
  Star,
} from "lucide-react";

interface ProfilePageProps {
  user: any;
  profileTab: "notificacoes" | "relatos" | "favoritos";
  setProfileTab: (
    tab: "notificacoes" | "relatos" | "favoritos"
  ) => void;

  notifications: string[];
  reports: any[];
  favorites: number[];

  signOut: () => void;

  getProfileColor: (user: string) => string;
  getInitial: (user: string) => string;
}

export default function ProfilePage({
  user,
  profileTab,
  setProfileTab,
  notifications,
  reports,
  favorites,
  signOut,
  getProfileColor,
  getInitial,
}: ProfilePageProps) {
  return (
    <div>
      {/* Card de Informações do Usuário */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {user?.user_metadata?.display_name
              ?.charAt(0)
              .toUpperCase() || "U"}
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              {user?.user_metadata?.display_name || "Usuário"}
            </h1>

            <p className="text-gray-600 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {user?.email || "email@exemplo.com"}
            </p>
          </div>

          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      </div>

      {/* Abas */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setProfileTab("notificacoes")}
            className={`flex-1 px-6 py-3 font-medium transition-colors ${
              profileTab === "notificacoes"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Bell className="w-4 h-4" />
              Notificações
            </div>
          </button>

          <button
            onClick={() => setProfileTab("relatos")}
            className={`flex-1 px-6 py-3 font-medium transition-colors ${
              profileTab === "relatos"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" />
              Meus Relatos
            </div>
          </button>

          <button
            onClick={() => setProfileTab("favoritos")}
            className={`flex-1 px-6 py-3 font-medium transition-colors ${
              profileTab === "favoritos"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Star className="w-4 h-4" />
              Favoritos
            </div>
          </button>
        </div>
      </div>

      {/* Notificações */}
      {profileTab === "notificacoes" && (
        <div>
          <h2 className="text-xl font-bold mb-4">
            Notificações
          </h2>

          {notifications.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <Bell className="w-16 h-16 mx-auto text-gray-300 mb-4" />

              <h3 className="font-semibold text-lg mb-2">
                Nenhuma notificação
              </h3>

              <p className="text-gray-600">
                Você não tem notificações no momento
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
                >
                  <p>{notification}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Meus Relatos */}
      {profileTab === "relatos" && (
        <div>
          <h2 className="text-xl font-bold mb-4">
            Meus Relatos
          </h2>

          {reports.filter(
            (r) =>
              r.user ===
              (user?.user_metadata?.display_name || "Usuário")
          ).length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />

              <h3 className="font-semibold text-lg mb-2">
                Nenhum relato ainda
              </h3>

              <p className="text-gray-600">
                Você ainda não fez nenhum relato de ocorrências
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {reports
                .filter(
                  (r) =>
                    r.user ===
                    (user?.user_metadata?.display_name ||
                      "Usuário")
                )
                .map((report) => (
                  <div
                    key={report.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 ${getProfileColor(
                          report.user
                        )} rounded-full flex items-center justify-center`}
                      >
                        <span className="text-white text-lg font-bold">
                          {getInitial(report.user)}
                        </span>
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">
                          {report.title}
                        </h3>

                        <p className="text-gray-600 mb-2">
                          {report.description}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{report.location}</span>
                          <span>{report.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {/* Favoritos */}
      {profileTab === "favoritos" && (
        <div>
          <h2 className="text-xl font-bold mb-4">
            Ocorrências Favoritadas ({favorites.length})
          </h2>

          {favorites.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <Star className="w-16 h-16 mx-auto text-gray-300 mb-4" />

              <h3 className="font-semibold text-lg mb-2">
                Nenhum favorito ainda
              </h3>

              <p className="text-gray-600">
                Favorite ocorrências para acessá-las rapidamente aqui
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {reports
                .filter((r) => favorites.includes(r.id))
                .map((report) => (
                  <div
                    key={report.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 ${getProfileColor(
                          report.user
                        )} rounded-full flex items-center justify-center`}
                      >
                        <span className="text-white text-lg font-bold">
                          {getInitial(report.user)}
                        </span>
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">
                          {report.title}
                        </h3>

                        <p className="text-gray-600 mb-2">
                          {report.description}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{report.location}</span>
                          <span>{report.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}