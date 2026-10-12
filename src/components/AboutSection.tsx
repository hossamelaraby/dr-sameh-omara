import React from 'react';
import { UserCheck, ShieldCheck, HeartHandshake, PhoneCall } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const AboutSection: React.FC = () => {
  const { data: clinicData } = useClinic();

  return (
    <section id="about" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-right">
          <div className="inline-flex items-center gap-2 text-turquoise text-sm font-bold mb-2">
            <span className="w-2 h-2 rounded-full bg-turquoise" />
            <span>نبذة مهنية</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-navy tracking-tight font-sans">
            عن الدكتور {clinicData.doctorName}
          </h2>
          <p className="text-slateText text-base sm:text-lg mt-3 leading-relaxed">
            الالتزام بالأمانة الطبية وتقديم رعاية تخصصية قائمة على الدقة العلمية والاهتمام المباشر بكل حالة.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Text Card (8 cols) */}
          <div className="lg:col-span-8 bg-cream p-6 sm:p-8 md:p-10 rounded-3xl border border-clinicBorder shadow-soft space-y-6 text-right">
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white border border-clinicBorder flex items-center justify-center shrink-0 text-turquoise shadow-sm">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-navy">
                  المؤهل والصفة المعتمدة
                </h3>
                <p className="text-slateText text-sm sm:text-base mt-2 leading-relaxed">
                  الدكتور <strong className="text-navy font-semibold">{clinicData.doctorName}</strong> حاصل على درجة <strong className="text-navy font-semibold">الدكتوراه</strong> وهو <strong className="text-navy font-semibold">{clinicData.specialtyTag}</strong>. يكرّس خبرته الطبية لخدمة المرضى بالإسكندرية عبر تقديم استشارات طبية متخصصة ومتابعة مستمرة لصحة الكلى وفق أحدث البروتوكولات الطبية المعتمدة.
                </p>
              </div>
            </div>

            <div className="border-t border-clinicBorder/60 pt-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white border border-clinicBorder flex items-center justify-center shrink-0 text-navy shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-navy">
                  منهج الرعاية والمتابعة
                </h3>
                <p className="text-slateText text-sm sm:text-base mt-2 leading-relaxed">
                  تقوم الرعاية في العيادة على الفهم الدقيق للتاريخ المرضي لكل مراجع، وتوضيح الخطة الطبية بأسلوب هادئ ومطمئن يراعي الحالة الصحية والنفسية للمريض وأسرته. نؤمن بأن الاستماع الصادق للمريض وتكامل المتابعة الدورية هما حجر الأساس للحفاظ على كفاءة الكلى واستقرار الصحة العامة.
                </p>
              </div>
            </div>

            <div className="border-t border-clinicBorder/60 pt-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white border border-clinicBorder flex items-center justify-center shrink-0 text-gold shadow-sm">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-navy">
                  خدمة مراجعي الإسكندرية والمناطق المجاورة
                </h3>
                <p className="text-slateText text-sm sm:text-base mt-2 leading-relaxed">
                  تقع العيادة بموقع يسهل الوصول إليه في {clinicData.fullAddress}، مع إتاحة قنوات تواصل مباشرة ومرنة للحجز والاستفسار للتيسير على المرضى ومرافقيهم.
                </p>
              </div>
            </div>

          </div>

          {/* Quick Action Side Card (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            
            <div className="bg-navy text-white p-6 sm:p-8 rounded-3xl shadow-elevated text-right relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-turquoise/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-turquoise mb-4">
                <PhoneCall className="w-5 h-5" />
              </div>

              <h4 className="text-lg sm:text-xl font-bold text-white mb-2">
                تواصل مباشر مع العيادة
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                فريق العيادة جاهز للرد على استفساراتكم بخصوص المواعيد ({clinicData.workingHours.short}) والفحوصات المطلوبة مسبقاً.
              </p>

              <div className="space-y-3">
                <a
                  href={clinicData.phoneBooking.telLink}
                  className="w-full flex items-center justify-between bg-white text-navy hover:bg-cream px-4 py-3 rounded-xl font-bold text-sm transition-colors shadow-sm"
                >
                  <span>اتصل بالعيادة</span>
                  <span className="dir-ltr font-mono text-xs text-navy font-bold">{clinicData.phoneBooking.display}</span>
                </a>

                <a
                  href={clinicData.whatsapp.waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between bg-[#1ebe5d] hover:bg-[#128C7E] text-white px-4 py-3 rounded-xl font-bold text-sm transition-colors shadow-sm"
                >
                  <span>راسل عبر واتساب</span>
                  <span className="dir-ltr font-mono text-xs">{clinicData.whatsapp.display}</span>
                </a>
              </div>

            </div>

            {/* Credential summary box */}
            <div className="bg-mint-subtle p-5 rounded-2xl border border-mint-border text-right">
              <div className="text-xs text-slateText font-medium">البيانات الرسمية المعتمدة:</div>
              <div className="text-sm font-bold text-navy mt-1">{clinicData.fullName}</div>
              <div className="text-xs text-turquoise font-semibold mt-0.5">{clinicData.title}</div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
