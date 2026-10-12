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

export interface StudentStory {
  id: string;
  studentName: string;
  gradeRole: string;
  headline: string;
  quote: string;
  avatar: string;
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

export interface BenefitItem {
  title: string;
  description: string;
}

export interface HowItWorksStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface HomepageData {
  hero: {
    title: string;
    whoNeedsTutoringOptions: string[];
    trustBadge: string;
    trustRating: number;
    floatingReview: {
      headline: string;
      quote: string;
      rating: number;
      author: string;
      date: string;
    };
  };
  popularSubjects: SubjectItem[];
  howItWorks: {
    headline: string;
    steps: HowItWorksStep[];
    valueProposition: {
      headline: string;
      body: string;
    };
  };
  subjectsSection: {
    headline: string;
    description: string;
    subjects: SubjectItem[];
    gradeLevels: { label: string; slug: string }[];
  };
  stats: {
    studentsServed: number;
    studentsServedLabel: string;
    studentsServedDesc: string;
    hoursTutored: number;
    hoursTutoredLabel: string;
    hoursTutoredDesc: string;
    satisfactionRate: number;
    satisfactionRateLabel: string;
    satisfactionRateDesc: string;
  };
  reviews: {
    overallRating: string;
    reviewCountText: string;
    badgeText: string;
    items: TestimonialItem[];
  };
  studentStories: {
    headline: string;
    stories: StudentStory[];
  };
  featuredTutors: TutorItem[];
  classroom: {
    headline: string;
    subheadline: string;
    features: string[];
  };
  locations: {
    headline: string;
    description: string;
    cities: string[];
  };
  benefits: {
    headline: string;
    items: BenefitItem[];
  };
  faqs: FAQItem[];
}
