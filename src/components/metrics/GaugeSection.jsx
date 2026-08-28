import React from 'react';
import { useData } from '../../context/DataContext';
import { FileText, Layers, ArrowUpFromLine } from 'lucide-react';

const SemiCircleGauge = ({ segments, totalValue, totalLabel }) => {
  const radius = 70;
  const strokeWidth = 16;
  const circumference = Math.PI * radius; // Half circle perimeter
  
  let accumulatedPercent = 0;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-28 flex items-end justify-center">
        <svg viewBox="0 0 160 90" className="w-48 h-28 overflow-visible">
          <defs>
            {segments.map((seg, idx) => (
              <linearGradient key={idx} id={`vms-grad-${seg.label.replace(/\s+/g, '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={seg.colorStart || seg.color} />
                <stop offset="100%" stopColor={seg.colorEnd || seg.color} />
              </linearGradient>
            ))}
          </defs>

          {/* Background Track Arc */}
          <path
            d="M 10 80 A 70 70 0 0 1 150 80"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className="text-slate-100 dark:text-[#0b1329]"
          />

          {/* Value Segments Arc */}
          {totalValue > 0 ? (
            segments.map((seg) => {
              if (seg.value <= 0) return null;
              const segPercent = (seg.value / totalValue);
              const dashLength = segPercent * circumference;
              const offset = -accumulatedPercent * circumference;
              accumulatedPercent += segPercent;

              return (
                <path
                  key={seg.label}
                  d="M 10 80 A 70 70 0 0 1 150 80"
                  fill="none"
                  stroke={`url(#vms-grad-${seg.label.replace(/\s+/g, '')})`}
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${dashLength} ${circumference}`}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out hover:opacity-90 cursor-pointer"
                >
                  <title>{`${seg.label}: ${seg.value} (${Math.round(segPercent * 100)}%)`}</title>
                </path>
              );
            })
          ) : (
            <path
              d="M 10 80 A 70 70 0 0 1 150 80"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth={strokeWidth}
              strokeDasharray="4 8"
              strokeLinecap="round"
              className="dark:stroke-slate-700"
            />
          )}
        </svg>

        {/* Center Metric Callout */}
        <div className="absolute bottom-0 flex flex-col items-center justify-center text-center">
          <div className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight font-sans">
            {totalValue.toLocaleString('id-ID')}
          </div>
          <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">
            {totalLabel}
          </span>
        </div>
      </div>

      {/* Legends below */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 w-full">
        {segments.map((seg) => (
          <div
            key={seg.label}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-[#0b1329] border border-slate-200/60 dark:border-slate-800 text-[11px]"
          >
            <span
              className="w-2.5 h-2.5 rounded-full shadow-sm"
              style={{ backgroundColor: seg.color }}
            />
            <span className="text-slate-600 dark:text-slate-300 font-medium">
              {seg.label}
            </span>
            <span className="font-bold text-slate-900 dark:text-white ml-0.5 font-mono">
              ({seg.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const GaugeSection = () => {
  const { metrics } = useData();

  // Work Order Data
  const woTotal = metrics.workOrderStats.request + metrics.workOrderStats.partial + metrics.workOrderStats.complete;
  const woSegments = [
    { label: 'Request', value: metrics.workOrderStats.request, color: '#0e2b7a', colorStart: '#1639ac', colorEnd: '#091c52' },
    { label: 'Partial', value: metrics.workOrderStats.partial, color: '#ff5900', colorStart: '#ff7733', colorEnd: '#ea4e00' },
    { label: 'Complete', value: metrics.workOrderStats.complete, color: '#0284c7', colorStart: '#38bdf8', colorEnd: '#0369a1' }
  ];

  // Stock On Hand Data
  const stockTotal = metrics.stockStats.ready + metrics.stockStats.damage + (metrics.stockStats.booked || 0);
  const stockSegments = [
    { label: 'Ready', value: metrics.stockStats.ready, color: '#ff5900', colorStart: '#ff6f1e', colorEnd: '#ea4e00' },
    { label: 'Booked', value: metrics.stockStats.booked || 0, color: '#0e2b7a', colorStart: '#1b449c', colorEnd: '#091c52' },
    { label: 'Damage', value: metrics.stockStats.damage, color: '#cc1b24', colorStart: '#e63946', colorEnd: '#b91c1c' }
  ];

  // Outbound Data
  const outboundTotal = metrics.outboundStats.request + metrics.outboundStats.realization + metrics.outboundStats.delivery + metrics.outboundStats.delivered;
  const outboundSegments = [
    { label: 'Request', value: metrics.outboundStats.request, color: '#0e2b7a', colorStart: '#1639ac', colorEnd: '#091c52' },
    { label: 'Realization', value: metrics.outboundStats.realization, color: '#2563eb', colorStart: '#60a5fa', colorEnd: '#1d4ed8' },
    { label: 'Delivery', value: metrics.outboundStats.delivery, color: '#ff5900', colorStart: '#ff7a33', colorEnd: '#ea4e00' },
    { label: 'Delivered', value: metrics.outboundStats.delivered, color: '#10b981', colorStart: '#34d399', colorEnd: '#059669' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
      
      {/* 1. Work Order Progress Card */}
      <div className="glass-card rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-[#091c52] text-[#0e2b7a] dark:text-sky-300">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Work Order Flow</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Penerbitan SKU & Perangkat</p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-[#ff5900] bg-orange-50 dark:bg-orange-950/40 px-2 py-0.5 rounded-full border border-orange-200 dark:border-orange-900/50">
            WO Status
          </span>
        </div>
        <SemiCircleGauge
          segments={woSegments}
          totalValue={woTotal}
          totalLabel="Total WO"
        />
      </div>

      {/* 2. Stock On Hand SKU Card */}
      <div className="glass-card rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-orange-100 dark:bg-[#431303] text-[#ff5900]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Stock On Hand (SKU)</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Ketersediaan Fisik di KCU</p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-[#0e2b7a] dark:text-sky-300 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded-full">
            Danantara x POS
          </span>
        </div>
        <SemiCircleGauge
          segments={stockSegments}
          totalValue={stockTotal}
          totalLabel="Total Stock"
        />
      </div>

      {/* 3. Outbound Logistics Status Card */}
      <div className="glass-card rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-[#091c52] text-[#0e2b7a] dark:text-sky-300">
              <ArrowUpFromLine className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Outbound Distribution</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Pengiriman Last-Mile POS IND</p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-[#ff5900] bg-orange-50 dark:bg-orange-950/40 px-2 py-0.5 rounded-full">
            POS Logistics
          </span>
        </div>
        <SemiCircleGauge
          segments={outboundSegments}
          totalValue={outboundTotal}
          totalLabel="Total Order"
        />
      </div>

    </div>
  );
};
