import React from "react";
import { Bell, FileText, Mail, LogOut } from "lucide-react";

interface ProfilePageProps {
  user: any;
  profileTab: "notificacoes" | "relatos";
  setProfileTab: React.Dispatch<React.SetStateAction<"notificacoes" | "relatos">>;
  notifications: any[];
  reports: any[];
  myUserReports: any[];
  signOut: () => Promise<any>;
  getProfileColor: (name: string) => string;
  getInitial: (name: string) => string;
}

export default function ProfilePage({
  user,
  profileTab,
  setProfileTab,
  notifications,
  reports,
  myUserReports,
  signOut,
  getProfileColor,
  getInitial,
}: ProfilePageProps) {
  const displayName = user?.user_metadata?.display_name || user?.email || "Usuário";
  const myReports = reports.filter(
    (report) => report.user === displayName || report.userId === user?.id
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 ${getProfileColor(displayName)} rounded-full flex items-center justify-center`}>
            <span className="text-white text-2xl font-bold">{getInitial(displayName)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold truncate">{displayName}</h1>
            <p className="text-gray-500 flex items-center gap-1 mt-1">
              <Mail className="w-4 h-4" /> {user?.email}
            </p>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </div>

      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setProfileTab("notificacoes")}
          className={`flex items-center gap-2 px-5 py-3 font-medium border-b-2 ${profileTab === "notificacoes" ? "border-green-600 text-green-600" : "border-transparent text-gray-500"}`}
        >
          <Bell className="w-4 h-4" /> Notificações
        </button>
        <button
          onClick={() => setProfileTab("relatos")}
          className={`flex items-center gap-2 px-5 py-3 font-medium border-b-2 ${profileTab === "relatos" ? "border-green-600 text-green-600" : "border-transparent text-gray-500"}`}
        >
          <FileText className="w-4 h-4" /> Meus Relatos
        </button>
      </div>

      {profileTab === "notificacoes" && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          {notifications.length > 0 ? (
            <div className="space-y-3">
              {notifications.map((notification, index) => (
                <div key={notification.id || index} className="p-3 bg-gray-50 rounded-md">
                  {notification.message || notification.title || "Nova notificação"}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              <Bell className="w-10 h-10 mx-auto mb-3 text-gray-300" />
              <p>Nenhuma notificação no momento.</p>
            </div>
          )}
        </div>
      )}

      {profileTab === "relatos" && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Meus Relatos</h2>
          {(myReports.length > 0 || myUserReports.length > 0) ? (
            <div className="space-y-3">
              {myReports.map((report) => (
                <div key={`occurrence-${report.id}`} className="border border-gray-200 rounded-md p-4">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <strong>{report.type}</strong>
                    <span className={`text-xs px-2 py-1 rounded text-white ${report.severityColor || "bg-gray-500"}`}>
                      {report.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{report.location}</p>
                  <p className="text-xs text-gray-500 mt-1">{report.date}</p>
                </div>
              ))}
              {myUserReports.map((report) => (
                <div key={`report-${report.id}`} className="border border-green-100 rounded-md p-4 bg-green-50/30">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <strong>Relato em {report.occurrence_type || "Ocorrência"}</strong>
                    <span className="text-xs text-gray-500">Relato</span>
                  </div>
                  <p className="text-sm text-gray-600">{report.occurrence_location || "Local não informado"}</p>
                  <p className="text-sm text-gray-700 mt-2">{report.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              <FileText className="w-10 h-10 mx-auto mb-3 text-gray-300" />
              <p>Você ainda não criou nenhuma ocorrência.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
