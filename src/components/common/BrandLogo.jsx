import React from 'react';

export const BrandLogo = ({ size = 'normal', showText = true, isDark = false, className = '' }) => {
  // Determine dimensions based on size prop
  let height = 'h-10';
  let minWidth = 'min-w-[190px]';

  if (size === 'large') {
    height = 'h-16';
    minWidth = 'min-w-[280px]';
  } else if (size === 'small') {
    height = 'h-8';
    minWidth = 'min-w-[150px]';
  } else if (size === 'banner') {
    height = 'h-12';
    minWidth = 'min-w-[220px]';
  }

  return (
    <div className={`flex items-center space-x-2 select-none ${className}`}>
      {/* High Precision SVG Reproduction of Danantara Indonesia Sovereign Fund X POS IND */}
      <div className={`relative ${height} ${minWidth} flex items-center`}>
        <svg
          viewBox="0 0 540 160"
          className="w-full h-full filter drop-shadow-sm overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Navy Ribbon Gradient */}
            <linearGradient id="swooshNavy" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#081b4e" />
              <stop offset="40%" stopColor="#0e3282" />
              <stop offset="100%" stopColor="#1a4ca8" />
            </linearGradient>

            {/* Vibrant Orange Ribbon Gradient */}
            <linearGradient id="swooshOrange" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e64a00" />
              <stop offset="50%" stopColor="#ff5900" />
              <stop offset="100%" stopColor="#ff7a1a" />
            </linearGradient>

            {/* Crimson Red Gradient */}
            <linearGradient id="swooshRed" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#b91c1c" />
              <stop offset="50%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>

            {/* Silver / Chrome Metallic Reflection */}
            <linearGradient id="swooshSilver" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>

            {/* Blue 3D Gradient for Center X */}
            <linearGradient id="gradX" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0a2560" />
              <stop offset="50%" stopColor="#103b9b" />
              <stop offset="100%" stopColor="#1e56cf" />
            </linearGradient>
          </defs>

          {/* ================= 1. DANANTARA EMBLEM (LEFT) ================= */}
          <g transform="translate(10, 30)">
            {/* Black rounded shield background */}
            <rect x="0" y="0" width="58" height="58" rx="14" fill="#090d16" />
            {/* Red Wing */}
            <path
              d="M 6 26 C 18 12, 38 12, 52 24 L 52 35 C 38 23, 18 24, 6 36 Z"
              fill="url(#swooshRed)"
            />
            {/* White Wing */}
            <path
              d="M 14 36 C 24 26, 40 27, 52 36 L 52 46 C 40 37, 24 36, 14 47 Z"
              fill="#ffffff"
            />
          </g>

          {/* ================= 2. DANANTARA INDONESIA TEXT ================= */}
          <g transform="translate(80, 56)">
            {/* Danantara text (Adaptive dark/light mode via currentColor or class) */}
            <text
              x="0"
              y="0"
              fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
              fontWeight="900"
              fontSize="30"
              className="fill-slate-900 dark:fill-white font-extrabold"
              letterSpacing="-0.5"
            >
              Danantara
            </text>
            {/* Indonesia text */}
            <text
              x="0"
              y="28"
              fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
              fontWeight="900"
              fontSize="30"
              className="fill-slate-900 dark:fill-white font-extrabold"
              letterSpacing="-0.5"
            >
              Indonesia
            </text>
            {/* Sovereign Fund subtext */}
            <text
              x="152"
              y="14"
              fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
              fontWeight="800"
              fontSize="10"
              className="fill-slate-700 dark:fill-slate-300 font-bold"
            >
              Sovereign
            </text>
            <text
              x="152"
              y="25"
              fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
              fontWeight="800"
              fontSize="10"
              className="fill-slate-700 dark:fill-slate-300 font-bold"
            >
              Fund
            </text>
          </g>

          {/* ================= 3. 3D INFINITY SWOOSH RIBBON ================= */}
          {/* Back Arc: Navy */}
          <path
            d="M 60 115 C 30 135, 20 150, 65 150 C 145 150, 260 55, 390 30 C 475 14, 510 40, 465 78 C 390 140, 210 160, 100 135"
            fill="none"
            stroke="url(#swooshNavy)"
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Middle Arc: Silver Highlight */}
          <path
            d="M 70 120 C 42 136, 32 148, 70 148 C 150 148, 265 53, 392 28 C 470 14, 502 38, 460 74"
            fill="none"
            stroke="url(#swooshSilver)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Front Arc: Vibrant Orange */}
          <path
            d="M 80 126 C 55 138, 48 146, 80 146 C 155 146, 270 50, 395 25 C 455 12, 485 28, 465 58"
            fill="none"
            stroke="url(#swooshOrange)"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* ================= 4. CENTER X CROSS ================= */}
          <g transform="translate(290, 45)">
            <path
              d="M 0 5 L 48 65 M 48 5 L 0 65"
              stroke="url(#gradX)"
              strokeWidth="14"
              strokeLinecap="round"
            />
            {/* Orange inner highlight in X */}
            <path
              d="M 12 20 L 36 50"
              stroke="url(#swooshOrange)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>

          {/* ================= 5. POS IND LOGO (RIGHT) ================= */}
          <g transform="translate(370, 42)">
            {/* POS Text */}
            <text
              x="0"
              y="38"
              fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
              fontWeight="950"
              fontSize="48"
              fill="#0a2258"
              className="dark:fill-[#6ea3fb]"
              letterSpacing="-0.5"
            >
              POS
            </text>

            {/* iND Text */}
            <g transform="translate(0, 44)">
              {/* Lowercase 'i' with Orange upper accent */}
              <text
                x="0"
                y="36"
                fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
                fontWeight="950"
                fontSize="44"
                fill="#0a2258"
                className="dark:fill-[#6ea3fb]"
              >
                iND
              </text>
              {/* Orange arc/crescent on the i */}
              <path
                d="M 0 10 C 0 3, 10 3, 10 10 Z"
                fill="#ff5900"
              />
            </g>
          </g>

        </svg>
      </div>

      {/* VMS Branding Badge */}
      {showText && (
        <div className="flex flex-col border-l border-slate-300 dark:border-slate-700 pl-2.5 py-0.5">
          <span className="text-sm font-black tracking-tight text-[#0a2258] dark:text-white font-sans flex items-center gap-1.5 leading-none">
            VMS
            <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-[#ff5900] text-white tracking-wider uppercase">
              LOGISTICS
            </span>
          </span>
          <span className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 mt-1 leading-none">
            Danantara ✕ POS IND
          </span>
        </div>
      )}
    </div>
  );
};
