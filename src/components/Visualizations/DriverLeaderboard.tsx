import React, { useState } from 'react';
import { Trophy, Award, Flag, Users, ChevronDown, Sparkles } from 'lucide-react';
import { DriverAggregate } from '../../types/f1';
import { DRIVER_AGGREGATES, CONSTRUCTORS } from '../../data/f1Data';

interface DriverLeaderboardProps {
  selectedConstructor: string;
  selectedDriver: string;
  onSelectDriver: (driverId: string) => void;
  startSeason: number;
  endSeason: number;
}

export const DriverLeaderboard: React.FC<DriverLeaderboardProps> = ({
  selectedConstructor,
  selectedDriver,
  onSelectDriver,
  startSeason,
  endSeason,
}) => {
  const [sortField, setSortField] = useState<'totalPoints' | 'wins' | 'podiums' | 'pointsPerRace'>('totalPoints');
  const [hoveredDriver, setHoveredDriver] = useState<DriverAggregate | null>(null);

  // Filter and rank drivers based on current filters and season weighting
  // In a multi-season view, scale active career points proportionally if season range is narrowed
  const seasonFactor = (endSeason - startSeason + 1) / 17;

  const filteredDrivers = DRIVER_AGGREGATES
    .filter((d) => selectedConstructor === 'all' || d.primaryConstructor === selectedConstructor)
    .filter((d) => selectedDriver === 'all' || d.driverId === selectedDriver)
    .map((d) => ({
      ...d,
      displayPoints: Number((d.totalPoints * (seasonFactor < 1 ? Math.max(0.2, seasonFactor) : 1)).toFixed(1)),
      displayWins: Math.round(d.wins * (seasonFactor < 1 ? Math.max(0.2, seasonFactor) : 1)),
      displayPodiums: Math.round(d.podiums * (seasonFactor < 1 ? Math.max(0.2, seasonFactor) : 1)),
      displayStarts: Math.round(d.raceStarts * (seasonFactor < 1 ? Math.max(0.2, seasonFactor) : 1)),
    }))
    .sort((a, b) => b[sortField === 'totalPoints' ? 'displayPoints' : sortField === 'wins' ? 'displayWins' : sortField === 'podiums' ? 'displayPodiums' : 'pointsPerRace'] - a[sortField === 'totalPoints' ? 'displayPoints' : sortField === 'wins' ? 'displayWins' : sortField === 'podiums' ? 'displayPodiums' : 'pointsPerRace']);

  const maxPoints = Math.max(...filteredDrivers.map((d) => d.displayPoints), 1);

  const getConstructor = (id: string) => CONSTRUCTORS.find((c) => c.constructorId === id);

  return (
    <div className="bg-[#12151B] border border-[#222731] rounded-xl p-5 shadow-lg relative flex flex-col h-full">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#1E232E]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-4 bg-[#E10600] rounded-sm" />
            <h3 className="font-extrabold text-white text-base tracking-wide font-['Titillium_Web',sans-serif] uppercase">
              Driver Performance Leaderboard
            </h3>
            <span className="text-[10px] font-mono uppercase bg-[#1A1F28] text-neutral-300 px-2 py-0.5 rounded border border-[#2B3240]">
              Tableau Worksheet 1
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            Ranked cumulative points, race wins, podiums, and efficiency for {startSeason}–{endSeason}
          </p>
        </div>

        {/* Sort Metric Selector */}
        <div className="flex items-center gap-1.5 bg-[#0E1015] p-1 rounded-lg border border-[#252B37]">
          <span className="text-[10px] uppercase font-semibold text-neutral-400 px-2 font-mono">Rank By:</span>
          {(['totalPoints', 'wins', 'podiums', 'pointsPerRace'] as const).map((field) => (
            <button
              key={field}
              onClick={() => setSortField(field)}
              className={`px-2.5 py-1 text-xs rounded font-medium transition-all ${
                sortField === field
                  ? 'bg-[#E10600] text-white shadow'
                  : 'text-neutral-400 hover:text-white hover:bg-[#1A1F28]'
              }`}
            >
              {field === 'totalPoints' ? 'Points' : field === 'wins' ? 'Wins' : field === 'podiums' ? 'Podiums' : 'PPR'}
            </button>
          ))}
        </div>
      </div>

      {/* Bar Chart Container */}
      <div className="space-y-2.5 overflow-y-auto max-h-[460px] pr-2 custom-scrollbar">
        {filteredDrivers.slice(0, 15).map((driver, idx) => {
          const isSelected = selectedDriver === driver.driverId;
          const isLeader = idx === 0;
          const percentage = (driver.displayPoints / maxPoints) * 100;
          const team = getConstructor(driver.primaryConstructor);

          return (
            <div
              key={driver.driverId}
              onClick={() => onSelectDriver(selectedDriver === driver.driverId ? 'all' : driver.driverId)}
              onMouseEnter={() => setHoveredDriver(driver)}
              onMouseLeave={() => setHoveredDriver(null)}
              className={`group relative p-2 rounded-lg cursor-pointer transition-all border ${
                isSelected
                  ? 'bg-red-950/40 border-red-500 shadow-md'
                  : isLeader
                  ? 'bg-[#181D26] border-amber-500/30'
                  : 'bg-[#141820] border-[#1E232E] hover:border-neutral-600 hover:bg-[#191E28]'
              }`}
            >
              {/* Row Header: Rank, Name, Team Badge, Points */}
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-5 h-5 flex items-center justify-center rounded text-[11px] font-mono font-bold ${
                      idx === 0
                        ? 'bg-amber-500 text-black shadow-sm'
                        : idx === 1
                        ? 'bg-neutral-300 text-black'
                        : idx === 2
                        ? 'bg-amber-700 text-white'
                        : 'bg-[#212733] text-neutral-400'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span className="font-bold text-white group-hover:text-red-400 transition-colors">
                    {driver.fullName}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">({driver.code})</span>
                  {team && (
                    <span
                      className="text-[10px] px-1.5 py-0.2 rounded font-medium flex items-center gap-1 border border-white/10"
                      style={{ backgroundColor: `${team.color}25`, color: team.color }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: team.color }} />
                      {team.name}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 font-mono">
                  <span className="text-[11px] text-neutral-400 hidden sm:inline">
                    {driver.displayWins}W • {driver.displayPodiums}P
                  </span>
                  <span className="font-extrabold text-sm text-white">
                    {driver.displayPoints.toLocaleString()} <span className="text-[10px] text-neutral-400 font-sans">pts</span>
                  </span>
                </div>
              </div>

              {/* Bar Fill */}
              <div className="w-full h-3 bg-[#0E1116] rounded-full overflow-hidden p-0.5 border border-[#1E2430]">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isLeader
                      ? 'bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400'
                      : isSelected
                      ? 'bg-gradient-to-r from-red-600 to-red-400'
                      : 'bg-gradient-to-r from-[#C00000] to-[#E10600]'
                  }`}
                  style={{ width: `${Math.max(percentage, 4)}%` }}
                />
              </div>

              {/* Secondary Details */}
              <div className="flex items-center justify-between text-[10px] text-neutral-400 mt-1 font-mono">
                <span>Starts: {driver.displayStarts}</span>
                <span>PPR: {driver.pointsPerRace.toFixed(2)} pts/race</span>
                <span className="text-emerald-400">Finish: {driver.completionRate.toFixed(1)}%</span>
              </div>
            </div>
          );
        })}

        {filteredDrivers.length === 0 && (
          <div className="text-center py-12 text-neutral-400 text-xs">
            No driver records matching the active filter criteria.
          </div>
        )}
      </div>

      {/* Floating Tableau Tooltip Indicator */}
      {hoveredDriver && (
        <div className="mt-3 p-2.5 rounded bg-[#0A0D12] border border-red-500/30 text-xs text-neutral-300 flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>
              <strong className="text-white">{hoveredDriver.fullName}</strong> ({hoveredDriver.nationality})
            </span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span>Avg Grid: P{hoveredDriver.avgGrid}</span>
            <span>Avg Finish: P{hoveredDriver.avgFinish}</span>
            <span className="text-rose-400">DNFs: {hoveredDriver.dnfs}</span>
          </div>
        </div>
      )}
    </div>
  );
};
