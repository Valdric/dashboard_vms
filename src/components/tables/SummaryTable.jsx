import React from 'react';
import { 
  Building2, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  ArrowUpRight 
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const SummaryTable = ({ data }) => {
  const { setSelectedWarehouse, setActiveTab } = useData();

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs border-collapse">
        <thead className="text-[10px] font-bold text-slate-800 dark:text-slate-900 select-none">
          <tr>
            {/* Warehouse Header Section */}
            <th rowSpan={2} className="py-2.5 px-3 bg-[#fef08a] dark:bg-[#fde047] border border-slate-300 dark:border-slate-600 text-center w-10">
              No
            </th>
            <th rowSpan={2} className="py-2.5 px-3 bg-[#fef08a] dark:bg-[#fde047] border border-slate-300 dark:border-slate-600 min-w-[70px]">
              Kode KCU
            </th>
            <th rowSpan={2} className="py-2.5 px-3.5 bg-[#fef08a] dark:bg-[#fde047] border border-slate-300 dark:border-slate-600 min-w-[200px]">
              Warehouse / Sentral Logistik
            </th>

            {/* Inbound Header */}
            <th colSpan={2} className="py-1.5 px-3 bg-[#fed7aa] dark:bg-[#fb923c] border border-slate-300 dark:border-slate-600 text-center">
              Inbound Fulfillment
            </th>

            {/* Stock on Hand Header */}
            <th colSpan={4} className="py-1.5 px-3 bg-[#bbf7d0] dark:bg-[#86efac] border border-slate-300 dark:border-slate-600 text-center">
              Posisi Inventory / Stok Fisik
            </th>

            {/* Outbound Header */}
            <th colSpan={3} className="py-1.5 px-3 bg-[#bfdbfe] dark:bg-[#93c5fd] border border-slate-300 dark:border-slate-600 text-center">
              Outbound & Last Mile
            </th>

            {/* SLA Score */}
            <th rowSpan={2} className="py-2.5 px-3 bg-[#e9d5ff] dark:bg-[#d8b4fe] border border-slate-300 dark:border-slate-600 text-center min-w-[90px]">
              SLA Score
            </th>
          </tr>

          {/* Sub Header Row */}
          <tr className="text-center font-bold text-[9px] uppercase">
            <th className="py-1.5 px-2 bg-[#ffedd5] dark:bg-[#fed7aa] border border-slate-300 dark:border-slate-600">Total Order</th>
            <th className="py-1.5 px-2 bg-[#ffedd5] dark:bg-[#fed7aa] border border-slate-300 dark:border-slate-600">Selesai</th>

            <th className="py-1.5 px-2 bg-[#dcfce7] dark:bg-[#bbf7d0] border border-slate-300 dark:border-slate-600">Ready</th>
            <th className="py-1.5 px-2 bg-[#dcfce7] dark:bg-[#bbf7d0] border border-slate-300 dark:border-slate-600">Booked</th>
            <th className="py-1.5 px-2 bg-[#dcfce7] dark:bg-[#bbf7d0] border border-slate-300 dark:border-slate-600">Damage</th>
            <th className="py-1.5 px-2 bg-[#dcfce7] dark:bg-[#bbf7d0] border border-slate-300 dark:border-slate-600 font-black">Total</th>

            <th className="py-1.5 px-2 bg-[#dbeafe] dark:bg-[#bfdbfe] border border-slate-300 dark:border-slate-600">Request</th>
            <th className="py-1.5 px-2 bg-[#dbeafe] dark:bg-[#bfdbfe] border border-slate-300 dark:border-slate-600">Handover</th>
            <th className="py-1.5 px-2 bg-[#dbeafe] dark:bg-[#bfdbfe] border border-slate-300 dark:border-slate-600">Delivery</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300 text-xs">
          {data.map((row, idx) => (
            <tr key={row.no || idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
              <td className="py-2.5 px-3 text-center border border-slate-200 dark:border-slate-800 font-bold text-slate-400">
                {row.no || idx + 1}
              </td>
              <td className="py-2.5 px-3 border border-slate-200 dark:border-slate-800 font-mono font-bold text-[#091c52] dark:text-sky-300">
                {row.code}
              </td>
              <td className="py-2.5 px-3.5 border border-slate-200 dark:border-slate-800 font-semibold">
                <button
                  onClick={() => {
                    setSelectedWarehouse(row.warehouse);
                    setActiveTab('Stock On Hand');
                  }}
                  className="text-left hover:text-[#ff5900] transition-colors flex items-center justify-between w-full group"
                >
                  <span>{row.warehouse}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#ff5900] transition-opacity" />
                </button>
              </td>

              {/* Inbound */}
              <td className="py-2.5 px-2 text-center border border-slate-200 dark:border-slate-800 font-mono">
                {row.inboundTotal}
              </td>
              <td className="py-2.5 px-2 text-center border border-slate-200 dark:border-slate-800 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {row.inboundComplete}
              </td>

              {/* Stock */}
              <td className="py-2.5 px-2 text-center border border-slate-200 dark:border-slate-800 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {row.stockReady}
              </td>
              <td className="py-2.5 px-2 text-center border border-slate-200 dark:border-slate-800 font-mono text-amber-600 dark:text-amber-400">
                {row.stockBooked}
              </td>
              <td className="py-2.5 px-2 text-center border border-slate-200 dark:border-slate-800 font-mono text-rose-600 dark:text-rose-400">
                {row.stockDamaged}
              </td>
              <td className="py-2.5 px-2 text-center border border-slate-200 dark:border-slate-800 font-mono font-black text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900/60">
                {row.stockTotal}
              </td>

              {/* Outbound */}
              <td className="py-2.5 px-2 text-center border border-slate-200 dark:border-slate-800 font-mono">
                {row.outboundRequest}
              </td>
              <td className="py-2.5 px-2 text-center border border-slate-200 dark:border-slate-800 font-mono text-blue-600 dark:text-blue-400 font-bold">
                {row.outboundRealization}
              </td>
              <td className="py-2.5 px-2 text-center border border-slate-200 dark:border-slate-800 font-mono text-sky-600 dark:text-sky-400">
                {row.outboundDelivery}
              </td>

              {/* SLA Score */}
              <td className="py-2.5 px-3 text-center border border-slate-200 dark:border-slate-800 font-mono font-bold text-purple-700 dark:text-purple-300 bg-purple-50/40 dark:bg-purple-950/20">
                {row.slaScore || '99.5%'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
