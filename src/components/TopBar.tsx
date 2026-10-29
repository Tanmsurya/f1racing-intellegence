import React from 'react';
import { Search, RotateCcw, Database, Shield, Users, MapPin, Calendar, Clock, Terminal } from 'lucide-react';
import { NavigationPage } from '../types/f1';
import { CONSTRUCTORS } from '../data/f1Data';
import { CIRCUITS_DATA } from '../data/circuitsData';

interface TopBarProps {
  currentPage: NavigationPage;
  startSeason: number;
  endSeason: number;
  onSeasonChange: (start: number, end: number) => void;
  selectedConstructor: string;
  onConstructorChange: (id: string) => void;
  selectedCircuit: string;
  onCircuitChange: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onResetFilters: () => void;
  isSidebarCollapsed: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentPage,
  startSeason,
  endSeason,
  onSeasonChange,
  selectedConstructor,
  onConstructorChange,
  selectedCircuit,
  onCircuitChange,
  searchQuery,
  onSearchChange,
  onResetFilters,
  isSidebarCollapsed,
}) => {
  const isFiltered =
    startSeason !== 2007 ||
    endSeason !== 2023 ||
    selectedConstructor !== 'all' ||
    selectedCircuit !== 'all' ||
    searchQuery.trim() !== '';

  const getPageTitle = (page: NavigationPage) => {
    switch (page) {
      case 'overview':
        return 'Overview Dashboard';
      case 'drivers':
        return 'Driver Performance';
      case 'constructors':
        return 'Constructor Analysis';
      case 'tyres':
        return 'Tyre Compound Strategy';
      case 'circuits':
        return 'Circuit Intelligence';
      case 'reliability':
        return 'Reliability & DNF Analysis';
      case 'podiums':
        return 'Podium Analytics';
      case 'story':
        return 'Tableau Story & Insights';
      case 'scenarios':
        return 'Analytical Scenarios (Rajan, Divya, Arvind)';
      case 'studio':
        return 'Tableau Guide & Formulas';
      default:
        return 'Intelligence';
    }
  };

  return (
    <header
      className={`sticky top-0 z-30 bg-[#0B0D10]/95 backdrop-blur-md border-b border-[#181C22] transition-all duration-300 ${
        isSidebarCollapsed ? 'pl-20' : 'pl-68'
      } pr-6 py-3 select-none`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Left: Breadcrumbs & Page Title */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-[#939BA6] uppercase tracking-wider">
            <span>Apex</span>
            <span>/</span>
            <span className="text-white font-semibold">
              {currentPage.toUpperCase()}
            </span>
          </div>

          <div className="h-4 w-[1px] bg-[#222733] hidden sm:block" />

          <h1 className="text-sm sm:text-base font-extrabold text-[#F4F5F7] tracking-tight font-['Titillium_Web',sans-serif] uppercase truncate">
            {getPageTitle(currentPage)}
          </h1>
        </div>

        {/* Center-Right: Compact Filters & Search Bar */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          {/* Search Control */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#939BA6] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search driver / team..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-[#14171C] border border-[#222832] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#F4F5F7] placeholder-[#939BA6]/60 focus:outline-none focus:border-[#E10600] w-36 sm:w-44 font-mono transition-all"
            />
          </div>

          {/* Season Selector */}
          <div className="flex items-center bg-[#14171C] border border-[#222832] rounded-lg px-2 py-1 gap-1 text-[11px] font-mono">
            <Calendar className="w-3 h-3 text-[#E10600]" />
            <select
              value={startSeason}
              onChange={(e) => onSeasonChange(Number(e.target.value), Math.max(Number(e.target.value), endSeason))}
              className="bg-transparent text-white focus:outline-none cursor-pointer"
            >
              {Array.from({ length: 17 }, (_, i) => 2007 + i).map((yr) => (
                <option key={yr} value={yr} className="bg-[#14171C]">
                  {yr}
                </option>
              ))}
            </select>
            <span className="text-neutral-500">-</span>
            <select
              value={endSeason}
              onChange={(e) => onSeasonChange(Math.min(startSeason, Number(e.target.value)), Number(e.target.value))}
              className="bg-transparent text-white focus:outline-none cursor-pointer"
            >
              {Array.from({ length: 17 }, (_, i) => 2007 + i).map((yr) => (
                <option key={yr} value={yr} className="bg-[#14171C]">
                  {yr}
                </option>
              ))}
            </select>
          </div>

          {/* Constructor Selector */}
          <div className="flex items-center bg-[#14171C] border border-[#222832] rounded-lg px-2 py-1 gap-1 text-[11px]">
            <Shield className="w-3 h-3 text-cyan-400" />
            <select
              value={selectedConstructor}
              onChange={(e) => onConstructorChange(e.target.value)}
              className="bg-transparent text-[#F4F5F7] focus:outline-none cursor-pointer max-w-[120px] truncate"
            >
              <option value="all" className="bg-[#14171C]">All Constructors</option>
              {CONSTRUCTORS.map((c) => (
                <option key={c.constructorId} value={c.constructorId} className="bg-[#14171C]">
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Circuit Selector */}
          <div className="hidden xl:flex items-center bg-[#14171C] border border-[#222832] rounded-lg px-2 py-1 gap-1 text-[11px]">
            <MapPin className="w-3 h-3 text-emerald-400" />
            <select
              value={selectedCircuit}
              onChange={(e) => onCircuitChange(e.target.value)}
              className="bg-transparent text-[#F4F5F7] focus:outline-none cursor-pointer max-w-[130px] truncate"
            >
              <option value="all" className="bg-[#14171C]">All 29 Circuits</option>
              {CIRCUITS_DATA.map((c) => (
                <option key={c.circuit_id} value={c.circuit_id} className="bg-[#14171C]">
                  {c.circuit_name}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Action */}
          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-800/60 text-[11px] font-mono transition-all"
              title="Reset all filters to defaults"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}

          {/* System Status Pill */}
          <div className="hidden 2xl:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#14171C] border border-[#222832] text-[10px] font-mono text-[#939BA6]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>HISTORICAL RACE DATA (2007–2023) • 6,464 RECORDS</span>
          </div>
        </div>
      </div>
    </header>
  );
};
