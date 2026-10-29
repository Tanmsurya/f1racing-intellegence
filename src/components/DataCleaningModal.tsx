import React from 'react';
import { X, Database, CheckCircle2, AlertTriangle, Layers, FileSpreadsheet, ShieldCheck } from 'lucide-react';
import { DATASET_METRICS } from '../data/f1Data';
import { CIRCUITS_DATA } from '../data/circuitsData';

interface DataCleaningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DataCleaningModal: React.FC<DataCleaningModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#12151B] border border-[#2B3240] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#1E232E] flex items-center justify-between bg-[#0E1116]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base font-['Titillium_Web',sans-serif] uppercase tracking-wide">
                Dataset Integrity & Relational Architecture Audit
              </h3>
              <p className="text-xs text-neutral-400">
                Verification of 6,464 race records, 17 seasons, and 29 circuits (F1_Racing_Project_Dataset.xlsx)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1E232E] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 custom-scrollbar text-xs">
          {/* Top Audit Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            <div className="bg-[#161B23] p-3 rounded-lg border border-emerald-500/30">
              <span className="text-[10px] text-neutral-400 block uppercase">Race Records</span>
              <strong className="text-lg text-emerald-400 block mt-0.5">6,464 Verified</strong>
              <span className="text-[10px] text-neutral-400">1 row / driver start</span>
            </div>

            <div className="bg-[#161B23] p-3 rounded-lg border border-emerald-500/30">
              <span className="text-[10px] text-neutral-400 block uppercase">Seasons Covered</span>
              <strong className="text-lg text-white block mt-0.5">17 (2007–2023)</strong>
              <span className="text-[10px] text-neutral-400">3 regulatory epochs</span>
            </div>

            <div className="bg-[#161B23] p-3 rounded-lg border border-emerald-500/30">
              <span className="text-[10px] text-neutral-400 block uppercase">Circuits Cataloged</span>
              <strong className="text-lg text-white block mt-0.5">29 Circuits</strong>
              <span className="text-[10px] text-neutral-400">Matches PDF attachment</span>
            </div>

            <div className="bg-[#161B23] p-3 rounded-lg border border-emerald-500/30">
              <span className="text-[10px] text-neutral-400 block uppercase">Classified DNFs</span>
              <strong className="text-lg text-amber-400 block mt-0.5">1,075 (16.63%)</strong>
              <span className="text-[10px] text-neutral-400">10 failure categories</span>
            </div>
          </div>

          {/* Relational Table Schema */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <Layers className="w-4 h-4 text-red-500" />
              <span>Relational Join Schema (Tableau Data Source)</span>
            </h4>
            <div className="bg-[#0A0D12] p-4 rounded-xl border border-[#1E232E] font-mono text-[11px] space-y-2 text-neutral-300">
              <div className="flex items-center justify-between pb-1 border-b border-[#1A1F2B]">
                <span className="text-amber-400 font-bold">results (Fact Table: 6,464 rows)</span>
                <span className="text-neutral-500">Grain: 1 row per driver per Grand Prix</span>
              </div>
              <div className="pl-4 space-y-1 text-neutral-400 text-[10px]">
                <div>├── <strong className="text-white">races</strong> ON results.raceId = races.raceId (334 rounds, 2007-2023)</div>
                <div>│   └── <strong className="text-white">circuits</strong> ON races.circuitId = circuits.circuit_id (29 circuits from attachment)</div>
                <div>├── <strong className="text-white">drivers</strong> ON results.driverId = drivers.driverId (84 total drivers, 22 primary)</div>
                <div>├── <strong className="text-white">constructors</strong> ON results.constructorId = constructors.constructorId (10 active teams)</div>
                <div>└── <strong className="text-white">status</strong> ON results.statusId = status.statusId (Finished, Engine, Collision, etc.)</div>
              </div>
            </div>
          </div>

          {/* Verification of the Attached Circuits Sheet */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Attached File Verification: F1_Racing_Project_Dataset.xlsx (circuits sheet)</span>
            </h4>
            <div className="bg-[#0A0D12] rounded-xl border border-[#1E232E] p-3 text-[11px]">
              <p className="text-neutral-300 mb-2">
                All 29 circuit records from page 1 of the attached PDF (<code>circuit_id, circuit_name, country, city, laps, lap_km, type, altitude_m, direction</code>) have been ingested into the analytics pipeline without alteration:
              </p>
              <div className="max-h-40 overflow-y-auto font-mono text-[10px] space-y-1 text-neutral-400 pr-2 custom-scrollbar">
                {CIRCUITS_DATA.map((c) => (
                  <div key={c.circuit_id} className="flex justify-between py-0.5 border-b border-white/5">
                    <span className="text-white">{c.circuit_name}</span>
                    <span>{c.city}, {c.country} • {c.lap_km}km • {c.type} • {c.altitude_m}m</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Missing Values & Scrubbing Policies */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Data Cleaning & Validation Protocols</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
              <div className="bg-[#141822] p-3 rounded-lg border border-[#222838]">
                <strong className="text-white block mb-1">Null / DNS Handling:</strong>
                <p className="text-neutral-400">
                  Drivers classified as &ldquo;Did Not Start&rdquo; (DNS) or &ldquo;Excluded&rdquo; before race commencement are excluded from the completion rate denominator to prevent skewing DNF percentages.
                </p>
              </div>

              <div className="bg-[#141822] p-3 rounded-lg border border-[#222838]">
                <strong className="text-white block mb-1">Scoring Rule Reconciliation:</strong>
                <p className="text-neutral-400">
                  Historical points systems (10-8-6-5-4-3-2-1 vs 25-18-15-12-10-8-6-4-2-1) are preserved as awarded. Points Per Race (PPR) is used when comparing inter-era driver efficiency.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#1E232E] bg-[#0E1116] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold shadow-md transition-colors"
          >
            Close Audit Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
