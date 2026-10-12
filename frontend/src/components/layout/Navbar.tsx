import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, ChevronDown, Menu, X, ArrowRight, Sparkles, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface NavbarProps {
  onOpenAssessment?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAssessment }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { user, logout } = useAuthStore();

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
      {/* Top Banner Bar */}
      <div className="bg-slate-50 border-b border-slate-100 py-1.5 px-4 text-center text-xs sm:text-sm font-medium text-slate-600">
        <span>Get Access to the World's Best Online Tutoring with Doublebond</span>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Navigation Links */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/30 border border-brand-accent/40 group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(166,79,252,0.5)] transition-all flex-shrink-0">
                <span className="font-extrabold text-sm tracking-tight">DB</span>
              </div>
              <img 
                src="/images/doublebond-sketch-wordmark.svg" 
                alt="Doublebond" 
                className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03] drop-shadow-sm select-none" 
              />
            </Link>

            {/* Desktop Nav Items */}
            <nav className="hidden lg:flex items-center space-x-1">
              {/* Subjects Dropdown */}
              <div className="relative group" onMouseLeave={() => setActiveDropdown(null)}>
                <button
                  onClick={() => toggleDropdown('subjects')}
                  onMouseEnter={() => setActiveDropdown('subjects')}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-brand-500 rounded-lg transition-colors"
                >
                  Subjects
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-brand-500 transition-transform group-hover:rotate-180" />
                </button>
                {activeDropdown === 'subjects' && (
                  <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 px-2 mt-1 animate-fadeIn">
                    <Link to="/subjects/math" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-brand-500 rounded-lg font-medium">Math Tutoring</Link>
                    <Link to="/subjects/algebra" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-brand-500 rounded-lg font-medium">Algebra & Algebra 2</Link>
                    <Link to="/subjects/calculus" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-brand-500 rounded-lg font-medium">Calculus</Link>
                    <Link to="/subjects/geometry" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-brand-500 rounded-lg font-medium">Geometry & Trigonometry</Link>
                    <Link to="/subjects/chemistry" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-brand-500 rounded-lg font-medium">Chemistry & Physics</Link>
                    <Link to="/subjects/ela" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-brand-500 rounded-lg font-medium">ELA & Reading</Link>
                    <div className="border-t border-slate-100 my-1"></div>
                    <Link to="/subjects" className="block px-3 py-2 text-xs font-bold text-brand-accent uppercase tracking-wider hover:underline">View All Subjects →</Link>
                  </div>
                )}
              </div>

              {/* Exam Prep Dropdown */}
              <div className="relative group" onMouseLeave={() => setActiveDropdown(null)}>
                <button
                  onClick={() => toggleDropdown('exam')}
                  onMouseEnter={() => setActiveDropdown('exam')}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-brand-500 rounded-lg transition-colors"
                >
                  Exam Prep
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-brand-500 transition-transform group-hover:rotate-180" />
                </button>
                {activeDropdown === 'exam' && (
                  <div className="absolute top-full left-0 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 px-2 mt-1 animate-fadeIn">
                    <Link to="/subjects/sat-prep" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-brand-500 rounded-lg font-medium">SAT Tutoring</Link>
                    <Link to="/subjects/act-prep" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-brand-500 rounded-lg font-medium">ACT Tutoring</Link>
                    <Link to="/subjects/ap-prep" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-brand-500 rounded-lg font-medium">AP Courses Prep</Link>
                  </div>
                )}
              </div>

              {/* Grades Dropdown */}
              <div className="relative group" onMouseLeave={() => setActiveDropdown(null)}>
                <button
                  onClick={() => toggleDropdown('grades')}
                  onMouseEnter={() => setActiveDropdown('grades')}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-brand-500 rounded-lg transition-colors"
                >
                  Grades
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-brand-500 transition-transform group-hover:rotate-180" />
                </button>
                {activeDropdown === 'grades' && (
                  <div className="absolute top-full left-0 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 px-2 mt-1 animate-fadeIn">
                    <Link to="/grades/elementary" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-brand-500 rounded-lg font-medium">Elementary School (2nd-5th)</Link>
                    <Link to="/grades/middle-school" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-brand-500 rounded-lg font-medium">Middle School (6th-8th)</Link>
                    <Link to="/grades/high-school" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-brand-500 rounded-lg font-medium">High School (9th-12th)</Link>
                    <Link to="/grades/college" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-brand-500 rounded-lg font-medium">College & Adult</Link>
                  </div>
                )}
              </div>

              {/* Company Dropdown */}
              <div className="relative group" onMouseLeave={() => setActiveDropdown(null)}>
                <button
                  onClick={() => toggleDropdown('company')}
                  onMouseEnter={() => setActiveDropdown('company')}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-brand-500 rounded-lg transition-colors"
                >
                  Company
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-brand-500 transition-transform group-hover:rotate-180" />
                </button>
                {activeDropdown === 'company' && (
                  <div className="absolute top-full left-0 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 px-2 mt-1 animate-fadeIn">
                    <Link to="/about" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-brand-500 rounded-lg font-medium">About Doublebond</Link>
                    <Link to="/how-it-works" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-brand-500 rounded-lg font-medium">How It Works</Link>
                    <Link to="/pricing" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-brand-500 rounded-lg font-medium">Pricing & Plans</Link>
                    <Link to="/success-stories" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-brand-500 rounded-lg font-medium">Reviews & Results</Link>
                    <Link to="/become-a-tutor" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-brand-500 rounded-lg font-medium">Become a Tutor</Link>
                  </div>
                )}
              </div>

              {/* Learn / Resources */}
              <Link to="/resources" className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-brand-500 rounded-lg transition-colors">
                Learn
              </Link>
            </nav>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Phone Button */}
            <a
              href="tel:8884052553"
              className="flex items-center gap-2 px-4 py-2 border-2 border-brand-500 text-brand-500 font-semibold text-sm rounded-full hover:bg-brand-500 hover:text-white hover:shadow-[0_0_15px_rgba(166,79,252,0.3)] transition-all"
            >
              <Phone className="w-4 h-4 text-brand-500" />
              <span>888.405.2553</span>
            </a>

            {/* Primary CTA: FIND YOUR TUTOR */}
            <button
              onClick={onOpenAssessment}
              className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md shadow-brand-500/30 hover:shadow-[0_0_20px_rgba(166,79,252,0.45)] border border-brand-accent/30 hover:border-brand-accent transition-all hover:-translate-y-0.5"
            >
              FIND YOUR TUTOR
            </button>

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center gap-3">
                <Link to={user.role === 'ADMIN' || user.role === 'STAFF' ? '/admin' : '/dashboard'} className="flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-brand-500">
                  <User className="w-4 h-4" />
                  <span>{user.name.split(' ')[0]}</span>
                </Link>
                <button onClick={logout} className="text-slate-400 hover:text-red-500 transition-colors" title="Log Out">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-sm font-semibold text-brand-500 hover:text-brand-accent hover:underline px-2 py-1 transition-colors"
              >
                Log In
              </Link>
            )}

            {/* Need Help */}
            <Link
              to="/contact"
              className="text-sm font-semibold text-brand-500 hover:text-brand-accent hover:underline px-2 py-1 transition-colors"
            >
              Need Help?
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={onOpenAssessment}
              className="px-3 py-1.5 bg-brand-500 text-white font-bold text-xs uppercase tracking-wider rounded-md shadow-sm"
            >
              Find Tutor
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-brand-500"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          <Link
            to="/subjects"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800"
          >
            Subjects
          </Link>
          <Link
            to="/how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800"
          >
            How It Works
          </Link>
          <Link
            to="/pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800"
          >
            Pricing
          </Link>
          <Link
            to="/success-stories"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800"
          >
            Reviews & Results
          </Link>
          <Link
            to="/become-a-tutor"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800"
          >
            Become a Tutor
          </Link>
          <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
            <a
              href="tel:8884052553"
              className="flex items-center justify-center gap-2 py-2.5 border-2 border-brand-500 text-brand-500 font-bold rounded-xl"
            >
              <Phone className="w-4 h-4" />
              <span>888.405.2553</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAssessment?.();
              }}
              className="w-full py-3 bg-brand-500 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-md text-center"
            >
              FIND YOUR TUTOR
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
