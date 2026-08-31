import React from 'react';

/**
 * BrandLogo — Co-Branding Danantara Indonesia Sovereign Fund × POS IND:
 *   • 100% transparan, tanpa background putih / checkered box.
 *   • Tersedia varian teks PUTIH untuk tema gelap (Login page, dark mode)
 *   • Tersedia varian teks ASLI (Hitam & Navy) untuk tema terang (Light mode)
 *
 * @param {string} size - 'normal' | 'large'
 * @param {string} variant - 'auto' | 'white' | 'dark'
 * @param {string} className - Additional CSS classes
 */
export const BrandLogo = ({
  size = 'normal',
  variant = 'auto',
  className = ''
}) => {
  const isLarge = size === 'large';
  const logoHeight = isLarge ? 42 : 30;

  // Jika variant 'white', paksa selalu tampilkan logo putih
  if (variant === 'white') {
    return (
      <div
        className={`flex items-center select-none ${className}`}
        style={{ gap: isLarge ? '14px' : '10px' }}
      >
        {/* Danantara Indonesia (White Text) */}
        <img
          src="/logo-danantara-white.png"
          alt="Danantara Indonesia Sovereign Fund"
          draggable="false"
          title="Danantara Indonesia — Sovereign Fund"
          style={{
            height: logoHeight,
            width: 'auto',
            objectFit: 'contain',
            flexShrink: 0,
          }}
        />

        {/* Divider */}
        <div
          className="flex-shrink-0 rounded-full bg-white/25"
          style={{ width: 1.5, height: isLarge ? 34 : 24 }}
        />

        {/* Pos Indonesia (White Text + Orange Dot) */}
        <img
          src="/logo-pos-white.png"
          alt="POS IND"
          draggable="false"
          title="PT Pos Indonesia (Persero)"
          style={{
            height: logoHeight,
            width: 'auto',
            objectFit: 'contain',
            flexShrink: 0,
          }}
        />
      </div>
    );
  }

  // Jika variant 'dark', paksa selalu tampilkan logo hitam/navy
  if (variant === 'dark') {
    return (
      <div
        className={`flex items-center select-none ${className}`}
        style={{ gap: isLarge ? '14px' : '10px' }}
      >
        <img
          src="/logo-danantara-dark.png"
          alt="Danantara Indonesia Sovereign Fund"
          draggable="false"
          title="Danantara Indonesia — Sovereign Fund"
          style={{
            height: logoHeight,
            width: 'auto',
            objectFit: 'contain',
            flexShrink: 0,
          }}
        />

        <div
          className="flex-shrink-0 rounded-full bg-slate-300"
          style={{ width: 1.5, height: isLarge ? 34 : 24 }}
        />

        <img
          src="/logo-pos-navy.png"
          alt="POS IND"
          draggable="false"
          title="PT Pos Indonesia (Persero)"
          style={{
            height: logoHeight,
            width: 'auto',
            objectFit: 'contain',
            flexShrink: 0,
          }}
        />
      </div>
    );
  }

  // Default 'auto': adaptif otomatis terhadap mode Light / Dark via Tailwind CSS
  return (
    <div
      className={`flex items-center select-none ${className}`}
      style={{ gap: isLarge ? '14px' : '10px' }}
    >
      {/* ── Danantara Logo ── */}
      <div className="flex-shrink-0 flex items-center">
        {/* Tampil saat Light mode */}
        <img
          src="/logo-danantara-dark.png"
          alt="Danantara Indonesia Sovereign Fund"
          draggable="false"
          title="Danantara Indonesia — Sovereign Fund"
          className="dark:hidden"
          style={{
            height: logoHeight,
            width: 'auto',
            objectFit: 'contain',
          }}
        />
        {/* Tampil saat Dark mode (White font) */}
        <img
          src="/logo-danantara-white.png"
          alt="Danantara Indonesia Sovereign Fund"
          draggable="false"
          title="Danantara Indonesia — Sovereign Fund"
          className="hidden dark:block"
          style={{
            height: logoHeight,
            width: 'auto',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* Divider */}
      <div
        className="flex-shrink-0 rounded-full bg-slate-300 dark:bg-slate-700"
        style={{ width: 1.5, height: isLarge ? 34 : 24 }}
      />

      {/* ── Pos Indonesia Logo ── */}
      <div className="flex-shrink-0 flex items-center">
        {/* Tampil saat Light mode */}
        <img
          src="/logo-pos-navy.png"
          alt="POS IND"
          draggable="false"
          title="PT Pos Indonesia (Persero)"
          className="dark:hidden"
          style={{
            height: logoHeight,
            width: 'auto',
            objectFit: 'contain',
          }}
        />
        {/* Tampil saat Dark mode (White font + Orange dot) */}
        <img
          src="/logo-pos-white.png"
          alt="POS IND"
          draggable="false"
          title="PT Pos Indonesia (Persero)"
          className="hidden dark:block"
          style={{
            height: logoHeight,
            width: 'auto',
            objectFit: 'contain',
          }}
        />
      </div>
    </div>
  );
};
