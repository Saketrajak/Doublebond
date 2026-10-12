import React, { useState } from 'react';
import { Award, DollarSign, Calendar, Globe, CheckCircle2 } from 'lucide-react';

export const BecomeTutorPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="px-3 py-1 rounded-full bg-brand-50 text-brand-600 font-bold text-xs uppercase tracking-wider">
            Join Our Faculty
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Teach With Doublebond
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            Earn $50 - $100+/hr teaching motivated students 1-on-1 from the comfort of your home.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm text-center space-y-2">
            <DollarSign className="w-8 h-8 text-emerald-500 mx-auto" />
            <h3 className="font-bold text-slate-900">Competitive Pay</h3>
            <p className="text-xs text-slate-500">Weekly direct deposits with rates starting at $50-$100+/hr.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm text-center space-y-2">
            <Calendar className="w-8 h-8 text-brand-deep mx-auto" />
            <h3 className="font-bold text-slate-900">Total Flexibility</h3>
            <p className="text-xs text-slate-500">Set your own weekly calendar, hours, and student capacity.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm text-center space-y-2">
            <Globe className="w-8 h-8 text-brand-accent mx-auto" />
            <h3 className="font-bold text-slate-900">Virtual Classroom</h3>
            <p className="text-xs text-slate-500">Access our built-in interactive whiteboard and session recording tools.</p>
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl">
          {!submitted ? (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
              <h2 className="text-2xl font-bold text-slate-900">Tutor Application</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Full Name</label>
                  <input required type="text" placeholder="Dr. Alex Rivera" className="w-full p-3 border border-slate-200 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Email</label>
                  <input required type="email" placeholder="alex@university.edu" className="w-full p-3 border border-slate-200 rounded-xl text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">University / Highest Degree</label>
                <input required type="text" placeholder="e.g. Stanford University - M.S. Applied Mathematics" className="w-full p-3 border border-slate-200 rounded-xl text-sm" />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Subjects You Specialize In</label>
                <input required type="text" placeholder="Calculus, AP Physics, SAT Math..." className="w-full p-3 border border-slate-200 rounded-xl text-sm" />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">LinkedIn Profile or Resume Link</label>
                <input required type="url" placeholder="https://linkedin.com/in/..." className="w-full p-3 border border-slate-200 rounded-xl text-sm" />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-md shadow-brand-500/25 hover:shadow-[0_0_20px_rgba(166,79,252,0.45)] border border-brand-accent/30 hover:border-brand-accent transition-all"
              >
                Submit Application For Screening
              </button>
            </form>
          ) : (
            <div className="text-center py-10 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
              <h3 className="text-2xl font-bold text-slate-900">Application Submitted!</h3>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                Thank you for applying. Our tutor vetting team will review your qualifications and reach out within 3 business days for your video teaching audition.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
