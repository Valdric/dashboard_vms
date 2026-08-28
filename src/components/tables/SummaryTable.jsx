import React from 'react';

export const SummaryTable = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs border-collapse">
        {/* Multi-Row Colored Header matching screenshot 6bb1857b-e20b-4250-93d5-d848780f9080.jpg */}
        <thead className="text-[11px] font-bold text-slate-800 dark:text-slate-900 select-none">
          <tr>
            {/* Warehouse Info Section (Warm Amber/Yellow) */}
            <th rowSpan={2} className="py-2.5 px-3 bg-[#fef08a] dark:bg-[#fde047] border border-slate-300 dark:border-slate-600 text-center w-12 rounded-tl-xl">
              No
            </th>
            <th rowSpan={2} className="py-2.5 px-3 bg-[#fef08a] dark:bg-[#fde047] border border-slate-300 dark:border-slate-600 min-w-[70px]">
              Code
            </th>
            <th rowSpan={2} className="py-2.5 px-4 bg-[#fef08a] dark:bg-[#fde047] border border-slate-300 dark:border-slate-600 min-w-[200px]">
              Warehouse
            </th>

            {/* Inbound Section (Light Sky Blue) */}
            <th colSpan={3} className="py-2 px-3 bg-[#7dd3fc] dark:bg-[#38bdf8] border border-slate-300 dark:border-slate-600 text-center">
              Status Inbound
            </th>
            <th rowSpan={2} className="py-2.5 px-3 bg-[#38bdf8] dark:bg-[#0284c7] text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 text-center min-w-[80px]">
              Total Inbound (QTY)
            </th>

            {/* Stock On Hand Section (Light Green) */}
            <th colSpan={3} className="py-2 px-3 bg-[#86efac] dark:bg-[#4ade80] border border-slate-300 dark:border-slate-600 text-center">
              Stock On Hand
            </th>
            <th rowSpan={2} className="py-2.5 px-3 bg-[#4ade80] dark:bg-[#16a34a] text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 text-center min-w-[80px]">
              Total Stock On Hand
            </th>

            {/* Outbound Section (Yellow/Green) */}
            <th colSpan={3} className="py-2 px-3 bg-[#fef08a] dark:bg-[#fde047] border border-slate-300 dark:border-slate-600 text-center">
              Outbound
            </th>

            {/* Additional KPIs */}
            <th rowSpan={2} className="py-2.5 px-3 bg-[#fca5a5] dark:bg-[#f87171] text-slate-900 border border-slate-300 dark:border-slate-600 text-center min-w-[80px]">
              Need Putaway
            </th>
            <th rowSpan={2} className="py-2.5 px-3 bg-[#fdba74] dark:bg-[#fb923c] text-slate-900 border border-slate-300 dark:border-slate-600 text-center min-w-[80px]">
              Outbound Request
            </th>
            <th rowSpan={2} className="py-2.5 px-3 bg-[#93c5fd] dark:bg-[#60a5fa] text-slate-900 border border-slate-300 dark:border-slate-600 text-center rounded-tr-xl min-w-[80px]">
              Outbound Realization
            </th>
          </tr>

          {/* Sub Header Row */}
          <tr className="text-[10px]">
            {/* Inbound Subheaders */}
            <th className="py-1.5 px-2.5 bg-[#bae6fd] dark:bg-[#7dd3fc] border border-slate-300 dark:border-slate-600 text-center">
              Complete
            </th>
            <th className="py-1.5 px-2.5 bg-[#bae6fd] dark:bg-[#7dd3fc] border border-slate-300 dark:border-slate-600 text-center">
              Partial
            </th>
            <th className="py-1.5 px-2.5 bg-[#bae6fd] dark:bg-[#7dd3fc] border border-slate-300 dark:border-slate-600 text-center">
              Request
            </th>

            {/* Stock Subheaders */}
            <th className="py-1.5 px-2.5 bg-[#bbf7d0] dark:bg-[#86efac] border border-slate-300 dark:border-slate-600 text-center">
              Ready
            </th>
            <th className="py-1.5 px-2.5 bg-[#bbf7d0] dark:bg-[#86efac] border border-slate-300 dark:border-slate-600 text-center">
              Booked
            </th>
            <th className="py-1.5 px-2.5 bg-[#bbf7d0] dark:bg-[#86efac] border border-slate-300 dark:border-slate-600 text-center">
              Damaged
            </th>

            {/* Outbound Subheaders */}
            <th className="py-1.5 px-2.5 bg-[#fef9c3] dark:bg-[#fef08a] border border-slate-300 dark:border-slate-600 text-center">
              Request
            </th>
            <th className="py-1.5 px-2.5 bg-[#fef9c3] dark:bg-[#fef08a] border border-slate-300 dark:border-slate-600 text-center">
              Realization
            </th>
            <th className="py-1.5 px-2.5 bg-[#fef9c3] dark:bg-[#fef08a] border border-slate-300 dark:border-slate-600 text-center">
              Delivery
            </th>
          </tr>
        </thead>

        {/* Body Rows */}
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
          {data.length === 0 ? (
            <tr>
              <td colSpan={16} className="py-12 text-center text-slate-400 dark:text-slate-500 font-medium">
                No summary data available
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr 
                key={row.code || idx} 
                className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors font-mono"
              >
                <td className="py-2 px-3 text-center border border-slate-200 dark:border-slate-800 font-sans font-medium text-slate-500">
                  {idx + 1}
                </td>
                <td className="py-2 px-3 border border-slate-200 dark:border-slate-800 font-bold text-slate-900 dark:text-white">
                  {row.code}
                </td>
                <td className="py-2 px-4 border border-slate-200 dark:border-slate-800 font-sans font-medium text-slate-800 dark:text-slate-200 whitespace-nowrap">
                  {row.warehouse}
                </td>
                
                {/* Inbound metrics */}
                <td className="py-2 px-2.5 text-center border border-slate-200 dark:border-slate-800">{row.inboundComplete}</td>
                <td className="py-2 px-2.5 text-center border border-slate-200 dark:border-slate-800">{row.inboundPartial}</td>
                <td className="py-2 px-2.5 text-center border border-slate-200 dark:border-slate-800">{row.inboundRequest}</td>
                <td className="py-2 px-3 text-center border border-slate-200 dark:border-slate-800 font-bold text-sky-600 dark:text-sky-400 bg-sky-50/50 dark:bg-sky-950/20">{row.inboundTotal}</td>

                {/* Stock metrics */}
                <td className="py-2 px-2.5 text-center border border-slate-200 dark:border-slate-800 font-bold text-slate-900 dark:text-white">{row.stockReady}</td>
                <td className="py-2 px-2.5 text-center border border-slate-200 dark:border-slate-800 text-amber-600 dark:text-amber-400">{row.stockBooked}</td>
                <td className="py-2 px-2.5 text-center border border-slate-200 dark:border-slate-800 text-rose-600 dark:text-rose-400">{row.stockDamaged}</td>
                <td className="py-2 px-3 text-center border border-slate-200 dark:border-slate-800 font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">{row.stockTotal}</td>

                {/* Outbound metrics */}
                <td className="py-2 px-2.5 text-center border border-slate-200 dark:border-slate-800">{row.outboundRequest}</td>
                <td className="py-2 px-2.5 text-center border border-slate-200 dark:border-slate-800">{row.outboundRealization}</td>
                <td className="py-2 px-2.5 text-center border border-slate-200 dark:border-slate-800">{row.outboundDelivery}</td>

                {/* KPI columns */}
                <td className="py-2 px-3 text-center border border-slate-200 dark:border-slate-800">{row.needPutaway}</td>
                <td className="py-2 px-3 text-center border border-slate-200 dark:border-slate-800">{row.statOutboundReq}</td>
                <td className="py-2 px-3 text-center border border-slate-200 dark:border-slate-800">{row.statOutboundReal}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
