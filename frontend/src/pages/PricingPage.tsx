import React from 'react';
import { Check, ShieldCheck, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="px-3 py-1 rounded-full bg-brand-50 text-brand-600 font-bold text-xs uppercase tracking-wider">
            Transparent Investment
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Flexible Tutoring Packages
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            No long-term contracts. 100% Tutor Match Guarantee. Invest directly in your child's confidence and academic future.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Tier 1 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Subject Mastery</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Weekly Support</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-slate-900">$60</span>
                <span className="text-slate-500 text-sm">/ hr</span>
              </div>
              <p className="text-xs text-slate-600 mb-6">
                Ideal for ongoing homework help, weekly quizzes, and steady GPA improvement throughout the term.
              </p>
              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Dedicated 1-on-1 Ivy/top-tier tutor</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Interactive digital whiteboard</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Post-session progress recaps</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> 100% Tutor Match Guarantee</li>
              </ul>
            </div>
            <Link
              to="/find-a-tutor"
              className="mt-8 block text-center py-3.5 border-2 border-brand-500 text-brand-600 hover:bg-brand-50 font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
            >
              Get Started
            </Link>
          </div>

          {/* Tier 2 (Highlighted) */}
          <div className="bg-white rounded-3xl p-8 border-2 border-brand-500 shadow-xl shadow-brand-500/15 relative flex flex-col justify-between scale-105 z-10">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-500 text-white rounded-full text-[11px] font-bold uppercase tracking-wider shadow border border-brand-accent/30">
              Most Popular
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-brand-accent mb-2">Intensive Growth</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Exam & Test Prep</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-brand-deep">$75</span>
                <span className="text-slate-500 text-sm">/ hr</span>
              </div>
              <p className="text-xs text-slate-600 mb-6">
                Engineered for SAT, ACT, and AP exam score breakthroughs with targeted diagnostic tests and practice drills.
              </p>
              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-accent" /> Top 1% test prep specialists</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-accent" /> Official College Board practice exams</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-accent" /> Full video recorded session replay</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-accent" /> Direct parent WhatsApp updates</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-accent" /> Guaranteed score improvements</li>
              </ul>
            </div>
            <Link
              to="/find-a-tutor"
              className="mt-8 block text-center py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-brand-500/25 hover:shadow-[0_0_20px_rgba(166,79,252,0.45)] border border-brand-accent/30 hover:border-brand-accent transition-all"
            >
              Start Free Trial Assessment
            </Link>
          </div>

          {/* Tier 3 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Comprehensive</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Custom Semester Plan</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-slate-900">Custom</span>
                <span className="text-slate-500 text-sm">/ package</span>
              </div>
              <p className="text-xs text-slate-600 mb-6">
                Multi-subject concierge mentorship covering high school STEM, college admissions, and competitive scholarships.
              </p>
              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Multiple subjects & dedicated tutors</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Dedicated Academic Director</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Flexible scheduling & rollover hours</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Priority booking during exam weeks</li>
              </ul>
            </div>
            <a
              href="tel:+917747973798"
              className="mt-8 block text-center py-3.5 border-2 border-slate-200 text-slate-700 hover:border-brand-500 hover:text-brand-600 font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
            >
              Call +91 77479 73798
            </a>
          </div>
        </div>

        {/* Guarantee Banner */}
        <div className="mt-16 max-w-3xl mx-auto p-6 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-4 text-emerald-900">
          <ShieldCheck className="w-10 h-10 text-emerald-600 shrink-0" />
          <div className="text-xs sm:text-sm">
            <strong>100% Risk-Free Match Guarantee:</strong> If you don't love your tutor after your first lesson, we will match you with another tutor and cover your first session.
          </div>
        </div>
      </div>
    </div>
  );
};
