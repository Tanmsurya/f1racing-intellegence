import React from 'react';
import { Filter, RotateCcw, Calendar, Users, Shield, MapPin, Sparkles } from 'lucide-react';
import { CONSTRUCTORS, DRIVERS_LIST } from '../data/f1Data';
import { CIRCUITS_DATA } from '../data/circuitsData';

interface FiltersBarProps {
  startSeason: number;
  endSeason: number;
  onSeasonChange: (start: number, end: number) => void;
  selectedConstructor: string;
  onConstructorChange: (constructorId: string) => void;
  selectedDriver: string;
  onDriverChange: (driverId: string) => void;
  selectedCircuit: string;
  onCircuitChange: (circuitId: string) => void;
  onResetFilters: () => void;
}

export const FiltersBar: React.FC<FiltersBarProps> = ({
  startSeason,
  endSeason,
  onSeasonChange,
  selectedConstructor,
  onConstructorChange,
  selectedDriver,
  onDriverChange,
  selectedCircuit,
  onCircuitChange,
  onResetFilters,
}) => {
  const isFiltered =
    startSeason !== 2007 ||
    endSeason !== 2023 ||
    selectedConstructor !== 'all' ||
    selectedDriver !== 'all' ||
    selectedCircuit !== 'all';

  const eraPresets = [
    { label: 'All 17 Seasons', start: 2007, end: 2023 },
    { label: 'V8 Era (07-13)', start: 2007, end: 2013 },
    { label: 'Turbo-Hybrid (14-21)', start: 2014, end: 2021 },
    { label: 'Ground Effect (22-23)', start: 2022, end: 2023 },
    { label: '2021 Title Duel', start: 2021, end: 2021 },
  ];

  return (
    <div className="bg-[#12151B] border border-[#222731] rounded-xl p-4 mb-6 shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-[#1E232E]">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-red-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-white font-['Titillium_Web',sans-serif]">
            Tableau Global Filter Pane
          </span>
          <span className="text-[11px] text-neutral-400">
            (Applies across all 6 analytical worksheets)
          </span>
        </div>

        {/* Quick Era Presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] text-neutral-400 mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Era Presets:
          </span>
          {eraPresets.map((preset) => {
            const isActive = startSeason === preset.start && endSeason === preset.end;
            return (
              <button
                key={preset.label}
                onClick={() => onSeasonChange(preset.start, preset.end)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-red-600/30 text-red-300 border border-red-500/60 shadow-sm'
                    : 'bg-[#181C24] text-neutral-300 hover:text-white hover:bg-[#222733] border border-[#262C38]'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Controls Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
        {/* 1. Season Range Slider */}
        <div className="bg-[#161A22] p-2.5 rounded-lg border border-[#222731]">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[11px] font-semibold text-neutral-300 flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-red-400" />
              <span>Season Range:</span>
            </label>
            <span className="text-xs font-mono font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-800/40">
              {startSeason} — {endSeason}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={startSeason}
              onChange={(e) => {
                const newStart = Number(e.target.value);
                onSeasonChange(newStart, Math.max(newStart, endSeason));
              }}
              className="w-1/2 bg-[#0E1015] border border-[#2B3240] rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-red-500"
            >
              {Array.from({ length: 17 }, (_, i) => 2007 + i).map((yr) => (
                <option key={yr} value={yr}>
                  From {yr}
                </option>
              ))}
            </select>
            <span className="text-neutral-500 text-xs">to</span>
            <select
              value={endSeason}
              onChange={(e) => {
                const newEnd = Number(e.target.value);
                onSeasonChange(Math.min(startSeason, newEnd), newEnd);
              }}
              className="w-1/2 bg-[#0E1015] border border-[#2B3240] rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-red-500"
            >
              {Array.from({ length: 17 }, (_, i) => 2007 + i).map((yr) => (
                <option key={yr} value={yr}>
                  To {yr}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 2. Constructor Filter */}
        <div className="bg-[#161A22] p-2.5 rounded-lg border border-[#222731]">
          <label className="text-[11px] font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
            <Shield className="w-3 h-3 text-blue-400" />
            <span>Constructor Team:</span>
          </label>
          <select
            value={selectedConstructor}
            onChange={(e) => onConstructorChange(e.target.value)}
            className="w-full bg-[#0E1015] border border-[#2B3240] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-red-500"
          >
            <option value="all">All Constructors (Full Grid)</option>
            {CONSTRUCTORS.map((c) => (
              <option key={c.constructorId} value={c.constructorId}>
                {c.name} ({c.nationality})
              </option>
            ))}
          </select>
        </div>

        {/* 3. Driver Filter */}
        <div className="bg-[#161A22] p-2.5 rounded-lg border border-[#222731]">
          <label className="text-[11px] font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
            <Users className="w-3 h-3 text-amber-400" />
            <span>Driver Focus:</span>
          </label>
          <select
            value={selectedDriver}
            onChange={(e) => onDriverChange(e.target.value)}
            className="w-full bg-[#0E1015] border border-[#2B3240] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-red-500"
          >
            <option value="all">All Championship Drivers</option>
            {DRIVERS_LIST.map((d) => (
              <option key={d.driverId} value={d.driverId}>
                {d.fullName} ({d.code} • {d.nationality})
              </option>
            ))}
          </select>
        </div>

        {/* 4. Circuit & Country Filter */}
        <div className="bg-[#161A22] p-2.5 rounded-lg border border-[#222731]">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[11px] font-semibold text-neutral-300 flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-emerald-400" />
              <span>Circuit / Country:</span>
            </label>
            {isFiltered && (
              <button
                onClick={onResetFilters}
                className="text-[10px] text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                Reset
              </button>
            )}
          </div>
          <select
            value={selectedCircuit}
            onChange={(e) => onCircuitChange(e.target.value)}
            className="w-full bg-[#0E1015] border border-[#2B3240] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-red-500"
          >
            <option value="all">All 29 Circuits & Venues</option>
            {CIRCUITS_DATA.map((c) => (
              <option key={c.circuit_id} value={c.circuit_id}>
                {c.circuit_name} ({c.country})
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
