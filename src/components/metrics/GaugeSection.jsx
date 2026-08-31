import React from 'react';
import { 
  ArrowDownToLine, 
  Layers, 
  ArrowUpFromLine, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Truck,
  Send,
  Boxes
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const GaugeSection = () => {
  const { metrics, selectedWarehouse } = useData();

  // 1. Inbound Gauge Math
  const inbTotal = Math.max(1, metrics.inboundStats.total);
  const inbPercent = Math.min(100, Math.round((metrics.inboundStats.complete / inbTotal) * 100)) || 100;

  // 2. Stock Health Gauge Math
  const stockTotal = Math.max(1, metrics.stockStats.ready + metrics.stockStats.booked + metrics.stockStats.damage);
  const stockGoodPercent = Math.min(100, Math.round((metrics.stockStats.ready / stockTotal) * 100)) || 99;

  // 3. Outbound SLA Gauge Math
  const outTotal = Math.max(1, metrics.outboundStats.request + metrics.outboundStats.realization + metrics.outboundStats.delivery + metrics.outboundStats.delivered);
  const outHandoverTotal = metrics.outboundStats.realization + metrics.outboundStats.delivery + metrics.outboundStats.delivered;
  const outPercent = Math.min(100, Math.round((outHandoverTotal / outTotal) * 100)) || 80;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
      
      {/* GAUGE 1: Inbound & Receiving Fulfillment */}
      <div className="glass-card rounded-2xl p-5 shadow-sm border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800/80">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <ArrowDownToLine className="w-4 h-4 text-[#ff5900]" />
              Inbound & Receiving SLA
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950 text-[#ff5900]">
              SLP Tangsel
            </span>
          </div>

          {/* Semi-Circle Progress Arch */}
          <div className="relative flex flex-col items-center justify-center my-4">
            <svg viewBox="0 0 200 110" className="w-44 h-24 overflow-visible">
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="16"
                strokeLinecap="round"
                className="dark:stroke-slate-800"
              />
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="url(#gradInbound)"
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * inbPercent) / 100}
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="gradInbound" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#091c52" />
                  <stop offset="50%" stopColor="#123896" />
                  <stop offset="100%" stopColor="#ff5900" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute bottom-0 text-center">
              <span className="text-2xl font-black text-slate-900 dark:text-white font-sans">
                {inbPercent}%
              </span>
              <span className="block text-[10px] text-slate-400 font-semibold">
                Tingkat Penyelesaian
              </span>
            </div>
          </div>
        </div>

        {/* Sub Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-200/80 dark:border-slate-800/80 text-center text-xs">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-2 rounded-xl">
            <span className="text-[10px] text-slate-400 block font-medium">Order Total</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{metrics.inboundStats.total} DO</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900/60 p-2 rounded-xl">
            <span className="text-[10px] text-slate-400 block font-medium">Put Away</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">{metrics.inboundStats.complete} Selesai</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900/60 p-2 rounded-xl">
            <span className="text-[10px] text-slate-400 block font-medium">Selisih Qty</span>
            <span className="font-bold text-rose-600 dark:text-rose-400">{metrics.inboundStats.exceptions} Tiket</span>
          </div>
        </div>
      </div>

      {/* GAUGE 2: Inventory Quality & Ready Ratio */}
      <div className="glass-card rounded-2xl p-5 shadow-sm border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800/80">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-500" />
              Kesehatan Stok Fisik (Good)
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
              Akurasi ≥ 99%
            </span>
          </div>

          {/* Semi-Circle Progress Arch */}
          <div className="relative flex flex-col items-center justify-center my-4">
            <svg viewBox="0 0 200 110" className="w-44 h-24 overflow-visible">
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="16"
                strokeLinecap="round"
                className="dark:stroke-slate-800"
              />
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="url(#gradStock)"
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * stockGoodPercent) / 100}
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="gradStock" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#047857" />
                  <stop offset="70%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#34d399" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute bottom-0 text-center">
              <span className="text-2xl font-black text-slate-900 dark:text-white font-sans">
                {stockGoodPercent}%
              </span>
              <span className="block text-[10px] text-slate-400 font-semibold">
                Kondisi Good / Ready
              </span>
            </div>
          </div>
        </div>

        {/* Sub Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-200/80 dark:border-slate-800/80 text-center text-xs">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-2 rounded-xl">
            <span className="text-[10px] text-slate-400 block font-medium">Ready (Good)</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">{metrics.stockStats.ready}</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900/60 p-2 rounded-xl">
            <span className="text-[10px] text-slate-400 block font-medium">Booked</span>
            <span className="font-bold text-amber-600 dark:text-amber-400">{metrics.stockStats.booked}</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900/60 p-2 rounded-xl">
            <span className="text-[10px] text-slate-400 block font-medium">Damaged</span>
            <span className="font-bold text-rose-600 dark:text-rose-400">{metrics.stockStats.damage}</span>
          </div>
        </div>
      </div>

      {/* GAUGE 3: Outbound & Last Mile Execution */}
      <div className="glass-card rounded-2xl p-5 shadow-sm border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800/80">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <ArrowUpFromLine className="w-4 h-4 text-blue-500" />
              Outbound & Delivery Fulfillment
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
              PosAja Courier
            </span>
          </div>

          {/* Semi-Circle Progress Arch */}
          <div className="relative flex flex-col items-center justify-center my-4">
            <svg viewBox="0 0 200 110" className="w-44 h-24 overflow-visible">
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="16"
                strokeLinecap="round"
                className="dark:stroke-slate-800"
              />
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="url(#gradOutbound)"
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * outPercent) / 100}
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="gradOutbound" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1d4ed8" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute bottom-0 text-center">
              <span className="text-2xl font-black text-slate-900 dark:text-white font-sans">
                {outPercent}%
              </span>
              <span className="block text-[10px] text-slate-400 font-semibold">
                Realisasi Outbound
              </span>
            </div>
          </div>
        </div>

        {/* Sub Metrics */}
        <div className="grid grid-cols-4 gap-1.5 pt-3 border-t border-slate-200/80 dark:border-slate-800/80 text-center text-xs">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-1.5 rounded-xl">
            <span className="text-[9px] text-slate-400 block font-medium">Request</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 text-xs">{metrics.outboundStats.request}</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900/60 p-1.5 rounded-xl">
            <span className="text-[9px] text-slate-400 block font-medium">Handover</span>
            <span className="font-bold text-blue-600 dark:text-blue-400 text-xs">{metrics.outboundStats.realization}</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900/60 p-1.5 rounded-xl">
            <span className="text-[9px] text-slate-400 block font-medium">Delivery</span>
            <span className="font-bold text-teal-600 dark:text-teal-400 text-xs">{metrics.outboundStats.delivery}</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900/60 p-1.5 rounded-xl">
            <span className="text-[9px] text-slate-400 block font-medium">Delivered</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xs">{metrics.outboundStats.delivered}</span>
          </div>
        </div>
      </div>

    </div>
  );
};
