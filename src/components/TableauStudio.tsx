import React, { useState } from 'react';
import {
  Code,
  Copy,
  Check,
  Layers,
  Database,
  FileSpreadsheet,
  AlertCircle,
  ExternalLink,
  BookOpen,
  Layout,
  UploadCloud,
} from 'lucide-react';
import { TABLEAU_CALCULATED_FIELDS, TableauCalculatedField } from '../utils/calculations';

export const TableauStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'worksheets' | 'formulas' | 'cleaning' | 'limitations' | 'publishing'>('worksheets');
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);

  const handleCopy = (formula: string, name: string) => {
    navigator.clipboard?.writeText(formula);
    setCopiedFormula(name);
    setTimeout(() => setCopiedFormula(null), 2500);
  };

  const worksheetsGuide = [
    {
      sheet: 'Worksheet 1: Driver Performance Leaderboard',
      chartType: 'Horizontal Bar Chart',
      rows: '[Driver Full Name]',
      columns: 'SUM([Points])',
      marks: 'Bar',
      color: 'SUM([Points]) (Red-Amber-Gold diverging)',
      detail: '[Constructor Name], [Nationality]',
      tooltip: '[Driver Full Name], Total Points, Wins, Podiums, Race Starts, Points Per Race',
      filters: '[Season] (Range), [Constructor Name] (Multiple values list), [Driver Code]',
      sort: '[Driver Full Name] descending by SUM([Points])',
      notes: 'Format points with 1 decimal. Add reference line for Average Driver Points across the grid.',
    },
    {
      sheet: 'Worksheet 2: Constructors Championship Trajectory',
      chartType: 'Multi-Line Trend Chart',
      rows: 'SUM([Constructor Points]) (or Cumulative Points via Running Total Quick Table Calc)',
      columns: '[Season] (Discrete dimension)',
      marks: 'Line (with data markers turned on)',
      color: '[Constructor Name] (Custom F1 team palette: Red Bull Navy, Mercedes Teal, Ferrari Red, etc.)',
      detail: '[Season], [Constructor Id]',
      tooltip: '[Constructor Name], Season, Points Scored, WCC Standing, Race Wins',
      filters: '[Season] (Range slider 2007-2023), [Constructor Name] (Keep Red Bull, Mercedes, and User Selection)',
      sort: 'Chronological by Season ascending',
      notes: 'Add vertical reference lines with annotations for 2014 (V6 Turbo Hybrid) and 2022 (Ground Effect).',
    },
    {
      sheet: 'Worksheet 3: Tyre Compound Strategy Analysis',
      chartType: 'Grouped Bar & Scatter Degradation Curve',
      rows: 'AVG([Degradation Per Lap Sec]), SUM([Laps Run])',
      columns: '[Compound Name] (Soft, Medium, Hard, Intermediate, Wet)',
      marks: 'Bar with dual-axis circle markers for Pace Delta',
      color: '[Compound Name] (Standard Pirelli Colors: Red, Yellow, White, Green, Blue)',
      detail: '[Circuit Type], [Weather Condition]',
      tooltip: 'Compound, Degradation Rate, Pace Delta to Soft, Win Conversion Rate %, Optimal Temp',
      filters: '[Circuit Type] (Permanent vs Street), [Weather Condition]',
      sort: 'Pace delta ascending (Soft -> Medium -> Hard)',
      notes: 'Include dashboard subtitle explaining empirical Pirelli calibration and FastF1 integration recommendation.',
    },
    {
      sheet: 'Worksheet 4: Circuit and Grand Prix Participation',
      chartType: 'Ranked Horizontal Bar Chart / Symbol Map',
      rows: '[Country]',
      columns: 'COUNTD([Race Id])',
      marks: 'Bar / Filled Map',
      color: 'COUNTD([Circuit Id]) (Distinct circuit count)',
      detail: '[Circuit Name], [City], [Type], [Altitude m]',
      tooltip: 'Country, Total Races Hosted, Distinct Circuits, Primary Circuit, Altitude (m)',
      filters: '[Season] (Range), [Type] (Permanent vs Street)',
      sort: '[Country] descending by COUNTD([Race Id])',
      notes: 'Monza, Imola, and Mugello are grouped under Italy (22 total races); COTA, Miami, Vegas under USA (15 races).',
    },
    {
      sheet: 'Worksheet 5: Driver Reliability and DNF Analysis',
      chartType: '100% Stacked Bar Chart',
      rows: '[Constructor Name] or [Season]',
      columns: 'COUNT([Race Id]) with Percent of Total Quick Table Calculation',
      marks: 'Bar',
      color: '[Mechanical Failure Flag] (Finished = Emerald, Mechanical = Amber, Collision = Crimson)',
      detail: '[Retirement Status Raw]',
      tooltip: 'Category, Count of Starts, Percent of Starts, Primary Failure Cause',
      filters: '[Season] (Range), [Constructor Name], [Mechanical Failure Flag]',
      sort: 'Percent of Non-Finishes descending',
      notes: 'Ensure denominator includes all official starts (Classified + DNF). Exclude DNS (Did Not Start).',
    },
    {
      sheet: 'Worksheet 6: Global Podium Achievements',
      chartType: 'Ranked Bar / Treemap Matrix',
      rows: '[Driver Nationality] or [Driver Full Name]',
      columns: 'SUM([Podium Count])',
      marks: 'Bar / Treemap rectangle size',
      color: 'SUM([Podium Count]) (Gold metallic gradient)',
      detail: '[Wins Count], [Driver Count]',
      tooltip: 'Nationality, Total Podiums, Number of Drivers, Top Contributor',
      filters: '[Season] (Range), [Position Order] <= 3',
      sort: 'SUM([Podium Count]) descending',
      notes: 'Podium definition: [Position Order] <= 3 AND [Status] = "Finished".',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Studio Header */}
      <div className="bg-[#12151B] border border-[#222731] rounded-xl p-5 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#1E232E]">
          <div>
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-red-500" />
              <h2 className="font-extrabold text-white text-lg tracking-wide font-['Titillium_Web',sans-serif] uppercase">
                Tableau Implementation Studio & Technical Specification
              </h2>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Production-ready Tableau Desktop configuration, calculated field formulas, and validation documentation
            </p>
          </div>

          {copiedFormula && (
            <span className="text-xs font-mono bg-emerald-950 text-emerald-300 border border-emerald-800 px-3 py-1 rounded">
              Copied &ldquo;{copiedFormula}&rdquo; to clipboard!
            </span>
          )}
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <button
            onClick={() => setActiveTab('worksheets')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'worksheets'
                ? 'bg-[#E10600] text-white shadow'
                : 'bg-[#181D26] text-neutral-300 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Worksheet-by-Worksheet Guide
          </button>

          <button
            onClick={() => setActiveTab('formulas')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'formulas'
                ? 'bg-[#E10600] text-white shadow'
                : 'bg-[#181D26] text-neutral-300 hover:text-white'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            Calculated Fields Repository
          </button>

          <button
            onClick={() => setActiveTab('cleaning')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'cleaning'
                ? 'bg-[#E10600] text-white shadow'
                : 'bg-[#181D26] text-neutral-300 hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            Data Cleaning & Joins Plan
          </button>

          <button
            onClick={() => setActiveTab('limitations')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'limitations'
                ? 'bg-[#E10600] text-white shadow'
                : 'bg-[#181D26] text-neutral-300 hover:text-white'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            Data Limitations & Supplementary Sources
          </button>

          <button
            onClick={() => setActiveTab('publishing')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'publishing'
                ? 'bg-[#E10600] text-white shadow'
                : 'bg-[#181D26] text-neutral-300 hover:text-white'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            Publishing & Presentation
          </button>
        </div>
      </div>

      {/* Tab 1: Worksheet Guide */}
      {activeTab === 'worksheets' && (
        <div className="space-y-4">
          {worksheetsGuide.map((ws, idx) => (
            <div
              key={ws.sheet}
              className="bg-[#12151B] border border-[#222731] rounded-xl p-4 shadow-md text-xs"
            >
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#1E232E]">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-red-600/30 text-red-400 border border-red-500/40 flex items-center justify-center font-mono font-bold">
                    {idx + 1}
                  </span>
                  <h3 className="font-bold text-white text-sm">{ws.sheet}</h3>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#181D26] text-neutral-300 font-mono text-[11px]">
                  Chart: {ws.chartType}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mb-3 font-mono text-[11px]">
                <div className="bg-[#161B23] p-2 rounded border border-[#232938]">
                  <span className="text-neutral-400 block text-[10px] uppercase">Rows Shelf</span>
                  <span className="text-white font-semibold">{ws.rows}</span>
                </div>
                <div className="bg-[#161B23] p-2 rounded border border-[#232938]">
                  <span className="text-neutral-400 block text-[10px] uppercase">Columns Shelf</span>
                  <span className="text-white font-semibold">{ws.columns}</span>
                </div>
                <div className="bg-[#161B23] p-2 rounded border border-[#232938]">
                  <span className="text-neutral-400 block text-[10px] uppercase">Color Property</span>
                  <span className="text-amber-400">{ws.color}</span>
                </div>
                <div className="bg-[#161B23] p-2 rounded border border-[#232938]">
                  <span className="text-neutral-400 block text-[10px] uppercase">Detail / Level of Detail</span>
                  <span className="text-neutral-300">{ws.detail}</span>
                </div>
              </div>

              <div className="bg-[#0E1116] p-2.5 rounded border border-[#1E232E] text-[11px] text-neutral-300 space-y-1">
                <div>
                  <strong className="text-white">Tooltip Fields:</strong> {ws.tooltip}
                </div>
                <div>
                  <strong className="text-white">Applied Filters:</strong> {ws.filters}
                </div>
                <div className="text-neutral-400">
                  <strong className="text-amber-300">Tableau Best Practice:</strong> {ws.notes}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Calculated Fields */}
      {activeTab === 'formulas' && (
        <div className="space-y-4">
          <div className="bg-[#12151B] border border-[#222731] rounded-xl p-4 shadow-md">
            <h3 className="font-bold text-white text-sm mb-1">
              Tableau Calculated Fields & LOD Expressions Repository
            </h3>
            <p className="text-xs text-neutral-400 mb-4">
              Click &ldquo;Copy Formula&rdquo; to paste directly into the Tableau Desktop Calculated Field dialog.
            </p>

            <div className="space-y-3">
              {TABLEAU_CALCULATED_FIELDS.map((cf) => (
                <div
                  key={cf.name}
                  className="bg-[#0E1116] border border-[#1F2533] rounded-lg p-3.5 text-xs"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{cf.name}</span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold ${
                          cf.category === 'LOD Expression'
                            ? 'bg-purple-950 text-purple-300 border border-purple-800'
                            : cf.category === 'Measure'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-blue-950 text-blue-300 border border-blue-800'
                        }`}
                      >
                        {cf.category}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopy(cf.formula, cf.name)}
                      className="px-2.5 py-1 bg-[#1A202C] hover:bg-red-600 hover:text-white text-neutral-300 rounded text-xs flex items-center gap-1.5 transition-all"
                    >
                      <Copy className="w-3 h-3" />
                      Copy Formula
                    </button>
                  </div>

                  <div className="bg-[#07090C] p-2.5 rounded border border-[#1A202C] font-mono text-emerald-400 text-xs mb-2 whitespace-pre-wrap">
                    {cf.formula}
                  </div>

                  <p className="text-neutral-300 text-[11px] mb-1">
                    <strong className="text-neutral-200">Logic:</strong> {cf.explanation}
                  </p>
                  <p className="text-neutral-400 text-[10px]">
                    <strong className="text-amber-400">Analytical Rationale:</strong> {cf.commentary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Cleaning & Joins */}
      {activeTab === 'cleaning' && (
        <div className="bg-[#12151B] border border-[#222731] rounded-xl p-5 shadow-lg space-y-4 text-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-[#1E232E]">
            <Database className="w-4 h-4 text-red-500" />
            <h3 className="font-bold text-white text-sm">
              Data Cleaning, Granularity & Relational Join Architecture
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#0E1116] p-3.5 rounded-lg border border-[#1E232E] space-y-2">
              <span className="font-bold text-white text-sm block text-amber-400">
                1. Table Relationships & Granularity Verification
              </span>
              <p className="text-neutral-300 leading-relaxed text-[11px]">
                The central fact table is <code>results</code> (grain: 1 row per driver per race, totaling 6,464 records across 17 seasons).
              </p>
              <ul className="list-disc list-inside space-y-1 text-neutral-400 font-mono text-[10px]">
                <li><code>results.raceId</code> = <code>races.raceId</code> (Many-to-One)</li>
                <li><code>races.circuitId</code> = <code>circuits.circuit_id</code> (Many-to-One, 29 circuits)</li>
                <li><code>results.driverId</code> = <code>drivers.driverId</code> (Many-to-One)</li>
                <li><code>results.constructorId</code> = <code>constructors.constructorId</code> (Many-to-One)</li>
                <li><code>results.statusId</code> = <code>status.statusId</code> (Many-to-One, 1,075 DNFs)</li>
              </ul>
            </div>

            <div className="bg-[#0E1116] p-3.5 rounded-lg border border-[#1E232E] space-y-2">
              <span className="font-bold text-white text-sm block text-emerald-400">
                2. Elimination of Double-Counting
              </span>
              <p className="text-neutral-300 leading-relaxed text-[11px]">
                When analyzing constructor points, joining driver results can duplicate constructor points if aggregated naively. In Tableau:
              </p>
              <div className="bg-[#07090C] p-2 rounded font-mono text-emerald-300 text-[10px]">
                {`// Use COUNTD for unique race events\nTotal Races = COUNTD([Race Id])\n\n// Avoid double counting constructor points across multiple drivers\nConstructor Points = SUM([Points]) // natively partitioned by [Constructor Id]`}
              </div>
            </div>
          </div>

          <div className="bg-[#0E1116] p-3.5 rounded-lg border border-[#1E232E] space-y-2">
            <span className="font-bold text-white text-sm block text-blue-400">
              3. Historical Scoring Rule Normalization Plan
            </span>
            <p className="text-neutral-300 leading-relaxed text-[11px]">
              F1 points systems shifted substantially over the 17-season window:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[10px]">
              <div className="bg-[#141822] p-2 rounded border border-[#202635]">
                <strong className="text-white block mb-0.5">2007–2009 (V8)</strong>
                <span>10-8-6-5-4-3-2-1 to Top 8. Max 10 pts/race.</span>
              </div>
              <div className="bg-[#141822] p-2 rounded border border-[#202635]">
                <strong className="text-white block mb-0.5">2010–2018 (V8/Hybrid)</strong>
                <span>25-18-15-12-10-8-6-4-2-1 to Top 10. Max 25 pts.</span>
              </div>
              <div className="bg-[#141822] p-2 rounded border border-[#202635]">
                <strong className="text-white block mb-0.5">2019–2023 (Modern)</strong>
                <span>25 pts + 1 Fastest Lap bonus + Sprint points (from 2021).</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Limitations & Supplementary Sources */}
      {activeTab === 'limitations' && (
        <div className="bg-[#12151B] border border-[#222731] rounded-xl p-5 shadow-lg space-y-4 text-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-[#1E232E]">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <h3 className="font-bold text-white text-sm">
              Empirical Limitations & Recommended Supplementary Datasets
            </h3>
          </div>

          <div className="bg-[#16140D] border border-amber-500/30 p-3.5 rounded-lg text-neutral-300 leading-relaxed text-[11px]">
            <h4 className="font-bold text-amber-300 mb-1">
              Dataset Limitation: Absence of Native Stint-Level Tyre Telemetry
            </h4>
            <p>
              The baseline historical F1 dataset (Ergast/FIA Classification) provides comprehensive end-of-race classifications, lap counts, grids, finishes, and retirement statuses across 6,464 records. However, <strong>it does not contain lap-by-lap tyre compound stints</strong> (e.g., compound fitted, tyre life, pit-in lap, and telemetry degradation curves).
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">
              Recommended Supplementary Data Sources for Production Enrichment:
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-[11px]">
              <div className="bg-[#0E1116] p-3 rounded-lg border border-[#1E232E]">
                <div className="flex items-center justify-between text-white font-bold mb-1">
                  <span>1. FastF1 Python API</span>
                  <ExternalLink className="w-3.5 h-3.5 text-red-400" />
                </div>
                <p className="text-neutral-400 text-[10px] font-sans">
                  Open-source library interfacing directly with official F1 live timing feeds. Provides lap-by-lap tyre compounds, stint lengths, tyre age, sector times, and throttle/brake traces.
                </p>
                <div className="mt-2 text-[10px] text-emerald-400">
                  <code>pip install fastf1</code>
                </div>
              </div>

              <div className="bg-[#0E1116] p-3 rounded-lg border border-[#1E232E]">
                <div className="flex items-center justify-between text-white font-bold mb-1">
                  <span>2. OpenF1 REST API</span>
                  <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <p className="text-neutral-400 text-[10px] font-sans">
                  Modern RESTful and streaming API with JSON endpoints for live telemetry, car data, weather feeds, and stint compound history since 2023.
                </p>
                <div className="mt-2 text-[10px] text-blue-400">
                  <code>https://api.openf1.org/v1/stints</code>
                </div>
              </div>

              <div className="bg-[#0E1116] p-3 rounded-lg border border-[#1E232E]">
                <div className="flex items-center justify-between text-white font-bold mb-1">
                  <span>3. Pirelli Motorsport Press Kits</span>
                  <ExternalLink className="w-3.5 h-3.5 text-yellow-400" />
                </div>
                <p className="text-neutral-400 text-[10px] font-sans">
                  Official post-race infographics detailing actual compound usage for all classified cars, pit stop counts, and tire wear thermal windows.
                </p>
                <div className="mt-2 text-[10px] text-yellow-400">
                  Official Pirelli Media Center
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Publishing & Presentation */}
      {activeTab === 'publishing' && (
        <div className="bg-[#12151B] border border-[#222731] rounded-xl p-5 shadow-lg space-y-4 text-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-[#1E232E]">
            <UploadCloud className="w-4 h-4 text-red-500" />
            <h3 className="font-bold text-white text-sm">
              Tableau Publishing & Presentation Guidelines
            </h3>
          </div>

          <div className="space-y-3 text-neutral-300 text-[11px] leading-relaxed">
            <div className="bg-[#0E1116] p-3.5 rounded-lg border border-[#1E232E]">
              <strong className="text-white text-xs block mb-1">1. Fixed Dashboard Sizing & Device Layouts</strong>
              <p>
                In Tableau Desktop, set Dashboard Size to <strong>Fixed Size (1440 × 900 px)</strong> to prevent auto-reflow distortion of horizontal bar charts and alignment containers. Configure a responsive Mobile Device Layout (390 × 844 px) stacking KPI cards into 2 columns.
              </p>
            </div>

            <div className="bg-[#0E1116] p-3.5 rounded-lg border border-[#1E232E]">
              <strong className="text-white text-xs block mb-1">2. Dashboard Action Filters</strong>
              <p>
                Configure Tableau Dashboard Actions: Selecting a driver on Worksheet 1 filters Worksheet 5 (Reliability) and Worksheet 6 (Podiums). Selecting a constructor on Worksheet 2 filters Worksheet 1 and Worksheet 5. Set &ldquo;Clearing the selection will: Show all values&rdquo;.
              </p>
            </div>

            <div className="bg-[#0E1116] p-3.5 rounded-lg border border-[#1E232E]">
              <strong className="text-white text-xs block mb-1">3. Publishing to Tableau Public / Tableau Server</strong>
              <p>
                Ensure data extracts are created (<code>.hyper</code> format) with all unused fields hidden. Under Server &gt; Publish Workbook, enable &ldquo;Show sheets as tabs&rdquo; so evaluators can seamlessly toggle between the operational dashboard and the 8-point Tableau Story.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
