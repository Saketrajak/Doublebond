import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroAnimationProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

const STORAGE_KEY = 'doublebond_intro_seen';

// 25-point smooth parametric coordinates for Orbit A (Student: -25deg tilt)
// First 72% traverses the full 360° elliptical circuit; final 28% spirals inward to collision center (200, 200)
const ORBIT_A_CX = [20, 31.8, 65.5, 116.9, 179.1, 244.1, 303.2, 348.9, 375.1, 378.5, 358.4, 317.7, 261.6, 197.4, 133.5, 78.4, 39.1, 20.9, 51.9, 104.8, 154.2, 189.6, 206.4, 206.7, 200];
const ORBIT_A_CY = [200, 175.1, 153.5, 137.9, 130.5, 132.1, 142.7, 160.7, 183.9, 209.1, 233.2, 253, 265.8, 270, 265.1, 251.6, 231.4, 207.1, 184.1, 172.2, 171.2, 177.7, 187.4, 195.9, 200];

// 25-point smooth parametric coordinates for Orbit B (Tutor: +35deg tilt)
const ORBIT_B_CX = [380, 368.2, 334.5, 283.1, 220.9, 155.9, 96.8, 51.1, 24.9, 21.5, 41.6, 82.3, 138.4, 202.6, 266.5, 321.6, 360.9, 379.1, 348.1, 295.2, 245.8, 210.4, 193.6, 193.3, 200];
const ORBIT_B_CY = [200, 224.9, 246.5, 262.1, 269.5, 267.9, 257.3, 239.3, 216.1, 190.9, 166.8, 147, 134.2, 130, 134.9, 148.4, 168.6, 192.9, 215.9, 227.8, 228.8, 222.3, 212.6, 204.1, 200];

// Comet tails lagging smoothly behind each particle
const TAIL1_A_CX = [ORBIT_A_CX[0], ...ORBIT_A_CX.slice(0, 24)];
const TAIL1_A_CY = [ORBIT_A_CY[0], ...ORBIT_A_CY.slice(0, 24)];
const TAIL2_A_CX = [ORBIT_A_CX[0], ORBIT_A_CX[0], ...ORBIT_A_CX.slice(0, 23)];
const TAIL2_A_CY = [ORBIT_A_CY[0], ORBIT_A_CY[0], ...ORBIT_A_CY.slice(0, 23)];
const TAIL3_A_CX = [ORBIT_A_CX[0], ORBIT_A_CX[0], ORBIT_A_CX[0], ...ORBIT_A_CX.slice(0, 22)];
const TAIL3_A_CY = [ORBIT_A_CY[0], ORBIT_A_CY[0], ORBIT_A_CY[0], ...ORBIT_A_CY.slice(0, 22)];

const TAIL1_B_CX = [ORBIT_B_CX[0], ...ORBIT_B_CX.slice(0, 24)];
const TAIL1_B_CY = [ORBIT_B_CY[0], ...ORBIT_B_CY.slice(0, 24)];
const TAIL2_B_CX = [ORBIT_B_CX[0], ORBIT_B_CX[0], ...ORBIT_B_CX.slice(0, 23)];
const TAIL2_B_CY = [ORBIT_B_CY[0], ORBIT_B_CY[0], ...ORBIT_B_CY.slice(0, 23)];
const TAIL3_B_CX = [ORBIT_B_CX[0], ORBIT_B_CX[0], ORBIT_B_CX[0], ...ORBIT_B_CX.slice(0, 22)];
const TAIL3_B_CY = [ORBIT_B_CY[0], ORBIT_B_CY[0], ORBIT_B_CY[0], ...ORBIT_B_CY.slice(0, 22)];

// 14 micro-sparkle particles with precomputed trajectory coordinates (zero runtime trigonometry)
const STARDUST_SPARKLES = [
  { tx: 78, ty: 0, size: 3.5, color: '#F472B6' },
  { tx: 86.1, ty: 40.1, size: 2.5, color: '#C084FC' },
  { tx: 41.9, ty: 53.6, size: 3, color: '#FFFFFF' },
  { tx: 18.3, ty: 86.1, size: 2, color: '#60A5FA' },
  { tx: -23.7, ty: 95.1, size: 3.5, color: '#E879F9' },
  { tx: -46.3, ty: 55.2, size: 2.5, color: '#F43F5E' },
  { tx: -84, ty: 37.4, size: 3, color: '#FFFFFF' },
  { tx: -82, ty: 0, size: 2, color: '#38BDF8' },
  { tx: -86.3, ty: -42.1, size: 3.5, color: '#C084FC' },
  { tx: -40.6, ty: -52, size: 2.5, color: '#818CF8' },
  { tx: -17.9, ty: -84.1, size: 3, color: '#FFFFFF' },
  { tx: 15.8, ty: -74.3, size: 2, color: '#A855F7' },
  { tx: 56.6, ty: -72.5, size: 3.5, color: '#38BDF8' },
  { tx: 62.9, ty: -30.7, size: 2.5, color: '#F472B6' }
];

// 13-point parametric coordinates for the Point-Blank Binary Snap (~250ms high-speed micro-spiral before detonation)
const SNAP_A_CX = [184, 187.2, 193.2, 200, 205.6, 208.5, 208.6, 206.3, 203, 200, 198.4, 198.5, 200];
const SNAP_A_CY = [200, 192.6, 188.2, 187.6, 190.4, 195.1, 200, 203.6, 205.2, 204.6, 202.8, 200.9, 200];
const SNAP_B_CX = [216, 212.8, 206.8, 200, 194.4, 191.5, 191.4, 193.7, 197, 200, 201.6, 201.5, 200];
const SNAP_B_CY = [200, 207.4, 211.8, 212.4, 209.6, 204.9, 200, 196.4, 194.8, 195.4, 197.2, 199.1, 200];

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete, forceShow = false }) => {
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (forceShow) return true;
    try {
      if (typeof window !== 'undefined' && (window.location.search.includes('replay=1') || window.location.search.includes('phase='))) {
        return true;
      }
      return sessionStorage.getItem(STORAGE_KEY) !== 'true';
    } catch {
      return true;
    }
  });

  const [phase, setPhase] = useState<'orbit' | 'snap' | 'brand' | 'exit'>('orbit');

  useEffect(() => {
    // If not visible on mount, trigger onComplete immediately and exit
    if (!isVisible) {
      onComplete?.();
      return;
    }

    // Expose dev helper to replay animation on demand from browser console
    if (typeof window !== 'undefined') {
      (window as unknown as { replayIntroAnimation: () => void }).replayIntroAnimation = () => {
        try {
          sessionStorage.removeItem(STORAGE_KEY);
        } catch {
          // ignore
        }
        window.location.reload();
      };
    }

    // Eagerly preload optimized logo into GPU memory so it renders with 0ms decode latency
    if (typeof window !== 'undefined') {
      const preloadImg = new Image();
      preloadImg.src = '/images/DB_logo_optimized.png';
    }

    // Lock body scroll during intro animation
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Sequence timeline (~3.10s Total Duration - Direct Epicenter Burst to Logo):
    // 0.00s -> Full 360° orbit revolution along tilted ellipses + glowing comet trails (1.20s)
    // 1.20s -> Point-Blank Binary Snap: particles locked in gravitational micro-spiral (~250ms buildup)
    // 1.45s -> Critical mass detonation: shockwave blast, 14 stardust sparkles, and DB logo rises directly from epicenter
    // 2.65s -> Curtain exit reveal triggers (~1.20s full logo showcase)
    // 3.10s -> Completely unmounted & page scroll restored

    const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const freezePhase = searchParams?.get('phase') as 'orbit' | 'snap' | 'brand' | 'exit' | null;
    if (freezePhase) {
      setPhase(freezePhase);
      return;
    }

    const t1 = setTimeout(() => setPhase('snap'), 1200);
    const t2 = setTimeout(() => setPhase('brand'), 1450);
    const t3 = setTimeout(() => setPhase('exit'), 2650);
    const t4 = setTimeout(() => {
      try {
        sessionStorage.setItem(STORAGE_KEY, 'true');
      } catch {
        // ignore
      }
      setIsVisible(false);
      document.body.style.overflow = originalOverflow;
      onComplete?.();
    }, 3100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      document.body.style.overflow = originalOverflow;
    };
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  // Premium cubic-bezier for Awwwards-style easing: rapid start, silky smooth deceleration
  const curtainEase = [0.76, 0, 0.24, 1] as const;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
          <div className="fixed inset-0 z-[9999] pointer-events-auto select-none overflow-hidden [contain:paint_layout] transform-gpu">
            {/* ======================================================== */}
            {/* Awwwards Curtain Reveal Layer (4 Staggered Panels)      */}
            {/* ======================================================== */}
              <div className="absolute inset-0 flex w-full h-full pointer-events-none z-10 [contain:paint]">
                {[0, 1, 2, 3].map((colIndex) => (
                  <motion.div
                    key={colIndex}
                    initial={{ y: 0 }}
                    animate={phase === 'exit' ? { y: colIndex % 2 === 0 ? '-101%' : '101%' } : { y: 0 }}
                    transition={{
                      duration: 0.44,
                      delay: colIndex * 0.015,
                      ease: curtainEase,
                    }}
                    className="relative h-full flex-1 bg-gradient-to-b from-[#0B0216] via-[#15042A] to-[#0A0114] border-r border-purple-900/10 last:border-none will-change-transform shadow-[0_0_25px_rgba(0,0,0,0.6)] [contain:paint] transform-gpu"
                  />
                ))}
              </div>

              {/* ======================================================== */}
              {/* Center Stage Animation Content                           */}
              {/* ======================================================== */}
              <motion.div
                initial={{ opacity: 1, scale: 1 }}
                animate={
                  phase === 'exit'
                    ? { opacity: 0, scale: 1.08, filter: 'blur(8px)' }
                    : { opacity: 1, scale: 1, filter: 'blur(0px)' }
                }
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 transform-gpu"
              >
                {/* Ambient Background Radial Glow (GPU-friendly zero-blur radial gradient) */}
                <div className="absolute w-[500px] h-[500px] sm:w-[650px] sm:h-[650px] rounded-full bg-[radial-gradient(circle,rgba(166,79,252,0.18)_0%,rgba(67,6,122,0.06)_50%,transparent_70%)] pointer-events-none -z-10 transform-gpu animate-pulse" />

                {/* Stage 1: Subtle Orbit Rings & Orbital Comet Particles */}
                <div className="relative w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] flex items-center justify-center">
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 400 400"
                    fill="none"
                  >
                    <defs>
                      <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#A64FFC" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#43067A" stopOpacity="0.2" />
                      </linearGradient>

                      <radialGradient id="particleAGradient">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="35%" stopColor="#F472B6" />
                        <stop offset="100%" stopColor="#A64FFC" />
                      </radialGradient>

                      <radialGradient id="particleBGradient">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="35%" stopColor="#38BDF8" />
                        <stop offset="100%" stopColor="#818CF8" />
                      </radialGradient>

                        <filter id="glow-violet" x="-25%" y="-25%" width="150%" height="150%">
                          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="coloredBlur" />
                          <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>

                          <filter id="glow-cyan" x="-25%" y="-25%" width="150%" height="150%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="coloredBlur" />
                            <feMerge>
                              <feMergeNode in="coloredBlur" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>

                          <linearGradient id="electricArcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#F472B6" />
                            <stop offset="50%" stopColor="#FFFFFF" />
                            <stop offset="100%" stopColor="#38BDF8" />
                          </linearGradient>
                        </defs>

                        {/* Subtle Static Dotted Orbit Guidance Rings */}
                        <g opacity="0.25">
                          <ellipse
                            cx="200"
                            cy="200"
                            rx="180"
                            ry="70"
                            stroke="url(#orbitGradient)"
                            strokeWidth="1.5"
                            strokeDasharray="4 6"
                            transform="rotate(-25 200 200)"
                          />
                          <ellipse
                            cx="200"
                            cy="200"
                            rx="180"
                            ry="70"
                            stroke="url(#orbitGradient)"
                            strokeWidth="1.5"
                            strokeDasharray="4 6"
                            transform="rotate(35 200 200)"
                          />
                        </g>

                        {/* Particle A: Student (Violet/Fuchsia) Revolving on -25deg Orbit */}
                        {phase === 'orbit' && (
                          <g transform="rotate(-25 200 200)">
                            {/* Comet Tail 3 (Faintest, longest lag) */}
                            <motion.circle
                              animate={{ cx: TAIL3_A_CX, cy: TAIL3_A_CY }}
                              transition={{ duration: 1.2, ease: [0.36, 0, 0.66, 1] }}
                              r="3.5"
                              fill="#C084FC"
                              opacity="0.22"
                            />
                            {/* Comet Tail 2 */}
                            <motion.circle
                              animate={{ cx: TAIL2_A_CX, cy: TAIL2_A_CY }}
                              transition={{ duration: 1.2, ease: [0.36, 0, 0.66, 1] }}
                              r="5"
                              fill="#E879F9"
                              opacity="0.45"
                              filter="url(#glow-violet)"
                            />
                            {/* Comet Tail 1 */}
                            <motion.circle
                              animate={{ cx: TAIL1_A_CX, cy: TAIL1_A_CY }}
                              transition={{ duration: 1.2, ease: [0.36, 0, 0.66, 1] }}
                              r="6.5"
                              fill="#F472B6"
                              opacity="0.75"
                              filter="url(#glow-violet)"
                            />
                            {/* Main Particle Head */}
                            <motion.circle
                              animate={{ cx: ORBIT_A_CX, cy: ORBIT_A_CY }}
                              transition={{ duration: 1.2, ease: [0.36, 0, 0.66, 1] }}
                              r="8.5"
                              fill="url(#particleAGradient)"
                              filter="url(#glow-violet)"
                            />
                            {/* High-intensity White-hot Core */}
                            <motion.circle
                              animate={{ cx: ORBIT_A_CX, cy: ORBIT_A_CY }}
                              transition={{ duration: 1.2, ease: [0.36, 0, 0.66, 1] }}
                              r="3"
                              fill="#FFFFFF"
                            />
                          </g>
                        )}

                        {/* Particle B: Expert Tutor (Cyan/Indigo) Revolving on +35deg Orbit */}
                        {phase === 'orbit' && (
                          <g transform="rotate(35 200 200)">
                            {/* Comet Tail 3 */}
                            <motion.circle
                              animate={{ cx: TAIL3_B_CX, cy: TAIL3_B_CY }}
                              transition={{ duration: 1.2, ease: [0.36, 0, 0.66, 1] }}
                              r="3.5"
                              fill="#818CF8"
                              opacity="0.22"
                            />
                            {/* Comet Tail 2 */}
                            <motion.circle
                              animate={{ cx: TAIL2_B_CX, cy: TAIL2_B_CY }}
                              transition={{ duration: 1.2, ease: [0.36, 0, 0.66, 1] }}
                              r="5"
                              fill="#38BDF8"
                              opacity="0.45"
                              filter="url(#glow-cyan)"
                            />
                            {/* Comet Tail 1 */}
                            <motion.circle
                              animate={{ cx: TAIL1_B_CX, cy: TAIL1_B_CY }}
                              transition={{ duration: 1.2, ease: [0.36, 0, 0.66, 1] }}
                              r="6.5"
                              fill="#67E8F9"
                              opacity="0.75"
                              filter="url(#glow-cyan)"
                            />
                            {/* Main Particle Head */}
                            <motion.circle
                              animate={{ cx: ORBIT_B_CX, cy: ORBIT_B_CY }}
                              transition={{ duration: 1.2, ease: [0.36, 0, 0.66, 1] }}
                              r="8.5"
                              fill="url(#particleBGradient)"
                              filter="url(#glow-cyan)"
                            />
                            {/* High-intensity White-hot Core */}
                            <motion.circle
                              animate={{ cx: ORBIT_B_CX, cy: ORBIT_B_CY }}
                              transition={{ duration: 1.2, ease: [0.36, 0, 0.66, 1] }}
                              r="3"
                              fill="#FFFFFF"
                            />
                          </g>
                        )}
                        {/* Point-Blank Binary Snap Micro-Spiral (250ms Gravitational Tension Buildup before Detonation) */}
                        {phase === 'snap' && (
                          <g>
                            {/* Electric Tension Filament connecting the two rapidly swirling particles */}
                            <motion.line
                              animate={{
                                x1: SNAP_A_CX,
                                y1: SNAP_A_CY,
                                x2: SNAP_B_CX,
                                y2: SNAP_B_CY,
                                opacity: [0.6, 1, 1, 0.2],
                                strokeWidth: [2, 3.5, 4, 1],
                              }}
                              transition={{ duration: 0.25, ease: 'easeIn' }}
                              stroke="url(#electricArcGradient)"
                              strokeLinecap="round"
                              filter="url(#glow-violet)"
                            />

                            {/* Concentrating Critical Mass Energy Core at Center */}
                            <motion.circle
                              cx="200"
                              cy="200"
                              initial={{ r: 0, opacity: 0 }}
                              animate={{ r: [0, 2, 7, 16], opacity: [0, 0.4, 0.9, 1] }}
                              transition={{ duration: 0.25, ease: 'easeIn' }}
                              fill="#FFFFFF"
                              filter="url(#glow-violet)"
                            />

                            {/* Swirling Particle A (Student / Fuchsia) */}
                            <motion.circle
                              animate={{ cx: SNAP_A_CX, cy: SNAP_A_CY, r: [6, 7, 5, 2] }}
                              transition={{ duration: 0.25, ease: 'easeIn' }}
                              fill="url(#particleAGradient)"
                              filter="url(#glow-violet)"
                            />

                            {/* Swirling Particle B (Tutor / Cyan) */}
                            <motion.circle
                              animate={{ cx: SNAP_B_CX, cy: SNAP_B_CY, r: [6, 7, 5, 2] }}
                              transition={{ duration: 0.25, ease: 'easeIn' }}
                              fill="url(#particleBGradient)"
                              filter="url(#glow-cyan)"
                            />
                          </g>
                        )}
                      </svg>

                      {/* Stage 2: Direct Detonation Blast & Rising Logo Reveal */}
                      <div className="relative w-40 h-40 flex items-center justify-center">
                        {/* Fusion Flash Shockwave (Triggers immediately upon detonation at 1.15s) */}
                        {(phase === 'brand' || phase === 'exit') && (
                          <motion.div
                            initial={{ scale: 0.2, opacity: 1 }}
                            animate={{ scale: 4.4, opacity: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className="absolute w-28 h-28 rounded-full border border-brand-accent/90 bg-brand-accent/25 blur-sm pointer-events-none"
                          />
                        )}

                        {/* Central Radial Plasma Glare */}
                        {(phase === 'brand' || phase === 'exit') && (
                          <motion.div
                            initial={{ scale: 0.3, opacity: 1 }}
                            animate={{ scale: [0.3, 2.8, 0], opacity: [1, 0.9, 0] }}
                            transition={{ duration: 0.45, ease: 'easeOut' }}
                            className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-white via-fuchsia-300 to-cyan-300 blur-md pointer-events-none"
                          />
                        )}

                        {/* 14 Radiating Stardust Micro-Sparkles Burst Outward */}
                        {(phase === 'brand' || phase === 'exit') && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none [contain:layout_paint]">
                              {STARDUST_SPARKLES.map((sparkle, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                                  animate={{
                                    x: [0, sparkle.tx * 0.7, sparkle.tx],
                                    y: [0, sparkle.ty * 0.7, sparkle.ty],
                                    scale: [0, 1.5, 0],
                                    opacity: [1, 1, 0],
                                  }}
                                  transition={{
                                    duration: 0.5,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                  style={{
                                    width: sparkle.size,
                                    height: sparkle.size,
                                    backgroundColor: sparkle.color,
                                    boxShadow: `0 0 10px ${sparkle.color}`,
                                  }}
                                  className="absolute rounded-full transform-gpu"
                                />
                              ))}
                            </div>
                )}

                            {/* DB Logo Emblem Reveal - Rising Up from the Blast Epicenter */}
                            {(phase === 'brand' || phase === 'exit') && (
                              <motion.div
                                initial={{ scale: 0.45, opacity: 0, y: 22, filter: 'blur(8px)' }}
                                animate={{ scale: [0.45, 1.05, 1], opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                                className="relative z-20 flex items-center justify-center transform-gpu"
                              >
                                {/* Glowing backdrop aura */}
                                <div className="absolute inset-0 bg-brand-accent/40 rounded-full blur-2xl scale-150 animate-pulse pointer-events-none" />

                                {/* Frosted Glass Squircle Emblem Badge */}
                                  <div className="relative p-4 sm:p-5 rounded-3xl bg-gradient-to-b from-white/20 via-white/10 to-purple-900/30 border border-white/25 backdrop-blur-xl shadow-[0_12px_40px_rgba(166,79,252,0.45)] flex items-center justify-center transform-gpu">
                                    <img
                                      src="/images/DB_logo_optimized.png"
                                      srcSet="/images/DB_logo_optimized.png 1x, /images/DB_logo.png 2x"
                                      alt="Doublebond"
                                      width={96}
                                      height={72}
                                      loading="eager"
                                      decoding="async"
                                      className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-[0_2px_16px_rgba(166,79,252,0.7)]"
                                    />
                                  </div>
                              </motion.div>
                            )}
                          </div>
            </div>

                      {/* Stage 3: Typography & Brand Reveal */}
                      {(phase === 'brand' || phase === 'exit') && (
                        <motion.div
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, delay: 0.15, ease: 'easeOut' }}
                          className="mt-4 text-center flex flex-col items-center"
                        >
                          {/* Wordmark Header */}
                          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-[0.28em] text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-purple-300 drop-shadow-[0_2px_12px_rgba(166,79,252,0.4)] uppercase">
                            DOUBLEBOND
                          </h1>

                          {/* Accent Laser Divider Line */}
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: 140 }}
                            transition={{ duration: 0.45, delay: 0.22, ease: 'easeOut' }}
                            className="h-[2px] mt-2 bg-gradient-to-r from-transparent via-brand-accent to-transparent"
                          />

                          {/* Subtitle Slogan */}
                          <p className="mt-2 text-xs sm:text-sm font-medium tracking-widest uppercase text-purple-200/75">
                            Unlock Your Potential
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                </div>
      )}
              </AnimatePresence>
              );
};
