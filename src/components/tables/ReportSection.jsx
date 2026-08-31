import React, { useState, useMemo } from 'react';
import { 
  FileSpreadsheet, 
  QrCode, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
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
  Plus
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { InboundTable } from './InboundTable';
import { StockOnHandTable } from './StockOnHandTable';
import { PutawayTable } from './PutawayTable';
import { OutboundTable } from './OutboundTable';
import { ReturTable } from './ReturTable';
import { DocumentCenterTable } from './DocumentCenterTable';
import { ExceptionTable } from './ExceptionTable';
import { IntegrationMonitorTable } from './IntegrationMonitorTable';
import { AuditTrailTable } from './AuditTrailTable';
import { SummaryTable } from './SummaryTable';

export const ReportSection = () => {
  const { 
    activeTab, 
    setActiveTab, 
    searchQuery, 
    setSearchQuery,
    inboundData,
    putawayData,
    stockOnHandData,
    outboundData,
    returData,
    documentsData,
    exceptionsData,
    integrationsData,
    auditTrailData,
    summaryData,
    exportToCSV,
    setIsAddTxModalOpen
  } = useData();

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const tabs = [
    { id: 'Inbound', label: 'DO Inbound & Receiving', icon: ArrowDownToLine, count: inboundData.length },
    { id: 'Stock On Hand', label: 'Inventory & Serial Number', icon: Layers, count: stockOnHandData.length },
    { id: 'Putaway', label: 'Put Away Lokasi', icon: ClipboardCheck, count: putawayData.length },
    { id: 'Outbound', label: 'DO Outbound & Last Mile', icon: ArrowUpFromLine, count: outboundData.length },
    { id: 'Retur', label: 'Manajemen Retur', icon: RotateCcw, count: returData.length },
    { id: 'Documents', label: 'Pusat BAST & Surat Jalan', icon: FileCheck2, count: documentsData.length },
    { id: 'Exceptions', label: 'Exception & Kendala', icon: AlertTriangle, count: exceptionsData.length },
    { id: 'Integrations', label: 'Integrasi API Gateway', icon: Server, count: integrationsData.length },
    { id: 'Summary', label: 'Matriks Nasional 16 KCU', icon: BarChart3, count: summaryData.length },
    { id: 'Audit Trail', label: 'Audit Trail & Log', icon: ShieldCheck, count: auditTrailData.length }
  ];

  // Current active dataset
  const currentDataset = useMemo(() => {
    switch (activeTab) {
      case 'Inbound': return inboundData;
      case 'Putaway': return putawayData;
      case 'Stock On Hand': return stockOnHandData;
      case 'Outbound': return outboundData;
      case 'Retur': return returData;
      case 'Documents': return documentsData;
      case 'Exceptions': return exceptionsData;
      case 'Integrations': return integrationsData;
      case 'Summary': return summaryData;
      case 'Audit Trail': return auditTrailData;
      default: return inboundData;
    }
  }, [
    activeTab, 
    inboundData, 
    putawayData, 
    stockOnHandData, 
    outboundData, 
    returData, 
    documentsData, 
    exceptionsData, 
    integrationsData, 
    summaryData, 
    auditTrailData
  ]);

  // Paginated dataset
  const totalEntries = currentDataset.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / entriesPerPage));
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedData = currentDataset.slice(startIndex, startIndex + entriesPerPage);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentPage(1);
  };

  return (
    <div className="glass-card rounded-2xl shadow-sm border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 mb-12">
      
      {/* Title & Tabs Navigation */}
      <div className="flex flex-col gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span>Data Operasional & Telemetri Fulfillment</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ff5900] text-white">
                Live SKB 2026
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Fulfillment terintegrasi Mitra Mora Republic (MyRepublic) ✕ PT Pos Indonesia (Persero)
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsAddTxModalOpen(true)}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#ff5900] hover:bg-[#ea4e00] text-white text-xs font-bold shadow-md shadow-orange-500/25 transition-all cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>+ Buat Transaksi Baru</span>
            </button>
          </div>
        </div>

        {/* Tab Buttons Horizontal Scrollable */}
        <div className="flex items-center space-x-1.5 p-1.5 bg-slate-100 dark:bg-[#091329] rounded-2xl overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-[#0e2b7a] via-[#123896] to-[#ff5900] text-white shadow-md shadow-blue-900/30 scale-[1.02]'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#ff5900]' : ''}`} />
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${isActive ? 'bg-[#ff5900] text-white font-bold' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Table Controls (Show entries, Search, Export buttons) */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 my-5">
        
        {/* Left: Show entries */}
        <div className="flex items-center space-x-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
          <span>Tampilkan</span>
          <select
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#ff5900]/40 cursor-pointer"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span>data per halaman</span>
        </div>

        {/* Right: Search & Export */}
        <div className="flex flex-wrap items-center gap-2.5">
          
          {/* Search Box */}
          <div className="relative flex-1 sm:flex-initial min-w-[240px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder={`Cari data pada modul ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3.5 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff5900]/40 transition-all"
            />
          </div>

          {/* Export CSV / XLSX Button */}
          <button
            onClick={() => exportToCSV(activeTab)}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-[#0d9488] hover:bg-[#0f766e] text-white text-xs font-bold shadow-sm transition-all active:scale-95 cursor-pointer"
            title="Download Spreadsheet CSV / XLSX"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Ekspor XLSX</span>
          </button>

          {/* Barcode Export Button */}
          {(activeTab === 'Stock On Hand' || activeTab === 'Inbound') && (
            <button
              onClick={() => exportToCSV('Serial Numbers & Barcode')}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-[#0e2b7a] hover:bg-[#091c52] text-white text-xs font-bold shadow-sm transition-all active:scale-95 border border-blue-400/20 cursor-pointer"
              title="Download Serial Numbers & Barcodes"
            >
              <QrCode className="w-4 h-4 text-[#ff5900]" />
              <span>Barcode XLSX</span>
            </button>
          )}

        </div>
      </div>

      {/* Active Table Rendering */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-inner bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm">
        {activeTab === 'Inbound' && <InboundTable data={paginatedData} />}
        {activeTab === 'Stock On Hand' && <StockOnHandTable data={paginatedData} />}
        {activeTab === 'Putaway' && <PutawayTable data={paginatedData} />}
        {activeTab === 'Outbound' && <OutboundTable data={paginatedData} />}
        {activeTab === 'Retur' && <ReturTable data={paginatedData} />}
        {activeTab === 'Documents' && <DocumentCenterTable data={paginatedData} />}
        {activeTab === 'Exceptions' && <ExceptionTable data={paginatedData} />}
        {activeTab === 'Integrations' && <IntegrationMonitorTable data={paginatedData} />}
        {activeTab === 'Summary' && <SummaryTable data={paginatedData} />}
        {activeTab === 'Audit Trail' && <AuditTrailTable data={paginatedData} />}
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 pt-3 text-xs text-slate-500 dark:text-slate-400">
        <div>
          Menampilkan {totalEntries === 0 ? 0 : startIndex + 1} s/d {Math.min(startIndex + entriesPerPage, totalEntries)} dari {totalEntries} entri data
          {searchQuery && ' (difilter berdasarkan pencarian)'}
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center space-x-1">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-slate-600 dark:text-slate-300"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                currentPage === pageNum
                  ? 'bg-[#ff5900] text-white shadow-sm shadow-orange-500/30'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-slate-600 dark:text-slate-300"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
