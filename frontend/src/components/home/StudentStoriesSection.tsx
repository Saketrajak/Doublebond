import React, { useState } from 'react';
import { Quote } from 'lucide-react';
import type { StudentStory } from '../../types';

interface StudentStoriesSectionProps {
  headline: string;
  stories: StudentStory[];
}

export const StudentStoriesSection: React.FC<StudentStoriesSectionProps> = ({ headline, stories }) => {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const currentStory = stories[selectedStoryIndex] || stories[0];

  return (
    <section className="py-20 md:py-28 bg-slate-50/70">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Why students love <span className="text-brand-accent">Doublebond.</span>
          </h2>
        </div>

        {/* Featured Story Box */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-card text-center relative max-w-3xl mx-auto min-h-[300px] flex flex-col justify-center transition-all duration-300">
          <Quote className="w-10 h-10 text-brand-200 fill-brand-50 mx-auto mb-4" />

          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 leading-snug">
            {currentStory.headline}
          </h3>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            "{currentStory.quote}"
          </p>
        </div>

        {/* Student Selector Tabs */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-6 sm:gap-12">
          {stories.map((story, idx) => {
            const isSelected = idx === selectedStoryIndex;
            return (
              <button
                key={story.id}
                type="button"
                onClick={() => setSelectedStoryIndex(idx)}
                className={`flex items-center gap-3.5 pb-3 transition-all relative ${
                  isSelected ? 'border-b-2 border-brand-500 scale-105' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={story.avatar}
                  alt={story.studentName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div className="text-left">
                  <div className="font-bold text-sm text-slate-900">{story.studentName}</div>
                  <div className="text-xs text-slate-500">{story.gradeRole}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
