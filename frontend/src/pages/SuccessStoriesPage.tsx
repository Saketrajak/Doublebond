import React from 'react';
import { ReviewsSection } from '../components/home/ReviewsSection';
import { StudentStoriesSection } from '../components/home/StudentStoriesSection';
import { StatsSection } from '../components/home/StatsSection';
import { FinalCTASection } from '../components/home/FinalCTASection';

const REVIEWS = [
  { id: '1', author: 'Aubrey S.', role: 'Parent', headline: 'Amazing experience!!!!', quote: 'Our tutor was incredibly patient and broke down difficult concepts so effortlessly. My daughter went from struggling to scoring 96%!', rating: 5, date: '10/1/2026' },
  { id: '2', author: 'G.S.', role: 'Parent', headline: 'David was really good', quote: 'David was exceptional. He connected with my son immediately and made learning enjoyable rather than a chore.', rating: 5, date: '8/24/2026' },
  { id: '3', author: 'M.A.', role: 'Parent', headline: 'The website is easy to use', quote: 'From my first contact with Doublebond through the matching consultation, the experience has been seamless.', rating: 5, date: '8/12/2026' },
  { id: '4', author: 'Olivia I.', role: 'Student', headline: 'Anish was an incredible tutor', quote: 'With his guidance, I successfully mastered calculus and improved my SAT math score by 140 points.', rating: 5, date: '7/31/2026' }
];

const STORIES = [
  {
    id: '1',
    studentName: 'Daniel C',
    gradeRole: 'Duke University Freshman',
    headline: 'Chelsea from Doublebond helped me to get a full ride to Duke University.',
    quote: 'Chelsea from Doublebond was the perfect match for me. She customized the training so that it would push me hard - but not too hard where I would get frustrated. I worked with Chelsea for years because she took a genuine interest in me and my future.',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: '2',
    studentName: 'Katherine T',
    gradeRole: 'High School Senior',
    headline: 'Transformed my confidence and earned an A in AP Chemistry.',
    quote: 'Before Doublebond, I dreaded chemistry tests. My tutor broke down complex stoichiometry equations with visual whiteboard diagrams and interactive quizzes.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: '3',
    studentName: 'Tania C',
    gradeRole: 'High School Junior',
    headline: 'Jumped two full letter grades in under 3 weeks.',
    quote: 'The personalized 1-on-1 pace was exactly what I needed. Whenever I hesitated on a geometry proof, my tutor paused and guided me through the logic.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80'
  }
];

const STATS = {
  studentsServed: 10000,
  studentsServedLabel: '10,000+',
  studentsServedDesc: 'STUDENTS SERVED',
  hoursTutored: 100000,
  hoursTutoredLabel: '100,000+',
  hoursTutoredDesc: 'HOURS TUTORED',
  satisfactionRate: 99,
  satisfactionRateLabel: '99%',
  satisfactionRateDesc: 'SATISFACTION'
};

export const SuccessStoriesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="py-14 bg-slate-50 border-b border-slate-100 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900">Student & Parent Success Stories</h1>
        <p className="text-slate-600 mt-2 max-w-xl mx-auto text-sm sm:text-base">
          Read real reviews from over 10,000 families whose academic journeys were transformed.
        </p>
      </div>
      <StatsSection stats={STATS} />
      <StudentStoriesSection headline="Real Results from Real Students" stories={STORIES} />
      <ReviewsSection
        overallRating="5/5"
        reviewCountText="Based on 1,027 reviews subject to moderation."
        badgeText="Verified Reviews"
        reviews={REVIEWS}
      />
      <FinalCTASection onStartAssessment={() => window.location.href = '/find-a-tutor'} />
    </div>
  );
};
