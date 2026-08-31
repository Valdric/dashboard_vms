import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  UserCheck, 
  Building2,
  Check
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const ExceptionTable = ({ data }) => {
  const { resolveException } = useData();

  const getSeverityBadge = (sev) => {
    switch (sev) {
      case 'High':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
            <ShieldAlert className="w-3 h-3" />
            Tinggi (High)
          </span>
        );
      case 'Medium':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            <AlertTriangle className="w-3 h-3" />
            Sedang (Medium)
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            Rendah (Low)
          </span>
        );
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
        <thead className="bg-[#091c52] text-white uppercase text-[10px] font-bold tracking-wider select-none">
          <tr>
            <th className="py-3 px-3.5 text-center w-10">#</th>
            <th className="py-3 px-3.5 min-w-[170px]">Nomor Tiket & Ref DO</th>
            <th className="py-3 px-3.5 min-w-[190px]">Jenis Kendala / Ketidaksesuaian</th>
            <th className="py-3 px-3.5 min-w-[160px]">Gudang Terkait</th>
            <th className="py-3 px-3.5 min-w-[110px]">Tingkat Risiko</th>
            <th className="py-3 px-3.5 min-w-[240px]">Deskripsi Masalah & Tindakan</th>
            <th className="py-3 px-3.5 min-w-[140px]">SLA & Penugasan</th>
            <th className="py-3 px-3.5 text-center min-w-[120px]">Status & Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
          {data.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-8 text-center text-slate-400 font-medium">
                Tidak ada data kendala / Exception yang aktif.
              </td>
            </tr>
          ) : (
            data.map((item, idx) => (
              <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-3.5 text-center font-bold text-slate-400">{idx + 1}</td>

                {/* Incident Number & DO */}
                <td className="py-3 px-3.5">
                  <div className="space-y-0.5">
                    <p className="font-mono font-bold text-rose-600 dark:text-rose-400">
                      {item.incidentNumber}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono">
                      DO: {item.doNumber}
                    </p>
                  </div>
                </td>

                {/* Exception Type */}
                <td className="py-3 px-3.5 font-bold text-slate-900 dark:text-white">
                  {item.type}
                </td>

                {/* Warehouse */}
                <td className="py-3 px-3.5 font-semibold text-slate-800 dark:text-slate-200">
                  {item.warehouse}
                </td>

                {/* Severity */}
                <td className="py-3 px-3.5">
                  {getSeverityBadge(item.severity)}
                </td>

                {/* Description & Action */}
                <td className="py-3 px-3.5">
                  <div className="space-y-1 text-[11px]">
                    <p className="text-slate-800 dark:text-slate-200">
                      {item.description}
                    </p>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 p-1 rounded">
                      Solusi: {item.correctiveAction}
                    </p>
                  </div>
                </td>

                {/* SLA & Assigned To */}
                <td className="py-3 px-3.5">
                  <div className="space-y-0.5 text-[11px]">
                    <p className="text-slate-800 dark:text-slate-200 font-medium">
                      PIC: <span className="font-bold">{item.assignedTo}</span>
                    </p>
                    <div className="flex items-center gap-1 text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
                      <Clock className="w-3 h-3" />
                      <span>Target: {item.slaTargetResolution}</span>
                    </div>
                  </div>
                </td>

                {/* Status & Resolve Action */}
                <td className="py-3 px-3.5 text-center">
                  <div className="space-y-1.5">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.status === 'Resolved'
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                        : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                    }`}>
                      {item.status === 'Resolved' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {item.status}
                    </span>

                    {item.status !== 'Resolved' && (
                      <button
                        onClick={() => resolveException(item.id, 'Telah diselesaikan oleh tim operasional & disetujui.')}
                        className="w-full py-1 px-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold transition-all shadow-sm"
                      >
                        Selesaikan
                      </button>
                    )}
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
