export interface AwarenessStat {
  value: string;
  label: string;
  color: "red" | "orange" | "yellow";
}

export interface AwarenessMessage {
  title: string;
  description: string;
  stats: AwarenessStat[];
  relatedDoc: number;
}

export const awarenessMessages: AwarenessMessage[] = [
  {
    title: "O planeta está ficando mais quente — e os recordes continuam quebrando",
    description:
      "O aquecimento global já está mudando o clima que conhecemos. Os últimos anos vêm acumulando recordes de temperatura, aumentando o risco de ondas de calor, secas, enchentes e outros eventos extremos.",
    stats: [
      {
        value: "1,55 °C",
        label:
          "foi o aumento da temperatura média do planeta em 2024 em relação ao período de 1850–1900.",
        color: "red",
      },
      {
        value: "10 anos",
        label:
          "todos os anos de 2015 a 2024 ficaram entre os anos mais quentes já registrados.",
        color: "orange",
      },
      {
        value: "Recorde",
        label:
          "2024 foi o ano mais quente desde o início dos registros modernos.",
        color: "yellow",
      },
    ],
    relatedDoc: 5,
  },

  {
    title: "O oceano está ficando cada vez mais quente",
    description:
      "O oceano absorve a maior parte do calor extra causado pelo aquecimento global. Isso aquece a água, prejudica a vida marinha e aumenta o risco de tempestades mais intensas e da elevação do nível do mar.",
    stats: [
      {
        value: "≈90%",
        label:
          "do excesso de calor preso pelo aquecimento global é armazenado nos oceanos.",
        color: "red",
      },
      {
        value: "Recorde",
        label:
          "o calor acumulado nos oceanos bateu um novo recorde em 2024.",
        color: "orange",
      },
      {
        value: "8 anos",
        label:
          "seguidos em que o oceano bateu um novo recorde de calor.",
        color: "yellow",
      },
    ],
    relatedDoc: 5,
  },

  {
    title: "O nível do mar está subindo cada vez mais rápido",
    description:
      "O aquecimento dos oceanos e o derretimento das geleiras estão fazendo o nível do mar subir. Isso aumenta o risco de alagamentos, erosão e perda de áreas onde milhões de pessoas vivem.",
    stats: [
      {
        value: "4,7 mm",
        label:
          "é quanto o nível médio do mar subiu por ano entre 2015 e 2024.",
        color: "red",
      },
      {
        value: "2,1 mm",
        label:
          "era a média anual de aumento entre 1993 e 2002. O ritmo atual é mais que o dobro.",
        color: "orange",
      },
      {
        value: "Recorde",
        label:
          "o nível médio do mar em 2024 foi o mais alto desde o início das medições por satélite.",
        color: "yellow",
      },
    ],
    relatedDoc: 5,
  },

  {
    title: "As enchentes do Rio Grande do Sul atingiram quase todo o estado",
    description:
      "As enchentes de 2024 foram consideradas pela Agência Nacional de Águas o maior desastre natural da história do Rio Grande do Sul. A dimensão do desastre atingiu milhões de pessoas e centenas de municípios.",
    stats: [
      {
        value: "2,4 milhões",
        label:
          "de pessoas foram afetadas pelas enchentes no Rio Grande do Sul.",
        color: "red",
      },
      {
        value: "478 municípios",
        label:
          "foram atingidos pela enchente — praticamente todo o estado.",
        color: "orange",
      },
      {
        value: "183 mortes",
        label:
          "foram registradas como consequência das enchentes de 2024.",
        color: "yellow",
      },
    ],
    relatedDoc: 5,
  },

  {
    title: "Uma única enchente atingiu 33 milhões de pessoas no Paquistão",
    description:
      "As enchentes de 2022 devastaram o Paquistão. Milhões de pessoas perderam suas casas, ficaram feridas ou tiveram suas vidas afetadas por um desastre que atingiu uma área enorme do país.",
    stats: [
      {
        value: "33 milhões",
        label:
          "de pessoas foram afetadas pelas enchentes.",
        color: "red",
      },
      {
        value: "8 milhões",
        label:
          "de pessoas foram obrigadas a deixar suas casas por causa da água.",
        color: "orange",
      },
      {
        value: "1.700 mortes",
        label:
          "foram registradas durante o desastre, além de milhares de pessoas feridas.",
        color: "yellow",
      },
    ],
    relatedDoc: 5,
  },

  {
    title: "A camada de ozônio ainda não se recuperou completamente",
    description:
      "A camada de ozônio é uma das principais proteções da Terra contra a radiação ultravioleta. Ela está se recuperando graças à redução de substâncias que a destruíam, mas o problema ainda não desapareceu e a recuperação completa levará décadas.",
    stats: [
      {
        value: "Décadas",
        label:
          "ainda serão necessárias para que a camada de ozônio volte completamente aos níveis anteriores ao grande desgaste.",
        color: "red",
      },
      {
        value: "2040",
        label:
          "é a previsão de recuperação para grande parte do planeta — se as medidas de proteção continuarem.",
        color: "orange",
      },
      {
        value: "2066",
        label:
          "é a previsão de recuperação sobre a Antártida, onde o desgaste foi mais grave.",
        color: "yellow",
      },
    ],
    relatedDoc: 5,
  },

  {
    title: "O calor extremo já está matando milhares de pessoas na Europa",
    description:
      "As ondas de calor não são apenas períodos de desconforto. Temperaturas extremas podem provocar problemas cardíacos, respiratórios e desidratação, atingindo principalmente pessoas idosas e vulneráveis.",
    stats: [
      {
        value: "10 mil+",
        label:
          "mortes em excesso foram estimadas durante as ondas de calor de junho de 2026 na Europa.",
        color: "red",
      },
      {
        value: "9 mil+",
        label:
          "dessas mortes ocorreram entre pessoas com 65 anos ou mais.",
        color: "orange",
      },
      {
        value: "5.764",
        label:
          "mortes em excesso foram estimadas somente na França durante o período analisado.",
        color: "yellow",
      },
    ],
    relatedDoc: 5,
  },

  {
    title: "As enchentes no Nepal deixaram milhares de vítimas e desaparecidos",
    description:
      "As enchentes e deslizamentos provocados pelo desastre de agosto de 2026 destruíram comunidades inteiras no Nepal. Mesmo semanas depois, milhares de pessoas ainda estavam desaparecidas.",
    stats: [
      {
        value: "1.450+ mortes",
        label:
          "foram registradas após as grandes enchentes e deslizamentos de agosto de 2026.",
        color: "red",
      },
      {
        value: "5 mil+",
        label:
          "pessoas continuavam desaparecidas semanas depois do desastre.",
        color: "orange",
      },
      {
        value: "352 mil",
        label:
          "pessoas foram afetadas pelo desastre, segundo a resposta humanitária da ONU.",
        color: "yellow",
      },
    ],
    relatedDoc: 5,
  },

  {
    title: "As enchentes continuam matando e destruindo casas na Ásia",
    description:
      "Em setembro de 2026, chuvas extremas provocaram enchentes e deslizamentos em diferentes partes da Ásia. Em alguns lugares, milhares de famílias perderam suas casas enquanto rios ultrapassavam níveis de perigo.",
    stats: [
      {
        value: "62 mortes",
        label:
          "foram registradas em poucos dias pelas fortes chuvas e enchentes no estado indiano de Uttar Pradesh.",
        color: "red",
      },
      {
        value: "46 feridos",
        label:
          "foram registrados no mesmo desastre em Uttar Pradesh, além das dezenas de mortes.",
        color: "orange",
      },
      {
        value: "75 mil+",
        label:
          "pessoas precisaram ser retiradas de suas casas por causa das enchentes no estado indiano de Odisha.",
        color: "yellow",
      },
    ],
    relatedDoc: 5,
  },

  {
    title: "Desastres estão obrigando milhões de pessoas a abandonar suas casas",
    description:
      "Enchentes, tempestades, secas, incêndios e outros desastres estão fazendo milhões de pessoas deixarem suas casas. Em muitos casos, essas pessoas precisam fugir rapidamente e podem passar meses ou anos sem conseguir voltar.",
    stats: [
      {
        value: "45,8 milhões",
        label:
          "de deslocamentos foram provocados por desastres em 2024.",
        color: "red",
      },
      {
        value: "264,8 milhões",
        label:
          "de deslocamentos causados por desastres foram registrados entre 2015 e 2024.",
        color: "orange",
      },
      {
        value: "163 países",
        label:
          "registraram deslocamentos causados por desastres durante 2024.",
        color: "yellow",
      },
    ],
    relatedDoc: 5,
  },

  {
    title: "O El Niño de 2026 está ficando cada vez mais forte",
    description:
      "O El Niño é um fenômeno natural que muda os padrões de chuva e temperatura em várias partes do planeta. O episódio atual está se fortalecendo e pode aumentar o risco de ondas de calor, secas e enchentes em diferentes regiões.",
    stats: [
      {
        value: "≈100%",
        label:
          "é a chance estimada pela OMM de o El Niño continuar até pelo menos fevereiro de 2027.",
        color: "red",
      },
      {
        value: "3 °C",
        label:
          "acima do normal está a temperatura da superfície do Pacífico equatorial em algumas medições recentes.",
        color: "orange",
      },
      {
        value: "150 milhões",
        label:
          "de pessoas já enfrentam insegurança alimentar grave, um problema que pode piorar com novas secas e enchentes.",
        color: "yellow",
      },
    ],
    relatedDoc: 5,
  },

  {
    title: "Furacões e ciclones continuam deixando um rastro de destruição",
    description:
      "Tempestades tropicais podem transformar chuva intensa, ventos e maré de tempestade em grandes desastres. Nos últimos anos, eventos desse tipo deixaram centenas de mortos e milhares de pessoas sem suas casas.",
    stats: [
      {
        value: "219 mortes",
        label:
          "foram causadas pelo furacão Helene nos Estados Unidos em 2024.",
        color: "red",
      },
      {
        value: "US$ 79,6 bi",
        label:
          "foi o prejuízo estimado causado pelo furacão Helene nos Estados Unidos.",
        color: "orange",
      },
      {
        value: "100 mil",
        label:
          "pessoas foram deslocadas pelo ciclone Chido em Moçambique em 2024.",
        color: "yellow",
      },
    ],
    relatedDoc: 5,
  },
];