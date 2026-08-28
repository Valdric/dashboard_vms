import React, { useState } from 'react';
import { 
  Building2, 
  Calendar, 
  Search, 
  RotateCw, 
  Filter
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const FilterBar = () => {
  const { 
    warehouses, 
    selectedWarehouse, 
    setSelectedWarehouse, 
    dateRange, 
    setDateRange,
    showToast 
  } = useData();

  const [tempWarehouse, setTempWarehouse] = useState(selectedWarehouse);
  const [startDate, setStartDate] = useState(dateRange.start);
  const [endDate, setEndDate] = useState(dateRange.end);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleApplyFilter = () => {
    setSelectedWarehouse(tempWarehouse);
    setDateRange({ start: startDate, end: endDate });
    showToast(`Filter KCU diterapkan: ${tempWarehouse} (${startDate} s/d ${endDate})`, 'info');
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Data telemetri VMS Danantara x POS IND diperbarui!', 'success');
    }, 600);
  };

  return (
    <div className="w-full glass-card rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/90 dark:border-slate-800 mb-6">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* Left: Warehouse & Date Pickers */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Warehouse Dropdown */}
          <div className="relative flex-1 sm:flex-initial min-w-[230px]">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#ff5900]" />
              Pilih Kantor Pos / KCU Hub
            </label>
            <div className="relative">
              <select
                value={tempWarehouse}
                onChange={(e) => setTempWarehouse(e.target.value)}
                className="w-full pl-3.5 pr-8 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#ff5900]/40 transition-all appearance-none cursor-pointer"
              >
                {warehouses.map((wh) => (
                  <option key={wh} value={wh} className="dark:bg-[#0b1329] text-xs">
                    {wh}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-slate-400">
                <Filter className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Date Range Picker */}
          <div className="flex-1 sm:flex-initial">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#0e2b7a] dark:text-sky-400" />
              Periode Work Order
            </label>
            <div className="flex items-center space-x-2 bg-slate-50 dark:bg-[#0b1329] p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-2.5 py-1 text-xs font-medium bg-transparent text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
              />
              <span className="text-slate-400 text-xs font-medium">to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-2.5 py-1 text-xs font-medium bg-transparent text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* Search Button (Navy Blue with Orange Glow) */}
          <div className="flex items-end self-end">
            <button
              onClick={handleApplyFilter}
              className="flex items-center space-x-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#0e2b7a] to-[#1a4ca8] hover:from-[#091c52] hover:to-[#0e2b7a] text-white text-xs font-bold shadow-md shadow-blue-900/30 transition-all duration-200 active:scale-95 border border-blue-400/20"
            >
              <Search className="w-4 h-4 text-[#ff5900]" />
              <span>Search</span>
            </button>
          </div>

        </div>

        {/* Right: Quick Stats & Live Refresh */}
        <div className="flex items-center justify-between lg:justify-end gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400 dark:text-slate-500">Cabang:</span>
            <span className="font-bold text-[#0e2b7a] dark:text-sky-300 bg-blue-50 dark:bg-[#091c52]/60 px-2.5 py-1 rounded-lg border border-blue-200 dark:border-blue-900/60 truncate max-w-[200px]">
              {selectedWarehouse}
            </span>
          </div>

          <button
            onClick={handleRefresh}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[#ff5900] transition-colors"
            title="Refresh Data"
            aria-label="Refresh Data"
          >
            <RotateCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[#ff5900]' : ''}`} />
          </button>
        </div>

      </div>
    </div>
  );
};
