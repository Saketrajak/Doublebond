import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { FindTutorPage } from './pages/FindTutorPage';
import { TutorsPage } from './pages/TutorsPage';
import { SubjectsPage } from './pages/SubjectsPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { PricingPage } from './pages/PricingPage';
import { SuccessStoriesPage } from './pages/SuccessStoriesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { BecomeTutorPage } from './pages/BecomeTutorPage';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { AdminLayout } from './layouts/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminFAQs } from './pages/admin/AdminFAQs';
import { AdminSubjects } from './pages/admin/AdminSubjects';
import { AdminReviews } from './pages/admin/AdminReviews';
import { AdminUsers } from './pages/admin/AdminUsers';
import { QuickAssessmentModal } from './components/home/QuickAssessmentModal';

export const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-brand-500 selection:text-white">
      {/* Global Navigation Header */}
      <Navbar onOpenAssessment={() => setModalOpen(true)} />

      {/* Main Page Content (Separated Routes) */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/find-a-tutor" element={<FindTutorPage />} />
          <Route path="/tutors" element={<TutorsPage />} />
          <Route path="/tutors/:slug" element={<TutorsPage />} />
          <Route path="/subjects" element={<SubjectsPage />} />
          <Route path="/subjects/:slug" element={<SubjectsPage />} />
          <Route path="/grades/:grade" element={<SubjectsPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/success-stories" element={<SuccessStoriesPage />} />
          <Route path="/resources" element={<SuccessStoriesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/become-a-tutor" element={<BecomeTutorPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="faqs" element={<AdminFAQs />} />
            <Route path="subjects" element={<AdminSubjects />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
          
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Global Quick Assessment Modal */}
      <QuickAssessmentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default App;
