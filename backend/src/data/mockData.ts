export interface SubjectItem {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  popular?: boolean;
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  headline: string;
  quote: string;
  rating: number;
  date: string;
  avatar?: string;
  institution?: string;
}

export interface TutorItem {
  id: string;
  name: string;
  headline: string;
  education: string;
  rating: number;
  reviewsCount: number;
  hourlyRate: number;
  subjects: string[];
  avatar: string;
  bio: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const POPULAR_SUBJECTS: SubjectItem[] = [
  { id: 'math', name: 'Math', slug: 'math', icon: 'Calculator', description: 'Builds a strong mathematical foundation and prepares for academic success', popular: true },
  { id: 'ela', name: 'ELA', slug: 'ela', icon: 'BookOpen', description: 'Comprehensive English language arts, reading comprehension, and literary analysis', popular: true },
  { id: 'sat-prep', name: 'SAT Prep', slug: 'sat-prep', icon: 'GraduationCap', description: 'Focused on both math and reading/writing portions of the College Board SAT', popular: true },
  { id: 'act-prep', name: 'ACT Prep', slug: 'act-prep', icon: 'Award', description: 'Expert guidance to boost test scores with personalized strategies', popular: true },
  { id: 'chemistry', name: 'Chemistry', slug: 'chemistry', icon: 'FlaskConical', description: 'Understand the composition, properties, and reactions of matter at the molecular level', popular: true },
  { id: 'physics', name: 'Physics', slug: 'physics', icon: 'Atom', description: 'Learn the fundamental laws of nature and their applications in the physical world', popular: true },
  { id: 'biology', name: 'Biology', slug: 'biology', icon: 'Dna', description: 'Explore living organisms, genetics, cellular biology, and ecosystems', popular: true },
  { id: 'spanish', name: 'Spanish', slug: 'spanish', icon: 'Languages', description: 'Master conversational fluency, grammar, vocabulary, and AP Spanish exam prep', popular: true }
];

export const ALL_SUBJECTS: SubjectItem[] = [
  { id: 'math', name: 'Math', slug: 'math', icon: 'Calculator', description: 'Builds a strong mathematical foundation and prepares for academic success.' },
  { id: 'algebra', name: 'Algebra', slug: 'algebra', icon: 'Grid', description: 'Master the basics of Algebra and set yourself up for future math success.' },
  { id: 'algebra-2', name: 'Algebra 2', slug: 'algebra-2', icon: 'TrendingUp', description: 'Covers advanced topics like quadratic functions, rational expressions, and logarithms.' },
  { id: 'calculus', name: 'Calculus', slug: 'calculus', icon: 'Infinity', description: 'Introduces differential equations and integrals, which have applications in physical and data science.' },
  { id: 'geometry', name: 'Geometry', slug: 'geometry', icon: 'Compass', description: 'Includes discussions of mathematical proofs along with angles and 2D/3D shapes.' },
  { id: 'trigonometry', name: 'Trigonometry', slug: 'trigonometry', icon: 'Triangle', description: 'Features advanced topics like the unit circle and complex numbers, which feature heavily in calculus.' },
  { id: 'sat-tutors', name: 'SAT Tutors', slug: 'sat-tutors', icon: 'GraduationCap', description: 'Focused on both math portions (calculator and no-calculator) of the College Board SAT exam.' },
  { id: 'act', name: 'ACT', slug: 'act', icon: 'Award', description: 'Covers mathematics, science reasoning, and English concepts included in the ACT exam.' },
  { id: 'chemistry', name: 'Chemistry', slug: 'chemistry', icon: 'FlaskConical', description: 'Understand the composition, properties, and reactions of matter at the molecular level.' },
  { id: 'physics', name: 'Physics', slug: 'physics', icon: 'Atom', description: 'Learn the laws of nature and their applications in the physical world.' },
  { id: 'pre-calculus', name: 'Pre-Calculus', slug: 'pre-calculus', icon: 'Shapes', description: 'An introduction to fundamental calculus topics like complex numbers, identities, and exponential functions.' }
];

export const GRADE_LEVELS = [
  { label: '5th Grade Math Tutors', slug: '5th-grade-math' },
  { label: '6th Grade Math Tutors', slug: '6th-grade-math' },
  { label: '7th Grade Math Tutors', slug: '7th-grade-math' },
  { label: '8th Grade Math Tutors', slug: '8th-grade-math' },
  { label: 'Elementary Math Tutors', slug: 'elementary-math' },
  { label: 'High School Math Tutors', slug: 'high-school-math' }
];

export const STATS = {
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

export const HOW_IT_WORKS_STEPS = [
  {
    stepNumber: 1,
    title: 'Answer a short assessment',
    description: 'Answer a short, 1-minute assessment to let us know about your child\'s tutoring needs and learning goals.'
  },
  {
    stepNumber: 2,
    title: '5-minute match consultation',
    description: 'We\'ll have a 5-minute call and schedule your first personalized session within the next 72 hours.'
  },
  {
    stepNumber: 3,
    title: 'Experience 1-on-1 tutoring',
    description: 'Experience the quality of our online tutoring services to ensure we are the right fit for your child\'s needs.'
  },
  {
    stepNumber: 4,
    title: 'See guaranteed progress',
    description: 'See measurable academic progress in as little as 2 weeks for guaranteed better grades and confidence.'
  }
];

export const VERIFIED_REVIEWS: TestimonialItem[] = [
  {
    id: 'rev-1',
    author: 'Aubrey S.',
    role: 'Parent',
    headline: 'Amazing experience!!!!',
    quote: 'Our tutor was incredibly patient and broke down difficult concepts so effortlessly. My daughter went from struggling in pre-calc to scoring 96% on her midterms!',
    rating: 5,
    date: '10/1/2026'
  },
  {
    id: 'rev-2',
    author: 'G.S.',
    role: 'Parent',
    headline: 'David was really good',
    quote: 'David was exceptional. He connected with my son immediately and made learning enjoyable rather than a chore. Truly world-class instruction.',
    rating: 5,
    date: '8/24/2026'
  },
  {
    id: 'rev-3',
    author: 'M.A.',
    role: 'Parent',
    headline: 'The website is easy to use and tutor quality is unmatched',
    quote: 'From my first contact with Doublebond through the matching consultation and interactive classroom sessions, the experience has been seamless and stress-free.',
    rating: 5,
    date: '8/12/2026'
  },
  {
    id: 'rev-4',
    author: 'Olivia I.',
    role: 'Student',
    headline: 'Anish was an incredible tutor',
    quote: 'With his guidance, I successfully mastered calculus and improved my SAT math score by 140 points. I couldn\'t have asked for a better mentor.',
    rating: 5,
    date: '7/31/2026'
  }
];

export const STUDENT_SUCCESS_STORIES = [
  {
    id: 'story-1',
    studentName: 'Daniel C',
    gradeRole: 'Duke University Freshman',
    headline: 'Chelsea from Doublebond helped me to get a full ride to Duke University.',
    quote: 'Chelsea from Doublebond was the perfect match for me. She customized the training so that it would push me hard - but not too hard where I would get frustrated. I worked with Chelsea for years because she took a genuine interest in me and my future.',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'story-2',
    studentName: 'Katherine T',
    gradeRole: 'High School Senior',
    headline: 'Transformed my confidence and earned an A in AP Chemistry.',
    quote: 'Before Doublebond, I dreaded chemistry tests. My tutor broke down complex stoichiometry equations with visual whiteboard diagrams and interactive quizzes. Now I\'m planning to major in biochemistry!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'story-3',
    studentName: 'Tania C',
    gradeRole: 'High School Junior',
    headline: 'Jumped two full letter grades in under 3 weeks.',
    quote: 'The personalized 1-on-1 pace was exactly what I needed. Whenever I hesitated on a geometry proof, my tutor paused, guided me through the logic, and celebrated every milestone.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80'
  }
];

export const TOP_LOCATIONS = [
  'Atlanta',
  'Miami',
  'Phoenix',
  'Las Vegas',
  'Los Angeles',
  'New York City'
];

export const CORE_BENEFITS = [
  {
    title: 'One-on-One Assistance',
    description: 'One of the best things about hiring a private online tutor is that you receive lesson plans tailored to a student\'s unique needs and goals. A private tutor bypasses the content you already know and focuses on areas where extra help is required, with practice questions personalized to student hobbies and interests.'
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
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How does Doublebond select and vet its tutors?',
    answer: 'We accept fewer than 3% of tutor applicants. Every tutor undergoes multi-stage technical screening, background verification, credential authentication (from leading universities including Ivy League schools), and rigorous pedagogical assessments.'
  },
  {
    id: 'faq-2',
    question: 'How quickly can my child start tutoring?',
    answer: 'After completing our 1-minute assessment, our educational directors will conduct a brief 5-minute matching consultation and match your child with an ideal tutor. Your first session can be scheduled within 72 hours.'
  },
  {
    id: 'faq-3',
    question: 'What happens if the tutor is not a good fit?',
    answer: 'We provide our 100% Tutor Match Guarantee. If for any reason you feel your tutor isn\'t the perfect fit after your first session, we will re-match you immediately and credit the session at no cost.'
  },
  {
    id: 'faq-4',
    question: 'How do the online classroom sessions work?',
    answer: 'Our proprietary digital classroom features two-way interactive video, collaborative digital whiteboards with stylus support, math formula rendering, document sharing, and recorded playback for review.'
  },
  {
    id: 'faq-5',
    question: 'Are there flexible subscription or hour packages?',
    answer: 'Yes! We offer customized packages tailored to your student\'s goals—whether you need intensive test prep (SAT/ACT) or ongoing weekly subject mastery throughout the academic school year.'
  }
];

export const FEATURED_TUTORS: TutorItem[] = [
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
    bio: 'Holistic tutor focusing on analytical reasoning, confidence building, and personalized study habits for long-term academic excellence.',
    verified: true
  }
];
