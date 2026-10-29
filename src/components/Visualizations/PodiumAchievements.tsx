import React, { useState } from 'react';
import { Trophy, Award, Globe, Flag, Users, Shield } from 'lucide-react';
import {
  DRIVER_AGGREGATES,
  CONSTRUCTOR_AGGREGATES,
  PODIUMS_BY_NATIONALITY,
} from '../../data/f1Data';

interface PodiumAchievementsProps {
  selectedConstructor: string;
  selectedDriver: string;
  onSelectDriver: (driverId: string) => void;
  startSeason: number;
  endSeason: number;
}

export const PodiumAchievements: React.FC<PodiumAchievementsProps> = ({
  selectedConstructor,
  selectedDriver,
  onSelectDriver,
  startSeason,
  endSeason,
}) => {
  const [activeTab, setActiveTab] = useState<'drivers' | 'constructors' | 'nationality'>('drivers');

  const topDrivers = [...DRIVER_AGGREGATES]
    .filter((d) => selectedConstructor === 'all' || d.primaryConstructor === selectedConstructor)
    .filter((d) => selectedDriver === 'all' || d.driverId === selectedDriver)
    .sort((a, b) => b.podiums - a.podiums)
    .slice(0, 10);

  const topConstructors = [...CONSTRUCTOR_AGGREGATES]
    .filter((c) => selectedConstructor === 'all' || c.constructorId === selectedConstructor)
    .sort((a, b) => b.podiums - a.podiums);

  const maxDriverPodiums = Math.max(...topDrivers.map((d) => d.podiums), 1);
  const maxConstructorPodiums = Math.max(...topConstructors.map((c) => c.podiums), 1);
  const maxNatPodiums = Math.max(...PODIUMS_BY_NATIONALITY.map((n) => n.podiums), 1);

  return (
    <div className="bg-[#12151B] border border-[#222731] rounded-xl p-5 shadow-lg flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#1E232E]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-4 bg-[#E10600] rounded-sm" />
            <h3 className="font-extrabold text-white text-base tracking-wide font-['Titillium_Web',sans-serif] uppercase">
              Global Podium Achievements (1st, 2nd, 3rd)
            </h3>
            <span className="text-[10px] font-mono uppercase bg-[#1A1F28] text-neutral-300 px-2 py-0.5 rounded border border-[#2B3240]">
              Tableau Worksheet 6
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            Podium trophies by individual driver, manufacturer dominance, and driver nationality
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1.5 bg-[#0E1015] p-1 rounded-lg border border-[#252B37] text-xs">
          <button
            onClick={() => setActiveTab('drivers')}
            className={`px-2.5 py-1 rounded font-medium transition-all ${
              activeTab === 'drivers'
                ? 'bg-[#E10600] text-white shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            By Driver
          </button>
          <button
            onClick={() => setActiveTab('constructors')}
            className={`px-2.5 py-1 rounded font-medium transition-all ${
              activeTab === 'constructors'
                ? 'bg-[#E10600] text-white shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            By Constructor
          </button>
          <button
            onClick={() => setActiveTab('nationality')}
            className={`px-2.5 py-1 rounded font-medium transition-all ${
              activeTab === 'nationality'
                ? 'bg-[#E10600] text-white shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            By Nationality
          </button>
        </div>
      </div>

      {/* Tab 1: Drivers */}
      {activeTab === 'drivers' && (
        <div className="space-y-2.5 overflow-y-auto max-h-[420px] pr-2 custom-scrollbar">
          {topDrivers.map((driver, idx) => {
            const barWidth = (driver.podiums / maxDriverPodiums) * 100;
            const isSelected = selectedDriver === driver.driverId;

            return (
              <div
                key={driver.driverId}
                onClick={() => onSelectDriver(isSelected ? 'all' : driver.driverId)}
                className={`p-2.5 rounded-lg border cursor-pointer transition-all text-xs ${
                  isSelected
                    ? 'bg-red-950/40 border-red-500 shadow'
                    : 'bg-[#141820] border-[#1E232E] hover:border-neutral-600 hover:bg-[#181D26]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded flex items-center justify-center font-mono font-bold bg-[#212733] text-neutral-300 text-[11px]">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-white text-sm">{driver.fullName}</span>
                    <span className="text-[10px] text-neutral-400 font-mono">({driver.nationality})</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-amber-400 font-extrabold text-sm">{driver.podiums}</span>
                    <span className="text-[10px] text-neutral-400">podiums ({driver.wins} wins)</span>
                  </div>
                </div>

                <div className="w-full h-2 bg-[#0E1116] rounded-full overflow-hidden p-0.5 border border-[#1E2430]">
                  <div
                    className="h-full bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-300 rounded-full"
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Constructors */}
      {activeTab === 'constructors' && (
        <div className="space-y-2.5 overflow-y-auto max-h-[420px] pr-2 custom-scrollbar">
          {topConstructors.map((team, idx) => {
            const barWidth = (team.podiums / maxConstructorPodiums) * 100;

            return (
              <div
                key={team.constructorId}
                className="bg-[#141820] p-2.5 rounded-lg border border-[#1E232E] text-xs"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded flex items-center justify-center font-mono font-bold bg-[#212733] text-neutral-300 text-[11px]">
                      {idx + 1}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: team.color }} />
                    <span className="font-bold text-white text-sm">{team.name}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-amber-400 font-extrabold text-sm">{team.podiums}</span>
                    <span className="text-[10px] text-neutral-400">podiums ({team.wins} wins)</span>
                  </div>
                </div>

                <div className="w-full h-2 bg-[#0E1116] rounded-full overflow-hidden p-0.5 border border-[#1E2430]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${barWidth}%`,
                      backgroundColor: team.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 3: Nationality */}
      {activeTab === 'nationality' && (
        <div className="space-y-2.5 overflow-y-auto max-h-[420px] pr-2 custom-scrollbar">
          {PODIUMS_BY_NATIONALITY.map((nat, idx) => {
            const barWidth = (nat.podiums / maxNatPodiums) * 100;

            return (
              <div
                key={nat.nationality}
                className="bg-[#141820] p-2.5 rounded-lg border border-[#1E232E] text-xs"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded flex items-center justify-center font-mono font-bold bg-[#212733] text-neutral-300 text-[11px]">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-white text-sm">{nat.nationality}</span>
                    <span className="text-[10px] text-neutral-400 font-mono">
                      ({nat.driversCount} {nat.driversCount > 1 ? 'drivers' : 'driver'})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-amber-400 font-extrabold text-sm">{nat.podiums}</span>
                    <span className="text-[10px] text-neutral-400">trophies</span>
                  </div>
                </div>

                <div className="w-full h-2 bg-[#0E1116] rounded-full overflow-hidden p-0.5 border border-[#1E2430] mb-1">
                  <div
                    className="h-full bg-gradient-to-r from-red-600 to-amber-500 rounded-full"
                    style={{ width: `${barWidth}%` }}
                  />
                </div>

                <div className="text-[10px] text-neutral-400">
                  Top Contributor: <strong className="text-neutral-200">{nat.topDriver}</strong>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer Definition */}
      <div className="mt-3 p-2 bg-[#0E1117] rounded-lg border border-[#1C222E] text-[11px] text-neutral-400 flex items-center justify-between font-mono">
        <span>Tableau Calculation: Position Order &lt;= 3 AND Status = 'Finished'</span>
        <span className="text-amber-400">Consistent Standard</span>
      </div>
    </div>
  );
};
