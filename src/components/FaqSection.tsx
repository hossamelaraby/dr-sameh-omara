import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, MessageSquare } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const FaqSection: React.FC = () => {
  const { data: clinicData } = useClinic();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-right mb-12">
          <div className="inline-flex items-center gap-2 text-turquoise text-sm font-bold mb-2">
            <span className="w-2 h-2 rounded-full bg-turquoise" />
            <span>معلومات تهمك</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-navy tracking-tight font-sans">
            الأسئلة الشائعة
          </h2>
          <p className="text-slateText text-base sm:text-lg mt-3 leading-relaxed">
            إجابات واضحة ومباشرة عن الاستفسارات الأكثر تكراراً للمراجعين.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {clinicData.faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all ${
                  isOpen
                    ? 'border-turquoise/40 bg-cream shadow-soft'
                    : 'border-clinicBorder bg-white hover:border-clinicBorder/80'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  className="w-full p-5 sm:p-6 text-right flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-turquoise rounded-2xl"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-navy text-base sm:text-lg font-sans flex items-center gap-3">
                    <HelpCircle className={`w-5 h-5 shrink-0 transition-colors ${isOpen ? 'text-turquoise' : 'text-slateText-muted'}`} />
                    <span>{faq.question}</span>
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      isOpen ? 'bg-turquoise text-white rotate-180' : 'bg-cream text-slateText'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-right border-t border-clinicBorder/40 pt-4 text-slateText text-sm sm:text-base leading-relaxed">
                    <p>{faq.answer}</p>
                    {index === 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        <a
                          href={clinicData.phoneBooking.telLink}
                          className="inline-flex items-center gap-1.5 py-1.5 px-3 bg-navy text-white rounded-lg text-xs font-bold"
                        >
                          <Phone className="w-3 h-3 text-turquoise" />
                          <span>اتصال: {clinicData.phoneBooking.display}</span>
                        </a>
                        <a
                          href={clinicData.whatsapp.waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 py-1.5 px-3 bg-[#25D366] text-white rounded-lg text-xs font-bold"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>واتساب: {clinicData.whatsapp.display}</span>
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
