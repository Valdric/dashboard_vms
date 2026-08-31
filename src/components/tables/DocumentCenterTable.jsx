import React from 'react';
import { 
  FileCheck2, 
  Download, 
  Printer, 
  QrCode, 
  Building2, 
  ShieldCheck, 
  Calendar,
  Eye
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const DocumentCenterTable = ({ data }) => {
  const { openBastModal, showToast } = useData();

  const handleDownload = (doc) => {
    showToast(`Dokumen ${doc.docNumber} berhasil diunduh!`, 'success');
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
        <thead className="bg-[#091c52] text-white uppercase text-[10px] font-bold tracking-wider select-none">
          <tr>
            <th className="py-3 px-3.5 text-center w-10">#</th>
            <th className="py-3 px-3.5 min-w-[210px]">Nomor Dokumen & Tipe</th>
            <th className="py-3 px-3.5 min-w-[190px]">Referensi DO / Transaksi</th>
            <th className="py-3 px-3.5 min-w-[180px]">Gudang Warehouse</th>
            <th className="py-3 px-3.5 min-w-[130px]">Tanggal Terbit</th>
            <th className="py-3 px-3.5 min-w-[180px]">Penandatangan Dokumen</th>
            <th className="py-3 px-3.5 min-w-[150px]">Status & Verifikasi QR</th>
            <th className="py-3 px-3.5 text-center min-w-[140px]">Aksi Dokumen</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
          {data.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-8 text-center text-slate-400 font-medium">
                Tidak ada dokumen yang sesuai filter.
              </td>
            </tr>
          ) : (
            data.map((item, idx) => (
              <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-3.5 text-center font-bold text-slate-400">{idx + 1}</td>

                {/* Doc Number & Type */}
                <td className="py-3 px-3.5">
                  <div className="space-y-0.5">
                    <p className="font-mono font-bold text-[#091c52] dark:text-sky-300">
                      {item.docNumber}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#ff5900]">
                      <FileCheck2 className="w-3 h-3" />
                      {item.type}
                    </span>
                  </div>
                </td>

                {/* Related DO */}
                <td className="py-3 px-3.5 font-mono font-bold text-slate-800 dark:text-slate-200">
                  {item.relatedDo}
                </td>

                {/* Warehouse */}
                <td className="py-3 px-3.5 font-semibold text-slate-800 dark:text-slate-200">
                  {item.warehouse}
                </td>

                {/* Date */}
                <td className="py-3 px-3.5 font-mono text-slate-500">
                  {item.date}
                </td>

                {/* Signers */}
                <td className="py-3 px-3.5">
                  <div className="space-y-0.5 text-[11px]">
                    <p className="text-slate-800 dark:text-slate-200 font-medium">
                      Mora: <span className="font-bold">{item.signerMora || 'Dimas W.'}</span>
                    </p>
                    <p className="text-slate-500">
                      Pos: <span className="font-bold">{item.signerPos || 'Agus K.'}</span>
                    </p>
                  </div>
                </td>

                {/* Status & QR */}
                <td className="py-3 px-3.5">
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      <ShieldCheck className="w-3 h-3" />
                      {item.status}
                    </span>
                    <p className="text-[9px] font-mono text-slate-400">
                      QR: {item.qrCode}
                    </p>
                  </div>
                </td>

                {/* Actions */}
                <td className="py-3 px-3.5 text-center">
                  <div className="flex items-center justify-center space-x-1.5">
                    <button
                      onClick={() => openBastModal(item)}
                      className="p-1.5 rounded-lg bg-[#091c52] hover:bg-[#0e2b7a] text-white"
                      title="Lihat & Cetak BAST"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#ff5900]" />
                    </button>
                    <button
                      onClick={() => handleDownload(item)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      title="Download PDF"
                    >
                      <Download className="w-3.5 h-3.5" />
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
