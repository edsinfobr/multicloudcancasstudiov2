import React from 'react';

interface MultiCloudLogoProps {
  className?: string;
  size?: number | string;
  /**
   * If true (default), renders with the deep indigo squircle app icon frame.
   * If false, renders only the cloud, brush, and sparkles emblem.
   */
  withSquircle?: boolean;
}

export const MultiCloudLogo: React.FC<MultiCloudLogoProps> = ({
  className = 'w-9 h-9',
  size,
  withSquircle = true,
}) => {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      style={style}
      aria-label="MultiCloud Canvas Studio Logo"
    >
      <defs>
        {/* Squircle Dark Indigo Background Gradient */}
        <linearGradient id="mcSquircleBg" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1B123C" />
          <stop offset="50%" stopColor="#130E2E" />
          <stop offset="100%" stopColor="#0B071F" />
        </linearGradient>

        {/* Ambient Glow */}
        <radialGradient id="mcAmbientGlow" cx="50" cy="50" r="45" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
          <stop offset="40%" stopColor="#A855F7" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0B071F" stopOpacity="0" />
        </radialGradient>

        {/* Rainbow Arc Gradient */}
        <linearGradient id="mcRainbowGrad" x1="50" y1="40" x2="88" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="25%" stopColor="#34D399" />
          <stop offset="50%" stopColor="#FBBF24" />
          <stop offset="75%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>

        {/* Back Cloud Gradient (Deep Indigo / Violet / Blue) */}
        <linearGradient id="mcCloudBack" x1="15" y1="35" x2="70" y2="65" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#4338CA" />
        </linearGradient>

        {/* Mid Cloud Gradient (Vibrant Magenta / Purple) */}
        <linearGradient id="mcCloudMid" x1="28" y1="38" x2="68" y2="65" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="50%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#D946EF" />
        </linearGradient>

        {/* Front Cloud Gradient (Electric Cyan / Sky Blue) */}
        <linearGradient id="mcCloudFront" x1="25" y1="50" x2="72" y2="78" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="45%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>

        {/* Top Mini Cloud Cyan Highlight */}
        <linearGradient id="mcCloudTop" x1="30" y1="20" x2="60" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#67E8F9" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>

        {/* Stylus Pen Body Gradient */}
        <linearGradient id="mcStylusBody" x1="82" y1="32" x2="48" y2="68" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="35%" stopColor="#818CF8" />
          <stop offset="70%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>

        {/* Stylus Silver Collar */}
        <linearGradient id="mcStylusCollar" x1="50" y1="67" x2="44" y2="73" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="50%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>

        {/* Brush Tip Rainbow Swirl */}
        <linearGradient id="mcBrushTip" x1="45" y1="72" x2="32" y2="82" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="30%" stopColor="#EC4899" />
          <stop offset="65%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>

        {/* Swatch 1: Cyan */}
        <linearGradient id="mcSwatchCyan" x1="52" y1="38" x2="56" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#67E8F9" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>

        {/* Swatch 2: Yellow */}
        <linearGradient id="mcSwatchYellow" x1="57" y1="39" x2="61" y2="53" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#EAB308" />
        </linearGradient>

        {/* Swatch 3: Orange */}
        <linearGradient id="mcSwatchOrange" x1="62" y1="41" x2="66" y2="55" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FB923C" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>

        {/* Swatch 4: Pink */}
        <linearGradient id="mcSwatchPink" x1="67" y1="44" x2="71" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#DB2777" />
        </linearGradient>

        {/* Soft Drop Shadow for Depth */}
        <filter id="mcShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.45" />
        </filter>

        {/* Bright Glow Filter */}
        <filter id="mcGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* 1. Squircle Base Frame */}
      {withSquircle && (
        <g>
          <rect
            x="2"
            y="2"
            width="96"
            height="96"
            rx="24"
            fill="url(#mcSquircleBg)"
          />
          {/* Subtle Squircle Inner Border */}
          <rect
            x="2.5"
            y="2.5"
            width="95"
            height="95"
            rx="23.5"
            stroke="white"
            strokeOpacity="0.12"
            strokeWidth="1"
            fill="none"
          />
          {/* Ambient Background Radial Glow */}
          <circle cx="50" cy="50" r="42" fill="url(#mcAmbientGlow)" />
        </g>
      )}

      {/* 2. Rainbow Arc Ribbon (Curving behind clouds on the right) */}
      <path
        d="M 52 46 C 68 44 86 52 86 68 C 86 78 78 84 68 84"
        stroke="url(#mcRainbowGrad)"
        strokeWidth="6.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.92"
        filter="url(#mcGlow)"
      />

      {/* 3. Back Upper Cloud Layer (Deep Cyan-Indigo) */}
      <path
        d="M 32 32 C 32 23 44 20 50 25 C 55 19 68 22 68 30 C 74 30 78 35 77 41 C 75 48 68 50 64 50 L 32 50 C 26 50 22 45 23 40 C 24 35 28 32 32 32 Z"
        fill="url(#mcCloudTop)"
        opacity="0.9"
        filter="url(#mcShadow)"
      />

      {/* 4. Large Back Cloud (Indigo / Blue / Violet) */}
      <path
        d="M 24 55 C 16 55 12 47 16 40 C 18 36 22 34 26 35 C 28 26 40 22 48 26 C 54 21 66 23 68 32 C 75 32 80 37 79 44 C 84 46 86 53 82 58 C 79 63 72 63 68 62 L 26 62 C 22 62 18 59 17 55 Z"
        fill="url(#mcCloudBack)"
        opacity="0.95"
        filter="url(#mcShadow)"
      />

      {/* 5. Mid Magenta / Pink Cloud Layer */}
      <path
        d="M 28 62 C 24 62 20 58 22 53 C 23 48 28 46 32 47 C 34 40 44 37 50 41 C 55 37 65 39 67 46 C 72 46 76 50 76 55 C 76 60 71 63 66 63 Z"
        fill="url(#mcCloudMid)"
        filter="url(#mcShadow)"
      />

      {/* 6. Palette Swatch Cards (Fanning out behind the stylus) */}
      <g filter="url(#mcShadow)">
        {/* Swatch 1: Cyan */}
        <rect
          x="51"
          y="38"
          width="5.5"
          height="14"
          rx="2"
          transform="rotate(-15 51 38)"
          fill="url(#mcSwatchCyan)"
          stroke="#FFFFFF"
          strokeWidth="0.8"
        />
        {/* Swatch 2: Yellow */}
        <rect
          x="57"
          y="39"
          width="5.5"
          height="14"
          rx="2"
          transform="rotate(0 57 39)"
          fill="url(#mcSwatchYellow)"
          stroke="#FFFFFF"
          strokeWidth="0.8"
        />
        {/* Swatch 3: Orange */}
        <rect
          x="63"
          y="41"
          width="5.5"
          height="14"
          rx="2"
          transform="rotate(15 63 41)"
          fill="url(#mcSwatchOrange)"
          stroke="#FFFFFF"
          strokeWidth="0.8"
        />
        {/* Swatch 4: Pink */}
        <rect
          x="68"
          y="44"
          width="5.5"
          height="14"
          rx="2"
          transform="rotate(30 68 44)"
          fill="url(#mcSwatchPink)"
          stroke="#FFFFFF"
          strokeWidth="0.8"
        />
      </g>

      {/* 7. Foreground Front Cloud (Electric Cyan / Sky Blue with glossy highlights) */}
      <g filter="url(#mcShadow)">
        <path
          d="M 25 74 C 20 74 16 69 18 64 C 19 60 23 57 27 58 C 29 51 39 48 45 52 C 50 47 60 49 63 55 C 67 55 71 59 71 64 C 71 70 66 74 60 74 Z"
          fill="url(#mcCloudFront)"
        />
        {/* Specular White Rim Highlight */}
        <path
          d="M 22 63 C 23 59 26 57 29 58 C 31 52 40 49 45 53 C 49 49 58 50 61 55 C 64 55 67 58 68 62"
          stroke="white"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeOpacity="0.55"
          fill="none"
        />
      </g>

      {/* 8. Digital Stylus Pen / Paintbrush (Angled diagonally ~45°) */}
      <g filter="url(#mcShadow)">
        {/* Stylus Main Body Tube */}
        <path
          d="M 80 32 L 83 35 C 84 36 84 38 83 39 L 52 70 L 47 65 L 78 34 C 79 33 80 32 80 32 Z"
          fill="url(#mcStylusBody)"
          stroke="#A5B4FC"
          strokeWidth="0.75"
        />
        {/* Stylus Stylized Button / Sensor Pill */}
        <rect
          x="59"
          y="56"
          width="2.5"
          height="6"
          rx="1.2"
          transform="rotate(-45 59 56)"
          fill="#0F172A"
          stroke="#38BDF8"
          strokeWidth="0.6"
        />
        {/* Stylus Silver Collar */}
        <polygon
          points="47,65 52,70 47,75 42,70"
          fill="url(#mcStylusCollar)"
          stroke="#E2E8F0"
          strokeWidth="0.5"
        />
        {/* Stylus Rainbow Paintbrush Tip with dynamic curve */}
        <path
          d="M 43 71 C 41 73 37 77 34 81 C 32 83 34 85 37 84 C 42 82 46 76 46 74 Z"
          fill="url(#mcBrushTip)"
          filter="url(#mcGlow)"
        />
        {/* Trailing luminous rainbow swirl curve */}
        <path
          d="M 34 81 C 30 83 26 80 27 76"
          stroke="#F59E0B"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />
      </g>

      {/* 9. Floating Design & Vector Details */}
      {/* Selection Marquee Box (Top Right) */}
      <g opacity="0.85">
        <rect
          x="60"
          y="20"
          width="6.5"
          height="6.5"
          stroke="#38BDF8"
          strokeWidth="1"
          strokeDasharray="1.5 1.5"
          fill="none"
        />
        <rect x="59.2" y="19.2" width="2" height="2" fill="#38BDF8" />
        <rect x="65.3" y="19.2" width="2" height="2" fill="#38BDF8" />
        <rect x="59.2" y="25.3" width="2" height="2" fill="#38BDF8" />
        <rect x="65.3" y="25.3" width="2" height="2" fill="#38BDF8" />
      </g>

      {/* Vector Cursor Arrow (Top Left) */}
      <polygon
        points="17,35 17,41 19,39.5 22,42 23,41 20,38.5 22,38"
        fill="#FFFFFF"
        stroke="#38BDF8"
        strokeWidth="0.5"
        opacity="0.9"
        filter="url(#mcGlow)"
      />

      {/* Vector Crop / Anchor Point mark (Bottom Left) */}
      <g opacity="0.85">
        <path d="M 18 69 L 22 69 M 20 67 L 20 73" stroke="#38BDF8" strokeWidth="1" strokeLinecap="round" />
        <rect x="18.5" y="68.5" width="3" height="3" fill="#38BDF8" opacity="0.8" />
      </g>

      {/* Star Sparkles (Four-pointed stars) */}
      {/* 1. Magenta Star at (27, 26) */}
      <path
        d="M 27 23 Q 27 26 24 26 Q 27 26 27 29 Q 27 26 30 26 Q 27 26 27 23 Z"
        fill="#F472B6"
        filter="url(#mcGlow)"
      />
      {/* 2. Gold Star at (83, 41) */}
      <path
        d="M 83 38 Q 83 41 80 41 Q 83 41 83 44 Q 83 41 86 41 Q 83 41 83 38 Z"
        fill="#FBBF24"
        filter="url(#mcGlow)"
      />
      {/* 3. Cyan Star at (35, 75) */}
      <path
        d="M 35 73 Q 35 75 33 75 Q 35 75 35 77 Q 35 75 37 75 Q 35 75 35 73 Z"
        fill="#67E8F9"
      />
      {/* 4. White micro sparkles */}
      <circle cx="85" cy="51" r="1.2" fill="#FFFFFF" filter="url(#mcGlow)" />
      <circle cx="17" cy="45" r="1" fill="#38BDF8" />
      <circle cx="55" cy="20" r="1.2" fill="#F472B6" />
      <circle cx="52" cy="81" r="1" fill="#FBBF24" />
      <circle cx="76" cy="75" r="0.9" fill="#E2E8F0" />
    </svg>
  );
};
