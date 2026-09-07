import React, { useState } from "react";
import { Camera } from "lucide-react";
import { CustomDropdown } from "../components/CustomDropdown";
import { PageType } from "../App";

interface ReportForm {
  neighborhood: string;
  type: string;
  severity: string;
  description: string;
}

interface AddReportModalProps {
  reportForm: ReportForm;
  setReportForm: React.Dispatch<React.SetStateAction<ReportForm>>;
  authError: string;
  authMessage: string;
  isSubmitting: boolean;
  handleReportSubmit: () => void;
  setCurrentPage: React.Dispatch<React.SetStateAction<PageType>>;
}

export default function AddReportModal({
  reportForm,
  setReportForm,
  authError,
  authMessage,
  isSubmitting,
  handleReportSubmit,
  setCurrentPage,
}: AddReportModalProps) {
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    setAttachedFiles((prev) => [...prev, ...files]);

    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setAttachedFiles((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="relative w-full flex justify-center p-4 pt-0.5 z-40">
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm max-w-2xl w-full px-[24px] py-[20px] my-[5px]">
      <h2 className="text-2xl font-bold mb-2 text-left">
        Adicionar Relato
      </h2>

      {authError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4 text-sm">
          {authError}
        </div>
      )}

      {authMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-4 text-sm">
          {authMessage}
        </div>
      )}

      <div className="space-y-4">

        {/* Bairro */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bairro
          </label>

          <input
            type="text"
            value={reportForm.neighborhood}
            onChange={(e) =>
              setReportForm({
                ...reportForm,
                neighborhood: e.target.value,
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Ex: Centro"
          />
        </div>

        {/* Gravidade */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Perigo Sofrido
          </label>

          <CustomDropdown
            value={reportForm.severity}
            onChange={(value) =>
              setReportForm({
                ...reportForm,
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

        {/* Descrição */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descrição
          </label>

          <textarea
            value={reportForm.description}
            onChange={(e) =>
              setReportForm({
                ...reportForm,
                description: e.target.value,
              })
            }
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Conte o que você presenciou neste evento"
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
                    type="button"
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
          type="button"
          onClick={() => setCurrentPage("social")}
          disabled={isSubmitting}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Cancelar
        </button>

        <button
          type="button"
          onClick={handleReportSubmit}
          disabled={isSubmitting}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md disabled:opacity-50"
        >
          {isSubmitting ? "Enviando..." : "Concluir"}
        </button>
      </div>

    </div>
    </div>
  );
}