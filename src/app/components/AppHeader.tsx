import { Bell, FileText, Home, LogOut, Shield, Users } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { PageType } from "../App";


interface AppHeaderProps {
  currentPage: string;
  onPageChange: (page: PageType) => void;
  user: any;
  notifications: any[];
  showNotifications: boolean;
  setShowNotifications: (value: boolean) => void;
  onLogout?: () => void;
}

export function AppHeader({
  currentPage,
  onPageChange,
  user,
  notifications,
  showNotifications,
  setShowNotifications,
  onLogout,
}: AppHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 relative z-10">
      <div className="max-w-7x1 mx-40 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-25">
          <div className="flex items-center gap-3">
            <ImageWithFallback
              src="src/imports/Logo.jpeg"
              alt="Logotipo"
              className="h-19 w-auto"
            />
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => onPageChange("home")}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${currentPage === "home" ? "bg-[#e7e7e7] font-medium" : "hover:bg-gray-50"}`}
            >
              <Home className="w-6 h-7" />
              <h2>Início</h2>
            </button>
            <button
              onClick={() => onPageChange("safety")}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${currentPage === "safety" ? "bg-[#e7e7e7] font-medium" : "hover:bg-gray-50"}`}
            >
              <Shield className="w-6 h-7" />
              <h2>Orientações</h2>
            </button>
            <button
              onClick={() => onPageChange("documents")}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${currentPage === "documents" ? "bg-[#e7e7e7] font-medium" : "hover:bg-gray-50"}`}
            >
              <FileText className="w-6 h-7" />
              <h2>Documentos</h2>
            </button>
            <button
              onClick={() => onPageChange("social")}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${currentPage === "social" ? "bg-[#e7e7e7] font-medium" : "hover:bg-gray-50"}`}
            >
              <Users className="w-6 h-7" />
              <h2>Rede Social</h2>
            </button>
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`relative p-2 rounded-full transition-all duration-200 transform active:scale-95 ${showNotifications ? "bg-gray-200 hover:bg-gray-300" : "hover:bg-gray-100"}`}
                >
                  <Bell className={`w-6 h-7 transition-colors duration-200 ${showNotifications ? "text-gray-800" : "text-gray-600"}`} />
                  {notifications.length > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  )}
                </button>

                <button
                  onClick={() => onPageChange("profile")}
                  className="flex items-center gap-2 hover:bg-gray-100 rounded-full p-2 transition-colors"
                >
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user?.user_metadata?.display_name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="text-lg font-size: 24px text-gray-700">
                    {user?.user_metadata?.display_name?.split(" ")[0] || "Usuário"}
                  </span>
                </button>

                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="p-2 rounded-full hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"
                    title="Sair"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={() => onPageChange("login")}
                className="bg-[#089448] hover:bg-[#067838] text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                Entrar
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
