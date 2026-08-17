import React, { useState, useEffect } from "react";
import ReportsMasonry from "./components/ReportsMasonry";
import {
  Bell,
  Home,
  Shield,
  FileText,
  Users,
  AlertTriangle,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Star,
  Image as ImageIcon,
  Video,
  Camera,
  MapPin,
  LogOut,
  Calendar,
  Mail,
  ChevronDown,
  Droplets,
  Wind,
  ArrowLeft,
  MountainSnow,
  Tornado,
  CloudLightning,
  CloudRainWind,
  CloudHail,
  ExternalLink,
  Newspaper,

} from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { CustomDropdown } from "./components/CustomDropdown";
import { AppHeader } from "./components/AppHeader";
import { DecorativeShapes } from "./components/DecorativeShapes";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../lib/supabase";
import { mockReports } from "./data/mockReports";
import type { Report } from "./types";
import { mockDocuments } from "../data/mockDocuments";
import { mockNews } from "../data/mockNews";
import { awarenessMessages } from "../data/awarenessMessages";


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
  const [selectedCatastropheType, setSelectedCatastropheType] = useState("Todos");
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
  const [filterDate, setFilterDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [profileTab, setProfileTab] = useState("relatos");
  const [notifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] =
    useState(false);

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

  const occurrenceHasMedia = (report: any) => !!report.hasMedia;


  
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

  const handleCatastropheTypeClick = (type: string) => {
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

        {/* Página de Login/Cadastro */}
        {currentPage === "login" && (
          <div className="pt-30 pb-12 px-4 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-md w-full">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#089448] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {isLoginMode ? "Login" : "Cadastro"}
                </h1>
                <p className="text-gray-600 mt-2">
                  {isLoginMode ? "Entre para acessar o sistema" : "Crie sua conta para começar"}
                </p>
              </div>

              {authError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm">
                  {authError}
                </div>
              )}

              {authMessage && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-md text-sm">
                  {authMessage}
                </div>
              )}

              <form onSubmit={isLoginMode ? handleLogin : handleRegister} className="space-y-4">
                {!isLoginMode && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome
                    </label>
                    <input
                      type="text"
                      required
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Seu nome"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={isLoginMode ? loginForm.email : registerForm.email}
                    onChange={(e) => isLoginMode
                      ? setLoginForm({ ...loginForm, email: e.target.value })
                      : setRegisterForm({ ...registerForm, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Senha
                  </label>
                  <input
                    type="password"
                    required
                    value={isLoginMode ? loginForm.password : registerForm.password}
                    onChange={(e) => isLoginMode
                      ? setLoginForm({ ...loginForm, password: e.target.value })
                      : setRegisterForm({ ...registerForm, password: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="••••••••"
                  />
                </div>

                {!isLoginMode && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirmar Senha
                    </label>
                    <input
                      type="password"
                      required
                      value={registerForm.confirmPassword}
                      onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="••••••••"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#089448] hover:bg-[#067838] disabled:bg-gray-400 text-white rounded-md font-medium transition-colors py-2"
                >
                  {isSubmitting ? "Processando..." : (isLoginMode ? "Entrar" : "Cadastrar")}
                </button>
              </form>

              <div className="mt-6 text-center space-y-3">
                {!isLoginMode && (
                  <button
                    onClick={() => setIsLoginMode(true)}
                    className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-700 mx-auto"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Voltar para login
                  </button>
                )}

                <button
                  onClick={() => {
                    setIsLoginMode(!isLoginMode);
                    setAuthError("");
                    setAuthMessage("");
                  }}
                  className="text-sm text-green-600 hover:text-green-700"
                >
                  {isLoginMode ? "Não tem uma conta? Cadastre-se" : "Já tem uma conta? Entre"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Home page content */}
        {currentPage === "home" && !selectedOccurrence && (
          <div>
            <div className="relative overflow-hidden text-white rounded-2xl p-8 mb-8 bg-[#1e8549]">
              {/* Formas geométricas */}
              <div className="absolute -top-10 -right-10 w-64 h-64 opacity-30 rounded-tl-full bg-[#45b52b]"></div>
              <div className="absolute -bottom-16 -left-16 w-72 h-72 opacity-40 rounded-br-full bg-[#306746]"></div>

              {/* Conteúdo */}
              <div className="relative z-10">
                <h1 className="text-3xl font-bold mb-3">
                  Informação que salva vidas
                </h1>

                <p className="text-white/90 mb-6 max-w-xl">
                  Acompanhe alertas em tempo real, acesse
                  orientações de segurança e compartilhe relatos
                  sobre eventos climáticos na sua região. Juntos
                  somos mais fortes.
                </p>

                <div className="flex gap-4">
                  <button
                    onClick={() => setCurrentPage("social")}
                    className="bg-yellow-400 text-black px-5 py-2 rounded-lg font-medium hover:scale-105 transition flex items-center gap-2"
                  >
                    <MapPin className="w-4 h-4" /> Ver relatos próximos
                  </button>

                  <button
                    onClick={() => setCurrentPage("safety")}
                    className="border border-white/40 px-5 py-2 rounded-lg hover:bg-white/10 transition flex items-center gap-2">
                    <Shield className="w-4 h-4" /> Orientações
                  </button>

                </div>
              </div>
            </div>
            {/* Hero Section com mensagem aleatória */}
            <div className="relative overflow-hidden bg-[#dc2626] text-white rounded-2xl p-8 mb-8">
              {/* Formas geométricas */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-orange-400 opacity-30 rounded-bl-full"></div>
              <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-red-900 opacity-40 rounded-tr-full"></div>

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

            {/* News Section */}
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
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${news.category === "Crítico"
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
                        Ler mais{" "}
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
                na sua região. Sua contribuição pode salvar
                vidas e ajudar a construir comunidades mais
                resilientes.
              </p>
              <button
                onClick={() => setCurrentPage("social")}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
              >
                Relatar Ocorrência
              </button>
            </div>
          </div>
        )}


        {currentPage === "social" && !selectedOccurrence && (
          <div>
            {/* Page Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#ee302f] rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>

                <div>
                  <h1 className="text-3xl font-bold">
                    Rede Social
                  </h1>
                  <p className="text-gray-600">
                    Ocorrências e relatos próximos a você
                  </p>
                </div>
              </div>
              <button
                onClick={() => user ? setCurrentPage("add-occurrence") : setCurrentPage("login")}
                className="bg-[#089448] hover:bg-[#089448] text-white rounded-md font-medium transition-colors custom-button px-6 py-2"
              >
                + Adicionar Ocorrência
              </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-[6px_6px_8px_rgba(0,0,0,0.15)] mb-6 flex flex-wrap items-center gap-4 bg-[#f5f5f5]">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">
                  Filtros:
                </span>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600 font-medium">
                  Cidade:
                </label>
                <CustomDropdown
                  value={filterCity}
                  onChange={setFilterCity}
                  options={[
                    { value: "Todas", label: "Todas" },
                    { value: "Erechim", label: "Erechim" },
                    { value: "Porto Alegre", label: "Porto Alegre" },
                    { value: "Caxias do Sul", label: "Caxias do Sul" },
                  ]}
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600 font-medium">
                  Perigo:
                </label>
                <CustomDropdown
                  value={filterSeverity}
                  onChange={setFilterSeverity}
                  options={[
                    { value: "Todos", label: "Todos" },
                    { value: "Perigo Alto", label: "Perigo Alto" },
                    { value: "Perigo Médio", label: "Perigo Médio" },
                    { value: "Perigo Baixo", label: "Perigo Baixo" },
                  ]}
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600 font-medium">
                  Tipo:
                </label>
                <CustomDropdown
                  value={filterType}
                  onChange={setFilterType}
                  options={[
                    { value: "Todos", label: "Todos" },
                    { value: "GRANIZO", label: "Granizo" },
                    { value: "ALAGAMENTO", label: "Alagamento" },
                    { value: "VENDAVAL", label: "Vendaval" },
                    { value: "TEMPESTADE", label: "Tempestade" },
                    { value: "ENCHENTE", label: "Enchente" },
                    { value: "DESLIZAMENTO", label: "Deslizamento" },
                    { value: "CICLONE", label: "Ciclone" },
                  ]}
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600 font-medium">
                  Data:
                </label>
                <input
                  type="text"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  placeholder="DD/MM/AAAA"
                  className="px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-32"
                />
              </div>

              <div className="ml-auto">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="🔍 Pesquisar..."
                  className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm w-56 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
                />
              </div>
            </div>

            {/* Reports Grid */}
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 transition-all duration-200 ${isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}>
              {filteredReports.length > 0 ? (
                filteredReports.slice(0, reportsLimit).map((report) => (
                  <button
                    key={report.id}
                    onClick={() => setSelectedOccurrence(report)}
                    className="border-2 border-gray-300 rounded-lg shadow-[6px_6px_8px_rgba(0,0,0,0.15)] hover:shadow-[6px_6px_8px_rgba(0,0,0,0.25)] transition-all overflow-hidden text-left transform hover:border-gray-200 relative group bg-[#f5f5f5] hover:scale-101"
                  >
                    <div className="relative group p-4 bg-white">


                      {/* User Info */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className={`w-8 h-8 ${getSocialProfileColor()} rounded-full flex items-center justify-center`}>
                          <Users className="w-4 h-4 text-white" />
                        </div>

                        <div className="flex-1 min-w-0 ">
                          <p className="text-sm font-medium truncate ">
                            {report.user}
                          </p>
                          <p className="text-xs text-gray-500 ">
                            + {report.others} pessoas
                          </p>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded ${report.severityColor} text-white font-medium  whitespace-nowrap`}
                        >
                          {report.severity}
                        </span>
                      </div>

                      {/* Event Type */}
                      <h3 className="text-2xl font-bold mb-2 ">
                        {report.type}
                      </h3>

                      {/* Location */}
                      <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {report.location}
                      </p>

                      {/* Date */}
                      <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {report.date}
                      </p>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUsefulClick(report.id);
                            }}
                            className={`flex items-center gap-1 text-sm font-medium ${usefulReports[report.id] ? "text-green-600" : "text-gray-600 hover:text-green-600"} transition-colors`}
                          >
                            <ThumbsUp className="w-4 h-4" />
                            <span>
                              {(usefulCounts[report.id] || 0)}
                            </span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNotUsefulClick(report.id);
                            }}
                            className={`flex items-center gap-1 text-sm font-medium ${notUsefulReports[report.id] ? "text-red-600" : "text-gray-600 hover:text-red-600"} transition-colors`}
                          >
                            <ThumbsDown className="w-4 h-4" />
                            <span>
                              {(notUsefulCounts[report.id] || 0)}
                            </span>
                          </button>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFavoriteClick(report.id);
                          }}
                          className={`text-gray-600 hover:text-yellow-500 transition-colors`}
                        >
                          <Star
                            className={`w-4 h-4 ${individualFavoriteReports[report.id] ? "fill-yellow-500 text-yellow-500" : ""}`}
                          />
                        </button>
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium mb-2">Nenhum relato encontrado</p>
                    <p className="text-sm">Tente ajustar os filtros para ver mais resultados</p>
                  </div>
                </div>
              )}
            </div>

            {/* Results Summary */}
            <div className="mt-4 text-sm text-gray-600 text-center">
              {filteredReports.slice(0, reportsLimit).length} {filteredReports.slice(0, reportsLimit).length === 1 ? 'ocorrência encontrada' : 'ocorrências encontradas'}
              {filteredReports.length !== reports.length && ` de ${filteredReports.length} totais`}
            </div>

            {filteredReports.length > reportsLimit && (
              <div className="text-center">
                <button
                  onClick={loadMoreReports}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mx-auto my-[13px] hover:scale-105 transition-transform"
                >
                  <span>Carregar mais...</span>
                </button>
              </div>
            )}

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mx-[0px] mt-[15px] mb-[17px]">
              <p className="text-sm text-blue-800">
                <strong>ℹ️ Como funciona:</strong> Clique em uma
                ocorrência para ver todos os relatos
                relacionados. Ocorrências com mais confirmações
                aparecem no topo. Se você foi afetado pelo mesmo
                evento, adicione seu relato à ocorrência
                existente ao invés de criar uma nova.
              </p>
            </div>
          </div>
        )}

        {/* Tela de Detalhes da Ocorrência */}
        {currentPage === "social" && selectedOccurrence && (
          <div>
            {/* Header com botão voltar */}
            <button
              onClick={() => setSelectedOccurrence(null)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 hover:scale-105 transition-transform"
            >
              <span className="text-xl">«</span>
              <span>Voltar para Rede Social</span>
            </button>

            {/* Cabeçalho com Dados Essenciais da Ocorrência */}
            <div className="bg-white border-gray-300 rounded-lg shadow-[6px_6px_8px_rgba(0,0,0,0.15)] p-6 mb-6 bg-[#f5f5f5]">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h1 className="text-3xl font-bold">
                      {selectedOccurrence.type}
                    </h1>
                    <span
                      className={`text-sm px-3 py-1 rounded ${selectedOccurrence.severityColor} text-white font-medium`}
                    >
                      {selectedOccurrence.severity}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <p className="text-gray-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedOccurrence.location}</span>
                    </p>
                    <p className="text-gray-600 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{selectedOccurrence.date}</span>
                    </p>
                    <p className="text-gray-600 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>
                        {selectedOccurrence.others + 1} pessoas
                        relataram
                      </span>
                    </p>
                    <p className="text-green-600 flex items-center gap-2 font-medium">
                      <ThumbsUp className="w-4 h-4" />
                      <span>
                        {selectedOccurrence.likes} confirmações
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Ações rápidas */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUsefulClick(selectedOccurrence.id);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors text-sm ${usefulReports[selectedOccurrence.id]
                    ? "bg-green-200 text-green-700 hover:bg-green-200"
                    : "bg-green-100 text-green-700 hover:bg-green-200"
                    }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${usefulReports[selectedOccurrence.id] ? "fill-green-600" : ""}`} />
                  <span>Útil</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNotUsefulClick(selectedOccurrence.id);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors text-sm ${notUsefulReports[selectedOccurrence.id]
                    ? "bg-red-200 text-red-700 hover:bg-red-200"
                    : "bg-red-100 text-red-700 hover:bg-red-200"
                    }`}
                >
                  <ThumbsDown className={`w-4 h-4 ${notUsefulReports[selectedOccurrence.id] ? "fill-red-600" : ""}`} />
                  <span>Não Útil</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(selectedOccurrence.id);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors text-sm ${favorites.includes(selectedOccurrence.id)
                    ? "bg-yellow-200 text-yellow-700 hover:bg-yellow-200"
                    : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                    }`}
                >
                  <Star
                    className={`w-4 h-4 ${favorites.includes(selectedOccurrence.id) ? "fill-yellow-500 text-yellow-500" : ""}`}
                  />
                  <span>Favoritar</span>
                </button>

                <button
                  onClick={() => user ? setCurrentPage("add-report") : setCurrentPage("login")}
                  className="ml-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium"
                >
                  + Adicionar meu relato
                </button>
              </div>
            </div>




            {/* Grid de Relatos - 2 colunas */}
            <ReportsMasonry
              selectedOccurrence={selectedOccurrence}
              favoriteSelectedOccurrenceSubreports={favoriteSelectedOccurrenceSubreports}
              regularSelectedOccurrenceSubreports={regularSelectedOccurrenceSubreports}
              reportLikes={reportLikes}
              reportDislikes={reportDislikes}
              userIndividualReportLikes={userIndividualReportLikes}
              userIndividualReportDislikes={userIndividualReportDislikes}
              individualFavoriteReports={individualFavoriteReports}
              handleIndividualReportLike={handleIndividualReportLike}
              handleIndividualReportDislike={handleIndividualReportDislike}
              toggleIndividualFavoriteReport={toggleIndividualFavoriteReport}
              toggleFavorite={toggleFavorite}
              isOccurrenceFavorited={isOccurrenceFavorited}
              getProfileColor={getProfileColor}
              getInitial={getInitial}
            />
          </div>
        )}


        {currentPage === "safety" && (
          <div>
            {/* Page Header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[#0cc561]">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold">
                  Orientações de Segurança
                </h1>
                <p className="text-gray-600">
                  Como se preparar e agir em situações de
                  emergência
                </p>
              </div>
            </div>

            {/* Seletor de Tipo de Catástrofe */}
            <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-[6px_6px_8px_rgba(0,0,0,0.15)] mb-4 bg-[#f5f5f5]">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="font-medium text-gray-700">
                  Tipo:
                </span>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleCatastropheTypeClick("Todos")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedCatastropheType === "Todos"
                      ? "bg-[#00ab4e] text-white hover:bg-[#00ab4e]"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => handleCatastropheTypeClick("Alagamento")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedCatastropheType === "Alagamento"
                      ? "bg-[#00ab4e] text-white hover:bg-[#00ab4e]"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    Alagamento
                  </button>
                  <button
                    onClick={() => handleCatastropheTypeClick("Tempestade")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedCatastropheType === "Tempestade"
                      ? "bg-[#00ab4e] text-white hover:bg-[#00ab4e]"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    Tempestade
                  </button>
                  <button
                    onClick={() => handleCatastropheTypeClick("Enchente")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedCatastropheType === "Enchente"
                      ? "bg-[#00ab4e] text-white hover:bg-[#00ab4e]"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    Enchente
                  </button>
                  <button
                    onClick={() => handleCatastropheTypeClick("Granizo")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedCatastropheType === "Granizo"
                      ? "bg-[#00ab4e] text-white hover:bg-[#00ab4e]"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    Granizo
                  </button>
                  <button
                    onClick={() => handleCatastropheTypeClick("Vendaval")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedCatastropheType === "Vendaval"
                      ? "bg-[#00ab4e] text-white hover:bg-[#00ab4e]"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    Vendaval
                  </button>
                  <button
                    onClick={() => handleCatastropheTypeClick("Ciclone")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedCatastropheType === "Ciclone"
                      ? "bg-[#00ab4e] text-white hover:bg-[#00ab4e]"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    Ciclone
                  </button>
                  <button
                    onClick={() => handleCatastropheTypeClick("Deslizamento")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedCatastropheType === "Deslizamento"
                      ? "bg-[#00ab4e] text-white hover:bg-[#00ab4e]"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    Deslizamento
                  </button>
                </div>
              </div>
            </div>

            {/* Expandable Catastrophe Types */}
            <div className="space-y-4">
              {/* Alagamento */}
              {(selectedCatastropheType === "Todos" || selectedCatastropheType === "Alagamento") && (
                <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-[6px_6px_8px_rgba(0,0,0,0.15)] bg-[#f5f5f5]">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200">
                        <Droplets className="w-6 h-6 text-gray-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800">Alagamento</h2>
                    </div>

                    {/* Antes */}
                    <div className="mb-4">
                      <button
                        onClick={() => toggleSection('alagamento-antes')}
                        className="flex items-center gap-2 w-full text-left hover:bg-gray-50 p-2 rounded transition-colors"
                      >
                        <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections['alagamento-antes'] ? 'rotate-180' : ''}`} />
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#dcfce7]">
                            <Clock className="w-4 h-4 text-green-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-[#00ab4e]">Antes (Prevenção)</h3>
                        </div>
                      </button>
                      {expandedSections['alagamento-antes'] && (
                        <div className="ml-7 mt-3 space-y-3">
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Identifique Áreas de Risco</h4>
                              <p className="text-sm text-gray-600">Conheça as zonas baixas e propensas a alagamento na sua região.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Limpe Calhas e Drenos</h4>
                              <p className="text-sm text-gray-600">Mantenha o sistema de drenagem limpo para evitar acúmulo de água.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Eleve Objetos e Móveis</h4>
                              <p className="text-sm text-gray-600">Guarde documentos e objetos de valor em locais altos.</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Durante */}
                    <div className="mb-4">
                      <button
                        onClick={() => toggleSection('alagamento-durante')}
                        className="flex items-center gap-2 w-full text-left hover:bg-gray-50 p-2 rounded transition-colors"
                      >
                        <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections['alagamento-durante'] ? 'rotate-180' : ''}`} />
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-red-100">
                            <AlertTriangle className="w-4 h-4 text-[#ee302f]" />
                          </div>
                          <h3 className="text-lg font-semibold text-[#ee302f]">Durante (Ação)</h3>
                        </div>
                      </button>
                      {expandedSections['alagamento-durante'] && (
                        <div className="ml-7 mt-3 space-y-3">
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Busque Lugar Alto e Seguro</h4>
                              <p className="text-sm text-gray-600">Vá para andares superiores ou pontos elevados da região.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Não Atravesse Águas</h4>
                              <p className="text-sm text-gray-600">Nunca tente atravessar áreas alagadas, mesmo que pareçam rasas.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Desligue Energia Elétrica</h4>
                              <p className="text-sm text-gray-600">Corte a energia para evitar curtos-circuitos e choques.</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Depois */}
                    <div>
                      <button
                        onClick={() => toggleSection('alagamento-depois')}
                        className="flex items-center gap-2 w-full text-left hover:bg-gray-50 p-2 rounded transition-colors"
                      >
                        <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections['alagamento-depois'] ? 'rotate-180' : ''}`} />
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#fff1d3]">
                            <CheckCircle className="w-4 h-4 text-[#ffb000]" />
                          </div>
                          <h3 className="text-lg font-semibold text-[#ffb000]">Depois (Recuperação)</h3>
                        </div>
                      </button>
                      {expandedSections['alagamento-depois'] && (
                        <div className="ml-7 mt-3 space-y-3">
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Aguarde a Liberação</h4>
                              <p className="text-sm text-gray-600">Só retorne quando as autoridades liberarem a área.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Cuidado com Água Contaminada</h4>
                              <p className="text-sm text-gray-600">Não consuma água da rede sem antes ferver ou tratar.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Limpe e Desinfete</h4>
                              <p className="text-sm text-gray-600">Use produtos de limpeza adequados para evitar contaminação.</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Tempestade */}
              {(selectedCatastropheType === "Todos" || selectedCatastropheType === "Tempestade") && (
                <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-[6px_6px_8px_rgba(0,0,0,0.15)] bg-[#f5f5f5]">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200">
                        <CloudLightning className="w-6 h-6 text-gray-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800">Tempestade</h2>
                    </div>

                    {/* Antes */}
                    <div className="mb-4">
                      <button
                        onClick={() => toggleSection('tempestade-antes')}
                        className="flex items-center gap-2 w-full text-left hover:bg-gray-50 p-2 rounded transition-colors"
                      >
                        <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections['tempestade-antes'] ? 'rotate-180' : ''}`} />
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#dcfce7]">
                            <Clock className="w-4 h-4 text-green-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-[#00ab4e]">Antes (Prevenção)</h3>
                        </div>
                      </button>
                      {expandedSections['tempestade-antes'] && (
                        <div className="ml-7 mt-3 space-y-3">
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Reforce Telhados e Janelas</h4>
                              <p className="text-sm text-gray-600">Verifique e fixe bem telhas, telhados e estruturas externas.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Guarde Objetos Externos</h4>
                              <p className="text-sm text-gray-600">Recolha móveis de jardim, plantas e objetos que possam voar.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Tenha Fontes de Luz</h4>
                              <p className="text-sm text-gray-600">Mantenha lanternas e velas em locais acessíveis.</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Durante */}
                    <div className="mb-4">
                      <button
                        onClick={() => toggleSection('tempestade-durante')}
                        className="flex items-center gap-2 w-full text-left hover:bg-gray-50 p-2 rounded transition-colors"
                      >
                        <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections['tempestade-durante'] ? 'rotate-180' : ''}`} />
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-red-100">
                            <AlertTriangle className="w-4 h-4 text-[#ee302f]" />
                          </div>
                          <h3 className="text-lg font-semibold text-[#ee302f]">Durante (Ação)</h3>
                        </div>
                      </button>
                      {expandedSections['tempestade-durante'] && (
                        <div className="ml-7 mt-3 space-y-3">
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Fique em Locais Seguros</h4>
                              <p className="text-sm text-gray-600">Permaneça em cômodos internos, longe de janelas e portas.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Evite Árvores e Postes</h4>
                              <p className="text-sm text-gray-600">Não se abrigue debaixo de árvores ou próximo a postes.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Desconecte Aparelhos</h4>
                              <p className="text-sm text-gray-600">Desligue eletrodomésticos da tomada para proteger de raios.</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Depois */}
                    <div>
                      <button
                        onClick={() => toggleSection('tempestade-depois')}
                        className="flex items-center gap-2 w-full text-left hover:bg-gray-50 p-2 rounded transition-colors"
                      >
                        <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections['tempestade-depois'] ? 'rotate-180' : ''}`} />
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#fff1d3]">
                            <CheckCircle className="w-4 h-4 text-[#ffb000]" />
                          </div>
                          <h3 className="text-lg font-semibold text-[#ffb000]">Depois (Recuperação)</h3>
                        </div>
                      </button>
                      {expandedSections['tempestade-depois'] && (
                        <div className="ml-7 mt-3 space-y-3">
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Verifique Danos</h4>
                              <p className="text-sm text-gray-600">Inspecione a casa em busca de danos estruturais e vazamentos.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Cuidado com Fios Elétricos</h4>
                              <p className="text-sm text-gray-600">Mantenha distância de fios caídos e comunique à concessionária.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Ajude Vizinhos</h4>
                              <p className="text-sm text-gray-600">Verifique se vizinhos precisam de ajuda, especialmente idosos.</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Enchente */}
              {(selectedCatastropheType === "Todos" || selectedCatastropheType === "Enchente") && (
                <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-[6px_6px_8px_rgba(0,0,0,0.15)] bg-[#f5f5f5]">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200">
                        <CloudRainWind className="w-6 h-6 text-gray-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800">Enchente</h2>
                    </div>

                    {/* Antes */}
                    <div className="mb-4">
                      <button
                        onClick={() => toggleSection('enchente-antes')}
                        className="flex items-center gap-2 w-full text-left hover:bg-gray-50 p-2 rounded transition-colors"
                      >
                        <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections['enchente-antes'] ? 'rotate-180' : ''}`} />
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#dcfce7]">
                            <Clock className="w-4 h-4 text-green-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-[#00ab4e]">Antes (Prevenção)</h3>
                        </div>
                      </button>
                      {expandedSections['enchente-antes'] && (
                        <div className="ml-7 mt-3 space-y-3">
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Monitore Rios e Córregos</h4>
                              <p className="text-sm text-gray-600">Acompanhe o nível dos rios próximos e alertas de enchente.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Construa Barreiras</h4>
                              <p className="text-sm text-gray-600">Use sacos de areia para proteger entradas da casa.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Tenha um Plano de Evacuação</h4>
                              <p className="text-sm text-gray-600">Defina rotas seguras e pontos de encontro familiares.</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Durante */}
                    <div className="mb-4">
                      <button
                        onClick={() => toggleSection('enchente-durante')}
                        className="flex items-center gap-2 w-full text-left hover:bg-gray-50 p-2 rounded transition-colors"
                      >
                        <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections['enchente-durante'] ? 'rotate-180' : ''}`} />
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-red-100">
                            <AlertTriangle className="w-4 h-4 text-[#ee302f]" />
                          </div>
                          <h3 className="text-lg font-semibold text-[#ee302f]">Durante (Ação)</h3>
                        </div>
                      </button>
                      {expandedSections['enchente-durante'] && (
                        <div className="ml-7 mt-3 space-y-3">
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Evacue Imediatamente</h4>
                              <p className="text-sm text-gray-600">Siga as ordens de evacuação das autoridades.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Não Use Carro</h4>
                              <p className="text-sm text-gray-600">Carros podem ser arrastados por poucos centímetros de água.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Comunique-se</h4>
                              <p className="text-sm text-gray-600">Avise familiares sobre sua localização e situação.</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Depois */}
                    <div>
                      <button
                        onClick={() => toggleSection('enchente-depois')}
                        className="flex items-center gap-2 w-full text-left hover:bg-gray-50 p-2 rounded transition-colors"
                      >
                        <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections['enchente-depois'] ? 'rotate-180' : ''}`} />
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#fff1d3]">
                            <CheckCircle className="w-4 h-4 text-[#ffb000]" />
                          </div>
                          <h3 className="text-lg font-semibold text-[#ffb000]">Depois (Recuperação)</h3>
                        </div>
                      </button>
                      {expandedSections['enchente-depois'] && (
                        <div className="ml-7 mt-3 space-y-3">
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Aguarde a Autorização</h4>
                              <p className="text-sm text-gray-600">Só retorne após liberação oficial da Defesa Civil.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Beba Agua Potável</h4>
                              <p className="text-sm text-gray-600">Use apenas água engarrafada ou fervida.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Previna Doenças</h4>
                              <p className="text-sm text-gray-600">Use repelentes e vacine-se contra tétano se necessário.</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Granizo */}
              {(selectedCatastropheType === "Todos" || selectedCatastropheType === "Granizo") && (
                <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-[6px_6px_8px_rgba(0,0,0,0.15)] bg-[#f5f5f5]">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200">
                        <CloudHail className="w-6 h-6 text-gray-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800">Granizo</h2>
                    </div>

                    {/* Antes */}
                    <div className="mb-4">
                      <button
                        onClick={() => toggleSection('granizo-antes')}
                        className="flex items-center gap-2 w-full text-left hover:bg-gray-50 p-2 rounded transition-colors"
                      >
                        <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections['granizo-antes'] ? 'rotate-180' : ''}`} />
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#dcfce7]">
                            <Clock className="w-4 h-4 text-green-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-[#00ab4e]">Antes (Prevenção)</h3>
                        </div>
                      </button>
                      {expandedSections['granizo-antes'] && (
                        <div className="ml-7 mt-3 space-y-3">
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Proteja Veículos</h4>
                              <p className="text-sm text-gray-600">Estacione em garagens cobertas ou use coberturas.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Reforce Coberturas</h4>
                              <p className="text-sm text-gray-600">Verifique telhados e estruturas de proteção.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Monitore Previsão</h4>
                              <p className="text-sm text-gray-600">Acompanhe alertas meteorológicos sobre tempestades de granizo.</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Durante */}
                    <div className="mb-4">
                      <button
                        onClick={() => toggleSection('granizo-durante')}
                        className="flex items-center gap-2 w-full text-left hover:bg-gray-50 p-2 rounded transition-colors"
                      >
                        <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections['granizo-durante'] ? 'rotate-180' : ''}`} />
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-red-100">
                            <AlertTriangle className="w-4 h-4 text-[#ee302f]" />
                          </div>
                          <h3 className="text-lg font-semibold text-[#ee302f]">Durante (Ação)</h3>
                        </div>
                      </button>
                      {expandedSections['granizo-durante'] && (
                        <div className="ml-7 mt-3 space-y-3">
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Abrigue-se Imediatamente</h4>
                              <p className="text-sm text-gray-600">Entre em edifícios ou abrigos sólidos.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Evite Áreas Abertas</h4>
                              <p className="text-sm text-gray-600">Granizo pode causar ferimentos graves.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Afaste-se de Janelas</h4>
                              <p className="text-sm text-gray-600">Vidros podem quebrar com o impacto do granizo.</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Depois */}
                    <div>
                      <button
                        onClick={() => toggleSection('granizo-depois')}
                        className="flex items-center gap-2 w-full text-left hover:bg-gray-50 p-2 rounded transition-colors"
                      >
                        <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections['granizo-depois'] ? 'rotate-180' : ''}`} />
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#fff1d3]">
                            <CheckCircle className="w-4 h-4 text-[#ffb000]" />
                          </div>
                          <h3 className="text-lg font-semibold text-[#ffb000]">Depois (Recuperação)</h3>
                        </div>
                      </button>
                      {expandedSections['granizo-depois'] && (
                        <div className="ml-7 mt-3 space-y-3">
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Verifique Danos</h4>
                              <p className="text-sm text-gray-600">Inspecione telhados, veículos e estruturas.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Limpe Detritos</h4>
                              <p className="text-sm text-gray-600">Remova pedaços de gelo e materiais danificados.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Documente Prejuízos</h4>
                              <p className="text-sm text-gray-600">Tire fotos para acionar seguros.</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Vendaval */}
              {(selectedCatastropheType === "Todos" || selectedCatastropheType === "Vendaval") && (
                <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-[6px_6px_8px_rgba(0,0,0,0.15)] bg-[#f5f5f5]">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200">
                        <Wind className="w-6 h-6 text-gray-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800">Vendaval</h2>
                    </div>

                    {/* Antes */}
                    <div className="mb-4">
                      <button
                        onClick={() => toggleSection('vendaval-antes')}
                        className="flex items-center gap-2 w-full text-left hover:bg-gray-50 p-2 rounded transition-colors"
                      >
                        <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections['vendaval-antes'] ? 'rotate-180' : ''}`} />
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#dcfce7]">
                            <Clock className="w-4 h-4 text-green-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-[#00ab4e]">Antes (Prevenção)</h3>
                        </div>
                      </button>
                      {expandedSections['vendaval-antes'] && (
                        <div className="ml-7 mt-3 space-y-3">
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Fixe Objetos Externos</h4>
                              <p className="text-sm text-gray-600">Prenda antenas, placas e estruturas soltas.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Pode Árvores</h4>
                              <p className="text-sm text-gray-600">Corte galhos que possam cair sobre edificações.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Reforce Portas e Janelas</h4>
                              <p className="text-sm text-gray-600">Use travas e barras de segurança.</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Durante */}
                    <div className="mb-4">
                      <button
                        onClick={() => toggleSection('vendaval-durante')}
                        className="flex items-center gap-2 w-full text-left hover:bg-gray-50 p-2 rounded transition-colors"
                      >
                        <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections['vendaval-durante'] ? 'rotate-180' : ''}`} />
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-red-100">
                            <AlertTriangle className="w-4 h-4 text-[#ee302f]" />
                          </div>
                          <h3 className="text-lg font-semibold text-[#ee302f]">Durante (Ação)</h3>
                        </div>
                      </button>
                      {expandedSections['vendaval-durante'] && (
                        <div className="ml-7 mt-3 space-y-3">
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Fique em Cômodos Internos</h4>
                              <p className="text-sm text-gray-600">Afastado de janelas e portas externas.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Não Saia de Casa</h4>
                              <p className="text-sm text-gray-600">Objetos voando podem causar acidentes graves.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Abaixe-se se Necessário</h4>
                              <p className="text-sm text-gray-600">Em caso de risco de colapso, proteja-se debaixo de mesas.</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Depois */}
                    <div>
                      <button
                        onClick={() => toggleSection('vendaval-depois')}
                        className="flex items-center gap-2 w-full text-left hover:bg-gray-50 p-2 rounded transition-colors"
                      >
                        <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections['vendaval-depois'] ? 'rotate-180' : ''}`} />
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#fff1d3]">
                            <CheckCircle className="w-4 h-4 text-[#ffb000]" />
                          </div>
                          <h3 className="text-lg font-semibold text-[#ffb000]">Depois (Recuperação)</h3>
                        </div>
                      </button>
                      {expandedSections['vendaval-depois'] && (
                        <div className="ml-7 mt-3 space-y-3">
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Cuidado com Destroços</h4>
                              <p className="text-sm text-gray-600">Evite andar sobre vidros e materiais perfurantes.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Verifique Estruturas</h4>
                              <p className="text-sm text-gray-600">Antes de entrar, verifique estabilidade de edifícios.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Afaste-se de Fios</h4>
                              <p className="text-sm text-gray-600">Mantenha distância de cabos elétricos caídos.</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Ciclone */}
              {(selectedCatastropheType === "Todos" || selectedCatastropheType === "Ciclone") && (
                <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-[6px_6px_8px_rgba(0,0,0,0.15)] bg-[#f5f5f5]">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200">
                        <Tornado className="w-6 h-6 text-gray-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800">Ciclone</h2>
                    </div>

                    {/* Antes */}
                    <div className="mb-4">
                      <button
                        onClick={() => toggleSection('ciclone-antes')}
                        className="flex items-center gap-2 w-full text-left hover:bg-gray-50 p-2 rounded transition-colors"
                      >
                        <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections['ciclone-antes'] ? 'rotate-180' : ''}`} />
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#dcfce7]">
                            <Clock className="w-4 h-4 text-green-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-[#00ab4e]">Antes (Prevenção)</h3>
                        </div>
                      </button>
                      {expandedSections['ciclone-antes'] && (
                        <div className="ml-7 mt-3 space-y-3">
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Construa Abrigo</h4>
                              <p className="text-sm text-gray-600">Tenha um cômodo seguro e reforçado na casa.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Estoque Suprimentos</h4>
                              <p className="text-sm text-gray-600">Água, comida, medicamentos e kit de primeiros socorros.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Monitore Alertas</h4>
                              <p className="text-sm text-gray-600">Acompanhe boletins meteorológicos constantemente.</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Durante */}
                    <div className="mb-4">
                      <button
                        onClick={() => toggleSection('ciclone-durante')}
                        className="flex items-center gap-2 w-full text-left hover:bg-gray-50 p-2 rounded transition-colors"
                      >
                        <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections['ciclone-durante'] ? 'rotate-180' : ''}`} />
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-red-100">
                            <AlertTriangle className="w-4 h-4 text-[#ee302f]" />
                          </div>
                          <h3 className="text-lg font-semibold text-[#ee302f]">Durante (Ação)</h3>
                        </div>
                      </button>
                      {expandedSections['ciclone-durante'] && (
                        <div className="ml-7 mt-3 space-y-3">
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Transe em Abrigo</h4>
                              <p className="text-sm text-gray-600">Fique no cômodo mais seguro da residência.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Não Olhe pela Janela</h4>
                              <p className="text-sm text-gray-600">Vidros podem estilhaçar com ventos fortes.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Mantenha Rádio Ligado</h4>
                              <p className="text-sm text-gray-600">Acompanhe informações das autoridades.</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Depois */}
                    <div>
                      <button
                        onClick={() => toggleSection('ciclone-depois')}
                        className="flex items-center gap-2 w-full text-left hover:bg-gray-50 p-2 rounded transition-colors"
                      >
                        <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections['ciclone-depois'] ? 'rotate-180' : ''}`} />
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#fff1d3]">
                            <CheckCircle className="w-4 h-4 text-[#ffb000]" />
                          </div>
                          <h3 className="text-lg font-semibold text-[#ffb000]">Depois (Recuperação)</h3>
                        </div>
                      </button>
                      {expandedSections['ciclone-depois'] && (
                        <div className="ml-7 mt-3 space-y-3">
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Aguarde o Fim</h4>
                              <p className="text-sm text-gray-600">Só saia do abrigo quando passar o ciclone.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Cuidado com Inundações</h4>
                              <p className="text-sm text-gray-600">Ciclones frequentemente causam enchentes.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Ajude na Recuperação</h4>
                              <p className="text-sm text-gray-600">Colabore com esforços comunitários de reconstrução.</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Deslizamento */}
              {(selectedCatastropheType === "Todos" || selectedCatastropheType === "Deslizamento") && (
                <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-[6px_6px_8px_rgba(0,0,0,0.15)] bg-[#f5f5f5]">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200">

                        <MountainSnow className="w-6 h-6 text-gray-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800">Deslizamento</h2>
                    </div>

                    {/* Antes */}
                    <div className="mb-4">
                      <button
                        onClick={() => toggleSection('deslizamento-antes')}
                        className="flex items-center gap-2 w-full text-left hover:bg-gray-50 p-2 rounded transition-colors"
                      >
                        <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections['deslizamento-antes'] ? 'rotate-180' : ''}`} />
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#dcfce7]">
                            <Clock className="w-4 h-4 text-green-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-[#00ab4e]">Antes (Prevenção)</h3>
                        </div>
                      </button>
                      {expandedSections['deslizamento-antes'] && (
                        <div className="ml-7 mt-3 space-y-3">
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Identifique Áreas de Risco</h4>
                              <p className="text-sm text-gray-600">Evite construir em encostas íngremes e instáveis.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Observe Sinais</h4>
                              <p className="text-sm text-gray-600">Fissuras no chão, árvores inclinadas e barulhos estranhos.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Plante Vegetação</h4>
                              <p className="text-sm text-gray-600">Raízes ajudam a segurar o solo nas encostas.</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Durante */}
                    <div className="mb-4">
                      <button
                        onClick={() => toggleSection('deslizamento-durante')}
                        className="flex items-center gap-2 w-full text-left hover:bg-gray-50 p-2 rounded transition-colors"
                      >
                        <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections['deslizamento-durante'] ? 'rotate-180' : ''}`} />
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-red-100">
                            <AlertTriangle className="w-4 h-4 text-[#ee302f]" />
                          </div>
                          <h3 className="text-lg font-semibold text-[#ee302f]">Durante (Ação)</h3>
                        </div>
                      </button>
                      {expandedSections['deslizamento-durante'] && (
                        <div className="ml-7 mt-3 space-y-3">
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Evacue Imediatamente</h4>
                              <p className="text-sm text-gray-600">Corra para áreas mais altas e estáveis.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Não Tente Salvar Objetos</h4>
                              <p className="text-sm text-gray-600">Priorize sua vida acima de qualquer bem material.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Grite para Alertar</h4>
                              <p className="text-sm text-gray-600">Avise vizinhos sobre o perigo iminente.</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Depois */}
                    <div>
                      <button
                        onClick={() => toggleSection('deslizamento-depois')}
                        className="flex items-center gap-2 w-full text-left hover:bg-gray-50 p-2 rounded transition-colors"
                      >
                        <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections['deslizamento-depois'] ? 'rotate-180' : ''}`} />
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#fff1d3]">
                            <CheckCircle className="w-4 h-4 text-[#ffb000]" />
                          </div>
                          <h3 className="text-lg font-semibold text-[#ffb000]">Depois (Recuperação)</h3>
                        </div>
                      </button>
                      {expandedSections['deslizamento-depois'] && (
                        <div className="ml-7 mt-3 space-y-3">
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Aguarde Resgate</h4>
                              <p className="text-sm text-gray-600">Mantenha-se em local seguro até ajuda chegar.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Não Retorne à Área</h4>
                              <p className="text-sm text-gray-600">O local continua perigoso mesmo após o deslizamento.</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Busque Apoio</h4>
                              <p className="text-sm text-gray-600">Procure ajuda psicológica para lidar com o trauma.</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Emergency Contacts */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mt-6">
                <h3 className="font-bold text-lg mb-4 text-red-800">Contatos de Emergência</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold mb-1">Defesa Civil</p>
                    <p className="text-2xl font-bold text-red-600">199</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold mb-1">Bombeiros</p>
                    <p className="text-2xl font-bold text-red-600">193</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold mb-1">SAMU</p>
                    <p className="text-2xl font-bold text-red-600">192</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentPage === "documents" && (
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
                  Material educativo sobre catástrofes
                  climáticas
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
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedCategory === category
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
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-200 ${isAnimating
                ? "opacity-0 scale-95"
                : "opacity-100 scale-100"
                }`}
            >
              {filteredDocuments.slice(0, documentsLimit).map((doc) => (
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
                Todos os materiais disponibilizados aqui são
                baseados em fontes oficiais e científicas
                confiáveis. Nosso objetivo é fornecer informação
                de qualidade para que você possa se preparar
                adequadamente e entender melhor a crise
                climática que enfrentamos. O conhecimento é a
                primeira linha de defesa.
              </p>
            </div>
          </div>
        )}

        {/* Página de Adicionar Ocorrência */}
        {currentPage === "add-occurrence" && (
          <div>

            {/* Form Container */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 max-w-3xl mx-auto">
              <h2 className="text-xl font-bold mb-4">
                Nova Ocorrência
              </h2>

              <p className="text-sm text-gray-600 mb-6">
                Primeiro, verifique se já existe uma ocorrência
                registrada sobre este evento
              </p>

              {/* Ocorrências próximas */}
              <div className="border border-[#ffcb04] rounded-lg p-4 mb-6 bg-[#fffbdf]">
                <h3 className="font-semibold mb-3 flex items-center gap-2 text-[#ff9900] text-[#ffa200]">
                  <AlertTriangle className="w-4 h-4" />
                  Ocorrências próximas a você agora
                </h3>


                <div className="space-y-2 max-h-40 overflow-y-auto border-2 border-[#dce1d9] rounded-[5px] p-2 custom-scroll bg-[#ffffff]">
                  {sortedReports.slice(0, 3).map((report) => (
                    <button
                      key={report.id}
                      onClick={() => {
                        setCurrentPage("social");
                        setSelectedOccurrence(report);
                      }}
                      className="w-full text-left p-3 bg-white rounded-md hover:bg-gray-50 transition-colors border border-[#ffcb04] bg-[#fffbdf]"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-sm">
                            {report.type}
                          </p>
                          <p className="text-xs text-gray-600">
                            {report.location.split(" - ")[0]} • {report.date.split(" - ")[0]}
                          </p>
                        </div>
                        <span
                          className={`text-xs px-3 py-1 rounded ${report.severityColor} text-white font-medium`}
                        >
                          {report.severity.toLowerCase()}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Formulário */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cidade
                    </label>
                    <input
                      type="text"
                      value={occurrenceForm.city}
                      onChange={(e) => setOccurrenceForm({ ...occurrenceForm, city: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Ex: Porto Alegre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bairro
                    </label>
                    <input
                      type="text"
                      value={occurrenceForm.neighborhood}
                      onChange={(e) => setOccurrenceForm({ ...occurrenceForm, neighborhood: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Ex: Centro"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Estado
                    </label>
                    <CustomDropdown
                      value={occurrenceForm.state}
                      onChange={(e) => setOccurrenceForm({ ...occurrenceForm, state: e })}
                      options={[
                        { value: "RS", label: "Rio Grande do Sul" },
                        { value: "SC", label: "Santa Catarina" },
                        { value: "PR", label: "Paraná" },
                      ]}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 font-medium">
                      Tipo de Evento
                    </label>
                    <CustomDropdown
                      value={occurrenceForm.type}
                      onChange={(value) => setOccurrenceForm({ ...occurrenceForm, type: value })}
                      options={[
                        { value: "Enchente", label: "Enchente" },
                        { value: "Tempestade", label: "Tempestade" },
                        { value: "Granizo", label: "Granizo" },
                        { value: "Vendaval", label: "Vendaval" },
                        { value: "Deslizamento", label: "Deslizamento" },
                        { value: "Ciclone", label: "Ciclone" },
                        { value: "Alagamento", label: "Alagamento" },
                      ]}
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-600 font-medium">
                      Severidade
                    </label>
                    <CustomDropdown
                      value={occurrenceForm.severity}
                      onChange={(value) => setOccurrenceForm({ ...occurrenceForm, severity: value })}
                      options={[
                        { value: "Perigo Baixo", label: "Perigo Baixo" },
                        { value: "Perigo Médio", label: "Perigo Médio" },
                        { value: "Perigo Alto", label: "Perigo Alto" },
                      ]}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição Detalhada
                  </label>
                  <textarea
                    value={occurrenceForm.description}
                    onChange={(e) => setOccurrenceForm({ ...occurrenceForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    rows={4}
                    placeholder="Forneça mais detalhes sobre o ocorrido"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fotos (opcional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-gray-400 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Camera className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        Clique para adicionar fotos ou arraste para cá
                      </p>
                    </label>
                  </div>

                  {attachedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium text-gray-700">
                        Arquivos anexados ({attachedFiles.length}):
                      </p>
                      {attachedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                          <span className="text-sm text-gray-600 truncate flex-1">
                            {file.name}
                          </span>
                          <button
                            onClick={() => removeFile(index)}
                            className="ml-2 text-red-500 hover:text-red-700 text-sm"
                          >
                            Remover
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setCurrentPage("social")}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>

                <button
                  onClick={async () => {
                    // Validate required fields
                    if (!occurrenceForm.city || !occurrenceForm.type || !occurrenceForm.severity || !occurrenceForm.description) {
                      alert('Por favor, preencha todos os campos obrigatórios.');
                      return;
                    }

                    try {
                      // Prepare occurrence data with severity color mapping
                      const severityColorMap: { [key: string]: string } = {
                        'Perigo Baixo': 'bg-green-500',
                        'Perigo Médio': 'bg-yellow-500',
                        'Perigo Alto': 'bg-red-500'
                      };

                      const occurrenceData = {
                        type: occurrenceForm.type,
                        severity: occurrenceForm.severity,
                        severityColor: severityColorMap[occurrenceForm.severity] || 'bg-gray-500',
                        city: occurrenceForm.city,
                        neighborhood: occurrenceForm.neighborhood || '',
                        state: occurrenceForm.state || '',
                        description: occurrenceForm.description,
                        location: occurrenceForm.location || `${occurrenceForm.city}${occurrenceForm.neighborhood ? ', ' + occurrenceForm.neighborhood : ''}${occurrenceForm.state ? ' - ' + occurrenceForm.state : ''}`,
                        likes: 0,
                        dislikes: 0,
                        reportsCount: 1
                      };

                      // Save to Supabase
                      const result = await saveUserOccurrence(occurrenceData);

                      if (result) {
                        // Save the first report for this occurrence
                        await saveUserReport(result.id.toString(), occurrenceData.description);

                        // Create new occurrence object for local state
                        const newOccurrence = {
                          id: result.id || Math.max(...reports.map(r => r.id), 0) + 1,
                          ...occurrenceData,
                          date: new Date().toLocaleDateString('pt-BR') + ' - ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
                          user: user?.user_metadata?.display_name || user?.email || 'Usuário',
                          isNew: true,
                          others: 0,
                          likes: 0,
                          dislikes: 0,
                          isFavorite: false,
                          title: occurrenceData.type || 'Nova Ocorrência',
                          isFirstReport: true // Mark as first report for green border
                        };

                        // Add new occurrence to the front of the list
                        setShuffledReports(prev => [newOccurrence, ...prev]);

                        // Mark as new occurrence for sorting
                        setNewOccurrences(prev => [...prev, newOccurrence.id]);

                        // Reset form
                        setOccurrenceForm({
                          city: '',
                          neighborhood: '',
                          state: '',
                          description: '',
                          location: '',
                          type: '',
                          severity: ''
                        });
                        setAttachedFiles([]);

                        // Navigate back to social page
                        setCurrentPage("social");
                        alert('Ocorrência enviada com sucesso!');
                      } else {
                        alert('Erro ao salvar ocorrência. Tente novamente.');
                      }
                    } catch (error) {
                      console.error('Error submitting occurrence:', error);
                      alert('Erro ao enviar ocorrência. Tente novamente.');
                    }
                  }}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                >
                  Enviar Ocorrência
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Profile Page - requires authentication */}
        {(currentPage as PageType) === "profile" && user && (
          <div>
            {/* Card de Informações do Usuário */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {user?.user_metadata?.display_name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold">{user?.user_metadata?.display_name || "Usuário"}</h1>
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
                  className={`flex-1 px-6 py-3 font-medium transition-colors ${profileTab === "notificacoes"
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
                  className={`flex-1 px-6 py-3 font-medium transition-colors ${profileTab === "relatos"
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
                  className={`flex-1 px-6 py-3 font-medium transition-colors ${profileTab === "favoritos"
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

            {/* Conteúdo das Abas */}
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
                      <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <p>{notification}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {profileTab === "relatos" && (
              <div>
                <h2 className="text-xl font-bold mb-4">
                  Meus Relatos
                </h2>
                {reports.filter(r => r.user === (user?.user_metadata?.display_name || "Usuário")).length === 0 ? (
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
                      .filter(r => r.user === (user?.user_metadata?.display_name || "Usuário"))
                      .map((report) => (
                        <div key={report.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                          <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 ${getProfileColor(report.user)} rounded-full flex items-center justify-center`}>
                              <span className="text-white text-lg font-bold">
                                {getInitial(report.user)}
                              </span>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">{report.title}</h3>
                              <p className="text-gray-600 mb-2">{report.description}</p>
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
                      .filter(r => favorites.includes(r.id))
                      .map((report) => (
                        <div key={report.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                          <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 ${getProfileColor(report.user)} rounded-full flex items-center justify-center`}>
                              <span className="text-white text-lg font-bold">
                                {getInitial(report.user)}
                              </span>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">{report.title}</h3>
                              <p className="text-gray-600 mb-2">{report.description}</p>
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
        )}

        {/* End Main Content */}
        <div>
          {/* Add Report Modal */}

          {/* SEGUNDO MODAL */}
          {currentPage === "add-report" && (
            <div className="fixed inset-20 flex items-start justify-center p-4 pt-10 z-40 overflow-y-auto">
              <div className="bg-white border-2 border-gray-400 rounded-lg shadow-[6px_6px_8px_rgba(0,0,0,0.25)] max-w-2xl w-full px-[24px] py-[20px] mx-[0px] my-[5px]">
                <h2 className="text-2xl font-bold mb-2 text-left">
                  Adicionar Relato
                </h2>

                {authError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-600 text-sm">{authError}</p>
                  </div>
                )}

                {authMessage && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-green-600 text-sm">{authMessage}</p>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bairro:
                    </label>
                    <input
                      type="text"
                      placeholder="Digite"
                      value={reportForm.neighborhood}
                      onChange={(e) => setReportForm(prev => ({ ...prev, neighborhood: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  {/* SEVERIDADE */}
                  <div>
                    <label className="text-sm text-gray-600 font-medium">
                      Gravidade:
                    </label>
                    <CustomDropdown
                      value={reportForm.severity}
                      onChange={(value) => setReportForm(prev => ({ ...prev, severity: value }))}
                      options={[
                        { value: "Perigo Baixo", label: "Perigo Baixo" },
                        { value: "Perigo Moderado", label: "Perigo Moderado" },
                        { value: "Perigo Alto", label: "Perigo Alto" },
                        { value: "Perigo Extremo", label: "Perigo Extremo" }
                      ]}
                      placeholder="Selecione..."
                    />
                  </div>

                  {/* DESCRIÇÃO */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descrição:
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Descreva o que aconteceu com você..."
                      value={reportForm.description}
                      onChange={(e) => setReportForm(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setCurrentPage("social")}


                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>

                  <button
                    onClick={handleReportSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Concluir"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
