import React from 'react';
import { 
  FileText, 
  Boxes, 
  Layers, 
  Send, 
  Truck, 
  MapPin, 
  CornerUpRight, 
  AlertTriangle, 
  CornerUpLeft, 
  XCircle, 
  CheckCircle2,
  Users,
  Sparkles
} from 'lucide-react';
import { MetricCard } from './MetricCard';
import { useData } from '../../context/DataContext';

export const MetricGrid = () => {
  const { metrics, setActiveTab } = useData();

  const topRowCards = [
    {
      title: 'Work Order Request',
      value: metrics.workOrderRequest,
      icon: FileText,
      watermarkIcon: FileText,
      gradientClass: 'bg-gradient-to-br from-[#0e2b7a] via-[#1639ac] to-[#091c52] shadow-blue-900/30',
      tab: 'Work Order'
    },
    {
      title: 'WO Realization',
      value: metrics.workOrderRealization,
      icon: Sparkles,
      watermarkIcon: Boxes,
      gradientClass: 'bg-gradient-to-br from-[#ff5900] via-[#ea4e00] to-[#c23b00] shadow-orange-500/25',
      tab: 'Work Order'
    },
    {
      title: 'Stock Item & SKU',
      value: metrics.stockItem,
      icon: Layers,
      watermarkIcon: Layers,
      gradientClass: 'bg-gradient-to-br from-[#091c52] via-[#0c2862] to-[#172554] shadow-slate-900/40',
      badgeText: 'Danantara x POS',
      tab: 'Stock On Hand'
    },
    {
      title: 'Outbound Request',
      value: metrics.outboundRequest,
      icon: Send,
      watermarkIcon: Send,
      gradientClass: 'bg-gradient-to-br from-[#d97706] to-[#b45309] shadow-amber-500/20',
      tab: 'Outbound'
    },
    {
      title: 'Outbound Realization',
      value: metrics.outboundRealization,
      icon: Truck,
      watermarkIcon: Truck,
      gradientClass: 'bg-gradient-to-br from-[#1d4ed8] to-[#0e2b7a] shadow-blue-600/25',
      tab: 'Outbound'
    },
    {
      title: 'Delivery',
      value: metrics.delivery,
      icon: MapPin,
      watermarkIcon: MapPin,
      gradientClass: 'bg-gradient-to-br from-[#047857] to-[#065f46] shadow-emerald-600/20',
      tab: 'Outbound'
    }
  ];

  const bottomRowCards = [
    {
      title: 'On Process',
      value: metrics.onProcess,
      icon: CornerUpRight,
      watermarkIcon: CornerUpRight,
      gradientClass: 'bg-gradient-to-br from-[#ea580c] to-[#c2410c] shadow-orange-500/20',
      tab: 'Outbound'
    },
    {
      title: 'Irregularity',
      value: metrics.irregularity,
      icon: AlertTriangle,
      watermarkIcon: AlertTriangle,
      gradientClass: 'bg-gradient-to-br from-[#cc1b24] to-[#991b1b] shadow-red-500/20',
      tab: 'Stock On Hand'
    },
    {
      title: 'Retur',
      value: metrics.retur,
      icon: CornerUpLeft,
      watermarkIcon: CornerUpLeft,
      gradientClass: 'bg-gradient-to-br from-[#e11d48] to-[#be123c] shadow-rose-500/20',
      tab: 'Outbound'
    },
    {
      title: 'Canceled',
      value: metrics.canceled,
      icon: XCircle,
      watermarkIcon: XCircle,
      gradientClass: 'bg-gradient-to-br from-[#334155] to-[#1e293b] shadow-slate-600/20',
      tab: 'Outbound'
    },
    {
      title: 'Delivered',
      value: metrics.delivered,
      icon: CheckCircle2,
      watermarkIcon: CheckCircle2,
      gradientClass: 'bg-gradient-to-br from-[#059669] to-[#047857] shadow-emerald-500/20',
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

      {/* Row 2: 5 Columns */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
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
