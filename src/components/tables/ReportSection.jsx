import React, { useState, useMemo } from 'react';
import { 
  FileSpreadsheet, 
  QrCode, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  ArrowUpFromLine, 
  ClipboardCheck, 
  BarChart3,
  FileText,
  Plus
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { StockOnHandTable } from './StockOnHandTable';
import { OutboundTable } from './OutboundTable';
import { WorkOrderTable } from './WorkOrderTable';
import { PutawayTable } from './PutawayTable';
import { SummaryTable } from './SummaryTable';

export const ReportSection = () => {
  const { 
    activeTab, 
    setActiveTab, 
    searchQuery, 
    setSearchQuery,
    workOrderData,
    putawayData,
    stockOnHandData,
    outboundData,
    summaryData,
    exportToCSV,
    setIsAddTxModalOpen
  } = useData();

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const tabs = [
    { id: 'Work Order', label: 'Work Order (WO)', icon: FileText, count: workOrderData.length },
    { id: 'Stock On Hand', label: 'Stock On Hand & SKU', icon: Layers, count: stockOnHandData.length },
    { id: 'Putaway', label: 'Putaway', icon: ClipboardCheck, count: putawayData.length },
    { id: 'Outbound', label: 'Outbound Logistics', icon: ArrowUpFromLine, count: outboundData.length },
    { id: 'Summary', label: 'National Summary', icon: BarChart3, count: summaryData.length }
  ];

  // Current active data set
  const currentDataset = useMemo(() => {
    switch (activeTab) {
      case 'Work Order': return workOrderData;
      case 'Putaway': return putawayData;
      case 'Stock On Hand': return stockOnHandData;
      case 'Outbound': return outboundData;
      case 'Summary': return summaryData;
      default: return workOrderData;
    }
  }, [activeTab, workOrderData, putawayData, stockOnHandData, outboundData, summaryData]);

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
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span>Report & Data Telemetri VMS</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Penerbitan Work Order, registrasi SKU modem/barang, penerbitan serial number, dan distribusi POS IND
          </p>
        </div>

        {/* Tab Buttons with Navy & Orange styling */}
        <div className="flex items-center space-x-1.5 p-1.5 bg-slate-100 dark:bg-[#091329] rounded-2xl overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-[#0e2b7a] to-[#1a4ca8] text-white shadow-md shadow-blue-900/30 scale-[1.02]'
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

      {/* Table Controls (Entries Selector, Search, XLSX Buttons) */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 my-5">
        
        {/* Left: Show Entries Selector */}
        <div className="flex items-center space-x-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
          <span>Show</span>
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
          <span>entries</span>
        </div>

        {/* Right: Search + XLSX Download Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          
          {/* Search Box */}
          <div className="relative flex-1 sm:flex-initial min-w-[220px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search WO, SKU, Serial Number..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3.5 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff5900]/40 transition-all"
            />
          </div>

          {/* Green XLSX Button */}
          <button
            onClick={() => exportToCSV(activeTab)}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-[#0d9488] hover:bg-[#0f766e] text-white text-xs font-bold shadow-sm transition-all active:scale-95"
            title="Download Excel XLSX"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>XLSX</span>
          </button>

          {/* Barcode XLSX Button */}
          {(activeTab === 'Stock On Hand' || activeTab === 'Work Order') && (
            <button
              onClick={() => exportToCSV('Serial Numbers & Barcodes')}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-[#0e2b7a] hover:bg-[#091c52] text-white text-xs font-bold shadow-sm transition-all active:scale-95 border border-blue-400/20"
              title="Download Serial Numbers & Barcodes"
            >
              <QrCode className="w-4 h-4 text-[#ff5900]" />
              <span>Barcode XLSX</span>
            </button>
          )}

          {/* Add Record Quick Button */}
          <button
            onClick={() => setIsAddTxModalOpen(true)}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#ff5900] to-[#ea4e00] hover:from-[#ea4e00] hover:to-[#c23b00] text-white text-xs font-bold shadow-md shadow-orange-500/20 transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Buat Work Order</span>
          </button>

        </div>
      </div>

      {/* Active Table Rendering */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-inner bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm">
        {activeTab === 'Work Order' && <WorkOrderTable data={paginatedData} />}
        {activeTab === 'Stock On Hand' && <StockOnHandTable data={paginatedData} />}
        {activeTab === 'Putaway' && <PutawayTable data={paginatedData} />}
        {activeTab === 'Outbound' && <OutboundTable data={paginatedData} />}
        {activeTab === 'Summary' && <SummaryTable data={paginatedData} />}
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 pt-3 text-xs text-slate-500 dark:text-slate-400">
        <div>
          Showing {totalEntries === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + entriesPerPage, totalEntries)} of {totalEntries} entries
          {searchQuery && ' (filtered from total records)'}
        </div>

        {/* Pagination Buttons */}
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
