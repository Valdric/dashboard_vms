import React from 'react';
import { 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Eye, 
  QrCode, 
  Building2, 
  FileCheck2 
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const ReturTable = ({ data }) => {
  const { openBastModal } = useData();

  const getTriageBadge = (status) => {
    switch (status) {
      case 'Restocked':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3 h-3" />
            Restock ke Gudang
          </span>
        );
      case 'Quarantined':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            <ShieldAlert className="w-3 h-3" />
            Karantina / Vendor Claim
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
            <th className="py-3 px-3.5 min-w-[170px]">Nomor Retur & Ref DO</th>
            <th className="py-3 px-3.5 min-w-[160px]">Pelanggan & Tanggal</th>
            <th className="py-3 px-3.5 min-w-[170px]">Gudang Penerima</th>
            <th className="py-3 px-3.5 min-w-[200px]">Produk & Serial Number</th>
            <th className="py-3 px-3.5 min-w-[170px]">Alasan & Kondisi Fisik</th>
            <th className="py-3 px-3.5 min-w-[160px]">Keputusan Triage (Status)</th>
            <th className="py-3 px-3.5 text-center min-w-[130px]">Inspektur & BAST</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
          {data.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-8 text-center text-slate-400 font-medium">
                Tidak ada data Retur yang sesuai filter.
              </td>
            </tr>
          ) : (
            data.map((item, idx) => (
              <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-3.5 text-center font-bold text-slate-400">{idx + 1}</td>

                {/* Retur Number & DO Ref */}
                <td className="py-3 px-3.5">
                  <div className="space-y-0.5">
                    <p className="font-mono font-bold text-rose-600 dark:text-rose-400">
                      {item.returNumber}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono">
                      Ref DO: {item.originalDoNumber}
                    </p>
                  </div>
                </td>

                {/* Customer & Date */}
                <td className="py-3 px-3.5">
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 dark:text-white">
                      {item.customerName}
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {item.returnDate}
                    </span>
                  </div>
                </td>

                {/* Warehouse */}
                <td className="py-3 px-3.5 font-semibold text-slate-800 dark:text-slate-200">
                  {item.warehouse}
                </td>

                {/* Product & SN */}
                <td className="py-3 px-3.5">
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 dark:text-white">
                      {item.product}
                    </p>
                    <p className="text-[10px] font-mono text-[#ff5900] font-bold">
                      SN: {item.serialNumber}
                    </p>
                  </div>
                </td>

                {/* Reason & Physical Condition */}
                <td className="py-3 px-3.5">
                  <div className="space-y-0.5 text-[11px]">
                    <p className="font-bold text-slate-800 dark:text-slate-200">
                      {item.reason}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {item.physicalCondition}
                    </p>
                  </div>
                </td>

                {/* Triage Status */}
                <td className="py-3 px-3.5">
                  <div className="space-y-1">
                    {getTriageBadge(item.status)}
                    <p className="text-[10px] text-slate-500">
                      {item.triageDecision}
                    </p>
                  </div>
                </td>

                {/* Inspector & Actions */}
                <td className="py-3 px-3.5 text-center">
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-medium">
                      {item.picInspector}
                    </p>
                    <button
                      onClick={() => openBastModal({
                        docNumber: `BAST/RET/${item.id}`,
                        relatedDo: item.returNumber,
                        warehouse: item.warehouse,
                        product: item.product,
                        sku: item.sku,
                        qtyOrder: item.qty,
                        qtyReceived: item.qty,
                        signerMora: 'Dimas Wicaksono (Mora Partner)',
                        signerPos: item.picInspector,
                        qrCode: `POS-MR-RET-${item.id}`
                      })}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-[10px] font-bold border border-rose-200 dark:border-rose-900"
                    >
                      <FileCheck2 className="w-3 h-3 text-rose-500" />
                      <span>BAST Retur</span>
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
