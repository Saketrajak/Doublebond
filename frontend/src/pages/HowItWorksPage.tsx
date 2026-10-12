import React from 'react';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { BenefitsSection } from '../components/home/BenefitsSection';
import { FAQSection } from '../components/home/FAQSection';
import { FinalCTASection } from '../components/home/FinalCTASection';

const STEPS = [
  { stepNumber: 1, title: 'Answer a short assessment', description: 'Answer a short, 1-minute assessment to let us know about your child\'s tutoring needs and learning goals.' },
  { stepNumber: 2, title: '5-minute match consultation', description: 'We\'ll have a 5-minute call and schedule your first session within the next 72 hours.' },
  { stepNumber: 3, title: 'Experience 1-on-1 tutoring', description: 'Experience the quality of our online tutoring services to ensure we are the right fit for your child\'s needs.' },
  { stepNumber: 4, title: 'See guaranteed progress', description: 'See measurable academic progress in as little as 2 weeks for guaranteed better grades and confidence.' }
];

const BENEFITS = [
  {
    title: 'One-on-One Assistance',
    description: 'One of the best things about hiring a private online tutor is that you receive lesson plans tailored to a student\'s unique needs and goals. A private tutor bypasses the content you already know and focuses on areas where extra help is required.'
  },
  {
    title: 'Improved Confidence',
    description: 'Confidence and academic success go hand in hand. The more sure of themselves a student is in a subject, the more likely they will think harder on test questions and view challenging assignments positively.'
  },
  {
    title: 'Better Habits',
    description: 'If a student is struggling with a school subject or preparing for a standardized test, poor study habits are often the root cause. Private tutors help students build organizational skills and time management.'
  },
  {
    title: 'Match Your Pace',
    description: 'Traditional classrooms must adhere to fixed curricula timelines. Our tutors dedicate as much time as necessary to complex concepts, ensuring fundamental mastery before advancing.'
  }
];

const FAQS = [
  {
    id: '1',
    question: 'How does Doublebond select and vet its tutors?',
    answer: 'We accept fewer than 3% of tutor applicants. Every tutor undergoes multi-stage technical screening, background verification, credential authentication, and pedagogical assessments.'
  },
  {
    id: '2',
    question: 'How quickly can my child start tutoring?',
    answer: 'After completing our 1-minute assessment, our educational directors will conduct a brief 5-minute matching consultation and match your child. Your first session can be scheduled within 72 hours.'
  },
  {
    id: '3',
    question: 'What happens if the tutor is not a good fit?',
    answer: 'We provide our 100% Tutor Match Guarantee. If for any reason you feel your tutor isn\'t the right fit, we will re-match you immediately at no extra cost.'
  }
];

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="py-14 bg-slate-50 border-b border-slate-100 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900">How Tutoring Works With Doublebond</h1>
        <p className="text-slate-600 mt-2 max-w-xl mx-auto text-sm sm:text-base">
          From your 1-minute assessment to your student's first 1-on-1 virtual lesson in 72 hours.
        </p>
      </div>
      <HowItWorksSection steps={STEPS} onStartAssessment={() => window.location.href = '/find-a-tutor'} />
      <BenefitsSection headline="Why 1-to-1 Online Tutoring Works" items={BENEFITS} />
      <FAQSection faqs={FAQS} />
      <FinalCTASection onStartAssessment={() => window.location.href = '/find-a-tutor'} />
    </div>
  );
};
