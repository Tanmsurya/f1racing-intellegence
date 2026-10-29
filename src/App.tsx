import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { OverviewPage } from './components/Pages/OverviewPage';
import { DriversPage } from './components/Pages/DriversPage';
import { ConstructorsPage } from './components/Pages/ConstructorsPage';
import { TyreStrategyAnalysis } from './components/Visualizations/TyreStrategyAnalysis';
import { CircuitParticipation } from './components/Visualizations/CircuitParticipation';
import { ReliabilityAnalysis } from './components/Visualizations/ReliabilityAnalysis';
import { PodiumAchievements } from './components/Visualizations/PodiumAchievements';
import { TableauStory } from './components/TableauStory';
import { ScenariosView } from './components/ScenariosView';
import { TableauStudio } from './components/TableauStudio';
import { DriverDetailModal } from './components/DriverDetailModal';
import { ConstructorDetailModal } from './components/ConstructorDetailModal';
import { DataCleaningModal } from './components/DataCleaningModal';
import { NavigationPage, DriverAggregate } from './types/f1';
import {
  DATASET_METRICS,
  SEASON_RELIABILITY_TREND,
  DRIVER_AGGREGATES,
  CONSTRUCTORS,
} from './data/f1Data';

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [startSeason, setStartSeason] = useState<number>(2007);
  const [endSeason, setEndSeason] = useState<number>(2023);
  const [selectedConstructor, setSelectedConstructor] = useState<string>('all');
  const [selectedDriver, setSelectedDriver] = useState<string>('all');
  const [selectedCircuit, setSelectedCircuit] = useState<string>('all');
  const [searchQuery, setSearchTerm] = useState<string>('');

  // Modals state
  const [activeDriverModal, setActiveDriverModal] = useState<DriverAggregate | null>(null);
  const [activeConstructorModal, setActiveConstructorModal] = useState<string | null>(null);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState<boolean>(false);

  // Compute dynamically scaled KPIs based on filtered season range
  const filteredTrends = SEASON_RELIABILITY_TREND.filter(
    (s) => s.season >= startSeason && s.season <= endSeason
  );
  const totalEntries = filteredTrends.reduce((sum, s) => sum + s.entries, 0);
  const totalFinished = filteredTrends.reduce((sum, s) => sum + s.finished, 0);
  const totalDNFs = filteredTrends.reduce((sum, s) => sum + s.dnfs, 0);

  const numSeasons = endSeason - startSeason + 1;
  const scaledRaces = Math.round(DATASET_METRICS.totalRaces * (numSeasons / 17));
  const scaledPodiums = scaledRaces * 3;
  const scaledPoints = Math.round(DATASET_METRICS.totalChampionshipPointsAwarded * (numSeasons / 17));
  const dynamicCompletionRate = totalEntries > 0 ? (totalFinished / totalEntries) * 100 : 83.37;
  const dynamicDNFRate = totalEntries > 0 ? (totalDNFs / totalEntries) * 100 : 16.63;

  const handleResetFilters = () => {
    setStartSeason(2007);
    setEndSeason(2023);
    setSelectedConstructor('all');
    setSelectedDriver('all');
    setSelectedCircuit('all');
    setSearchTerm('');
  };

  const handleSeasonChange = (start: number, end: number) => {
    setStartSeason(start);
    setEndSeason(end);
  };

  const handleSelectDriver = (driverId: string) => {
    if (driverId === 'all') {
      setSelectedDriver('all');
      return;
    }
    const found = DRIVER_AGGREGATES.find((d) => d.driverId === driverId);
    if (found) {
      setActiveDriverModal(found);
    }
  };

  const handleSelectConstructor = (constructorId: string) => {
    if (constructorId === 'all') {
      setSelectedConstructor('all');
      return;
    }
    setActiveConstructorModal(constructorId);
  };

  const handleNavigate = (page: NavigationPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0B0D10] text-[#F4F5F7] flex font-sans selection:bg-[#E10600] selection:text-white">
      {/* Slim Persistent Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onSelectPage={handleNavigate}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onOpenDataAudit={() => setIsAuditModalOpen(true)}
      />

      {/* Main Container */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        {/* Telemetry Top Bar */}
        <TopBar
          currentPage={currentPage}
          startSeason={startSeason}
          endSeason={endSeason}
          onSeasonChange={handleSeasonChange}
          selectedConstructor={selectedConstructor}
          onConstructorChange={setSelectedConstructor}
          selectedCircuit={selectedCircuit}
          onCircuitChange={setSelectedCircuit}
          searchQuery={searchQuery}
          onSearchChange={setSearchTerm}
          onResetFilters={handleResetFilters}
          isSidebarCollapsed={isSidebarCollapsed}
        />

        {/* Page Views Container */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl w-full mx-auto">
          {currentPage === 'overview' && (
            <OverviewPage
              startSeason={startSeason}
              endSeason={endSeason}
              selectedConstructor={selectedConstructor}
              selectedDriver={selectedDriver}
              selectedCircuit={selectedCircuit}
              onSelectDriver={handleSelectDriver}
              onSelectConstructor={handleSelectConstructor}
              onSelectCircuit={setSelectedCircuit}
              totalRaces={scaledRaces}
              totalDrivers={selectedDriver !== 'all' ? 1 : selectedConstructor !== 'all' ? 12 : 84}
              totalConstructors={selectedConstructor !== 'all' ? 1 : 26}
              totalPoints={scaledPoints}
              totalPodiums={scaledPodiums}
              completionRate={dynamicCompletionRate}
              dnfRate={dynamicDNFRate}
            />
          )}

          {currentPage === 'drivers' && (
            <DriversPage
              onOpenDriverProfile={(driver) => setActiveDriverModal(driver)}
              selectedConstructor={selectedConstructor}
            />
          )}

          {currentPage === 'constructors' && (
            <ConstructorsPage
              onOpenConstructorProfile={(cId) => setActiveConstructorModal(cId)}
              startSeason={startSeason}
              endSeason={endSeason}
            />
          )}

          {currentPage === 'tyres' && (
            <div className="space-y-4">
              <TyreStrategyAnalysis />
            </div>
          )}

          {currentPage === 'circuits' && (
            <div className="space-y-4">
              <CircuitParticipation
                selectedCircuit={selectedCircuit}
                onSelectCircuit={setSelectedCircuit}
                startSeason={startSeason}
                endSeason={endSeason}
              />
            </div>
          )}

          {currentPage === 'reliability' && (
            <div className="space-y-4">
              <ReliabilityAnalysis
                selectedConstructor={selectedConstructor}
                selectedDriver={selectedDriver}
                startSeason={startSeason}
                endSeason={endSeason}
              />
            </div>
          )}

          {currentPage === 'podiums' && (
            <div className="space-y-4">
              <PodiumAchievements
                selectedConstructor={selectedConstructor}
                selectedDriver={selectedDriver}
                onSelectDriver={handleSelectDriver}
                startSeason={startSeason}
                endSeason={endSeason}
              />
            </div>
          )}

          {currentPage === 'story' && <TableauStory />}

          {currentPage === 'scenarios' && <ScenariosView />}

          {currentPage === 'studio' && <TableauStudio />}
        </main>

        {/* Global Footer */}
        <footer className="bg-[#0B0D10] border-t border-[#181C22] py-4 px-6 text-xs text-[#939BA6] font-mono">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E10600]" />
              <span className="text-[#F4F5F7] font-bold">APEX INTELLIGENCE</span>
              <span>• Formula 1 Telemetry & Historical Analytics Platform</span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <button
                onClick={() => setIsAuditModalOpen(true)}
                className="hover:text-cyan-400 transition-colors"
              >
                Data Schema Audit (6,464 records)
              </button>
              <span>•</span>
              <button
                onClick={() => handleNavigate('story')}
                className="hover:text-red-400 transition-colors"
              >
                Tableau Story (8 Chapters)
              </button>
            </div>
          </div>
        </footer>
      </div>

      {/* Driver Detail Profile Modal */}
      <DriverDetailModal
        driver={activeDriverModal}
        onClose={() => setActiveDriverModal(null)}
      />

      {/* Constructor Detail Modal */}
      <ConstructorDetailModal
        constructorId={activeConstructorModal}
        onClose={() => setActiveConstructorModal(null)}
        onSelectDriver={(dId) => {
          setActiveConstructorModal(null);
          handleSelectDriver(dId);
        }}
      />

      {/* Relational Schema & Data Cleaning Modal */}
      <DataCleaningModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
      />
    </div>
  );
}
