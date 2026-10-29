import React, { useState } from 'react';
import { TrendingUp, Layers, Info, Check, ShieldAlert } from 'lucide-react';
import { CONSTRUCTOR_SEASON_TRAJECTORY, CONSTRUCTORS } from '../../data/f1Data';

interface ConstructorTrajectoryProps {
  startSeason: number;
  endSeason: number;
  selectedConstructor: string;
}

export const ConstructorTrajectory: React.FC<ConstructorTrajectoryProps> = ({
  startSeason,
  endSeason,
  selectedConstructor,
}) => {
  const [viewMode, setViewMode] = useState<'season' | 'cumulative'>('season');
  const [thirdTeamId, setThirdTeamId] = useState<string>('ferrari');
  const [hoveredPoint, setHoveredPoint] = useState<{
    season: number;
    teamName: string;
    points: number;
    cumulativePoints: number;
    wins: number;
    position: number;
    color: string;
  } | null>(null);

  // Teams to compare: Red Bull, Mercedes, and Selected/Third Team (Ferrari, McLaren, etc.)
  const activeTeamIds = Array.from(
    new Set([
      'red_bull',
      'mercedes',
      selectedConstructor !== 'all' ? selectedConstructor : thirdTeamId,
    ])
  );

  const seasonsInRange = Array.from(
    { length: endSeason - startSeason + 1 },
    (_, i) => startSeason + i
  );

  // Build points series per team
  const teamsData = activeTeamIds.map((teamId) => {
    const info = CONSTRUCTORS.find((c) => c.constructorId === teamId) || {
      name: teamId,
      color: '#FFFFFF',
    };

    // Calculate season points and running cumulative total
    let runningCumulative = 0;
    const trajectory = seasonsInRange.map((season) => {
      const entry = CONSTRUCTOR_SEASON_TRAJECTORY.find(
        (t) => t.season === season && t.constructorId === teamId
      );
      const points = entry ? entry.points : 0;
      runningCumulative += points;
      return {
        season,
        points,
        cumulativePoints: runningCumulative,
        wins: entry?.wins || 0,
        position: entry?.position || 10,
        podiums: entry?.podiums || 0,
      };
    });

    return {
      id: teamId,
      name: info.name,
      color: info.color,
      trajectory,
    };
  });

  // Calculate scales for SVG rendering
  const allValues = teamsData.flatMap((t) =>
    t.trajectory.map((p) => (viewMode === 'season' ? p.points : p.cumulativePoints))
  );
  const maxVal = Math.max(...allValues, 100);

  const svgWidth = 620;
  const svgHeight = 280;
  const padding = { top: 25, right: 30, bottom: 40, left: 55 };
  const graphWidth = svgWidth - padding.left - padding.right;
  const graphHeight = svgHeight - padding.top - padding.bottom;

  const getX = (index: number) => {
    if (seasonsInRange.length <= 1) return padding.left + graphWidth / 2;
    return padding.left + (index / (seasonsInRange.length - 1)) * graphWidth;
  };

  const getY = (val: number) => {
    return padding.top + graphHeight - (val / maxVal) * graphHeight;
  };

  // Regulatory Epoch markers
  const epochMarkers = [
    { season: 2014, label: 'V6 Turbo Hybrid', desc: 'Mercedes dominant powertrain' },
    { season: 2022, label: 'Ground Effect', desc: 'Red Bull aero mastery' },
  ].filter((m) => m.season >= startSeason && m.season <= endSeason);

  return (
    <div className="bg-[#12151B] border border-[#222731] rounded-xl p-5 shadow-lg flex flex-col h-full relative">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#1E232E]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-4 bg-[#E10600] rounded-sm" />
            <h3 className="font-extrabold text-white text-base tracking-wide font-['Titillium_Web',sans-serif] uppercase">
              Constructors Championship Trajectory
            </h3>
            <span className="text-[10px] font-mono uppercase bg-[#1A1F28] text-neutral-300 px-2 py-0.5 rounded border border-[#2B3240]">
              Tableau Worksheet 2
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            Multi-line points trajectory comparing Red Bull, Mercedes, and benchmark constructors
          </p>
        </div>

        {/* View Mode Toggle and 3rd Team Picker */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-[#0E1015] p-1 rounded-lg border border-[#252B37] text-xs">
            <button
              onClick={() => setViewMode('season')}
              className={`px-2.5 py-1 rounded font-medium transition-all ${
                viewMode === 'season'
                  ? 'bg-[#E10600] text-white shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Per Season
            </button>
            <button
              onClick={() => setViewMode('cumulative')}
              className={`px-2.5 py-1 rounded font-medium transition-all ${
                viewMode === 'cumulative'
                  ? 'bg-[#E10600] text-white shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Cumulative
            </button>
          </div>

          {/* Benchmark Team Dropdown */}
          <div className="flex items-center gap-1.5 bg-[#0E1015] px-2.5 py-1 rounded-lg border border-[#252B37]">
            <span className="text-[10px] uppercase font-semibold text-neutral-400">Compare:</span>
            <select
              value={selectedConstructor !== 'all' ? selectedConstructor : thirdTeamId}
              onChange={(e) => setThirdTeamId(e.target.value)}
              className="bg-transparent text-xs text-white focus:outline-none cursor-pointer"
            >
              {CONSTRUCTORS.filter((c) => c.constructorId !== 'red_bull' && c.constructorId !== 'mercedes').map((c) => (
                <option key={c.constructorId} value={c.constructorId} className="bg-[#12151B]">
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Team Legend */}
      <div className="flex items-center gap-4 mb-2 flex-wrap text-xs">
        {teamsData.map((t) => (
          <div key={t.id} className="flex items-center gap-2 font-mono">
            <span className="w-3.5 h-1.5 rounded-full" style={{ backgroundColor: t.color }} />
            <span className="text-white font-medium">{t.name}</span>
          </div>
        ))}
      </div>

      {/* SVG Interactive Multi-Line Chart */}
      <div className="relative flex-1 w-full min-h-[280px] bg-[#0A0D12] rounded-lg border border-[#1E232E] p-2 flex items-center justify-center">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-full overflow-visible"
        >
          {/* Y Axis Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
            const val = Math.round(maxVal * pct);
            const y = getY(val);
            return (
              <g key={pct}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={svgWidth - padding.right}
                  y2={y}
                  stroke="#1F2633"
                  strokeDasharray="3 3"
                />
                <text
                  x={padding.left - 8}
                  y={y + 4}
                  fill="#717E94"
                  fontSize="10"
                  textAnchor="end"
                  fontFamily="monospace"
                >
                  {val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val}
                </text>
              </g>
            );
          })}

          {/* Epoch Vertical Guides */}
          {epochMarkers.map((marker) => {
            const seasonIndex = seasonsInRange.indexOf(marker.season);
            if (seasonIndex === -1) return null;
            const x = getX(seasonIndex);
            return (
              <g key={marker.season}>
                <line
                  x1={x}
                  y1={padding.top}
                  x2={x}
                  y2={padding.top + graphHeight}
                  stroke="#E10600"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  opacity="0.6"
                />
                <text
                  x={x}
                  y={padding.top - 8}
                  fill="#FF4D5E"
                  fontSize="9"
                  fontWeight="bold"
                  textAnchor="middle"
                  fontFamily="sans-serif"
                >
                  {marker.label}
                </text>
              </g>
            );
          })}

          {/* X Axis Labels */}
          {seasonsInRange.map((season, idx) => {
            const x = getX(idx);
            // Skip every other label if many seasons
            const showLabel = seasonsInRange.length <= 10 || idx % 2 === 0 || idx === seasonsInRange.length - 1;
            return (
              <g key={season}>
                {showLabel && (
                  <text
                    x={x}
                    y={padding.top + graphHeight + 18}
                    fill="#8A96A8"
                    fontSize="10"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    '{String(season).slice(2)}
                  </text>
                )}
              </g>
            );
          })}

          {/* Polylines and Data Points for each team */}
          {teamsData.map((team) => {
            const pointsString = team.trajectory
              .map((pt, idx) => {
                const val = viewMode === 'season' ? pt.points : pt.cumulativePoints;
                return `${getX(idx)},${getY(val)}`;
              })
              .join(' ');

            return (
              <g key={team.id}>
                {/* Connecting Polyline */}
                <polyline
                  fill="none"
                  stroke={team.color}
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={pointsString}
                  opacity="0.9"
                />

                {/* Point Markers */}
                {team.trajectory.map((pt, idx) => {
                  const val = viewMode === 'season' ? pt.points : pt.cumulativePoints;
                  const cx = getX(idx);
                  const cy = getY(val);

                  return (
                    <circle
                      key={`${team.id}-${pt.season}`}
                      cx={cx}
                      cy={cy}
                      r="4"
                      fill={team.color}
                      stroke="#0A0D12"
                      strokeWidth="2"
                      className="cursor-pointer hover:r-6 transition-all"
                      onMouseEnter={() =>
                        setHoveredPoint({
                          season: pt.season,
                          teamName: team.name,
                          points: pt.points,
                          cumulativePoints: pt.cumulativePoints,
                          wins: pt.wins,
                          position: pt.position,
                          color: team.color,
                        })
                      }
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                  );
                })}
              </g>
            );
          })}
        </svg>

        {/* Hover Point Tooltip */}
        {hoveredPoint && (
          <div
            className="absolute top-4 right-4 bg-[#0F131C] border border-[#2B3240] p-2.5 rounded-lg shadow-2xl text-xs z-30 pointer-events-none"
            style={{ borderLeftColor: hoveredPoint.color, borderLeftWidth: '4px' }}
          >
            <div className="font-bold text-white flex items-center justify-between gap-3">
              <span>{hoveredPoint.teamName}</span>
              <span className="text-neutral-400 font-mono font-normal">Season {hoveredPoint.season}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-1.5 font-mono text-[11px] text-neutral-300">
              <div>
                Season Pts: <strong className="text-white">{hoveredPoint.points}</strong>
              </div>
              <div>
                WCC Finish: <strong className="text-amber-400">P{hoveredPoint.position}</strong>
              </div>
              <div>
                Race Wins: <strong className="text-emerald-400">{hoveredPoint.wins}</strong>
              </div>
              <div>
                Cumulative: <strong className="text-white">{hoveredPoint.cumulativePoints.toLocaleString()}</strong>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Analytical Callout */}
      <div className="mt-3 p-2 bg-[#161B23] rounded-lg border border-[#202735] text-[11px] text-neutral-300 flex items-start gap-2">
        <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p>
          <strong className="text-white">Championship Inflection Points:</strong> Notice the 2014 V6 Turbo-Hybrid introduction where Mercedes scored 701 pts (surpassing Red Bull by 296 pts). The 2022 Ground-Effect overhaul shifted aerodynamic supremacy back to Red Bull Racing (860 pts in 2023).
        </p>
      </div>
    </div>
  );
};
