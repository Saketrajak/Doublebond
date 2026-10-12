import React from 'react';
import { ShieldCheck, Heart, Award, Users, BookOpen } from 'lucide-react';
import { FinalCTASection } from '../components/home/FinalCTASection';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="py-16 md:py-24 bg-slate-50 border-b border-slate-100 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="px-3 py-1 rounded-full bg-brand-50 text-brand-600 font-bold text-xs uppercase tracking-wider">
            Our Mission
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mt-4 tracking-tight">
            Empowering Every Student to Achieve Their Potential
          </h1>
          <p className="text-slate-600 mt-4 text-base sm:text-lg leading-relaxed">
            At Doublebond, we believe that personalized education transforms lives. By matching passionate, Ivy-League and top-tier educators with students in an interactive virtual classroom, we build confidence, mastery, and life-long curiosity.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-3">
            <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mx-auto">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Top 3% Educators</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We rigorously interview, background check, and credential-verify every single tutor before they ever teach a student.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-3">
            <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mx-auto">
              <Heart className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Custom Matching</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every student learns differently. We take learning styles, personality, and schedule into account for the perfect match.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-3">
            <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mx-auto">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Guaranteed Results</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We stand behind our tutors with our 100% Tutor Match Guarantee and measurable grade improvements within 2 weeks.
            </p>
          </div>
        </div>
      </div>

      <FinalCTASection onStartAssessment={() => window.location.href = '/find-a-tutor'} />
    </div>
  );
};
