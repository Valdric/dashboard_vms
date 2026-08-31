import React from 'react';
import { 
  ArrowUpDown, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Layers, 
  Building2,
  Boxes
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const PutawayTable = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
        <thead className="bg-[#091c52] text-white uppercase text-[10px] font-bold tracking-wider select-none">
          <tr>
            <th className="py-3 px-3.5 text-center w-10">#</th>
            <th className="py-3 px-3.5 min-w-[110px]">Tanggal</th>
            <th className="py-3 px-3.5 min-w-[190px]">Ref DO Inbound</th>
            <th className="py-3 px-3.5 min-w-[190px]">Gudang Warehouse</th>
            <th className="py-3 px-3.5 min-w-[220px]">Produk & SKU</th>
            <th className="py-3 px-3.5 text-center min-w-[120px]">Total / Putaway</th>
            <th className="py-3 px-3.5 min-w-[210px]">Hirarki Lokasi Penyimpanan</th>
            <th className="py-3 px-3.5 min-w-[130px]">Status & Verifikasi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
          {data.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-8 text-center text-slate-400 font-medium">
                Tidak ada data Putaway yang sesuai filter.
              </td>
            </tr>
          ) : (
            data.map((item, idx) => (
              <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-3.5 text-center font-bold text-slate-400">{idx + 1}</td>

                {/* Date */}
                <td className="py-3 px-3.5 font-mono text-slate-700 dark:text-slate-300">
                  {item.date}
                </td>

                {/* Inbound DO Number */}
                <td className="py-3 px-3.5 font-mono font-bold text-[#091c52] dark:text-sky-300">
                  {item.inboundDoNumber}
                </td>

                {/* Warehouse */}
                <td className="py-3 px-3.5 font-semibold text-slate-800 dark:text-slate-200">
                  {item.warehouse}
                </td>

                {/* Product */}
                <td className="py-3 px-3.5">
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">
                      {item.product}
                    </p>
                    <span className="text-[10px] font-mono text-slate-500">
                      SKU: {item.sku}
                    </span>
                  </div>
                </td>

                {/* Quantities */}
                <td className="py-3 px-3.5 text-center font-mono font-bold">
                  <span className="text-slate-800 dark:text-slate-200">{item.totalQty}</span>
                  <span className="text-slate-400"> / </span>
                  <span className="text-emerald-600 dark:text-emerald-400">{item.putawayQty} PCS</span>
                </td>

                {/* Location Hierarchy (SKB 5.2.2 #5 & 5.3) */}
                <td className="py-3 px-3.5">
                  <div className="space-y-1 text-[11px]">
                    <div className="flex items-center gap-1 font-semibold text-[#091c52] dark:text-sky-300">
                      <MapPin className="w-3.5 h-3.5 text-[#ff5900] flex-shrink-0" />
                      <span>{item.locationHierarchy?.zone || 'Zone A - Device'}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono pl-4">
                      {item.locationHierarchy?.rack || 'Rack A-01'} • {item.locationHierarchy?.slot || 'Slot 01'} • {item.locationHierarchy?.shelf || 'Shelf Tier 1'}
                    </div>
                  </div>
                </td>

                {/* Status & PIC */}
                <td className="py-3 px-3.5">
                  <div className="space-y-0.5">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.status === 'Completed'
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                        : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                    }`}>
                      {item.status === 'Completed' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {item.status}
                    </span>
                    <p className="text-[10px] text-slate-400">
                      PIC: {item.picName}
                    </p>
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
