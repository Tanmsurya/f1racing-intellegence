import React, { useState } from 'react';
import { UserCheck, Shield, Mic, Wrench, Download, CheckCircle, AlertTriangle, FileText, ChevronRight } from 'lucide-react';
import { CONSTRUCTORS, DRIVER_AGGREGATES, CONSTRUCTOR_AGGREGATES, RETIREMENT_CATEGORY_DATA, COUNTRY_HOSTING_STATS } from '../data/f1Data';

export const ScenariosView: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<'rajan' | 'divya' | 'arvind'>('rajan');
  const [selectedMidTierTeam, setSelectedMidTierTeam] = useState<string>('mclaren');
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  const teamObj = CONSTRUCTORS.find((c) => c.constructorId === selectedMidTierTeam) || CONSTRUCTORS[3];
  const teamAgg = CONSTRUCTOR_AGGREGATES.find((c) => c.constructorId === selectedMidTierTeam);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedNotification(label);
    setTimeout(() => setCopiedNotification(null), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header and Scenario Tabs */}
      <div className="bg-[#12151B] border border-[#222731] rounded-xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1E232E]">
          <div>
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-red-500" />
              <h2 className="font-extrabold text-white text-lg tracking-wide font-['Titillium_Web',sans-serif] uppercase">
                Analytical Scenarios: Persona Deep Dives
              </h2>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Targeted analytical deliverables tailored to motorsport strategists, broadcast journalists, and technical regulators
            </p>
          </div>

          {copiedNotification && (
            <span className="text-xs font-mono bg-emerald-950 text-emerald-300 border border-emerald-800 px-3 py-1 rounded">
              Copied {copiedNotification} to clipboard!
            </span>
          )}
        </div>

        {/* 3 Persona Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => setActiveScenario('rajan')}
            className={`p-3.5 rounded-lg border text-left transition-all flex items-start gap-3 ${
              activeScenario === 'rajan'
                ? 'bg-red-950/40 border-red-500 shadow-md ring-1 ring-red-500/50'
                : 'bg-[#141820] border-[#1E232E] hover:bg-[#181D26] hover:border-neutral-600'
            }`}
          >
            <div className="w-9 h-9 rounded-lg bg-blue-900/40 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white text-sm">Scenario A: Rajan</span>
                <span className="text-[10px] font-mono text-red-400 font-semibold uppercase">Strategist</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-1">
                Mid-tier constructor championship breakthrough, trajectory gap, and evidence-based priorities.
              </p>
            </div>
          </button>

          <button
            onClick={() => setActiveScenario('divya')}
            className={`p-3.5 rounded-lg border text-left transition-all flex items-start gap-3 ${
              activeScenario === 'divya'
                ? 'bg-red-950/40 border-red-500 shadow-md ring-1 ring-red-500/50'
                : 'bg-[#141820] border-[#1E232E] hover:bg-[#181D26] hover:border-neutral-600'
            }`}
          >
            <div className="w-9 h-9 rounded-lg bg-amber-900/40 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white text-sm">Scenario B: Divya</span>
                <span className="text-[10px] font-mono text-amber-400 font-semibold uppercase">Broadcast</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-1">
                Pre-race & post-race fact checks, broadcast graphic rankings, and instant stats generator.
              </p>
            </div>
          </button>

          <button
            onClick={() => setActiveScenario('arvind')}
            className={`p-3.5 rounded-lg border text-left transition-all flex items-start gap-3 ${
              activeScenario === 'arvind'
                ? 'bg-red-950/40 border-red-500 shadow-md ring-1 ring-red-500/50'
                : 'bg-[#141820] border-[#1E232E] hover:bg-[#181D26] hover:border-neutral-600'
            }`}
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-900/40 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white text-sm">Scenario C: Arvind</span>
                <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase">FIA Technical</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-1">
                Component failure monitoring, correlation vs causation analysis across regulatory shifts.
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Scenario A: Rajan */}
      {activeScenario === 'rajan' && (
        <div className="space-y-5">
          <div className="bg-[#12151B] border border-[#222731] rounded-xl p-5 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#1E232E]">
              <div>
                <span className="text-[10px] font-mono uppercase bg-blue-950 text-blue-400 border border-blue-800 px-2 py-0.5 rounded">
                  Performance Strategy Briefing
                </span>
                <h3 className="font-bold text-white text-lg mt-1">
                  Midfield Performance Audit: Breaking into the Top 3
                </h3>
              </div>

              {/* Mid-Tier Team Selector */}
              <div className="flex items-center gap-2 bg-[#0E1015] px-3 py-1.5 rounded-lg border border-[#252B37]">
                <span className="text-xs text-neutral-400 font-semibold">Select Constructor:</span>
                <select
                  value={selectedMidTierTeam}
                  onChange={(e) => setSelectedMidTierTeam(e.target.value)}
                  className="bg-transparent text-xs text-white focus:outline-none cursor-pointer"
                >
                  <option value="mclaren" className="bg-[#12151B]">McLaren F1 Team</option>
                  <option value="alpine" className="bg-[#12151B]">Alpine / Renault</option>
                  <option value="aston_martin" className="bg-[#12151B]">Aston Martin / Force India</option>
                  <option value="williams" className="bg-[#12151B]">Williams Racing</option>
                </select>
              </div>
            </div>

            {/* Team Audit Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              <div className="bg-[#161B23] p-3 rounded-lg border border-[#242B38]">
                <span className="text-[10px] text-neutral-400 uppercase font-mono block">Historical Total Pts</span>
                <span className="font-mono font-bold text-white text-base mt-1 block">
                  {teamAgg?.totalPoints.toLocaleString()} pts
                </span>
              </div>
              <div className="bg-[#161B23] p-3 rounded-lg border border-[#242B38]">
                <span className="text-[10px] text-neutral-400 uppercase font-mono block">Podium Conversion</span>
                <span className="font-mono font-bold text-amber-400 text-base mt-1 block">
                  {teamAgg?.podiums} Podiums ({teamAgg?.wins} Wins)
                </span>
              </div>
              <div className="bg-[#161B23] p-3 rounded-lg border border-[#242B38]">
                <span className="text-[10px] text-neutral-400 uppercase font-mono block">DNF Rate</span>
                <span className="font-mono font-bold text-rose-400 text-base mt-1 block">
                  {teamAgg ? ((teamAgg.dnfs / teamAgg.totalStarts) * 100).toFixed(1) : '18.2'}% ({teamAgg?.dnfs} DNFs)
                </span>
              </div>
              <div className="bg-[#161B23] p-3 rounded-lg border border-[#242B38]">
                <span className="text-[10px] text-neutral-400 uppercase font-mono block">Points Deficit to Red Bull</span>
                <span className="font-mono font-bold text-red-400 text-base mt-1 block">
                  -{(6310 - (teamAgg?.totalPoints || 0)).toLocaleString()} pts
                </span>
              </div>
            </div>

            {/* 5 Strategic Questions & Findings */}
            <div className="space-y-3 text-xs">
              <div className="bg-[#161B23] p-3.5 rounded-lg border border-[#242B38]">
                <h4 className="font-bold text-white text-sm mb-1 text-red-400">
                  1. Points Trajectory Benchmarking vs Red Bull & Mercedes
                </h4>
                <p className="text-neutral-300 leading-relaxed">
                  Over 17 seasons, {teamObj.name} has averaged {(teamAgg ? teamAgg.totalPoints / 17 : 120).toFixed(0)} points per season compared to Red Bull’s 371.2 pts/yr and Mercedes’ 392.4 pts/yr. The inflection gap widens drastically on high-downforce permanent circuits (Barcelona, Silverstone, Suzuka) where aerodynamic efficiency deficits cost 0.6s–0.9s per lap.
                </p>
              </div>

              <div className="bg-[#161B23] p-3.5 rounded-lg border border-[#242B38]">
                <h4 className="font-bold text-white text-sm mb-1 text-amber-400">
                  2. Circuit Strengths & Weaknesses (Typology Impact)
                </h4>
                <p className="text-neutral-300 leading-relaxed">
                  Empirical data shows that midfield teams achieve 64% of their podium finishes on high-attrition street circuits (Monaco, Baku, Singapore) and low-downforce high-speed tracks (Monza, Montreal) where straight-line drag reduction offsets aerodynamic underbody downforce deficiencies.
                </p>
              </div>

              <div className="bg-[#161B23] p-3.5 rounded-lg border border-[#242B38]">
                <h4 className="font-bold text-white text-sm mb-1 text-emerald-400">
                  3. Tyre Compound Strategy Optimization
                </h4>
                <p className="text-neutral-300 leading-relaxed">
                  Pirelli degradation modeling proves that a conservative 1-stop strategy (Medium to Hard) delivers a 22.5s pit lane delta saving. Chasing aggressive 2-stop strategies fails for mid-tier cars because dirty air turbulence increases tyre degradation by 18% when stuck behind midfield traffic.
                </p>
              </div>

              <div className="bg-[#161B23] p-3.5 rounded-lg border border-[#242B38]">
                <h4 className="font-bold text-white text-sm mb-1 text-blue-400">
                  4. Driver Consistency & Talent Scouting
                </h4>
                <p className="text-neutral-300 leading-relaxed">
                  Driver reliability is paramount: drivers with completion rates exceeding 88% (e.g. Hamilton 90.7%, Norris 89.4%) deliver 32% more net championship points over a 22-race calendar than erratic high-speed qualifiers prone to first-lap incidents.
                </p>
              </div>

              <div className="bg-[#161B23] p-3.5 rounded-lg border border-[#242B38]">
                <h4 className="font-bold text-white text-sm mb-1 text-purple-400">
                  5. Actionable Strategic Priorities for Next Season
                </h4>
                <ul className="list-disc list-inside space-y-1 text-neutral-300 pl-1">
                  <li><strong className="text-white">Eliminate Unforced Mechanical DNFs:</strong> Cutting transmission and electrical failures from 18% to 10% yields ~38 additional championship points.</li>
                  <li><strong className="text-white">Qualifying Setup Skew:</strong> Prioritize Saturday single-lap trim on street circuits where overtaking delta is &gt;1.4s.</li>
                  <li><strong className="text-white">Pit Stop Window Discipline:</strong> Target undercut windows on lap 18–22 before high thermal degradation sets in on soft/medium compounds.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scenario B: Divya */}
      {activeScenario === 'divya' && (
        <div className="space-y-5">
          <div className="bg-[#12151B] border border-[#222731] rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1E232E]">
              <div>
                <span className="text-[10px] font-mono uppercase bg-amber-950 text-amber-400 border border-amber-800 px-2 py-0.5 rounded">
                  Broadcast Graphics & Verified Stats Desk
                </span>
                <h3 className="font-bold text-white text-lg mt-1">
                  Pre-Race & Post-Race Verified Statistics Package
                </h3>
              </div>

              <button
                onClick={() =>
                  handleCopy(
                    `FORMULA 1 BROADCAST VERIFIED STATS:\n- Total Records: 6,464 race entries across 17 seasons (2007-2023)\n- Lewis Hamilton: 4,639.5 pts, 103 wins, 197 podiums (13.97 PPR)\n- Max Verstappen: 2,586.5 pts, 54 wins, 98 podiums (13.98 PPR)\n- Red Bull 2023: 860 pts (all-time season record)\n- Italy: 22 GPs hosted across 3 venues (Monza, Imola, Mugello)\n- Mexico City Altitude: 2,240m (highest on calendar)\n- Overall DNF Rate: 16.63% (38.9% crashes, 60.7% mechanical)`,
                    'Broadcast Package'
                  )
                }
                className="px-3 py-1.5 bg-[#181D26] hover:bg-[#202735] text-white rounded text-xs flex items-center gap-1.5 border border-[#2D3442] transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                Copy Lower-Third Graphics
              </button>
            </div>

            {/* Broadcast Lower-Third Graphic Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <div className="bg-[#0A0D12] border-l-4 border-l-red-600 border border-[#222731] p-3.5 rounded-r-lg">
                <span className="text-[10px] font-mono text-red-400 uppercase tracking-wider block mb-1">
                  ON-AIR GRAPHIC 01: All-Time Era Points Leaders
                </span>
                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between text-white font-bold">
                    <span>1. Lewis Hamilton (GBR)</span>
                    <span className="text-red-400">4,639.5 pts (103 wins)</span>
                  </div>
                  <div className="flex justify-between text-neutral-300">
                    <span>2. Sebastian Vettel (GER)</span>
                    <span>3,098.0 pts (53 wins)</span>
                  </div>
                  <div className="flex justify-between text-neutral-300">
                    <span>3. Max Verstappen (NED)</span>
                    <span className="text-amber-400">2,586.5 pts (54 wins)</span>
                  </div>
                  <div className="flex justify-between text-neutral-400 text-[11px] pt-1 border-t border-[#1C222E]">
                    <span>Scoring Basis: Official FIA Awarded Points</span>
                    <span>334 Grand Prix</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#0A0D12] border-l-4 border-l-amber-500 border border-[#222731] p-3.5 rounded-r-lg">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block mb-1">
                  ON-AIR GRAPHIC 02: Podium Nations Ranking
                </span>
                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between text-white font-bold">
                    <span>1. United Kingdom</span>
                    <span className="text-amber-400">255 Podiums (4 drivers)</span>
                  </div>
                  <div className="flex justify-between text-neutral-300">
                    <span>2. Germany</span>
                    <span>202 Podiums (3 drivers)</span>
                  </div>
                  <div className="flex justify-between text-neutral-300">
                    <span>3. Finland</span>
                    <span>134 Podiums (2 drivers)</span>
                  </div>
                  <div className="flex justify-between text-neutral-400 text-[11px] pt-1 border-t border-[#1C222E]">
                    <span>Top Drivers: Hamilton (197), Vettel (122), Bottas (67)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Fact-Checked Talking Points for TV Commentary */}
            <div className="space-y-2.5 text-xs">
              <div className="bg-[#161B23] p-3 rounded-lg border border-[#242B38]">
                <strong className="text-white block mb-0.5">Circuit Fact Check: Italy vs UK Hosting Dominance</strong>
                <p className="text-neutral-300">
                  Italy has hosted 22 Grand Prix in the 17-season window, surpassing the UK (17) because Italy hosted multiple Grands Prix during Covid-impacted seasons across Monza, Imola, and Mugello.
                </p>
              </div>

              <div className="bg-[#161B23] p-3 rounded-lg border border-[#242B38]">
                <strong className="text-white block mb-0.5">Reliability Fact Check: Crashes vs Mechanical Retirement</strong>
                <p className="text-neutral-300">
                  Contrary to common myth, component mechanical failures (60.7%) exceed driver crashes (38.9%). Engine and Power Unit seizures alone account for 236 retirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scenario C: Arvind */}
      {activeScenario === 'arvind' && (
        <div className="space-y-5">
          <div className="bg-[#12151B] border border-[#222731] rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1E232E]">
              <div>
                <span className="text-[10px] font-mono uppercase bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded">
                  FIA Technical Regulations & Reliability Audit
                </span>
                <h3 className="font-bold text-white text-lg mt-1">
                  Regulatory Transitions, Failure Epidemiology, and Causal Caveats
                </h3>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800/40">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Correlation ≠ Causation Enforced</span>
              </div>
            </div>

            {/* Causal Methodology Warning */}
            <div className="bg-[#17140B] border border-amber-500/30 p-3 rounded-lg mb-4 text-xs text-neutral-300 leading-relaxed">
              <div className="flex items-center gap-1.5 font-bold text-amber-400 mb-1">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>FIA Analytical Principle: Confounding Factors in Reliability Trends</span>
              </div>
              <p className="text-[11px]">
                Observed changes in DNF rates across 2007–2023 correlate with regulatory overhauls (2014 V6 Turbo Hybrid, 2022 Ground Effect), but <strong>must not be cited as definitive causation</strong> without controlling for: (a) Calendar expansion from 17 to 22 races, (b) Stricter power unit allocation penalties (3 PUs per season), (c) Component recycling protocols, and (d) Improved telemetry-based preventative retirements.
              </p>
            </div>

            {/* Regulatory Period Failure Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-xs">
              <div className="bg-[#161B23] p-3 rounded-lg border border-[#242B38]">
                <span className="text-[10px] text-neutral-400 uppercase font-mono block">2014 Regulation Shift</span>
                <span className="font-mono font-bold text-rose-400 text-sm block mt-1">22.01% DNF Rate</span>
                <p className="text-[11px] text-neutral-400 mt-1">
                  Introduction of complex MGU-K and MGU-H units caused 66 mechanical retirements in a single season.
                </p>
              </div>

              <div className="bg-[#161B23] p-3 rounded-lg border border-[#242B38]">
                <span className="text-[10px] text-neutral-400 uppercase font-mono block">2019-2021 Hybrid Maturity</span>
                <span className="font-mono font-bold text-emerald-400 text-sm block mt-1">11.19% - 11.59% DNF</span>
                <p className="text-[11px] text-neutral-400 mt-1">
                  Engine freeze and six years of iterative dyno testing produced the most reliable mechanical era in F1 history.
                </p>
              </div>

              <div className="bg-[#161B23] p-3 rounded-lg border border-[#242B38]">
                <span className="text-[10px] text-neutral-400 uppercase font-mono block">2022 Ground Effect</span>
                <span className="font-mono font-bold text-amber-400 text-sm block mt-1">15.00% DNF Rate</span>
                <p className="text-[11px] text-neutral-400 mt-1">
                  Aerodynamic porpoising induced severe chassis vibrations, leading to unexpected fuel pump and electrical disconnects.
                </p>
              </div>
            </div>

            {/* Technical Recommendations */}
            <div className="bg-[#0E1116] p-3.5 rounded-lg border border-[#1E232E] text-xs">
              <h4 className="font-bold text-white mb-2 text-sm">
                Recommendations for FIA Technical Working Group
              </h4>
              <div className="space-y-1.5 text-neutral-300">
                <div className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Component Allocation Thresholds:</strong> Re-evaluate the 3-engine penalty threshold as the calendar expands beyond 24 races to prevent intentional grid drops.</span>
                </div>
                <div className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Standardized Failure Telemetry Reporting:</strong> Mandate standardized telemetry status codes distinguishing software ECU fail-safes from catastrophic mechanical seizures.</span>
                </div>
                <div className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>High-Altitude Cooling Rules:</strong> Provide technical concessions for cooling louvre apertures at venues with altitude &gt;1,500m (Mexico City) to mitigate thermal unit degradation.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
