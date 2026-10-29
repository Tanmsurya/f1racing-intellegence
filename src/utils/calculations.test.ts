import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculatePodiumCount,
  calculateDNFRate,
  calculateCompletionRate,
  calculatePointsPerRace,
  filterConstructorTrajectory,
  computeCumulativePoints,
} from './calculations';

test('calculatePodiumCount accurately identifies 1st, 2nd, and 3rd finishes', () => {
  const finishes = [1, 2, 3, 4, 10, 1, 5, 2, 8];
  assert.equal(calculatePodiumCount(finishes), 5);
  assert.equal(calculatePodiumCount([4, 5, 6, 12]), 0);
  assert.equal(calculatePodiumCount([1, 1, 1]), 3);
});

test('calculateDNFRate calculates percentage correctly with 0 starts safety', () => {
  assert.equal(calculateDNFRate(100, 16), 16.0);
  assert.equal(calculateDNFRate(6464, 1075), 16.63);
  assert.equal(calculateDNFRate(0, 0), 0);
});

test('calculateCompletionRate computes finish percentage', () => {
  assert.equal(calculateCompletionRate(100, 84), 84.0);
  assert.equal(calculateCompletionRate(6464, 5389), 83.37);
  assert.equal(calculateCompletionRate(0, 5), 0);
});

test('calculatePointsPerRace normalizes points by starts', () => {
  assert.equal(calculatePointsPerRace(300, 20), 15.0);
  assert.equal(calculatePointsPerRace(4639.5, 332), 13.97);
  assert.equal(calculatePointsPerRace(0, 0), 0);
});

test('filterConstructorTrajectory applies season and constructor filters', () => {
  const standings = [
    { season: 2014, constructorId: 'mercedes', points: 701, position: 1, wins: 16, podiums: 31 },
    { season: 2014, constructorId: 'red_bull', points: 405, position: 2, wins: 3, podiums: 12 },
    { season: 2021, constructorId: 'mercedes', points: 613.5, position: 1, wins: 9, podiums: 28 },
    { season: 2021, constructorId: 'ferrari', points: 323.5, position: 3, wins: 0, podiums: 5 },
  ];

  const filtered = filterConstructorTrajectory(standings, 2014, 2020, ['mercedes']);
  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].season, 2014);
  assert.equal(filtered[0].constructorId, 'mercedes');
});

test('computeCumulativePoints sums points chronologically', () => {
  const standings = [
    { season: 2010, constructorId: 'red_bull', points: 498, position: 1, wins: 9, podiums: 20 },
    { season: 2011, constructorId: 'red_bull', points: 650, position: 1, wins: 12, podiums: 27 },
  ];
  const cumulative = computeCumulativePoints(standings);
  assert.equal(cumulative[0].cumulativePoints, 498);
  assert.equal(cumulative[1].cumulativePoints, 1148);
});
