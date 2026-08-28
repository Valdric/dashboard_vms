import React, { useState } from 'react';
import { X, PlusCircle, FileText, ArrowUpFromLine, Layers, Sparkles } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AddTransactionModal = () => {
  const { 
    isAddTxModalOpen, 
    setIsAddTxModalOpen, 
    warehouses, 
    products, 
    addTransaction 
  } = useData();

  const [txType, setTxType] = useState('Work Order'); // 'Work Order' | 'Outbound' | 'Stock'
  const [formData, setFormData] = useState({
    woNumber: '',
    warehouse: 'KCU JAKARTA PUSAT - 10000',
    product: 'Modem CPE ZTE MC8501 ( FWA 5G )',
    sku: '100002650',
    category: 'Modem / CPE Router',
    totalQty: 25,
    autoGenerateSN: true,
    status: 'Complete',
    consignee: '',
    serialNumber: '',
    ready: 25,
    booked: 0,
    damage: 0,
    uom: 'PCS',
    notes: 'Penerbitan via VMS Work Order'
  });

  if (!isAddTxModalOpen) return null;

  const handleProductChange = (prodName) => {
    const matched = products.find(p => p.name === prodName);
    setFormData({
      ...formData,
      product: prodName,
      sku: matched ? matched.sku : '100002650',
      category: matched ? matched.category : 'Modem / Device',
      uom: matched ? matched.uom : 'PCS'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction(txType, formData);
    setIsAddTxModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl glass-card rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-slide-up bg-white dark:bg-[#0d1527]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-[#091329]">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-orange-100 dark:bg-orange-950/80 text-[#ff5900]">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Buat Transaksi / Work Order VMS
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Penerbitan Work Order baru akan menghasilkan SKU dan menerbitkan Serial Number
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAddTxModalOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Transaction Type Switcher */}
        <div className="flex items-center gap-2 p-6 pb-2">
          {[
            { type: 'Work Order', label: '1. Work Order & Terbit SN', icon: FileText },
            { type: 'Outbound', label: '2. Pengiriman Outbound', icon: ArrowUpFromLine },
            { type: 'Stock', label: '3. Registrasi SKU Stock', icon: Layers }
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = txType === item.type;

            return (
              <button
                key={item.type}
                type="button"
                onClick={() => setTxType(item.type)}
                className={`flex-1 flex items-center justify-center space-x-2 py-2.5 px-3 rounded-2xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#0e2b7a] to-[#1a4ca8] text-white shadow-md shadow-blue-900/30'
                    : 'bg-slate-100 dark:bg-[#070c18] text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-[#ff5900]' : ''}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Warehouse Dropdown */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Gudang / KCU Tujuan
              </label>
              <select
                value={formData.warehouse}
                onChange={(e) => setFormData({ ...formData, warehouse: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none cursor-pointer"
              >
                {warehouses.filter(w => w !== 'All').map(wh => (
                  <option key={wh} value={wh}>{wh}</option>
                ))}
              </select>
            </div>

            {/* Product Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Pilih Jenis Barang / Modem
              </label>
              <select
                value={formData.product}
                onChange={(e) => handleProductChange(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none cursor-pointer font-semibold"
              >
                {products.map(p => (
                  <option key={p.sku} value={p.name}>{p.name} — SKU: {p.sku}</option>
                ))}
              </select>
            </div>

            {/* SKU Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Kode SKU Barang
              </label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono font-bold focus:outline-none"
                required
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Total Jumlah Unit (Qty)
              </label>
              <input
                type="number"
                min="1"
                value={formData.totalQty}
                onChange={(e) => setFormData({ ...formData, totalQty: e.target.value, ready: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none font-bold font-mono"
                required
              />
            </div>

            {/* WO Specific: Auto-generate SN Checkbox */}
            {txType === 'Work Order' && (
              <div className="sm:col-span-2 p-3.5 rounded-2xl bg-orange-50/80 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="autoSN"
                    checked={formData.autoGenerateSN}
                    onChange={(e) => setFormData({ ...formData, autoGenerateSN: e.target.checked })}
                    className="w-4 h-4 rounded text-[#ff5900] focus:ring-[#ff5900] cursor-pointer"
                  />
                  <label htmlFor="autoSN" className="text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">
                    Terbitkan & Generate Serial Number (SN) secara otomatis untuk SKU ini
                  </label>
                </div>
                <Sparkles className="w-4 h-4 text-[#ff5900]" />
              </div>
            )}

            {/* Outbound Specific: Consignee & SN */}
            {txType === 'Outbound' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nama Penerima (Consignee)
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Penerima POS IND Denpasar"
                    value={formData.consignee}
                    onChange={(e) => setFormData({ ...formData, consignee: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Serial Number (Opsional)
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: 324661593020"
                    value={formData.serialNumber}
                    onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none font-mono"
                  />
                </div>
              </>
            )}

          </div>

          {/* Submit */}
          <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#ff5900] to-[#ea4e00] hover:from-[#ea4e00] hover:to-[#c23b00] text-white text-xs font-bold shadow-lg shadow-orange-500/25 transition-all active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Simpan & Terbitkan {txType}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
