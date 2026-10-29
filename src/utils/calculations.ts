/**
 * Formula 1 Race Intelligence - Pure Calculations & Tableau Formulas
 */

import { DriverAggregate, SeasonConstructorStanding, Circuit } from '../types/f1';

/**
 * Calculates podium count from finishing positions
 */
export function calculatePodiumCount(finishes: number[]): number {
  return finishes.filter((pos) => pos >= 1 && pos <= 3).length;
}

/**
 * Calculates DNF rate percentage
 * Formula: (Non-Finishes / Total Starts) * 100
 */
export function calculateDNFRate(totalStarts: number, nonFinishes: number): number {
  if (totalStarts <= 0) return 0;
  return Number(((nonFinishes / totalStarts) * 100).toFixed(2));
}

/**
 * Calculates race completion rate percentage
 * Formula: (Completed Starts / Total Starts) * 100
 */
export function calculateCompletionRate(totalStarts: number, completedStarts: number): number {
  if (totalStarts <= 0) return 0;
  return Number(((completedStarts / totalStarts) * 100).toFixed(2));
}

/**
 * Calculates Points Per Race (PPR)
 */
export function calculatePointsPerRace(totalPoints: number, raceStarts: number): number {
  if (raceStarts <= 0) return 0;
  return Number((totalPoints / raceStarts).toFixed(2));
}

/**
 * Filters constructor standings across seasons and selected teams
 */
export function filterConstructorTrajectory(
  standings: SeasonConstructorStanding[],
  startSeason: number,
  endSeason: number,
  selectedConstructors: string[]
): SeasonConstructorStanding[] {
  return standings.filter((s) => {
    const seasonMatch = s.season >= startSeason && s.season <= endSeason;
    const constructorMatch =
      selectedConstructors.length === 0 || selectedConstructors.includes(s.constructorId);
    return seasonMatch && constructorMatch;
  });
}

/**
 * Computes cumulative points for a constructor across a series of seasons
 */
export function computeCumulativePoints(
  standings: SeasonConstructorStanding[]
): (SeasonConstructorStanding & { cumulativePoints: number })[] {
  const sorted = [...standings].sort((a, b) => a.season - b.season);
  let runningTotal = 0;
  return sorted.map((item) => {
    runningTotal += item.points;
    return {
      ...item,
      cumulativePoints: Number(runningTotal.toFixed(1)),
    };
  });
}

/**
 * Filter and sort driver leaderboard
 */
export function filterDriverLeaderboard(
  drivers: DriverAggregate[],
  constructorFilter: string | null,
  searchQuery: string,
  sortField: 'totalPoints' | 'wins' | 'podiums' | 'pointsPerRace' | 'completionRate' = 'totalPoints'
): DriverAggregate[] {
  return drivers
    .filter((d) => {
      const matchConstructor = !constructorFilter || d.primaryConstructor === constructorFilter;
      const matchSearch =
        !searchQuery ||
        d.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.nationality.toLowerCase().includes(searchQuery.toLowerCase());
      return matchConstructor && matchSearch;
    })
    .sort((a, b) => b[sortField] - a[sortField]);
}

/**
 * Tableau Calculated Field Definitions for documentation & clipboard copy
 */
export interface TableauCalculatedField {
  name: string;
  category: 'Measure' | 'Dimension' | 'LOD Expression';
  formula: string;
  explanation: string;
  commentary: string;
}

export const TABLEAU_CALCULATED_FIELDS: TableauCalculatedField[] = [
  {
    name: 'Podium Count',
    category: 'Measure',
    formula: `SUM(IIF([Position Order] >= 1 AND [Position Order] <= 3 AND [Status] = 'Finished', 1, 0))`,
    explanation: 'Counts classified finishes in 1st, 2nd, or 3rd position.',
    commentary: 'Ensures disqualified or non-classified drivers completing laps are excluded.',
  },
  {
    name: 'DNF Rate',
    category: 'Measure',
    formula: `ZN(SUM(IIF([Is DNF] = TRUE, 1, 0))) / ZN(COUNT([Race Id]))`,
    explanation: 'Ratio of unclassified non-finishes to total eligible race entries.',
    commentary: 'Formatted as Percentage with 1 decimal. Evaluated at driver or constructor partition.',
  },
  {
    name: 'Completion Rate',
    category: 'Measure',
    formula: `ZN(SUM(IIF([Is DNF] = FALSE, 1, 0))) / ZN(COUNT([Race Id]))`,
    explanation: 'Ratio of completed race finishes to total eligible starts.',
    commentary: 'Direct complement to DNF Rate (Completion Rate + DNF Rate = 100%).',
  },
  {
    name: 'Constructor Points (Historical Adjusted)',
    category: 'Measure',
    formula: `// Handles historical scoring shifts (2007-2009 vs 2010+ and fastest lap)\nSUM([Points])`,
    explanation: 'Aggregates official FIA awarded championship points for constructor entries.',
    commentary: 'Preserves the empirical points allocated per race rather than retro-fitting modern scales.',
  },
  {
    name: 'Points Per Race (PPR)',
    category: 'Measure',
    formula: `SUM([Points]) / COUNTD([Race Id])`,
    explanation: 'Average points haul per Grand Prix start.',
    commentary: 'Normalizes for seasons with varying race calendar lengths (17 vs 22 races).',
  },
  {
    name: 'Mechanical Failure Flag',
    category: 'Dimension',
    formula: `IF [Status] IN ('Engine', 'Power Unit', 'Gearbox', 'Hydraulics', 'Electrical', 'Brakes', 'Suspension')\nTHEN 'Mechanical Failure'\nELSEIF [Status] IN ('Collision', 'Accident', 'Spun off')\nTHEN 'Incident / Crash'\nELSEIF [Status] = 'Finished'\nTHEN 'Classified Finish'\nELSE 'Other Non-Finish'\nEND`,
    explanation: 'Categorizes raw FIA retirement statuses into standardized technical clusters.',
    commentary: 'Crucial for FIA technical analysis and distinguishing mechanical defects from driving incidents.',
  },
  {
    name: 'LOD: Season Winner Points',
    category: 'LOD Expression',
    formula: `{ FIXED [Season] : MAX({ FIXED [Season], [Driver Id] : SUM([Points]) }) }`,
    explanation: 'Calculates the highest driver points total achieved in each season.',
    commentary: 'Used as baseline to compute percentage gap to the World Drivers Champion.',
  },
  {
    name: 'LOD: Constructor Championship Gap',
    category: 'LOD Expression',
    formula: `[Constructor Points] - { FIXED [Season] : MAX({ FIXED [Season], [Constructor Id] : SUM([Points]) }) }`,
    explanation: 'Deficit in points between the selected constructor and the constructor champion.',
    commentary: 'Enables strategist Rajan to benchmark deficit progression year-on-year.',
  },
];
