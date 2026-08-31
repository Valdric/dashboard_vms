import React from 'react';
import { 
  Layers, 
  ArrowUpFromLine, 
  ArrowDownToLine,
  ClipboardCheck, 
  BarChart3, 
  RotateCcw,
  FileCheck2,
  AlertTriangle,
  Server,
  ShieldCheck,
  Users, 
  X, 
  Globe, 
  ChevronRight,
  Package
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { BrandLogo } from '../common/BrandLogo';

export const Sidebar = ({ isOpen, onClose }) => {
  const { 
    activeTab, 
    setActiveTab, 
    setIsProfileModalOpen, 
    inboundData, 
    outboundData, 
    returData,
    exceptionsData,
    documentsData
  } = useData();

  const navigation = [
    { 
      group: 'Modul Operasional WMS',
      items: [
        { name: 'DO Inbound & Receiving', tab: 'Inbound', icon: ArrowDownToLine, count: inboundData.length },
        { name: 'Inventory & Stock On Hand', tab: 'Stock On Hand', icon: Layers, badge: '4.5k' },
        { name: 'Put Away Lokasi Rak', tab: 'Putaway', icon: ClipboardCheck },
        { name: 'DO Outbound & Last Mile', tab: 'Outbound', icon: ArrowUpFromLine, count: outboundData.length },
        { name: 'Manajemen Retur', tab: 'Retur', icon: RotateCcw, count: returData.length },
      ]
    },
    {
      group: 'Administrasi & Monitoring',
      items: [
        { name: 'Pusat BAST & Dokumen', tab: 'Documents', icon: FileCheck2, count: documentsData.length },
        { name: 'Exception & Kendala', tab: 'Exceptions', icon: AlertTriangle, count: exceptionsData.length > 0 ? `${exceptionsData.length}` : null, isAlert: exceptionsData.length > 0 },
        { name: 'Integrasi API Gateway', tab: 'Integrations', icon: Server, badge: '5 API' },
        { name: 'Matriks Nasional 16 KCU', tab: 'Summary', icon: BarChart3 },
        { name: 'Audit Trail & Log', tab: 'Audit Trail', icon: ShieldCheck },
      ]
    }
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
          fixed top-0 left-0 h-screen w-[270px] z-50
          flex flex-col
          bg-white dark:bg-[#080e1f]
          border-r border-slate-200 dark:border-slate-800/80
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* ── Header: Logo kiri atas (Danantara + Pos Indonesia) ── */}
        <div className="h-[72px] flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800 flex-shrink-0 bg-white dark:bg-[#080e1f]">
          <BrandLogo size="normal" showText={true} />

          {/* Close button mobile only */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex-shrink-0 cursor-pointer"
            aria-label="Tutup sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Navigation Links (scrollable) ── */}
        <div className="flex-1 overflow-y-auto py-3 px-3 space-y-5">
          {navigation.map((section) => (
            <div key={section.group}>
              {/* Section Label */}
              <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600">
                {section.group}
              </p>

              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.tab;

                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => handleNavClick(item.tab)}
                      className={`
                        w-full flex items-center justify-between px-3 py-2.5
                        rounded-xl text-xs font-semibold
                        transition-all duration-150 group cursor-pointer
                        ${isActive
                          ? 'bg-gradient-to-r from-[#091c52] to-[#0e2b7a] text-white shadow-md shadow-blue-900/25'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                        }
                      `}
                    >
                      {/* Icon + Label */}
                      <span className="flex items-center gap-2.5 truncate">
                        <span className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center ${
                          isActive
                            ? 'bg-white/15'
                            : 'bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'
                        }`}>
                          <Icon className={`w-3.5 h-3.5 ${
                            isActive ? 'text-[#ff5900]' : 'text-slate-500 dark:text-slate-400 group-hover:text-[#ff5900]'
                          }`} />
                        </span>
                        <span className="truncate leading-tight">{item.name}</span>
                      </span>

                      {/* Badge / Count */}
                      {item.badge && (
                        <span className="flex-shrink-0 text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold font-mono border border-emerald-200 dark:border-emerald-900">
                          {item.badge}
                        </span>
                      )}
                      {item.count && !item.badge && (
                        <span className={`flex-shrink-0 text-[10px] px-1.5 py-0.5 rounded-md font-bold font-mono ${
                          item.isAlert
                            ? 'bg-rose-500 text-white animate-pulse'
                            : isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                        }`}>
                          {item.count}
                        </span>
                      )}
                      {!item.badge && !item.count && (
                        <ChevronRight className={`w-3 h-3 flex-shrink-0 transition-opacity ${
                          isActive ? 'text-[#ff5900] opacity-100' : 'opacity-0 group-hover:opacity-60 text-slate-400'
                        }`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* ── Tata Kelola Section ── */}
          <div>
            <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600">
              Tata Kelola & Hak Akses
            </p>
            <button
              type="button"
              onClick={handleProfileClick}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-[#ff5900] transition-all group cursor-pointer"
            >
              <span className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg flex items-center justify-center bg-orange-50 dark:bg-orange-950/40 group-hover:bg-orange-100 dark:group-hover:bg-orange-900/50 transition-colors">
                  <Users className="w-3.5 h-3.5 text-[#ff5900]" />
                </span>
                <span>Kelola User & Matriks RACI</span>
              </span>
              <span className="flex-shrink-0 text-[10px] bg-orange-100 dark:bg-orange-950 text-[#ff5900] px-1.5 py-0.5 rounded-md font-bold border border-orange-200 dark:border-orange-900/50">
                7 Peran
              </span>
            </button>
          </div>
        </div>

        {/* ── Bottom Status Card ── */}
        <div className="p-3 flex-shrink-0 border-t border-slate-200 dark:border-slate-800">
          <div className="p-3 rounded-xl bg-gradient-to-br from-[#091c52] to-[#0a1a40] border border-blue-500/20 shadow-lg">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Globe className="w-3 h-3 text-[#ff5900] flex-shrink-0" />
              <span className="text-[10px] font-bold text-[#ff5900] uppercase tracking-wider">
                Live Telemetri WMS
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              Terhubung ke SLP Tangsel & 15 KCU Nasional.
            </p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                Live Sync Active
              </span>
              <span className="text-[10px] text-sky-300 bg-blue-900/70 px-1.5 py-0.5 rounded border border-blue-700/50 font-mono">
                SKB v2026
              </span>
            </div>
          </div>
        </div>

      </aside>
    </>
  );
};
