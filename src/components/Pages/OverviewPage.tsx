import React from 'react';
import { Flag, Users, Shield, Award, Trophy, CheckCircle2, AlertOctagon, TrendingUp, Sparkles, Activity } from 'lucide-react';
import { DriverLeaderboard } from '../Visualizations/DriverLeaderboard';
import { ConstructorTrajectory } from '../Visualizations/ConstructorTrajectory';
import { TyreStrategyAnalysis } from '../Visualizations/TyreStrategyAnalysis';
import { CircuitParticipation } from '../Visualizations/CircuitParticipation';
import { ReliabilityAnalysis } from '../Visualizations/ReliabilityAnalysis';
import { PodiumAchievements } from '../Visualizations/PodiumAchievements';

interface OverviewPageProps {
  startSeason: number;
  endSeason: number;
  selectedConstructor: string;
  selectedDriver: string;
  selectedCircuit: string;
  onSelectDriver: (driverId: string) => void;
  onSelectConstructor: (constructorId: string) => void;
  onSelectCircuit: (circuitId: string) => void;
  totalRaces: number;
  totalDrivers: number;
  totalConstructors: number;
  totalPoints: number;
  totalPodiums: number;
  completionRate: number;
  dnfRate: number;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({
  startSeason,
  endSeason,
  selectedConstructor,
  selectedDriver,
  selectedCircuit,
  onSelectDriver,
  onSelectConstructor,
  onSelectCircuit,
  totalRaces,
  totalDrivers,
  totalConstructors,
  totalPoints,
  totalPodiums,
  completionRate,
  dnfRate,
}) => {
  const kpis = [
    {
      label: 'TOTAL GRAND PRIX RACES',
      value: totalRaces.toLocaleString(),
      subtext: `${startSeason}–${endSeason} championship calendar`,
      icon: Flag,
      color: 'text-[#E10600]',
      borderColor: 'border-[#E10600]/30',
      badge: '334 total',
    },
    {
      label: 'TOTAL DRIVERS',
      value: totalDrivers.toString(),
      subtext: 'Official classified competitors',
      icon: Users,
      color: 'text-amber-400',
      borderColor: 'border-amber-500/20',
      badge: '84 across 17 seasons',
    },
    {
      label: 'TOTAL CONSTRUCTORS',
      value: totalConstructors.toString(),
      subtext: 'Factory & customer entrants',
      icon: Shield,
      color: 'text-cyan-400',
      borderColor: 'border-cyan-500/20',
      badge: '10 modern teams',
    },
    {
      label: 'CHAMPIONSHIP POINTS',
      value: Math.round(totalPoints).toLocaleString(),
      subtext: 'Official FIA awarded scale',
      icon: Award,
      color: 'text-red-400',
      borderColor: 'border-red-500/20',
      badge: 'Historical normalized',
    },
    {
      label: 'PODIUM FINISHES',
      value: totalPodiums.toLocaleString(),
      subtext: '1st, 2nd, and 3rd trophies',
      icon: Trophy,
      color: 'text-amber-400',
      borderColor: 'border-amber-500/20',
      badge: 'Top 3 classified',
    },
    {
      label: 'RACE COMPLETION RATE',
      value: `${completionRate.toFixed(1)}%`,
      subtext: `${(100 - completionRate).toFixed(1)}% retirement exposure`,
      icon: CheckCircle2,
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/20',
      badge: `${dnfRate.toFixed(1)}% DNF rate`,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Compact F1 Hero Section */}
      <div className="relative bg-[#0E1116] border border-[#1C222E] rounded-2xl p-5 overflow-hidden shadow-xl">
        {/* Abstract F1 Track Contour Graphic in background */}
        <div className="absolute right-0 top-0 bottom-0 w-96 opacity-15 pointer-events-none flex items-center justify-center">
          <svg viewBox="0 0 400 200" className="w-full h-full stroke-cyan-400 fill-none" strokeWidth="2">
            <path d="M 40 100 C 60 40, 140 20, 200 60 C 260 100, 320 30, 360 80 C 380 120, 320 180, 240 160 C 180 145, 120 180, 70 150 Z" />
            <circle cx="200" cy="60" r="4" className="fill-[#E10600]" />
            <circle cx="360" cy="80" r="4" className="fill-cyan-400" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#E10600] animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#939BA6] font-semibold">
                Apex Telemetry Engine • Season {startSeason}–{endSeason}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-['Titillium_Web',sans-serif] tracking-tight uppercase">
              FORMULA 1 <span className="text-[#939BA6] font-light">/</span> RACE INTELLIGENCE
            </h2>
            <p className="text-xs text-[#939BA6] mt-0.5 font-mono">
              Performance. Reliability. Strategy. • 6,464 Verified Classification Records across 17 Modern Seasons
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-lg bg-[#14171C] border border-[#222834] text-xs font-mono text-[#939BA6] flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>Grain: 1 row / driver start</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Premium KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className={`bg-[#14171C] border ${kpi.borderColor} rounded-xl p-3.5 flex flex-col justify-between hover:bg-[#1B2027] hover:border-neutral-500 transition-all group shadow-sm`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono tracking-wider uppercase text-[#939BA6]">
                  {kpi.label}
                </span>
                <Icon className={`w-3.5 h-3.5 ${kpi.color}`} />
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-black text-[#F4F5F7] font-mono tracking-tight">
                  {kpi.value}
                </div>
                <div className="text-[10px] text-[#939BA6] truncate mt-1">
                  {kpi.subtext}
                </div>
              </div>

              <div className="mt-2 pt-2 border-t border-[#1C222E] flex justify-between items-center text-[9px] font-mono text-[#939BA6]">
                <span>{kpi.badge}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 12-Column Main Analytics Grid */}
      <div className="space-y-6">
        {/* Row 1: A. Championship Trajectory & B. Driver Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <ConstructorTrajectory
              startSeason={startSeason}
              endSeason={endSeason}
              selectedConstructor={selectedConstructor}
            />
          </div>
          <div className="lg:col-span-5">
            <DriverLeaderboard
              selectedConstructor={selectedConstructor}
              selectedDriver={selectedDriver}
              onSelectDriver={onSelectDriver}
              startSeason={startSeason}
              endSeason={endSeason}
            />
          </div>
        </div>

        {/* Row 2: C. Reliability Monitor & D. Tyre Strategy Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6">
            <ReliabilityAnalysis
              selectedConstructor={selectedConstructor}
              selectedDriver={selectedDriver}
              startSeason={startSeason}
              endSeason={endSeason}
            />
          </div>
          <div className="lg:col-span-6">
            <TyreStrategyAnalysis />
          </div>
        </div>

        {/* Row 3: E. Global Circuit Intelligence & F. Podium Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <CircuitParticipation
              selectedCircuit={selectedCircuit}
              onSelectCircuit={onSelectCircuit}
              startSeason={startSeason}
              endSeason={endSeason}
            />
          </div>
          <div className="lg:col-span-5">
            <PodiumAchievements
              selectedConstructor={selectedConstructor}
              selectedDriver={selectedDriver}
              onSelectDriver={onSelectDriver}
              startSeason={startSeason}
              endSeason={endSeason}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
