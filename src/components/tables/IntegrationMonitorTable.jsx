import React from 'react';
import { 
  Globe, 
  CheckCircle2, 
  Activity, 
  RefreshCw, 
  ExternalLink, 
  ShieldCheck, 
  Zap,
  Server
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const IntegrationMonitorTable = ({ data }) => {
  const { showToast } = useData();

  const handlePing = (systemName) => {
    showToast(`Ping webhook ke ${systemName} sukses (Response 200 OK - Latency 98ms)!`, 'success');
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
        <thead className="bg-[#091c52] text-white uppercase text-[10px] font-bold tracking-wider select-none">
          <tr>
            <th className="py-3 px-3.5 text-center w-10">#</th>
            <th className="py-3 px-3.5 min-w-[200px]">Nama Sistem & Platform (SKB 5.2.3)</th>
            <th className="py-3 px-3.5 min-w-[260px]">Tujuan Integrasi & Data Flow</th>
            <th className="py-3 px-3.5 min-w-[190px]">Endpoint Gateway API</th>
            <th className="py-3 px-3.5 min-w-[150px]">Unit Penanggung Jawab</th>
            <th className="py-3 px-3.5 text-center min-w-[110px]">Status & Latency</th>
            <th className="py-3 px-3.5 text-center min-w-[110px]">Uptime 7x24 Jam</th>
            <th className="py-3 px-3.5 text-center min-w-[100px]">Uji Ping</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
          {data.map((item, idx) => (
            <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
              <td className="py-3.5 px-3.5 text-center font-bold text-slate-400">{idx + 1}</td>

              {/* System Name */}
              <td className="py-3.5 px-3.5">
                <div className="space-y-1">
                  <div className="flex items-center space-x-1.5 font-bold text-slate-900 dark:text-white">
                    <Server className="w-4 h-4 text-[#ff5900]" />
                    <span>{item.systemName}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    Sync Terakhir: {item.lastSync}
                  </span>
                </div>
              </td>

              {/* Purpose & Data Flow */}
              <td className="py-3.5 px-3.5">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px]">
                  {item.purpose}
                </p>
                <span className="text-[10px] font-semibold text-sky-600 dark:text-sky-400">
                  Volume Hari Ini: {item.todayRequests} Transaksi
                </span>
              </td>

              {/* Endpoint */}
              <td className="py-3.5 px-3.5 font-mono text-[10px] text-slate-500 break-all">
                <span className="bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded-md block">
                  {item.endpoint}
                </span>
              </td>

              {/* PIC Unit */}
              <td className="py-3.5 px-3.5 text-[11px] font-semibold text-[#091c52] dark:text-sky-300">
                {item.picUnit}
              </td>

              {/* Status & Latency */}
              <td className="py-3.5 px-3.5 text-center">
                <div className="space-y-0.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle2 className="w-3 h-3" />
                    Active
                  </span>
                  <p className="text-[10px] font-mono text-slate-400 font-bold">
                    {item.latency}
                  </p>
                </div>
              </td>

              {/* Uptime */}
              <td className="py-3.5 px-3.5 text-center font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {item.uptime}
              </td>

              {/* Test Ping */}
              <td className="py-3.5 px-3.5 text-center">
                <button
                  onClick={() => handlePing(item.systemName)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[#ff5900] font-bold text-[10px] transition-all flex items-center justify-center gap-1 mx-auto"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Ping</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
