import React, { useState } from 'react';
import { Star, ShieldCheck, Quote, ArrowRight } from 'lucide-react';
import { ThreeDMarquee } from '../ui/ThreeDMarquee';
import { InfiniteMovingCards } from '../ui/InfiniteMovingCards';
import { HERO_BG_IMAGES, UNIVERSITY_PARTNERS } from '../../data/heroMarqueeData';

interface HeroSectionProps {
  onStartAssessment: (audience: 'MY CHILD' | 'ME OR SOMEONE ELSE') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartAssessment }) => {
  const [selectedAudience, setSelectedAudience] = useState<'MY CHILD' | 'ME OR SOMEONE ELSE'>('MY CHILD');

  return (
    <section className="relative pt-6 pb-8 md:pt-10 md:pb-10 overflow-hidden bg-gradient-to-b from-slate-50/70 via-purple-50/20 to-white">
      {/* ======================================================== */}
      {/* 1. Stripe-inspired Radiant Ambient Glows                 */}
      {/* ======================================================== */}
      <div className="absolute -top-24 right-0 w-[550px] h-[550px] bg-gradient-to-br from-brand-accent/15 via-purple-300/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-36 -left-28 w-[450px] h-[450px] bg-gradient-to-tr from-indigo-200/20 via-brand-300/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* ======================================================== */}
      {/* 2. 3D Marquee Background Layer (Non-blocking)            */}
      {/* ======================================================== */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {/* Directional contrast mask: protects left text area while keeping center and right 3D cards vividly visible */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left_center,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.75)_38%,rgba(255,255,255,0.15)_80%)] z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-white/90 z-10" />
        <ThreeDMarquee
          images={HERO_BG_IMAGES}
          className="w-full h-full max-w-none opacity-85 transition-opacity duration-700"
        />
      </div>

      {/* ======================================================== */}
      {/* 3. Hero Foreground Content                               */}
      {/* ======================================================== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading and Audience Selection */}
          <div className="lg:col-span-7 space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              Unlock Your Child's <br className="hidden sm:inline" />
              Potential with Our <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-brand-accent to-fuchsia-600 drop-shadow-[0_2px_15px_rgba(166,79,252,0.35)]">
                Expert Online Tutors
              </span>
            </h1>

            {/* Who needs tutoring selector */}
            <div className="space-y-4">
              <p className="text-sm font-bold uppercase tracking-wider text-slate-700">
                Who needs tutoring?
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedAudience('MY CHILD')}
                  className={`px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 ${
                    selectedAudience === 'MY CHILD'
                      ? 'border-2 border-brand-500 bg-brand-50 text-brand-600 shadow-sm shadow-brand-500/10'
                      : 'border-2 border-slate-200 bg-white/90 backdrop-blur-sm text-slate-600 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  MY CHILD
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedAudience('ME OR SOMEONE ELSE')}
                  className={`px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 ${
                    selectedAudience === 'ME OR SOMEONE ELSE'
                      ? 'border-2 border-brand-500 bg-brand-50 text-brand-600 shadow-sm shadow-brand-500/10'
                      : 'border-2 border-slate-200 bg-white/90 backdrop-blur-sm text-slate-600 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  ME OR SOMEONE ELSE
                </button>
              </div>

              {/* Assessment CTA Trigger */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => onStartAssessment(selectedAudience)}
                  className="px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-brand-500/30 hover:shadow-[0_0_25px_rgba(166,79,252,0.45)] border border-brand-accent/30 hover:border-brand-accent hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Find Your Tutor Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-slate-200/60 w-fit">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Tutors available in your timezone</span>
                </div>
              </div>
            </div>

            {/* Trust badge */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-50 border border-amber-200 shadow-sm">
                <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              </div>
              <div className="text-sm font-semibold text-slate-700">
                <span>Trusted by </span>
                <strong className="font-bold text-slate-900">10,000+ families</strong>
                <span className="text-slate-500 ml-1.5 font-normal">| 4.8 / 5 Rating</span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Glassmorphic Testimonial Card */}
          <div className="lg:col-span-5 relative">
            {/* Ambient Backlight Glow (Glass Caustics) */}
            <div className="absolute -top-12 -right-12 w-80 h-80 bg-gradient-to-br from-brand-accent/25 via-purple-400/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10 animate-pulse [animation-duration:8s]" />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-gradient-to-tr from-indigo-500/20 via-brand-500/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

            {/* Specular Liquid Glass Card Container */}
            <div className="relative bg-gradient-to-b from-white/80 via-white/55 to-white/40 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 border border-white/80 shadow-[0_20px_50px_rgba(49,3,92,0.10),inset_0_1px_1px_rgba(255,255,255,0.9),inset_0_-1px_1px_rgba(166,79,252,0.12)] hover:shadow-[0_25px_60px_rgba(166,79,252,0.20),inset_0_1px_2px_rgba(255,255,255,1)] hover:border-white transition-all duration-300 hover:-translate-y-1 group">
              {/* Frosted Quote Icon Container */}
              <div className="w-14 h-14 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 flex items-center justify-center shadow-xs text-brand-accent mb-5 group-hover:scale-105 group-hover:bg-white/90 transition-all">
                <Quote className="w-7 h-7 fill-brand-accent/20 text-brand-accent" />
              </div>

              {/* Headline */}
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-3 tracking-tight">
                Best investment in my child's education
              </h2>

              {/* Quote Text */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                "Not only did she improve in math, but every aspect of her 'student experience' got better—study habits, time management, and general attitude toward learning."
              </p>

              {/* Rating & Author Row */}
              <div className="flex items-center justify-between border-t border-purple-100/60 pt-4">
                {/* Frosted Glass Rating Badge */}
                <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/80 shadow-xs">
                  <span className="text-sm font-extrabold text-slate-900">5.0</span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  TINA C, 5/21/25
                </div>
              </div>

              {/* Frosted Verified Parent Badge */}
              <div className="mt-4 flex items-center gap-2 text-xs text-emerald-700 font-semibold bg-emerald-500/10 backdrop-blur-md border border-emerald-400/30 px-3.5 py-1.5 rounded-full shadow-xs w-fit">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Parent Review</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. Horizontal Infinite Moving Cards (Ribbon at base)      */}
      {/* ======================================================== */}
      <div className="relative z-10 w-full mt-8 md:mt-12 pt-4 pb-1 border-t border-slate-200/60 bg-white/75 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 mb-2 text-center">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
            Expert tutors vetted from top universities & worldwide curricula
          </p>
        </div>
        <div className="w-full">
          <InfiniteMovingCards
            items={UNIVERSITY_PARTNERS}
            direction="left"
            speed="normal"
            pauseOnHover={true}
          />
        </div>
      </div>
    </section>
  );
};
