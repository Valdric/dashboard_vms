import React from 'react';

export const MetricCard = ({
  title,
  value,
  icon: Icon,
  watermarkIcon: WatermarkIcon,
  gradientClass,
  badgeText,
  textColor = 'text-white',
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl p-4 sm:p-5 shadow-lg ${gradientClass} ${textColor} 
        transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl cursor-pointer group select-none`}
    >
      {/* Background Watermark Icon (Faded subtle silhouette) */}
      {WatermarkIcon && (
        <div className="absolute right-1 bottom-1 sm:right-2 sm:bottom-2 opacity-15 group-hover:opacity-25 transition-opacity duration-300 pointer-events-none transform group-hover:scale-110">
          <WatermarkIcon className="w-16 h-16 sm:w-20 sm:h-20" />
        </div>
      )}

      {/* Card Header: Title */}
      <div className="flex items-start justify-between relative z-10">
        <h3 className="text-xs sm:text-sm font-semibold tracking-tight text-white/90 drop-shadow-sm">
          {title}
        </h3>
        {Icon && (
          <div className="p-1.5 rounded-lg bg-white/15 backdrop-blur-sm group-hover:bg-white/25 transition-colors">
            <Icon className="w-4 h-4 text-white" />
          </div>
        )}
      </div>

      {/* Card Body: Counter Value */}
      <div className="mt-3 sm:mt-4 flex items-baseline justify-between relative z-10">
        <div className="text-2xl sm:text-3xl font-extrabold tracking-tight drop-shadow font-sans">
          {typeof value === 'number' ? value.toLocaleString('id-ID') : value}
        </div>

        {badgeText && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-sm">
            {badgeText}
          </span>
        )}
      </div>

      {/* Subtle shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
    </div>
  );
};
