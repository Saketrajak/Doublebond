import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  Grid, 
  TrendingUp, 
  Infinity as InfinityIcon, 
  Compass, 
  Triangle, 
  GraduationCap, 
  Award, 
  FlaskConical, 
  Atom, 
  Shapes,
  ArrowRight
} from 'lucide-react';
import type { SubjectItem } from '../../types';

interface SubjectHelpGridProps {
  subjects: SubjectItem[];
  onSelectSubject?: (slug: string) => void;
}

const SUBJECT_ICONS: Record<string, React.ReactNode> = {
  math: <Calculator className="w-8 h-8 text-brand-500" strokeWidth={1.5} />,
  algebra: <Grid className="w-8 h-8 text-brand-500" strokeWidth={1.5} />,
  'algebra-2': <TrendingUp className="w-8 h-8 text-brand-500" strokeWidth={1.5} />,
  calculus: <InfinityIcon className="w-8 h-8 text-brand-500" strokeWidth={1.5} />,
  geometry: <Compass className="w-8 h-8 text-brand-500" strokeWidth={1.5} />,
  trigonometry: <Triangle className="w-8 h-8 text-brand-500" strokeWidth={1.5} />,
  'sat-tutors': <GraduationCap className="w-8 h-8 text-brand-500" strokeWidth={1.5} />,
  act: <Award className="w-8 h-8 text-brand-500" strokeWidth={1.5} />,
  chemistry: <FlaskConical className="w-8 h-8 text-brand-500" strokeWidth={1.5} />,
  physics: <Atom className="w-8 h-8 text-brand-500" strokeWidth={1.5} />,
  'pre-calculus': <Shapes className="w-8 h-8 text-brand-500" strokeWidth={1.5} />
};

export const SubjectHelpGrid: React.FC<SubjectHelpGridProps> = ({ subjects, onSelectSubject }) => {
  return (
    <section className="py-20 md:py-28 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            What subject does your child need help with?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
            With advanced degrees in mathematics and science from top schools around the country including the Ivy League, our team of accomplished tutors is ready to help your child today with any of these subjects, from math homework to test prep. Give your child the gift of success today and help them reach their full potential with our online tutoring services.
          </p>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {subjects.map((item) => (
            <Link
              key={item.id}
              to={`/subjects/${item.slug}`}
              onClick={() => onSelectSubject?.(item.slug)}
              className="bg-white rounded-3xl p-7 border border-slate-100 hover:border-brand-300 hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Minimalist Icon Container */}
                <div className="w-16 h-16 rounded-2xl bg-brand-50/60 flex items-center justify-center mb-6 group-hover:bg-brand-500 group-hover:text-white transition-colors duration-300">
                  <div className="group-hover:text-white group-hover:[&>svg]:text-white transition-colors">
                    {SUBJECT_ICONS[item.slug] || <Calculator className="w-8 h-8 text-brand-500" />}
                  </div>
                </div>

                {/* Subject Title */}
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors mb-2">
                  {item.name}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              {/* Card CTA Link */}
              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center gap-1.5 text-xs font-bold text-brand-600 uppercase tracking-wider group-hover:gap-2.5 transition-all">
                <span>Explore Tutors</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
