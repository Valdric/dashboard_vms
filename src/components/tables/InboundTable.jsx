import React from 'react';
import { ArrowUpDown, Trash2, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const InboundTable = ({ data }) => {
  const { deleteTransaction } = useData();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Complete':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
            <CheckCircle2 className="w-3 h-3" />
            Complete
          </span>
        );
      case 'Partial':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
            <Clock className="w-3 h-3" />
            Partial
          </span>
        );
      case 'Request':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60">
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
            <th className="py-3.5 px-4 text-center w-24">
              <span className="flex items-center justify-center gap-1">Total Qty <ArrowUpDown className="w-3 h-3 opacity-60" /></span>
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
              <td colSpan={8} className="py-12 text-center text-slate-400 dark:text-slate-500 font-medium">
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
                <td className="py-3.5 px-4 text-center font-bold text-slate-900 dark:text-white font-mono">
                  {item.totalQty}
                </td>
                <td className="py-3.5 px-4 text-center">
                  {getStatusBadge(item.status)}
                </td>
                <td className="py-3.5 px-4 text-center">
                  <button
                    onClick={() => deleteTransaction('Inbound', item.id)}
                    title="Hapus baris"
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
