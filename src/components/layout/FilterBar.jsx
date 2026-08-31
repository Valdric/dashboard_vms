import React from 'react';
import { 
  Building2, 
  Calendar, 
  Search, 
  Filter, 
  RotateCcw, 
  MapPin,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const FilterBar = () => {
  const { 
    warehouses, 
    selectedWarehouse, 
    setSelectedWarehouse, 
    dateRange, 
    setDateRange, 
    searchQuery, 
    setSearchQuery 
  } = useData();

  return (
    <div className="glass-card rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/90 dark:border-slate-800 mb-6 transition-all">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* Left: Warehouse & Date Selectors */}
        <div className="flex flex-wrap items-center gap-3 flex-1">
          
          {/* Warehouse Dropdown */}
          <div className="relative flex-1 sm:flex-initial min-w-[240px]">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
              Gudang Warehouse / Sentral Logistik
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Building2 className="w-4 h-4 text-[#ff5900]" />
              </div>
              <select
                value={selectedWarehouse}
                onChange={(e) => setSelectedWarehouse(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#ff5900]/40 transition-all cursor-pointer truncate"
              >
                {warehouses.map((wh) => (
                  <option key={wh} value={wh}>
                    {wh}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date Range Start */}
          <div className="flex-1 sm:flex-initial min-w-[150px]">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
              Periode Awal
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
              </div>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#ff5900]/40 transition-all"
              />
            </div>
          </div>

          {/* Date Range End */}
          <div className="flex-1 sm:flex-initial min-w-[150px]">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
              Periode Akhir
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
              </div>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#ff5900]/40 transition-all"
              />
            </div>
          </div>

        </div>

        {/* Right: Quick Search Box */}
        <div className="w-full lg:w-80">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
            Pencarian Global
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Cari DO, SKU, Resi, Serial..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff5900]/40 transition-all"
            />
          </div>
        </div>

      </div>
    </div>
  );
};
