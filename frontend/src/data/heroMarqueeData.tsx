import React from 'react';
import { GraduationCap, Award, BookOpen, Sparkles, CheckCircle2, Atom, Calculator, BookmarkCheck } from 'lucide-react';
import type { MarqueeItem } from '../components/ui/InfiniteMovingCards';

/**
 * Curated educational imagery for the 3D Background Marquee.
 * Your design team can easily swap or add image URLs here anytime.
 */
export const HERO_BG_IMAGES: string[] = [
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&auto=format&fit=crop&q=80", // Students studying together
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&auto=format&fit=crop&q=80", // Writing notes & math equations
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&auto=format&fit=crop&q=80", // Online learning session on laptop
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&auto=format&fit=crop&q=80", // Interactive teaching classroom
  "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=900&auto=format&fit=crop&q=80", // Chemistry & science exploration
  "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=900&auto=format&fit=crop&q=80", // 1-on-1 personalized mentorship
  "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=900&auto=format&fit=crop&q=80", // Mathematical chalkboard equations
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&auto=format&fit=crop&q=80", // Collaborative student group
  "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=900&auto=format&fit=crop&q=80", // University student focused study
  "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&auto=format&fit=crop&q=80", // Classical academic library & blackboard
  "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=900&auto=format&fit=crop&q=80", // Exam & test preparation
  "https://images.unsplash.com/photo-1588072432836-e10032774350?w=900&auto=format&fit=crop&q=80", // Student in digital lesson
  "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=900&auto=format&fit=crop&q=80", // Academic success & books
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&auto=format&fit=crop&q=80", // Whiteboard instruction
  "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=900&auto=format&fit=crop&q=80", // Focused tutoring workspace
];

/**
 * Top universities, exam boards, and curricula for the Infinite Moving Cards ticker.
 */
export const UNIVERSITY_PARTNERS: MarqueeItem[] = [
  {
    alt: "Harvard",
    label: "Alumni Tutors",
    icon: <GraduationCap className="w-4 h-4 text-rose-600" />,
  },
  {
    alt: "Stanford",
    label: "STEM Mentors",
    icon: <Sparkles className="w-4 h-4 text-emerald-600" />,
  },
  {
    alt: "MIT",
    label: "Math & Physics",
    icon: <Atom className="w-4 h-4 text-indigo-600" />,
  },
  {
    alt: "Oxford",
    label: "Humanities & Sciences",
    icon: <BookOpen className="w-4 h-4 text-blue-600" />,
  },
  {
    alt: "Cambridge",
    label: "IGCSE & A-Levels",
    icon: <Award className="w-4 h-4 text-cyan-600" />,
  },
  {
    alt: "College Board",
    label: "SAT & AP Prep",
    icon: <BookmarkCheck className="w-4 h-4 text-amber-600" />,
  },
  {
    alt: "IB World",
    label: "Diploma Program",
    icon: <CheckCircle2 className="w-4 h-4 text-purple-600" />,
  },
  {
    alt: "ACT Prep",
    label: "Target 34+ Scores",
    icon: <Calculator className="w-4 h-4 text-violet-600" />,
  },
];
