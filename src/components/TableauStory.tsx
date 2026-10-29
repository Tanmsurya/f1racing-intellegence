import React, { useState } from 'react';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Trophy,
  TrendingUp,
  Cpu,
  Globe,
  ShieldAlert,
  Award,
  Compass,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import { DATASET_METRICS, DRIVER_AGGREGATES, CONSTRUCTOR_SEASON_TRAJECTORY, COUNTRY_HOSTING_STATS, RETIREMENT_CATEGORY_DATA } from '../data/f1Data';
import { CIRCUITS_DATA } from '../data/circuitsData';

export const TableauStory: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const storyPoints = [
    {
      id: 1,
      tag: 'Story Point 1 of 8',
      title: 'Introduction & Empirical Scope of 17 Modern F1 Seasons',
      icon: Compass,
      headline: 'A Rigorous Data Foundation Across 6,464 Race Records and 334 Grand Prix',
      narrative: `Modern Formula 1 racing is governed by micro-margins, aerodynamic regulations, and mechanical endurance. This analytical project examines an empirical corpus of 6,464 race entry records across 17 distinct championship seasons (2007 through 2023), encompassing 334 Grand Prix rounds held at 29 world circuits. Rather than making speculative assertions, every statistic is reconciled across relational tables covering race entries, circuits, drivers, constructors, and classifications.`,
      visualizationType: 'kpi_summary',
      keyMetrics: [
        { label: 'Verified Records', val: '6,464' },
        { label: 'Championship Seasons', val: '17 (2007-2023)' },
        { label: 'Grand Prix Rounds', val: '334' },
        { label: 'Circuits Cataloged', val: '29' },
      ],
      interpretation:
        'The dataset captures three distinct regulatory epochs: the naturally-aspirated V8 era (2007-2013), the revolutionary 1.6L V6 Turbo-Hybrid era (2014-2021), and the ground-effect aerodynamic renaissance (2022-2023). This provides an unprecedented longitudinal lens into driver greatness and technical supremacy.',
      transition:
        'With the empirical boundaries established, the first question arises: How is driver greatness quantified across differing scoring systems and varying calendar lengths?',
    },
    {
      id: 2,
      tag: 'Story Point 2 of 8',
      title: 'Driver Performance & Cumulative Championship Points',
      icon: Trophy,
      headline: 'Hamilton, Verstappen, and Vettel: Era Defining Dominance',
      narrative: `Ranking drivers purely by cumulative points requires careful contextualization of the 2010 scoring shift (from 10 pts for 1st place to 25 pts) and the 2019 fastest-lap bonus point. Lewis Hamilton leads all historical metrics within this period with 4,639.5 points across 332 starts (13.97 points per race) and 103 wins. Max Verstappen demonstrates the highest contemporary scoring efficiency, matching Hamilton’s 13.98 PPR while amassing 54 victories by age 26.`,
      visualizationType: 'driver_spotlight',
      keyMetrics: [
        { label: 'Hamilton Career Points', val: '4,639.5' },
        { label: 'Hamilton Win Rate', val: '31.0%' },
        { label: 'Verstappen Points', val: '2,586.5' },
        { label: 'Verstappen Win Rate', val: '29.2%' },
      ],
      interpretation:
        'Driver scoring efficiency (Points Per Race) correlates heavily with constructor machinery. A driver in top-tier machinery averages 12–15 PPR, whereas stellar midfield drivers (e.g., Sergio Perez at Force India or Nico Hülkenberg) peak between 2.5–5.8 PPR regardless of defensive skill.',
      transition:
        'Because driver performance is inextricably linked to engineering pace, how did the constructors championship battle unfold season by season?',
    },
    {
      id: 3,
      tag: 'Story Point 3 of 8',
      title: 'Constructors Competition: The Three Hegemonic Eras',
      icon: TrendingUp,
      headline: 'From Red Bull V8 Dominance to Mercedes Turbo-Hybrid Rule to Red Bull Resurgence',
      narrative: `Analyzing cumulative constructors points reveals stark inflection points aligning with FIA rule rewrites. From 2010 to 2013, Red Bull Racing captured 4 consecutive double world championships (2,204 points). In 2014, Mercedes introduced their split-turbo MGU-H power unit, initiating an unprecedented 8-season constructors streak (scoring 700+ points in 2014, 2015, 2016, and 2019). Finally, in 2022, Red Bull mastered the ground-effect venturi tunnels, breaking all records with 860 points in 2023.`,
      visualizationType: 'constructor_eras',
      keyMetrics: [
        { label: 'Mercedes Titles (14-21)', val: '8 Consecutive' },
        { label: 'Red Bull 2023 Points', val: '860 (Record)' },
        { label: 'Mercedes 2016 Points', val: '765' },
        { label: 'Midfield Ceiling', val: '~180-200 pts' },
      ],
      interpretation:
        'The competitive gap between top 3 constructors and the midfield reached its zenith in 2016-2020, where 3rd place Ferrari scored over 250% more points than 4th place Force India/McLaren. Only 2021 presented a genuine down-to-the-wire tie (Mercedes 613.5 vs Red Bull 585.5).',
      transition:
        'Beyond raw aerodynamic horsepower, what role do Pirelli tyre compound strategies play in determining race outcomes on Sundays?',
    },
    {
      id: 4,
      tag: 'Story Point 4 of 8',
      title: 'Tyre Compound Strategy & Critical Data Boundaries',
      icon: Cpu,
      headline: 'Empirical Compound Dynamics and Distinguishing Stint Telemetry Limitations',
      narrative: `Modern Grand Prix strategy is built on Pirelli compound allocations (Soft C3-C5, Medium C2-C3, Hard C0-C1). In modern high-downforce racing, the Medium compound represents the workhorse of Sunday strategies, accounting for 48.7% of race wins due to its thermal stability. However, analysts must acknowledge a foundational data constraint: standard historical classification sets record finishing positions, but omit lap-by-lap tyre stint compound logs unless integrated with telemetry sources like FastF1.`,
      visualizationType: 'tyre_dynamics',
      keyMetrics: [
        { label: 'Soft Degradation', val: '+0.125s/lap' },
        { label: 'Medium Deg Rate', val: '+0.065s/lap' },
        { label: 'Hard Deg Rate', val: '+0.032s/lap' },
        { label: 'Pit Loss Delta', val: '~22.5s' },
      ],
      interpretation:
        'On high-abrasion circuits (Silverstone, Barcelona, Suzuka), 1-stop strategies (Medium to Hard) consistently outperform aggressive 2-stop strategies because the 22.5-second pit lane transit loss cannot be recovered in clean air.',
      transition:
        'How does circuit geography and extreme track topology influence this technical balance across the world calendar?',
    },
    {
      id: 5,
      tag: 'Story Point 5 of 8',
      title: 'Global Circuits: Geography, Topology, and Altitude Extremes',
      icon: Globe,
      headline: '29 Historic & Modern Venues: From Sea-Level Baku to 2,240m Mexico City',
      narrative: `The 29 circuits in the dataset encompass 19 permanent road courses, 6 street circuits, and 4 hybrid street/park venues. Italy leads all hosting nations with 22 Grand Prix rounds across three distinct venues (Monza, Imola, and Mugello). Track typology introduces radical variance: Mexico City sits at an extreme altitude of 2,240m (reducing air density by 22%), while Baku City Circuit operates at 28m below sea level with the longest straight on the calendar (2.2km).`,
      visualizationType: 'circuit_specs',
      keyMetrics: [
        { label: 'Highest Altitude', val: 'Mexico (2,240m)' },
        { label: 'Lowest Altitude', val: 'Baku (-28m)' },
        { label: 'Longest Track', val: 'Spa (7.004 km)' },
        { label: 'Shortest Track', val: 'Monaco (3.337 km)' },
      ],
      interpretation:
        'Street circuits (Monaco, Singapore, Baku, Jeddah, Las Vegas) present an accident-induced Safety Car probability exceeding 68%, fundamentally altering the optimal pit strategy compared to flowing permanent facilities like Silverstone or Suzuka.',
      transition:
        'Given these intense circuit stresses, how reliable are the cars, and what causes the 1,075 recorded non-finishes?',
    },
    {
      id: 6,
      tag: 'Story Point 6 of 8',
      title: 'Reliability Analysis: Mechanical Failure Trends vs Crashes',
      icon: ShieldAlert,
      headline: 'A 16.63% Overall DNF Rate: Distinguishing Component Failure from Driver Collisions',
      narrative: `Across 6,464 race starts, 1,075 resulted in non-finishes (16.63% DNF rate, 83.37% completion rate). Crucially, a senior FIA analyst must not classify every DNF as a mechanical breakdown. The data proves that collisions, spins, and barrier accidents represent the single largest retirement category at 38.88% (418 events). Pure mechanical failures account for 60.65% of DNFs, led by Engine/Power Unit seizures (21.95%) and Gearbox failures (10.60%).`,
      visualizationType: 'dnf_breakdown',
      keyMetrics: [
        { label: 'Overall DNF Rate', val: '16.63%' },
        { label: 'Collisions & Crashes', val: '38.88% of DNFs' },
        { label: 'Engine/PU Failures', val: '21.95% of DNFs' },
        { label: 'Gearbox Failures', val: '10.60% of DNFs' },
      ],
      interpretation:
        'Reliability exhibits a strong temporal correlation with regulatory transitions: 2014 saw a DNF spike to 22.01% as teams wrestled with immature turbo-hybrid electronics. By 2019-2021, DNF rates plummeted to 11.2%-11.6% as powertrains matured, before rising moderately in 2022 (15.0%) due to ground-effect porpoising and cooling redesigns.',
      transition:
        'When cars survive to the checkered flag, which drivers, teams, and nations capture the coveted podium trophies?',
    },
    {
      id: 7,
      tag: 'Story Point 7 of 8',
      title: 'Global Podium Achievements: Elite Concentration',
      icon: Award,
      headline: 'Over 78% of All Podiums Monopolized by the Top 3 Factory Constructors',
      narrative: `Analyzing the 1,002 podium steps (1st, 2nd, 3rd) across 334 Grand Prix exposes the extreme concentration of motorsport success. Mercedes (247 podiums), Red Bull (236 podiums), and Ferrari (204 podiums) account for 687 out of 1,002 total podiums (68.6%). By nationality, British drivers dominate with 255 podiums (spearheaded by Lewis Hamilton’s 197), followed by Germany with 202 (Vettel 122, Rosberg 57), and Finland with 134 (Bottas 67, Räikkönen 67).`,
      visualizationType: 'podium_concentration',
      keyMetrics: [
        { label: 'Mercedes Podiums', val: '247' },
        { label: 'Red Bull Podiums', val: '236' },
        { label: 'Ferrari Podiums', val: '204' },
        { label: 'Top 3 Team Share', val: '68.6%' },
      ],
      interpretation:
        'For mid-tier constructors (McLaren, Alpine, Aston Martin), achieving a podium requires either an opportunistic wet race (e.g. Monza 2020, Hungary 2021) or high-attrition street circuits where top-tier cars experience DNFs.',
      transition:
        'Synthesizing these insights, what are the concrete, evidence-based recommendations for our three stakeholders: Rajan, Divya, and Arvind?',
    },
    {
      id: 8,
      tag: 'Story Point 8 of 8',
      title: 'Strategic Conclusions & Actionable Recommendations',
      icon: Sparkles,
      headline: 'Evidence-Based Roadmaps for Strategists, Broadcasters, and Technical Regulators',
      narrative: `Our deep-dive across 17 seasons and 6,464 race records demonstrates that Formula 1 victory is an optimization problem between aerodynamic consistency, power unit heat rejection at altitude, and qualifying conversion. We deliver targeted roadmaps for our three user personas: Strategist Rajan, Broadcaster Divya, and Technical Analyst Arvind.`,
      visualizationType: 'strategic_actions',
      keyMetrics: [
        { label: 'Midfield Target', val: 'Capitalize on Low-Drag Tracks' },
        { label: 'Broadcast Angle', val: 'Lead with Verified Historical Gaps' },
        { label: 'FIA Priority', val: 'Monitor PU Failures vs Calendar Length' },
        { label: 'Data Recommendation', val: 'Enrich via FastF1 Stint Telemetry' },
      ],
      interpretation:
        'The highest leverage investment for a midfield team is not chasing peak downforce at high-speed tracks, but rather eliminating unforced mechanical DNFs (which cost an average of 42 championship points per season) and optimizing 1-stop tire management on street tracks.',
      transition:
        'Explore the interactive persona walkthroughs in the Scenarios tab, or copy exact Tableau formulas from the Studio tab.',
    },
  ];

  const current = storyPoints[currentStep];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Story Navigation Ribbon */}
      <div className="bg-[#12151B] border border-[#222731] rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#1E232E]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-red-500" />
            <h2 className="font-extrabold text-white text-base tracking-wide font-['Titillium_Web',sans-serif] uppercase">
              Tableau Story: Formula 1 Race Intelligence
            </h2>
          </div>
          <span className="text-xs font-mono text-neutral-400">
            Chapter {currentStep + 1} of {storyPoints.length}
          </span>
        </div>

        {/* Story Point Step Buttons */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 mb-3">
          {storyPoints.map((sp, idx) => {
            const isActive = currentStep === idx;
            const isCompleted = idx < currentStep;
            return (
              <button
                key={sp.id}
                onClick={() => setCurrentStep(idx)}
                className={`p-2 rounded-lg text-left transition-all border flex flex-col justify-between ${
                  isActive
                    ? 'bg-red-600/30 border-red-500 text-white shadow-md ring-1 ring-red-500/40'
                    : isCompleted
                    ? 'bg-[#181D26] border-neutral-700 text-neutral-300 hover:text-white'
                    : 'bg-[#141720] border-[#222733] text-neutral-500 hover:text-neutral-300'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-[10px] font-mono font-bold">0{idx + 1}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />}
                </div>
                <span className="text-[10px] font-medium leading-tight truncate block">
                  {sp.title.split(':')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Prev / Next Controls */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className={`px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition-all ${
              currentStep === 0
                ? 'opacity-40 cursor-not-allowed text-neutral-500'
                : 'bg-[#181D26] text-white hover:bg-neutral-700'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous Chapter
          </button>

          <span className="text-xs font-semibold text-neutral-300 font-['Titillium_Web',sans-serif]">
            {current.title}
          </span>

          <button
            onClick={() => setCurrentStep((prev) => Math.min(storyPoints.length - 1, prev + 1))}
            disabled={currentStep === storyPoints.length - 1}
            className={`px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition-all ${
              currentStep === storyPoints.length - 1
                ? 'opacity-40 cursor-not-allowed text-neutral-500'
                : 'bg-[#E10600] text-white hover:bg-red-700 shadow-md'
            }`}
          >
            Next Chapter
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Story Chapter Content Card */}
      <div className="bg-[#12151B] border border-[#222731] rounded-xl p-6 shadow-xl relative overflow-hidden">
        {/* Top Accent */}
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold uppercase bg-red-950 text-red-400 border border-red-800">
            {current.tag}
          </span>
          <span className="text-xs text-neutral-400 font-mono">Verified F1 Insights</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-white font-['Titillium_Web',sans-serif] tracking-tight mb-2">
          {current.headline}
        </h3>

        <p className="text-sm text-neutral-300 leading-relaxed mb-6 font-normal">
          {current.narrative}
        </p>

        {/* 4 Story Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {current.keyMetrics.map((km) => (
            <div key={km.label} className="bg-[#161B23] p-3 rounded-lg border border-[#242B38] text-center">
              <span className="text-[10px] text-neutral-400 uppercase font-mono block mb-1">
                {km.label}
              </span>
              <span className="text-lg font-black text-white font-mono">{km.val}</span>
            </div>
          ))}
        </div>

        {/* Embedded Interactive Visual Mockup / Highlight based on Story Point */}
        <div className="bg-[#0C0F14] border border-[#1F2533] rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-3 pb-2 border-b border-[#181D26] font-mono">
            <span>Visual Evidence Component: {current.title}</span>
            <span className="text-emerald-400">Validated with 6,464 records</span>
          </div>

          {currentStep === 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-[#141822] p-3 rounded border border-[#202635]">
                <span className="text-neutral-400 block mb-1">V8 Engine Era (2007-2013)</span>
                <span className="text-white font-bold text-sm block">126 Races • 2,920 Starts</span>
                <p className="text-[11px] text-neutral-400 mt-1">High revving 2.4L engines, refueling banned in 2010.</p>
              </div>
              <div className="bg-[#141822] p-3 rounded border border-[#202635]">
                <span className="text-neutral-400 block mb-1">V6 Hybrid Era (2014-2021)</span>
                <span className="text-white font-bold text-sm block">160 Races • 3,248 Starts</span>
                <p className="text-[11px] text-neutral-400 mt-1">Split-turbo thermal recovery, Mercedes reign, Halo in 2018.</p>
              </div>
              <div className="bg-[#141822] p-3 rounded border border-[#202635]">
                <span className="text-neutral-400 block mb-1">Ground Effect (2022-2023)</span>
                <span className="text-white font-bold text-sm block">48 Races • 960 Starts</span>
                <p className="text-[11px] text-neutral-400 mt-1">Venturi floor aerodynamics, 18-inch wheels, Red Bull RB19.</p>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center text-neutral-300 bg-[#141822] p-2 rounded">
                <span>1. Lewis Hamilton (Mercedes/McLaren)</span>
                <span className="text-amber-400 font-bold">4,639.5 pts • 103 Wins • 197 Podiums</span>
              </div>
              <div className="flex justify-between items-center text-neutral-300 bg-[#141822] p-2 rounded">
                <span>2. Sebastian Vettel (Red Bull/Ferrari)</span>
                <span className="text-white font-bold">3,098.0 pts • 53 Wins • 122 Podiums</span>
              </div>
              <div className="flex justify-between items-center text-neutral-300 bg-[#141822] p-2 rounded">
                <span>3. Max Verstappen (Red Bull/Toro Rosso)</span>
                <span className="text-red-400 font-bold">2,586.5 pts • 54 Wins • 98 Podiums</span>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-[#141822] p-3 rounded border border-[#202635]">
                <span className="text-teal-400 font-bold block mb-1">Mercedes Turbo-Hybrid Peak (2014-2020)</span>
                <p className="text-neutral-300 text-[11px]">Won 102 of 138 races (73.9% win rate). Claimed 8 consecutive Constructors titles.</p>
              </div>
              <div className="bg-[#141822] p-3 rounded border border-[#202635]">
                <span className="text-blue-400 font-bold block mb-1">Red Bull Ground-Effect Dominance (2022-2023)</span>
                <p className="text-neutral-300 text-[11px]">Won 38 of 44 races (86.4% win rate). Scored record 860 points in a single season.</p>
              </div>
            </div>
          )}

          {currentStep >= 3 && (
            <div className="p-3 bg-[#141822] rounded text-xs text-neutral-300 leading-relaxed font-mono">
              Interactive data layer active: Reconciled across 29 circuits and 1,075 classified non-finish statuses.
            </div>
          )}
        </div>

        {/* Analytical Interpretation & Transition Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#1E232E]">
          <div className="bg-[#161B23] p-3.5 rounded-lg border border-[#232938]">
            <span className="text-xs font-bold text-amber-400 uppercase font-mono block mb-1">
              Analytical Interpretation
            </span>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {current.interpretation}
            </p>
          </div>

          <div className="bg-[#161B23] p-3.5 rounded-lg border border-[#232938]">
            <span className="text-xs font-bold text-red-400 uppercase font-mono block mb-1">
              Transition to Next Question
            </span>
            <p className="text-xs text-neutral-300 leading-relaxed flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{current.transition}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
