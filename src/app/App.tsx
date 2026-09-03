import React, { useState, useEffect } from "react";
import { AppHeader } from "./components/AppHeader";
import { DecorativeShapes } from "./components/DecorativeShapes";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../lib/supabase";
import { mockDocuments } from "./data/mockDocuments";
import { mockNews } from "./data/mockNews";
import { awarenessMessages } from "./data/awarenessMessages";
import LoginPage from "./pages/loginPage";
import HomePage from "./pages/homePage";
import SocialPage from "./pages/socialPage";
import OccurrenceDetailsPage from "./pages/occurrenceDetailsPage";
import { SafetyPage } from "./pages/safetyPage";
import { CatastropheType } from "./pages/safetyPage";
import DocumentsPage from "./pages/documentsPage";
import AddOccurrencePage from "./pages/addOccurrencePage";
import ProfilePage from "./pages/profilePage";
import AddReportModal from "./pages/addReportModal";

interface AppReport {
  id: number;
  user: string;
  others: number;
  type: string;
  severity: string;
  severityColor: string;
  city: string;
  neighborhood: string;
  state: string;
  location: string;
  date: string;
  likes: number;
  dislikes: number;
  description: string;
  reportsCount: number;
  userId?: string | null;
  authorName?: string;
  userReports?: any[];
}

export type PageType = "home" | "social" | "safety" | "documents" | "login" | "profile" | "add-occurrence" | "add-report";

export default function App() {
  const { user, loading, signUp, signIn, signOut } = useAuth();
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [showAddModal2, setShowAddModal2] = useState(false);
  const [selectedOccurrence, setSelectedOccurrence] =
    useState<AppReport | null>(null);

  // Estados para login/cadastro com Supabase
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [authError, setAuthError] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [newOccurrences, setNewOccurrences] = useState<number[]>([]);

  // State for add-occurrence form
  const [occurrenceForm, setOccurrenceForm] = useState({
    city: '',
    neighborhood: '',
    state: '',
    description: '',
    location: '',
    type: '',
    severity: ''
  });

  // State for add-report form
  const [reportForm, setReportForm] = useState({
    neighborhood: '',
    type: '',
    severity: '',
    description: ''
  });

  // Funções de login/cadastro com Supabase
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthMessage("");
    setIsSubmitting(true);

    try {
      await signIn(loginForm.email, loginForm.password);
      setCurrentPage("social");
      setLoginForm({ email: "", password: "" });
    } catch (error: any) {
      setAuthError(error.message || "Erro ao fazer login. Verifique suas credenciais.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthMessage("");

    if (registerForm.password !== registerForm.confirmPassword) {
      setAuthError("Senhas não coincidem!");
      return;
    }

    setIsSubmitting(true);

    try {
      await signUp(registerForm.email, registerForm.password, registerForm.name);
      setAuthMessage("Cadastro realizado! Verifique seu e-mail para confirmar a conta.");
      setRegisterForm({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (error: any) {
      setAuthError(error.message || "Erro ao cadastrar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setCurrentPage("home");
      setLoginForm({ email: "", password: "" });
    } catch (error: any) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  // Função para lidar com upload de arquivos
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setAttachedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Aplicar aleatorização aos relatos
  const [shuffledReports, setShuffledReports] = useState<AppReport[]>([]);

  const reports = shuffledReports;
  const [filterCity, setFilterCity] = useState("Todas");
  const [filterSeverity, setFilterSeverity] = useState("Todos");
  const [filterType, setFilterType] = useState("Todos");
  const [selectedCatastropheType, setSelectedCatastropheType] = useState<CatastropheType>("Todos");
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
  const [filterDate, setFilterDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [profileTab, setProfileTab] = useState<"notificacoes" | "relatos">("notificacoes");
  const [notifications] = useState<any[]>([]);
  const [myUserReports, setMyUserReports] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [isAnimating, setIsAnimating] = useState(false);
  const [reportsLimit, setReportsLimit] = useState(24);
  const [documentsLimit, setDocumentsLimit] = useState(18);

  // Estados para votos das ocorrências e relatos.
  // Os valores iniciais vêm do Supabase; nada é mais gerado artificialmente no código.
  const [reportLikes, setReportLikes] = useState<{ [key: string]: number }>({});
  const [reportDislikes, setReportDislikes] = useState<{ [key: string]: number }>({});

  const [usefulReports, setUsefulReports] = useState<{ [key: number]: boolean }>({});
  const [notUsefulReports, setNotUsefulReports] = useState<{ [key: number]: boolean }>({});
  const [usefulCounts, setUsefulCounts] = useState<{ [key: number]: number }>({});
  const [notUsefulCounts, setNotUsefulCounts] = useState<{ [key: number]: number }>({});

  // Persistência de ocorrências e relatos no Supabase
  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      "Perigo Baixo": "bg-green-500",
      "Perigo Médio": "bg-yellow-500",
      "Perigo Alto": "bg-red-500",
      "Perigo Extremo": "bg-red-700",
    };
    return colors[severity] || "bg-gray-500";
  };

  const normalizeOccurrence = (row: any, occurrenceReports: any[] = []): AppReport => {
    const reportsCount = Number(row.reports_count ?? 1);
    const location = [row.city, row.neighborhood].filter(Boolean).join(", ") +
      (row.state ? ` - ${row.state}` : "");
    const createdAt = row.created_at || row.date;
    const date = createdAt
      ? new Date(createdAt).toLocaleDateString("pt-BR") + " - " +
      new Date(createdAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
      : "";

    return {
      id: Number(row.id),
      user: row.author_name || (row.user_id === user?.id
        ? (user?.user_metadata?.display_name || user?.email || "Usuário")
        : "Usuário"),
      userId: row.user_id,
      authorName: row.author_name || undefined,
      others: Math.max(0, reportsCount - 1),
      type: String(row.type || "Ocorrência"),
      severity: String(row.severity || "Perigo Baixo"),
      severityColor: row.severity_color || getSeverityColor(row.severity),
      city: row.city || "",
      neighborhood: row.neighborhood || "",
      state: row.state || "",
      location,
      date,
      description: row.description || "",
      likes: Number(row.likes || 0),
      dislikes: Number(row.dislikes || 0),
      reportsCount,
      userReports: occurrenceReports,
    };
  };

  const loadUserOccurrences = async () => {
    if (!user) return [];

    try {
      const { data, error } = await supabase
        .from("user_occurrences")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const occurrencesWithReports = await Promise.all(
        (data || []).map(async (occurrence: any) => {
          const { data: occurrenceReports, error: reportsError } = await supabase
            .from("user_reports")
            .select("*")
            .eq("occurrence_id", occurrence.id)
            .order("created_at", { ascending: true });

          if (reportsError) throw reportsError;
          return { occurrence, reports: occurrenceReports || [] };
        })
      );

      const normalized = occurrencesWithReports.map(({ occurrence, reports: occurrenceReports }) =>
        normalizeOccurrence(occurrence, occurrenceReports)
      );

      const likes: { [key: string]: number } = {};
      const dislikes: { [key: string]: number } = {};

      normalized.forEach((occurrence) => {
        likes[String(occurrence.id)] = occurrence.likes;
        dislikes[String(occurrence.id)] = occurrence.dislikes;
        likes[`${occurrence.id}-main`] = occurrence.likes;
        dislikes[`${occurrence.id}-main`] = occurrence.dislikes;

        (occurrence.userReports || []).forEach((report: any) => {
          const key = String(report.id);
          likes[key] = Number(report.likes || 0);
          dislikes[key] = Number(report.dislikes || 0);
        });
      });

      setReportLikes(likes);
      setReportDislikes(dislikes);
      setUsefulCounts(Object.fromEntries(normalized.map((r) => [r.id, r.likes])));
      setNotUsefulCounts(Object.fromEntries(normalized.map((r) => [r.id, r.dislikes])));
      setShuffledReports(normalized);

      setMyUserReports(
        occurrencesWithReports.flatMap(({ occurrence, reports: occurrenceReports }) =>
          occurrenceReports
            .filter((report: any) => report.user_id === user.id)
            .map((report: any) => ({
              ...report,
              occurrence_id: occurrence.id,
              occurrence_type: occurrence.type,
              occurrence_location: [occurrence.city, occurrence.neighborhood]
                .filter(Boolean)
                .join(", ") + (occurrence.state ? ` - ${occurrence.state}` : ""),
            }))
        )
      );

      return normalized;
    } catch (error) {
      console.error("Erro ao carregar ocorrências e relatos:", error);
      return [];
    }
  };

  const saveUserOccurrence = async (occurrence: any) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from("user_occurrences")
        .insert({
          user_id: user.id,
          author_name: user.user_metadata?.display_name || user.email || "Usuário",
          type: occurrence.type,
          severity: occurrence.severity,
          severity_color: occurrence.severityColor,
          city: occurrence.city,
          neighborhood: occurrence.neighborhood || "",
          state: occurrence.state || "",
          location: occurrence.location || "",
          description: occurrence.description,
          likes: 0,
          dislikes: 0,
          reports_count: 1
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Erro ao salvar ocorrência:", error);
      return null;
    }
  };

  const saveUserReport = async (occurrenceId: string, description: string, neighborhood = "", severity = "Perigo Baixo") => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from("user_reports")
        .insert({
          occurrence_id: occurrenceId,
          user_id: user.id,
          author_name: user.user_metadata?.display_name || user.email || "Usuário",
          description: description.trim(),
          neighborhood: neighborhood || null,
          severity: severity || "Perigo Baixo",
          likes: 0,
          dislikes: 0,
          has_media: false
        })
        .select()
        .single();

      if (error) throw error;

      const { data: occurrence, error: occurrenceError } = await supabase
        .from("user_occurrences")
        .select("reports_count")
        .eq("id", occurrenceId)
        .single();

      if (occurrenceError) throw occurrenceError;

      const { error: updateError } = await supabase
        .from("user_occurrences")
        .update({ reports_count: Number(occurrence?.reports_count || 0) + 1 })
        .eq("id", occurrenceId);

      if (updateError) throw updateError;

      return data;
    } catch (error) {
      console.error("Erro ao salvar relato:", error);
      return null;
    }
  };

  useEffect(() => {
    if (user) loadUserOccurrences();
  }, [user]);

  const handleReportSubmit = async () => {
    if (!selectedOccurrence || !user) {
      setAuthError("Você precisa estar logado para adicionar um relato");
      return;
    }

    if (!reportForm.description.trim()) {
      setAuthError("Por favor, adicione uma descrição");
      return;
    }

    setIsSubmitting(true);
    setAuthError("");

    try {
      const result = await saveUserReport(
        String(selectedOccurrence.id),
        reportForm.description,
        reportForm.neighborhood,
        reportForm.severity
      );

      if (!result) {
        setAuthError("Erro ao adicionar relato. Tente novamente.");
        return;
      }

      setAuthMessage("Relato adicionado com sucesso!");
      setReportForm({ neighborhood: "", type: "", severity: "", description: "" });
      setShowAddModal2(false);
      setAttachedFiles([]);

      await loadUserOccurrences();

      const refreshed = await supabase
        .from("user_occurrences")
        .select("*")
        .eq("id", selectedOccurrence.id)
        .single();

      if (refreshed.data) {
        const { data: occurrenceReports } = await supabase
          .from("user_reports")
          .select("*")
          .eq("occurrence_id", selectedOccurrence.id);
        setSelectedOccurrence(normalizeOccurrence(refreshed.data, occurrenceReports || []));
      }
    } catch (error) {
      console.error("Erro no submit do relato:", error);
      setAuthError("Erro ao adicionar relato. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Estados para likes/dislikes em relatos individuais (usando chaves string para identificar relatos individuais)
  const [userIndividualReportLikes, setUserIndividualReportLikes] = useState<{ [key: string]: boolean }>({});
  const [userIndividualReportDislikes, setUserIndividualReportDislikes] = useState<{ [key: string]: boolean }>({});

  // Votos dos relatos individuais. O contador é atualizado no Supabase e na tela.
  const handleIndividualReportLike = async (reportKey: string) => {
    const wasLiked = !!userIndividualReportLikes[reportKey];
    const wasDisliked = !!userIndividualReportDislikes[reportKey];
    const currentLikes = Number(reportLikes[reportKey] || 0);
    const currentDislikes = Number(reportDislikes[reportKey] || 0);

    const nextLikes = Math.max(0, currentLikes + (wasLiked ? -1 : 1));
    const nextDislikes = Math.max(0, currentDislikes - (wasDisliked ? 1 : 0));

    setUserIndividualReportLikes((prev) => ({ ...prev, [reportKey]: !wasLiked }));
    setUserIndividualReportDislikes((prev) => ({ ...prev, [reportKey]: false }));
    setReportLikes((prev) => ({ ...prev, [reportKey]: nextLikes }));
    setReportDislikes((prev) => ({ ...prev, [reportKey]: nextDislikes }));

    const { error } = await supabase
      .from("user_reports")
      .update({ likes: nextLikes, dislikes: nextDislikes })
      .eq("id", Number(reportKey));

    if (error) console.error("Erro ao salvar like do relato:", error);
  };

  const handleIndividualReportDislike = async (reportKey: string) => {
    const wasLiked = !!userIndividualReportLikes[reportKey];
    const wasDisliked = !!userIndividualReportDislikes[reportKey];
    const currentLikes = Number(reportLikes[reportKey] || 0);
    const currentDislikes = Number(reportDislikes[reportKey] || 0);

    const nextLikes = Math.max(0, currentLikes - (wasLiked ? 1 : 0));
    const nextDislikes = Math.max(0, currentDislikes + (wasDisliked ? -1 : 1));

    setUserIndividualReportLikes((prev) => ({ ...prev, [reportKey]: false }));
    setUserIndividualReportDislikes((prev) => ({ ...prev, [reportKey]: !wasDisliked }));
    setReportLikes((prev) => ({ ...prev, [reportKey]: nextLikes }));
    setReportDislikes((prev) => ({ ...prev, [reportKey]: nextDislikes }));

    const { error } = await supabase
      .from("user_reports")
      .update({ likes: nextLikes, dislikes: nextDislikes })
      .eq("id", Number(reportKey));

    if (error) console.error("Erro ao salvar dislike do relato:", error);
  };

  // Votos da ocorrência principal. Persistidos no Supabase.
  const handleUsefulClick = async (reportId: number) => {
    const wasUseful = !!usefulReports[reportId];
    const wasNotUseful = !!notUsefulReports[reportId];
    const occurrence = reports.find((report) => report.id === reportId);
    if (!occurrence) return;

    const nextLikes = Math.max(0, occurrence.likes + (wasUseful ? -1 : 1));
    const nextDislikes = Math.max(0, occurrence.dislikes - (wasNotUseful ? 1 : 0));

    setUsefulReports((prev) => ({ ...prev, [reportId]: !wasUseful }));
    setNotUsefulReports((prev) => ({ ...prev, [reportId]: false }));
    setUsefulCounts((prev) => ({ ...prev, [reportId]: nextLikes }));
    setNotUsefulCounts((prev) => ({ ...prev, [reportId]: nextDislikes }));
    setReportLikes((prev) => ({ ...prev, [String(reportId)]: nextLikes, [`${reportId}-main`]: nextLikes }));
    setReportDislikes((prev) => ({ ...prev, [String(reportId)]: nextDislikes, [`${reportId}-main`]: nextDislikes }));
    setShuffledReports((prev) => prev.map((report) =>
      report.id === reportId ? { ...report, likes: nextLikes, dislikes: nextDislikes } : report
    ));

    const { error } = await supabase
      .from("user_occurrences")
      .update({ likes: nextLikes, dislikes: nextDislikes })
      .eq("id", reportId);

    if (error) console.error("Erro ao salvar like da ocorrência:", error);
  };

  const handleNotUsefulClick = async (reportId: number) => {
    const wasUseful = !!usefulReports[reportId];
    const wasNotUseful = !!notUsefulReports[reportId];
    const occurrence = reports.find((report) => report.id === reportId);
    if (!occurrence) return;

    const nextLikes = Math.max(0, occurrence.likes - (wasUseful ? 1 : 0));
    const nextDislikes = Math.max(0, occurrence.dislikes + (wasNotUseful ? -1 : 1));

    setNotUsefulReports((prev) => ({ ...prev, [reportId]: !wasNotUseful }));
    setUsefulReports((prev) => ({ ...prev, [reportId]: false }));
    setUsefulCounts((prev) => ({ ...prev, [reportId]: nextLikes }));
    setNotUsefulCounts((prev) => ({ ...prev, [reportId]: nextDislikes }));
    setReportLikes((prev) => ({ ...prev, [String(reportId)]: nextLikes, [`${reportId}-main`]: nextLikes }));
    setReportDislikes((prev) => ({ ...prev, [String(reportId)]: nextDislikes, [`${reportId}-main`]: nextDislikes }));
    setShuffledReports((prev) => prev.map((report) =>
      report.id === reportId ? { ...report, likes: nextLikes, dislikes: nextDislikes } : report
    ));

    const { error } = await supabase
      .from("user_occurrences")
      .update({ likes: nextLikes, dislikes: nextDislikes })
      .eq("id", reportId);

    if (error) console.error("Erro ao salvar dislike da ocorrência:", error);
  };

  const categories = [
    "Todos",
    "Enchentes",
    "Tempestades",
    "Preparação",
    "Educação",
    "Mapas",
  ];

  // Função para animação de filtros sociais
  const handleSocialFilterChange = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 200);
  };

  // Função para carregar mais relatos
  const loadMoreReports = () => {
    setReportsLimit(prev => prev + 24);
  };

  // Função para carregar mais documentos
  const loadMoreDocuments = () => {
    setDocumentsLimit(prev => prev + 18);
  };

  // Função para obter a cor de fundo do perfil baseada no nome (para dentro da ocorrência)
  const getProfileColor = (name: string) => {
    const colors = [
      'bg-[#e0d0a5]', 'bg-[#9abaa8]', 'bg-[#e0b0b0]'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Função para obter cor cinza para ícones na página social
  const getSocialProfileColor = () => {
    return 'bg-gray-400';
  };

  // Função para obter a inicial do nome
  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  // Funções para gerenciar seções expansíveis
  const toggleSection = (sectionKey: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const handleCatastropheTypeClick = (type: CatastropheType) => {
    setSelectedCatastropheType(type);
  };

  // Adicionar efeito de animação quando filtros mudam
  useEffect(() => {
    handleSocialFilterChange();
  }, [filterCity, filterSeverity, filterType, filterDate, searchQuery]);

  const handleFilterChange = (category: string) => {
    if (category === selectedCategory) return;

    setIsAnimating(true);

    setTimeout(() => {
      setSelectedCategory(category);
      setIsAnimating(false);
    }, 200);
  };

  const filteredDocuments =
    selectedCategory === "Todos"
      ? mockDocuments
      : mockDocuments.filter(
        (doc) => doc.category === selectedCategory,
      );


  // Ordenar relatos com prioridade para novos itens
  const sortedReports = [...reports].sort((a, b) => {
    const aScore = Number(a.likes || 0) - Number(a.dislikes || 0);
    const bScore = Number(b.likes || 0) - Number(b.dislikes || 0);

    if (bScore !== aScore) return bScore - aScore;

    // Em caso de empate, a ocorrência mais nova aparece primeiro.
    const aDate = new Date(a.date || 0).getTime();
    const bDate = new Date(b.date || 0).getTime();
    return bDate - aDate;
  });

  // Filtrar relatos baseado nos filtros selecionados
  const filteredReports = sortedReports.filter((report) => {
    const cityMatch = filterCity === "Todas" || report.location.includes(filterCity);
    const severityMatch = filterSeverity === "Todos" || report.severity === filterSeverity;
    const typeMatch = filterType === "Todos" || report.type === filterType;
    const dateMatch = !filterDate || report.date.includes(filterDate);
    const searchMatch = !searchQuery ||
      report.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase());

    return cityMatch && severityMatch && typeMatch && dateMatch && searchMatch;
  });

  const selectedOccurrenceSubreports = selectedOccurrence
    ? (selectedOccurrence.userReports || []).map((item: any, index: number) => {
      const key = String(item.id || `${selectedOccurrence.id}-report-${index}`);
      const author = item.author_name ||
        (item.user_id === user?.id
          ? (user?.user_metadata?.display_name || user?.email || "Usuário")
          : "Usuário");

      return {
        key,
        author,
        description: item.description || "",
        neighborhood: item.neighborhood || "",
        severity: item.severity || "Perigo Baixo",
        hasMedia: Boolean(item.has_media),
        likes: Number(item.likes || reportLikes[key] || 0),
        dislikes: Number(item.dislikes || reportDislikes[key] || 0),
      };
    })
    : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if trying to access profile without authentication
  if (currentPage === "profile" && !user) {
    setCurrentPage("login");
    return null;
  }

  function getRandomAlertMessage(): React.ReactNode {
    const randomIndex = Math.floor(Math.random() * awarenessMessages.length);
    return awarenessMessages[randomIndex].title;
  }

  function getRandomAlertDescription(): React.ReactNode {
    const randomIndex = Math.floor(Math.random() * awarenessMessages.length);
    return awarenessMessages[randomIndex].description;
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Formas decorativas */}
      <DecorativeShapes />

      <AppHeader
        currentPage={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page);

          if (page === "home") {
            setSelectedOccurrence(null);
          }
        }}
        user={user}
        notifications={notifications}
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {currentPage === "login" && (
          <LoginPage
            isLoginMode={isLoginMode}
            setIsLoginMode={setIsLoginMode}
            loginForm={loginForm}
            setLoginForm={setLoginForm}
            registerForm={registerForm}
            setRegisterForm={setRegisterForm}
            handleLogin={handleLogin}
            handleRegister={handleRegister}
            isSubmitting={isSubmitting}
            authError={authError}
            authMessage={authMessage}
          />
        )}

        {/* Home page content */}
        {currentPage === "home" && !selectedOccurrence && (
          <HomePage
            setCurrentPage={setCurrentPage}
            getRandomAlertMessage={getRandomAlertMessage}
            getRandomAlertDescription={getRandomAlertDescription}
            mockNews={mockNews}
          />
        )}

        {/* social page content */}
        {currentPage === "social" && !selectedOccurrence && (
          <SocialPage
            setCurrentPage={setCurrentPage}
            user={user}
            filterCity={filterCity}
            setFilterCity={setFilterCity}
            filterSeverity={filterSeverity}
            setFilterSeverity={setFilterSeverity}
            filterType={filterType}
            setFilterType={setFilterType}
            filterDate={filterDate}
            setFilterDate={setFilterDate}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredReports={filteredReports}
            reports={reports}
            reportsLimit={reportsLimit}
            isAnimating={isAnimating}
            setSelectedOccurrence={setSelectedOccurrence}
            getSocialProfileColor={getSocialProfileColor}
            usefulReports={usefulReports}
            usefulCounts={usefulCounts}
            notUsefulReports={notUsefulReports}
            notUsefulCounts={notUsefulCounts}
            handleUsefulClick={handleUsefulClick}
            handleNotUsefulClick={handleNotUsefulClick}
            loadMoreReports={loadMoreReports}
          />
        )}

        {/* Tela de Detalhes da Ocorrência */}
        {currentPage === "social" && selectedOccurrence && (
          <OccurrenceDetailsPage
            selectedOccurrence={selectedOccurrence}
            setSelectedOccurrence={setSelectedOccurrence}
            setCurrentPage={setCurrentPage}
            user={user}

            usefulReports={usefulReports}
            notUsefulReports={notUsefulReports}

            handleUsefulClick={handleUsefulClick}
            handleNotUsefulClick={handleNotUsefulClick}

            selectedOccurrenceSubreports={selectedOccurrenceSubreports}
            reportLikes={reportLikes}
            reportDislikes={reportDislikes}

            userIndividualReportLikes={
              userIndividualReportLikes
            }
            userIndividualReportDislikes={
              userIndividualReportDislikes
            }
            handleIndividualReportLike={
              handleIndividualReportLike
            }
            handleIndividualReportDislike={
              handleIndividualReportDislike
            }
            getProfileColor={getProfileColor}
            getInitial={getInitial}
          />
        )}


        {currentPage === "safety" && (
          <SafetyPage
            selectedCatastropheType={selectedCatastropheType}
            handleCatastropheTypeClick={handleCatastropheTypeClick}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />
        )}

        {currentPage === "documents" && (
          <DocumentsPage
            categories={categories}
            selectedCategory={selectedCategory}
            handleFilterChange={handleFilterChange}
            filteredDocuments={filteredDocuments}
            documentsLimit={documentsLimit}
            isAnimating={isAnimating}
            loadMoreDocuments={loadMoreDocuments}
          />
        )}

        {/* Página de Adicionar Ocorrência */}
        {currentPage === "add-occurrence" && (
          <AddOccurrencePage
            sortedReports={sortedReports}
            occurrenceForm={occurrenceForm}
            setOccurrenceForm={setOccurrenceForm}
            attachedFiles={attachedFiles}
            setAttachedFiles={setAttachedFiles}
            handleFileUpload={handleFileUpload}
            removeFile={removeFile}
            setCurrentPage={setCurrentPage}
            setSelectedOccurrence={setSelectedOccurrence}
            saveUserOccurrence={saveUserOccurrence}
            reports={reports}
            setShuffledReports={setShuffledReports}
            setNewOccurrences={setNewOccurrences}
            user={user}
          />
        )}

        {/* Profile Page - requires authentication */}
        {currentPage === "profile" && user && (
          <ProfilePage
            user={user}
            profileTab={profileTab}
            setProfileTab={setProfileTab}
            notifications={notifications}
            reports={reports}
            myUserReports={myUserReports}
            signOut={signOut}
            getProfileColor={getProfileColor}
            getInitial={getInitial}
          />
        )}

        {/* End Main Content */}
        <div>
          {currentPage === "add-report" && (
            <AddReportModal
              reportForm={reportForm}
              setReportForm={setReportForm}
              authError={authError}
              authMessage={authMessage}
              isSubmitting={isSubmitting}
              handleReportSubmit={handleReportSubmit}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </main>
    </div>
  );
}