import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#31035c] text-purple-100/80 pt-16 pb-12 border-t border-[#43067a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#43067a]/80">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[#a64ffc] flex items-center justify-center text-white font-extrabold text-sm shadow-[0_0_15px_rgba(166,79,252,0.45)]">
                DB
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">Doublebond</span>
            </div>
            <p className="text-sm text-purple-200/70 max-w-sm leading-relaxed">
              Empowering students to unlock their highest academic potential through personalized, private 1-to-1 tutoring with world-class educators from top universities.
            </p>
            <div className="pt-2 flex items-center gap-4">
              <a
                href="tel:8884052553"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#a64ffc] hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[#a64ffc]" />
                888.405.2553
              </a>
              <span className="text-purple-400/40">|</span>
              <a
                href="mailto:contact@doublebond.com"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#a64ffc] hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-[#a64ffc]" />
                contact@doublebond.com
              </a>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#230242] border border-[#43067a] text-xs text-purple-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Tutor Match Guarantee</span>
            </div>
          </div>

          {/* Subjects */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Math & Science</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/subjects/math" className="hover:text-[#a64ffc] transition-colors">Math Tutoring</Link></li>
              <li><Link to="/subjects/algebra" className="hover:text-[#a64ffc] transition-colors">Algebra & Algebra 2</Link></li>
              <li><Link to="/subjects/calculus" className="hover:text-[#a64ffc] transition-colors">Calculus & Pre-Calc</Link></li>
              <li><Link to="/subjects/geometry" className="hover:text-[#a64ffc] transition-colors">Geometry & Trig</Link></li>
              <li><Link to="/subjects/chemistry" className="hover:text-[#a64ffc] transition-colors">Chemistry Tutoring</Link></li>
              <li><Link to="/subjects/physics" className="hover:text-[#a64ffc] transition-colors">Physics Tutoring</Link></li>
              <li><Link to="/subjects/biology" className="hover:text-[#a64ffc] transition-colors">Biology Tutoring</Link></li>
            </ul>
          </div>

          {/* Test Prep & Grades */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Test Prep & Grades</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/subjects/sat-prep" className="hover:text-[#a64ffc] transition-colors">SAT Tutoring</Link></li>
              <li><Link to="/subjects/act-prep" className="hover:text-[#a64ffc] transition-colors">ACT Tutoring</Link></li>
              <li><Link to="/grades/elementary" className="hover:text-[#a64ffc] transition-colors">Elementary Math</Link></li>
              <li><Link to="/grades/middle-school" className="hover:text-[#a64ffc] transition-colors">Middle School Tutoring</Link></li>
              <li><Link to="/grades/high-school" className="hover:text-[#a64ffc] transition-colors">High School Tutoring</Link></li>
              <li><Link to="/subjects/ela" className="hover:text-[#a64ffc] transition-colors">ELA & English</Link></li>
              <li><Link to="/subjects/spanish" className="hover:text-[#a64ffc] transition-colors">Spanish Tutoring</Link></li>
            </ul>
          </div>

          {/* Company & Resources */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-[#a64ffc] transition-colors">About Us</Link></li>
              <li><Link to="/how-it-works" className="hover:text-[#a64ffc] transition-colors">How Tutoring Works</Link></li>
              <li><Link to="/pricing" className="hover:text-[#a64ffc] transition-colors">Pricing & Packages</Link></li>
              <li><Link to="/success-stories" className="hover:text-[#a64ffc] transition-colors">Success Stories</Link></li>
              <li><Link to="/become-a-tutor" className="hover:text-[#a64ffc] transition-colors">Become a Tutor</Link></li>
              <li><Link to="/resources" className="hover:text-[#a64ffc] transition-colors">Learning Resources</Link></li>
              <li><Link to="/contact" className="hover:text-[#a64ffc] transition-colors">Contact Support</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-purple-300/60 gap-4">
          <p>© {new Date().getFullYear()} Doublebond Education Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-[#a64ffc] transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#a64ffc] transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-[#a64ffc] transition-colors">Cookie Preferences</Link>
            <Link to="/safeguarding" className="hover:text-[#a64ffc] transition-colors">Parental Safeguarding</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
