import React from 'react';
import { Stethoscope, HeartPulse, ClipboardList, Info, Phone } from 'lucide-react';
import { clinicData } from '../config/clinicData';

export const SpecialtySection: React.FC = () => {
  return (
    <section id="specialty" className="py-16 md:py-24 bg-cream relative border-t border-clinicBorder">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-right">
          <div className="inline-flex items-center gap-2 text-turquoise text-sm font-bold mb-2">
            <span className="w-2 h-2 rounded-full bg-turquoise" />
            <span>مجال التخصص الطبي</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-navy tracking-tight font-sans">
            أمراض وزراعة الكلى
          </h2>
          <p className="text-slateText text-base sm:text-lg mt-3 leading-relaxed">
            استشارات طبية متخصصة ومتابعة دقيقة لصحة الكلى برؤية استشارية متعمقة.
          </p>
        </div>

        {/* Informative Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: Nephrology consultations */}
          <div className="bg-white p-7 rounded-3xl border border-clinicBorder shadow-soft hover:shadow-elevated transition-all flex flex-col text-right">
            <div className="w-12 h-12 rounded-2xl bg-mint text-turquoise flex items-center justify-center mb-5 shrink-0">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-navy mb-3">
              استشارات أمراض الكلى
            </h3>
            <p className="text-slateText text-sm sm:text-base leading-relaxed flex-grow">
              تقييم استشاري شامل لكفاءة ووظائف الكلى، ودراسة الفحوصات والتحاليل المخبرية والأشعة، ومتابعة الحالات التي تتطلب إشرافاً طبياً تخصصياً مستمراً.
            </p>
          </div>

          {/* Card 2: Kidney Transplant */}
          <div className="bg-white p-7 rounded-3xl border border-clinicBorder shadow-soft hover:shadow-elevated transition-all flex flex-col text-right">
            <div className="w-12 h-12 rounded-2xl bg-turquoise/10 text-turquoise flex items-center justify-center mb-5 shrink-0">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-navy mb-3">
              استشارات وزراعة الكلى
            </h3>
            <p className="text-slateText text-sm sm:text-base leading-relaxed flex-grow">
              متابعة تخصصية دقيقة للمرضى في مراحل التقييم قبل الزراعة، والمتابعة الدورية بعد إجراء عمليات زراعة الكلى للاطمئنان على استقرار الحالة ووظائف الكلى المزروعة.
            </p>
          </div>

          {/* Card 3: Personalized Follow-up */}
          <div className="bg-white p-7 rounded-3xl border border-clinicBorder shadow-soft hover:shadow-elevated transition-all flex flex-col text-right">
            <div className="w-12 h-12 rounded-2xl bg-navy/5 text-navy flex items-center justify-center mb-5 shrink-0">
              <ClipboardList className="w-6 h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-navy mb-3">
              المتابعة التخصصية المستمرة
            </h3>
            <p className="text-slateText text-sm sm:text-base leading-relaxed flex-grow">
              تنظيم مواعيد الفحوصات الدورية والإرشاد الطبي المستمر لمساعدة المريض على فهم حالته الصحية والتعامل الآمن مع المتغيرات اليومية بصورة واعية ومطمئنة.
            </p>
          </div>

        </div>

        {/* Clarification Callout & Contact prompt */}
        <div className="bg-white rounded-3xl border border-clinicBorder p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-soft text-right">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold-dark flex items-center justify-center shrink-0 mt-1">
              <Info className="w-5 h-5 text-gold-dark" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-navy">
                هل لديك استفسار حول مناسبة الاستشارة لحالتك؟
              </h4>
              <p className="text-slateText text-sm mt-1 leading-relaxed max-w-2xl">
                نشجعكم على الاتصال المباشر بالعيادة للاستفسار عن تفاصيل الحالة والمواعيد المتاحة، وإفادتكم بأي تحاليل أو تقارير طبية سابقة يُفضل إحضارها معكم.
              </p>
            </div>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <a
              href={clinicData.phoneBooking.telLink}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy-light text-white px-5 py-3 rounded-xl font-bold text-sm shadow-md transition-all"
            >
              <Phone className="w-4 h-4 text-turquoise" />
              <span>استفسر الآن هاتفياً</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
