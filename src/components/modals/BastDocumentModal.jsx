import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  ShieldCheck, 
  FileCheck2, 
  QrCode, 
  Building2, 
  CheckCircle2, 
  AlertTriangle,
  Calendar,
  Truck,
  Hash
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const BastDocumentModal = () => {
  const { selectedBastDoc, isBastModalOpen, closeBastModal, showToast } = useData();

  if (!isBastModalOpen || !selectedBastDoc) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    showToast(`Dokumen ${selectedBastDoc.docNumber || 'BAST'} berhasil diunduh dalam format PDF!`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white">
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#0b1329] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8 print:border-none print:shadow-none print:my-0">
        
        {/* Top Control Bar (Hidden on Print) */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800 print:hidden">
          <div className="flex items-center space-x-2">
            <FileCheck2 className="w-5 h-5 text-[#ff5900]" />
            <span className="font-bold text-sm tracking-wide">
              Official Digital BAST Viewer • Pos Indonesia ✕ Mora Republic
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-all border border-slate-700 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-sky-400" />
              <span>Cetak / PDF</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-[#ff5900] hover:bg-[#ea4e00] text-white text-xs font-bold transition-all shadow-md shadow-orange-500/20 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={closeBastModal}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-2 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* BAST Document Sheet (A4 Styled Layout) */}
        <div className="p-8 sm:p-12 text-slate-800 dark:text-slate-100 bg-white dark:bg-[#091124] print:p-6 print:text-black">
          
          {/* Header with Dual Logos */}
          <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b-2 border-slate-300 dark:border-slate-700 gap-4">
            
            {/* Pos Indonesia Header */}
            <div className="flex items-center space-x-3 text-left">
              <div className="w-12 h-12 rounded-2xl bg-[#091c52] flex items-center justify-center text-white font-black text-xl shadow-md border border-orange-500/40">
                <span className="text-[#ff5900]">POS</span>
              </div>
              <div>
                <h3 className="font-extrabold text-sm tracking-tight text-[#091c52] dark:text-sky-300 print:text-black">
                  PT POS INDONESIA (PERSERO)
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Direktorat Bisnis Kurir & Logistik • Wholesale & International Business
                </p>
              </div>
            </div>

            {/* Mora Republic Header */}
            <div className="flex items-center space-x-3 text-right">
              <div>
                <h3 className="font-extrabold text-sm tracking-tight text-[#7e22ce] dark:text-purple-300 print:text-black">
                  PT MORA TELEMATIKA INDONESIA
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  MyRepublic Internet Provider • Logistics & Fulfillment Division
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#7e22ce] flex items-center justify-center text-white font-black text-sm shadow-md">
                MR
              </div>
            </div>

          </div>

          {/* Document Title & Number */}
          <div className="text-center my-6 space-y-1">
            <h1 className="text-lg sm:text-xl font-black uppercase tracking-wider text-slate-900 dark:text-white print:text-black underline underline-offset-4 decoration-[#ff5900]">
              BERITA ACARA SERAH TERIMA (BAST) FULFILLMENT
            </h1>
            <p className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300">
              Nomor: {selectedBastDoc.docNumber || 'BAST/POS-MR/2026/08/0142'}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Ref DO/WO: <span className="font-bold text-[#091c52] dark:text-sky-400 font-mono">{selectedBastDoc.relatedDo || selectedBastDoc.doNumber}</span>
            </p>
          </div>

          {/* Opening Statement */}
          <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-5 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 print:border-none print:p-0">
            Pada hari ini <span className="font-bold">Senin, 24 Agustus 2026</span>, bertempat di <span className="font-bold">{selectedBastDoc.warehouse || 'KCU Warehouse Pos Indonesia'}</span>, telah dilakukan serah terima fisik dan validasi telemetri perangkat logistik fulfillment antara para pihak:
          </div>

          {/* Parties Involved */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs">
            <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-[#0e214d]/40 border border-blue-200 dark:border-blue-900/50">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                PIHAK PERTAMA (Penyerah)
              </span>
              <p className="font-bold text-sm text-slate-900 dark:text-white mt-1">
                {selectedBastDoc.signerMora || 'Dimas Wicaksono'}
              </p>
              <p className="text-slate-500 dark:text-slate-400">
                Logistics Partner PIC • PT Mora Telematika Indonesia
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-orange-50/50 dark:bg-[#4a1c06]/30 border border-orange-200 dark:border-orange-900/50">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#ea580c] dark:text-orange-400">
                PIHAK KEDUA (Penerima)
              </span>
              <p className="font-bold text-sm text-slate-900 dark:text-white mt-1">
                {selectedBastDoc.signerPos || 'Agus Komarudin'}
              </p>
              <p className="text-slate-500 dark:text-slate-400">
                PIC Warehouse Pos Indonesia • {selectedBastDoc.warehouse || 'KCU Pos Indonesia'}
              </p>
            </div>
          </div>

          {/* Item Details Table */}
          <div className="mb-6 overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-3 border-b border-slate-300 dark:border-slate-700 text-center w-10">No</th>
                  <th className="py-2.5 px-3 border-b border-slate-300 dark:border-slate-700">Kode SKU</th>
                  <th className="py-2.5 px-3 border-b border-slate-300 dark:border-slate-700">Deskripsi Produk</th>
                  <th className="py-2.5 px-3 border-b border-slate-300 dark:border-slate-700 text-center">Qty Order</th>
                  <th className="py-2.5 px-3 border-b border-slate-300 dark:border-slate-700 text-center">Qty Terima</th>
                  <th className="py-2.5 px-3 border-b border-slate-300 dark:border-slate-700 text-center">Kondisi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="py-3 px-3 text-center font-bold">1</td>
                  <td className="py-3 px-3 font-mono font-bold text-[#091c52] dark:text-sky-300">
                    {selectedBastDoc.sku || '100002650'}
                  </td>
                  <td className="py-3 px-3">
                    <p className="font-bold text-slate-900 dark:text-white">
                      {selectedBastDoc.product || 'Modem CPE ZTE MC8501 ( FWA 5G )'}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Perangkat Fixed Wireless Access 5G Segel Box Resmi
                    </p>
                  </td>
                  <td className="py-3 px-3 text-center font-bold font-mono">
                    {selectedBastDoc.qtyOrder || selectedBastDoc.itemCount || 150} PCS
                  </td>
                  <td className="py-3 px-3 text-center font-bold font-mono text-emerald-600 dark:text-emerald-400">
                    {selectedBastDoc.qtyReceived || selectedBastDoc.itemCount || 150} PCS
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle2 className="w-3 h-3" />
                      Good & Ready
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Statement of Acceptance & QR Code */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mb-8 print:border-none">
            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
              <p className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#ff5900]" />
                Pernyataan Keabsahan Data WMS
              </p>
              <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 max-w-lg">
                Seluruh barang telah diuji fisik, dipindai nomor seri (SN / Barcode) ke sistem WMS, dan tercatat otomatis pada database terpusat PT Pos Indonesia & Mora Republic.
              </p>
            </div>

            {/* Digital Verification QR Stamp */}
            <div className="flex items-center space-x-3 p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex-shrink-0">
              <div className="p-1 rounded-lg bg-slate-900 text-white">
                <QrCode className="w-10 h-10" />
              </div>
              <div className="text-left">
                <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono block w-fit">
                  DIGITALLY SIGNED
                </span>
                <span className="text-[10px] font-mono text-slate-600 dark:text-slate-300 font-bold block mt-0.5">
                  ID: {selectedBastDoc.qrCode || 'POS-MR-BAST-20260828'}
                </span>
              </div>
            </div>
          </div>

          {/* Signature Grid */}
          <div className="grid grid-cols-2 gap-8 text-center text-xs">
            <div className="space-y-16">
              <div>
                <p className="text-slate-500 dark:text-slate-400">Pihak Pertama,</p>
                <p className="font-bold text-slate-900 dark:text-white">PT Mora Telematika Indonesia</p>
              </div>
              <div>
                <p className="font-bold underline text-slate-900 dark:text-white">
                  ( {selectedBastDoc.signerMora || 'Dimas Wicaksono'} )
                </p>
                <p className="text-[10px] text-slate-500">Logistics Partner Specialist</p>
              </div>
            </div>

            <div className="space-y-16">
              <div>
                <p className="text-slate-500 dark:text-slate-400">Pihak Kedua,</p>
                <p className="font-bold text-slate-900 dark:text-white">PT Pos Indonesia (Persero)</p>
              </div>
              <div>
                <p className="font-bold underline text-slate-900 dark:text-white">
                  ( {selectedBastDoc.signerPos || 'Agus Komarudin'} )
                </p>
                <p className="text-[10px] text-slate-500">PIC Warehouse Pos Indonesia</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
