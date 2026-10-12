import React, { useState } from 'react';
import { MapPin, Navigation, Phone, ExternalLink, Copy, Check, Eye, Clock } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

interface LocationSectionProps {
  onOpenMapScreenshot?: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ onOpenMapScreenshot }) => {
  const { data: clinicData, currentStatus } = useClinic();
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(clinicData.fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="location" className="py-16 md:py-24 bg-cream relative border-t border-clinicBorder">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-right">
          <div className="inline-flex items-center gap-2 text-turquoise text-sm font-bold mb-2">
            <span className="w-2 h-2 rounded-full bg-turquoise" />
            <span>العنوان والوصول ومواعيد العمل</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-navy tracking-tight font-sans">
            موقع العيادة ومواعيد الاستقبال
          </h2>
          <p className="text-slateText text-base sm:text-lg mt-3 leading-relaxed">
            موقع متميز وحيوي يسهل الوصول إليه من مختلف مناطق الإسكندرية.
          </p>
        </div>

        {/* Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Address & Direction Details Card (Takes 5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-clinicBorder shadow-soft flex flex-col justify-between text-right">
            
            <div>
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <div className="inline-flex items-center gap-2 bg-mint text-turquoise text-xs font-bold px-3 py-1.5 rounded-full">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>الإسكندرية — سيدي بشر</span>
                </div>

                {/* Open / Closed pill */}
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${
                  currentStatus.isOpen 
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${currentStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                  <span>{currentStatus.statusLabel}</span>
                </div>
              </div>

              {/* Main Address Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-navy mb-4 font-sans leading-snug">
                {clinicData.fullAddress}
              </h3>

              {/* Working Hours Card */}
              <div className="p-4 rounded-2xl bg-mint-subtle border border-mint-border mb-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2 text-navy font-bold text-sm">
                    <Clock className="w-4 h-4 text-turquoise" />
                    <span>مواعيد العيادة:</span>
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                    currentStatus.isOpen ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-200 text-amber-900'
                  }`}>
                    {currentStatus.statusLabel}
                  </span>
                </div>
                <div className="text-sm font-black text-navy mt-1">
                  {clinicData.workingHours.display}
                </div>
                <div className="text-xs text-slateText mt-1">
                  {clinicData.workingHours.daysNote}
                </div>
              </div>

              {/* Landmarks */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-cream border border-clinicBorder">
                  <div className="w-8 h-8 rounded-xl bg-white border border-clinicBorder flex items-center justify-center text-turquoise shrink-0 shadow-xs">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slateText font-medium">العلامة المميزة:</div>
                    <div className="text-sm font-bold text-navy mt-0.5">بجوار حلواني لي لودي</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-cream border border-clinicBorder">
                  <div className="w-8 h-8 rounded-xl bg-white border border-clinicBorder flex items-center justify-center text-navy shrink-0 shadow-xs">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slateText font-medium">الشارع الرئيسي:</div>
                    <div className="text-sm font-bold text-navy mt-0.5">شارع مسجد سيدي بشر</div>
                  </div>
                </div>
              </div>

              {/* Copy address button */}
              <button
                onClick={handleCopyAddress}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-dashed border-clinicBorder hover:border-turquoise text-xs font-bold text-slateText hover:text-navy hover:bg-mint/30 transition-colors mb-6"
                aria-label="نسخ نص العنوان كاملاً"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-turquoise" />
                    <span className="text-turquoise">تم نسخ العنوان بنجاح!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slateText" />
                    <span>نسخ العنوان النصي</span>
                  </>
                )}
              </button>
            </div>

            {/* Main Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-clinicBorder">
              <a
                href={clinicData.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 bg-navy hover:bg-navy-light text-white py-3.5 px-4 rounded-xl font-bold text-sm shadow-md transition-all group"
              >
                <Navigation className="w-4 h-4 text-turquoise group-hover:scale-110 transition-transform" />
                <span>افتح خرائط Google</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>

              <a
                href={clinicData.phoneBooking.telLink}
                className="w-full flex items-center justify-center gap-2.5 bg-white hover:bg-cream text-navy border border-clinicBorder hover:border-navy/30 py-3.5 px-4 rounded-xl font-bold text-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-turquoise" />
                <span>اتصل بالعيادة</span>
                <span className="dir-ltr text-xs font-mono font-bold text-slateText">({clinicData.phoneBooking.display})</span>
              </a>

              {onOpenMapScreenshot && (
                <button
                  type="button"
                  onClick={onOpenMapScreenshot}
                  className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-turquoise hover:text-turquoise-hover pt-1 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>معاينة خريطة المسار ونقطة الوصول</span>
                </button>
              )}
            </div>

          </div>

          {/* Interactive Map & Route Preview Frame (Takes 7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-clinicBorder shadow-soft overflow-hidden flex flex-col min-h-[380px] sm:min-h-[460px]">
            
            {/* Map Frame Header */}
            <div className="p-4 bg-cream border-b border-clinicBorder flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-turquoise" />
                <span className="text-xs sm:text-sm font-bold text-navy">خريطة الموقع المباشرة</span>
              </div>
              <a
                href={clinicData.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-turquoise hover:underline font-semibold flex items-center gap-1"
              >
                <span>فتح في تطبيق الخرائط</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Map Embed Container */}
            <div className="relative flex-grow w-full bg-[#E5E3DF] overflow-hidden">
              <iframe
                title="موقع عيادة د. سامح عمارة على الخريطة"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3411.3932857416353!2d29.9996588!3d31.2700044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f5c53198889999%3A0x8ihjUhj9X1xV7pDi8!2z2LTYp9ix2Lkg2YXYs9is2K8g2LPZitiv2Yog2KjYtNix2Iwg2KfZhNil2LPZg9mG2K_YsdmK2Kk!5e0!3m2!1sar!2seg!4v1710000000000!5m2!1sar!2seg"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '340px' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full object-cover"
              />

              {/* Floating Map Overlay Helper Card */}
              <div className="absolute bottom-4 right-4 left-4 sm:left-auto sm:max-w-xs bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-elevated border border-clinicBorder text-right">
                <div className="flex items-center gap-2 text-xs font-bold text-navy">
                  <MapPin className="w-4 h-4 text-turquoise shrink-0" />
                  <span>د. {clinicData.doctorName} — عيادة الكلى</span>
                </div>
                <div className="text-[11px] text-slateText mt-1">
                  {clinicData.fullAddress}
                </div>
                <div className="mt-1 text-[11px] font-semibold text-turquoise">
                  مواعيد العيادة: {clinicData.workingHours.short}
                </div>
                <div className="mt-2 pt-2 border-t border-clinicBorder/60 flex items-center justify-between">
                  <span className="text-[10px] text-slateText-muted font-mono dir-ltr">31.2700° N, 30.0018° E</span>
                  <a
                    href={clinicData.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold text-navy hover:text-turquoise"
                  >
                    بدء المسار
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
