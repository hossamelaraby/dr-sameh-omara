import React from 'react';
import { Award, Stethoscope, HeartPulse, MapPin } from 'lucide-react';
import { clinicData } from '../config/clinicData';

export const TrustBar: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award':
        return <Award className="w-5 h-5 text-gold" />;
      case 'Activity':
        return <Stethoscope className="w-5 h-5 text-turquoise" />;
      case 'HeartHandshake':
        return <HeartPulse className="w-5 h-5 text-turquoise" />;
      case 'MapPin':
        return <MapPin className="w-5 h-5 text-navy" />;
      default:
        return <Award className="w-5 h-5 text-turquoise" />;
    }
  };

  return (
    <section className="bg-white border-y border-clinicBorder py-6 relative z-20 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {clinicData.trustPillars.map((pillar) => (
            <div
              key={pillar.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-cream hover:bg-mint/50 transition-colors border border-transparent hover:border-clinicBorder"
            >
              <div className="w-10 h-10 rounded-lg bg-white shadow-xs flex items-center justify-center shrink-0 border border-clinicBorder/60">
                {getIcon(pillar.icon)}
              </div>
              <div className="flex flex-col text-right">
                <span className="font-bold text-sm sm:text-base text-navy leading-tight">
                  {pillar.title}
                </span>
                <span className="text-xs text-slateText">
                  {pillar.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
