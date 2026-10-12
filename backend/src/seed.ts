import { PrismaClient } from '@prisma/client';
import { ALL_SUBJECTS, FAQS, VERIFIED_REVIEWS, STUDENT_SUCCESS_STORIES, FEATURED_TUTORS } from './data/mockData.ts';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Seed Subjects
  for (const subject of ALL_SUBJECTS) {
    await prisma.subject.upsert({
      where: { slug: subject.slug },
      update: { name: subject.name, description: subject.description, icon: subject.icon },
      create: { name: subject.name, slug: subject.slug, description: subject.description, icon: subject.icon, active: true },
    });
  }
  console.log(`Seeded ${ALL_SUBJECTS.length} subjects`);

  // Seed FAQs
  await prisma.fAQ.deleteMany({});
  for (const [index, faq] of FAQS.entries()) {
    await prisma.fAQ.create({
      data: { question: faq.question, answer: faq.answer, order: index }
    });
  }
  console.log(`Seeded ${FAQS.length} FAQs`);

  // Seed Reviews
  await prisma.review.deleteMany({});
  for (const rev of VERIFIED_REVIEWS) {
    await prisma.review.create({
      data: {
        reviewerName: rev.author,
        reviewerRole: rev.role,
        rating: rev.rating,
        headline: rev.headline,
        comment: rev.quote,
        dateText: rev.date,
        isVerified: true,
        isApproved: true
      }
    });
  }
  console.log(`Seeded ${VERIFIED_REVIEWS.length} reviews`);

  // Seed Success Stories
  await prisma.successStory.deleteMany({});
  for (const [index, story] of STUDENT_SUCCESS_STORIES.entries()) {
    await prisma.successStory.create({
      data: {
        studentName: story.studentName,
        gradeRole: story.gradeRole,
        headline: story.headline,
        quote: story.quote,
        avatar: story.avatar,
        order: index
      }
    });
  }
  console.log(`Seeded ${STUDENT_SUCCESS_STORIES.length} success stories`);

  // Seed Tutors
  for (const tutor of FEATURED_TUTORS) {
    const email = `${tutor.name.replace(/[^a-zA-Z]/g, '').toLowerCase()}@example.com`;
    // Create or update User
    const user = await prisma.user.upsert({
      where: { email },
      update: { name: tutor.name },
      create: { email, name: tutor.name, role: 'TUTOR', verified: tutor.verified }
    });
    
    // Create or update TutorProfile
    await prisma.tutorProfile.upsert({
      where: { userId: user.id },
      update: {
        headline: tutor.headline,
        bio: tutor.bio,
        education: tutor.education,
        hourlyRate: tutor.hourlyRate,
        rating: tutor.rating,
        reviewCount: tutor.reviewsCount,
        photoUrl: tutor.avatar,
        isVerified: tutor.verified
      },
      create: {
        userId: user.id,
        headline: tutor.headline,
        bio: tutor.bio,
        education: tutor.education,
        hourlyRate: tutor.hourlyRate,
        rating: tutor.rating,
        reviewCount: tutor.reviewsCount,
        photoUrl: tutor.avatar,
        isVerified: tutor.verified
      }
    });
  }
  console.log(`Seeded ${FEATURED_TUTORS.length} tutors`);

  console.log('Seeding completed successfully!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
