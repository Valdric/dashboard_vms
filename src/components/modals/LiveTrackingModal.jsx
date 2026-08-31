import React from 'react';
import { 
  X, 
  Truck, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Package, 
  Building2, 
  Phone, 
  User, 
  Send, 
  QrCode,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const LiveTrackingModal = () => {
  const { isTrackingModalOpen, closeTrackingModal, selectedTrackingItem } = useData();

  if (!isTrackingModalOpen || !selectedTrackingItem) return null;

  const item = selectedTrackingItem;
  const isInbound = item.doNumber && item.doNumber.includes('INB');

  const steps = isInbound ? [
    { title: 'DO Inbound Diterbitkan', subtitle: 'Mora Republic membuat order DO Inbound', time: item.createdDate || '2026-08-28 08:30', done: true },
    { title: 'Penjemputan (Pickup) oleh SLP', subtitle: 'SLP KC Tangerang Selatan mengambil barang', time: item.pickupScheduled || '2026-08-28 10:00', done: true },
    { title: 'Pengiriman Middle Mile', subtitle: 'Armada Pos Logistik transit ke KCU Tujuan', time: '2026-08-28 12:45', done: item.status !== 'Pickup Scheduled' },
    { title: 'Receiving & Validasi SN/Barcode', subtitle: `Diterima di ${item.targetWarehouse || item.warehouse}`, time: item.receivedAt || '2026-08-28 14:20', done: item.status === 'Put Away Complete' || item.status === 'Received - Exception Logged' },
    { title: 'Put Away Lokasi Rak', subtitle: 'Barang ditempatkan di rak penyimpanan stok', time: '2026-08-28 16:30', done: item.status === 'Put Away Complete' }
  ] : [
    { title: 'DO Outbound Diterbitkan', subtitle: item.isAfterCutOff ? 'Order lewat jam 15:00 WIB (H+1 Proses)' : 'Order masuk sebelum 15:00 WIB (H+0 Proses)', time: `${item.date} ${item.orderTime || '09:15'}`, done: true },
    { title: 'Alokasi Stok & Picking', subtitle: 'Pengambilan unit sesuai lokasi rak & scan SN', time: `${item.date} 10:30`, done: item.status !== 'Request' },
    { title: 'Packing & Quality Check', subtitle: 'Pengemasan kardus aman & cetak Surat Jalan', time: `${item.date} 11:45`, done: item.status !== 'Request' && item.status !== 'Picking' },
    { title: 'Handover Kurir PosAja / Transporter', subtitle: `${item.courierName || 'Kurir PosAja Express'} (${item.serviceType || 'Reguler'})`, time: `${item.date} 13:00`, done: item.status === 'Delivery' || item.status === 'Delivered' },
    { title: 'Selesai Diterima Pelanggan', subtitle: `Diterima oleh ${item.consignee || 'Pelanggan'}`, time: item.status === 'Delivered' ? `${item.date} 15:30` : 'Estimasi hari ini', done: item.status === 'Delivered' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0b1329] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#091c52] via-[#0e2b7a] to-[#123896] text-white">
          <div className="flex items-center space-x-2.5">
            <Truck className="w-5 h-5 text-[#ff5900]" />
            <div>
              <h3 className="font-bold text-sm tracking-wide">
                Live Telemetri & Tracking Fulfillment
              </h3>
              <p className="text-[11px] text-sky-200">
                Layanan: <span className="font-semibold text-white">{item.serviceType || 'Reguler'}</span> • SLA: <span className="text-emerald-300 font-bold">{item.slaStatus || 'On-Time'}</span>
              </p>
            </div>
          </div>
          <button
            onClick={closeTrackingModal}
            className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Order Overview Card */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#ff5900] tracking-wider block">
                {isInbound ? 'NOMOR DO INBOUND' : 'NOMOR DO OUTBOUND'}
              </span>
              <h4 className="text-base font-black text-slate-900 dark:text-white font-mono">
                {item.doNumber || item.poNumber}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                AWB / Resi: <span className="font-mono font-bold text-[#091c52] dark:text-sky-300">{item.awbNumber || item.referenceNumber || 'POS-AWB-20260828-9901'}</span>
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                item.status === 'Delivered' || item.status === 'Put Away Complete'
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                  : 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-800'
              }`}>
                <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                {item.status}
              </span>
              <p className="text-[11px] text-slate-400 mt-1">
                Lokasi: {item.warehouse || item.targetWarehouse}
              </p>
            </div>
          </div>

          {/* Product & Device Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
              <p className="text-slate-400 text-[10px] uppercase font-bold">Produk & Serial Number</p>
              <p className="font-bold text-slate-900 dark:text-white">{item.product}</p>
              <p className="text-slate-500 font-mono">SKU: {item.sku} • Qty: {item.totalQty || item.qtyOrder} PCS</p>
              {item.serialNumber && item.serialNumber !== '-' && (
                <p className="text-[#ff5900] font-mono font-bold">SN: {item.serialNumber}</p>
              )}
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
              <p className="text-slate-400 text-[10px] uppercase font-bold">Tujuan / Penerima</p>
              <p className="font-bold text-slate-900 dark:text-white">{item.consignee || item.targetWarehouse}</p>
              <p className="text-slate-500">{item.address || 'Gudang Tujuan Pos Indonesia'}</p>
              {item.consigneePhone && (
                <p className="text-sky-600 dark:text-sky-400 font-semibold">{item.consigneePhone}</p>
              )}
            </div>
          </div>

          {/* End-to-End Visual Timeline */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Riwayat Perjalanan & Milestone Status
            </h5>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
              {steps.map((step, idx) => (
                <div key={idx} className="relative flex items-start space-x-3">
                  <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    step.done
                      ? 'bg-[#ff5900] text-white ring-4 ring-orange-100 dark:ring-orange-950/60'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-500 ring-4 ring-slate-100 dark:ring-slate-900'
                  }`}>
                    {step.done ? '✓' : idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`text-xs font-bold ${step.done ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>
                        {step.title}
                      </p>
                      <span className="text-[10px] text-slate-400 font-mono">{step.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {step.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Courier & Telemetry Info */}
          {item.courierName && (
            <div className="p-3.5 rounded-2xl bg-orange-50/60 dark:bg-[#4a1c06]/30 border border-orange-200 dark:border-orange-900/50 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-[#ff5900] text-white">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">
                    {item.courierName}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Petugas Dispatcher / Kurir Aktif
                  </p>
                </div>
              </div>
              <span className="font-mono font-bold text-[#ff5900]">
                {item.courierPhone || '+62 811-0000-0000'}
              </span>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
