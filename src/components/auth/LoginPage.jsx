import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  Sparkles, 
  Building2, 
  Truck, 
  Layers, 
  CheckCircle2,
  Globe,
  Radio,
  User,
  FileCheck2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { BrandLogo } from '../common/BrandLogo';

export const LoginPage = () => {
  const { login, quickLogin, profiles } = useAuth();
  const [identifier, setIdentifier] = useState('dimas.w@myrepublic.net.id');
  const [password, setPassword] = useState('password123');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      const res = login(identifier, password);
      if (!res.success) {
        setErrorMsg(res.message || 'Login gagal. Periksa kembali email dan password.');
      }
      setIsLoading(false);
    }, 400);
  };

  const handleQuick = (roleName) => {
    quickLogin(roleName);
  };

  return (
    <div className="min-h-screen w-full bg-[#050b18] text-white flex flex-col justify-between relative overflow-hidden font-sans select-none">
      
      {/* Background Decorative Gradients & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#091c52] rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-[#ff5900]/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-[#7e22ce]/20 rounded-full blur-3xl opacity-50 pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <BrandLogo size="large" variant="white" />
        
        <div className="flex items-center space-x-3">
          <span className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/60 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live Telemetri 2026
          </span>
        </div>
      </header>

      {/* Main Login Body */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1">
        
        {/* Left Side: Business Context & Features */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#091c52] to-[#123896] border border-blue-400/30 text-sky-300 text-xs font-bold shadow-md">
            <Sparkles className="w-4 h-4 text-[#ff5900]" />
            <span>Warehouse Management System • Mora Republic ✕ PT Pos Indonesia</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Single Source of Truth <br />
            <span className="bg-gradient-to-r from-white via-orange-100 to-[#ff5900] bg-clip-text text-transparent">
              Fulfillment Logistik Nasional
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
            Aplikasi WMS terintegrasi untuk penerimaan Inbound dari Gudang Mora Republic, penjemputan SLP KC Tangerang Selatan, distribusi Middle Mile, manajemen inventori perangkat ber-Serial Number, hingga Last Mile Delivery kepada end customer.
          </p>

          {/* 3 Quick Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <ShieldCheck className="w-5 h-5 text-[#ff5900] mb-1.5" />
              <h4 className="font-bold text-xs">Akurasi Stok ≥ 99%</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Validasi SN, Barcode & Hirarki Rak.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <Truck className="w-5 h-5 text-sky-400 mb-1.5" />
              <h4 className="font-bold text-xs">SLA Cut-Off 15:00</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Reguler, Kargo Darat & Kargo Udara.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <FileCheck2 className="w-5 h-5 text-purple-400 mb-1.5" />
              <h4 className="font-bold text-xs">Digital BAST & QR</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">E-Signature & Evidence Photo.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Login Card with 1-Click Role Switchers */}
        <div className="lg:col-span-5">
          <div className="bg-[#0b1329]/90 border border-slate-800 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl shadow-blue-950/60 space-y-6">
            
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Masuk ke Portal WMS
              </h3>
              <p className="text-xs text-slate-400">
                Pilih profil peran cepat atau masukkan kredensial resmi:
              </p>
            </div>

            {/* 1-Click Fast Role Login Buttons */}
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Akses 1-Klik Peran RACI (SKB 5.4):
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuick('Mora Republic')}
                  className="p-2.5 rounded-xl bg-[#7e22ce]/20 hover:bg-[#7e22ce]/40 border border-purple-500/30 text-left transition-all text-xs cursor-pointer group"
                >
                  <span className="font-bold text-purple-300 block truncate group-hover:text-white">
                    Mora Republic
                  </span>
                  <span className="text-[10px] text-slate-400">Client Facing DO</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuick('SLP')}
                  className="p-2.5 rounded-xl bg-sky-950/40 hover:bg-sky-900/50 border border-sky-500/30 text-left transition-all text-xs cursor-pointer group"
                >
                  <span className="font-bold text-sky-300 block truncate group-hover:text-white">
                    SLP KC Tangsel
                  </span>
                  <span className="text-[10px] text-slate-400">Pickup & Middle Mile</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuick('PIC Warehouse')}
                  className="p-2.5 rounded-xl bg-orange-950/40 hover:bg-orange-900/50 border border-orange-500/30 text-left transition-all text-xs cursor-pointer group"
                >
                  <span className="font-bold text-orange-300 block truncate group-hover:text-white">
                    PIC Warehouse
                  </span>
                  <span className="text-[10px] text-slate-400">Receiving & Rak</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuick('Supervisor')}
                  className="p-2.5 rounded-xl bg-blue-950/40 hover:bg-blue-900/50 border border-blue-500/30 text-left transition-all text-xs cursor-pointer group"
                >
                  <span className="font-bold text-blue-300 block truncate group-hover:text-white">
                    Supervisor Ops
                  </span>
                  <span className="text-[10px] text-slate-400">Approval & SLA</span>
                </button>
              </div>
            </div>

            {/* Regular Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs pt-2 border-t border-slate-800">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs">
                  {errorMsg}
                </div>
              )}

              <div>
                <label className="block text-slate-300 font-bold mb-1">Email / Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#070c18] border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#ff5900]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#070c18] border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#ff5900]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ff5900] via-[#ea4e00] to-[#c23b00] hover:from-[#ea4e00] hover:to-[#a83200] text-white font-bold text-xs shadow-lg shadow-orange-600/30 transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-98 disabled:opacity-50"
              >
                <span>{isLoading ? 'Memvalidasi...' : 'Masuk ke Dashboard WMS'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-4 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>© 2026 PT Pos Indonesia (Persero) • Wholesale & International Business ✕ Mora Republic</span>
        <div className="flex items-center space-x-3 text-[11px]">
          <span>SKB WMS 24 Agustus 2026</span>
          <span>•</span>
          <span className="text-emerald-400">Server Production Active</span>
        </div>
      </footer>

    </div>
  );
};
