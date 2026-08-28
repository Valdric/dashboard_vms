import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider, useData } from './context/DataContext';
import { LoginPage } from './components/auth/LoginPage';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { FilterBar } from './components/layout/FilterBar';
import { MetricGrid } from './components/metrics/MetricGrid';
import { GaugeSection } from './components/metrics/GaugeSection';
import { ReportSection } from './components/tables/ReportSection';
import { SerialNumberModal } from './components/modals/SerialNumberModal';
import { ProfileModal } from './components/modals/ProfileModal';
import { AddTransactionModal } from './components/modals/AddTransactionModal';
import { Toast } from './components/modals/Toast';
import { 
  Sparkles, 
  ShieldCheck, 
  FileText,
  Layers,
  Globe
} from 'lucide-react';

const DashboardContent = () => {
  const { currentUser } = useAuth();
  const { selectedWarehouse, setIsProfileModalOpen, setIsAddTxModalOpen, setActiveTab } = useData();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070c18] transition-colors duration-200">
      
      {/* Sidebar Navigation */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main Content Area (offset by sidebar width on lg screens) */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        
        {/* Top Navbar */}
        <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Dashboard Body */}
        <main className="flex-1 max-w-[1700px] w-full mx-auto p-4 sm:p-6 lg:p-8">
          
          {/* Welcome Banner - Styled in Danantara Navy & POS IND Orange Tone */}
          <div className="mb-6 rounded-3xl bg-gradient-to-r from-[#091c52] via-[#0e2b7a] to-[#123896] p-6 sm:p-7 text-white shadow-xl shadow-blue-950/30 relative overflow-hidden border border-blue-400/20">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#ff5900]/25 to-transparent pointer-events-none" />
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#ff5900]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-10 -top-10 w-48 h-48 bg-blue-400/15 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#ff5900] text-white shadow-sm flex items-center gap-1.5 font-sans">
                    <Sparkles className="w-3.5 h-3.5" />
                    Danantara Indonesia ✕ POS IND
                  </span>
                  <span className="text-xs text-sky-200 font-medium">
                    28 Agustus 2026 • Live Telemetri
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight font-sans">
                  Selamat Datang, <span className="bg-gradient-to-r from-white via-orange-100 to-[#ff9966] bg-clip-text text-transparent">{currentUser?.name}</span> 👋
                </h1>
                <p className="text-xs sm:text-sm text-slate-200 max-w-2xl">
                  Sistem VMS memantau alur Work Order, registrasi SKU perangkat, penerbitan serial number fisik, dan jaringan distribusi nasional POS IND.
                </p>
              </div>

              {/* Quick Actions in Banner */}
              <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
                <button
                  onClick={() => {
                    setActiveTab('Work Order');
                    setIsAddTxModalOpen(true);
                  }}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#ff5900] hover:bg-[#ea4e00] text-white text-xs font-bold shadow-lg shadow-orange-600/30 transition-all active:scale-95 cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>+ Buat Work Order (WO)</span>
                </button>
                <button
                  onClick={() => setIsProfileModalOpen(true)}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-xs font-bold transition-all border border-white/20 active:scale-95 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-orange-300" />
                  <span>Profil & Akses</span>
                </button>
              </div>
            </div>
          </div>

          {/* 1. Filter Bar (Warehouse, Date, Search) */}
          <FilterBar />

          {/* 2. 11 KPI Metrics Grid */}
          <MetricGrid />

          {/* 3. Semi-Circle Progress Gauges */}
          <GaugeSection />

          {/* 4. Report Section with 5 Interactive Data Tables */}
          <ReportSection />

        </main>

        {/* Global Footer */}
        <footer className="w-full py-4 px-6 border-t border-slate-200/90 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400 glass-nav">
          <div className="max-w-[1700px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>© 2026 VMS Logistics • Danantara Indonesia Sovereign Fund ✕ POS IND</span>
            <div className="flex items-center space-x-4 text-[11px]">
              <span className="hover:text-[#ff5900] cursor-pointer">SOP Work Order</span>
              <span>•</span>
              <span className="hover:text-[#ff5900] cursor-pointer">Bantuan POS IND</span>
              <span>•</span>
              <span className="text-emerald-500 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Node KCU Aktif
              </span>
            </div>
          </div>
        </footer>

      </div>

      {/* Global Interactive Modals */}
      <SerialNumberModal />
      <ProfileModal />
      <AddTransactionModal />
      <Toast />

    </div>
  );
};

export const App = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <AppWrapper />
      </DataProvider>
    </AuthProvider>
  );
};

const AppWrapper = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <DashboardContent />;
};

export default App;
