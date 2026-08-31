import React, { useState } from 'react';
import { 
  X, 
  PlusCircle, 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  Layers, 
  RotateCcw, 
  Sliders, 
  Clock, 
  Truck, 
  ShieldCheck, 
  AlertCircle,
  Building2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AddTransactionModal = () => {
  const { 
    isAddTxModalOpen, 
    setIsAddTxModalOpen, 
    warehouses, 
    serviceTypes,
    products, 
    createInboundOrder,
    createOutboundOrder,
    requestStockAdjustment,
    processRetur,
    selectedWarehouse
  } = useData();

  const [activeTab, setActiveTab] = useState('Inbound'); // 'Inbound' | 'Outbound' | 'Adjustment' | 'Retur'

  // Current time for Cut-off preview
  const currentHour = new Date().getHours();
  const isAfterCutOff = currentHour >= 15;

  // Inbound Form State
  const [inboundForm, setInboundForm] = useState({
    doNumber: '',
    targetWarehouse: selectedWarehouse !== 'All' ? selectedWarehouse : 'KCU DENPASAR - 80000',
    sku: '100002650',
    qtyOrder: 150,
    pickupScheduled: '2026-08-28 10:00',
    transporter: 'Pos Logistik Indonesia (Truck Box CDD)',
    driverName: 'Eko Wahyudi (+62 813-1122-3344)',
    vehiclePlate: 'B 9874 POS',
    notes: 'Pengiriman batch stok reguler dari Gudang Mora Serpong BSD.'
  });

  // Outbound Form State
  const [outboundForm, setOutboundForm] = useState({
    poNumber: '',
    warehouse: selectedWarehouse !== 'All' ? selectedWarehouse : 'KCU DENPASAR - 80000',
    consignee: 'Sumadi Irawan',
    consigneePhone: '+62 812-9988-7766',
    address: 'Jl. Teuku Umar No. 88, Denpasar Barat, Bali',
    sku: '100002650',
    totalQty: 1,
    serviceType: 'Reguler',
    serialNumber: ''
  });

  // Stock Adjustment Form State
  const [adjForm, setAdjForm] = useState({
    warehouse: selectedWarehouse !== 'All' ? selectedWarehouse : 'KCU JAKARTA PUSAT - 10000',
    sku: '100003120',
    qtyBefore: 1250,
    qtyAdjusted: 2,
    reasonCategory: 'Temuan Fisik Stock Opname',
    reasonDetail: 'Pencocokan fisik serial number di rak penyimpanan gudang.'
  });

  // Retur Form State
  const [returForm, setReturForm] = useState({
    returNumber: '',
    originalDoNumber: 'DO/OUT/MR/260825-00002',
    awbNumber: 'POS-AWB-20260825-7719',
    customerName: 'Hendra Saputra',
    customerPhone: '+62 812-7788-9900',
    warehouse: selectedWarehouse !== 'All' ? selectedWarehouse : 'KCU JAKARTA PUSAT - 10000',
    sku: '100002650',
    serialNumber: '324661596781',
    qty: 1,
    reason: 'Gagal Pasang / Batal Langganan',
    physicalCondition: 'Good - Segel Utuh Lengkap Aksesoris',
    triageDecision: 'Restock to Inventory (Good)',
    notes: 'Perangkat dites sinyal 5G lolos 100%, siap dialokasikan kembali.'
  });

  if (!isAddTxModalOpen) return null;

  const handleInboundSubmit = (e) => {
    e.preventDefault();
    const prod = products.find(p => p.sku === inboundForm.sku) || products[0];
    createInboundOrder({
      ...inboundForm,
      product: prod.name,
      category: prod.category
    });
    setIsAddTxModalOpen(false);
  };

  const handleOutboundSubmit = (e) => {
    e.preventDefault();
    const prod = products.find(p => p.sku === outboundForm.sku) || products[0];
    createOutboundOrder({
      ...outboundForm,
      product: prod.name
    });
    setIsAddTxModalOpen(false);
  };

  const handleAdjSubmit = (e) => {
    e.preventDefault();
    const prod = products.find(p => p.sku === adjForm.sku) || products[0];
    requestStockAdjustment({
      ...adjForm,
      product: prod.name
    });
    setIsAddTxModalOpen(false);
  };

  const handleReturSubmit = (e) => {
    e.preventDefault();
    const prod = products.find(p => p.sku === returForm.sku) || products[0];
    processRetur({
      ...returForm,
      product: prod.name
    });
    setIsAddTxModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0b1329] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#091c52] via-[#0e2b7a] to-[#123896] text-white">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-[#ff5900] text-white shadow-md">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-tight">
                Buat Entri Transaksi WMS Baru
              </h3>
              <p className="text-[11px] text-sky-200">
                Sesuai Standar Operasional SKB Mora Republic ✕ PT Pos Indonesia
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAddTxModalOpen(false)}
            className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex items-center p-2 bg-slate-100 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 gap-1.5 overflow-x-auto">
          <button
            onClick={() => setActiveTab('Inbound')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'Inbound'
                ? 'bg-[#ff5900] text-white shadow-md shadow-orange-500/30'
                : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <ArrowDownToLine className="w-3.5 h-3.5" />
            <span>DO Inbound (Pickup SLP)</span>
          </button>

          <button
            onClick={() => setActiveTab('Outbound')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'Outbound'
                ? 'bg-[#0e2b7a] text-white shadow-md shadow-blue-900/30'
                : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <ArrowUpFromLine className="w-3.5 h-3.5" />
            <span>DO Outbound (Last Mile)</span>
          </button>

          <button
            onClick={() => setActiveTab('Adjustment')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'Adjustment'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Stock Adjustment</span>
          </button>

          <button
            onClick={() => setActiveTab('Retur')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'Retur'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Penerimaan Retur</span>
          </button>
        </div>

        {/* Modal Form Content */}
        <div className="p-6">
          
          {/* ================= 1. FORM INBOUND ================= */}
          {activeTab === 'Inbound' && (
            <form onSubmit={handleInboundSubmit} className="space-y-4 text-xs">
              <div className="p-3 rounded-2xl bg-blue-50/60 dark:bg-[#0e214d]/30 border border-blue-200 dark:border-blue-900/50 flex items-start gap-2.5">
                <ArrowDownToLine className="w-4 h-4 text-[#ff5900] flex-shrink-0 mt-0.5" />
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  DO Inbound dibuat oleh <span className="font-bold">Mora Republic</span>. Barang akan dijemput oleh <span className="font-bold">SLP KC Tangerang Selatan</span> dan dikirim via Middle Mile menuju KCU tujuan.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                    Gudang Tujuan (KCU Pos Indonesia)
                  </label>
                  <select
                    value={inboundForm.targetWarehouse}
                    onChange={(e) => setInboundForm({ ...inboundForm, targetWarehouse: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-[#ff5900]"
                  >
                    {warehouses.filter(w => w !== 'All').map(w => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                    Pilih Produk & SKU
                  </label>
                  <select
                    value={inboundForm.sku}
                    onChange={(e) => setInboundForm({ ...inboundForm, sku: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-[#ff5900]"
                  >
                    {products.map(p => (
                      <option key={p.sku} value={p.sku}>{p.name} ({p.sku})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                    Jumlah Barang (Qty Order)
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={inboundForm.qtyOrder}
                    onChange={(e) => setInboundForm({ ...inboundForm, qtyOrder: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-[#ff5900]"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                    Jadwal Pickup di Gudang Mora
                  </label>
                  <input
                    type="text"
                    value={inboundForm.pickupScheduled}
                    onChange={(e) => setInboundForm({ ...inboundForm, pickupScheduled: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-[#ff5900]"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                    Driver & Armada Pos Logistik
                  </label>
                  <input
                    type="text"
                    value={inboundForm.driverName}
                    onChange={(e) => setInboundForm({ ...inboundForm, driverName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-[#ff5900]"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                    Nomor Polisi Kendaraan
                  </label>
                  <input
                    type="text"
                    value={inboundForm.vehiclePlate}
                    onChange={(e) => setInboundForm({ ...inboundForm, vehiclePlate: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-[#ff5900]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                  Catatan Instruksi Operasional
                </label>
                <textarea
                  rows="2"
                  value={inboundForm.notes}
                  onChange={(e) => setInboundForm({ ...inboundForm, notes: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-[#ff5900]"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddTxModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#ff5900] hover:bg-[#ea4e00] text-white font-bold shadow-md shadow-orange-500/25 flex items-center space-x-1.5"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Terbitkan DO Inbound</span>
                </button>
              </div>
            </form>
          )}

          {/* ================= 2. FORM OUTBOUND ================= */}
          {activeTab === 'Outbound' && (
            <form onSubmit={handleOutboundSubmit} className="space-y-4 text-xs">
              {/* SLA & Cut-Off Notice Banner (SKB 3.2) */}
              <div className={`p-3 rounded-2xl border flex items-start gap-2.5 ${
                isAfterCutOff
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                  : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
              }`}>
                <Clock className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div className="text-[11px] leading-relaxed">
                  <span className="font-bold">Ketentuan Cut-Off Waktu Order (SKB 3.2): </span>
                  {isAfterCutOff ? (
                    <span>Order masuk <span className="font-bold">setelah jam 15:00 WIB</span>. Sesuai SLA, entri & dispatch akan diproses pada hari berikutnya (H+1).</span>
                  ) : (
                    <span>Order masuk <span className="font-bold">sebelum jam 15:00 WIB</span>. Diproses pengentrian dan pengiriman pada hari yang sama (H+0).</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                    Gudang Asal Pemenuhan (KCU)
                  </label>
                  <select
                    value={outboundForm.warehouse}
                    onChange={(e) => setOutboundForm({ ...outboundForm, warehouse: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-[#0e2b7a]"
                  >
                    {warehouses.filter(w => w !== 'All').map(w => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                    Jenis Layanan Pengiriman (SKB 3.2)
                  </label>
                  <select
                    value={outboundForm.serviceType}
                    onChange={(e) => setOutboundForm({ ...outboundForm, serviceType: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-[#0e2b7a]"
                  >
                    {serviceTypes.map(s => (
                      <option key={s.id} value={s.id}>{s.label} ({s.slaDays})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                    Nama Pelanggan (Consignee)
                  </label>
                  <input
                    type="text"
                    required
                    value={outboundForm.consignee}
                    onChange={(e) => setOutboundForm({ ...outboundForm, consignee: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-[#0e2b7a]"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                    No. Handphone / WhatsApp
                  </label>
                  <input
                    type="text"
                    required
                    value={outboundForm.consigneePhone}
                    onChange={(e) => setOutboundForm({ ...outboundForm, consigneePhone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-[#0e2b7a]"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                    Produk yang Dikeluarkan
                  </label>
                  <select
                    value={outboundForm.sku}
                    onChange={(e) => setOutboundForm({ ...outboundForm, sku: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-[#0e2b7a]"
                  >
                    {products.map(p => (
                      <option key={p.sku} value={p.sku}>{p.name} ({p.sku})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                    Jumlah (Qty)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    required
                    value={outboundForm.totalQty}
                    onChange={(e) => setOutboundForm({ ...outboundForm, totalQty: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-[#0e2b7a]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                  Alamat Lengkap Pengiriman End Customer
                </label>
                <textarea
                  rows="2"
                  required
                  value={outboundForm.address}
                  onChange={(e) => setOutboundForm({ ...outboundForm, address: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-[#0e2b7a]"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddTxModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0e2b7a] hover:bg-[#091c52] text-white font-bold shadow-md shadow-blue-900/30 flex items-center space-x-1.5"
                >
                  <ArrowUpFromLine className="w-4 h-4 text-[#ff5900]" />
                  <span>Terbitkan DO Outbound</span>
                </button>
              </div>
            </form>
          )}

          {/* ================= 3. FORM STOCK ADJUSTMENT ================= */}
          {activeTab === 'Adjustment' && (
            <form onSubmit={handleAdjSubmit} className="space-y-4 text-xs">
              <div className="p-3 rounded-2xl bg-amber-50/60 dark:bg-[#4d320e]/30 border border-amber-200 dark:border-amber-900/50 flex items-start gap-2.5">
                <Sliders className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  Sesuai ketentuan <span className="font-bold">SKB 5.3</span>: Setiap penyesuaian stok di luar transaksi normal wajib menyertakan alasan spesifik dan memerlukan persetujuan <span className="font-bold">Supervisor Operasional</span>.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                    Gudang Warehouse (KCU)
                  </label>
                  <select
                    value={adjForm.warehouse}
                    onChange={(e) => setAdjForm({ ...adjForm, warehouse: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-500"
                  >
                    {warehouses.filter(w => w !== 'All').map(w => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                    Produk SKU
                  </label>
                  <select
                    value={adjForm.sku}
                    onChange={(e) => setAdjForm({ ...adjForm, sku: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-500"
                  >
                    {products.map(p => (
                      <option key={p.sku} value={p.sku}>{p.name} ({p.sku})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                    Kategori Alasan Penyesuaian
                  </label>
                  <select
                    value={adjForm.reasonCategory}
                    onChange={(e) => setAdjForm({ ...adjForm, reasonCategory: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Temuan Fisik Stock Opname">Temuan Fisik Stock Opname (+/-)</option>
                    <option value="Kerusakan Fisik Transit Inbound">Kerusakan Fisik Transit Inbound (-)</option>
                    <option value="Koreksi Salah Input Data">Koreksi Salah Input Data</option>
                    <option value="Peralihan Status Karantina / Retur">Peralihan Status Karantina / Retur</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                    Jumlah Perubahan (+ atau -)
                  </label>
                  <input
                    type="number"
                    required
                    value={adjForm.qtyAdjusted}
                    onChange={(e) => setAdjForm({ ...adjForm, qtyAdjusted: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-500 font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                  Justifikasi Detail & Keterangan Pengajuan
                </label>
                <textarea
                  rows="2"
                  required
                  value={adjForm.reasonDetail}
                  onChange={(e) => setAdjForm({ ...adjForm, reasonDetail: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddTxModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-md shadow-amber-600/30 flex items-center space-x-1.5"
                >
                  <Sliders className="w-4 h-4" />
                  <span>Ajukan Penyesuaian Stok</span>
                </button>
              </div>
            </form>
          )}

          {/* ================= 4. FORM RETUR ================= */}
          {activeTab === 'Retur' && (
            <form onSubmit={handleReturSubmit} className="space-y-4 text-xs">
              <div className="p-3 rounded-2xl bg-rose-50/60 dark:bg-[#4d0e1c]/30 border border-rose-200 dark:border-rose-900/50 flex items-start gap-2.5">
                <RotateCcw className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  Pencatatan barang retur dari end customer ke warehouse Pos Indonesia (SKB 5.2.2 #17-#18).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                    Gudang Penerima Retur (KCU)
                  </label>
                  <select
                    value={returForm.warehouse}
                    onChange={(e) => setReturForm({ ...returForm, warehouse: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-rose-500"
                  >
                    {warehouses.filter(w => w !== 'All').map(w => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                    Nama Pelanggan / Akun MyRepublic
                  </label>
                  <input
                    type="text"
                    required
                    value={returForm.customerName}
                    onChange={(e) => setReturForm({ ...returForm, customerName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                    Serial Number / Barcode Perangkat
                  </label>
                  <input
                    type="text"
                    required
                    value={returForm.serialNumber}
                    onChange={(e) => setReturForm({ ...returForm, serialNumber: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-rose-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                    Alasan Pengembalian (Retur)
                  </label>
                  <select
                    value={returForm.reason}
                    onChange={(e) => setReturForm({ ...returForm, reason: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-rose-500"
                  >
                    <option value="Gagal Pasang / Batal Langganan">Gagal Pasang / Batal Langganan</option>
                    <option value="Perangkat Mati Total (DoA / Defective)">Perangkat Mati Total (DoA / Defective)</option>
                    <option value="Alamat Tidak Ditemukan">Alamat Tidak Ditemukan</option>
                    <option value="Upgrade / Tukar Tipe Perangkat">Upgrade / Tukar Tipe Perangkat</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                    Hasil Uji Kondisi Fisik
                  </label>
                  <input
                    type="text"
                    value={returForm.physicalCondition}
                    onChange={(e) => setReturForm({ ...returForm, physicalCondition: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                    Keputusan Triage / Penanganan
                  </label>
                  <select
                    value={returForm.triageDecision}
                    onChange={(e) => setReturForm({ ...returForm, triageDecision: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-rose-500 font-bold"
                  >
                    <option value="Restock to Inventory (Good)">Restock to Inventory (Good/Siap Pakai)</option>
                    <option value="Quarantine / Klaim Garansi Vendor">Quarantine / Klaim Garansi Vendor</option>
                    <option value="Scrapped / Afkir Fisik">Scrapped / Afkir Fisik</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddTxModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-md shadow-rose-600/30 flex items-center space-x-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Simpan Penerimaan Retur</span>
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
