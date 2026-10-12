import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const MobileActionBar: React.FC = () => {
  const { data: clinicData } = useClinic();

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-clinicBorder shadow-mobile-bar px-3 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      role="region"
      aria-label="شريط التواصل السريع المباشر"
    >
      <div className="max-w-md mx-auto grid grid-cols-2 gap-2.5">
        
        {/* Button 1: Direct Call */}
        <a
          href={clinicData.phoneBooking.telLink}
          className="flex items-center justify-center gap-2 bg-navy active:bg-navy-dark text-white py-3.5 px-3 rounded-2xl font-bold text-sm shadow-md transition-transform active:scale-[0.98] min-h-[48px]"
          aria-label={`اتصال مباشر بالعيادة: ${clinicData.phoneBooking.display}`}
        >
          <Phone className="w-4 h-4 text-turquoise shrink-0" />
          <div className="flex flex-col items-start leading-tight">
            <span>اتصال للحجز</span>
            <span className="dir-ltr text-[10px] text-turquoise/90 font-mono font-medium">
              {clinicData.phoneBooking.display}
            </span>
          </div>
        </a>

        {/* Button 2: WhatsApp Chat */}
        <a
          href={clinicData.whatsapp.waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[#25D366] active:bg-[#1ebe5d] text-white py-3.5 px-3 rounded-2xl font-bold text-sm shadow-md transition-transform active:scale-[0.98] min-h-[48px]"
          aria-label={`محادثة واتساب: ${clinicData.whatsapp.display}`}
        >
          <MessageSquare className="w-4 h-4 text-white shrink-0" />
          <div className="flex flex-col items-start leading-tight">
            <span>محادثة واتساب</span>
            <span className="dir-ltr text-[10px] text-white/90 font-mono font-medium">
              {clinicData.whatsapp.display}
            </span>
          </div>
        </a>

      </div>
    </div>
  );
};
