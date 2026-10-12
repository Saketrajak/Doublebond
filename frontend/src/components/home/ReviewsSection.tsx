import React, { useState } from 'react';
import { Star, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import type { TestimonialItem } from '../../types';

interface ReviewsSectionProps {
  overallRating: string;
  reviewCountText: string;
  badgeText: string;
  reviews: TestimonialItem[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  overallRating,
  reviewCountText,
  badgeText,
  reviews
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 md:py-28 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Overall Score & Verified Reviews Badge */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-5xl font-extrabold text-brand-600 tracking-tight">
              {overallRating}
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-600" />
              <span className="font-bold text-base text-slate-900">{badgeText}</span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              {reviewCountText}
            </p>

            <a
              href="#reviews"
              className="inline-block text-xs font-semibold text-brand-600 underline underline-offset-4 hover:text-brand-700"
            >
              See all reviews on this site
            </a>

            {/* Slider Controls */}
            <div className="pt-4 flex items-center gap-3">
              <button
                onClick={prevReview}
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:border-brand-500 hover:text-brand-600 hover:bg-brand-50 transition-colors"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextReview}
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:border-brand-500 hover:text-brand-600 hover:bg-brand-50 transition-colors"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Column: Carousel Cards */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((rev, idx) => (
                <div
                  key={rev.id}
                  className={`bg-white rounded-3xl p-6 border border-slate-100 shadow-card hover:shadow-lg transition-all duration-300 flex flex-col justify-between ${
                    idx === currentIndex ? 'ring-2 ring-brand-500/20' : ''
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-extrabold text-brand-600">5/5</span>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm line-clamp-1">
                      {rev.headline}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-4">
                      "{rev.quote}"
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-50 text-[11px] text-slate-400">
                    Review of {rev.date}, reflecting an experience by{' '}
                    <span className="font-semibold text-slate-700">{rev.author}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination indicator dots */}
            <div className="flex justify-center items-center gap-2 mt-8">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentIndex ? 'bg-brand-600 w-6' : 'bg-slate-200'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
