import React from 'react';
import { Phone, CalendarCheck2, MapPinned, MessageSquare, AlertCircle } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const BookingSteps: React.FC = () => {
  const { data: clinicData } = useClinic();

  return (
    <section id="booking" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-right">
          <div className="inline-flex items-center gap-2 text-turquoise text-sm font-bold mb-2">
            <span className="w-2 h-2 rounded-full bg-turquoise" />
            <span>تنظيم الزيارة</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-navy tracking-tight font-sans">
            خطوات الحجز والاستفسار
          </h2>
          <p className="text-slateText text-base sm:text-lg mt-3 leading-relaxed">
            ثلاث خطوات مباشرة وواضحة لتنسيق موعدك مع عيادة د. {clinicData.doctorName} بكل يسر.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          
          {/* Step 1 */}
          <div className="relative bg-cream p-7 sm:p-8 rounded-3xl border border-clinicBorder flex flex-col text-right group hover:border-turquoise/50 transition-colors shadow-soft">
            <div className="flex items-center justify-between mb-6">
              <span className="text-3xl font-black text-turquoise/30 font-sans group-hover:text-turquoise transition-colors">
                01
              </span>
              <div className="w-12 h-12 rounded-2xl bg-white border border-clinicBorder flex items-center justify-center text-navy shadow-sm">
                <Phone className="w-5 h-5 text-turquoise" />
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-navy mb-2">
              اتصل أو أرسل واتساب
            </h3>
            <p className="text-slateText text-sm sm:text-base leading-relaxed mb-6 flex-grow">
              تواصل مباشرة مع العيادة عبر الاتصال الهاتفي على <span className="dir-ltr font-mono font-bold text-navy">{clinicData.phoneBooking.display}</span> أو مراسلة الواتساب على <span className="dir-ltr font-mono font-bold text-navy">{clinicData.whatsapp.display}</span>.
            </p>

            <div className="flex gap-2">
              <a
                href={clinicData.phoneBooking.telLink}
                className="flex-1 py-2.5 px-3 bg-white hover:bg-navy hover:text-white text-navy border border-clinicBorder rounded-xl text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-turquoise" />
                <span>اتصال هاتف</span>
              </a>
              <a
                href={clinicData.whatsapp.waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 bg-white hover:bg-[#25D366] hover:text-white text-navy border border-clinicBorder rounded-xl text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366] group-hover:text-white" />
                <span>واتساب</span>
              </a>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative bg-cream p-7 sm:p-8 rounded-3xl border border-clinicBorder flex flex-col text-right group hover:border-turquoise/50 transition-colors shadow-soft">
            <div className="flex items-center justify-between mb-6">
              <span className="text-3xl font-black text-turquoise/30 font-sans group-hover:text-turquoise transition-colors">
                02
              </span>
              <div className="w-12 h-12 rounded-2xl bg-white border border-clinicBorder flex items-center justify-center text-navy shadow-sm">
                <CalendarCheck2 className="w-5 h-5 text-turquoise" />
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-navy mb-2">
              استفسر عن الموعد والتفاصيل
            </h3>
            <p className="text-slateText text-sm sm:text-base leading-relaxed mb-6 flex-grow">
              حدد التوقيت المناسب لزيارتك وفق جدول العيادة (مواعيد الاستقبال: <span className="font-bold text-navy">{clinicData.workingHours.display}</span>)، وتعرّف على أي فحوصات سابقة يُفضل إحضارها.
            </p>

            <div className="py-2.5 px-3 bg-white/70 rounded-xl text-xs text-slateText font-medium text-center border border-clinicBorder">
              تنسيق فوري ودقيق مع السكرتارية
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative bg-cream p-7 sm:p-8 rounded-3xl border border-clinicBorder flex flex-col text-right group hover:border-turquoise/50 transition-colors shadow-soft">
            <div className="flex items-center justify-between mb-6">
              <span className="text-3xl font-black text-turquoise/30 font-sans group-hover:text-turquoise transition-colors">
                03
              </span>
              <div className="w-12 h-12 rounded-2xl bg-white border border-clinicBorder flex items-center justify-center text-navy shadow-sm">
                <MapPinned className="w-5 h-5 text-turquoise" />
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-navy mb-2">
              توجّه إلى العيادة عبر الخريطة
            </h3>
            <p className="text-slateText text-sm sm:text-base leading-relaxed mb-6 flex-grow">
              تفضل بالحضور في الموعد المتفق عليه إلى مقر العيادة: <span className="font-semibold text-navy">{clinicData.fullAddress}</span>.
            </p>

            <a
              href={clinicData.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 bg-navy hover:bg-navy-light text-white rounded-xl text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <MapPinned className="w-3.5 h-3.5 text-turquoise" />
              <span>فتح الاتجاهات على الخريطة</span>
            </a>
          </div>

        </div>

        {/* Direct communication notice */}
        <div className="mt-8 bg-mint-subtle border border-mint-border rounded-2xl p-4 sm:p-5 flex items-center gap-3 text-right">
          <AlertCircle className="w-5 h-5 text-turquoise shrink-0" />
          <p className="text-xs sm:text-sm text-navy leading-relaxed font-medium">
            <strong>ملاحظة هامة:</strong> الموقع مخصص للتعريف والتيسير؛ ولا يحتوي على حجز آلي بدون تأكيد. يتم تأكيد كافة المواعيد والتفاصيل حصراً عبر التواصل الهاتفي المباشر أو محادثة الواتساب مع العيادة.
          </p>
        </div>

      </div>
    </section>
  );
};
