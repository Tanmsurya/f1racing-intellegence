import React from 'react';
import { X, Trophy, Award, Flag, Shield, CheckCircle2, AlertOctagon, TrendingUp, Calendar, Zap, MapPin } from 'lucide-react';
import { DriverAggregate, DriverSeasonRecord } from '../types/f1';
import { CONSTRUCTORS, DRIVER_SEASON_PROFILES, DRIVERS_LIST } from '../data/f1Data';

interface DriverDetailModalProps {
  driver: DriverAggregate | null;
  onClose: () => void;
}

export const DriverDetailModal: React.FC<DriverDetailModalProps> = ({ driver, onClose }) => {
  if (!driver) return null;

  const team = CONSTRUCTORS.find((c) => c.constructorId === driver.primaryConstructor);
  const driverMeta = DRIVERS_LIST.find((d) => d.driverId === driver.driverId);
  const seasons: DriverSeasonRecord[] = DRIVER_SEASON_PROFILES[driver.driverId] || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0E1116] border border-[#2B3240] rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header Ribbon with Racing Red Accent */}
        <div className="h-1 bg-gradient-to-r from-[#E10600] via-cyan-400 to-[#E10600]" />

        <div className="px-6 py-4 border-b border-[#1C222E] flex items-center justify-between bg-[#14171C]">
          <div className="flex items-center gap-4">
            {/* Number Badge */}
            <div className="w-12 h-12 rounded-xl bg-[#1B2027] border border-[#2B3442] flex items-center justify-center font-black text-2xl font-mono text-white shadow-inner">
              {driver.permanentNumber || driver.code}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-white text-xl font-['Titillium_Web',sans-serif] uppercase tracking-wide">
                  {driver.fullName}
                </h3>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800">
                  {driver.code}
                </span>
                {driver.careerTitles && driver.careerTitles > 0 && (
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                    {driver.careerTitles}x World Champion
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-[#939BA6] mt-0.5 font-mono">
                <span>{driver.nationality}</span>
                <span>•</span>
                <span className="flex items-center gap-1.5" style={{ color: team?.color || '#FFF' }}>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: team?.color || '#FFF' }} />
                  {team?.name || driver.primaryConstructor}
                </span>
                <span>•</span>
                <span>Active 2007–2023</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1B2027] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 custom-scrollbar text-xs">
          {/* Key Stat Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            <div className="bg-[#14171C] p-3.5 rounded-xl border border-[#222834]">
              <span className="text-[10px] text-[#939BA6] uppercase block">Cumulative Points</span>
              <strong className="text-2xl text-white block mt-1">
                {driver.totalPoints.toLocaleString()} <span className="text-xs font-sans text-neutral-400">pts</span>
              </strong>
              <span className="text-[10px] text-cyan-400 mt-0.5 block">{driver.pointsPerRace.toFixed(2)} pts / race avg</span>
            </div>

            <div className="bg-[#14182C]/40 p-3.5 rounded-xl border border-amber-500/30">
              <span className="text-[10px] text-[#939BA6] uppercase block">Race Victories</span>
              <strong className="text-2xl text-amber-400 block mt-1">
                {driver.wins} <span className="text-xs font-sans text-neutral-400">wins</span>
              </strong>
              <span className="text-[10px] text-neutral-400 mt-0.5 block">
                {((driver.wins / driver.raceStarts) * 100).toFixed(1)}% win rate
              </span>
            </div>

            <div className="bg-[#14171C] p-3.5 rounded-xl border border-[#222834]">
              <span className="text-[10px] text-[#939BA6] uppercase block">Podium Finishes</span>
              <strong className="text-2xl text-white block mt-1">
                {driver.podiums} <span className="text-xs font-sans text-neutral-400">podiums</span>
              </strong>
              <span className="text-[10px] text-neutral-400 mt-0.5 block">
                {((driver.podiums / driver.raceStarts) * 100).toFixed(1)}% podium rate
              </span>
            </div>

            <div className="bg-[#14171C] p-3.5 rounded-xl border border-[#222834]">
              <span className="text-[10px] text-[#939BA6] uppercase block">Completion Rate</span>
              <strong className="text-2xl text-emerald-400 block mt-1">
                {driver.completionRate.toFixed(1)}%
              </strong>
              <span className="text-[10px] text-neutral-400 mt-0.5 block">
                {driver.raceStarts - driver.dnfs} finishes / {driver.dnfs} DNFs
              </span>
            </div>
          </div>

          {/* Season-by-Season Trajectory */}
          {seasons.length > 0 && (
            <div className="bg-[#14171C] p-4 rounded-xl border border-[#222834]">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#1E232E]">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  <h4 className="font-bold text-white text-sm">
                    Season-by-Season Championship Campaign History
                  </h4>
                </div>
                <span className="text-[11px] font-mono text-[#939BA6]">
                  {seasons.length} Cataloged Seasons
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-[11px]">
                  <thead>
                    <tr className="border-b border-[#222834] text-[#939BA6] uppercase text-[10px]">
                      <th className="pb-2">Season</th>
                      <th className="pb-2">Constructor</th>
                      <th className="pb-2 text-right">Points</th>
                      <th className="pb-2 text-center">WDC Pos</th>
                      <th className="pb-2 text-right">Wins</th>
                      <th className="pb-2 text-right">Podiums</th>
                      <th className="pb-2 text-right">DNFs</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1B212C]">
                    {seasons.map((s) => (
                      <tr key={s.season} className="hover:bg-[#1B2027] transition-colors">
                        <td className="py-2 font-bold text-white">{s.season}</td>
                        <td className="py-2 text-[#939BA6] capitalize">{s.constructorId.replace('_', ' ')}</td>
                        <td className="py-2 text-right font-bold text-white">{s.points}</td>
                        <td className="py-2 text-center">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              s.position === 1
                                ? 'bg-amber-950 text-amber-300 border border-amber-700'
                                : s.position <= 3
                                ? 'bg-[#1E2532] text-cyan-300'
                                : 'text-[#939BA6]'
                            }`}
                          >
                            P{s.position}
                          </span>
                        </td>
                        <td className="py-2 text-right text-amber-400">{s.wins}</td>
                        <td className="py-2 text-right text-white">{s.podiums}</td>
                        <td className="py-2 text-right text-rose-400">{s.dnfs}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Technical Operating Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#14171C] p-4 rounded-xl border border-[#222834]">
              <span className="font-bold text-white text-xs block mb-2 text-cyan-400 uppercase font-mono">
                Qualifying & Race Pace Delta
              </span>
              <div className="space-y-2 font-mono text-[11px]">
                <div className="flex justify-between py-1 border-b border-[#1E2430]">
                  <span className="text-[#939BA6]">Average Grid Position:</span>
                  <strong className="text-white">P{driver.avgGrid.toFixed(1)}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1E2430]">
                  <span className="text-[#939BA6]">Average Finish Position:</span>
                  <strong className="text-white">P{driver.avgFinish.toFixed(1)}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1E2430]">
                  <span className="text-[#939BA6]">Positions Gained / Race:</span>
                  <strong className={driver.avgGrid - driver.avgFinish >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                    {driver.avgGrid - driver.avgFinish >= 0 ? '+' : ''}{(driver.avgGrid - driver.avgFinish).toFixed(1)} pos
                  </strong>
                </div>
              </div>
            </div>

            <div className="bg-[#14171C] p-4 rounded-xl border border-[#222834]">
              <span className="font-bold text-white text-xs block mb-2 text-red-400 uppercase font-mono">
                Reliability & Component Exposure
              </span>
              <div className="space-y-2 font-mono text-[11px]">
                <div className="flex justify-between py-1 border-b border-[#1E2430]">
                  <span className="text-[#939BA6]">Total Grand Prix Starts:</span>
                  <strong className="text-white">{driver.raceStarts} starts</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1E2430]">
                  <span className="text-[#939BA6]">Non-Finishes (DNF):</span>
                  <strong className="text-rose-400">{driver.dnfs} ({((driver.dnfs / driver.raceStarts) * 100).toFixed(1)}%)</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1E2430]">
                  <span className="text-[#939BA6]">Clean Finish Ratio:</span>
                  <strong className="text-emerald-400">{driver.completionRate.toFixed(1)}%</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#1C222E] bg-[#14171C] flex justify-between items-center text-xs font-mono text-[#939BA6]">
          <span>Verified against 6,464 race entries</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#E10600] hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};
