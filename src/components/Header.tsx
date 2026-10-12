import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Menu, X, Clock } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const Header: React.FC = () => {
  const { data: clinicData, currentStatus } = useClinic();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'الرئيسية', href: '#hero' },
    { name: 'عن الطبيب', href: '#about' },
    { name: 'التخصص', href: '#specialty' },
    { name: 'المواعيد والحجز', href: '#booking' },
    { name: 'الموقع والوصول', href: '#location' },
    { name: 'الأسئلة الشائعة', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft py-3 border-b border-clinicBorder'
          : 'bg-cream/90 backdrop-blur-sm py-4 border-b border-clinicBorder/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Doctor Title */}
          <a href="#hero" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-turquoise rounded-lg p-1">
            <div className="w-11 h-11 rounded-xl bg-navy flex items-center justify-center text-white shadow-md group-hover:bg-navy-light transition-colors">
              <span className="font-bold text-xl tracking-tight font-sans text-gold">س</span>
              <span className="text-turquoise text-base font-bold">ع</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-xl sm:text-2xl font-bold text-navy tracking-tight group-hover:text-turquoise transition-colors font-sans">
                {clinicData.fullName}
              </span>
              <span className="text-xs sm:text-sm text-slateText font-medium">
                {clinicData.specialtyTag}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slateText hover:text-navy hover:bg-mint/60 transition-all focus:outline-none focus:ring-2 focus:ring-turquoise"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions & Live Open/Closed Status */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Live Open / Closed Status Badge */}
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
              currentStatus.isOpen 
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}>
              <span className={`w-2 h-2 rounded-full ${currentStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span>{currentStatus.statusLabel}</span>
              <span className="text-gray-300">|</span>
              <span className="font-normal">{clinicData.workingHours.short}</span>
            </div>

            <a
              href={clinicData.phoneBooking.telLink}
              className="inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-turquoise"
              aria-label={`اتصل للحجز والاستعلام: ${clinicData.phoneBooking.display}`}
            >
              <Phone className="w-4 h-4 text-turquoise" />
              <span>احجز بالاتصال</span>
              <span className="dir-ltr text-xs bg-navy-light/80 px-2 py-0.5 rounded-md font-mono text-gray-200">
                {clinicData.phoneBooking.display}
              </span>
            </a>
          </div>

          {/* Mobile Menu & Quick Status */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Mini Status Pill */}
            <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
              currentStatus.isOpen 
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${currentStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span>{currentStatus.statusLabel}</span>
            </div>

            <a
              href={clinicData.phoneBooking.telLink}
              className="inline-flex items-center gap-1.5 bg-navy text-white px-3 py-2 rounded-lg text-xs font-bold shadow-sm"
              aria-label="اتصال سريع بالعيادة"
            >
              <Phone className="w-3.5 h-3.5 text-turquoise" />
              <span>اتصال</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-navy hover:bg-mint transition-colors focus:outline-none focus:ring-2 focus:ring-turquoise"
              aria-expanded={mobileMenuOpen}
              aria-label="فتح القائمة الرئيسية"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-clinicBorder bg-white/95 rounded-2xl p-4 shadow-elevated">
            
            {/* Working Hours Info Box */}
            <div className="mb-3 p-3 rounded-xl bg-cream border border-clinicBorder flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slateText">
                <Clock className="w-4 h-4 text-turquoise" />
                <span>المواعيد: <strong>{clinicData.workingHours.display}</strong></span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                currentStatus.isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {currentStatus.statusLabel}
              </span>
            </div>

            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-base font-semibold text-navy hover:bg-mint/80 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              
              {/* Regular Navigation */}

              <div className="pt-3 mt-2 border-t border-clinicBorder flex flex-col gap-2">
                <a
                  href={clinicData.phoneBooking.telLink}
                  className="w-full flex items-center justify-between bg-navy text-white px-4 py-3 rounded-xl font-bold text-sm shadow-sm"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-turquoise" />
                    <span>اتصل للحجز والاستعلام</span>
                  </span>
                  <span className="dir-ltr font-mono text-xs">{clinicData.phoneBooking.display}</span>
                </a>
                <a
                  href={clinicData.whatsapp.waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between bg-[#25D366] text-white px-4 py-3 rounded-xl font-bold text-sm shadow-sm"
                >
                  <span className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>محادثة واتساب</span>
                  </span>
                  <span className="dir-ltr font-mono text-xs">{clinicData.whatsapp.display}</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
