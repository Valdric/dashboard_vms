import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { BrandLogo } from '../common/BrandLogo';

export const LoginPage = () => {
  const { login, quickLogin } = useAuth();
  const [identifier, setIdentifier] = useState('aguskomarudin');
  const [password, setPassword] = useState('aguskomarudin');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const result = login(identifier, password);
      setIsLoading(false);
      if (!result.success) {
        setErrorMessage(result.message);
      }
    }, 400);
  };

  const handleQuickLogin = (role) => {
    setIsLoading(true);
    setTimeout(() => {
      quickLogin(role);
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#070c18] text-slate-100 p-4 font-sans select-none">
      
      {/* Background Animated Glows (Danantara Navy & POS IND Orange) */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#0e2b7a]/40 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#ff5900]/25 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1639ac]/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Login Box */}
      <div className="relative z-10 w-full max-w-md animate-slide-up">
        
        {/* Brand Card */}
        <div className="glass-card bg-[#0d1527]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/60">
          
          {/* Logo & Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="p-3.5 rounded-3xl bg-white/5 border border-white/10 shadow-lg mb-3">
              <BrandLogo size="large" showText={false} isDark={true} />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white font-sans flex items-center gap-2">
              VMS LOGISTICS
            </h1>
            <p className="text-xs text-slate-400 mt-1 flex items-center justify-center gap-1.5 font-medium">
              <span>Danantara Indonesia</span>
              <span className="text-[#ff5900] font-bold">✕</span>
              <span className="text-sky-300 font-bold">POS IND</span>
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-5 p-3 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-semibold text-center animate-shake">
              {errorMessage}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email / Username Field */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Username / Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="aguskomarudin atau email"
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#ff5900] focus:border-transparent transition-all font-mono"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Kata Sandi
                </label>
                <span className="text-[11px] text-[#ff5900] hover:underline cursor-pointer">
                  Lupa sandi?
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#ff5900] focus:border-transparent transition-all font-mono"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center space-x-2 pt-1">
              <input
                type="checkbox"
                id="remember"
                defaultChecked
                className="rounded border-slate-700 bg-slate-800 text-[#ff5900] focus:ring-[#ff5900]"
              />
              <label htmlFor="remember" className="text-xs text-slate-400 cursor-pointer">
                Ingat sesi login saya
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#0e2b7a] via-[#1639ac] to-[#ff5900] hover:from-[#091c52] hover:to-[#ea4e00] text-white text-xs font-bold shadow-lg shadow-orange-500/20 transition-all duration-200 active:scale-98 disabled:opacity-70 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Masuk ke Dashboard VMS</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Login Chips */}
          <div className="mt-8 pt-6 border-t border-slate-800">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 text-center flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#ff5900]" />
              Akun Resmi VMS (Klik untuk login 1-klik)
            </p>
            
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setIdentifier('aguskomarudin');
                  setPassword('aguskomarudin');
                  login('aguskomarudin', 'aguskomarudin');
                }}
                className="p-2 rounded-xl bg-orange-950/40 hover:bg-orange-900/60 border border-orange-700/60 text-[#ff5900] text-center transition-all hover:scale-105 active:scale-95"
              >
                <div className="text-[11px] font-extrabold">Agus K.</div>
                <div className="text-[9px] text-orange-300 mt-0.5">KCU Jakarta</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('Super Admin')}
                className="p-2 rounded-xl bg-blue-950/60 hover:bg-blue-900/80 border border-blue-800/60 text-sky-300 text-center transition-all hover:scale-105 active:scale-95"
              >
                <div className="text-[11px] font-extrabold">Super Admin</div>
                <div className="text-[9px] text-slate-400 mt-0.5">VMS Pusat</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('Regional Manager')}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-center transition-all hover:scale-105 active:scale-95"
              >
                <div className="text-[11px] font-extrabold">Valdrian</div>
                <div className="text-[9px] text-slate-400 mt-0.5">KCU Denpasar</div>
              </button>
            </div>
          </div>

          {/* Footer Security Note */}
          <div className="mt-6 flex items-center justify-center space-x-2 text-[10px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Sovereign Security Gateway • Danantara Indonesia X POS IND</span>
          </div>

        </div>

      </div>

    </div>
  );
};
