import React from 'react';
import { 
  ArrowUpDown, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Send, 
  MapPin, 
  QrCode, 
  FileText,
  UserCheck
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const OutboundTable = ({ data }) => {
  const { dispatchOutbound, openTrackingModal, openBastModal } = useData();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            <CheckCircle2 className="w-3 h-3" />
            Terkirim Selesai
          </span>
        );
      case 'Delivery':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-800">
            <Truck className="w-3 h-3 animate-pulse" />
            Dalam Pengiriman
          </span>
        );
      case 'Realization':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
            <UserCheck className="w-3 h-3" />
            Siap Handover
          </span>
        );
      case 'Request':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800">
            <Clock className="w-3 h-3" />
            Request Baru
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
            <th className="py-3 px-3.5 min-w-[190px]">Nomor DO & AWB PosAja</th>
            <th className="py-3 px-3.5 min-w-[160px]">Gudang Asal & Layanan</th>
            <th className="py-3 px-3.5 min-w-[200px]">Penerima & Alamat</th>
            <th className="py-3 px-3.5 min-w-[200px]">Produk & Serial Number</th>
            <th className="py-3 px-3.5 text-center min-w-[100px]">Qty</th>
            <th className="py-3 px-3.5 min-w-[150px]">Status & SLA</th>
            <th className="py-3 px-3.5 text-center min-w-[160px]">Aksi & Dispatch</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
          {data.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-8 text-center text-slate-400 font-medium">
                Tidak ada data Outbound yang sesuai filter.
              </td>
            </tr>
          ) : (
            data.map((item, idx) => (
              <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-3.5 text-center font-bold text-slate-400">{idx + 1}</td>

                {/* DO & AWB */}
                <td className="py-3 px-3.5">
                  <div className="space-y-0.5">
                    <p className="font-mono font-bold text-[#091c52] dark:text-sky-300">
                      {item.poNumber}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono">
                      AWB: <span className="font-bold text-slate-700 dark:text-slate-200">{item.awbNumber}</span>
                    </p>
                    <button
                      onClick={() => openTrackingModal(item)}
                      className="text-[10px] text-[#ff5900] hover:underline font-bold flex items-center gap-1 mt-0.5"
                    >
                      <Truck className="w-3 h-3" />
                      <span>Live Telemetri Tracking</span>
                    </button>
                  </div>
                </td>

                {/* Warehouse & Service Type */}
                <td className="py-3 px-3.5">
                  <div className="space-y-0.5">
                    <p className="font-semibold text-slate-800 dark:text-slate-200 text-[11px]">
                      {item.warehouse}
                    </p>
                    <span className="inline-block text-[9px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-800">
                      {item.serviceType || 'Reguler'}
                    </span>
                  </div>
                </td>

                {/* Consignee */}
                <td className="py-3 px-3.5">
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 dark:text-white">
                      {item.consignee}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate max-w-[180px]">
                      {item.address || 'Alamat Penerima'}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono">
                      {item.consigneePhone}
                    </p>
                  </div>
                </td>

                {/* Product & SN */}
                <td className="py-3 px-3.5">
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 dark:text-white">
                      {item.product}
                    </p>
                    <span className="text-[10px] font-mono text-slate-500">
                      SKU: {item.sku}
                    </span>
                    {item.serialNumber && item.serialNumber !== '-' ? (
                      <p className="text-[10px] font-mono font-bold text-[#ff5900] bg-orange-50 dark:bg-orange-950/40 px-1.5 py-0.2 rounded w-fit">
                        SN: {item.serialNumber}
                      </p>
                    ) : (
                      <span className="text-[10px] text-slate-400 italic block">Menunggu Scan SN</span>
                    )}
                  </div>
                </td>

                {/* Qty */}
                <td className="py-3 px-3.5 text-center font-mono font-bold text-slate-900 dark:text-white">
                  {item.totalQty} PCS
                </td>

                {/* Status & SLA */}
                <td className="py-3 px-3.5">
                  <div className="space-y-1">
                    {getStatusBadge(item.status)}
                    <div className="flex items-center gap-1 text-[10px]">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span className="text-slate-500">{item.slaTarget}</span>
                    </div>
                  </div>
                </td>

                {/* Actions */}
                <td className="py-3 px-3.5 text-center">
                  <div className="flex flex-col items-center gap-1.5">
                    {/* BAST / Surat Jalan Viewer */}
                    <button
                      onClick={() => openBastModal({
                        docNumber: item.bastNumber || `BAST/OUT/${item.id}`,
                        relatedDo: item.poNumber,
                        warehouse: item.warehouse,
                        product: item.product,
                        sku: item.sku,
                        qtyOrder: item.totalQty,
                        qtyReceived: item.totalQty,
                        signerMora: 'Dimas Wicaksono (Mora Partner)',
                        signerPos: item.courierName || 'Kurir PosAja Express',
                        qrCode: `POS-MR-OUT-${item.id}`
                      })}
                      className="w-full flex items-center justify-center space-x-1 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-950 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300 text-[10px] font-bold transition-all border border-blue-200 dark:border-blue-800"
                    >
                      <FileText className="w-3 h-3 text-[#ff5900]" />
                      <span>Surat Jalan & BAST</span>
                    </button>

                    {/* Dispatch Button if Request */}
                    {item.status === 'Request' && (
                      <button
                        onClick={() => dispatchOutbound(item.id)}
                        className="w-full flex items-center justify-center space-x-1 px-2.5 py-1 rounded-lg bg-[#0e2b7a] hover:bg-[#091c52] text-white text-[10px] font-bold transition-all shadow-sm"
                      >
                        <Send className="w-3 h-3 text-[#ff5900]" />
                        <span>Scan SN & Handover</span>
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
