import React from 'react';
import { Phone, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface FinalCTASectionProps {
  onStartAssessment?: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onStartAssessment }) => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-brand-deep border border-slate-200 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
          <span>Start Seeing Results in 2 Weeks</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Unlock Your Child's True <br />
          <span className="text-brand-accent drop-shadow-[0_0_15px_rgba(166,79,252,0.3)]">Academic Potential Today</span>
        </h2>

        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Join over 10,000 satisfied families. Complete our quick 1-minute assessment and let our academic directors pair your student with their ideal private tutor.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStartAssessment}
            className="w-full sm:w-auto px-9 py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-brand-500/30 hover:shadow-[0_0_25px_rgba(166,79,252,0.45)] border border-brand-accent/30 hover:border-brand-accent hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
          >
            <span>Take 1-Minute Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="tel:+917747973798"
            className="w-full sm:w-auto px-8 py-4 border-2 border-slate-300 hover:border-brand-500 text-slate-700 hover:text-brand-500 font-bold text-sm uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 bg-white"
          >
            <Phone className="w-4 h-4 text-brand-500" />
            <span>Call +91 77479 73798</span>
          </a>
        </div>

        <div className="pt-4 flex items-center justify-center gap-6 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            100% Tutor Match Guarantee
          </span>
          <span>•</span>
          <span>No Long-Term Contracts</span>
          <span>•</span>
          <span>Pay Per Session Or Flexible Packages</span>
        </div>
      </div>
    </section>
  );
};
