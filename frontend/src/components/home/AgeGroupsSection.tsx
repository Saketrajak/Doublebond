import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

interface GradeItem {
  label: string;
  slug: string;
}

interface AgeGroupsSectionProps {
  gradeLevels: GradeItem[];
}

export const AgeGroupsSection: React.FC<AgeGroupsSectionProps> = ({ gradeLevels }) => {
  return (
    <section className="py-20 md:py-24 bg-white border-t border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Online tutoring for every age group & <br className="hidden sm:inline" />
          <span className="text-brand-500">grade level</span>
        </h2>

        {/* Lead text */}
        <p className="mt-4 text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          It is our belief at Doublebond that everyone can learn. We offer world-class online tutoring services for students from 2nd grade through adulthood.
        </p>

        <div className="mt-8 mb-8 inline-block text-xs font-bold uppercase tracking-wider text-slate-400">
          Age Groups & Grade Levels
        </div>

        {/* Grade Pills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {gradeLevels.map((grade) => (
            <Link
              key={grade.slug}
              to={`/grades/${grade.slug}`}
              className="py-4 px-6 bg-slate-50/80 hover:bg-brand-50 border border-slate-200 hover:border-brand-300 rounded-2xl text-slate-800 hover:text-brand-700 font-bold text-sm sm:text-base transition-all text-center shadow-sm hover:shadow group flex items-center justify-center gap-2"
            >
              <span>{grade.label}</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
