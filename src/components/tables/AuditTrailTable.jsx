import React from 'react';
import { 
  ShieldCheck, 
  User, 
  Clock, 
  Terminal, 
  CheckCircle2, 
  KeyRound,
  FileCode
} from 'lucide-react';

export const AuditTrailTable = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
        <thead className="bg-[#091c52] text-white uppercase text-[10px] font-bold tracking-wider select-none">
          <tr>
            <th className="py-3 px-3.5 text-center w-10">#</th>
            <th className="py-3 px-3.5 min-w-[150px]">Waktu & Timestamp</th>
            <th className="py-3 px-3.5 min-w-[180px]">Pengguna & Peran (Role)</th>
            <th className="py-3 px-3.5 min-w-[190px]">Tipe Aktivitas (Action)</th>
            <th className="py-3 px-3.5 min-w-[200px]">Entitas / Nomor Transaksi</th>
            <th className="py-3 px-3.5 min-w-[120px]">IP Address</th>
            <th className="py-3 px-3.5 min-w-[240px]">Rincian Perubahan Data</th>
            <th className="py-3 px-3.5 text-center min-w-[90px]">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
          {data.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-8 text-center text-slate-400 font-medium">
                Tidak ada data log audit yang sesuai filter.
              </td>
            </tr>
          ) : (
            data.map((item, idx) => (
              <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors font-mono">
                <td className="py-3 px-3.5 text-center font-bold text-slate-400">{idx + 1}</td>

                {/* Timestamp */}
                <td className="py-3 px-3.5 text-slate-700 dark:text-slate-300 text-[11px]">
                  {item.timestamp}
                </td>

                {/* User & Role */}
                <td className="py-3 px-3.5 font-sans">
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">
                      {item.userName}
                    </p>
                    <span className="text-[10px] text-[#ff5900] font-semibold">
                      {item.role}
                    </span>
                  </div>
                </td>

                {/* Action */}
                <td className="py-3 px-3.5">
                  <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-[#091c52] dark:text-sky-300 font-bold text-[10px] border border-blue-200 dark:border-blue-900">
                    {item.action}
                  </span>
                </td>

                {/* Entity */}
                <td className="py-3 px-3.5 font-bold text-slate-800 dark:text-slate-200">
                  {item.entity}
                </td>

                {/* IP Address */}
                <td className="py-3 px-3.5 text-slate-500 text-[11px]">
                  {item.ipAddress}
                </td>

                {/* Details */}
                <td className="py-3 px-3.5 font-sans text-slate-600 dark:text-slate-400 text-[11px]">
                  {item.details}
                </td>

                {/* Status */}
                <td className="py-3 px-3.5 text-center">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    {item.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
