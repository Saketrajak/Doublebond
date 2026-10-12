import React, { useState, useEffect } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { PopularSubjectsBar } from '../components/home/PopularSubjectsBar';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { SubjectHelpGrid } from '../components/home/SubjectHelpGrid';
import { AgeGroupsSection } from '../components/home/AgeGroupsSection';
import { StatsSection } from '../components/home/StatsSection';
import { ReviewsSection } from '../components/home/ReviewsSection';
import { StudentStoriesSection } from '../components/home/StudentStoriesSection';
import { ClassroomDemoSection } from '../components/home/ClassroomDemoSection';
import { TopLocationsSection } from '../components/home/TopLocationsSection';
import { BenefitsSection } from '../components/home/BenefitsSection';
import { FAQSection } from '../components/home/FAQSection';
import { FinalCTASection } from '../components/home/FinalCTASection';
import { QuickAssessmentModal } from '../components/home/QuickAssessmentModal';
import type { HomepageData } from '../types';

// Fallback initial data in case backend API is connecting
const INITIAL_DATA: HomepageData = {
  hero: {
    title: "Unlock Your Child's Potential with Our Expert Online Tutors",
    whoNeedsTutoringOptions: ["MY CHILD", "ME OR SOMEONE ELSE"],
    trustBadge: "Trusted by 10,000+ families",
    trustRating: 4.8,
    floatingReview: {
      headline: "Best investment in my child's education",
      quote: "Not only did she improve in math, but every aspect of her 'student experience' got better—study habits, time management, and general attitude toward learning.",
      rating: 5.0,
      author: "TINA C",
      date: "5/21/25"
    }
  },
  popularSubjects: [
    { id: 'math', name: 'Math', slug: 'math', icon: 'Calculator', description: 'Builds a strong mathematical foundation', popular: true },
    { id: 'ela', name: 'ELA', slug: 'ela', icon: 'BookOpen', description: 'Reading comprehension and writing skills', popular: true },
    { id: 'sat-prep', name: 'SAT Prep', slug: 'sat-prep', icon: 'GraduationCap', description: 'Targeted SAT scoring strategies', popular: true },
    { id: 'act-prep', name: 'ACT Prep', slug: 'act-prep', icon: 'Award', description: 'ACT mastery for college admission', popular: true },
    { id: 'chemistry', name: 'Chemistry', slug: 'chemistry', icon: 'FlaskConical', description: 'Molecular structure and reactions', popular: true },
    { id: 'physics', name: 'Physics', slug: 'physics', icon: 'Atom', description: 'Classical mechanics and energy', popular: true },
    { id: 'biology', name: 'Biology', slug: 'biology', icon: 'Dna', description: 'Cellular and genetic foundations', popular: true },
    { id: 'spanish', name: 'Spanish', slug: 'spanish', icon: 'Languages', description: 'Conversational and grammar fluency', popular: true }
  ],
  howItWorks: {
    headline: "How does Doublebond work?",
    steps: [
      { stepNumber: 1, title: 'Assessment', description: 'Answer a short, 1-minute assessment to let us know about your child\'s tutoring needs.' },
      { stepNumber: 2, title: 'Consultation', description: 'We\'ll have a 5-minute call and schedule your first session within the next 72 hours.' },
      { stepNumber: 3, title: 'Experience', description: 'Experience the quality of our online tutoring services to ensure we are the right fit for your child\'s needs.' },
      { stepNumber: 4, title: 'Progress', description: 'See progress in as little as 2 weeks for guaranteed better grades.' }
    ],
    valueProposition: {
      headline: "Your child deserves the best online tutor.",
      body: "We offer the best online tutors for your student, custom-matched through our proprietary screening and vetting process. Tutors need more than subject matter expertise – they must possess the right technical and people skills to inspire and motivate today's learners."
    }
  },
  subjectsSection: {
    headline: "What subject does your child need help with?",
    description: "With advanced degrees in mathematics and science from top schools around the country including the Ivy League, our team of accomplished tutors is ready to help your child today with any of these subjects, from math homework to test prep. Give your child the gift of success today and help them reach their full potential with our online tutoring services.",
    subjects: [
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
    ],
    gradeLevels: [
      { label: '5th Grade Math Tutors', slug: '5th-grade-math' },
      { label: '6th Grade Math Tutors', slug: '6th-grade-math' },
      { label: '7th Grade Math Tutors', slug: '7th-grade-math' },
      { label: '8th Grade Math Tutors', slug: '8th-grade-math' },
      { label: 'Elementary Math Tutors', slug: 'elementary-math' },
      { label: 'High School Math Tutors', slug: 'high-school-math' }
    ]
  },
  stats: {
    studentsServed: 10000,
    studentsServedLabel: '10,000',
    studentsServedDesc: 'STUDENTS SERVED',
    hoursTutored: 100000,
    hoursTutoredLabel: '100,000',
    hoursTutoredDesc: 'HOURS TUTORED',
    satisfactionRate: 99,
    satisfactionRateLabel: '99%',
    satisfactionRateDesc: 'SATISFACTION'
  },
  reviews: {
    overallRating: "5/5",
    reviewCountText: "Based on 1,027 reviews subject to moderation.",
    badgeText: "Verified Reviews",
    items: [
      { id: '1', author: 'Aubrey S.', role: 'Parent', headline: 'Amazing experience!!!!', quote: 'Our tutor was incredibly patient and broke down difficult concepts so effortlessly. My daughter went from struggling to scoring 96%!', rating: 5, date: '10/1/2026' },
      { id: '2', author: 'G.S.', role: 'Parent', headline: 'David was really good', quote: 'David was exceptional. He connected with my son immediately and made learning enjoyable rather than a chore.', rating: 5, date: '8/24/2026' },
      { id: '3', author: 'M.A.', role: 'Parent', headline: 'The website is easy to use', quote: 'From my first contact with Doublebond through the matching consultation, the experience has been seamless.', rating: 5, date: '8/12/2026' },
      { id: '4', author: 'Olivia I.', role: 'Student', headline: 'Anish was an incredible tutor', quote: 'With his guidance, I successfully mastered calculus and improved my SAT math score by 140 points.', rating: 5, date: '7/31/2026' }
    ]
  },
  studentStories: {
    headline: "Why students love Doublebond.",
    stories: [
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
        gradeRole: 'Highschool Senior',
        headline: 'Transformed my confidence and earned an A in AP Chemistry.',
        quote: 'Before Doublebond, I dreaded chemistry tests. My tutor broke down complex stoichiometry equations with visual whiteboard diagrams and interactive quizzes.',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: '3',
        studentName: 'Tania C',
        gradeRole: 'Highschool Junior',
        headline: 'Jumped two full letter grades in under 3 weeks.',
        quote: 'The personalized 1-on-1 pace was exactly what I needed. Whenever I hesitated on a geometry proof, my tutor paused and guided me through the logic.',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  featuredTutors: [],
  classroom: {
    headline: "State-of-the-Art Virtual Classroom",
    subheadline: "Interactive Whiteboard & Continuous Feedback",
    features: ["Whiteboard", "Video", "Session Recaps", "Recordings"]
  },
  locations: {
    headline: "Top locations",
    description: "Give your child the gift of academic success with our learner-focused 1-1 online tutoring programs. Our expert tutors are available nationwide, providing personalized support to help students improve their skills and achieve their full potential.",
    cities: ['Atlanta', 'Miami', 'Phoenix', 'Las Vegas', 'Los Angeles', 'New York City']
  },
  benefits: {
    headline: "Top Benefits of Working With a Private Online Tutor",
    items: [
      {
        title: 'One-on-One Assistance',
        description: 'One of the best things about hiring a private online tutor is that you receive lesson plans tailored to a student\'s needs and goals. A private tutor bypasses the content you already know and focuses on areas where extra help is required, with practice questions personalized to student hobbies and interests.'
      },
      {
        title: 'Improved Confidence',
        description: 'Confidence and academic success go hand in hand. The more sure of themselves a student is in a subject, the more likely they will think harder on test questions and view challenging assignments positively with encouragement and feedback.'
      },
      {
        title: 'Better Habits',
        description: 'If a student is struggling with a school subject or preparing for a standardized test, poor study habits are often the root cause. Private tutors help students identify ineffective habits and build organizational skills, time management, and test-taking discipline.'
      },
      {
        title: 'Match Your Pace',
        description: 'Traditional classrooms must adhere to fixed curricula timelines. Our tutors dedicate as much time as necessary to complex concepts, ensuring fundamental mastery before advancing, so your child never falls behind.'
      }
    ]
  },
  faqs: [
    {
      id: '1',
      question: 'How does Doublebond select and vet its tutors?',
      answer: 'We accept fewer than 3% of tutor applicants. Every tutor undergoes multi-stage technical screening, background verification, credential authentication from top universities, and rigorous pedagogical assessments.'
    },
    {
      id: '2',
      question: 'How quickly can my child start tutoring?',
      answer: 'After completing our 1-minute assessment, our educational directors conduct a brief 5-minute matching consultation and match your child. Your first session can be scheduled within 72 hours.'
    },
    {
      id: '3',
      question: 'What happens if the tutor is not a good fit?',
      answer: 'We provide our 100% Tutor Match Guarantee. If for any reason you feel your tutor isn\'t the right fit after your first session, we will re-match you immediately and credit the session at no cost.'
    },
    {
      id: '4',
      question: 'How do the online classroom sessions work?',
      answer: 'Our digital classroom features two-way interactive video, collaborative digital whiteboards with stylus support, math formula rendering, and recorded playback for review.'
    }
  ]
};

export const HomePage: React.FC = () => {
  const [data, setData] = useState<HomepageData>(INITIAL_DATA);
  const [assessmentModalOpen, setAssessmentModalOpen] = useState(false);
  const [modalAudience, setModalAudience] = useState<'MY CHILD' | 'ME OR SOMEONE ELSE'>('MY CHILD');

  // Fetch fresh data from backend API
  useEffect(() => {
    fetch('/api/homepage')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((json: HomepageData) => {
        setData(json);
      })
      .catch((err) => {
        console.warn('Using local fallback homepage data:', err.message);
      });
  }, []);

  const handleOpenAssessment = (audience: 'MY CHILD' | 'ME OR SOMEONE ELSE' = 'MY CHILD') => {
    setModalAudience(audience);
    setAssessmentModalOpen(true);
  };

  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <HeroSection onStartAssessment={handleOpenAssessment} />

      {/* 2. Popular Subjects Bar */}
      <PopularSubjectsBar subjects={data.popularSubjects} onSelectSubject={() => handleOpenAssessment()} />

      {/* 3. How Tutoring Works & Value Proposition */}
      <HowItWorksSection steps={data.howItWorks.steps} onStartAssessment={() => handleOpenAssessment()} />

      {/* 4. Subject Help Grid */}
      <SubjectHelpGrid subjects={data.subjectsSection.subjects} onSelectSubject={() => handleOpenAssessment()} />

      {/* 5. Age Groups & Grade Levels */}
      <AgeGroupsSection gradeLevels={data.subjectsSection.gradeLevels} />

      {/* 6. Proven Impact / Stats Section */}
      <StatsSection stats={data.stats} />

      {/* 7. Verified Reviews Carousel */}
      <ReviewsSection
        overallRating={data.reviews.overallRating}
        reviewCountText={data.reviews.reviewCountText}
        badgeText={data.reviews.badgeText}
        reviews={data.reviews.items}
      />

      {/* 8. Student Success Stories */}
      <StudentStoriesSection
        headline={data.studentStories.headline}
        stories={data.studentStories.stories}
      />

      {/* 9. Interactive Classroom & Whiteboard Demo */}
      <ClassroomDemoSection />

      {/* 10. Top Locations */}
      <TopLocationsSection
        headline={data.locations.headline}
        description={data.locations.description}
        cities={data.locations.cities}
      />

      {/* 11. Top Benefits of Working With a Private Tutor */}
      <BenefitsSection
        headline={data.benefits.headline}
        items={data.benefits.items}
      />

      {/* 12. Frequently Asked Questions */}
      <FAQSection faqs={data.faqs} />

      {/* 13. Final CTA Banner */}
      <FinalCTASection onStartAssessment={() => handleOpenAssessment()} />

      {/* Interactive Assessment Modal */}
      <QuickAssessmentModal
        isOpen={assessmentModalOpen}
        initialAudience={modalAudience}
        onClose={() => setAssessmentModalOpen(false)}
      />
    </div>
  );
};
