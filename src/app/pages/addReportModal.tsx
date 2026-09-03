import React from "react";
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
  return (
    <div className="fixed inset-20 flex items-start justify-center p-4 pt-10 z-40 overflow-y-auto">
      <div className="bg-white border-2 border-gray-400 rounded-lg shadow-[6px_6px_8px_rgba(0,0,0,0.25)] max-w-2xl w-full px-[24px] py-[20px] my-[5px]">
        <h2 className="text-2xl font-bold mb-2 text-left">Adicionar Relato</h2>

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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
            <input
              type="text"
              value={reportForm.neighborhood}
              onChange={(e) => setReportForm({ ...reportForm, neighborhood: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ex: Centro"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gravidade</label>
            <CustomDropdown
              value={reportForm.severity}
              onChange={(value) => setReportForm({ ...reportForm, severity: value })}
              options={[
                { value: "Perigo Baixo", label: "Perigo Baixo" },
                { value: "Perigo Moderado", label: "Perigo Moderado" },
                { value: "Perigo Alto", label: "Perigo Alto" },
                { value: "Perigo Extremo", label: "Perigo Extremo" },
              ]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <textarea
              value={reportForm.description}
              onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Conte o que você presenciou neste evento"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setCurrentPage("social")}
            disabled={isSubmitting}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
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
