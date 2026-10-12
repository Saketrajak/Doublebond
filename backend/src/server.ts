import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  GRADE_LEVELS,
  STATS,
  HOW_IT_WORKS_STEPS,
  TOP_LOCATIONS,
  CORE_BENEFITS
} from './data/mockData.ts';

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;

// In-Memory Caching (Saves Database Reads!)
let homepageCache: any = null;
let homepageCacheTime = 0;
let subjectsCache: any = null;
let subjectsCacheTime = 0;
let tutorsCache: any = null;
let tutorsCacheTime = 0;
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// In-memory storage for leads and questionnaire answers
const submittedLeads: any[] = [];
const contactSubmissions: any[] = [];

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Doublebond Tutoring Backend API'
  });
});

// Comprehensive Homepage Data
app.get('/api/homepage', async (req: Request, res: Response) => {
  if (homepageCache) {
    return res.json(homepageCache);
  }

  const [dbSubjects, dbFaqs, dbReviews, dbStories, dbTutors] = await Promise.all([
    prisma.subject.findMany({ where: { active: true } }),
    prisma.fAQ.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }),
    prisma.review.findMany({ where: { isApproved: true, isVerified: true } }),
    prisma.successStory.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }),
    prisma.tutorProfile.findMany({ 
      where: { isVerified: true }, 
      include: { user: true } 
    })
  ]);

  const mappedSubjects = dbSubjects.map(s => ({
    id: s.slug,
    name: s.name,
    slug: s.slug,
    icon: s.icon,
    description: s.description
  }));

  const mappedFaqs = dbFaqs.map(f => ({
    id: f.id,
    question: f.question,
    answer: f.answer
  }));

  const mappedReviews = dbReviews.map(r => ({
    id: r.id,
    author: r.reviewerName,
    role: r.reviewerRole,
    rating: r.rating,
    headline: r.headline,
    quote: r.comment,
    date: r.dateText
  }));

  const mappedStories = dbStories.map(s => ({
    id: s.id,
    studentName: s.studentName,
    gradeRole: s.gradeRole,
    headline: s.headline,
    quote: s.quote,
    avatar: s.avatar
  }));

  const mappedTutors = dbTutors.map(t => ({
    id: t.id,
    name: t.user.name,
    headline: t.headline,
    education: t.education,
    rating: Number(t.rating),
    reviewsCount: t.reviewCount,
    hourlyRate: Number(t.hourlyRate),
    subjects: ['Calculus', 'Algebra 2', 'SAT Math', 'Trigonometry'],
    avatar: t.photoUrl,
    bio: t.bio,
    verified: t.isVerified
  }));

  const responseData = {
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
    popularSubjects: mappedSubjects.slice(0, 8),
    howItWorks: {
      headline: "How does Doublebond work?",
      steps: HOW_IT_WORKS_STEPS,
      valueProposition: {
        headline: "Your child deserves the best online tutor.",
        body: "We offer the best online tutors for your student, custom-matched through our proprietary screening and vetting process. Tutors need more than subject matter expertise – they must possess the right technical and people skills to inspire and motivate today's learners."
      }
    },
    subjectsSection: {
      headline: "What subject does your child need help with?",
      description: "With advanced degrees in mathematics and science from top schools around the country including the Ivy League, our team of accomplished tutors is ready to help your child today with any of these subjects, from math homework to test prep. Give your child the gift of success today and help them reach their full potential with our online tutoring services.",
      subjects: mappedSubjects,
      gradeLevels: GRADE_LEVELS
    },
    stats: STATS,
    reviews: {
      overallRating: "5/5",
      reviewCountText: "Based on 1,027 reviews subject to moderation.",
      badgeText: "Verified Reviews",
      items: mappedReviews
    },
    studentStories: {
      headline: "Why students love Doublebond.",
      stories: mappedStories
    },
    featuredTutors: mappedTutors,
    classroom: {
      headline: "State-of-the-Art Virtual Classroom",
      subheadline: "Interactive Whiteboard & Continuous Feedback",
      features: [
        "Real-time dynamic mathematical equations & graphing",
        "Two-way HD video conferencing with session recording",
        "Continuous feedback reports delivered after every single session",
        "Interactive document annotation and homework review"
      ]
    },
    locations: {
      headline: "Top locations",
      description: "Give your child the gift of academic success with our learner-focused 1-1 online tutoring programs. Our expert tutors are available nationwide, providing personalized support to help students improve their skills and achieve their full potential.",
      cities: TOP_LOCATIONS
    },
    benefits: {
      headline: "Top Benefits of Working With a Private Online Tutor",
      items: CORE_BENEFITS
    },
    faqs: mappedFaqs
  };

  homepageCache = responseData;
  homepageCacheTime = Date.now();
  res.json(responseData);
});

// Subjects endpoint
app.get('/api/subjects', async (req: Request, res: Response) => {
  const dbSubjects = await prisma.subject.findMany({ where: { active: true } });
  const mappedSubjects = dbSubjects.map(s => ({
    id: s.slug,
    name: s.name,
    slug: s.slug,
    icon: s.icon,
    description: s.description
  }));

  res.json({
    popular: mappedSubjects.slice(0, 8),
    all: mappedSubjects,
    grades: GRADE_LEVELS
  });
});

// Tutors endpoint
app.get('/api/tutors', async (req: Request, res: Response) => {
  const dbTutors = await prisma.tutorProfile.findMany({ 
    where: { isVerified: true }, 
    include: { user: true } 
  });
  
  const mappedTutors = dbTutors.map(t => ({
    id: t.id,
    name: t.user.name,
    headline: t.headline,
    education: t.education,
    rating: Number(t.rating),
    reviewsCount: t.reviewCount,
    hourlyRate: Number(t.hourlyRate),
    subjects: ['Calculus', 'Algebra 2', 'SAT Math', 'Trigonometry'],
    avatar: t.photoUrl,
    bio: t.bio,
    verified: t.isVerified
  }));

  const { subject } = req.query;
  if (subject && typeof subject === 'string') {
    const filtered = mappedTutors.filter(t => 
      t.subjects.some(s => s.toLowerCase().includes(subject.toLowerCase()))
    );
    return res.json({ tutors: filtered });
  }
  res.json({ tutors: mappedTutors });
});

// Lead Capture endpoint (Questionnaire or Hero Form)
app.post('/api/leads', async (req: Request, res: Response) => {
  const { name, email, phone, targetSubject, gradeLevel, studentType, utmSource, notes } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const newLead = await prisma.lead.create({
      data: {
        name: name || 'Prospective Parent/Student',
        email,
        phone: phone || null,
        targetSubject: targetSubject || 'General',
        gradeLevel: gradeLevel || null,
        studentType: studentType || 'MY_CHILD',
        utmSource: utmSource || 'direct',
        notes: notes || null,
        status: 'NEW'
      }
    });

    res.status(201).json({
      success: true,
      message: 'Lead captured successfully! Our educational director will contact you within 5 minutes.',
      lead: newLead
    });
  } catch (error) {
    console.error("Error saving lead:", error);
    res.status(500).json({ error: 'Failed to save lead to database' });
  }
});

// Contact endpoint
app.post('/api/contact', (req: Request, res: Response) => {
  const { name, email, phone, message } = req.body;
  if (!email || !message) {
    return res.status(400).json({ error: 'Email and message are required' });
  }

  const submission = {
    id: `contact_${Date.now()}`,
    name,
    email,
    phone,
    message,
    createdAt: new Date().toISOString()
  };

  contactSubmissions.push(submission);
  res.status(201).json({ success: true, message: 'Message received. We will respond promptly.' });
});

// Authentication Routes
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_development_only';

app.post('/api/auth/register', async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
        role: role || 'USER',
        status: 'ACTIVE',
        verified: true // auto-verify for now
      }
    });

    const token = jwt.sign({ id: newUser.id, role: newUser.role }, JWT_SECRET, { expiresIn: '7d' });
    
    res.status(201).json({ 
      success: true, 
      token, 
      user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role, permissions: newUser.permissions } 
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({ 
      success: true, 
      token, 
      user: { id: user.id, name: user.name, email: user.email, role: user.role, permissions: user.permissions } 
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Middleware for authenticating JWT token
const authenticateToken = (req: any, res: Response, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

// Middleware for Role Checking
const requireStaffOrAdmin = (req: any, res: Response, next: any) => {
  if (req.user && (req.user.role === 'ADMIN' || req.user.role === 'STAFF')) {
    next();
  } else {
    res.status(403).json({ error: 'Access denied. Requires Staff or Admin privileges.' });
  }
};

// Admin Endpoints
app.get('/api/admin/leads', authenticateToken, requireStaffOrAdmin, async (req: Request, res: Response) => {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, leads });
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

// --- CMS: FAQs ---
app.get('/api/admin/faqs', authenticateToken, requireStaffOrAdmin, async (req: Request, res: Response) => {
  try {
    const faqs = await prisma.fAQ.findMany({ orderBy: { order: 'asc' } });
    res.json({ success: true, faqs });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch FAQs' });
  }
});

app.post('/api/admin/faqs', authenticateToken, requireStaffOrAdmin, async (req: Request, res: Response) => {
  const { question, answer, category, order, isActive } = req.body;
  try {
    const newFaq = await prisma.fAQ.create({
      data: { question, answer, category, order: order || 0, isActive: isActive ?? true }
    });
    homepageCache = null; // Invalidate cache so homepage updates instantly!
    res.json({ success: true, faq: newFaq });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create FAQ' });
  }
});

app.put('/api/admin/faqs/:id', authenticateToken, requireStaffOrAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { question, answer, category, order, isActive } = req.body;
  try {
    const updatedFaq = await prisma.fAQ.update({
      where: { id },
      data: { question, answer, category, order, isActive }
    });
    homepageCache = null; // Invalidate cache
    res.json({ success: true, faq: updatedFaq });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update FAQ' });
  }
});

app.delete('/api/admin/faqs/:id', authenticateToken, requireStaffOrAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.fAQ.delete({ where: { id } });
    homepageCache = null; // Invalidate cache
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete FAQ' });
  }
});

// --- CMS: Subjects ---
app.get('/api/admin/subjects', authenticateToken, requireStaffOrAdmin, async (req: Request, res: Response) => {
  try {
    const subjects = await prisma.subject.findMany({ orderBy: { name: 'asc' } });
    res.json({ success: true, subjects });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Subjects' });
  }
});

app.post('/api/admin/subjects', authenticateToken, requireStaffOrAdmin, async (req: Request, res: Response) => {
  const { name, slug, description, category, active } = req.body;
  try {
    const newSubject = await prisma.subject.create({
      data: { name, slug, description, category, active: active ?? true }
    });
    homepageCache = null; 
    res.json({ success: true, subject: newSubject });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create Subject' });
  }
});

app.put('/api/admin/subjects/:id', authenticateToken, requireStaffOrAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, slug, description, category, active } = req.body;
  try {
    const updatedSubject = await prisma.subject.update({
      where: { id },
      data: { name, slug, description, category, active }
    });
    homepageCache = null; 
    res.json({ success: true, subject: updatedSubject });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update Subject' });
  }
});

app.delete('/api/admin/subjects/:id', authenticateToken, requireStaffOrAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.subject.delete({ where: { id } });
    homepageCache = null; 
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete Subject' });
  }
});

// --- CMS: Reviews ---
app.get('/api/admin/reviews', authenticateToken, requireStaffOrAdmin, async (req: Request, res: Response) => {
  try {
    const reviews = await prisma.review.findMany({ orderBy: { date: 'desc' } });
    res.json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Reviews' });
  }
});

app.post('/api/admin/reviews', authenticateToken, requireStaffOrAdmin, async (req: Request, res: Response) => {
  const { author, rating, headline, content, verified, subjectId } = req.body;
  try {
    const newReview = await prisma.review.create({
      data: { author, rating: parseFloat(rating), headline, content, verified: verified ?? true, date: new Date(), subjectId }
    });
    homepageCache = null; 
    res.json({ success: true, review: newReview });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create Review' });
  }
});

app.put('/api/admin/reviews/:id', authenticateToken, requireStaffOrAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { author, rating, headline, content, verified, subjectId } = req.body;
  try {
    const updatedReview = await prisma.review.update({
      where: { id },
      data: { author, rating: parseFloat(rating), headline, content, verified, subjectId }
    });
    homepageCache = null; 
    res.json({ success: true, review: updatedReview });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update Review' });
  }
});

app.delete('/api/admin/reviews/:id', authenticateToken, requireStaffOrAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.review.delete({ where: { id } });
    homepageCache = null; 
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete Review' });
  }
});

// --- CMS: Users ---
app.get('/api/admin/users', authenticateToken, requireStaffOrAdmin, async (req: Request, res: Response) => {
  try {
    // Only ADMIN should probably be able to view all users, but we'll allow STAFF to see them (maybe they can't edit roles though)
    const users = await prisma.user.findMany({ 
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        permissions: true,
        createdAt: true
      }
    });
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Users' });
  }
});

app.put('/api/admin/users/:id', authenticateToken, requireStaffOrAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role, permissions } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role, permissions }
    });
    res.json({ success: true, user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update User' });
  }
});

app.listen(PORT, () => {
  console.log(`Doublebond Tutoring Backend Server running on http://localhost:${PORT}`);
});
