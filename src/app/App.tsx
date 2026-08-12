import React, { useState, useEffect } from "react";
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
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../lib/supabase";

// Frases de conscientização aleatórias
const awarenessMessages = [
  {
    title: "Informação que salva vidas",
    description:
      "Acompanhe alertas em tempo real, acesse orientações de segurança e compartilhe relatos sobre eventos climáticos na sua região. Juntos somos mais fortes.",
    relatedDoc: 1,
  },
  {
    title: "A crise climática é agora",
    description:
      "Não é mais sobre o futuro. As mudanças climáticas já afetam milhões de pessoas. Cada ação conta, cada preparação importa.",
    relatedDoc: 5,
  },
  {
    title: "Conhecimento é prevenção",
    description:
      "Quanto mais você sabe sobre catástrofes climáticas, melhor preparado estará. Eduque-se, proteja sua família.",
    relatedDoc: 3,
  },
  {
    title: "Sua voz importa",
    description:
      "Compartilhar o que você vê pode alertar milhares. Seja os olhos da sua comunidade contra desastres naturais.",
    relatedDoc: 1,
  },
  {
    title: "Preparação salva vidas",
    description:
      "Ter um plano de emergência familiar pode ser a diferença entre vida e morte. Não espere o desastre acontecer.",
    relatedDoc: 4,
  },
  {
    title: "Cada segundo conta",
    description:
      "Em situações de emergência climática, a rapidez da informação pode salvar vidas. Esteja conectado, esteja preparado.",
    relatedDoc: 2,
  },
  {
    title: "Comunidade resiliente",
    description:
      "Vizinhos que se ajudam constroem comunidades mais fortes. Compartilhe informações, ofereça apoio.",
    relatedDoc: 1,
  },
  {
    title: "O clima mudou, adapte-se",
    description:
      "Eventos extremos não são mais exceção. Prepare sua casa, sua família e sua mente para a nova realidade climática.",
    relatedDoc: 5,
  },
  {
    title: "Alerta precoce salva",
    description:
      "Sistemas de alerta dão tempo para evacuar, se proteger, se preparar. Preste atenção nos avisos oficiais.",
    relatedDoc: 2,
  },
  {
    title: "Educação climática é urgente",
    description:
      "Entender as causas e consequências das mudanças climáticas nos torna cidadãos mais conscientes e preparados.",
    relatedDoc: 5,
  },
  {
    title: "Sua história importa",
    description:
      "Relatos de sobreviventes ajudam outros a se prepararem. Compartilhe sua experiência, ajude a comunidade.",
    relatedDoc: 1,
  },
  {
    title: "Não ignore os sinais",
    description:
      "Céu escuro, vento forte, chuva repentina. Aprenda a ler os sinais da natureza e aja rapidamente.",
    relatedDoc: 2,
  },
  {
    title: "Kit de emergência é essencial",
    description:
      "Água, alimentos, remédios, documentos. Tenha sempre um kit preparado. Pode fazer toda a diferença.",
    relatedDoc: 4,
  },
  {
    title: "Mapas salvam vidas",
    description:
      "Conhecer áreas de risco, rotas de fuga e abrigos pode ser crucial. Estude mapas da sua região.",
    relatedDoc: 3,
  },
  {
    title: "A prevenção é coletiva",
    description:
      "Governos, cientistas, cidadãos - todos temos papel na redução de riscos. Exija ação, participe ativamente.",
    relatedDoc: 5,
  },
  {
    title: "Tecnologia a nosso favor",
    description:
      "Apps, alertas, redes sociais. Use a tecnologia para se manter informado e protegido.",
    relatedDoc: 1,
  },
  {
    title: "Vulnerabilidade é universal",
    description:
      "Ninguém está imune a desastres naturais.Ricos ou pobres, todos precisam estar preparados.",
    relatedDoc: 3,
  },
  {
    title: "Solidariedade em tempos de crise",
    description:
      "Quando o desastre acontece, a união faz a diferença. Ajude quem precisa, aceite ajuda quando necessário.",
    relatedDoc: 1,
  },
  {
    title: "Dados salvam vidas",
    description:
      "Previsões meteorológicas, histórico de eventos, padrões climáticos. A ciência nos dá ferramentas para agir.",
    relatedDoc: 5,
  },
  {
    title: "O futuro depende de nós",
    description:
      "Cada decisão hoje afeta as gerações futuras. Vamos construir um planeta mais seguro e resiliente juntos.",
    relatedDoc: 5,
  },
];

// Mock data - Notícias com links reais
const mockNews = [
  {
   id: 1,
    title:
      "Rio Grande do Sul enfrenta crise climática sem precedentes",
    date: "30/04/2026",
    summary:
      "Cientistas alertam que eventos climáticos extremos estão se tornando mais frequentes devido às mudanças climáticas.",
    category: "Crítico",
    image:
      "https://www.rbsdirect.com.br/filestore/9/9/3/5/1/8/4_b0d04c209676f2a/4815399_930663d2638e420.jpeg?version=1575255600",
    link: "https://g1.globo.com/rs/rio-grande-do-sul/",
  },
  {
    id: 2,
    title: "Defesa Civil emite alerta para temporais no estado",
    date: "29/04/2026",
    summary:
      "Previsão indica chuvas intensas e ventos fortes para os próximos dias em várias regiões gaúchas.",
    category: "Alerta",
    image:
      "https://agoranovale.com.br/wp-content/uploads/2025/03/temporal-agoranovale.jpeg.webp",
    link: "https://www.clicrbs.com.br/rs",
  },
  {
    id: 3,
    title:
      "Aumento de 300% em desastres naturais na última década",
    date: "28/04/2026",
    summary:
      "Dados da ONU mostram crescimento alarmante de eventos climáticos extremos no Brasil.",
    category: "Análise",
    image:
      "https://odia.ig.com.br/_midias/jpg/2022/02/17/petropolis_tragedia-24341338.jpg",
    link: "https://www.bbc.com/portuguese",
  },
  {
    id: 4,
    title: "Ciclones extratropicais ameaçam costa gaúcha",
    date: "27/04/2026",
    summary:
      "Aquecimento dos oceanos intensifica fenômenos meteorológicos no litoral do RS.",
    category: "Alerta",
    image:
      "https://img.odcdn.com.br/wp-content/uploads/2024/08/ciclone-extratropical-1-scaled.jpg",
    link: "https://gauchazh.clicrbs.com.br/",
  },
  {
    id: 5,
    title:
      "Enchentes deslocam milhares de famílias no interior",
    date: "26/04/2026",
    summary:
      "Chuvas acima da média causam transbordamento de rios e alagamentos em cidades do RS.",
    category: "Crítico",
    image:
      "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&h=400&fit=crop",
    link: "https://www.correiodopovo.com.br/",
  },
  {
    id: 6,
    title:
      "Especialistas alertam: eventos extremos serão mais comuns",
    date: "25/04/2026",
    summary:
      "Mudanças climáticas tornarão tempestades, secas e ondas de calor mais frequentes e intensas.",
    category: "Análise",
    image:
      "https://conteudo.imguol.com.br/c/noticias/c9/2025/01/09/8jan2025---uma-casa-queima-em-los-angeles-devido-aos-incendios-florestais-que-atingem-a-california-1736432964733_v2_615x300.jpg",
    link: "https://www1.folha.uol.com.br/",
  },
];

// Mock data - Documentos
const mockDocuments = [
  {
    id: 1,
    title: "Guia Completo de Preparação para Enchentes",
    description:
      "Manual detalhado sobre como se preparar, proteger sua família e propriedade antes, durante e depois de enchentes.",
    category: "Enchentes",
    size: "2.4 MB",
    pages: 45,
    downloads: 1234,
  },
  {
    id: 2,
    title: "Protocolo de Segurança em Tempestades Severas",
    description:
      "Diretrizes oficiais da Defesa Civil sobre procedimentos de segurança durante tempestades e vendavais.",
    category: "Tempestades",
    size: "1.8 MB",
    pages: 32,
    downloads: 987,
  },
  {
    id: 3,
    title: "Atlas de Áreas de Risco do Rio Grande do Sul",
    description:
      "Mapeamento completo das regiões mais vulneráveis a desastres naturais no estado, com dados históricos e projeções.",
    category: "Mapas",
    size: "15.2 MB",
    pages: 120,
    downloads: 2341,
  },
  {
    id: 4,
    title: "Kit de Emergência: O que você precisa ter",
    description:
      "Lista completa de itens essenciais para montar seu kit de emergência familiar para situações de catástrofe.",
    category: "Preparação",
    size: "850 KB",
    pages: 12,
    downloads: 3456,
  },
  {
    id: 5,
    title: "Mudanças Climáticas e Seus Impactos no Brasil",
    description:
      "Análise científica abrangente sobre como as mudanças climáticas estão afetando o Brasil e o que podemos fazer.",
    category: "Educação",
    size: "5.6 MB",
    pages: 78,
    downloads: 1876,
  },
  {
    id: 6,
    title: "Primeiros Socorros em Situações de Desastre",
    description:
      "Manual prático de primeiros socorros específico para situações de emergência durante catástrofes naturais.",
    category: "Preparação",
    size: "3.2 MB",
    pages: 56,
    downloads: 2109,
  },
  {
    id: 7,
    title: "História das Catástrofes Climáticas no RS",
    description:
      "Documentação histórica dos principais eventos climáticos extremos que afetaram o Rio Grande do Sul desde 1900.",
    category: "Educação - História",
    size: "8.5 MB",
    pages: 95,
    downloads: 876,
  },
  {
    id: 8,
    title: "Causas das Mudanças Climáticas Globais",
    description:
      "Análise científica detalhada sobre os fatores que contribuem para o aquecimento global e mudanças climáticas.",
    category: "Educação - Causas",
    size: "4.2 MB",
    pages: 62,
    downloads: 1543,
  },
  {
    id: 9,
    title: "Influência Humana no Clima Regional",
    description:
      "Estudo sobre como atividades humanas afetam o clima do Rio Grande do Sul e podem agravar desastres naturais.",
    category: "Educação - Influências",
    size: "3.8 MB",
    pages: 51,
    downloads: 1098,
  },
  {
    id: 10,
    title: "Prevenção de Desastres: Guia Prático",
    description:
      "Manual completo sobre medidas preventivas que comunidades e indivíduos podem tomar para reduzir riscos.",
    category: "Educação - Prevenção",
    size: "2.9 MB",
    pages: 38,
    downloads: 2876,
  },
  {
    id: 11,
    title: "Como Agir Durante Tempestades Severas",
    description:
      "Protocolo de segurança específico para tempestades com raios, ventos e chuvas intensas.",
    category: "Tempestades",
    size: "1.5 MB",
    pages: 24,
    downloads: 1654,
  },
  {
    id: 12,
    title: "Proteção Contra Vendavais",
    description:
      "Orientações sobre como proteger sua propriedade e família durante ventos extremos.",
    category: "Vendavais",
    size: "1.2 MB",
    pages: 18,
    downloads: 987,
  },
  {
    id: 13,
    title: "Sobrevivência em Granizo Extremo",
    description:
      "Guia sobre como se proteger durante eventos de granizo de grande intensidade.",
    category: "Granizo",
    size: "980 KB",
    pages: 15,
    downloads: 654,
  },
  {
    id: 14,
    title: "Evacuação em Alagamentos",
    description:
      "Procedimentos de evacuação segura quando sua área está sendo alagada.",
    category: "Alagamento",
    size: "2.1 MB",
    pages: 29,
    downloads: 2341,
  },
  {
    id: 15,
    title: "Deslizamentos de Terra: Sinais e Ações",
    description:
      "Como identificar áreas de risco e o que fazer quando há risco de deslizamento.",
    category: "Deslizamento",
    size: "3.4 MB",
    pages: 42,
    downloads: 1432,
  },
  {
    id: 16,
    title: "Ciclones: Previsão e Preparação",
    description:
      "Entenda como ciclones se formam e como se preparar para sua chegada.",
    category: "Ciclone",
    size: "4.7 MB",
    pages: 58,
    downloads: 1876,
  },
  {
    id: 17,
    title: "Mapa de Áreas de Risco - Porto Alegre",
    description:
      "Mapeamento detalhado das zonas de maior risco para enchentes e deslizamentos na capital.",
    category: "Mapas",
    size: "12.3 MB",
    pages: 85,
    downloads: 3210,
  },
  {
    id: 18,
    title: "Mapa de Áreas de Risco - Interior do RS",
    description:
      "Atlas com áreas de risco em cidades do interior do estado, incluindo rotas de fuga.",
    category: "Mapas",
    size: "18.9 MB",
    pages: 156,
    downloads: 2109,
  },
  {
    id: 19,
    title: "Rotas de Evacuação - Região Metropolitana",
    description:
      "Mapas com rotas seguras para evacuação em caso de emergência na região metropolitana.",
    category: "Mapas",
    size: "6.8 MB",
    pages: 34,
    downloads: 1765,
  },
  {
    id: 20,
    title: "Kit de Sobrevivência Familiar",
    description:
      "Lista completa e checklist para montar um kit de emergência para toda a família.",
    category: "Preparação",
    size: "1.1 MB",
    pages: 22,
    downloads: 4532,
  },
  {
    id: 21,
    title: "Plano de Emergência para Escolas",
    description:
      "Protocolo específico para instituições de ensino se prepararem para desastres naturais.",
    category: "Preparação",
    size: "2.3 MB",
    pages: 41,
    downloads: 1234,
  },
  {
    id: 22,
    title: "Abrigos de Emergência no RS",
    description:
      "Localizaação e informações sobre abrigos oficiais em caso de catástrofes.",
    category: "Preparação",
    size: "1.7 MB",
    pages: 28,
    downloads: 2654,
  },
  {
    id: 23,
    title: "Comunicação em Situações de Crise",
    description:
      "Como manter contato com família e autoridades quando infraestrutura está comprometida.",
    category: "Preparação",
    size: "890 KB",
    pages: 16,
    downloads: 1543,
  },
  {
    id: 24,
    title: "Reconstrução Após Desastres",
    description:
      "Guia sobre como reconstruir vida e propriedade após passar por uma catástrofe natural.",
    category: "Preparação",
    size: "3.9 MB",
    pages: 67,
    downloads: 987,
  },
  {
    id: 25,
    title: "Impacto Psicológico de Desastres",
    description:
      "Como lidar com trauma, ansiedade e estresse pós-traumático após catástrofes.",
    category: "Preparação",
    size: "2.2 MB",
    pages: 35,
    downloads: 876,
  },
  {
    id: 26,
    title: "Pets em Emergências Climáticas",
    description:
      "Como proteger e evacuar seus animais de estimação durante desastres naturais.",
    category: "Preparação",
    size: "1.4 MB",
    pages: 21,
    downloads: 2341,
  },
];


// Type definition for report objects
interface Report {
  id: number;
  user: string;
  others: number;
  type: string;
  severity: string;
  severityColor: string;
  location: string;
  date: string;
  likes: number;
  dislikes: number;
  isFavorite: boolean;
  title: string;
  description: string;
  occurrenceId?: number;
  isFirstReport?: boolean;
}

// Função para gerar likes realistas baseado no número de relatos
const generateRealisticLikes = (reportsCount: number, severity: string): number => {
  const maxLikes = Math.min(reportsCount * 10, 500); // Máximo 10x o número de relatos, mas no máximo 500
  const minLikes = Math.max(reportsCount * 2, 5); // Mínimo 2x o número de relatos, mas no mínimo 5

  // Ocorrências mais graves tendem a ter mais engajamento
  const severityMultiplier = severity === "Perigo Alto" ? 1.5 :
    severity === "Perigo Médio" ? 1.2 : 1.0;

  const adjustedMax = Math.min(maxLikes * severityMultiplier, 500);
  return Math.floor(Math.random() * (adjustedMax - minLikes + 1)) + minLikes;
};

// Mock data - Relatos
const mockReports: Report[] = [
  {
    id: 1,
    user: "Maria Clara",
    others: 25,
    type: "GRANIZO",
    severity: "Perigo Baixo",
    severityColor: "bg-green-500",
    location: "Erechim, RS - B. Centro",
    date: "10/11/2025 - 10:50 AM",
    likes: generateRealisticLikes(25, "Perigo Baixo"),
    dislikes: Math.floor(generateRealisticLikes(25, "Perigo Baixo") * 0.3),
    isFavorite: false,
    title: "Granizo Intenso em Erechim",
    description: "Pedras de granizo atingiram a região central de Erechim, causando danos a veículos e telhados. Moradores relatam pedras de até 3cm.",
  },
  {
    id: 2,
    user: "João Mendes",
    others: 2,
    type: "ALAGAMENTO",
    severity: "Perigo Baixo",
    severityColor: "bg-green-500",
    location: "Erechim, RS - B. Centro",
    date: "10/11/2025 - 10:50 AM",
    likes: generateRealisticLikes(2, "Perigo Baixo"),
    dislikes: Math.floor(generateRealisticLikes(2, "Perigo Baixo") * 0.3),
    isFavorite: false,
    title: "Alagamento no Centro da Cidade",
    description: "Ruas do centro ficaram alagadas após chuva forte. Trânsito interrompido em algumas vias principais.",
  },
  {
    id: 3,
    user: "André da Silva",
    others: 10,
    type: "VENDAVAL",
    severity: "Perigo Baixo",
    severityColor: "bg-green-500",
    location: "Erechim, RS - B. Progresso",
    date: "10/11/2025 - 10:50 AM",
    likes: generateRealisticLikes(10, "Perigo Baixo"),
    dislikes: Math.floor(generateRealisticLikes(10, "Perigo Baixo") * 0.3),
    isFavorite: false,
    title: "Vendaval no Bairro Progresso",
    description: "Ventos fortes derrubaram árvores e fios elétricos no bairro Progresso. Equipes de emergência foram acionadas.",
  },
  {
    id: 4,
    user: "Ana Costa",
    others: 15,
    type: "TEMPESTADE",
    severity: "Perigo Baixo",
    severityColor: "bg-green-500",
    location: "Porto Alegre, RS - B. Partenon",
    date: "09/11/2025 - 8:30 PM",
    likes: generateRealisticLikes(15, "Perigo Baixo"),
    dislikes: Math.floor(generateRealisticLikes(15, "Perigo Baixo") * 0.3),
    isFavorite: true,
    title: "Tempestade em Porto Alegre",
    description: "Forte tempestade com raios atingiu o bairro Partenon. Moradores relatam queda de energia e danos em imóveis.",
  },
  {
    id: 5,
    user: "Carlos Oliveira",
    others: 8,
    type: "ENCHENTE",
    severity: "Perigo Baixo",
    severityColor: "bg-green-500",
    location: "Canoas, RS - B. Guajuviras",
    date: "09/11/2025 - 6:15 PM",
    likes: generateRealisticLikes(8, "Perigo Baixo"),
    dislikes: Math.floor(generateRealisticLikes(8, "Perigo Baixo") * 0.3),
    isFavorite: false,
    title: "Enchente em Canoas",
    description: "Nível do arroio subiu rapidamente após chuvas intensas. Casas nas margens foram atingidas pela água.",
  },
  {
    id: 6,
    user: "Fernanda Lima",
    others: 3,
    type: "DESLIZAMENTO",
    severity: "Perigo Alto",
    severityColor: "bg-red-500",
    location: "Gramado, RS - Região Montanhosa",
    date: "09/11/2025 - 3:45 PM",
    likes: generateRealisticLikes(3, "Perigo Alto"),
    dislikes: Math.floor(generateRealisticLikes(3, "Perigo Alto") * 0.3),
    isFavorite: true,
    title: "Deslizamento em Gramado",
    description: "Grande deslizamento de terra bloqueou rodovia na região montanhosa. Tráfego interrompido e risco de novos deslizamentos.",
  },
  {
    id: 7,
    user: "Roberto Santos",
    others: 12,
    type: "CICLONE",
    severity: "Perigo Alto",
    severityColor: "bg-red-500",
    location: "Torres, RS - Litoral",
    date: "09/11/2025 - 2:20 PM",
    likes: generateRealisticLikes(12, "Perigo Alto"),
    dislikes: Math.floor(generateRealisticLikes(12, "Perigo Alto") * 0.3),
    isFavorite: false,
    title: "Ciclone no Litoral",
    description: "Ciclone extratropical atingiu Torres com ventos de até 120km/h. Ondas de 5 metros e ressaca na costa.",
  },
  {
    id: 8,
    user: "Juliana Pereira",
    others: 6,
    type: "GRANIZO",
    severity: "Perigo Alto",
    severityColor: "bg-red-500",
    location: "Caxias do Sul, RS - B. São Pelegrino",
    date: "08/11/2025 - 7:30 PM",
    likes: generateRealisticLikes(6, "Perigo Alto"),
    dislikes: Math.floor(generateRealisticLikes(6, "Perigo Alto") * 0.3),
    isFavorite: false,
    title: "Granizo Destrutivo em Caxias",
    description: "Granizo de grande porte causou sérios danos na serra. Vidros quebrados, carros danificados e prejuízos na agricultura.",
  },
  {
    id: 9,
    user: "Marcos Ferreira",
    others: 4,
    type: "ALAGAMENTO",
    severity: "Perigo Baixo",
    severityColor: "bg-green-500",
    location: "Novo Hamburgo, RS - Centro",
    date: "08/11/2025 - 5:00 PM",
    likes: generateRealisticLikes(4, "Perigo Baixo"),
    dislikes: Math.floor(generateRealisticLikes(4, "Perigo Baixo") * 0.3),
    isFavorite: true,
    title: "Alagamento em Novo Hamburgo",
    description: "Centro da cidade ficou alagado após chuva torrencial. Comércio afetado e trânsito caótico.",
  },
  {
    id: 10,
    user: "Patricia Gomes",
    others: 18,
    type: "VENDAVAL",
    severity: "Perigo Médio",
    severityColor: "bg-yellow-500",
    location: "São Leopoldo, RS - B. Campinas",
    date: "08/11/2025 - 3:30 PM",
    likes: generateRealisticLikes(18, "Perigo Médio"),
    dislikes: Math.floor(generateRealisticLikes(18, "Perigo Médio") * 0.3),
    isFavorite: false,
    title: "Vendaval em São Leopoldo",
    description: "Ventos fortes causaram destruição no bairro Campinas. Árvores caíram e telhados foram arrancados.",
  },
  {
    id: 11,
    user: "Lucas Almeida",
    others: 7,
    type: "TEMPESTADE",
    severity: "Perigo Baixo",
    severityColor: "bg-green-500",
    location: "Caxias do Sul, RS - B. Pinheiro",
    date: "02/11/2025 - 3:45 PM",
    likes: generateRealisticLikes(7, "Perigo Baixo"),
    dislikes: Math.floor(generateRealisticLikes(7, "Perigo Baixo") * 0.3),
    isFavorite: false,
    title: "Tempestade em Caxias do Sul",
    description: "Tempestade com raios e ventos fortes atingiu o bairro Pinheiro. Moradores relatam queda de energia e danos materiais.",
  },
  {
    id: 12,
    user: "Camila Rocha",
    others: 9,
    type: "ENCHENTE",
    severity: "Perigo Baixo",
    severityColor: "bg-green-500",
    location: "Erechim, RS - B. São José",
    date: "01/11/2025 - 10:30 AM",
    likes: generateRealisticLikes(9, "Perigo Baixo"),
    dislikes: Math.floor(generateRealisticLikes(9, "Perigo Baixo") * 0.3),
    isFavorite: true,
    title: "Enchente em Erechim",
    description: "Águas do rio subiram e atingiram o bairro São José. Famílias foram resgatadas e abrigos foram abertos.",
  },
  {
    id: 13,
    user: "Diego Martins",
    others: 5,
    type: "DESLIZAMENTO",
    severity: "Perigo Médio",
    severityColor: "bg-yellow-500",
    location: "Porto Alegre, RS - B. Petrópolis",
    date: "31/10/2025 - 5:20 PM",
    likes: generateRealisticLikes(5, "Perigo Médio"),
    dislikes: Math.floor(generateRealisticLikes(5, "Perigo Médio") * 0.3),
    isFavorite: false,
    title: "Deslizamento em Petrópolis",
    description: "Terra deslizou em morro do bairro Petrópolis. Risco de novos deslizamentos e evacuação preventiva de moradias.",
  },
  {
    id: 14,
    user: "Bruna Castro",
    others: 11,
    type: "CICLONE",
    severity: "Perigo Alto",
    severityColor: "bg-red-500",
    location: "Caxias do Sul, RS - B. Floresta",
    date: "30/10/2025 - 8:15 AM",
    likes: generateRealisticLikes(11, "Perigo Alto"),
    dislikes: Math.floor(generateRealisticLikes(11, "Perigo Alto") * 0.3),
    isFavorite: false,
    title: "Ciclone na Serra",
    description: "Ciclone atingiu região serrana com ventos extremos. Danos em estruturas e risco de queda de árvores.",
  },
  {
    id: 15,
    user: "Ricardo Silva",
    others: 13,
    type: "GRANIZO",
    severity: "Perigo Baixo",
    severityColor: "bg-green-500",
    location: "Erechim, RS - B. Erval",
    date: "29/10/2025 - 2:40 PM",
    likes: generateRealisticLikes(13, "Perigo Baixo"),
    dislikes: Math.floor(generateRealisticLikes(13, "Perigo Baixo") * 0.3),
    isFavorite: true,
    title: "Granizo no Bairro Erval",
    description: "Chuva de granizo atingiu bairro Erval. Danos em veículos e telhados, mas sem feridos registrados.",
  },
  {
    id: 16,
    user: "Tatiane Souza",
    others: 2,
    type: "ALAGAMENTO",
    severity: "Perigo Baixo",
    severityColor: "bg-green-500",
    location: "Porto Alegre, RS - B. Rio Branco",
    date: "28/10/2025 - 11:55 AM",
    likes: generateRealisticLikes(2, "Perigo Baixo"),
    dislikes: Math.floor(generateRealisticLikes(2, "Perigo Baixo") * 0.3),
    isFavorite: false,
    title: "Alagamento em Rio Branco",
    description: "Rua principal do bairro Rio Branco ficou alagada. Trânsito prejudicado e comércio afetado.",
  },
  {
    id: 17,
    user: "Felipe Nunes",
    others: 8,
    type: "VENDAVAL",
    severity: "Perigo Médio",
    severityColor: "bg-yellow-500",
    location: "Caxias do Sul, RS - B. Santa Lúcia",
    date: "27/10/2025 - 6:30 PM",
    likes: generateRealisticLikes(8, "Perigo Médio"),
    dislikes: Math.floor(generateRealisticLikes(8, "Perigo Médio") * 0.3),
    isFavorite: false,
    title: "Vendaval em Santa Lúcia",
    description: "Ventos fortes atingiram bairro Santa Lúcia. Árvores caíram e danos em telhados e estruturas.",
  },
  {
    id: 18,
    user: "Aline Barbosa",
    others: 4,
    type: "TEMPESTADE",
    severity: "Perigo Médio",
    severityColor: "bg-yellow-500",
    location: "Erechim, RS - B. São Pedro",
    date: "26/10/2025 - 9:45 AM",
    likes: generateRealisticLikes(4, "Perigo Médio"),
    dislikes: Math.floor(generateRealisticLikes(4, "Perigo Médio") * 0.3),
    isFavorite: true,
    title: "Tempestade em São Pedro",
    description: "Forte tempestade atingiu bairro São Pedro. Raios, ventos fortes e chuva intensa causaram danos.",
  },
  {
    id: 19,
    user: "Gustavo Costa",
    others: 7,
    type: "GRANIZO",
    severity: "Perigo Médio",
    severityColor: "bg-yellow-500",
    location: "Porto Alegre, RS - B. Bom Fim",
    date: "25/10/2025 - 3:20 PM",
    likes: generateRealisticLikes(7, "Perigo Médio"),
    dislikes: Math.floor(generateRealisticLikes(7, "Perigo Médio") * 0.3),
    isFavorite: false,
    title: "Granizo no Bom Fim",
    description: "Chuva de granizo atingiu bairro Bom Fim. Danos em veículos estacionados e fachadas de prédios.",
  },
  {
    id: 20,
    user: "Mariana Silva",
    others: 3,
    type: "ALAGAMENTO",
    severity: "Perigo Médio",
    severityColor: "bg-yellow-500",
    location: "Caxias do Sul, RS - B. Rio Branco",
    date: "24/10/2025 - 7:15 AM",
    likes: generateRealisticLikes(3, "Perigo Médio"),
    dislikes: Math.floor(generateRealisticLikes(3, "Perigo Médio") * 0.3),
    isFavorite: true,
    title: "Alagamento em Rio Branco",
    description: "Enchente afetou bairro Rio Branco em Caxias. Rios transbordaram e casas foram inundadas.",
  },
  {
    id: 21,
    user: "Roberto Lima",
    others: 12,
    type: "ENCHENTE",
    severity: "Perigo Baixo",
    severityColor: "bg-green-500",
    location: "Erechim, RS - B. São Lucas",
    date: "23/10/2025 - 11:30 AM",
    likes: generateRealisticLikes(12, "Perigo Baixo"),
    dislikes: Math.floor(generateRealisticLikes(12, "Perigo Baixo") * 0.3),
    isFavorite: false,
    title: "Enchente em São Lucas",
    description: "Nível do rio subiu e atingiu bairro São Lucas. Moradores foram alertados e algumas famílias desabrigadas.",
  },
  {
    id: 22,
    user: "Carla Ferreira",
    others: 5,
    type: "VENDAVAL",
    severity: "Perigo Médio",
    severityColor: "bg-yellow-500",
    location: "Porto Alegre, RS - B. Sarandi",
    date: "22/10/2025 - 5:45 PM",
    likes: generateRealisticLikes(5, "Perigo Médio"),
    dislikes: Math.floor(generateRealisticLikes(5, "Perigo Médio") * 0.3),
    isFavorite: false,
    title: "Vendaval em Sarandi",
    description: "Vendaval atingiu bairro Sarandi com ventos fortes. Danos em estruturas e queda de energia elétrica.",
  },
  {
    id: 23,
    user: "Pedro Santos",
    others: 8,
    type: "CICLONE",
    severity: "Perigo Alto",
    severityColor: "bg-red-500",
    location: "Caxias do Sul, RS - B. Santa Rosa",
    date: "21/10/2025 - 2:10 PM",
    likes: generateRealisticLikes(8, "Perigo Alto"),
    dislikes: Math.floor(generateRealisticLikes(8, "Perigo Alto") * 0.3),
    isFavorite: true,
    title: "Ciclone em Santa Rosa",
    description: "Ciclone extratropical atingiu região com ventos extremos. Estragos generalizados e risco de novos eventos.",
  },
  {
    id: 24,
    user: "Luana Oliveira",
    others: 6,
    type: "DESLIZAMENTO",
    severity: "Perigo Médio",
    severityColor: "bg-yellow-500",
    location: "Erechim, RS - B. Três Figueiras",
    date: "20/10/2025 - 9:30 AM",
    likes: generateRealisticLikes(6, "Perigo Médio"),
    dislikes: Math.floor(generateRealisticLikes(6, "Perigo Médio") * 0.3),
    isFavorite: false,
    title: "Deslizamento em Três Figueiras",
    description: "Deslizamento de terra atingiu bairro Três Figueiras. Risco de novos deslizamentos e evacuação preventiva.",
  },
  {
    id: 25,
    user: "Marcos Pereira",
    others: 4,
    type: "TEMPESTADE",
    severity: "Perigo Baixo",
    severityColor: "bg-green-500",
    location: "Porto Alegre, RS - B. Hípica",
    date: "19/10/2025 - 6:20 PM",
    likes: generateRealisticLikes(4, "Perigo Baixo"),
    dislikes: Math.floor(generateRealisticLikes(4, "Perigo Baixo") * 0.3),
    isFavorite: false,
    title: "Tempestade no Bairro Hípica",
    description: "Tempestade com raios atingiu bairro Hípica. Queda de energia e danos em estruturas metálicas.",
  },
  {
    id: 26,
    user: "Fernanda Gomes",
    others: 9,
    type: "ALAGAMENTO",
    severity: "Perigo Baixo",
    severityColor: "bg-green-500",
    location: "Caxias do Sul, RS - B. São Pelegrino",
    date: "18/10/2025 - 10:45 AM",
    likes: generateRealisticLikes(9, "Perigo Baixo"),
    dislikes: Math.floor(generateRealisticLikes(9, "Perigo Baixo") * 0.3),
    isFavorite: true,
    title: "Alagamento em São Pelegrino",
    description: "Chuva forte causou alagamento no bairro São Pelegrino. Ruas inundadas e tráfego interrompido.",
  },
  {
    id: 27,
    user: "Ricardo Alves",
    others: 2,
    type: "GRANIZO",
    severity: "Perigo Médio",
    severityColor: "bg-yellow-500",
    location: "Erechim, RS - B. Centro",
    date: "17/10/2025 - 4:15 PM",
    likes: generateRealisticLikes(2, "Perigo Médio"),
    dislikes: Math.floor(generateRealisticLikes(2, "Perigo Médio") * 0.3),
    isFavorite: false,
    title: "Granizo no Centro de Erechim",
    description: "Chuva de granizo atingiu área central. Danos em comércio e veículos estacionados.",
  },
  {
    id: 28,
    user: "Patricia Lima",
    others: 11,
    type: "VENDAVAL",
    severity: "Perigo Baixo",
    severityColor: "bg-green-500",
    location: "Porto Alegre, RS - B. Partenon",
    date: "16/10/2025 - 8:30 AM",
    likes: generateRealisticLikes(11, "Perigo Baixo"),
    dislikes: Math.floor(generateRealisticLikes(11, "Perigo Baixo") * 0.3),
    isFavorite: false,
    title: "Vendaval no Partenon",
    description: "Ventos fortes atingiram bairro Partenon. Árvores caídas e danos em telhados.",
  },
  {
    id: 29,
    user: "Carlos Mendes",
    others: 7,
    type: "ENCHENTE",
    severity: "Perigo Alto",
    severityColor: "bg-red-500",
    location: "Caxias do Sul, RS - B. América",
    date: "15/10/2025 - 1:45 PM",
    likes: generateRealisticLikes(7, "Perigo Alto"),
    dislikes: Math.floor(generateRealisticLikes(7, "Perigo Alto") * 0.3),
    isFavorite: true,
    title: "Enchente Crítica no Bairro América",
    description: "Enchente de grandes proporções atingiu bairro América. Resgates em andamento e centenas de desabrigados.",
  },
  {
    id: 30,
    user: "Bruna Costa",
    others: 3,
    type: "CICLONE",
    severity: "Perigo Médio",
    severityColor: "bg-yellow-500",
    location: "Erechim, RS - B. Progresso",
    date: "14/10/2025 - 11:20 AM",
    likes: generateRealisticLikes(3, "Perigo Médio"),
    dislikes: Math.floor(generateRealisticLikes(3, "Perigo Médio") * 0.3),
    isFavorite: false,
    title: "Ciclone em Progresso",
    description: "Ciclone atingiu bairro Progresso com ventos intensos. Danos estruturais e risco de queda de árvores.",
  },
];

// Componente de formas geométricas decorativas
const DecorativeShapes = () => (
  <>
    {/* Canto superior esquerdo - verde fraco */}
    <div className="fixed top-0 left-0 w-64 h-64 pointer-events-none z-0">
      <div className="absolute top-0 left-0 w-full h-full bg-green-500/8 rounded-br-full"></div>
    </div>

    {/* Canto superior direito - vermelho com parte reta para direita */}
    <div className="fixed top-0 right-0 w-64 h-64 pointer-events-none z-0">
      <div className="absolute top-0 right-0 w-full h-full bg-red-500/10 rounded-tl-full"></div>
    </div>

    {/* Canto inferior direito - amarelo menor */}
    <div className="fixed bottom-0 right-0 w-48 h-48 pointer-events-none z-0">
      <div className="absolute bottom-0 right-0 w-full h-full bg-yellow-400/15 rounded-tl-full"></div>
    </div>

    {/* Formas aleatórias espalhadas sem sobreposição */}
    <div className="fixed top-[25%] left-[12%] w-36 h-36 pointer-events-none z-0">
      <div className="absolute top-0 left-0 w-full h-full bg-green-500/8 rounded-br-full"></div>
    </div>

    <div className="fixed top-[18%] right-[18%] w-42 h-42 pointer-events-none z-0">
      <div className="absolute top-0 right-0 w-full h-full bg-red-500/10 rounded-bl-full"></div>
    </div>

    <div className="fixed top-[42%] left-[35%] w-32 h-32 pointer-events-none z-0">
      <div className="absolute top-0 left-0 w-full h-full bg-yellow-400/15 rounded-tr-full"></div>
    </div>

    <div className="fixed top-[40%] right-[33%] w-38 h-38 pointer-events-none z-0">
      <div className="absolute top-0 right-0 w-full h-full bg-green-500/8 rounded-tl-full"></div>
    </div>

    <div className="fixed bottom-[38%] left-[18%] w-40 h-40 pointer-events-none z-0">
      <div className="absolute bottom-0 left-0 w-full h-full bg-red-500/10 rounded-br-full"></div>
    </div>

    <div className="fixed bottom-[24%] right-[26%] w-34 h-34 pointer-events-none z-0">
      <div className="absolute bottom-0 right-0 w-full h-full bg-yellow-400/15 rounded-tl-full"></div>
    </div>

    <div className="fixed top-[68%] left-[15%] w-36 h-36 pointer-events-none z-0">
      <div className="absolute top-0 left-0 w-full h-full bg-yellow-400/15 rounded-tr-full"></div>
    </div>

    <div className="fixed top-[75%] left-[25%] w-32 h-32 pointer-events-none z-0">
      <div className="absolute top-0 left-0 w-full h-full bg-green-500/8 rounded-bl-full"></div>
    </div>

    <div className="fixed top-[45%] right-[10%] w-34 h-34 pointer-events-none z-0">
      <div className="absolute top-0 right-0 w-full h-full bg-green-500/8 rounded-br-full"></div>
    </div>

    <div className="fixed bottom-[67%] left-[50%] w-36 h-36 pointer-events-none z-0">
      <div className="absolute bottom-0 left-0 w-full h-full bg-yellow-400/15 rounded-tl-full"></div>
    </div>

    <div className="fixed top-[85%] right-[15%] w-30 h-30 pointer-events-none z-0">
      <div className="absolute top-0 right-0 w-full h-full bg-red-500/10 rounded-tr-full"></div>
    </div>
  </>
);

type PageType = "home" | "social" | "safety" | "documents" | "login" | "profile" | "add-occurrence" | "add-report";

export default function App() {
  const { user, loading, signUp, signIn, signOut } = useAuth();
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [showAddModal, setShowAddModal] = useState(false);
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

  // Obter relatos favoritos
  const filteredFavoritedReports = reports.filter(report => isOccurrenceFavorited(report.id));

  // Criar lista combinada: favoritos no topo, seguidos pelos outros relatos
  const combinedReports = [
    ...filteredFavoritedReports,
    ...reports.filter(report => !isOccurrenceFavorited(report.id))
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

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 relative z-10">
        <div className="max-w-7x1 mx-40 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-25">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <ImageWithFallback
                src="src/imports/Logo.jpeg"
                alt="Logotipo"
                className="h-19 w-auto"
              />
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setCurrentPage("home")}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${currentPage === "home"
                  ? "bg-[#e7e7e7] font-medium"
                  : "hover:bg-gray-50"
                  }`}
              >
                <Home className="w-6 h-7" />
                <h2>Início</h2>
              </button>
              <button
                onClick={() => setCurrentPage("safety")}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${currentPage === "safety"
                  ? "bg-[#e7e7e7] font-medium"
                  : "hover:bg-gray-50"
                  }`}
              >
                <Shield className="w-6 h-7" />
                <h2>Orientações</h2>
              </button>
              <button
                onClick={() => setCurrentPage("documents")}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${currentPage === "documents"
                  ? "bg-[#e7e7e7] font-medium"
                  : "hover:bg-gray-50"
                  }`}
              >
                <FileText className="w-6 h-7" />
                <h2>Documentos</h2>
              </button>
              <button
                onClick={() => setCurrentPage("social")}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${currentPage === "social"
                  ? "bg-[#e7e7e7] font-medium"
                  : "hover:bg-gray-50"
                  }`}
              >
                <Users className="w-6 h-7" />
                <h2>Rede Social</h2>
              </button>
            </nav>

            {/* User Actions */}
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className={`relative p-2 rounded-full transition-all duration-200 transform active:scale-95 ${showNotifications
                      ? "bg-gray-200 hover:bg-gray-300"
                      : "hover:bg-gray-100"
                      }`}
                  >
                    <Bell className={`w-6 h-7 transition-colors duration-200 ${showNotifications
                      ? "text-gray-800"
                      : "text-gray-600"
                      }`} />
                    {notifications.length > 0 && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    )}
                  </button>

                  <button
                    onClick={() => setCurrentPage("profile")}
                    className="flex items-center gap-2 hover:bg-gray-100 rounded-full p-2 transition-colors"
                  >
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {user?.user_metadata?.display_name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <span className="text-lg font-size: 24px text-gray-700">
                      {user?.user_metadata?.display_name?.split(" ")[0] || "Usuário"}
                    </span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setCurrentPage("login")}
                  className="bg-[#089448] hover:bg-[#067838] text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Entrar
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

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
            <div>
              <h2 className="text-xl font-bold mb-4">
                Relatos ({selectedOccurrence.others + 1})
              </h2>
              <div className="flex flex-col gap-4">
                {/* Relato principal sempre no topo */}

                <div className="bg-white border-gray-300 rounded-lg shadow-[6px_6px_8px_rgba(0,0,0,0.15)] p-4 border-l-4 border-green-500 bg-[#f5f5f5]">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-10 h-10 ${getProfileColor(selectedOccurrence.user)} rounded-full flex items-center justify-center`}>
                      <span className="text-white text-lg font-bold">
                        {getInitial(selectedOccurrence.user)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-sm truncate">
                          {selectedOccurrence.user}
                        </p>
                        <span className="text-xs text-gray-500">
                          • há 2h
                        </span>
                      </div>
                      <p className="text-xs text-green-600 font-medium">
                        Relato principal da ocorrência
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 mb-3">
                    {selectedOccurrence.type === "GRANIZO"
                      ? "Granizo intenso atingiu a região. Pedras grandes causaram danos em veículos e telhados."
                      : selectedOccurrence.type === "ALAGAMENTO"
                        ? "Ruas completamente alagadas. Água chegou a 50cm de altura em alguns pontos."
                        : selectedOccurrence.type === "VENDAVAL"
                          ? "Ventos muito fortes derrubaram árvores e placas. Muito perigoso."
                          : `${selectedOccurrence.type.toLowerCase()} afetou toda a região. Situação crítica.`}
                  </p>

                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="aspect-square bg-gray-200 rounded flex items-center justify-center text-gray-400">
                      <Camera className="w-5 h-5" />
                    </div>
                    <div className="aspect-square bg-gray-200 rounded flex items-center justify-center text-gray-400">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <div className="aspect-square bg-gray-200 rounded flex items-center justify-center text-gray-400">
                      <Video className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-sm pt-3 border-t border-gray-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleIndividualReportLike(`${selectedOccurrence.id}-main`);
                      }}
                      className={`flex items-center gap-1 rounded-md px-2 py-1 text-sm transition ${userIndividualReportLikes[`${selectedOccurrence.id}-main`] ? "bg-green-100 text-green-700" : "text-gray-600 hover:text-green-700 hover:bg-green-50"}`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>{reportLikes[`${selectedOccurrence.id}-main`] ?? selectedOccurrence.likes}</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleIndividualReportDislike(`${selectedOccurrence.id}-main`);
                      }}
                      className={`flex items-center gap-1 rounded-md px-2 py-1 text-sm transition ${userIndividualReportDislikes[`${selectedOccurrence.id}-main`] ? "bg-red-100 text-red-700" : "text-gray-600 hover:text-red-700 hover:bg-red-50"}`}
                    >
                      <ThumbsDown className="w-4 h-4" />
                      <span>{reportDislikes[`${selectedOccurrence.id}-main`] ?? selectedOccurrence.dislikes}</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(selectedOccurrence.id);
                      }}
                      className={`ml-auto text-gray-400 hover:text-yellow-500 transition-colors ${isOccurrenceFavorited(selectedOccurrence.id) ? "text-yellow-500" : ""}`}
                    >
                      <Star
                        className={`w-4 h-4 ${isOccurrenceFavorited(selectedOccurrence.id) ? "fill-yellow-500 text-yellow-500" : ""}`}
                      />
                    </button>
                  </div>
                </div>

                {/* Favoritos vão aparecer logo depois do relato principal */}
                {favoriteSelectedOccurrenceSubreports.map((report) => (
                  <div key={report.key} className="bg-white rounded-lg shadow-sm p-4 bg-[#f5f5f5] flex flex-col h-full">


                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-10 h-10 ${getProfileColor(report.author)} rounded-full flex items-center justify-center`}>
                        <span className="text-white text-lg font-bold">
                          {getInitial(report.author)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-sm truncate">{report.author}</p>
                          <span className="text-xs text-gray-500">• há 2h</span>
                        </div>
                        <p className="text-xs text-yellow-600 font-medium">Favorito</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{report.description}</p>
                    {report.hasMedia && (
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="aspect-square bg-gray-200 rounded flex items-center justify-center text-gray-400">
                          <Camera className="w-5 h-5" />
                        </div>
                        <div className="aspect-square bg-gray-200 rounded flex items-center justify-center text-gray-400">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                        <div className="aspect-square bg-gray-200 rounded flex items-center justify-center text-gray-400">
                          <Video className="w-5 h-5" />
                        </div>
                      </div>
                    )}
                    <div className="flex flex-wrap items-center gap-2 text-sm pt-3 border-t border-gray-100">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleIndividualReportLike(report.key);
                        }}
                        className={`flex items-center gap-1 rounded-md px-2 py-1 transition ${userIndividualReportLikes[report.key] ? "bg-green-100 text-green-700" : "text-gray-600 hover:text-green-700 hover:bg-green-50"}`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span>{report.likes}</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleIndividualReportDislike(report.key);
                        }}
                        className={`flex items-center gap-1 rounded-md px-2 py-1 transition ${userIndividualReportDislikes[report.key] ? "bg-red-100 text-red-700" : "text-gray-600 hover:text-red-700 hover:bg-red-50"}`}
                      >
                        <ThumbsDown className="w-4 h-4" />
                        <span>{report.dislikes}</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleIndividualFavoriteReport(report.key);
                        }}
                        className={`ml-auto text-gray-400 hover:text-yellow-500 transition-colors ${individualFavoriteReports[report.key] ? "text-yellow-500" : ""}`}
                      >
                        <Star className={`w-4 h-4 ${individualFavoriteReports[report.key] ? "fill-yellow-500 text-yellow-500" : ""}`} />
                      </button>
                    </div>
                  </div>
                ))}

                {regularSelectedOccurrenceSubreports.map((report) => (
                  <div key={report.key} className="bg-white rounded-lg shadow-sm p-4 bg-[#f5f5f5]">
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-10 h-10 ${getProfileColor(report.author)} rounded-full flex items-center justify-center`}>
                        <span className="text-white text-lg font-bold">
                          {getInitial(report.author)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-sm truncate">{report.author}</p>
                          <span className="text-xs text-gray-500">• há 2h</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{report.description}</p>
                    {report.hasMedia && (
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="aspect-square bg-gray-200 rounded flex items-center justify-center text-gray-400">
                          <Camera className="w-5 h-5" />
                        </div>
                        <div className="aspect-square bg-gray-200 rounded flex items-center justify-center text-gray-400">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                        <div className="aspect-square bg-gray-200 rounded flex items-center justify-center text-gray-400">
                          <Video className="w-5 h-5" />
                        </div>
                      </div>
                    )}
                    <div className="flex flex-wrap items-center gap-2 text-sm pt-3 border-t border-gray-100">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleIndividualReportLike(report.key);
                        }}
                        className={`flex items-center gap-1 rounded-md px-2 py-1 transition ${userIndividualReportLikes[report.key] ? "bg-green-100 text-green-700" : "text-gray-600 hover:text-green-700 hover:bg-green-50"}`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span>{report.likes}</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleIndividualReportDislike(report.key);
                        }}
                        className={`flex items-center gap-1 rounded-md px-2 py-1 transition ${userIndividualReportDislikes[report.key] ? "bg-red-100 text-red-700" : "text-gray-600 hover:text-red-700 hover:bg-red-50"}`}
                      >
                        <ThumbsDown className="w-4 h-4" />
                        <span>{report.dislikes}</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleIndividualFavoriteReport(report.key);
                        }}
                        className={`ml-auto text-gray-400 hover:text-yellow-500 transition-colors ${individualFavoriteReports[report.key] ? "text-yellow-500" : ""}`}
                      >
                        <Star className={`w-4 h-4 ${individualFavoriteReports[report.key] ? "fill-yellow-500 text-yellow-500" : ""}`} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {selectedOccurrence.others > 11 && (
                <button className="w-full mt-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md font-medium transition-colors">
                  Carregar mais {selectedOccurrence.others - 11} relatos
                </button>
              )}
            </div>
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
