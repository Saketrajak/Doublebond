import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';

interface TopLocationsSectionProps {
  headline: string;
  description: string;
  cities: string[];
}

export const TopLocationsSection: React.FC<TopLocationsSectionProps> = ({
  headline,
  description,
  cities
}) => {
  return (
    <section className="py-20 md:py-24 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {headline}
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto font-normal">
            {description}
          </p>
        </div>

        <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Top locations
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {cities.map((city) => (
            <Link
              key={city}
              to={`/locations/${city.toLowerCase().replace(/\s+/g, '-')}`}
              className="py-4 px-6 bg-white border border-slate-200 hover:border-brand-400 rounded-2xl text-slate-800 hover:text-brand-600 font-bold text-sm sm:text-base shadow-sm hover:shadow transition-all flex items-center justify-between group"
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-500" />
                {city}
              </span>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
