import React from 'react';
import { ArrowUpDown, Trash2, CheckCircle2, Clock, Truck, Send } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const OutboundTable = ({ data }) => {
  const { deleteTransaction } = useData();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Request':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#7e22ce] text-white shadow-sm shadow-purple-500/30">
            Request
          </span>
        );
      case 'Realization':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#0284c7] text-white shadow-sm shadow-sky-500/30">
            Realization
          </span>
        );
      case 'Delivery':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#d97706] text-white shadow-sm shadow-amber-500/30">
            Delivery
          </span>
        );
      case 'Delivered':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#059669] text-white shadow-sm shadow-emerald-500/30">
            Delivered
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-600 text-white">
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
            <th className="py-3.5 px-4 min-w-[180px]">
              <span className="flex items-center gap-1">Warehouse <ArrowUpDown className="w-3 h-3 opacity-60" /></span>
            </th>
            <th className="py-3.5 px-4 min-w-[150px]">
              <span className="flex items-center gap-1">Consignee <ArrowUpDown className="w-3 h-3 opacity-60" /></span>
            </th>
            <th className="py-3.5 px-4 min-w-[200px]">
              <span className="flex items-center gap-1">Product <ArrowUpDown className="w-3 h-3 opacity-60" /></span>
            </th>
            <th className="py-3.5 px-3 text-center w-20">
              <span className="flex items-center justify-center gap-1">Total Qty <ArrowUpDown className="w-3 h-3 opacity-60" /></span>
            </th>
            <th className="py-3.5 px-4 min-w-[150px]">
              <span className="flex items-center gap-1">Serial Number <ArrowUpDown className="w-3 h-3 opacity-60" /></span>
            </th>
            <th className="py-3.5 px-4 text-center min-w-[130px]">
              <span className="flex items-center justify-center gap-1">Status <ArrowUpDown className="w-3 h-3 opacity-60" /></span>
            </th>
            <th className="py-3.5 px-3 text-center rounded-tr-xl w-16">
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
                <td className="py-3.5 px-4 font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap">
                  {item.date}
                </td>
                <td className="py-3.5 px-4 font-mono font-semibold text-purple-700 dark:text-purple-300">
                  {item.poNumber}
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">
                  {item.warehouse}
                </td>
                <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white capitalize">
                  {item.consignee}
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">
                  {item.product}
                </td>
                <td className="py-3.5 px-3 text-center font-bold text-slate-900 dark:text-white font-mono">
                  {item.totalQty}
                </td>
                <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-300">
                  {item.serialNumber === '-' ? (
                    <span className="text-slate-400">-</span>
                  ) : (
                    <span className="font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[11px]">
                      {item.serialNumber}
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-center">
                  {getStatusBadge(item.status)}
                </td>
                <td className="py-3.5 px-3 text-center">
                  <button
                    onClick={() => deleteTransaction('Outbound', item.id)}
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
