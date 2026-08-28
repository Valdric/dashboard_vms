import React from 'react';
import { ArrowUpDown, Trash2, CheckCircle2, Clock, AlertCircle, QrCode, PlusCircle, Sparkles } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const WorkOrderTable = ({ data }) => {
  const { deleteTransaction, openSNModal, generateSerialsForWO, stockOnHandData } = useData();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Complete':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
            <CheckCircle2 className="w-3 h-3" />
            Complete
          </span>
        );
      case 'Partial':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
            <Clock className="w-3 h-3" />
            Partial
          </span>
        );
      case 'Request':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-[#0e2b7a]/50 text-[#0e2b7a] dark:text-sky-300 border border-blue-200 dark:border-blue-800/60">
            <AlertCircle className="w-3 h-3" />
            Request
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {status}
          </span>
        );
    }
  };

  const handleOpenSNForWO = (wo) => {
    // Find matching stock on hand or create mock reference
    let matched = stockOnHandData.find(s => s.sku === wo.sku);
    if (!matched) {
      matched = {
        sku: wo.sku,
        product: wo.product,
        uom: 'PCS',
        warehouse: wo.warehouse,
        total: wo.totalQty,
        ready: wo.totalQty,
        booked: 0,
        damage: 0
      };
    }
    openSNModal(matched);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
        <thead className="bg-[#091c52] dark:bg-[#071330] text-white uppercase text-[11px] font-bold tracking-wider select-none">
          <tr>
            <th className="py-3.5 px-4 rounded-tl-xl w-12 text-center">
              <span className="flex items-center justify-center gap-1"># <ArrowUpDown className="w-3 h-3 opacity-60" /></span>
            </th>
            <th className="py-3.5 px-4 min-w-[110px]">
              <span className="flex items-center gap-1">Tanggal <ArrowUpDown className="w-3 h-3 opacity-60" /></span>
            </th>
            <th className="py-3.5 px-4 min-w-[180px]">
              <span className="flex items-center gap-1">Nomor Work Order (WO) <ArrowUpDown className="w-3 h-3 opacity-60" /></span>
            </th>
            <th className="py-3.5 px-4 min-w-[120px]">
              <span className="flex items-center gap-1">SKU Barang <ArrowUpDown className="w-3 h-3 opacity-60" /></span>
            </th>
            <th className="py-3.5 px-4 min-w-[200px]">
              <span className="flex items-center gap-1">Jenis Barang / Modem <ArrowUpDown className="w-3 h-3 opacity-60" /></span>
            </th>
            <th className="py-3.5 px-4 min-w-[180px]">
              <span className="flex items-center gap-1">Gudang / KCU <ArrowUpDown className="w-3 h-3 opacity-60" /></span>
            </th>
            <th className="py-3.5 px-3 text-center w-20">
              <span className="flex items-center justify-center gap-1">Total Qty <ArrowUpDown className="w-3 h-3 opacity-60" /></span>
            </th>
            <th className="py-3.5 px-4 text-center min-w-[170px]">
              <span className="flex items-center justify-center gap-1 text-[#ff5900]">
                Serial Number (SN)
              </span>
            </th>
            <th className="py-3.5 px-4 text-center min-w-[120px]">
              <span className="flex items-center justify-center gap-1">Status <ArrowUpDown className="w-3 h-3 opacity-60" /></span>
            </th>
            <th className="py-3.5 px-4 text-center rounded-tr-xl w-24">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {data.length === 0 ? (
            <tr>
              <td colSpan={10} className="py-12 text-center text-slate-400 dark:text-slate-500 font-medium">
                Belum ada data Work Order tersedia
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr 
                key={item.id || index} 
                className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group"
              >
                <td className="py-3.5 px-4 text-center font-semibold text-slate-500 dark:text-slate-400">
                  {index + 1}
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap">
                  {item.date}
                </td>
                <td className="py-3.5 px-4 font-mono font-bold text-[#0e2b7a] dark:text-sky-300">
                  {item.woNumber}
                </td>
                <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white">
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    {item.sku}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-100">
                  <div className="flex flex-col">
                    <span>{item.product}</span>
                    <span className="text-[10px] text-[#ff5900] font-medium">{item.category}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">
                  {item.warehouse}
                </td>
                <td className="py-3.5 px-3 text-center font-bold text-slate-900 dark:text-white font-mono">
                  {item.totalQty}
                </td>
                
                {/* Serial Number Generation / View Column */}
                <td className="py-3.5 px-4 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <button
                      onClick={() => handleOpenSNForWO(item)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#0e2b7a] to-[#1a4ca8] hover:from-[#091c52] hover:to-[#0e2b7a] text-white font-semibold text-[11px] shadow-sm hover:shadow-blue-500/25 transition-all"
                      title="Lihat Serial Number yang diterbitkan"
                    >
                      <QrCode className="w-3.5 h-3.5 text-[#ff5900]" />
                      <span>Lihat SN ({item.generatedSerialsCount || 0})</span>
                    </button>

                    {item.status !== 'Complete' && (
                      <button
                        onClick={() => generateSerialsForWO(item.id, 5)}
                        className="p-1.5 rounded-xl bg-[#ff5900]/10 hover:bg-[#ff5900]/20 text-[#ff5900] transition-colors"
                        title="Auto-Generate +5 Serial Number dari WO ini"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </td>

                <td className="py-3.5 px-4 text-center">
                  {getStatusBadge(item.status)}
                </td>
                <td className="py-3.5 px-4 text-center">
                  <button
                    onClick={() => deleteTransaction('Work Order', item.id)}
                    title="Hapus Work Order"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
