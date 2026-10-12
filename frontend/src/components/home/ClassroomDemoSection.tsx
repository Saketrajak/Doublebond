import React from 'react';
import { 
  Video, 
  Mic, 
  FileText, 
  PenTool, 
  Type, 
  Maximize2, 
  Share2, 
  CheckCircle2, 
  Sparkles,
  BarChart3,
  Calendar,
  Layers
} from 'lucide-react';

export const ClassroomDemoSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Interactive Whiteboard & Classroom Mockup */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl bg-[#230242] p-2 sm:p-4 shadow-2xl border border-[#43067a]/60">
              {/* Classroom App Bar */}
              <div className="bg-[#31035c]/95 rounded-2xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-purple-200 mb-3 border border-[#43067a]/50">
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
                  <span className="px-2.5 py-1 bg-[#a64ffc]/20 text-[#a64ffc] rounded-lg font-medium flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" />
                    Document
                  </span>
                  <span className="px-2.5 py-1 bg-purple-950/40 rounded-lg hover:bg-purple-900/50 cursor-pointer">
                    Maths
                  </span>
                  <span className="px-2.5 py-1 bg-purple-950/40 rounded-lg hover:bg-purple-900/50 cursor-pointer">
                    Lesson
                  </span>
                  <span className="px-2.5 py-1 bg-purple-950/40 rounded-lg hover:bg-purple-900/50 cursor-pointer">
                    Video snapshot
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-purple-300">82%</span>
                  <button className="px-3 py-1 bg-brand-accent hover:bg-purple-600 text-white rounded-lg font-bold text-[11px] uppercase tracking-wider shadow-[0_0_12px_rgba(166,79,252,0.4)] transition-colors">
                    Invite
                  </button>
                </div>
              </div>

              {/* Whiteboard Canvas */}
              <div className="relative bg-white rounded-2xl p-6 min-h-[340px] sm:min-h-[420px] flex flex-col justify-between overflow-hidden shadow-inner border border-slate-100">
                {/* Whiteboard Toolbar Icons */}
                <div className="absolute top-4 left-4 bg-slate-100/90 backdrop-blur rounded-xl p-1.5 flex gap-2 border border-slate-200 shadow-sm z-10">
                  <div className="p-1.5 rounded-lg bg-brand-500 text-white"><PenTool className="w-4 h-4" /></div>
                  <div className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-200"><Type className="w-4 h-4" /></div>
                  <div className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-200"><Layers className="w-4 h-4" /></div>
                </div>

                {/* Mathematical Graph Drawing */}
                <div className="my-auto py-8">
                  <div className="relative max-w-sm mx-auto">
                    {/* SVG axes and curve */}
                    <svg viewBox="0 0 300 180" className="w-full h-auto">
                      {/* Grid lines */}
                      <path d="M 30 150 L 280 150 M 30 20 L 30 150" stroke="#cbd5e1" strokeWidth="2" fill="none" />
                      {/* Parabola */}
                      <path
                        d="M 40 140 Q 150 20 260 140"
                        stroke="#ef4444"
                        strokeWidth="3.5"
                        fill="none"
                      />
                      {/* Coordinates */}
                      <circle cx="150" cy="80" r="5" fill="#a64ffc" />
                      <text x="160" y="75" fontSize="12" fill="#1e293b" fontWeight="600">f(x) = ax² + bx + c</text>
                      <text x="270" y="145" fontSize="11" fill="#64748b">x</text>
                      <text x="22" y="30" fontSize="11" fill="#64748b">y</text>
                    </svg>
                  </div>
                </div>

                {/* Floating Video Inset Tiles */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
                  {/* Tutor Video */}
                  <div className="relative w-28 sm:w-36 h-20 sm:h-24 rounded-xl overflow-hidden border-2 border-brand-accent shadow-lg shadow-brand-accent/20 bg-slate-800">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
                      alt="Jordan Taschner - Tutor"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1 left-1.5 bg-black/70 px-1.5 py-0.5 rounded text-[10px] text-white font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Jordan T. (Tutor)
                    </div>
                  </div>

                  {/* Student Video */}
                  <div className="relative w-28 sm:w-36 h-20 sm:h-24 rounded-xl overflow-hidden border-2 border-slate-700 shadow-lg bg-slate-800">
                    <img
                      src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80"
                      alt="Brian - Student"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1 left-1.5 bg-black/70 px-1.5 py-0.5 rounded text-[10px] text-white font-medium">
                      Brian (Student)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Continuous Feedback Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold uppercase tracking-wider text-brand-deep">
              <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
              <span>Proprietary Learning Technology</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Interactive classroom with <br />
              <span className="text-brand-accent drop-shadow-[0_0_15px_rgba(166,79,252,0.3)]">continuous feedback</span>
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              Every tutoring session takes place inside our purpose-built virtual environment designed specifically for deep STEM & humanities comprehension.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Real-Time Interactive Whiteboard</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Dual-pen collaborative canvas supporting LaTeX equations, geometric graphing, and uploaded homework sheets.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 shrink-0 mt-0.5">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Session Mastery Reports</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Parents receive automated recaps after every session summarizing solved problems, homework assigned, and next steps.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 shrink-0 mt-0.5">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Recorded Sessions For Exam Revision</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Full video replays remain archived in the student dashboard for revision before school midterms and finals.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
