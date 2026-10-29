import React, { useState } from 'react';
import { X, Shield, Trophy, Award, TrendingUp, AlertTriangle, Users, CheckCircle } from 'lucide-react';
import { Constructor, ConstructorAggregate } from '../types/f1';
import {
  CONSTRUCTORS,
  CONSTRUCTOR_AGGREGATES,
  CONSTRUCTOR_SEASON_TRAJECTORY,
  DRIVER_AGGREGATES,
} from '../data/f1Data';

interface ConstructorDetailModalProps {
  constructorId: string | null;
  onClose: () => void;
  onSelectDriver: (driverId: string) => void;
}

export const ConstructorDetailModal: React.FC<ConstructorDetailModalProps> = ({
  constructorId,
  onClose,
  onSelectDriver,
}) => {
  const [compareTeamId, setCompareTeamId] = useState<string>('red_bull');

  if (!constructorId) return null;

  const team = CONSTRUCTORS.find((c) => c.constructorId === constructorId) || CONSTRUCTORS[0];
  const agg = CONSTRUCTOR_AGGREGATES.find((c) => c.constructorId === constructorId);
  const compareTeam = CONSTRUCTORS.find((c) => c.constructorId === compareTeamId) || CONSTRUCTORS[0];
  const compareAgg = CONSTRUCTOR_AGGREGATES.find((c) => c.constructorId === compareTeamId);

  // Filter season trajectory
  const teamTrajectory = CONSTRUCTOR_SEASON_TRAJECTORY.filter((s) => s.constructorId === constructorId);

  // Drivers who drove for this constructor
  const teamDrivers = DRIVER_AGGREGATES.filter((d) => d.primaryConstructor === constructorId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0E1116] border border-[#2B3240] rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Color Bar Accent */}
        <div className="h-1.5" style={{ backgroundColor: team.color }} />

        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#1C222E] flex items-center justify-between bg-[#14171C]">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl border flex items-center justify-center font-bold text-white shadow"
              style={{ backgroundColor: `${team.color}25`, borderColor: team.color }}
            >
              <Shield className="w-5 h-5" style={{ color: team.color }} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-white text-xl font-['Titillium_Web',sans-serif] uppercase tracking-wide">
                  {team.name}
                </h3>
                {agg && agg.championships > 0 && (
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                    {agg.championships}x Constructors Champion
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-[#939BA6] font-mono mt-0.5">
                <span>{team.nationality}</span>
                <span>•</span>
                <span>{team.headquarters}</span>
                <span>•</span>
                <span>PU: {team.powerUnit}</span>
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
          {/* Key Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            <div className="bg-[#14171C] p-3.5 rounded-xl border border-[#222834]">
              <span className="text-[10px] text-[#939BA6] uppercase block">Total Championship Points</span>
              <strong className="text-2xl text-white block mt-1">
                {agg?.totalPoints.toLocaleString()} <span className="text-xs font-sans text-neutral-400">pts</span>
              </strong>
              <span className="text-[10px] text-cyan-400 mt-0.5 block">
                {agg ? (agg.totalPoints / 17).toFixed(0) : '0'} pts / season avg
              </span>
            </div>

            <div className="bg-[#14171C] p-3.5 rounded-xl border border-[#222834]">
              <span className="text-[10px] text-[#939BA6] uppercase block">Grand Prix Wins</span>
              <strong className="text-2xl text-amber-400 block mt-1">
                {agg?.wins} <span className="text-xs font-sans text-neutral-400">victories</span>
              </strong>
              <span className="text-[10px] text-neutral-400 mt-0.5 block">
                {agg?.podiums} total podium steps
              </span>
            </div>

            <div className="bg-[#14171C] p-3.5 rounded-xl border border-[#222834]">
              <span className="text-[10px] text-[#939BA6] uppercase block">Car Starts</span>
              <strong className="text-2xl text-white block mt-1">
                {agg?.totalStarts}
              </strong>
              <span className="text-[10px] text-neutral-400 mt-0.5 block">Two-car entries / race</span>
            </div>

            <div className="bg-[#14171C] p-3.5 rounded-xl border border-[#222834]">
              <span className="text-[10px] text-[#939BA6] uppercase block">Reliability & Completion</span>
              <strong className="text-2xl text-emerald-400 block mt-1">
                {agg?.completionRate.toFixed(1)}%
              </strong>
              <span className="text-[10px] text-rose-400 mt-0.5 block">{agg?.dnfs} total team DNFs</span>
            </div>
          </div>

          {/* Benchmark Head-to-Head Comparison */}
          <div className="bg-[#14171C] p-4 rounded-xl border border-[#222834]">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-2 border-b border-[#1E232E]">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                <h4 className="font-bold text-white text-sm">
                  Head-to-Head Benchmark Comparison
                </h4>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-[#939BA6]">Compare against:</span>
                <select
                  value={compareTeamId}
                  onChange={(e) => setCompareTeamId(e.target.value)}
                  className="bg-[#1B2027] border border-[#2B3442] rounded px-2.5 py-1 text-white text-xs focus:outline-none"
                >
                  {CONSTRUCTORS.filter((c) => c.constructorId !== constructorId).map((c) => (
                    <option key={c.constructorId} value={c.constructorId}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center font-mono py-2 bg-[#0E1116] rounded-lg border border-[#1E232E]">
              <div>
                <span className="text-[10px] text-[#939BA6] block">{team.name}</span>
                <strong className="text-base text-white block mt-1">{agg?.totalPoints.toLocaleString()}</strong>
                <span className="text-[10px] text-neutral-400">{agg?.wins} wins</span>
              </div>
              <div className="flex flex-col justify-center items-center">
                <span className="text-[10px] uppercase font-bold text-neutral-400">Championship Delta</span>
                <strong
                  className={`text-sm block mt-1 ${
                    (agg?.totalPoints || 0) - (compareAgg?.totalPoints || 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {(agg?.totalPoints || 0) - (compareAgg?.totalPoints || 0) >= 0 ? '+' : ''}
                  {((agg?.totalPoints || 0) - (compareAgg?.totalPoints || 0)).toLocaleString()} pts
                </strong>
                <span className="text-[9px] text-neutral-500">17-season net</span>
              </div>
              <div>
                <span className="text-[10px] text-[#939BA6] block">{compareTeam.name}</span>
                <strong className="text-base text-white block mt-1">{compareAgg?.totalPoints.toLocaleString()}</strong>
                <span className="text-[10px] text-neutral-400">{compareAgg?.wins} wins</span>
              </div>
            </div>
          </div>

          {/* Driver Lineup Contribution */}
          {teamDrivers.length > 0 && (
            <div className="bg-[#14171C] p-4 rounded-xl border border-[#222834]">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#1E232E]">
                <Users className="w-4 h-4 text-amber-400" />
                <h4 className="font-bold text-white text-sm">
                  Primary Drivers Representing {team.name}
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {teamDrivers.map((d) => (
                  <div
                    key={d.driverId}
                    onClick={() => onSelectDriver(d.driverId)}
                    className="p-2.5 rounded-lg bg-[#0E1116] border border-[#1E232E] hover:border-neutral-600 transition-all flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <span className="font-bold text-white block">{d.fullName}</span>
                      <span className="text-[10px] font-mono text-[#939BA6]">{d.nationality} • {d.raceStarts} starts</span>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-white font-bold block">{d.totalPoints.toLocaleString()} pts</span>
                      <span className="text-[10px] text-amber-400">{d.wins}W • {d.podiums}P</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Season-by-Season Trajectory Records */}
          <div className="bg-[#14171C] p-4 rounded-xl border border-[#222834]">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#1E232E]">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <h4 className="font-bold text-white text-sm">
                Championship Finishes Across Seasons
              </h4>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-[11px]">
                <thead>
                  <tr className="border-b border-[#222834] text-[#939BA6] uppercase text-[10px]">
                    <th className="pb-2">Season</th>
                    <th className="pb-2 text-right">Points</th>
                    <th className="pb-2 text-center">WCC Rank</th>
                    <th className="pb-2 text-right">Wins</th>
                    <th className="pb-2 text-right">Podiums</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1B212C]">
                  {teamTrajectory.map((s) => (
                    <tr key={s.season} className="hover:bg-[#1B2027]">
                      <td className="py-2 font-bold text-white">{s.season}</td>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#1C222E] bg-[#14171C] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#E10600] hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
          >
            Close Team Profile
          </button>
        </div>
      </div>
    </div>
  );
};
