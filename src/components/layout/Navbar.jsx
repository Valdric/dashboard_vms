import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  Sun, 
  Moon, 
  Bell, 
  LogOut, 
  ShieldCheck, 
  User, 
  ChevronDown,
  RotateCcw,
  Sparkles,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Radio,
  FileCheck2,
  Layers
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';


export const Navbar = ({ onToggleSidebar }) => {
  const { currentUser, profiles, switchActiveProfile, logout, theme, toggleTheme } = useAuth();
  const { 
    searchQuery, 
    setSearchQuery, 
    resetToDemoData, 
    setIsProfileModalOpen,
    exceptionsData,
    inboundData,
    showToast
  } = useData();

  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  const isBeforeCutOff = hours < 15;

  return (
    <header className="sticky top-0 z-30 w-full glass-nav border-b border-slate-200/90 dark:border-slate-800 transition-colors">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left Side: Hamburger (mobile) + compact brand text (desktop) */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Toggle Sidebar Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Compact title only visible on desktop (logo is in sidebar) */}
          <div className="hidden lg:flex flex-col leading-none">
            <span className="text-xs font-black text-[#091c52] dark:text-white tracking-tight">
              WMS <span className="text-[#ff5900]">Mora Republic</span>
            </span>
            <span className="text-[9px] text-slate-400 font-medium">Pos Indonesia · Wholesale &amp; Int'l Biz</span>
          </div>
        </div>

        {/* Center: Live Cut-Off Timer (SKB 3.2: 15:00 WIB Cut-Off) */}
        <div className="hidden xl:flex items-center space-x-2.5 px-3.5 py-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs">
          <Clock className={`w-4 h-4 ${isBeforeCutOff ? 'text-emerald-500 animate-pulse' : 'text-amber-500'}`} />
          <div className="flex items-center space-x-1.5">
            <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
              {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')} WIB
            </span>
            <span className="text-slate-400">•</span>
            {isBeforeCutOff ? (
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                H+0 Pengentrian Aktif (s/d 15:00)
              </span>
            ) : (
              <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                Lewat Cut-Off 15:00 (H+1 Proses)
              </span>
            )}
          </div>
        </div>

        {/* Right Controls: Role Switcher, Notification, Theme, Profile */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* 1-Click RACI Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#091c52] to-[#0e2b7a] hover:from-[#0e2b7a] hover:to-[#173b9e] text-white text-xs font-bold shadow-md shadow-blue-950/30 transition-all cursor-pointer border border-blue-400/20"
              title="Ganti Peran RACI (SKB Bab 2 & 5.4)"
            >
              <ShieldCheck className="w-4 h-4 text-[#ff5900]" />
              <span className="hidden md:inline font-sans">{currentUser?.role}</span>
              <ChevronDown className="w-3.5 h-3.5 text-sky-300" />
            </button>

            {/* Dropdown Menu for Roles */}
            {isRoleMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#0b1329] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-slide-up">
                <div className="px-3.5 py-2 border-b border-slate-200 dark:border-slate-800">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Simulasi 7 Peran Resmi SKB
                  </p>
                </div>

                <div className="max-h-64 overflow-y-auto p-1.5 space-y-1">
                  {profiles.map((p) => {
                    const isSelected = currentUser.id === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => {
                          switchActiveProfile(p.id);
                          setIsRoleMenuOpen(false);
                          showToast(`Beralih ke peran ${p.role}`, 'info');
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-orange-50 dark:bg-orange-950/60 text-[#ff5900] font-bold border border-[#ff5900]/30'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        <div className="flex items-center space-x-2 truncate">
                          <img src={p.avatar} alt={p.name} className="w-6 h-6 rounded-lg object-cover" />
                          <div className="truncate">
                            <p className="truncate font-bold">{p.name}</p>
                            <p className="text-[10px] text-slate-400 truncate">{p.role}</p>
                          </div>
                        </div>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#ff5900] flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Reset Demo Data Button */}
          <button
            onClick={resetToDemoData}
            className="hidden sm:flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
            title="Reset Data ke Default SKB"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden lg:inline">Reset Demo</span>
          </button>

          {/* Notification Bell Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              {exceptionsData.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#0b1329] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-3 z-50 animate-slide-up space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Notifikasi Real-time</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600">
                    {exceptionsData.length} Kendala
                  </span>
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto text-xs">
                  {exceptionsData.map(exc => (
                    <div key={exc.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-rose-600 dark:text-rose-400 text-[11px]">{exc.type}</span>
                        <span className="text-[9px] text-slate-400 font-mono">{exc.reportedAt?.split(' ')[1] || '11:45'}</span>
                      </div>
                      <p className="text-[10px] text-slate-600 dark:text-slate-300 leading-snug">{exc.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-[#091c52]" />
            )}
          </button>

          {/* User Profile Trigger */}
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="flex items-center space-x-2 pl-2 border-l border-slate-200 dark:border-slate-700 cursor-pointer"
          >
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="w-8 h-8 rounded-xl object-cover ring-2 ring-[#ff5900]/40"
            />
          </button>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
            title="Keluar (Logout)"
          >
            <LogOut className="w-4 h-4" />
          </button>

        </div>

      </div>
    </header>
  );
};
