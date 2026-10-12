import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Star, Award, Sparkles, User, BookOpen } from 'lucide-react';

export const FindTutorPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [audience, setAudience] = useState<'MY CHILD' | 'ME OR SOMEONE ELSE'>('MY CHILD');
  const [subject, setSubject] = useState('Math');
  const [grade, setGrade] = useState('High School (9th-12th)');
  const [challenge, setChallenge] = useState('Homework & test preparation');
  const [parentName, setParentName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: parentName,
          email,
          phone,
          targetSubject: subject,
          gradeLevel: grade,
          studentType: audience,
          notes: challenge
        })
      });
    } catch (err) {
      console.error(err);
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xl">
          {!submitted ? (
            <div>
              {/* Header */}
              <div className="text-center mb-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-600 font-bold text-xs uppercase tracking-wider mb-2">
                  Interactive Matching Assessment
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Find the Perfect 1-to-1 Tutor
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  Step {step} of 3 • Takes less than 60 seconds
                </p>

                <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
                  <div
                    className="bg-brand-500 h-full transition-all duration-300"
                    style={{ width: `${(step / 3) * 100}%` }}
                  />
                </div>
              </div>

              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Who is this tutoring for?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setAudience('MY CHILD')}
                        className={`p-4 rounded-2xl border-2 font-bold text-sm text-left transition-all ${
                          audience === 'MY CHILD'
                            ? 'border-brand-500 bg-brand-50/60 text-brand-800'
                            : 'border-slate-200 text-slate-700'
                        }`}
                      >
                        <User className="w-5 h-5 text-brand-500 mb-2" />
                        My Child
                      </button>
                      <button
                        type="button"
                        onClick={() => setAudience('ME OR SOMEONE ELSE')}
                        className={`p-4 rounded-2xl border-2 font-bold text-sm text-left transition-all ${
                          audience === 'ME OR SOMEONE ELSE'
                            ? 'border-brand-500 bg-brand-50/60 text-brand-800'
                            : 'border-slate-200 text-slate-700'
                        }`}
                      >
                        <Sparkles className="w-5 h-5 text-brand-500 mb-2" />
                        Me / Adult
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Current Grade or Level
                    </label>
                    <select
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full p-3.5 border border-slate-200 rounded-xl text-sm font-medium"
                    >
                      <option>Elementary (2nd-5th Grade)</option>
                      <option>Middle School (6th-8th Grade)</option>
                      <option>High School (9th-12th)</option>
                      <option>College / University</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Continue to Step 2</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Which subject needs focus?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {['Math', 'Algebra', 'Calculus', 'SAT Prep', 'ACT Prep', 'Chemistry', 'Physics', 'Biology', 'ELA'].map(
                        (s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setSubject(s)}
                            className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                              subject === s
                                ? 'border-brand-500 bg-brand-50 text-brand-700'
                                : 'border-slate-200 text-slate-700'
                            }`}
                          >
                            {s}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Primary Academic Challenge
                    </label>
                    <select
                      value={challenge}
                      onChange={(e) => setChallenge(e.target.value)}
                      className="w-full p-3.5 border border-slate-200 rounded-xl text-sm font-medium"
                    >
                      <option>Homework & test preparation</option>
                      <option>Falling behind in class concepts</option>
                      <option>Exam prep (SAT/ACT/AP)</option>
                      <option>Lacks confidence or study habits</option>
                      <option>Advanced enrichment / get ahead</option>
                    </select>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-5 py-3.5 border border-slate-200 rounded-xl font-semibold text-sm text-slate-600"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="flex-1 py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <span>See Matched Tutors</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="p-4 bg-brand-50 rounded-2xl border border-brand-100 flex items-center gap-3">
                    <Award className="w-6 h-6 text-brand-600 shrink-0" />
                    <div className="text-xs text-brand-900">
                      <strong>Great news!</strong> We have 4 Ivy-League certified tutors available for <strong>{subject}</strong> ({grade}).
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Parent / Guardian Name
                    </label>
                    <input
                      type="text"
                      required
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full p-3 border border-slate-200 rounded-xl text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full p-3 border border-slate-200 rounded-xl text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Phone Number (for 5-min match consultation)
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 000-0000"
                      className="w-full p-3 border border-slate-200 rounded-xl text-sm"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-3 border border-slate-200 rounded-xl font-semibold text-sm text-slate-600"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg transition-all"
                    >
                      Unlock Tutor Matches
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900">Matches Confirmed!</h2>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                Thank you, <strong>{parentName}</strong>. Our academic team is reviewing your requirements for <strong>{subject}</strong>. An advisor will contact you at <strong>{phone}</strong> shortly to book your risk-free trial.
              </p>
              <div className="pt-4">
                <Link
                  to="/"
                  className="inline-block px-8 py-3.5 bg-brand-500 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-md"
                >
                  Return to Homepage
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
