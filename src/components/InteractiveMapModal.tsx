import React from 'react';
import { X, Navigation, ExternalLink, MapPin } from 'lucide-react';
import { clinicData } from '../config/clinicData';

interface InteractiveMapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InteractiveMapModal: React.FC<InteractiveMapModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="معاينة مسار خريطة العيادة"
    >
      <div
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-clinicBorder"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-clinicBorder flex items-center justify-between text-right">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-cream hover:bg-mint text-navy flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-turquoise"
            aria-label="إغلاق المعاينة"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <div className="text-right">
              <h3 className="text-base font-bold text-navy font-sans">مسار الوصول إلى العيادة</h3>
              <p className="text-xs text-slateText">شارع مسجد سيدي بشر — بجوار حلواني لي لودي</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-turquoise/10 text-turquoise flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Image Display */}
        <div className="relative bg-gray-100 max-h-[60vh] overflow-y-auto flex items-center justify-center p-2">
          <img
            src={clinicData.images.mapScreenshot}
            alt="موقع عيادة د. سامح عمارة على الخريطة وسيدي بشر"
            className="w-full h-auto object-contain rounded-xl shadow-inner max-h-[55vh]"
          />
        </div>

        {/* Footer info & CTA */}
        <div className="p-4 sm:p-5 bg-cream border-t border-clinicBorder flex flex-col sm:flex-row items-center justify-between gap-3 text-right">
          <div className="text-xs text-slateText">
            نقطة الوصول المباشرة على بُعد خطوات من مسجد سيدي بشر.
          </div>
          <a
            href={clinicData.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy-light text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-colors"
          >
            <Navigation className="w-3.5 h-3.5 text-turquoise" />
            <span>فتح في Google Maps</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        </div>
      </div>
    </div>
  );
};
