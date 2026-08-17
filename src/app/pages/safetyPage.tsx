import {
    Shield,
    Droplets,
    CloudLightning,
    CloudRainWind,
    CloudHail,
    Wind,
    Tornado,
    MountainSnow,
    ChevronDown,
    Clock,
    AlertTriangle,
    CheckCircle,
    XCircle,
} from "lucide-react";

export type CatastropheType =
  | "Todos"
  | "Alagamento"
  | "Tempestade"
  | "Enchente"
  | "Granizo"
  | "Vendaval"
  | "Ciclone"
  | "Deslizamento";

interface SafetyPageProps {
  selectedCatastropheType: CatastropheType;
  handleCatastropheTypeClick: (type: CatastropheType) => void;
  expandedSections: Record<string, boolean>;
  toggleSection: (section: string) => void;
}

export function SafetyPage({
  selectedCatastropheType,
  handleCatastropheTypeClick,
  expandedSections,
  toggleSection,
}: SafetyPageProps) {
    return (
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
                        Como se preparar e agir em situações de emergência
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
                        {[
                            "Todos",
                            "Alagamento",
                            "Tempestade",
                            "Enchente",
                            "Granizo",
                            "Vendaval",
                            "Ciclone",
                            "Deslizamento",
                        ].map((type) => (
                            <button
                                key={type}
                                onClick={() =>
                                    handleCatastropheTypeClick(
                                        type as CatastropheType
                                    )
                                }
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedCatastropheType === type
                                    ? "bg-[#00ab4e] text-white hover:bg-[#00ab4e]"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Conteúdo */}
            <div className="space-y-4">

                {/* ALAGAMENTO */}
                {(selectedCatastropheType === "Todos" ||
                    selectedCatastropheType === "Alagamento") && (
                        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-[6px_6px_8px_rgba(0,0,0,0.15)] bg-[#f5f5f5]">
                            <div className="p-6">

                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200">
                                        <Droplets className="w-6 h-6 text-gray-600" />
                                    </div>

                                    <h2 className="text-2xl font-bold text-gray-800">
                                        Alagamento
                                    </h2>
                                </div>

                                {/* Antes */}
                                <div className="mb-4">
                                    <button
                                        onClick={() =>
                                            toggleSection("alagamento-antes")
                                        }
                                        className="flex items-center gap-2 w-full text-left hover:bg-gray-50 p-2 rounded transition-colors"
                                    >
                                        <ChevronDown
                                            className={`w-5 h-5 transition-transform ${expandedSections["alagamento-antes"]
                                                ? "rotate-180"
                                                : ""
                                                }`}
                                        />

                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#dcfce7]">
                                                <Clock className="w-4 h-4 text-green-600" />
                                            </div>

                                            <h3 className="text-lg font-semibold text-[#00ab4e]">
                                                Antes (Prevenção)
                                            </h3>
                                        </div>
                                    </button>

                                    {expandedSections["alagamento-antes"] && (
                                        <div className="ml-7 mt-3 space-y-3">
                                            <div className="flex gap-3">
                                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />

                                                <div>
                                                    <h4 className="font-semibold mb-1">
                                                        Identifique Áreas de Risco
                                                    </h4>

                                                    <p className="text-sm text-gray-600">
                                                        Conheça as zonas baixas e propensas a
                                                        alagamento na sua região.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex gap-3">
                                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />

                                                <div>
                                                    <h4 className="font-semibold mb-1">
                                                        Limpe Calhas e Drenos
                                                    </h4>

                                                    <p className="text-sm text-gray-600">
                                                        Mantenha o sistema de drenagem limpo
                                                        para evitar acúmulo de água.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex gap-3">
                                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />

                                                <div>
                                                    <h4 className="font-semibold mb-1">
                                                        Eleve Objetos e Móveis
                                                    </h4>

                                                    <p className="text-sm text-gray-600">
                                                        Guarde documentos e objetos de valor
                                                        em locais altos.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Durante */}
                                <div className="mb-4">
                                    <button
                                        onClick={() =>
                                            toggleSection("alagamento-durante")
                                        }
                                        className="flex items-center gap-2 w-full text-left hover:bg-gray-50 p-2 rounded transition-colors"
                                    >
                                        <ChevronDown
                                            className={`w-5 h-5 transition-transform ${expandedSections["alagamento-durante"]
                                                ? "rotate-180"
                                                : ""
                                                }`}
                                        />

                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-red-100">
                                                <AlertTriangle className="w-4 h-4 text-[#ee302f]" />
                                            </div>

                                            <h3 className="text-lg font-semibold text-[#ee302f]">
                                                Durante (Ação)
                                            </h3>
                                        </div>
                                    </button>

                                    {expandedSections["alagamento-durante"] && (
                                        <div className="ml-7 mt-3 space-y-3">
                                            <div className="flex gap-3">
                                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />

                                                <div>
                                                    <h4 className="font-semibold mb-1">
                                                        Busque Lugar Alto e Seguro
                                                    </h4>

                                                    <p className="text-sm text-gray-600">
                                                        Vá para andares superiores ou pontos
                                                        elevados da região.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex gap-3">
                                                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />

                                                <div>
                                                    <h4 className="font-semibold mb-1">
                                                        Não Atravesse Águas
                                                    </h4>

                                                    <p className="text-sm text-gray-600">
                                                        Nunca tente atravessar áreas alagadas.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex gap-3">
                                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />

                                                <div>
                                                    <h4 className="font-semibold mb-1">
                                                        Desligue Energia Elétrica
                                                    </h4>

                                                    <p className="text-sm text-gray-600">
                                                        Corte a energia para evitar curtos-circuitos
                                                        e choques.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Depois */}
                                <div>
                                    <button
                                        onClick={() =>
                                            toggleSection("alagamento-depois")
                                        }
                                        className="flex items-center gap-2 w-full text-left hover:bg-gray-50 p-2 rounded transition-colors"
                                    >
                                        <ChevronDown
                                            className={`w-5 h-5 transition-transform ${expandedSections["alagamento-depois"]
                                                ? "rotate-180"
                                                : ""
                                                }`}
                                        />

                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#fff1d3]">
                                                <CheckCircle className="w-4 h-4 text-[#ffb000]" />
                                            </div>

                                            <h3 className="text-lg font-semibold text-[#ffb000]">
                                                Depois (Recuperação)
                                            </h3>
                                        </div>
                                    </button>

                                    {expandedSections["alagamento-depois"] && (
                                        <div className="ml-7 mt-3 space-y-3">
                                            <div className="flex gap-3">
                                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />

                                                <div>
                                                    <h4 className="font-semibold mb-1">
                                                        Aguarde a Liberação
                                                    </h4>

                                                    <p className="text-sm text-gray-600">
                                                        Só retorne quando as autoridades
                                                        liberarem a área.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex gap-3">
                                                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />

                                                <div>
                                                    <h4 className="font-semibold mb-1">
                                                        Cuidado com Água Contaminada
                                                    </h4>

                                                    <p className="text-sm text-gray-600">
                                                        Não consuma água sem tratamento adequado.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex gap-3">
                                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />

                                                <div>
                                                    <h4 className="font-semibold mb-1">
                                                        Limpe e Desinfete
                                                    </h4>

                                                    <p className="text-sm text-gray-600">
                                                        Use produtos de limpeza adequados.
                                                    </p>
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
    )
}