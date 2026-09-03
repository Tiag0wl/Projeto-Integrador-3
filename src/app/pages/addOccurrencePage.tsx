import { AlertTriangle, Camera } from "lucide-react";

import {CustomDropdown} from "../components/CustomDropdown";
import { PageType } from "../App";

interface Report {
  id: number;
  type: string;
  location: string;
  date: string;
  severity: string;
  severityColor: string;
}

interface OccurrenceForm {
  city: string;
  neighborhood: string;
  state: string;
  description: string;
  location: string;
  type: string;
  severity: string;
}

interface AddOccurrencePageProps {
  sortedReports: Report[];

  occurrenceForm: OccurrenceForm;
  setOccurrenceForm: React.Dispatch<
    React.SetStateAction<OccurrenceForm>
  >;

  attachedFiles: File[];
  setAttachedFiles: React.Dispatch<React.SetStateAction<File[]>>;

  handleFileUpload: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;

  removeFile: (index: number) => void;

   setCurrentPage: React.Dispatch<React.SetStateAction<PageType>>;
  setSelectedOccurrence: React.Dispatch<React.SetStateAction<any>>;

  saveUserOccurrence: (data: any) => Promise<any>;
  reports: Report[];

  setShuffledReports: React.Dispatch<
    React.SetStateAction<any[]>
  >;

  setNewOccurrences: React.Dispatch<
    React.SetStateAction<number[]>
  >;

  user?: {
    user_metadata?: {
      display_name?: string;
    };
    email?: string;
  } | null;
}

export default function AddOccurrencePage({
  sortedReports,
  occurrenceForm,
  setOccurrenceForm,
  attachedFiles,
  setAttachedFiles,
  handleFileUpload,
  removeFile,
  setCurrentPage,
  setSelectedOccurrence,
  saveUserOccurrence,
  reports,
  setShuffledReports,
  setNewOccurrences,
  user,
}: AddOccurrencePageProps) {
  return (
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
          <h3 className="font-semibold mb-3 flex items-center gap-2 text-[#ffa200]">
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
                      {report.location.split(" - ")[0]} •{" "}
                      {report.date.split(" - ")[0]}
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
            {/* Cidade */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cidade
              </label>

              <input
                type="text"
                value={occurrenceForm.city}
                onChange={(e) =>
                  setOccurrenceForm({
                    ...occurrenceForm,
                    city: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Ex: Porto Alegre"
              />
            </div>

            {/* Bairro */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bairro
              </label>

              <input
                type="text"
                value={occurrenceForm.neighborhood}
                onChange={(e) =>
                  setOccurrenceForm({
                    ...occurrenceForm,
                    neighborhood: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Ex: Centro"
              />
            </div>

            {/* Estado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>

              <CustomDropdown
                value={occurrenceForm.state}
                onChange={(value) =>
                  setOccurrenceForm({
                    ...occurrenceForm,
                    state: value,
                  })
                }
                options={[
                  {
                    value: "RS",
                    label: "Rio Grande do Sul",
                  },
                  {
                    value: "SC",
                    label: "Santa Catarina",
                  },
                  {
                    value: "PR",
                    label: "Paraná",
                  },
                ]}
              />
            </div>
          </div>

          {/* Tipo + Severidade */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 font-medium">
                Tipo de Evento
              </label>

              <CustomDropdown
                value={occurrenceForm.type}
                onChange={(value) =>
                  setOccurrenceForm({
                    ...occurrenceForm,
                    type: value,
                  })
                }
                options={[
                  {
                    value: "ENCHENTE",
                    label: "Enchente",
                  },
                  {
                    value: "TEMPESTADE",
                    label: "Tempestade",
                  },
                  {
                    value: "GRANIZO",
                    label: "Granizo",
                  },
                  {
                    value: "VENDAVAL",
                    label: "Vendaval",
                  },
                  {
                    value: "DESLIZAMENTO",
                    label: "Deslizamento",
                  },
                  {
                    value: "CICLONE",
                    label: "Ciclone",
                  },
                  {
                    value: "ALAGAMENTO",
                    label: "Alagamento",
                  },
                ]}
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 font-medium">
                Severidade
              </label>

              <CustomDropdown
                value={occurrenceForm.severity}
                onChange={(value) =>
                  setOccurrenceForm({
                    ...occurrenceForm,
                    severity: value,
                  })
                }
                options={[
                  {
                    value: "Perigo Baixo",
                    label: "Perigo Baixo",
                  },
                  {
                    value: "Perigo Médio",
                    label: "Perigo Médio",
                  },
                  {
                    value: "Perigo Alto",
                    label: "Perigo Alto",
                  },
                ]}
              />
            </div>
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição Detalhada
            </label>

            <textarea
              value={occurrenceForm.description}
              onChange={(e) =>
                setOccurrenceForm({
                  ...occurrenceForm,
                  description: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              rows={4}
              placeholder="Forneça mais detalhes sobre o ocorrido"
            />
          </div>

          {/* Fotos */}
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

              <label
                htmlFor="file-upload"
                className="cursor-pointer"
              >
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
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
                  >
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

        {/* Botões */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setCurrentPage("social")}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>

          <button
            onClick={async () => {
              if (
                !occurrenceForm.city ||
                !occurrenceForm.type ||
                !occurrenceForm.severity ||
                !occurrenceForm.description
              ) {
                alert(
                  "Por favor, preencha todos os campos obrigatórios."
                );
                return;
              }

              try {
                const severityColorMap: {
                  [key: string]: string;
                } = {
                  "Perigo Baixo": "bg-green-500",
                  "Perigo Médio": "bg-yellow-500",
                  "Perigo Alto": "bg-red-500",
                };

                const occurrenceData = {
                  type: occurrenceForm.type,
                  severity: occurrenceForm.severity,

                  severityColor:
                    severityColorMap[
                      occurrenceForm.severity
                    ] || "bg-gray-500",

                  city: occurrenceForm.city,
                  neighborhood:
                    occurrenceForm.neighborhood || "",

                  state: occurrenceForm.state || "",

                  description: occurrenceForm.description,

                  location:
                    occurrenceForm.location ||
                    `${occurrenceForm.city}${
                      occurrenceForm.neighborhood
                        ? ", " +
                          occurrenceForm.neighborhood
                        : ""
                    }${
                      occurrenceForm.state
                        ? " - " + occurrenceForm.state
                        : ""
                    }`,

                  likes: 0,
                  dislikes: 0,
                  reportsCount: 1,
                };

                const result =
                  await saveUserOccurrence(occurrenceData);

                if (result) {
                  const newOccurrence = {
                    id:
                      result.id ||
                      Math.max(
                        ...reports.map((r) => r.id),
                        0
                      ) + 1,

                    ...occurrenceData,

                    date:
                      new Date().toLocaleDateString("pt-BR") +
                      " - " +
                      new Date().toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      }),

                    user:
                      user?.user_metadata?.display_name ||
                      user?.email ||
                      "Usuário",

                    isNew: true,
                    others: 0,
                    likes: 0,
                    dislikes: 0,

                    title:
                      occurrenceData.type ||
                      "Nova Ocorrência",

                    isFirstReport: true,
                  };

                  setShuffledReports((prev) => [
                    newOccurrence,
                    ...prev,
                  ]);

                  setNewOccurrences((prev) => [
                    ...prev,
                    newOccurrence.id,
                  ]);

                  setOccurrenceForm({
                    city: "",
                    neighborhood: "",
                    state: "",
                    description: "",
                    location: "",
                    type: "",
                    severity: "",
                  });

                  setAttachedFiles([]);

                  setCurrentPage("social");

                  alert(
                    "Ocorrência enviada com sucesso!"
                  );
                } else {
                  alert(
                    "Erro ao salvar ocorrência. Tente novamente."
                  );
                }
              } catch (error) {
                console.error(
                  "Error submitting occurrence:",
                  error
                );

                alert(
                  "Erro ao enviar ocorrência. Tente novamente."
                );
              }
            }}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
          >
            Enviar Ocorrência
          </button>
        </div>
      </div>
    </div>
  );
}