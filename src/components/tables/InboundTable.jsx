import React, { useState } from 'react';
import { 
  ArrowUpDown, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileCheck2, 
  Truck, 
  Eye, 
  Building2, 
  Package, 
  QrCode,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const InboundTable = ({ data }) => {
  const { receiveInboundOrder, openBastModal, openTrackingModal } = useData();

  const [receivingId, setReceivingId] = useState(null);
  const [receiveQty, setReceiveQty] = useState('');
  const [autoGenSN, setAutoGenSN] = useState(true);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Put Away Complete':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3 h-3" />
            Put Away Selesai
          </span>
        );
      case 'Received - Exception Logged':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            <AlertTriangle className="w-3 h-3" />
            Ada Selisih Qty
          </span>
        );
      case 'In Middle Mile':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
            <Truck className="w-3 h-3 animate-pulse" />
            Transit Middle Mile
          </span>
        );
      case 'Pickup Scheduled':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
            <Clock className="w-3 h-3" />
            Jadwal Pickup SLP
          </span>
        );
    }
  };

  const handleOpenReceive = (item) => {
    setReceivingId(item.id);
    setReceiveQty(item.qtyOrder);
  };

  const handleConfirmReceive = (item) => {
    receiveInboundOrder(item.id, {
      qtyReceived: Number(receiveQty),
      autoGenerateSN: autoGenSN,
      receivedBy: 'Agus Komarudin (PIC WH)'
    });
    setReceivingId(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
        <thead className="bg-[#091c52] text-white uppercase text-[10px] font-bold tracking-wider select-none">
          <tr>
            <th className="py-3 px-3.5 text-center w-10">#</th>
            <th className="py-3 px-3.5 min-w-[200px]">Nomor DO & Ref Inbound</th>
            <th className="py-3 px-3.5 min-w-[190px]">Gudang Asal & Tujuan</th>
            <th className="py-3 px-3.5 min-w-[210px]">Produk & SKU</th>
            <th className="py-3 px-3.5 text-center min-w-[140px]">Qty Order / Fisik</th>
            <th className="py-3 px-3.5 min-w-[160px]">Status & Kondisi</th>
            <th className="py-3 px-3.5 min-w-[160px]">Armada & Driver</th>
            <th className="py-3 px-3.5 text-center min-w-[160px]">Aksi & BAST</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
          {data.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-8 text-center text-slate-400 font-medium">
                Tidak ada data Inbound yang sesuai filter.
              </td>
            </tr>
          ) : (
            data.map((item, idx) => (
              <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-3.5 text-center font-bold text-slate-400">{idx + 1}</td>

                {/* DO Number & Tracking */}
                <td className="py-3 px-3.5">
                  <div className="space-y-0.5">
                    <p className="font-mono font-bold text-[#091c52] dark:text-sky-300">
                      {item.doNumber}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono">
                      Ref: {item.referenceNumber}
                    </p>
                    <button
                      onClick={() => openTrackingModal(item)}
                      className="text-[10px] text-[#ff5900] hover:underline font-bold flex items-center gap-1 mt-0.5"
                    >
                      <Truck className="w-3 h-3" />
                      <span>Live Telemetry Tracking</span>
                    </button>
                  </div>
                </td>

                {/* Warehouses */}
                <td className="py-3 px-3.5">
                  <div className="space-y-0.5">
                    <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
                      Ke: {item.targetWarehouse}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate max-w-[180px]">
                      Dari: {item.originWarehouse}
                    </p>
                    <span className="text-[9px] font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50 px-1.5 py-0.2 rounded">
                      SLP: {item.slpWarehouse.split(' - ')[0]}
                    </span>
                  </div>
                </td>

                {/* Product */}
                <td className="py-3 px-3.5">
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">
                      {item.product}
                    </p>
                    <span className="text-[10px] font-mono text-slate-500">
                      SKU: {item.sku} • {item.category}
                    </span>
                  </div>
                </td>

                {/* Qty & Discrepancy */}
                <td className="py-3 px-3.5 text-center">
                  <div className="inline-block text-center">
                    <div className="flex items-center justify-center gap-1 font-mono font-bold">
                      <span className="text-slate-800 dark:text-slate-200">{item.qtyOrder}</span>
                      <span className="text-slate-400">/</span>
                      <span className={item.qtyReceived > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}>
                        {item.qtyReceived}
                      </span>
                    </div>
                    {item.qtyDiscrepancy !== 0 && (
                      <span className="text-[10px] font-bold text-rose-500 block">
                        Selisih: {item.qtyDiscrepancy} PCS
                      </span>
                    )}
                  </div>
                </td>

                {/* Status */}
                <td className="py-3 px-3.5">
                  <div className="space-y-1">
                    {getStatusBadge(item.status)}
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      {item.conditionStatus}
                    </p>
                  </div>
                </td>

                {/* Transporter & Driver */}
                <td className="py-3 px-3.5">
                  <div className="space-y-0.5 text-[11px]">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      {item.driverName}
                    </p>
                    <span className="text-[10px] font-mono font-bold text-[#091c52] dark:text-sky-300 bg-blue-50 dark:bg-blue-950/50 px-1.5 py-0.5 rounded">
                      {item.vehiclePlate}
                    </span>
                  </div>
                </td>

                {/* Actions */}
                <td className="py-3 px-3.5 text-center">
                  <div className="flex flex-col items-center gap-1.5">
                    {/* BAST Viewer Button */}
                    <button
                      onClick={() => openBastModal({
                        docNumber: item.bastNumber,
                        relatedDo: item.doNumber,
                        warehouse: item.targetWarehouse,
                        product: item.product,
                        sku: item.sku,
                        qtyOrder: item.qtyOrder,
                        qtyReceived: item.qtyReceived || item.qtyOrder,
                        signerMora: 'Dimas Wicaksono (Logistics Partner)',
                        signerPos: item.receivedBy !== '-' ? item.receivedBy : 'Agus Komarudin (PIC WH)',
                        qrCode: `POS-MR-INB-${item.id}`
                      })}
                      className="w-full flex items-center justify-center space-x-1 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-950 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300 text-[10px] font-bold transition-all border border-blue-200 dark:border-blue-800"
                    >
                      <FileCheck2 className="w-3 h-3 text-[#ff5900]" />
                      <span>Digital BAST</span>
                    </button>

                    {/* Receive Goods Button (if not completed) */}
                    {item.status !== 'Put Away Complete' && (
                      receivingId === item.id ? (
                        <div className="p-2 rounded-xl bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-900 space-y-1.5 text-left w-36">
                          <label className="text-[9px] font-bold text-orange-900 dark:text-orange-200 block">
                            Qty Aktual Fisik:
                          </label>
                          <input
                            type="number"
                            value={receiveQty}
                            onChange={(e) => setReceiveQty(e.target.value)}
                            className="w-full px-2 py-0.5 text-xs rounded bg-white dark:bg-slate-900 border border-orange-300 font-bold"
                          />
                          <div className="flex gap-1 pt-1">
                            <button
                              onClick={() => handleConfirmReceive(item)}
                              className="flex-1 py-1 rounded bg-emerald-600 text-white text-[10px] font-bold"
                            >
                              Validasi
                            </button>
                            <button
                              onClick={() => setReceivingId(null)}
                              className="px-1.5 py-1 rounded bg-slate-200 text-slate-700 text-[10px]"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleOpenReceive(item)}
                          className="w-full flex items-center justify-center space-x-1 px-2.5 py-1 rounded-lg bg-[#ff5900] hover:bg-[#ea4e00] text-white text-[10px] font-bold transition-all shadow-sm"
                        >
                          <Check className="w-3 h-3" />
                          <span>Terima Barang</span>
                        </button>
                      )
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
