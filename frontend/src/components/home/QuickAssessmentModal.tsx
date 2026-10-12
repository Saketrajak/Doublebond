import React, { useState } from 'react';
import { X, ArrowRight, CheckCircle2, Sparkles, BookOpen, User, Calendar, Phone, Mail, Award } from 'lucide-react';

interface QuickAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAudience?: 'MY CHILD' | 'ME OR SOMEONE ELSE';
}

export const QuickAssessmentModal: React.FC<QuickAssessmentModalProps> = ({
  isOpen,
  onClose,
  initialAudience = 'MY CHILD'
}) => {
  const [step, setStep] = useState(1);
  const [audience, setAudience] = useState<'MY CHILD' | 'ME OR SOMEONE ELSE'>(initialAudience);
  const [grade, setGrade] = useState('');
  const [subject, setSubject] = useState('');
  const [goal, setGoal] = useState('');
  const [parentName, setParentName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
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
          notes: `Goal: ${goal}`
        })
      });
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setIsSuccess(true); // Still proceed for demo UX
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 overflow-hidden animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            {/* Header / Step Indicator */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-600 font-bold text-xs">
                  Step {step} of 3
                </span>
                <span className="text-xs text-slate-500 font-medium">1-Minute Assessment</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-brand-500 h-full transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>

            {/* Step 1: Who & Grade */}
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Who needs tutoring?</h3>
                  <p className="text-sm text-slate-500 mt-1">Select the student for customized 1-to-1 matching.</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAudience('MY CHILD')}
                    className={`p-4 rounded-2xl border-2 font-semibold text-sm transition-all text-left flex flex-col justify-between ${
                      audience === 'MY CHILD'
                        ? 'border-brand-500 bg-brand-50/50 text-brand-900 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <User className={`w-5 h-5 mb-2 ${audience === 'MY CHILD' ? 'text-brand-500' : 'text-slate-400'}`} />
                    <span>My Child</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAudience('ME OR SOMEONE ELSE')}
                    className={`p-4 rounded-2xl border-2 font-semibold text-sm transition-all text-left flex flex-col justify-between ${
                      audience === 'ME OR SOMEONE ELSE'
                        ? 'border-brand-500 bg-brand-50/50 text-brand-900 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <Sparkles className={`w-5 h-5 mb-2 ${audience === 'ME OR SOMEONE ELSE' ? 'text-brand-500' : 'text-slate-400'}`} />
                    <span>Me or Someone Else</span>
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                    Current Grade Level
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-medium text-slate-800"
                  >
                    <option value="">Select Grade</option>
                    <option value="Elementary (2nd-5th Grade)">Elementary (2nd - 5th Grade)</option>
                    <option value="Middle School (6th-8th Grade)">Middle School (6th - 8th Grade)</option>
                    <option value="9th Grade (Freshman)">9th Grade (Freshman)</option>
                    <option value="10th Grade (Sophomore)">10th Grade (Sophomore)</option>
                    <option value="11th Grade (Junior)">11th Grade (Junior)</option>
                    <option value="12th Grade (Senior)">12th Grade (Senior)</option>
                    <option value="College / Adult">College / Adult Learner</option>
                  </select>
                </div>

                <button
                  type="button"
                  disabled={!grade}
                  onClick={() => setStep(2)}
                  className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Step 2: Subject & Goal */}
            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">What subject is the priority?</h3>
                  <p className="text-sm text-slate-500 mt-1">We will match a specialized Ivy League or top-tier educator.</p>
                </div>

                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                  {['Math / Algebra', 'Geometry / Trig', 'Calculus', 'SAT / ACT Prep', 'Chemistry', 'Physics', 'Biology', 'ELA / English', 'Spanish'].map((subj) => (
                    <button
                      key={subj}
                      type="button"
                      onClick={() => setSubject(subj)}
                      className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                        subject === subj
                          ? 'border-brand-500 bg-brand-50 text-brand-700 font-bold'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      {subj}
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                    Primary Goal
                  </label>
                  <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-medium text-slate-800"
                  >
                    <option value="">Select primary goal</option>
                    <option value="Raise grades & test scores">Raise grades & test scores</option>
                    <option value="Prepare for upcoming SAT/ACT">Prepare for upcoming SAT/ACT</option>
                    <option value="Build confidence & study habits">Build confidence & study habits</option>
                    <option value="Get ahead for advanced placement (AP)">Get ahead for advanced placement (AP)</option>
                    <option value="Overcome learning challenges">Overcome learning challenges</option>
                  </select>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-3 border border-slate-200 text-slate-600 font-semibold text-sm rounded-xl hover:bg-slate-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={!subject || !goal}
                    onClick={() => setStep(3)}
                    className="flex-1 py-3 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>View Matches</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Contact & Lead Capture */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Unlock Your Tutor Matches</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Enter your contact details so our Academic Director can connect you with top matching tutors.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Parent / Guardian Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="sarah@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Phone Number (for 5-min match consultation)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                    />
                  </div>
                </div>

                <div className="p-3 bg-brand-50 rounded-xl flex items-start gap-2.5 text-xs text-brand-900">
                  <Award className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>100% Match Guarantee:</strong> If your first session isn't the perfect fit, we will re-match you for free.
                  </span>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-3 border border-slate-200 text-slate-600 font-semibold text-sm rounded-xl hover:bg-slate-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'Matching...' : 'Get Matched Now'}
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Matches Found!</h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              Thank you, <strong>{parentName}</strong>! We've identified 3 top-tier verified tutors for <strong>{subject}</strong>.
              Our academic coordinator will call you at <strong>{phone}</strong> within 5 minutes to confirm your trial session.
            </p>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-left space-y-2">
              <div className="text-xs font-bold text-slate-500 uppercase">Recommended Match</div>
              <div className="text-sm font-bold text-slate-900">Chelsea M. — Duke & Stanford Graduate</div>
              <div className="text-xs text-slate-600">Specialist in {subject} • 5.0 ★ (142 reviews)</div>
            </div>
            <button
              onClick={handleReset}
              className="w-full py-3 bg-brand-500 text-white font-bold text-sm rounded-xl shadow-md"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
