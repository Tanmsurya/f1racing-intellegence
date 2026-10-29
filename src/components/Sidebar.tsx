import React from 'react';
import {
  LayoutDashboard,
  Users,
  Shield,
  CircleDot,
  MapPin,
  AlertTriangle,
  Trophy,
  BookOpen,
  UserCheck,
  Settings,
  ChevronLeft,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { NavigationPage } from '../types/f1';

interface SidebarProps {
  currentPage: NavigationPage;
  onSelectPage: (page: NavigationPage) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onOpenDataAudit: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onSelectPage,
  isCollapsed,
  onToggleCollapse,
  onOpenDataAudit,
}) => {
  const navItems: { id: NavigationPage; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'drivers', label: 'Driver Performance', icon: Users },
    { id: 'constructors', label: 'Constructor Analysis', icon: Shield },
    { id: 'tyres', label: 'Tyre Strategy', icon: CircleDot },
    { id: 'circuits', label: 'Circuit Intelligence', icon: MapPin },
    { id: 'reliability', label: 'Reliability & DNF', icon: AlertTriangle },
    { id: 'podiums', label: 'Podium Analytics', icon: Trophy },
    { id: 'story', label: 'Tableau Story', icon: BookOpen, badge: '8 pts' },
    { id: 'scenarios', label: 'Scenarios', icon: UserCheck, badge: 'R/D/A' },
    { id: 'studio', label: 'Tableau Studio', icon: Settings },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 bg-[#0B0D10] border-r border-[#1B2027] transition-all duration-300 flex flex-col justify-between select-none ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Top Brand Header */}
      <div>
        <div className="h-16 flex items-center px-4 border-b border-[#181C22] gap-3">
          <div className="w-8 h-8 rounded-md bg-[#E10600] flex items-center justify-center shrink-0 shadow-lg shadow-red-950/60 font-black text-white text-xs tracking-tighter">
            ▲
          </div>

          {!isCollapsed && (
            <div className="overflow-hidden">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-sm tracking-wider text-white font-['Titillium_Web',sans-serif] uppercase">
                  Apex
                </span>
                <span className="text-[10px] font-mono font-semibold px-1 py-0.2 bg-[#1B2027] text-cyan-400 rounded border border-cyan-500/20">
                  F1
                </span>
              </div>
              <p className="text-[10px] font-mono tracking-widest text-[#939BA6] uppercase truncate">
                Intelligence
              </p>
            </div>
          )}
        </div>

        {/* Navigation List */}
        <nav className="p-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSelectPage(item.id)}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all relative group ${
                  isActive
                    ? 'bg-[#14171C] text-white shadow-sm'
                    : 'text-[#939BA6] hover:text-[#F4F5F7] hover:bg-[#14171C]/60'
                }`}
              >
                {/* Thin Racing Red Indicator */}
                {isActive && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#E10600] rounded-r-full shadow-sm shadow-red-500/80" />
                )}

                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-[#E10600]' : 'text-[#939BA6] group-hover:text-white'
                  }`}
                />

                {!isCollapsed && (
                  <div className="flex items-center justify-between flex-1 truncate">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#1B2027] text-neutral-400 border border-[#2B3240]">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Collapse Toggle & Data Audit */}
      <div className="p-2 border-t border-[#181C22] space-y-1">
        <button
          onClick={onOpenDataAudit}
          title={isCollapsed ? 'Data Audit & Schema' : undefined}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-mono text-[#939BA6] hover:text-white hover:bg-[#14171C] transition-all"
        >
          <Flame className="w-4 h-4 text-cyan-400 shrink-0" />
          {!isCollapsed && <span className="text-[11px] truncate">Dataset Audit (6.4k)</span>}
        </button>

        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center p-2 rounded-lg text-[#939BA6] hover:text-white hover:bg-[#14171C] transition-all"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
};
