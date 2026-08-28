import React from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const Toast = () => {
  const { toast } = useData();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-rose-500" />;
      default:
        return <Info className="w-5 h-5 text-sky-500" />;
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'success':
        return 'border-emerald-500/40 dark:border-emerald-500/50 bg-emerald-50/90 dark:bg-emerald-950/80';
      case 'warning':
        return 'border-amber-500/40 dark:border-amber-500/50 bg-amber-50/90 dark:bg-amber-950/80';
      case 'error':
        return 'border-rose-500/40 dark:border-rose-500/50 bg-rose-50/90 dark:bg-rose-950/80';
      default:
        return 'border-sky-500/40 dark:border-sky-500/50 bg-sky-50/90 dark:bg-sky-950/80';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className={`flex items-center space-x-3 px-4 py-3 rounded-2xl backdrop-blur-md shadow-2xl border ${getBorderColor()} max-w-md`}>
        {getIcon()}
        <div className="text-xs font-semibold text-slate-800 dark:text-slate-100">
          {toast.message}
        </div>
      </div>
    </div>
  );
};
