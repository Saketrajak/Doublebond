import React, { useState } from 'react';
import { Star, ShieldCheck, Quote, Sparkles, ArrowRight, Check } from 'lucide-react';

interface HeroSectionProps {
  onStartAssessment: (audience: 'MY CHILD' | 'ME OR SOMEONE ELSE') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartAssessment }) => {
  const [selectedAudience, setSelectedAudience] = useState<'MY CHILD' | 'ME OR SOMEONE ELSE'>('MY CHILD');

  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading and Audience Selection */}
          <div className="lg:col-span-7 space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              Unlock Your Child's <br className="hidden sm:inline" />
              Potential with Our <br className="hidden sm:inline" />
              <span className="text-brand-accent drop-shadow-[0_0_15px_rgba(166,79,252,0.35)]">Expert Online Tutors</span>
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
                      ? 'border-2 border-brand-500 bg-slate-50 text-brand-500 shadow-sm'
                      : 'border-2 border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  MY CHILD
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedAudience('ME OR SOMEONE ELSE')}
                  className={`px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 ${
                    selectedAudience === 'ME OR SOMEONE ELSE'
                      ? 'border-2 border-brand-500 bg-slate-50 text-brand-500 shadow-sm'
                      : 'border-2 border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  ME OR SOMEONE ELSE
                </button>
              </div>

              {/* Assessment CTA Trigger */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => onStartAssessment(selectedAudience)}
                  className="px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-brand-500/30 hover:shadow-[0_0_25px_rgba(166,79,252,0.45)] border border-brand-accent/30 hover:border-brand-accent hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Find Your Tutor Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Tutors available in your timezone</span>
                </div>
              </div>
            </div>

            {/* Trust badge */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-50 border border-amber-200">
                <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              </div>
              <div className="text-sm font-semibold text-slate-700">
                <span>Trusted by </span>
                <strong className="font-bold text-slate-900">10,000+ families</strong>
                <span className="text-slate-400 ml-1.5 font-normal">| 4.8 / 5 Rating</span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Testimonial Card */}
          <div className="lg:col-span-5 relative">
            {/* Background decorative blob */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-brand-accent/15 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="relative bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-card hover:shadow-xl transition-all duration-300">
              {/* Quote icon */}
              <div className="text-brand-accent mb-4">
                <Quote className="w-12 h-12 fill-brand-accent/20 text-brand-accent" />
              </div>

              {/* Headline */}
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-3">
                Best investment in my child's education
              </h2>

              {/* Quote Text */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                "Not only did she improve in math, but every aspect of her 'student experience' got better—study habits, time management, and general attitude toward learning."
              </p>

              {/* Rating & Author */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-bold text-slate-900">5.0</span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  TINA C, 5/21/25
                </div>
              </div>

              {/* Verified badge */}
              <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-600 font-semibold bg-emerald-50 px-3 py-1.5 rounded-lg w-fit">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Parent Review</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
