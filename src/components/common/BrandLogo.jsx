import React from 'react';

export const BrandLogo = ({ size = 'normal', showText = true, isDark = false }) => {
  const isLarge = size === 'large';
  const isSmall = size === 'small';

  return (
    <div className="flex items-center space-x-3 select-none">
      {/* SVG Icon of Danantara Indonesia x POS IND Dynamic Infinity Ribbon */}
      <div className={`relative flex items-center justify-center ${isLarge ? 'w-14 h-14' : isSmall ? 'w-8 h-8' : 'w-10 h-10'}`}>
        <svg viewBox="0 0 160 100" className="w-full h-full filter drop-shadow-sm overflow-visible">
          <defs>
            {/* Navy Blue Ribbon Gradient */}
            <linearGradient id="danantaraNavyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0a1f44" />
              <stop offset="50%" stopColor="#103778" />
              <stop offset="100%" stopColor="#1a4ca8" />
            </linearGradient>

            {/* Vibrant Orange Ribbon Gradient */}
            <linearGradient id="posOrangeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff4d00" />
              <stop offset="60%" stopColor="#ff6a00" />
              <stop offset="100%" stopColor="#ff8533" />
            </linearGradient>

            {/* Crimson Red Gradient */}
            <linearGradient id="danantaraRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#cc1b24" />
              <stop offset="100%" stopColor="#e63946" />
            </linearGradient>

            {/* Chrome / Silver Highlight */}
            <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Left Wing Icon Background - Danantara D-Shield Shape */}
          <rect x="6" y="24" width="34" height="34" rx="8" fill="#090d16" />
          {/* Inner Wing Red/White Curve in D badge */}
          <path d="M 12 40 C 18 33, 26 33, 34 38 L 34 44 C 26 38, 18 39, 12 45 Z" fill="url(#danantaraRedGrad)" />
          <path d="M 12 45 C 18 39, 26 40, 34 46 L 34 49 C 26 44, 18 43, 12 50 Z" fill="#ffffff" />

          {/* Infinity Loop - Outer Navy Swoosh */}
          <path
            d="M 28 68 C 14 74, 12 84, 30 84 C 64 84, 102 38, 134 26 C 150 20, 154 30, 142 42 C 122 62, 70 82, 42 78"
            fill="none"
            stroke="url(#danantaraNavyGrad)"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Infinity Loop - Middle Orange Swoosh */}
          <path
            d="M 32 74 C 22 78, 20 84, 34 84 C 66 84, 106 34, 138 24 C 148 20, 150 28, 140 38"
            fill="none"
            stroke="url(#posOrangeGrad)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Center X Symbol (Intersection of Danantara & POS) */}
          <path d="M 86 38 L 102 58 M 102 38 L 86 58" stroke="#103778" strokeWidth="6" strokeLinecap="round" />
          <path d="M 88 40 L 98 52" stroke="url(#posOrangeGrad)" strokeWidth="3" strokeLinecap="round" />

          {/* Right Lettering "POS IND" Stylized */}
          <text x="108" y="44" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="900" fontSize="19" fill="#0d2c6c" letterSpacing="0.5">
            POS
          </text>
          <text x="108" y="60" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="900" fontSize="16" fill="#0d2c6c" letterSpacing="0.5">
            IND
          </text>
          {/* Orange Dot accent on i in IND */}
          <rect x="108.5" y="48.5" width="3.5" height="3.5" rx="1" fill="#ff5900" />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <span className="text-base sm:text-lg font-black tracking-tight text-[#0c2862] dark:text-white font-sans flex items-center gap-1.5">
              VMS
              <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-[#ff5900] text-white tracking-widest uppercase">
                LOGISTICS
              </span>
            </span>
          </div>
          <div className="flex items-center space-x-1.5 text-[10px] font-medium text-slate-500 dark:text-slate-400 leading-none mt-0.5">
            <span>Danantara Indonesia</span>
            <span className="text-[#ff5900] font-bold">✕</span>
            <span className="font-bold text-[#0c2862] dark:text-sky-300">POS IND</span>
          </div>
        </div>
      )}
    </div>
  );
};
