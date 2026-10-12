import React from 'react';
import { Phone, MessageSquare, MapPin, CheckCircle2, ArrowLeft, Clock } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const Hero: React.FC = () => {
  const { data: clinicData, currentStatus } = useClinic();

  return (
    <section id="hero" className="relative pt-24 sm:pt-28 md:pt-32 pb-12 md:pb-20 overflow-hidden bg-gradient-to-b from-mint-subtle/70 via-cream to-cream">
      
      {/* Decorative ambient background curves */}
      <div className="absolute top-0 right-0 -mr-40 -mt-20 w-96 h-96 rounded-full bg-turquoise/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 -ml-40 w-96 h-96 rounded-full bg-navy/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Text Content Column (Takes 7 cols on desktop - on the right in RTL) */}
          <div className="lg:col-span-7 flex flex-col text-right">
            
            {/* Specialty Badge & Working Hours Status */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <div className="inline-flex items-center gap-2 bg-white border border-clinicBorder px-3.5 py-1.5 rounded-full shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-turquoise animate-pulse" />
                <span className="text-xs sm:text-sm font-bold text-navy">
                  {clinicData.specialtyTag}
                </span>
                <span className="text-clinicBorder">|</span>
                <span className="text-xs sm:text-sm text-gold font-semibold">
                  دكتوراه
                </span>
              </div>

              {/* Dynamic Open / Closed Status Pill */}
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border shadow-xs ${
                currentStatus.isOpen
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-amber-50 text-amber-900 border-amber-300'
              }`}>
                <span className={`w-2 h-2 rounded-full ${currentStatus.isOpen ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`} />
                <span className="font-bold">{currentStatus.statusLabel}</span>
                <span className="text-gray-300">|</span>
                <Clock className="w-3.5 h-3.5 opacity-70" />
                <span className="font-medium">{clinicData.workingHours.short}</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-black text-navy leading-[1.25] sm:leading-[1.2] mb-4 font-sans tracking-tight">
              رعاية متخصصة وموثوقة <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-navy to-turquoise">
                لصحة الكلى
              </span>{' '}
              بالإسكندرية
            </h1>

            {/* Sub-headline / Dignified paragraph */}
            <p className="text-base sm:text-lg text-slateText leading-relaxed mb-6 sm:mb-8 max-w-2xl font-normal">
              الموقع التعريفي الرسمي للدكتور <strong className="text-navy font-bold">{clinicData.doctorName}</strong>، {clinicData.title}. نوفر استشارات دقيقة ومتابعة تخصصية متكاملة لصحة وسلامة الكلى ورعاية ما قبل وبعد عمليات الزراعة بأعلى معايير الخبرة والأمانة الطبية.
            </p>

            {/* Working Hours Highlight Bar */}
            <div className="mb-6 p-4 rounded-2xl bg-white border border-clinicBorder shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-right">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-mint flex items-center justify-center text-turquoise shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slateText font-medium">مواعيد استقبال واستشارات العيادة:</div>
                  <div className="text-sm font-bold text-navy mt-0.5">
                    يومياً من <span className="text-turquoise">{clinicData.workingHours.display}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                  currentStatus.isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {currentStatus.statusDetails}
                </span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8">
              
              {/* Phone CTA */}
              <a
                href={clinicData.phoneBooking.telLink}
                className="flex items-center justify-center gap-3 bg-navy hover:bg-navy-light text-white px-6 py-4 rounded-2xl font-bold text-base shadow-elevated transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-navy/20 group"
                aria-label={`اتصل للحجز والاستعلام: ${clinicData.phoneBooking.display}`}
              >
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Phone className="w-4 h-4 text-turquoise" />
                </div>
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-sm font-bold">اتصل للحجز والاستعلام</span>
                  <span className="dir-ltr text-xs text-turquoise font-mono font-bold tracking-wider">
                    {clinicData.phoneBooking.display}
                  </span>
                </div>
              </a>

              {/* WhatsApp CTA */}
              <a
                href={clinicData.whatsapp.waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-[#1ebe5d] hover:bg-[#128C7E] text-white px-6 py-4 rounded-2xl font-bold text-base shadow-elevated transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-[#25D366]/20 group"
                aria-label={`تواصل عبر واتساب: ${clinicData.whatsapp.display}`}
              >
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-sm font-bold">تواصل عبر واتساب</span>
                  <span className="dir-ltr text-xs text-white/90 font-mono font-medium tracking-wider">
                    {clinicData.whatsapp.display}
                  </span>
                </div>
              </a>

            </div>

            {/* Secondary Link: Google Maps Location Link */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-slateText border-t border-clinicBorder pt-5">
              <a
                href={clinicData.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-navy hover:text-turquoise font-bold transition-colors group"
              >
                <MapPin className="w-4 h-4 text-turquoise group-hover:scale-110 transition-transform" />
                <span>{clinicData.fullAddress}</span>
                <ArrowLeft className="w-3.5 h-3.5 text-slateText group-hover:translate-x-[-2px] transition-transform" />
              </a>
            </div>

            {/* Quick reassurance checkmarks */}
            <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slateText-muted">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-turquoise" />
                <span>المواعيد: {clinicData.workingHours.short}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-turquoise" />
                <span>حجز مباشر وتنسيق شخصي</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-turquoise" />
                <span>رعاية طبية تخصصية متقدمة</span>
              </span>
            </div>

          </div>

          {/* Doctor Portrait Column (Takes 5 cols on desktop - on the left in RTL) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Background architectural frame card */}
              <div className="absolute inset-x-4 bottom-0 top-12 rounded-3xl bg-gradient-to-b from-white to-mint/40 border border-clinicBorder/80 shadow-premium -z-10" />
              
              {/* Subtle top badge framing */}
              <div className="absolute -top-3 right-6 bg-navy text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-20 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                <span>استشاري معتمد</span>
              </div>

              {/* The Doctor's Transparent Photograph */}
              <div className="relative pt-6 px-4 flex items-end justify-center">
                <img
                  src={clinicData.images.doctorTransparent}
                  alt={`د. ${clinicData.doctorName}، استشاري أمراض وزراعة الكلى`}
                  loading="eager"
                  className="w-full h-auto max-h-[440px] sm:max-h-[500px] object-contain object-bottom drop-shadow-[0_15px_25px_rgba(18,48,71,0.18)] select-none transition-transform duration-500 hover:scale-[1.01]"
                />
              </div>

              {/* Nameplate Card at bottom */}
              <div className="relative -mt-6 mx-4 mb-2 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-elevated border border-clinicBorder text-center">
                <div className="font-sans font-black text-navy text-lg sm:text-xl">
                  {clinicData.fullName}
                </div>
                <div className="text-xs sm:text-sm text-turquoise font-bold mt-0.5">
                  {clinicData.title}
                </div>
                <div className="text-[11px] text-slateText mt-1 flex items-center justify-center gap-1 font-medium">
                  <MapPin className="w-3 h-3 text-gold" />
                  <span>{clinicData.fullAddress}</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
