import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  Calendar,
  Filter,
  CheckCircle2,
  Clock,
  FileText,
  Printer,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { PRESET_REPORTS } from '../../../data/dashboardMockData';

interface ReportsTabProps {
  showToast: (msg: string) => void;
}

export const ReportsTab: React.FC<ReportsTabProps> = ({ showToast }) => {
  const [selectedReportId, setSelectedReportId] = useState(PRESET_REPORTS[0].id);
  const [selectedPeriod, setSelectedPeriod] = useState('Current Month (November 2024)');
  const [selectedFormat, setSelectedFormat] = useState('PDF & Excel');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateCustom = () => {
    setIsGenerating(true);
    const report = PRESET_REPORTS.find((r) => r.id === selectedReportId);
    setTimeout(() => {
      setIsGenerating(false);
      showToast(
        `Generated and downloaded ${report?.title || 'Report'} (${selectedPeriod}) in ${selectedFormat} format.`
      );
    }, 900);
  };

  const handleQuickDownload = (reportTitle: string) => {
    showToast(`Downloading ${reportTitle} (Instant Export)...`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Generator Card */}
      <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs space-y-5">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-800">
            Enterprise Reporting Engine
          </span>
          <h3 className="font-serif text-2xl font-medium text-zinc-900 tracking-tight mt-0.5">
            Statutory, Operational & Pipeline Audit Reports
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            Generate certified reports for FBR compliance, architect partner commissions, and inventory reconciliation.
          </p>
        </div>

        {/* Generator Controls Form */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-zinc-50 rounded-xl border border-zinc-100">
          <div className="md:col-span-5 space-y-1.5">
            <label className="text-xs font-semibold text-zinc-700">Select Audit Report</label>
            <select
              value={selectedReportId}
              onChange={(e) => setSelectedReportId(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs text-zinc-800 focus:outline-none focus:border-amber-800"
            >
              {PRESET_REPORTS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.code} — {r.title}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-4 space-y-1.5">
            <label className="text-xs font-semibold text-zinc-700">Reporting Period</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs text-zinc-800 focus:outline-none focus:border-amber-800"
            >
              <option>Current Month (November 2024)</option>
              <option>Previous Month (October 2024)</option>
              <option>Q3 FY2024 (July - Sept 2024)</option>
              <option>Full Fiscal Year FY2024</option>
            </select>
          </div>

          <div className="md:col-span-3 space-y-1.5 flex flex-col justify-end">
            <button
              onClick={handleGenerateCustom}
              disabled={isGenerating}
              className="w-full py-2.5 px-4 bg-amber-800 hover:bg-amber-900 disabled:opacity-75 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Generate Report</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Preset Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PRESET_REPORTS.map((rep) => (
          <div
            key={rep.id}
            className="bg-white rounded-2xl border border-zinc-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-400 font-mono mb-2">
                <span className="font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                  {rep.code}
                </span>
                <span>{rep.frequency}</span>
              </div>

              <h4 className="font-serif text-lg font-medium text-zinc-900 leading-snug">
                {rep.title}
              </h4>

              <p className="text-xs text-zinc-500 mt-2 leading-relaxed">{rep.description}</p>
            </div>

            <div className="space-y-3 pt-3 border-t border-zinc-100">
              <div className="flex items-center justify-between text-[11px] text-zinc-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {rep.lastGenerated}
                </span>
                <span className="font-mono">{rep.fileSize}</span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded">
                  {rep.format}
                </span>

                <button
                  onClick={() => handleQuickDownload(rep.title)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-amber-800 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  <Download className="w-3 h-3" />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
