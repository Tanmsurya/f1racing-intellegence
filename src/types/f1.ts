/**
 * Formula 1 Race Intelligence - Apex Intelligence Data Types & Interfaces
 */

export interface Circuit {
  circuit_id: string;
  circuit_name: string;
  country: string;
  city: string;
  laps: number;
  lap_km: number;
  type: 'Permanent' | 'Street' | 'Street/Park';
  altitude_m: number;
  direction: 'Clockwise' | 'Anti-clockwise' | 'Mixed';
}

export interface DriverSeasonRecord {
  season: number;
  constructorId: string;
  points: number;
  position: number;
  wins: number;
  podiums: number;
  dnfs: number;
}

export interface Driver {
  driverId: string;
  code: string;
  forename: string;
  surname: string;
  fullName: string;
  nationality: string;
  permanentNumber?: number;
  primaryConstructor: string;
  activeYears: string;
  careerTitles?: number;
  bestFinish?: string;
  seasonRecords?: DriverSeasonRecord[];
}

export interface Constructor {
  constructorId: string;
  name: string;
  nationality: string;
  color: string;
  accentColor: string;
  headquarters?: string;
  teamPrincipal?: string;
  powerUnit?: string;
}

export type RetirementCategory =
  | 'Finished'
  | 'Engine/PU'
  | 'Gearbox'
  | 'Hydraulics'
  | 'Electrical'
  | 'Brakes'
  | 'Suspension'
  | 'Collision/Accident'
  | 'Disqualified'
  | 'Other Mechanical'
  | 'Withdrawn/Other';

export interface SeasonConstructorStanding {
  season: number;
  constructorId: string;
  points: number;
  position: number;
  wins: number;
  podiums: number;
  cumulativePoints?: number;
}

export interface DriverAggregate {
  driverId: string;
  fullName: string;
  code: string;
  nationality: string;
  permanentNumber?: number;
  primaryConstructor: string;
  totalPoints: number;
  raceStarts: number;
  wins: number;
  podiums: number;
  dnfs: number;
  completionRate: number;
  avgGrid: number;
  avgFinish: number;
  pointsPerRace: number;
  careerTitles?: number;
}

export interface ConstructorAggregate {
  constructorId: string;
  name: string;
  color: string;
  nationality: string;
  totalPoints: number;
  totalStarts: number;
  wins: number;
  podiums: number;
  dnfs: number;
  completionRate: number;
  championships: number;
}

export type NavigationPage =
  | 'overview'
  | 'drivers'
  | 'constructors'
  | 'tyres'
  | 'circuits'
  | 'reliability'
  | 'podiums'
  | 'story'
  | 'scenarios'
  | 'studio';

export interface TyreCompoundData {
  compound: 'Soft' | 'Medium' | 'Hard' | 'Intermediate' | 'Wet';
  color: string;
  label: string;
  typicalStintLaps: number;
  paceDeltaSec: number;
  degPerLapSec: number;
  optimalTempRangeC: string;
  circuitSuitability: string;
  totalLapsSampled: number;
  winRatePct: number;
  podiumRatePct: number;
  avgFinishingPos: number;
}
