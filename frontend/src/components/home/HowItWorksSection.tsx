import React from 'react';
import { ArrowRight, CheckCircle2, Award, Clock, Users, Sparkles } from 'lucide-react';
import type { HowItWorksStep } from '../../types';

interface HowItWorksSectionProps {
  steps: HowItWorksStep[];
  onStartAssessment?: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ steps, onStartAssessment }) => {
  return (
    <section className="py-20 md:py-28 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            How does Doublebond work?
          </h2>
          <p className="mt-4 text-slate-500 text-base sm:text-lg">
            A frictionless, guided process to match your child with their dream educator in 72 hours.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={step.stepNumber}
              className="relative bg-slate-50/70 hover:bg-white rounded-3xl p-8 border border-slate-100 hover:border-brand-200 hover:shadow-card transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Step Number */}
                <div className="text-3xl sm:text-4xl font-extrabold text-brand-deep mb-6 group-hover:text-brand-accent group-hover:scale-110 transition-all">
                  {step.stepNumber}
                </div>

                {/* Description */}
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                  {step.description.includes('first session within') ? (
                    <>
                      We'll have a 5-minute call and schedule your{' '}
                      <strong className="font-semibold text-slate-900">first session within the next 72 hours</strong>.
                    </>
                  ) : step.description.includes('guaranteed better grades') ? (
                    <>
                      See progress in as little as 2 weeks for{' '}
                      <strong className="font-semibold text-slate-900">guaranteed better grades</strong>.
                    </>
                  ) : (
                    step.description
                  )}
                </p>
              </div>

              {/* Step indicator dot */}
              <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-accent opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Step {step.stepNumber}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Value Proposition: "Your child deserves the best online tutor." */}
        <div className="mt-28 max-w-4xl mx-auto text-center space-y-6">
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Your child deserves the best <br className="hidden sm:inline" />
            <span className="text-brand-accent drop-shadow-[0_0_15px_rgba(166,79,252,0.3)]">online tutor.</span>
          </h3>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            We offer the <strong className="text-slate-900 font-semibold">best online tutors</strong> for your student, custom-matched through our proprietary screening and vetting process. Tutors need more than subject matter expertise – they must possess the right technical and people skills to inspire and motivate today's learners.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={onStartAssessment}
              className="px-8 py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-md shadow-brand-500/25 hover:shadow-[0_0_20px_rgba(166,79,252,0.45)] border border-brand-accent/30 hover:border-brand-accent transition-all"
            >
              Get Custom Matched
            </button>
            <a
              href="tel:+917747973798"
              className="px-6 py-3.5 border-2 border-slate-200 text-slate-700 hover:border-brand-500 hover:text-brand-500 font-bold text-sm uppercase tracking-wider rounded-xl transition-all"
            >
              Call +91 77479 73798
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
