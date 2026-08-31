import React from 'react';
import { 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  Layers, 
  Send, 
  Truck, 
  MapPin, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  Activity,
  Zap,
  Server
} from 'lucide-react';
import { MetricCard } from './MetricCard';
import { useData } from '../../context/DataContext';

export const MetricGrid = () => {
  const { metrics, setActiveTab } = useData();

  // Top Row: Primary SLA & Fulfillment Volume
  const topRowCards = [
    {
      title: 'Akurasi Inventory (SKB 4.5)',
      value: metrics.inventoryAccuracy,
      icon: ShieldCheck,
      watermarkIcon: ShieldCheck,
      gradientClass: 'bg-gradient-to-br from-[#091c52] via-[#0d2862] to-[#173b9e] shadow-blue-950/40',
      badgeText: 'Target ≥ 99%',
      tab: 'Stock On Hand'
    },
    {
      title: 'Integrasi Order (SKB 4.5)',
      value: metrics.orderIntegrationSuccess,
      icon: Zap,
      watermarkIcon: Activity,
      gradientClass: 'bg-gradient-to-br from-[#ff5900] via-[#ea4e00] to-[#c23b00] shadow-orange-500/25',
      badgeText: 'Target ≥ 99%',
      tab: 'Integrations'
    },
    {
      title: 'Uptime Sistem (7x24 Jam)',
      value: metrics.systemAvailability,
      icon: Server,
      watermarkIcon: Server,
      gradientClass: 'bg-gradient-to-br from-[#047857] to-[#065f46] shadow-emerald-600/20',
      badgeText: 'Target ≥ 99.5%',
      tab: 'Integrations'
    },
    {
      title: 'Stok Fisik Tersedia (Good)',
      value: metrics.stockReady,
      icon: Layers,
      watermarkIcon: Layers,
      gradientClass: 'bg-gradient-to-br from-[#0e2b7a] via-[#1a4ca8] to-[#2563eb] shadow-blue-700/20',
      badgeText: 'Siap Outbound',
      tab: 'Stock On Hand'
    },
    {
      title: 'DO Inbound Diproses',
      value: metrics.inboundCount,
      icon: ArrowDownToLine,
      watermarkIcon: ArrowDownToLine,
      gradientClass: 'bg-gradient-to-br from-[#7e22ce] to-[#6b21a8] shadow-purple-600/20',
      badgeText: 'SLP Tangsel',
      tab: 'Inbound'
    },
    {
      title: 'DO Outbound Request',
      value: metrics.outboundRequest,
      icon: Send,
      watermarkIcon: Send,
      gradientClass: 'bg-gradient-to-br from-[#d97706] to-[#b45309] shadow-amber-500/20',
      badgeText: 'Customer Order',
      tab: 'Outbound'
    }
  ];

  // Bottom Row: Execution, Delivery, Retur & Exceptions
  const bottomRowCards = [
    {
      title: 'Outbound Realization',
      value: metrics.outboundRealization,
      icon: Truck,
      watermarkIcon: Truck,
      gradientClass: 'bg-gradient-to-br from-[#1d4ed8] to-[#0e2b7a] shadow-blue-600/25',
      tab: 'Outbound'
    },
    {
      title: 'Dalam Pengiriman (PosAja)',
      value: metrics.delivery,
      icon: MapPin,
      watermarkIcon: MapPin,
      gradientClass: 'bg-gradient-to-br from-[#0d9488] to-[#0f766e] shadow-teal-600/20',
      tab: 'Outbound'
    },
    {
      title: 'Terkirim Selesai (Delivered)',
      value: metrics.delivered,
      icon: CheckCircle2,
      watermarkIcon: CheckCircle2,
      gradientClass: 'bg-gradient-to-br from-[#059669] to-[#047857] shadow-emerald-500/20',
      tab: 'Outbound'
    },
    {
      title: 'Penerimaan Retur (Triage)',
      value: metrics.returCount,
      icon: RotateCcw,
      watermarkIcon: RotateCcw,
      gradientClass: 'bg-gradient-to-br from-[#e11d48] to-[#be123c] shadow-rose-500/20',
      tab: 'Retur'
    },
    {
      title: 'Exceptions / Kendala Aktif',
      value: metrics.exceptionsCount,
      icon: AlertTriangle,
      watermarkIcon: AlertTriangle,
      gradientClass: 'bg-gradient-to-br from-[#dc2626] to-[#991b1b] shadow-red-500/20',
      badgeText: metrics.exceptionsCount > 0 ? 'Perlu Tindakan' : 'Normal',
      tab: 'Exceptions'
    },
    {
      title: 'SLA Ketepatan Waktu',
      value: metrics.slaFulfillmentRate,
      icon: Activity,
      watermarkIcon: Activity,
      gradientClass: 'bg-gradient-to-br from-[#4f46e5] to-[#3730a3] shadow-indigo-600/20',
      tab: 'Outbound'
    }
  ];

  return (
    <div className="space-y-4 mb-8">
      {/* Row 1: 6 Columns */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {topRowCards.map((card) => (
          <MetricCard
            key={card.title}
            {...card}
            onClick={() => setActiveTab(card.tab)}
          />
        ))}
      </div>

      {/* Row 2: 6 Columns */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {bottomRowCards.map((card) => (
          <MetricCard
            key={card.title}
            {...card}
            onClick={() => setActiveTab(card.tab)}
          />
        ))}
      </div>
    </div>
  );
};
