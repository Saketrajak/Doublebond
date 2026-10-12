import React, { useState, useEffect } from 'react';
import { SubjectHelpGrid } from '../components/home/SubjectHelpGrid';
import { AgeGroupsSection } from '../components/home/AgeGroupsSection';
import type { SubjectItem } from '../types';

const DEFAULT_SUBJECTS: SubjectItem[] = [
  { id: 'math', name: 'Math', slug: 'math', icon: 'Calculator', description: 'Builds a strong mathematical foundation and prepares for academic success.' },
  { id: 'algebra', name: 'Algebra', slug: 'algebra', icon: 'Grid', description: 'Master the basics of Algebra and set yourself up for future math success.' },
  { id: 'algebra-2', name: 'Algebra 2', slug: 'algebra-2', icon: 'TrendingUp', description: 'Covers advanced topics like quadratic functions, rational expressions, and logarithms.' },
  { id: 'calculus', name: 'Calculus', slug: 'calculus', icon: 'Infinity', description: 'Introduces differential equations and integrals, which have applications in physical and data science.' },
  { id: 'geometry', name: 'Geometry', slug: 'geometry', icon: 'Compass', description: 'Includes discussions of mathematical proofs along with angles and 2D and 3D shapes.' },
  { id: 'trigonometry', name: 'Trigonometry', slug: 'trigonometry', icon: 'Triangle', description: 'Features advanced topics like the unit circle and complex numbers, which feature heavily in calculus.' },
  { id: 'sat-tutors', name: 'SAT Tutors', slug: 'sat-tutors', icon: 'GraduationCap', description: 'Focused on both math portions (calculator and no-calculator) of the College Board SAT exam.' },
  { id: 'act', name: 'ACT', slug: 'act', icon: 'Award', description: 'Covers mathematics concepts included in the ACT, from pre-algebra to trigonometry.' },
  { id: 'chemistry', name: 'Chemistry', slug: 'chemistry', icon: 'FlaskConical', description: 'Understand the composition, properties, and reactions of matter at the molecular level.' },
  { id: 'physics', name: 'Physics', slug: 'physics', icon: 'Atom', description: 'Learn the laws of nature and their applications in the physical world.' },
  { id: 'pre-calculus', name: 'Pre-Calculus', slug: 'pre-calculus', icon: 'Shapes', description: 'An introduction to fundamental calculus topics like complex numbers, trigonometric identities, and exponential functions.' }
];

const DEFAULT_GRADES = [
  { label: '5th Grade Math Tutors', slug: '5th-grade-math' },
  { label: '6th Grade Math Tutors', slug: '6th-grade-math' },
  { label: '7th Grade Math Tutors', slug: '7th-grade-math' },
  { label: '8th Grade Math Tutors', slug: '8th-grade-math' },
  { label: 'Elementary Math Tutors', slug: 'elementary-math' },
  { label: 'High School Math Tutors', slug: 'high-school-math' }
];

export const SubjectsPage: React.FC = () => {
  const [subjects, setSubjects] = useState<SubjectItem[]>(DEFAULT_SUBJECTS);
  const [grades, setGrades] = useState(DEFAULT_GRADES);

  useEffect(() => {
    fetch('/api/subjects')
      .then(res => res.json())
      .then(data => {
        if (data.all) setSubjects(data.all);
        if (data.grades) setGrades(data.grades);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="py-14 bg-slate-50 border-b border-slate-100 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900">Explore Subjects & Curricula</h1>
        <p className="text-slate-600 mt-2 max-w-xl mx-auto text-sm sm:text-base">
          Personalized 1-to-1 instruction across Mathematics, Sciences, ELA, and College Board Test Prep.
        </p>
      </div>
      <SubjectHelpGrid subjects={subjects} />
      <AgeGroupsSection gradeLevels={grades} />
    </div>
  );
};
