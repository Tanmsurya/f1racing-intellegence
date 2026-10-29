import React, { useState } from 'react';
import { ShieldAlert, Wrench, AlertTriangle, CheckCircle, BarChart2, Filter } from 'lucide-react';
import {
  RETIREMENT_CATEGORY_DATA,
  SEASON_RELIABILITY_TREND,
  CONSTRUCTOR_AGGREGATES,
  DRIVER_AGGREGATES,
} from '../../data/f1Data';

interface ReliabilityAnalysisProps {
  selectedConstructor: string;
  selectedDriver: string;
  startSeason: number;
  endSeason: number;
}

export const ReliabilityAnalysis: React.FC<ReliabilityAnalysisProps> = ({
  selectedConstructor,
  selectedDriver,
  startSeason,
  endSeason,
}) => {
  const [subView, setSubView] = useState<'causes' | 'constructors' | 'seasons'>('causes');

  const filteredSeasonTrend = SEASON_RELIABILITY_TREND.filter(
    (s) => s.season >= startSeason && s.season <= endSeason
  );

  const totalEntriesInRange = filteredSeasonTrend.reduce((acc, s) => acc + s.entries, 0);
  const totalDNFsInRange = filteredSeasonTrend.reduce((acc, s) => acc + s.dnfs, 0);
  const totalFinishedInRange = filteredSeasonTrend.reduce((acc, s) => acc + s.finished, 0);
  const avgCompletionRate = totalEntriesInRange > 0 ? (totalFinishedInRange / totalEntriesInRange) * 100 : 0;
  const avgDNFRate = totalEntriesInRange > 0 ? (totalDNFsInRange / totalEntriesInRange) * 100 : 0;

  // Filter constructors if selected
  const displayConstructors = CONSTRUCTOR_AGGREGATES.filter(
    (c) => selectedConstructor === 'all' || c.constructorId === selectedConstructor
  ).sort((a, b) => b.dnfs - a.dnfs);

  return (
    <div className="bg-[#12151B] border border-[#222731] rounded-xl p-5 shadow-lg flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#1E232E]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-4 bg-[#E10600] rounded-sm" />
            <h3 className="font-extrabold text-white text-base tracking-wide font-['Titillium_Web',sans-serif] uppercase">
              Driver & Constructor Reliability Analysis
            </h3>
            <span className="text-[10px] font-mono uppercase bg-[#1A1F28] text-neutral-300 px-2 py-0.5 rounded border border-[#2B3240]">
              Tableau Worksheet 5
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            Retirement categorization, mechanical failure vs collision shares, and epoch stability
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1.5 bg-[#0E1015] p-1 rounded-lg border border-[#252B37] text-xs">
          <button
            onClick={() => setSubView('causes')}
            className={`px-2.5 py-1 rounded font-medium transition-all ${
              subView === 'causes'
                ? 'bg-[#E10600] text-white shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Retirement Causes
          </button>
          <button
            onClick={() => setSubView('constructors')}
            className={`px-2.5 py-1 rounded font-medium transition-all ${
              subView === 'constructors'
                ? 'bg-[#E10600] text-white shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Team Reliability
          </button>
          <button
            onClick={() => setSubView('seasons')}
            className={`px-2.5 py-1 rounded font-medium transition-all ${
              subView === 'seasons'
                ? 'bg-[#E10600] text-white shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Season Epochs
          </button>
        </div>
      </div>

      {/* Summary Stat Pills */}
      <div className="grid grid-cols-3 gap-2.5 mb-4 text-xs font-mono">
        <div className="bg-[#151922] p-2.5 rounded-lg border border-[#232938]">
          <span className="text-[10px] text-neutral-400 block uppercase">Period Starts</span>
          <strong className="text-sm text-white">{totalEntriesInRange.toLocaleString()} entries</strong>
        </div>
        <div className="bg-[#151922] p-2.5 rounded-lg border border-[#232938]">
          <span className="text-[10px] text-neutral-400 block uppercase">Completion Rate</span>
          <strong className="text-sm text-emerald-400">{avgCompletionRate.toFixed(1)}% finished</strong>
        </div>
        <div className="bg-[#151922] p-2.5 rounded-lg border border-[#232938]">
          <span className="text-[10px] text-neutral-400 block uppercase">DNF Rate</span>
          <strong className="text-sm text-rose-400">{avgDNFRate.toFixed(1)}% ({totalDNFsInRange.toLocaleString()} DNFs)</strong>
        </div>
      </div>

      {/* SubView 1: Causes Breakdown */}
      {subView === 'causes' && (
        <div className="space-y-2.5 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
          {RETIREMENT_CATEGORY_DATA.map((cat, idx) => {
            const isMechanical = cat.category !== 'Collision/Accident' && cat.category !== 'Disqualified' && cat.category !== 'Withdrawn/Other';
            return (
              <div
                key={cat.category}
                className="bg-[#141820] p-2.5 rounded-lg border border-[#1E232E] hover:border-neutral-600 transition-all text-xs"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isMechanical ? 'bg-amber-400' : cat.category === 'Collision/Accident' ? 'bg-rose-500' : 'bg-neutral-400'
                      }`}
                    />
                    <span className="font-bold text-white text-xs">{cat.category}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                        isMechanical ? 'bg-amber-950/80 text-amber-300' : 'bg-neutral-800 text-neutral-300'
                      }`}
                    >
                      {isMechanical ? 'Mechanical Failure' : 'Non-Mechanical'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-white font-bold">{cat.count}</span>
                    <span className="text-neutral-400 text-[10px]">({cat.sharePct}%)</span>
                  </div>
                </div>

                <div className="w-full h-2 bg-[#0E1116] rounded-full overflow-hidden p-0.5 border border-[#1E2430] mb-1">
                  <div
                    className={`h-full rounded-full ${
                      cat.category === 'Collision/Accident'
                        ? 'bg-rose-600'
                        : isMechanical
                        ? 'bg-amber-500'
                        : 'bg-neutral-500'
                    }`}
                    style={{ width: `${cat.sharePct * 2.2}%` }}
                  />
                </div>

                <p className="text-[10px] text-neutral-400 truncate">{cat.description}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* SubView 2: Constructor Reliability Stacked Bars */}
      {subView === 'constructors' && (
        <div className="space-y-2.5 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
          {displayConstructors.map((team) => {
            const finishedStarts = team.totalStarts - team.dnfs;
            const completionPct = (finishedStarts / team.totalStarts) * 100;
            const dnfPct = (team.dnfs / team.totalStarts) * 100;

            return (
              <div
                key={team.constructorId}
                className="bg-[#141820] p-2.5 rounded-lg border border-[#1E232E] text-xs"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: team.color }} />
                    <span className="font-bold text-white">{team.name}</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-[11px]">
                    <span className="text-emerald-400">{completionPct.toFixed(1)}% Finish</span>
                    <span className="text-rose-400">{dnfPct.toFixed(1)}% DNF</span>
                    <span className="text-neutral-400">({team.dnfs} / {team.totalStarts})</span>
                  </div>
                </div>

                {/* Stacked Progress Bar */}
                <div className="w-full h-2.5 bg-[#0E1116] rounded-full overflow-hidden flex border border-[#1E2430]">
                  <div
                    className="bg-emerald-500 h-full transition-all"
                    style={{ width: `${completionPct}%` }}
                    title={`Finished: ${finishedStarts}`}
                  />
                  <div
                    className="bg-rose-600 h-full transition-all"
                    style={{ width: `${dnfPct}%` }}
                    title={`DNFs: ${team.dnfs}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SubView 3: Season Reliability Trend across Epochs */}
      {subView === 'seasons' && (
        <div className="space-y-2 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
          {filteredSeasonTrend.map((s) => (
            <div
              key={s.season}
              className="bg-[#141820] p-2 rounded-lg border border-[#1E232E] text-xs flex items-center justify-between font-mono"
            >
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">Season {s.season}</span>
                <span className="text-[10px] text-neutral-400 bg-[#0E1116] px-1.5 py-0.5 rounded border border-[#1E232E]">
                  {s.epoch}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-neutral-400 text-[11px]">{s.entries} entries</span>
                <span className="text-emerald-400 font-semibold">{s.finished} fin</span>
                <span className="text-rose-400 font-bold">{s.dnfRate}% DNF</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Denominator rule definition footer */}
      <div className="mt-3 p-2 bg-[#0E1117] rounded-lg border border-[#1C222E] text-[11px] text-neutral-400 flex items-center justify-between font-mono">
        <span>Denominator Rule: Starts = Classified Finishes + Mechanical Retirements + Accidents</span>
        <span className="text-amber-400">No Double-Counting</span>
      </div>
    </div>
  );
};
