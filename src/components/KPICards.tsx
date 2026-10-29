import React, { useState } from 'react';
import { Flag, Users, Shield, Trophy, Award, CheckCircle2, AlertOctagon, Info } from 'lucide-react';

interface KPICardsProps {
  totalRaces: number;
  totalDrivers: number;
  totalConstructors: number;
  totalPodiums: number;
  totalPoints: number;
  completionRate: number;
  dnfRate: number;
  activeSeasonLabel: string;
}

export const KPICards: React.FC<KPICardsProps> = ({
  totalRaces,
  totalDrivers,
  totalConstructors,
  totalPodiums,
  totalPoints,
  completionRate,
  dnfRate,
  activeSeasonLabel,
}) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const kpis = [
    {
      id: 'races',
      label: 'Grand Prix Races',
      value: totalRaces.toLocaleString(),
      subtext: `${activeSeasonLabel} calendar`,
      icon: Flag,
      color: 'text-red-500',
      borderColor: 'border-red-500/20',
      formula: 'COUNTD([Race Id])',
      definition: 'Total distinct Grand Prix championship rounds held within the selected temporal filter.',
    },
    {
      id: 'drivers',
      label: 'Drivers Represented',
      value: totalDrivers.toString(),
      subtext: 'Classified competitors',
      icon: Users,
      color: 'text-amber-400',
      borderColor: 'border-amber-500/20',
      formula: 'COUNTD([Driver Id])',
      definition: 'Total unique drivers who completed at least one qualifying session or official race start.',
    },
    {
      id: 'constructors',
      label: 'Constructors',
      value: totalConstructors.toString(),
      subtext: 'Factory & customer teams',
      icon: Shield,
      color: 'text-blue-400',
      borderColor: 'border-blue-500/20',
      formula: 'COUNTD([Constructor Id])',
      definition: 'Total registered chassis manufacturers/constructors scoring or competing across the epoch.',
    },
    {
      id: 'podiums',
      label: 'Podium Finishes',
      value: totalPodiums.toLocaleString(),
      subtext: 'Positions 1st, 2nd, 3rd',
      icon: Trophy,
      color: 'text-yellow-400',
      borderColor: 'border-yellow-500/20',
      formula: "SUM(IIF([Position Order] <= 3 AND [Status] = 'Finished', 1, 0))",
      definition: 'Cumulative classified top-3 trophy finishes awarded across all official championship races.',
    },
    {
      id: 'points',
      label: 'Championship Points',
      value: Math.round(totalPoints).toLocaleString(),
      subtext: 'Official FIA points',
      icon: Award,
      color: 'text-red-400',
      borderColor: 'border-red-500/20',
      formula: 'SUM([Points])',
      definition: 'Total championship points awarded, accounting for 2007–2009 (10-8-6...) and 2010+ (25-18-15...) scales.',
    },
    {
      id: 'completion',
      label: 'Race Completion Rate',
      value: `${completionRate.toFixed(1)}%`,
      subtext: 'Official classified finishes',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/20',
      formula: 'ZN(SUM(IIF([Is DNF] = FALSE, 1, 0))) / ZN(COUNT([Race Id])) * 100',
      definition: 'Percentage of official race starts where the driver took the checkered flag or was classified.',
    },
    {
      id: 'dnf',
      label: 'Overall DNF Rate',
      value: `${dnfRate.toFixed(1)}%`,
      subtext: 'Mechanical & accident non-finishes',
      icon: AlertOctagon,
      color: 'text-rose-400',
      borderColor: 'border-rose-500/20',
      formula: 'ZN(SUM(IIF([Is DNF] = TRUE, 1, 0))) / ZN(COUNT([Race Id])) * 100',
      definition: 'Percentage of race starts ending in retirement due to power unit, mechanical failure, or collision.',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 mb-6">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div
            key={kpi.id}
            className={`relative bg-[#12151B] border ${kpi.borderColor} rounded-lg p-3.5 flex flex-col justify-between hover:bg-[#181C24] transition-all group`}
            onMouseEnter={() => setActiveTooltip(kpi.id)}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-medium tracking-wide uppercase text-neutral-400 font-['Titillium_Web',sans-serif]">
                {kpi.label}
              </span>
              <div className="flex items-center gap-1">
                <Icon className={`w-3.5 h-3.5 ${kpi.color}`} />
                <button
                  type="button"
                  aria-label={`Definition for ${kpi.label}`}
                  className="text-neutral-500 hover:text-neutral-300"
                >
                  <Info className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight">
                {kpi.value}
              </div>
              <div className="text-[11px] text-neutral-400 truncate mt-0.5">
                {kpi.subtext}
              </div>
            </div>

            {/* Formula Tooltip popup on hover */}
            {activeTooltip === kpi.id && (
              <div className="absolute left-0 bottom-full mb-2 z-50 w-64 p-3 bg-[#0D1017] border border-[#2B3240] rounded-lg shadow-xl text-left pointer-events-none">
                <div className="text-xs font-semibold text-white mb-1 flex items-center justify-between">
                  <span>{kpi.label} KPI Definition</span>
                  <span className="text-[10px] text-red-400 font-mono">Tableau Calc</span>
                </div>
                <p className="text-[11px] text-neutral-300 leading-relaxed mb-2">
                  {kpi.definition}
                </p>
                <div className="bg-[#161B22] p-1.5 rounded border border-[#222731]">
                  <span className="text-[10px] font-mono text-emerald-400 block break-words">
                    {kpi.formula}
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
