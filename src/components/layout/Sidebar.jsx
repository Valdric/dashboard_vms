import React from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  ArrowUpFromLine, 
  ClipboardCheck, 
  BarChart3, 
  Users, 
  X, 
  FileText,
  Globe,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { BrandLogo } from '../common/BrandLogo';

export const Sidebar = ({ isOpen, onClose }) => {
  const { activeTab, setActiveTab, setIsProfileModalOpen, workOrderData, outboundData } = useData();

  const navigation = [
    { name: 'Dashboard Overview', tab: 'Stock On Hand', icon: LayoutDashboard, badge: 'Live' },
    { name: 'Work Order (WO)', tab: 'Work Order', icon: FileText, count: workOrderData.length },
    { name: 'Stock On Hand & SKU', tab: 'Stock On Hand', icon: Layers, count: '4.5k' },
    { name: 'Putaway Verification', tab: 'Putaway', icon: ClipboardCheck },
    { name: 'Outbound Logistics', tab: 'Outbound', icon: ArrowUpFromLine, count: outboundData.length },
    { name: 'National Summary', tab: 'Summary', icon: BarChart3 },
  ];

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    onClose();
  };

  const handleProfileClick = () => {
    setIsProfileModalOpen(true);
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-72 z-50
          transition-transform duration-300 ease-in-out
          glass-nav border-r border-slate-200/90 dark:border-slate-800
          flex flex-col justify-between
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* Header & Brand with uploaded logo */}
        <div className="flex-1 overflow-y-auto">
          <div className="h-16 flex items-center justify-between px-5 border-b border-slate-200/90 dark:border-slate-800">
            <BrandLogo size="normal" showText={true} />

            {/* Mobile Close Button */}
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex-shrink-0"
              aria-label="Tutup sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="px-4 py-5 space-y-1">
            <p className="px-3 pb-2 pt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Modul Operasional VMS
            </p>

            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.tab;

              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => handleNavClick(item.tab)}
                  className={`
                    w-full flex items-center justify-between px-3.5 py-2.5
                    rounded-2xl text-xs font-semibold
                    transition-all duration-200 group
                    ${isActive
                      ? 'bg-gradient-to-r from-[#0e2b7a] via-[#123896] to-[#ff5900] text-white shadow-md shadow-blue-900/30 translate-x-1'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-blue-50/80 dark:hover:bg-[#0e2b7a]/30 hover:text-[#0e2b7a] dark:hover:text-white'
                    }
                  `}
                >
                  <span className="flex items-center space-x-3">
                    <Icon
                      className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110
                        ${isActive ? 'text-[#ff5900]' : 'text-slate-400 group-hover:text-[#ff5900]'}
                      `}
                    />
                    <span>{item.name}</span>
                  </span>

                  <span className="flex items-center gap-1.5">
                    {item.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ff5900]/20 text-[#ff5900] dark:text-orange-300 font-bold border border-[#ff5900]/30 leading-tight">
                        {item.badge}
                      </span>
                    )}
                    {item.count && !item.badge && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold leading-tight ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}>
                        {item.count}
                      </span>
                    )}
                    {!item.badge && !item.count && (
                      <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'text-white opacity-100' : 'text-slate-400'}`} />
                    )}
                  </span>
                </button>
              );
            })}

            {/* Manajemen Pengguna Section */}
            <div className="pt-4">
              <p className="px-3 pb-2 pt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Manajemen Akses
              </p>

              <button
                type="button"
                onClick={handleProfileClick}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-[#ff5900] transition-all duration-200 group"
              >
                <span className="flex items-center space-x-3">
                  <Users className="w-4 h-4 text-[#ff5900] group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span>Kelola Profil & Tim</span>
                </span>
                <span className="text-[10px] bg-orange-100 dark:bg-orange-950 text-[#ff5900] px-2 py-0.5 rounded-full font-bold border border-orange-200 dark:border-orange-900/50">
                  CRUD
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Danantara x POS IND Sync Badge */}
        <div className="p-4 flex-shrink-0">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#091c52] via-[#0d2862] to-[#070c18] border border-blue-500/20 relative overflow-hidden shadow-lg">
            <div className="flex items-center space-x-2 text-[#ff5900] mb-1">
              <Globe className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Danantara x POS IND</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              Sovereign Asset & Logistics Hub terhubung ke 16 KCU Nasional.
            </p>
            <div className="mt-2.5 flex items-center justify-between">
              <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                Live Telemetry
              </span>
              <span className="text-[10px] text-sky-200 bg-blue-950/80 px-2 py-0.5 rounded-md border border-blue-800/60 font-mono">
                v3.2 VMS
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
