import React from 'react';
import { Flag, BarChart3, BookOpen, UserCheck, Code, Database, Sparkles, ShieldCheck } from 'lucide-react';

export type AppTab = 'dashboard' | 'story' | 'scenarios' | 'studio';

interface NavbarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  onOpenDataAudit: () => void;
  seasonRangeLabel: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenDataAudit,
  seasonRangeLabel,
}) => {
  return (
    <header className="bg-[#0B0D10] border-b border-[#222731] sticky top-0 z-40 select-none">
      {/* Top red racing stripe */}
      <div className="h-1 bg-gradient-to-r from-[#E10600] via-[#FF334B] to-[#E10600]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Project Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#E10600] to-[#990000] flex items-center justify-center shadow-lg shadow-red-900/40 text-white font-black tracking-tighter text-xl border border-red-500/30">
              F1
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-wider text-white text-base font-['Titillium_Web',sans-serif] uppercase">
                  Race Intelligence
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-red-950/80 text-red-400 border border-red-800/60">
                  Tableau Pro
                </span>
              </div>
              <p className="text-xs text-neutral-400 hidden sm:block">
                17 Seasons (2007–2023) • 6,464 Records • 29 Circuits
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === 'dashboard'
                  ? 'bg-[#E10600] text-white shadow-md shadow-red-900/50'
                  : 'text-neutral-300 hover:text-white hover:bg-[#1A1F28]'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('story')}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === 'story'
                  ? 'bg-[#E10600] text-white shadow-md shadow-red-900/50'
                  : 'text-neutral-300 hover:text-white hover:bg-[#1A1F28]'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Tableau Story</span>
            </button>

            <button
              onClick={() => setActiveTab('scenarios')}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === 'scenarios'
                  ? 'bg-[#E10600] text-white shadow-md shadow-red-900/50'
                  : 'text-neutral-300 hover:text-white hover:bg-[#1A1F28]'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Scenarios</span>
            </button>

            <button
              onClick={() => setActiveTab('studio')}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === 'studio'
                  ? 'bg-[#E10600] text-white shadow-md shadow-red-900/50'
                  : 'text-neutral-300 hover:text-white hover:bg-[#1A1F28]'
              }`}
            >
              <Code className="w-4 h-4" />
              <span className="hidden md:inline">Tableau Guide & Formulas</span>
              <span className="md:hidden">Guide</span>
            </button>
          </nav>

          {/* Right Action: Data Audit */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenDataAudit}
              className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded bg-[#161B22] border border-[#2B3240] text-neutral-300 hover:text-white hover:border-red-500/50 transition-all text-xs font-medium flex items-center gap-1.5 shadow-sm"
              title="Inspect dataset schema, 6,464 records audit, and join relationships"
            >
              <Database className="w-3.5 h-3.5 text-red-400" />
              <span className="hidden lg:inline">Data Audit & Joins</span>
              <span className="lg:hidden">Audit</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
