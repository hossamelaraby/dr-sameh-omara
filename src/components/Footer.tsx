import React from 'react';
import { Phone, MessageSquare, MapPin, AlertTriangle, ArrowUp, Clock } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const Footer: React.FC = () => {
  const { data: clinicData } = useClinic();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy text-white pt-16 pb-28 md:pb-16 relative overflow-hidden">
      
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-turquoise via-gold to-navy-light" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/10 text-right">
          
          {/* Col 1: Identity & Specialty (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white">
                <span className="font-bold text-xl text-gold">س</span>
                <span className="text-turquoise text-base font-bold">ع</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-white font-sans block">
                  {clinicData.fullName}
                </span>
                <span className="text-xs sm:text-sm text-turquoise font-semibold block">
                  {clinicData.title}
                </span>
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              عيادة متخصصة لرعاية صحة الكلى ومتابعة حالات الزراعة بالإسكندرية. نلتزم بأعلى معايير الرعاية والأمانة العلمية في خدمة مرضانا.
            </p>

            {/* Working Hours in Footer */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3 text-xs max-w-md">
              <Clock className="w-4 h-4 text-turquoise shrink-0" />
              <div>
                <span className="text-gray-400">مواعيد العيادة: </span>
                <span className="text-white font-bold">{clinicData.workingHours.display}</span>
                <span className="text-gray-400 block text-[11px] mt-0.5">{clinicData.workingHours.daysNote}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs text-gray-400">الموقع الجغرافي:</span>
              <span className="text-xs font-bold text-white">{clinicData.fullAddress}</span>
            </div>
          </div>

          {/* Col 2: Direct Contacts (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-bold text-turquoise uppercase tracking-wider">
              التواصل السريع والحجز
            </h4>

            <div className="space-y-3">
              <a
                href={clinicData.phoneBooking.telLink}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
              >
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-turquoise" />
                  <span className="text-xs text-gray-300">للحجز والاستعلام:</span>
                </div>
                <span className="dir-ltr font-mono font-bold text-sm text-white">{clinicData.phoneBooking.display}</span>
              </a>

              <a
                href={clinicData.whatsapp.waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <span className="text-xs text-gray-300">واتساب العيادة:</span>
                </div>
                <span className="dir-ltr font-mono font-bold text-sm text-white">{clinicData.whatsapp.display}</span>
              </a>

              <a
                href={clinicData.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 text-xs text-gray-300"
              >
                <MapPin className="w-4 h-4 text-turquoise shrink-0 mt-0.5" />
                <span className="leading-relaxed">{clinicData.fullAddress}</span>
              </a>
            </div>
          </div>

          {/* Col 3: Quick Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-turquoise uppercase tracking-wider">
              روابط الصفحة
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#hero" className="hover:text-turquoise transition-colors">الرئيسية</a>
              </li>
              <li>
                <a href="#about" className="hover:text-turquoise transition-colors">عن الطبيب والمؤهلات</a>
              </li>
              <li>
                <a href="#specialty" className="hover:text-turquoise transition-colors">تخصص أمراض وزراعة الكلى</a>
              </li>
              <li>
                <a href="#booking" className="hover:text-turquoise transition-colors">خطوات الحجز والتنسيق</a>
              </li>
              <li>
                <a href="#location" className="hover:text-turquoise transition-colors">موقع العيادة والمواعيد</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-turquoise transition-colors">الأسئلة الشائعة</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Medical Disclaimer Banner */}
        <div className="my-8 p-4 rounded-2xl bg-white/5 border border-white/10 text-right flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            {clinicData.medicalDisclaimer}
          </p>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 pt-4">
          <div className="flex items-center gap-3">
            <span>جميع الحقوق محفوظة © {new Date().getFullYear()} — {clinicData.fullName}</span>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/5"
            aria-label="العودة إلى أعلى الصفحة"
          >
            <span>إلى الأعلى</span>
            <ArrowUp className="w-3.5 h-3.5 text-turquoise" />
          </button>
        </div>

      </div>
    </footer>
  );
};
