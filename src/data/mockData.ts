export interface AwarenessMessage {
  title: string;
  description: string;
  relatedDoc: number;
}

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  summary: string;
  category: string;
  image: string;
  link: string;
}

export interface DocumentItem {
  id: number;
  title: string;
  description: string;
  category: string;
  size: string;
  pages: number;
  downloads: number;
}

export interface Report {
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

export const awarenessMessages = [
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

export const mockNews = [
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

export const mockDocuments = [
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

export const mockReports: Report[] = [
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
