import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Copy, 
  Check, 
  Plus, 
  Trash2, 
  QrCode, 
  Boxes,
  Building2,
  Tag,
  Layers
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const SerialNumberModal = () => {
  const { 
    isSNModalOpen, 
    closeSNModal, 
    selectedStockForSN, 
    serialNumbers, 
    addSerialNumber, 
    updateSerialNumber, 
    deleteSerialNumber,
    showToast 
  } = useData();

  const [searchSN, setSearchSN] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [newSerialInput, setNewSerialInput] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('All'); // All, Ready, Booked, Damage

  if (!isSNModalOpen || !selectedStockForSN) return null;

  const sku = selectedStockForSN.sku;
  const list = serialNumbers[sku] || [];

  // Filtered serials
  const filteredList = list.filter(item => {
    const matchSearch = searchSN === '' || 
      item.serial.toLowerCase().includes(searchSN.toLowerCase()) || 
      (item.location && item.location.toLowerCase().includes(searchSN.toLowerCase())) ||
      (item.woNumber && item.woNumber.toLowerCase().includes(searchSN.toLowerCase()));
    const matchStatus = filterStatus === 'All' || item.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalEntries = filteredList.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / entriesPerPage));
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedList = filteredList.slice(startIndex, startIndex + entriesPerPage);

  const handleCopy = (serial, id) => {
    navigator.clipboard.writeText(serial);
    setCopiedId(id);
    showToast(`Serial ${serial} disalin ke clipboard!`, 'info');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddSerial = (e) => {
    e.preventDefault();
    if (!newSerialInput.trim()) {
      const autoSN = `32466${Math.floor(100000 + Math.random() * 900000)}`;
      addSerialNumber(sku, { serial: autoSN, status: 'Ready', location: 'Rack Utama', woNumber: 'WO-AUTO' });
    } else {
      addSerialNumber(sku, { serial: newSerialInput.trim(), status: 'Ready', location: 'Rack Utama', woNumber: 'WO-MANUAL' });
      setNewSerialInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col glass-card rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-slide-up bg-white dark:bg-[#0d1527]">
        
        {/* Compact Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-[#091329] flex-shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-xl bg-orange-100 dark:bg-orange-950 text-[#ff5900]">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  SN List — {selectedStockForSN.product}
                </h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#0e2b7a] text-white">
                  SKU: {selectedStockForSN.sku}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                Penerbitan serial number perangkat VMS (Danantara x POS IND)
              </p>
            </div>
          </div>

          <button
            onClick={closeSNModal}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Compact Meta Summary Bar */}
        <div className="px-5 py-2.5 bg-slate-50/60 dark:bg-[#070c18] border-b border-slate-200 dark:border-slate-800 text-xs flex-shrink-0">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
            <div className="bg-white dark:bg-[#0b1329] px-2.5 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <Tag className="w-3 h-3 text-[#ff5900]" /> SKU
              </span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{selectedStockForSN.sku}</span>
            </div>

            <div className="bg-white dark:bg-[#0b1329] px-2.5 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <Layers className="w-3 h-3 text-sky-400" /> Total Unit
              </span>
              <span className="font-bold text-[#ff5900]">{selectedStockForSN.total} Items</span>
            </div>

            <div className="bg-white dark:bg-[#0b1329] px-2.5 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <Boxes className="w-3 h-3 text-indigo-400" /> Satuan
              </span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{selectedStockForSN.uom || 'PCS'}</span>
            </div>

            <div className="bg-white dark:bg-[#0b1329] px-2.5 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <Building2 className="w-3 h-3 text-emerald-400" /> Gudang
              </span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[90px]">{selectedStockForSN.warehouse}</span>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-3">
          
          {/* Quick Input Bar */}
          <form onSubmit={handleAddSerial} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Ketik No. Serial baru (atau klik untuk auto-generate)..."
              value={newSerialInput}
              onChange={(e) => setNewSerialInput(e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#ff5900]/40"
            />
            <button
              type="submit"
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-[#ff5900] hover:bg-[#ea4e00] text-white text-xs font-bold shadow-sm transition-all whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Terbitkan SN</span>
            </button>
          </form>

          {/* Controls: Show Entries, Status Filter, Search */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 dark:text-slate-400">
              <span>Show</span>
              <select
                value={entriesPerPage}
                onChange={(e) => {
                  setEntriesPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-0.5 rounded-lg bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-xs font-semibold"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              <span>entries</span>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#091329] p-0.5 rounded-xl text-[11px]">
              {['All', 'Ready', 'Booked', 'Damage'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-2.5 py-0.5 rounded-lg font-semibold transition-all ${
                    filterStatus === st
                      ? 'bg-[#0e2b7a] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Search SN */}
            <div className="relative min-w-[150px]">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-3 h-3" />
              </div>
              <input
                type="text"
                placeholder="Search SN..."
                value={searchSN}
                onChange={(e) => {
                  setSearchSN(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-7 pr-2.5 py-1 text-[11px] rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Compact Table */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
              <thead className="bg-[#091c52] dark:bg-[#071330] text-white uppercase text-[10px] font-bold tracking-wider select-none">
                <tr>
                  <th className="py-2.5 px-3 w-10 text-center">#</th>
                  <th className="py-2.5 px-3 min-w-[170px]">Ready (Siap Pasang)</th>
                  <th className="py-2.5 px-3 min-w-[110px] text-center">Booked</th>
                  <th className="py-2.5 px-3 min-w-[110px] text-center">Damage</th>
                  <th className="py-2.5 px-3 text-center w-24">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-[11px]">
                {paginatedList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-slate-400 font-medium">
                      Tidak ada serial number yang cocok.
                    </td>
                  </tr>
                ) : (
                  paginatedList.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-2 px-3 text-center font-medium text-slate-400">
                        {startIndex + idx + 1}
                      </td>

                      {/* Ready Column */}
                      <td className="py-2 px-3 font-mono font-bold text-slate-800 dark:text-slate-200">
                        {item.status === 'Ready' ? (
                          <div className="flex items-center space-x-2">
                            <span className="tracking-tighter font-extrabold text-slate-400 select-none text-[10px]">|||| || |||</span>
                            <span className="text-slate-900 dark:text-white font-bold">{item.serial}</span>
                            <button
                              onClick={() => handleCopy(item.serial, item.id)}
                              className="p-0.5 text-slate-400 hover:text-[#ff5900]"
                              title="Salin Serial"
                            >
                              {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                            </button>
                          </div>
                        ) : (
                          <span className="text-slate-400 dark:text-slate-600">-</span>
                        )}
                      </td>

                      {/* Booked Column */}
                      <td className="py-2 px-3 text-center font-mono">
                        {item.status === 'Booked' ? (
                          <span className="text-amber-600 dark:text-amber-400 font-bold">{item.serial}</span>
                        ) : (
                          <span className="text-slate-400 dark:text-slate-600">-</span>
                        )}
                      </td>

                      {/* Damage Column */}
                      <td className="py-2 px-3 text-center font-mono">
                        {item.status === 'Damage' ? (
                          <span className="text-rose-600 dark:text-rose-400 font-bold">{item.serial}</span>
                        ) : (
                          <span className="text-slate-400 dark:text-slate-600">-</span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="py-2 px-3 text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <select
                            value={item.status}
                            onChange={(e) => updateSerialNumber(sku, item.id, { status: e.target.value })}
                            className="text-[10px] py-0.5 px-1.5 rounded-md bg-slate-100 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer"
                          >
                            <option value="Ready">Ready</option>
                            <option value="Booked">Booked</option>
                            <option value="Damage">Damage</option>
                          </select>
                          <button
                            onClick={() => deleteSerialNumber(sku, item.id)}
                            className="p-1 text-slate-400 hover:text-rose-500"
                            title="Hapus Serial"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>

        {/* Compact Modal Footer */}
        <div className="flex items-center justify-between px-5 py-3 bg-slate-50/90 dark:bg-[#091329] border-t border-slate-200 dark:border-slate-800 flex-shrink-0">
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Showing {totalEntries === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + entriesPerPage, totalEntries)} of {totalEntries} entries
          </div>

          <button
            onClick={closeSNModal}
            className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
