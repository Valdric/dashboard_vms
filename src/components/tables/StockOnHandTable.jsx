import React from 'react';
import { 
  ArrowUpDown, 
  QrCode, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle, 
  Boxes, 
  Building2, 
  MapPin,
  RotateCcw
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const StockOnHandTable = ({ data }) => {
  const { openSNModal, setIsAddTxModalOpen, setActiveTab } = useData();

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
        <thead className="bg-[#091c52] text-white uppercase text-[10px] font-bold tracking-wider select-none">
          <tr>
            <th className="py-3 px-3.5 text-center w-10">#</th>
            <th className="py-3 px-3.5 min-w-[110px]">SKU</th>
            <th className="py-3 px-3.5 min-w-[220px]">Deskripsi Perangkat / Material</th>
            <th className="py-3 px-3.5 min-w-[170px]">Gudang Warehouse</th>
            <th className="py-3 px-3.5 min-w-[140px]">Lokasi Penyimpanan</th>
            <th className="py-3 px-3.5 text-center min-w-[110px] bg-emerald-900/60 text-emerald-200">
              Good (Ready)
            </th>
            <th className="py-3 px-3.5 text-center min-w-[90px] bg-amber-900/60 text-amber-200">
              Booked
            </th>
            <th className="py-3 px-3.5 text-center min-w-[90px] bg-rose-900/60 text-rose-200">
              Damaged
            </th>
            <th className="py-3 px-3.5 text-center min-w-[90px] bg-purple-900/60 text-purple-200">
              Retur
            </th>
            <th className="py-3 px-3.5 text-center min-w-[110px] bg-slate-950 text-white">
              Total Fisik
            </th>
            <th className="py-3 px-3.5 text-center min-w-[140px]">Aksi Telemetri</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
          {data.length === 0 ? (
            <tr>
              <td colSpan={11} className="py-8 text-center text-slate-400 font-medium">
                Tidak ada data Stok yang sesuai filter.
              </td>
            </tr>
          ) : (
            data.map((item, idx) => (
              <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-3.5 text-center font-bold text-slate-400">{idx + 1}</td>

                {/* SKU */}
                <td className="py-3 px-3.5 font-mono font-bold text-[#091c52] dark:text-sky-300">
                  {item.sku}
                </td>

                {/* Product */}
                <td className="py-3 px-3.5">
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">
                      {item.product}
                    </p>
                    <span className="text-[10px] text-slate-400">
                      {item.category} • Satuan: <span className="font-bold font-mono">{item.uom || 'PCS'}</span>
                    </span>
                  </div>
                </td>

                {/* Warehouse */}
                <td className="py-3 px-3.5 font-semibold text-slate-800 dark:text-slate-200">
                  {item.warehouse}
                </td>

                {/* Location */}
                <td className="py-3 px-3.5 font-mono text-[11px] text-slate-500">
                  {item.location || 'Zone A / Rack Primary'}
                </td>

                {/* Ready */}
                <td className="py-3 px-3.5 text-center font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/30 dark:bg-emerald-950/20">
                  {item.ready}
                </td>

                {/* Booked */}
                <td className="py-3 px-3.5 text-center font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-50/30 dark:bg-amber-950/20">
                  {item.booked}
                </td>

                {/* Damaged */}
                <td className="py-3 px-3.5 text-center font-mono font-bold text-rose-600 dark:text-rose-400 bg-rose-50/30 dark:bg-rose-950/20">
                  {item.damage}
                </td>

                {/* Retur */}
                <td className="py-3 px-3.5 text-center font-mono font-bold text-purple-600 dark:text-purple-400 bg-purple-50/30 dark:bg-purple-950/20">
                  {item.retur || 0}
                </td>

                {/* Total */}
                <td className="py-3 px-3.5 text-center font-mono font-black text-slate-900 dark:text-white bg-slate-100/50 dark:bg-slate-900/50">
                  {item.total} {item.uom || 'PCS'}
                </td>

                {/* Actions */}
                <td className="py-3 px-3.5 text-center">
                  <div className="flex items-center justify-center space-x-1.5">
                    {/* SN Explorer Button */}
                    <button
                      onClick={() => openSNModal(item)}
                      className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 dark:bg-orange-950/60 dark:hover:bg-orange-900 text-[#ff5900] text-[10px] font-bold transition-all border border-orange-200 dark:border-orange-900"
                      title="Kelola Serial Number"
                    >
                      <QrCode className="w-3 h-3" />
                      <span>Scan SN</span>
                    </button>

                    {/* Adjustment Button */}
                    <button
                      onClick={() => setIsAddTxModalOpen(true)}
                      className="p-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                      title="Ajukan Stock Adjustment"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                    </button>
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
