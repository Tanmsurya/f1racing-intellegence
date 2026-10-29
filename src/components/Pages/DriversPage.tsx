import React, { useState } from 'react';
import { Users, Search, ArrowUpDown, Trophy, Award, CheckCircle, AlertTriangle, Eye } from 'lucide-react';
import { DRIVER_AGGREGATES, CONSTRUCTORS } from '../../data/f1Data';
import { DriverAggregate } from '../../types/f1';

interface DriversPageProps {
  onOpenDriverProfile: (driver: DriverAggregate) => void;
  selectedConstructor: string;
}

export const DriversPage: React.FC<DriversPageProps> = ({
  onOpenDriverProfile,
  selectedConstructor,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof DriverAggregate>('totalPoints');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  const filtered = DRIVER_AGGREGATES
    .filter((d) => selectedConstructor === 'all' || d.primaryConstructor === selectedConstructor)
    .filter(
      (d) =>
        d.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.nationality.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const valA = a[sortField] as number;
      const valB = b[sortField] as number;
      return sortAsc ? valA - valB : valB - valA;
    });

  const toggleSort = (field: keyof DriverAggregate) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const getTeam = (id: string) => CONSTRUCTORS.find((c) => c.constructorId === id);

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="bg-[#14171C] border border-[#222834] rounded-2xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#E10600]" />
            <h2 className="text-xl font-black text-white font-['Titillium_Web',sans-serif] uppercase tracking-wide">
              Driver Performance Intelligence Hub
            </h2>
          </div>
          <p className="text-xs text-[#939BA6] mt-0.5 font-mono">
            Comprehensive driver analytics across 17 seasons (2007–2023) • Click any driver to open their technical profile
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#939BA6] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search driver by name, code, or country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#0E1116] border border-[#2B3442] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-[#939BA6]/60 focus:outline-none focus:border-[#E10600] w-full sm:w-72 font-mono"
          />
        </div>
      </div>

      {/* Driver Records Table */}
      <div className="bg-[#14171C] border border-[#222834] rounded-2xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="bg-[#0E1116] border-b border-[#222834] text-[#939BA6] uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Driver</th>
                <th className="py-3 px-4">Constructor</th>
                <th
                  onClick={() => toggleSort('totalPoints')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-white transition-colors"
                >
                  <span className="flex items-center justify-end gap-1">
                    Points <ArrowUpDown className="w-3 h-3 text-[#E10600]" />
                  </span>
                </th>
                <th
                  onClick={() => toggleSort('wins')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-white transition-colors"
                >
                  <span className="flex items-center justify-end gap-1">
                    Wins <ArrowUpDown className="w-3 h-3" />
                  </span>
                </th>
                <th
                  onClick={() => toggleSort('podiums')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-white transition-colors"
                >
                  <span className="flex items-center justify-end gap-1">
                    Podiums <ArrowUpDown className="w-3 h-3" />
                  </span>
                </th>
                <th
                  onClick={() => toggleSort('raceStarts')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-white transition-colors"
                >
                  Starts
                </th>
                <th
                  onClick={() => toggleSort('pointsPerRace')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-white transition-colors"
                >
                  PPR
                </th>
                <th
                  onClick={() => toggleSort('completionRate')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-white transition-colors"
                >
                  Completion
                </th>
                <th className="py-3 px-4 text-center">Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C222E]">
              {filtered.map((driver, idx) => {
                const team = getTeam(driver.primaryConstructor);
                return (
                  <tr
                    key={driver.driverId}
                    onClick={() => onOpenDriverProfile(driver)}
                    className="hover:bg-[#1B2027] cursor-pointer transition-colors group"
                  >
                    <td className="py-3 px-4 font-bold text-neutral-400">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-[#1B2027] border border-[#2B3442] flex items-center justify-center font-bold text-[10px] text-white">
                          {driver.permanentNumber || driver.code}
                        </span>
                        <div>
                          <span className="font-bold text-white group-hover:text-red-400 transition-colors block">
                            {driver.fullName}
                          </span>
                          <span className="text-[10px] text-[#939BA6]">{driver.nationality}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {team ? (
                        <span
                          className="px-2 py-0.5 rounded text-[10px] font-medium border border-white/10"
                          style={{ backgroundColor: `${team.color}20`, color: team.color }}
                        >
                          {team.name}
                        </span>
                      ) : (
                        <span className="text-neutral-500">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right font-black text-white text-sm">
                      {driver.totalPoints.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-amber-400">
                      {driver.wins}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-neutral-200">
                      {driver.podiums}
                    </td>
                    <td className="py-3 px-4 text-right text-[#939BA6]">
                      {driver.raceStarts}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-cyan-400">
                      {driver.pointsPerRace.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-right text-emerald-400 font-bold">
                      {driver.completionRate.toFixed(1)}%
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenDriverProfile(driver);
                        }}
                        className="p-1 rounded hover:bg-neutral-700 text-[#939BA6] hover:text-white"
                        title="View technical driver dossier"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
