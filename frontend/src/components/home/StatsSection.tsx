import React from 'react';
import { Users, Clock, Smile } from 'lucide-react';

interface StatsProps {
  studentsServedLabel: string;
  studentsServedDesc: string;
  hoursTutoredLabel: string;
  hoursTutoredDesc: string;
  satisfactionRateLabel: string;
  satisfactionRateDesc: string;
}

export const StatsSection: React.FC<{ stats: StatsProps }> = ({ stats }) => {
  return (
    <section className="py-16 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Proven Impact
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Stat 1 */}
          <div className="flex items-center justify-center gap-4 p-6 rounded-2xl bg-slate-50/70 border border-slate-100/80">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 shrink-0">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-brand-600 tracking-tight">
                {stats.studentsServedLabel}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">
                {stats.studentsServedDesc}
              </div>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex items-center justify-center gap-4 p-6 rounded-2xl bg-slate-50/70 border border-slate-100/80">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 shrink-0">
              <Clock className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-brand-600 tracking-tight">
                {stats.hoursTutoredLabel}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">
                {stats.hoursTutoredDesc}
              </div>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex items-center justify-center gap-4 p-6 rounded-2xl bg-slate-50/70 border border-slate-100/80">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 shrink-0">
              <Smile className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-brand-600 tracking-tight">
                {stats.satisfactionRateLabel}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">
                {stats.satisfactionRateDesc}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
