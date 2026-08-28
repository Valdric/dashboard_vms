import React from 'react';
import { ArrowUpDown, Trash2, CheckCircle2, Clock } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const PutawayTable = ({ data }) => {
  const { deleteTransaction } = useData();

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
        <thead className="bg-[#1e293b] text-white uppercase text-[11px] font-bold tracking-wider select-none">
          <tr>
            <th className="py-3.5 px-4 rounded-tl-xl w-12 text-center">
              <span className="flex items-center justify-center gap-1"># <ArrowUpDown className="w-3 h-3 opacity-60" /></span>
            </th>
            <th className="py-3.5 px-4 min-w-[110px]">
              <span className="flex items-center gap-1">Date <ArrowUpDown className="w-3 h-3 opacity-60" /></span>
            </th>
            <th className="py-3.5 px-4 min-w-[220px]">
              <span className="flex items-center gap-1">ID/PO Number <ArrowUpDown className="w-3 h-3 opacity-60" /></span>
            </th>
            <th className="py-3.5 px-4 min-w-[200px]">
              <span className="flex items-center gap-1">Warehouse <ArrowUpDown className="w-3 h-3 opacity-60" /></span>
            </th>
            <th className="py-3.5 px-4 min-w-[220px]">
              <span className="flex items-center gap-1">Product <ArrowUpDown className="w-3 h-3 opacity-60" /></span>
            </th>
            <th className="py-3.5 px-3 text-center w-24">
              <span className="flex items-center justify-center gap-1">Total Qty <ArrowUpDown className="w-3 h-3 opacity-60" /></span>
            </th>
            <th className="py-3.5 px-4 text-center min-w-[140px]">
              <span className="flex items-center justify-center gap-1">Putaway <ArrowUpDown className="w-3 h-3 opacity-60" /></span>
            </th>
            <th className="py-3.5 px-4 text-center min-w-[130px]">
              <span className="flex items-center justify-center gap-1">Status <ArrowUpDown className="w-3 h-3 opacity-60" /></span>
            </th>
            <th className="py-3.5 px-4 text-center rounded-tr-xl w-16">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {data.length === 0 ? (
            <tr>
              <td colSpan={9} className="py-12 text-center text-slate-400 dark:text-slate-500 font-medium">
                No data available in table
              </td>
            </tr>
          ) : (
            data.map((item, index) => {
              const percent = Math.min(100, Math.round((item.putawayQty / item.totalQty) * 100)) || 0;
              return (
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
                  <td className="py-3.5 px-4 font-mono font-semibold text-purple-700 dark:text-purple-300">
                    {item.poNumber}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">
                    {item.warehouse}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800 dark:text-slate-100">
                    {item.product}
                  </td>
                  <td className="py-3.5 px-3 text-center font-bold text-slate-900 dark:text-white font-mono">
                    {item.totalQty}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="font-bold text-slate-800 dark:text-slate-200">{item.putawayQty} / {item.totalQty}</span>
                        <span className="text-purple-600 dark:text-purple-400 font-bold">{percent}%</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${percent === 100 ? 'bg-emerald-500' : 'bg-purple-600'}`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {item.status === 'Completed' ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                        <CheckCircle2 className="w-3 h-3" />
                        Completed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
                        <Clock className="w-3 h-3" />
                        In Progress
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => deleteTransaction('Putaway', item.id)}
                      title="Hapus baris"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
