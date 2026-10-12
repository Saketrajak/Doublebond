import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck, Award, GraduationCap, CheckCircle } from 'lucide-react';
import type { TutorItem } from '../types';

export const TutorsPage: React.FC = () => {
  const [tutors, setTutors] = useState<TutorItem[]>([]);
  const [selectedSubject, setSelectedSubject] = useState('All');

  useEffect(() => {
    fetch('/api/tutors')
      .then(res => res.json())
      .then(data => setTutors(data.tutors || []))
      .catch(() => {
        setTutors([
          {
            id: 'tut-1',
            name: 'Chelsea M.',
            headline: 'Duke University M.S. & Stanford B.S. in Applied Mathematics',
            education: 'Stanford & Duke Graduate',
            rating: 5.0,
            reviewsCount: 142,
            hourlyRate: 75,
            subjects: ['Calculus', 'Algebra 2', 'SAT Math', 'Trigonometry'],
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
            bio: 'Dedicated mathematics mentor with 8+ years coaching students to Ivy League admissions and top percentile SAT/ACT scores.',
            verified: true
          },
          {
            id: 'tut-2',
            name: 'David K.',
            headline: 'MIT Physics & Chemistry Specialist',
            education: 'Massachusetts Institute of Technology',
            rating: 4.98,
            reviewsCount: 198,
            hourlyRate: 85,
            subjects: ['Physics', 'AP Chemistry', 'Calculus', 'ACT Science'],
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
            bio: 'Former university teaching fellow passionate about transforming intimidating STEM concepts into intuitive, engaging eureka moments.',
            verified: true
          },
          {
            id: 'tut-3',
            name: 'Anish P.',
            headline: 'Columbia University B.A. in English & Quantitative Analytics',
            education: 'Columbia University',
            rating: 5.0,
            reviewsCount: 167,
            hourlyRate: 70,
            subjects: ['ELA', 'SAT Reading/Writing', 'Algebra', 'Biology'],
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
            bio: 'Holistic tutor focusing on analytical reasoning, confidence building, and personalized study habits.',
            verified: true
          }
        ]);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="px-3 py-1 rounded-full bg-brand-50 text-brand-600 font-bold text-xs uppercase tracking-wider">
            Verified Educators
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Our Elite 1-to-1 Online Tutors
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            Every tutor on Doublebond is in the top 3% of applicants, vetted with background checks, credential audits, and interactive teaching trials.
          </p>
        </div>

        {/* Tutors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutors.map((tutor) => (
            <div
              key={tutor.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={tutor.avatar}
                    alt={tutor.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-100"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-lg text-slate-900">{tutor.name}</h3>
                      {tutor.verified && (
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      )}
                    </div>
                    <div className="text-xs font-semibold text-brand-600">{tutor.education}</div>
                    <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mt-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{tutor.rating}</span>
                      <span className="text-slate-400 font-normal">({tutor.reviewsCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4 font-normal">
                  {tutor.bio}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {tutor.subjects.map(s => (
                    <span key={s} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-semibold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xl font-extrabold text-slate-900">${tutor.hourlyRate}</span>
                  <span className="text-xs text-slate-500"> / hr</span>
                </div>
                <a
                  href="/find-a-tutor"
                  className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm transition-all"
                >
                  Book Session
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
