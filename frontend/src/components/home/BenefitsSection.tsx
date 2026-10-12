import React from 'react';
import { Target, Zap, Clock, TrendingUp } from 'lucide-react';
import type { BenefitItem } from '../../types';

interface BenefitsSectionProps {
  headline: string;
  items: BenefitItem[];
}

const BENEFIT_ICONS = [
  <Target className="w-7 h-7 text-brand-600" />,
  <Zap className="w-7 h-7 text-amber-500" />,
  <TrendingUp className="w-7 h-7 text-emerald-500" />,
  <Clock className="w-7 h-7 text-indigo-500" />
];

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({ headline, items }) => {
  return (
    <section className="py-20 md:py-28 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            {headline}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {items.map((benefit, idx) => (
            <div
              key={benefit.title}
              className="p-8 rounded-3xl bg-slate-50/60 border border-slate-100/90 hover:border-brand-200 hover:bg-white hover:shadow-card transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 border border-slate-100">
                  {BENEFIT_ICONS[idx % BENEFIT_ICONS.length]}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                  {benefit.title}
                </h3>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
