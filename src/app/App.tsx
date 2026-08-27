import React, { useState, useEffect } from "react";
import { AppHeader } from "./components/AppHeader";
import { DecorativeShapes } from "./components/DecorativeShapes";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../lib/supabase";
import { mockReports } from "./data/mockReports";
import type { Report } from "./types";
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

const [reports, setReports] = useState<Report[]>(mockReports);


export type PageType = "home" | "social" | "safety" | "documents" | "login" | "profile" | "add-occurrence" | "add-report";

export default function App() {
  const { user, loading, signUp, signIn, signOut } = useAuth();
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [showAddModal2, setShowAddModal2] = useState(false);
  const [selectedOccurrence, setSelectedOccurrence] =
    useState<Report | null>(null);

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
  const [newReports, setNewReports] = useState<number[]>([]);

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
  const [shuffledReports, setShuffledReports] = useState(mockReports);

  const reports = shuffledReports;
  const [filterCity, setFilterCity] = useState("Todas");
  const [filterSeverity, setFilterSeverity] = useState("Todos");
  const [filterType, setFilterType] = useState("Todos");
  const [selectedCatastropheType, setSelectedCatastropheType] = useState<CatastropheType>("Todos");
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
  const [filterDate, setFilterDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [profileTab, setProfileTab] = useState<"notificacoes" | "relatos" | "favoritos">("notificacoes");
  const [notifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [isAnimating, setIsAnimating] = useState(false);
  const [reportsLimit, setReportsLimit] = useState(24);
  const [documentsLimit, setDocumentsLimit] = useState(18);

  // Estados para likes/dislikes individuais e favoritos por relato
  const [reportLikes, setReportLikes] = useState<{ [key: string]: number }>(() => {
    const likes: { [key: string]: number } = {};
    reports.forEach(report => {
      likes[report.id.toString()] = report.likes;
      likes[`${report.id}-main`] = report.likes;
      // Initialize individual reports likes
      for (let i = 0; i < report.others; i++) {
        likes[`${report.id}-individual-${i}`] = Math.floor(report.likes * (0.8 - i * 0.05));
      }
    });
    return likes;
  });
  const [reportDislikes, setReportDislikes] = useState<{ [key: string]: number }>(() => {
    const dislikes: { [key: string]: number } = {};
    reports.forEach(report => {
      dislikes[report.id.toString()] = report.dislikes;
      dislikes[`${report.id}-main`] = report.dislikes;
      // Initialize individual reports dislikes
      for (let i = 0; i < report.others; i++) {
        dislikes[`${report.id}-individual-${i}`] = Math.floor(report.dislikes * (0.8 - i * 0.05));
      }
    });
    return dislikes;
  });
  // Estado para relatos individuais favoritados dentro de ocorrências
  const [individualFavoriteReports, setIndividualFavoriteReports] = useState<{ [key: string]: boolean }>({});

  // Estados para botões Útil/Não Útil por ocorrência
  const [usefulReports, setUsefulReports] = useState<{ [key: number]: boolean }>({});
  const [notUsefulReports, setNotUsefulReports] = useState<{ [key: number]: boolean }>({});

  // Estados para contadores de útil/não útil - inicializados com valores dos relatos
  const [usefulCounts, setUsefulCounts] = useState<{ [key: number]: number }>(() => {
    const initialCounts: { [key: number]: number } = {};
    mockReports.forEach(report => {
      initialCounts[report.id] = report.likes;
    });
    return initialCounts;
  });
  const [notUsefulCounts, setNotUsefulCounts] = useState<{ [key: number]: number }>(() => {
    const initialCounts: { [key: number]: number } = {};
    mockReports.forEach(report => {
      initialCounts[report.id] = report.dislikes;
    });
    return initialCounts;
  });

  // Funções para persistência de favoritos no Supabase
  const saveFavoritesToSupabase = async (favorites: { [key: string]: boolean }) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_favorites')
        .upsert({
          user_id: user.id,
          favorites: JSON.stringify(favorites),
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;
    } catch (error) {
      console.error('Erro ao salvar favoritos:', error);
    }
  };

  const deriveFavoriteOccurrencesFromMap = (favoritesMap: { [key: string]: boolean }) => {
    const favoriteIds = new Set<number>();
    Object.entries(favoritesMap).forEach(([key, value]) => {
      if (!value) return;
      const id = Number(key.split("-")[0]);
      if (!Number.isNaN(id)) {
        favoriteIds.add(id);
      }
    });
    return Array.from(favoriteIds);
  };

  const loadFavoritesFromSupabase = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_favorites')
        .select('favorites')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
        throw error;
      }

      if (data?.favorites) {
        const favorites = JSON.parse(data.favorites);
        setIndividualFavoriteReports(favorites);
        setFavorites(deriveFavoriteOccurrencesFromMap(favorites));
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    }
  };

  // Carregar favoritos quando usuário mudar
  useEffect(() => {
    if (user) {
      loadFavoritesFromSupabase();
    } else {
      // Limpar favoritos quando usuário deslogar
      setIndividualFavoriteReports({});
    }
  }, [user]);

  // Salvar favoritos quando mudar
  useEffect(() => {
    if (user && Object.keys(individualFavoriteReports).length > 0) {
      saveFavoritesToSupabase(individualFavoriteReports);
    }
  }, [individualFavoriteReports, user]);

  useEffect(() => {
    setFavorites(deriveFavoriteOccurrencesFromMap(individualFavoriteReports));
  }, [individualFavoriteReports]);

  // Funções para persistência de ocorrências e relatos no Supabase
  const saveUserOccurrence = async (occurrence: any) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('user_occurrences')
        .insert({
          user_id: user.id,
          type: occurrence.type,
          severity: occurrence.severity,
          severity_color: occurrence.severityColor,
          city: occurrence.city,
          neighborhood: occurrence.neighborhood,
          state: occurrence.state,
          description: occurrence.description,
          likes: occurrence.likes || 0,
          dislikes: occurrence.dislikes || 0,
          reports_count: occurrence.reportsCount || 1
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao salvar ocorrência:', error);
      return null;
    }
  };

  const saveUserReport = async (occurrenceId: string, description: string) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('user_reports')
        .insert({
          occurrence_id: occurrenceId,
          user_id: user.id,
          description: description
        })
        .select()
        .single();

      if (error) throw error;

      // Atualizar contador de relatos na ocorrência
      await supabase
        .from('user_occurrences')
        .update({ reports_count: supabase.rpc('increment', { count: 1 }) })
        .eq('id', occurrenceId);

      return data;
    } catch (error) {
      console.error('Erro ao salvar relato:', error);
      return null;
    }
  };

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
      const result = await saveUserReport(selectedOccurrence.id.toString(), reportForm.description);

      if (result) {
        setAuthMessage("Relato adicionado com sucesso!");
        setReportForm({ neighborhood: '', type: '', severity: '', description: '' });
        setShowAddModal2(false);
        setAttachedFiles([]);
        // Refresh the occurrences to show the new report count
        loadUserOccurrences();
      } else {
        setAuthError("Erro ao adicionar relato. Tente novamente.");
      }
    } catch (error) {
      console.error('Erro no submit do relato:', error);
      setAuthError("Erro ao adicionar relato. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const loadUserOccurrences = async () => {
    if (!user) return [];

    try {
      const { data, error } = await supabase
        .from('user_occurrences')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;

      // Carregar relatos para cada ocorrência
      const occurrencesWithReports = await Promise.all(
        (data || []).map(async (occurrence) => {
          const { data: reports, error: reportsError } = await supabase
            .from('user_reports')
            .select('*')
            .eq('occurrence_id', occurrence.id)
            .order('date', { ascending: false });

          if (reportsError) throw reportsError;

          return {
            ...occurrence,
            userReports: reports || []
          };
        })
      );

      return occurrencesWithReports;
    } catch (error) {
      console.error('Erro ao carregar ocorrências:', error);
      return [];
    }
  };

  // Estados para likes/dislikes em relatos individuais (usando chaves string para identificar relatos individuais)
  const [userIndividualReportLikes, setUserIndividualReportLikes] = useState<{ [key: string]: boolean }>({});
  const [userIndividualReportDislikes, setUserIndividualReportDislikes] = useState<{ [key: string]: boolean }>({});

  // Carregar ocorrências do usuário quando logar
  useEffect(() => {
    if (user) {
      loadUserOccurrences();
    }
  }, [user]);

  // Funções para likes/dislikes em relatos individuais
  const handleIndividualReportLike = (reportKey: string) => {
    const wasLiked = userIndividualReportLikes[reportKey];
    const wasDisliked = userIndividualReportDislikes[reportKey];

    // Se já estava curtido, remove o like
    if (wasLiked) {
      setUserIndividualReportLikes(prev => ({
        ...prev,
        [reportKey]: false
      }));
      setReportLikes(prev => ({
        ...prev,
        [reportKey]: (prev[reportKey] || 0) - 1
      }));
    } else {
      // Adiciona like
      setUserIndividualReportLikes(prev => ({
        ...prev,
        [reportKey]: true
      }));
      setReportLikes(prev => ({
        ...prev,
        [reportKey]: (prev[reportKey] || 0) + 1
      }));

      // Se estava com dislike, remove
      if (wasDisliked) {
        setUserIndividualReportDislikes(prev => ({
          ...prev,
          [reportKey]: false
        }));
        setReportDislikes(prev => ({
          ...prev,
          [reportKey]: (prev[reportKey] || 0) - 1
        }));
      }
    }
  };

  const handleIndividualReportDislike = (reportKey: string) => {
    const wasLiked = userIndividualReportLikes[reportKey];
    const wasDisliked = userIndividualReportDislikes[reportKey];

    // Se já estava com dislike, remove
    if (wasDisliked) {
      setUserIndividualReportDislikes(prev => ({
        ...prev,
        [reportKey]: false
      }));
      setReportDislikes(prev => ({
        ...prev,
        [reportKey]: (prev[reportKey] || 0) - 1
      }));
    } else {
      // Adiciona dislike
      setUserIndividualReportDislikes(prev => ({
        ...prev,
        [reportKey]: true
      }));
      setReportDislikes(prev => ({
        ...prev,
        [reportKey]: (prev[reportKey] || 0) + 1
      }));

      // Se estava com like, remove
      if (wasLiked) {
        setUserIndividualReportLikes(prev => ({
          ...prev,
          [reportKey]: false
        }));
        setReportLikes(prev => ({
          ...prev,
          [reportKey]: (prev[reportKey] || 0) - 1
        }));
      }
    }
  };

  // Funções para controlar botões Útil/Não Útil por ocorrência
  const handleUsefulClick = (reportId: number) => {
    const wasPreviouslyUseful = usefulReports[reportId];
    const wasPreviouslyNotUseful = notUsefulReports[reportId];

    setUsefulReports(prev => ({
      ...prev,
      [reportId]: !prev[reportId]
    }));
    setNotUsefulReports(prev => ({
      ...prev,
      [reportId]: false
    }));

    // Atualizar contadores
    if (wasPreviouslyUseful) {
      // Se já era útil, decrementa
      setUsefulCounts(prev => ({
        ...prev,
        [reportId]: Math.max(0, (prev[reportId] || 0) - 1)
      }));
    } else {
      // Se não era útil, incrementa
      setUsefulCounts(prev => ({
        ...prev,
        [reportId]: (prev[reportId] || 0) + 1
      }));
    }

    // Se era não útil antes, decrementa o contador de não útil
    if (wasPreviouslyNotUseful) {
      setNotUsefulCounts(prev => ({
        ...prev,
        [reportId]: Math.max(0, (prev[reportId] || 0) - 1)
      }));
    }
  };

  const handleNotUsefulClick = (reportId: number) => {
    const wasPreviouslyNotUseful = notUsefulReports[reportId];
    const wasPreviouslyUseful = usefulReports[reportId];

    setNotUsefulReports(prev => ({
      ...prev,
      [reportId]: !prev[reportId]
    }));
    setUsefulReports(prev => ({
      ...prev,
      [reportId]: false
    }));

    // Atualizar contadores
    if (wasPreviouslyNotUseful) {
      // Se já era não útil, decrementa
      setNotUsefulCounts(prev => ({
        ...prev,
        [reportId]: Math.max(0, (prev[reportId] || 0) - 1)
      }));
    } else {
      // Se não era não útil, incrementa
      setNotUsefulCounts(prev => ({
        ...prev,
        [reportId]: (prev[reportId] || 0) + 1
      }));
    }

    // Se era útil antes, decrementa o contador de útil
    if (wasPreviouslyUseful) {
      setUsefulCounts(prev => ({
        ...prev,
        [reportId]: Math.max(0, (prev[reportId] || 0) - 1)
      }));
    }
  };

  const isOccurrenceFavorited = (reportId: number) => {
    return !!individualFavoriteReports[reportId] || !!individualFavoriteReports[`${reportId}-main`];
  };

  const toggleOccurrenceFavorite = (reportId: number) => {
    const mainKey = `${reportId}-main`;
    const currentlyFavorited = isOccurrenceFavorited(reportId);

    setIndividualFavoriteReports(prev => ({
      ...prev,
      [reportId]: !currentlyFavorited,
      [mainKey]: !currentlyFavorited
    }));
  };

  const handleFavoriteClick = (reportId: number) => toggleOccurrenceFavorite(reportId);
  const toggleFavorite = (reportId: number) => toggleOccurrenceFavorite(reportId);

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

  // Função para favoritar relato individual dentro de ocorrência
  const toggleIndividualFavoriteReport = (reportKey: string) => {
    setIndividualFavoriteReports(prev => ({
      ...prev,
      [reportKey]: !prev[reportKey]
    }));
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

  // Função para aleatorizar array
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Aleatorizar relatos uma vez ao carregar
  useEffect(() => {
    setShuffledReports(shuffleArray(mockReports));
  }, []);

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
    // Novas ocorrências sempre no topo
    const aIsNewOccurrence = newOccurrences.includes(a.id);
    const bIsNewOccurrence = newOccurrences.includes(b.id);

    if (aIsNewOccurrence && !bIsNewOccurrence) return -1;
    if (!aIsNewOccurrence && bIsNewOccurrence) return 1;

    // Se ambos são ocorrências ou ambos não são, ordenar por likes
    if (aIsNewOccurrence && bIsNewOccurrence) {
      return b.likes - a.likes;
    }

    // Para relatos normais, novos relatos vêm após o primeiro relato existente
    const aIsNewReport = newReports.includes(a.id);
    const bIsNewReport = newReports.includes(b.id);

    if (aIsNewReport && !bIsNewReport) {
      // Encontrar o primeiro relato não novo
      const firstNonNewReport = reports.find(r => !newReports.includes(r.id) && !newOccurrences.includes(r.id));
      if (firstNonNewReport) {
        return firstNonNewReport.id === b.id ? -1 : 1;
      }
    }

    if (!aIsNewReport && bIsNewReport) {
      return 1;
    }

    // Para o resto, ordenar por likes
    return b.likes - a.likes;
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
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase());

    return cityMatch && severityMatch && typeMatch && dateMatch && searchMatch;
  });

  const reportAuthors = [
    "João Silva",
    "Ana Santos",
    "Carlos Oliveira",
    "Fernanda Costa",
    "Roberto Souza",
    "Mariana Lima",
    "Pedro Alves",
    "Luciana Dias",
    "Thiago Mendes",
    "Camila Ferreira"
  ];

  const reportSnippets = [
    "Também presenciei. Situação muito grave na minha rua.",
    "Confirmo! Meu carro foi atingido, prejuízo grande.",
    "Telhado da minha casa teve danos. Vizinhos também afetados.",
    "Muito assustador. Primeira vez que vejo algo assim.",
    "Fiquei sem energia por horas. Ainda tem muitos problemas.",
    "Água entrou na minha casa. Perdemos vários móveis e eletrodomésticos.",
    "Árvores caíram na rua, bloqueando o trânsito. Defesa Civil já foi acionada.",
    "Estou trabalhando remotamente porque não consigo sair de casa. Situação crítica.",
    "A rua ficou intransitável. Muitos carros parados e lama.",
    "Vizinhos estão ajudando uns aos outros, mas ainda falta muita ajuda."
  ];

  const selectedOccurrenceSubreports = selectedOccurrence
    ? Array.from({ length: Math.min(selectedOccurrence.others, 20) }, (_, index) => {
      const key = `${selectedOccurrence.id}-individual-${index}`;
      return {
        key,
        author: reportAuthors[index % reportAuthors.length],
        description: reportSnippets[index % reportSnippets.length],
        hasMedia: index % 3 === 0,
        likes: reportLikes[key] ?? Math.max(1, selectedOccurrence.likes - index * 2),
        dislikes: reportDislikes[key] ?? Math.max(0, selectedOccurrence.dislikes - Math.floor(index * 0.2)),
        isFavorite: !!individualFavoriteReports[key]
      };
    })
    : [];

  const favoriteSelectedOccurrenceSubreports = selectedOccurrenceSubreports.filter((report) => report.isFavorite);
  const regularSelectedOccurrenceSubreports = selectedOccurrenceSubreports.filter((report) => !report.isFavorite);

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
        onPageChange={setCurrentPage}
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
            individualFavoriteReports={individualFavoriteReports}
            handleUsefulClick={handleUsefulClick}
            handleNotUsefulClick={handleNotUsefulClick}
            handleFavoriteClick={handleFavoriteClick}
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

            favorites={favorites}
            toggleFavorite={toggleFavorite}

            favoriteSelectedOccurrenceSubreports={
              favoriteSelectedOccurrenceSubreports
            }
            regularSelectedOccurrenceSubreports={
              regularSelectedOccurrenceSubreports
            }
            reportLikes={reportLikes}
            reportDislikes={reportDislikes}

            userIndividualReportLikes={
              userIndividualReportLikes
            }
            userIndividualReportDislikes={
              userIndividualReportDislikes
            }
            individualFavoriteReports={
              individualFavoriteReports
            }
            handleIndividualReportLike={
              handleIndividualReportLike
            }
            handleIndividualReportDislike={
              handleIndividualReportDislike
            }
            toggleIndividualFavoriteReport={
              toggleIndividualFavoriteReport
            }
            isOccurrenceFavorited={
              isOccurrenceFavorited
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
            saveUserReport={saveUserReport}
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
            favorites={favorites}
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
