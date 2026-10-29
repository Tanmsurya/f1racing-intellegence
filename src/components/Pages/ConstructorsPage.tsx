import React, { useState } from 'react';
import { Shield, Trophy, Award, TrendingUp, Users, CheckCircle2, ChevronRight, Eye } from 'lucide-react';
import { CONSTRUCTORS, CONSTRUCTOR_AGGREGATES, CONSTRUCTOR_SEASON_TRAJECTORY } from '../../data/f1Data';
import { ConstructorTrajectory } from '../Visualizations/ConstructorTrajectory';

interface ConstructorsPageProps {
  onOpenConstructorProfile: (constructorId: string) => void;
  startSeason: number;
  endSeason: number;
}

export const ConstructorsPage: React.FC<ConstructorsPageProps> = ({
  onOpenConstructorProfile,
  startSeason,
  endSeason,
}) => {
  const [selectedBenchmark, setSelectedBenchmark] = useState<string>('ferrari');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-[#14171C] border border-[#222834] rounded-2xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-black text-white font-['Titillium_Web',sans-serif] uppercase tracking-wide">
              Constructor Championship Intelligence
            </h2>
          </div>
          <p className="text-xs text-[#939BA6] mt-0.5 font-mono">
            Trajectory benchmarking across Red Bull Racing, Mercedes-AMG, and competing manufacturers (2007–2023)
          </p>
        </div>
      </div>

      {/* Trajectory Multi-Line Visualization */}
      <ConstructorTrajectory
        startSeason={startSeason}
        endSeason={endSeason}
        selectedConstructor={selectedBenchmark}
      />

      {/* Constructor Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CONSTRUCTOR_AGGREGATES.map((team) => {
          const info = CONSTRUCTORS.find((c) => c.constructorId === team.constructorId);
          return (
            <div
              key={team.constructorId}
              onClick={() => onOpenConstructorProfile(team.constructorId)}
              className="bg-[#14171C] border border-[#222834] hover:border-neutral-500 rounded-xl p-4 cursor-pointer transition-all hover:bg-[#1B2027] group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/40 shadow-sm"
                      style={{ backgroundColor: team.color }}
                    />
                    <h4 className="font-bold text-white text-sm group-hover:text-red-400 transition-colors">
                      {team.name}
                    </h4>
                  </div>
                  {team.championships > 0 && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                      {team.championships}x Champion
                    </span>
                  )}
                </div>

                <div className="text-[11px] text-[#939BA6] mb-3 font-mono">
                  {team.nationality} • {info?.powerUnit}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-[#0E1116] p-2.5 rounded-lg border border-[#1E232E] mb-3">
                  <div>
                    <span className="text-[10px] text-[#939BA6] block">Points</span>
                    <strong className="text-white text-sm">{team.totalPoints.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#939BA6] block">Wins / Podiums</span>
                    <strong className="text-amber-400 text-sm">{team.wins}W • {team.podiums}P</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#939BA6] block">Starts</span>
                    <strong className="text-neutral-300">{team.totalStarts}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#939BA6] block">Completion</span>
                    <strong className="text-emerald-400">{team.completionRate.toFixed(1)}%</strong>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#1C222E] text-xs font-mono text-cyan-400">
                <span>View Full Analysis</span>
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
