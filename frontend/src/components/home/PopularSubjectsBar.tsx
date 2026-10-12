import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  BookOpen, 
  GraduationCap, 
  Award, 
  FlaskConical, 
  Atom, 
  Dna, 
  Languages, 
  ChevronRight 
} from 'lucide-react';
import type { SubjectItem } from '../../types';

interface PopularSubjectsBarProps {
  subjects: SubjectItem[];
  onSelectSubject?: (slug: string) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Calculator: <Calculator className="w-4 h-4 text-blue-600" />,
  BookOpen: <BookOpen className="w-4 h-4 text-emerald-600" />,
  GraduationCap: <GraduationCap className="w-4 h-4 text-amber-600" />,
  Award: <Award className="w-4 h-4 text-indigo-600" />,
  FlaskConical: <FlaskConical className="w-4 h-4 text-purple-600" />,
  Atom: <Atom className="w-4 h-4 text-sky-600" />,
  Dna: <Dna className="w-4 h-4 text-teal-600" />,
  Languages: <Languages className="w-4 h-4 text-rose-600" />
};

export const PopularSubjectsBar: React.FC<PopularSubjectsBarProps> = ({ subjects, onSelectSubject }) => {
  return (
    <section className="py-8 bg-slate-50/70 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Popular subjects
          </h2>
        </div>

        {/* Scrollable pill container */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {subjects.map((subj) => (
            <Link
              key={subj.id}
              to={`/subjects/${subj.slug}`}
              onClick={() => onSelectSubject?.(subj.slug)}
              className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-white border border-slate-200/90 rounded-xl text-slate-800 font-semibold text-xs sm:text-sm whitespace-nowrap hover:border-brand-400 hover:shadow-sm hover:text-brand-600 transition-all shrink-0 group"
            >
              <span className="p-1 rounded-md bg-slate-50 group-hover:bg-brand-50 transition-colors">
                {ICON_MAP[subj.icon] || <Calculator className="w-4 h-4 text-brand-500" />}
              </span>
              <span>{subj.name}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-500 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
