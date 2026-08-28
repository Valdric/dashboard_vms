import React, { useState, useRef, useEffect } from 'react';
import { 
  Bell, 
  Sun, 
  Moon, 
  User, 
  LogOut, 
  ShieldCheck, 
  PlusCircle, 
  RotateCcw, 
  ChevronDown, 
  Menu,
  Sparkles,
  FileText
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { BrandLogo } from '../common/BrandLogo';

export const Navbar = ({ onToggleSidebar }) => {
  const { currentUser, logout, theme, toggleTheme } = useAuth();
  const { 
    setIsProfileModalOpen, 
    setIsAddTxModalOpen, 
    resetToDemoData, 
    showToast 
  } = useData();

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 w-full glass-nav border-b border-slate-200/90 dark:border-slate-800 transition-colors">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Hamburger & Brand Breadcrumb */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={onToggleSidebar}
              aria-label="Toggle Sidebar"
              className="p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#ff5900]/30"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb Title */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <span className="text-base sm:text-lg font-black text-[#0e2b7a] dark:text-white">
                  Dashboard
                </span>
                <span className="text-slate-400 dark:text-slate-600 text-sm">/</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-orange-50 dark:bg-orange-950/60 text-[#ff5900] border border-orange-200 dark:border-orange-900/60">
                  Work Order & Asset Telemetry
                </span>
              </div>
            </div>
          </div>

          {/* Right: Actions, Theme Toggle, Notification & Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3" ref={dropdownRef}>
            
            {/* Quick Add Work Order Button */}
            <button
              onClick={() => setIsAddTxModalOpen(true)}
              className="hidden md:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#ff5900] to-[#ea4e00] hover:from-[#ea4e00] hover:to-[#c23b00] text-white text-xs font-bold shadow-sm hover:shadow-orange-500/30 transition-all duration-200 active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Work Order</span>
            </button>

            {/* Dark/Light Mode Switcher */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[#ff5900] dark:hover:text-[#ff5900] transition-all duration-200 focus:outline-none"
              title={theme === 'dark' ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-[#0e2b7a]" />
              )}
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsNotificationOpen(!isNotificationOpen);
                  setIsProfileDropdownOpen(false);
                }}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
                aria-label="Notifikasi"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ff5900] ring-2 ring-white dark:ring-slate-900 animate-pulse" />
              </button>

              {/* Notification Popover */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl glass-card shadow-2xl p-4 border border-slate-200 dark:border-slate-800 z-50 animate-fade-in">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#ff5900]" /> Notifikasi VMS
                    </h4>
                    <span className="text-[11px] bg-orange-100 dark:bg-orange-950 text-[#ff5900] px-2 py-0.5 rounded-full font-bold">
                      2 Baru
                    </span>
                  </div>
                  <div className="space-y-2.5 mt-3">
                    <div className="p-2.5 rounded-xl bg-blue-50/70 dark:bg-[#091c52]/40 border border-blue-100 dark:border-blue-900/40 text-xs">
                      <div className="font-bold text-[#0e2b7a] dark:text-sky-300">Work Order WO/2026/0828/00142 Selesai</div>
                      <div className="text-slate-600 dark:text-slate-300 text-[11px] mt-0.5">150 unit Modem CPE ZTE telah di-generate SN</div>
                      <div className="text-[10px] text-[#ff5900] font-semibold mt-1">10 menit yang lalu</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs">
                      <div className="font-medium text-slate-800 dark:text-slate-200">Outbound Realization Disetujui</div>
                      <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">Pengiriman POS IND ke KCU Kendari siap jalan</div>
                      <div className="text-[10px] text-slate-400 mt-1">1 jam yang lalu</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown Trigger */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsProfileDropdownOpen(!isProfileDropdownOpen);
                  setIsNotificationOpen(false);
                }}
                className="flex items-center space-x-2.5 pl-2 pr-3 py-1.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all duration-200 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              >
                <div className="relative">
                  <img
                    src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                    alt={currentUser?.name || 'User Avatar'}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-[#ff5900]/60 shadow-sm"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
                </div>
                <div className="hidden lg:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    {currentUser?.name || 'VMS Admin'}
                  </span>
                  <span className="text-[10px] text-[#ff5900] font-semibold">
                    {currentUser?.role || 'Super Admin'}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 transition-transform duration-200" />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-2xl glass-card shadow-2xl p-2 border border-slate-200 dark:border-slate-800 z-50 animate-fade-in divide-y divide-slate-100 dark:divide-slate-800">
                  {/* User Profile Header */}
                  <div className="p-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src={currentUser?.avatar}
                        alt={currentUser?.name}
                        className="w-12 h-12 rounded-xl object-cover ring-2 ring-[#ff5900]/50 shadow"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                          {currentUser?.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {currentUser?.email}
                        </p>
                        <div className="mt-1 flex items-center gap-1.5">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-orange-100 dark:bg-orange-950 text-[#ff5900]">
                            <ShieldCheck className="w-3 h-3 mr-1" />
                            {currentUser?.role}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-[11px] text-slate-600 dark:text-slate-300 truncate bg-slate-100 dark:bg-slate-800/60 px-2.5 py-1 rounded-lg font-medium">
                      📍 {currentUser?.branch}
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2 space-y-1">
                    <button
                      onClick={() => {
                        setIsProfileModalOpen(true);
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 rounded-xl hover:bg-orange-50 dark:hover:bg-orange-950/40 hover:text-[#ff5900] transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <User className="w-4 h-4 text-[#ff5900]" />
                        Kelola Profil & Tim (CRUD)
                      </span>
                      <span className="text-[10px] bg-orange-100 dark:bg-orange-900/60 text-[#ff5900] px-1.5 py-0.5 rounded font-mono font-bold">
                        CRUD
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setIsAddTxModalOpen(true);
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <FileText className="w-4 h-4 text-[#0e2b7a] dark:text-sky-400" />
                      Buat Work Order / Transaksi
                    </button>

                    <button
                      onClick={() => {
                        resetToDemoData();
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4 text-amber-500" />
                      Reset Data ke Awal
                    </button>
                  </div>

                  {/* Logout */}
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        logout();
                        showToast('Berhasil keluar dari akun', 'info');
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Keluar / Logout
                    </button>
                  </div>

                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};
