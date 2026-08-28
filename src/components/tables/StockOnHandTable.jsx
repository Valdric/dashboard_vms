import React from 'react';
import { Info, ArrowUpDown, QrCode, Trash2, Edit } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const StockOnHandTable = ({ data }) => {
  const { openSNModal, deleteTransaction } = useData();

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
        <thead className="bg-[#1e293b] text-white uppercase text-[11px] font-bold tracking-wider select-none">
          <tr>
            <th className="py-3.5 px-4 rounded-tl-xl w-12 text-center">
              <span className="flex items-center justify-center gap-1"># <ArrowUpDown className="w-3 h-3 opacity-60" /></span>
            </th>
            <th className="py-3.5 px-4 min-w-[120px]">
              <span className="flex items-center gap-1">SKU <ArrowUpDown className="w-3 h-3 opacity-60" /></span>
            </th>
            <th className="py-3.5 px-4 min-w-[240px]">
              <span className="flex items-center gap-1">Product <ArrowUpDown className="w-3 h-3 opacity-60" /></span>
            </th>
            <th className="py-3.5 px-4 text-center w-20">
              <span className="flex items-center justify-center gap-1">UoM <ArrowUpDown className="w-3 h-3 opacity-60" /></span>
            </th>
            <th className="py-3.5 px-4 min-w-[200px]">
              <span className="flex items-center gap-1">Warehouse <ArrowUpDown className="w-3 h-3 opacity-60" /></span>
            </th>
            <th className="py-3.5 px-3 text-center w-24">
              <span className="flex items-center justify-center gap-1 text-sky-400">Ready <ArrowUpDown className="w-3 h-3 opacity-60" /></span>
            </th>
            <th className="py-3.5 px-3 text-center w-24">
              <span className="flex items-center justify-center gap-1 text-amber-400">Booked <ArrowUpDown className="w-3 h-3 opacity-60" /></span>
            </th>
            <th className="py-3.5 px-3 text-center w-24">
              <span className="flex items-center justify-center gap-1 text-rose-400">Damage <ArrowUpDown className="w-3 h-3 opacity-60" /></span>
            </th>
            <th className="py-3.5 px-3 text-center w-24">
              <span className="flex items-center justify-center gap-1 text-emerald-400">Total <ArrowUpDown className="w-3 h-3 opacity-60" /></span>
            </th>
            <th className="py-3.5 px-4 text-center rounded-tr-xl min-w-[160px]">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {data.length === 0 ? (
            <tr>
              <td colSpan={10} className="py-12 text-center text-slate-400 dark:text-slate-500 font-medium">
                No data available in table
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr 
                key={item.id || index} 
                className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group"
              >
                <td className="py-3.5 px-4 text-center font-semibold text-slate-500 dark:text-slate-400">
                  {item.id || index + 1}
                </td>
                <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white">
                  {item.sku}
                </td>
                <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    <span>{item.product}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-center">
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-[11px]">
                    {item.uom}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 font-medium">
                  {item.warehouse}
                </td>
                <td className="py-3.5 px-3 text-center font-bold text-sky-600 dark:text-sky-400 font-mono">
                  {item.ready}
                </td>
                <td className="py-3.5 px-3 text-center font-bold text-amber-600 dark:text-amber-400 font-mono">
                  {item.booked}
                </td>
                <td className="py-3.5 px-3 text-center font-bold text-rose-600 dark:text-rose-400 font-mono">
                  {item.damage}
                </td>
                <td className="py-3.5 px-3 text-center font-extrabold text-slate-900 dark:text-white font-mono bg-slate-50/50 dark:bg-slate-800/30">
                  {item.total}
                </td>
                <td className="py-3.5 px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    {/* Blue Serial Number Modal Trigger matching image 170c7d63-7851-43c1-be79-f3dd4d85fd31.jpg */}
                    <button
                      onClick={() => openSNModal(item)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold text-xs shadow-sm hover:shadow-sky-500/30 transition-all duration-150 active:scale-95"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>Serial Number</span>
                    </button>

                    <button
                      onClick={() => deleteTransaction('Stock', item.id)}
                      title="Hapus baris"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
