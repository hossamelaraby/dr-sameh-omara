/**
 * Clinic Data & Constants
 * جميع البيانات المعتمدة الخاصة بالدكتور سامح عمارة وعيادته
 * مصممة في ملف إعدادات موحد لتسهيل التعديل والصيانة لاحقاً
 */

export interface ClinicConfig {
  doctorName: string;
  doctorPrefix: string;
  fullName: string;
  title: string;
  subTitle: string;
  specialtyTag: string;
  locationCity: string;
  locationArea: string;
  fullAddress: string;
  googleMapsUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phoneBooking: {
    raw: string;
    display: string;
    telLink: string;
    description: string;
  };
  whatsapp: {
    raw: string;
    display: string;
    international: string;
    waLink: string;
    prefilledText: string;
  };
  workingHours: {
    display: string;
    short: string;
    startHour24: number;
    endHour24: number;
    daysNote: string;
  };
  images: {
    doctorTransparent: string;
    mapScreenshot: string;
  };
  trustPillars: {
    id: string;
    title: string;
    subtitle: string;
    icon: string;
  }[];
  bookingSteps: {
    step: string;
    title: string;
    description: string;
    actionLabel?: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  medicalDisclaimer: string;
}

export const clinicData: ClinicConfig = {
  doctorName: "سامح عمارة",
  doctorPrefix: "د.",
  fullName: "د. سامح عمارة",
  title: "دكتوراه واستشاري أمراض وزراعة الكلى",
  subTitle: "رعاية تخصصية متقدمة لصحة الكلى ومتابعة حالات الزراعة بالإسكندرية",
  specialtyTag: "استشاري أمراض وزراعة الكلى",
  locationCity: "الإسكندرية",
  locationArea: "سيدي بشر",
  fullAddress: "الإسكندرية — شارع مسجد سيدي بشر — بجوار حلواني لي لودي",
  googleMapsUrl: "https://maps.app.goo.gl/8ihjUhj9X1xV7pDi8?g_st=iw",
  coordinates: {
    lat: 31.270000,
    lng: 30.001848
  },
  phoneBooking: {
    raw: "01127744174",
    display: "01127744174",
    telLink: "tel:01127744174",
    description: "للحجز والاستعلام"
  },
  whatsapp: {
    raw: "01555530649",
    display: "01555530649",
    international: "201555530649",
    waLink: "https://wa.me/201555530649?text=" + encodeURIComponent("السلام عليكم د. سامح، أود الاستفسار بخصوص حجز موعد في العيادة."),
    prefilledText: "السلام عليكم د. سامح، أود الاستفسار بخصوص حجز موعد في العيادة."
  },
  workingHours: {
    display: "5:00 مساءً – 7:00 مساءً",
    short: "5:00 م – 7:00 م",
    startHour24: 17,
    endHour24: 19,
    daysNote: "يومياً (يُرجى الحجز المسبق للتنسيق)"
  },
  images: {
    doctorTransparent: "/doctor_sameh_transparent.png",
    mapScreenshot: "/location_map_screenshot.png"
  },
  trustPillars: [
    {
      id: "phd",
      title: "دكتوراه",
      subtitle: "في أمراض وزراعة الكلى",
      icon: "Award"
    },
    {
      id: "consultant-nephrology",
      title: "استشاري أمراض الكلى",
      subtitle: "تشخيص ومتابعة دقيقة",
      icon: "Activity"
    },
    {
      id: "consultant-transplant",
      title: "استشاري زراعة الكلى",
      subtitle: "متابعة متخصصة قبل وبعد الزراعة",
      icon: "HeartHandshake"
    },
    {
      id: "alexandria",
      title: "الإسكندرية — سيدي بشر",
      subtitle: "موقع حيوي وسهل الوصول",
      icon: "MapPin"
    }
  ],
  bookingSteps: [
    {
      step: "01",
      title: "اتصل أو راسل واتساب",
      description: "تواصل مع فريق العيادة مباشرة عبر الهاتف أو محادثة واتساب السريعة.",
      actionLabel: "اتصال أو واتساب"
    },
    {
      step: "02",
      title: "استفسر عن الموعد والتفاصيل",
      description: "احصل على تأكيد فوري لتوقيت الزيارة (مواعيد العيادة: 5 - 7 مساءً) وتفاصيل الفحوصات.",
      actionLabel: "تأكيد الموعد"
    },
    {
      step: "03",
      title: "توجّه إلى العيادة عبر الخريطة",
      description: "اتبع اتجاهات خرائط Google للوصول إلى شارع مسجد سيدي بشر بجوار حلواني لي لودي.",
      actionLabel: "موقع العيادة"
    }
  ],
  faqs: [
    {
      question: "ما هي مواعيد العمل في العيادة؟",
      answer: "مواعيد استقبال واستشارات العيادة يومياً من الساعة 5:00 مساءً حتى الساعة 7:00 مساءً. نرجو الاتصال المسبق هاتفياً على 01127744174 لتأكيد الحجز وتنسيق الموعد بدقة."
    },
    {
      question: "كيف يمكنني حجز موعد في العيادة؟",
      answer: "للحجز والاستعلام، يمكنك الاتصال مباشرة على الرقم 01127744174 أو إرسال رسالة عبر تطبيق واتساب على الرقم 01555530649 لتنسيق أقرب موعد متاح."
    },
    {
      question: "أين تقع عيادة د. سامح عمارة؟",
      answer: "تقع العيادة في الإسكندرية، شارع مسجد سيدي بشر، بجوار حلواني لي لودي. يمكنك استخدام رابط خرائط Google المتاح بالموقع للوصول بسهولة بخط سير مباشر."
    },
    {
      question: "ما هي وسيلة الاستفسار الأسرع إذا كان لدي سؤال مستعجل؟",
      answer: "يمكنك الاتصال المباشر على هاتف العيادة 01127744174، أو إرسال رسالة تفصيلية على رقم الواتساب 01555530649 وسيتم الرد عليك في أقرب وقت."
    },
    {
      question: "هل يتم تأكيد الحجز إلكترونياً تلقائياً من الموقع؟",
      answer: "الموقع واجهة تعريفية معتمدة للتواصل المباشر؛ يتم تأكيد الموعد وكافة التفاصيل عبر الاتصال الهاتفي أو رسائل الواتساب مع العيادة مباشرة لضمان الدقة وتحديد التوقيت الملائم."
    }
  ],
  medicalDisclaimer: "محتوى الموقع للتعريف بالعيادة ولا يغني عن الاستشارة الطبية المباشرة مع الطبيب المختص. في حالات الطوارئ الطبية العاجلة، يُرجى التوجه فوراً إلى أقرب مستشفى أو قسم طوارئ."
};

/**
 * دالة حساب حالة العيادة اللحظية (مفتوح الآن / مغلق الآن)
 * تحسب التوقيت الفعلي بتوقيت مصر (Africa/Cairo)
 */
export function getClinicStatus(): {
  isOpen: boolean;
  statusLabel: string;
  statusDetails: string;
  badgeColorClass: string;
} {
  try {
    const now = new Date();
    // الحصول على الساعة الحالية بتوقيت مصر
    const cairoTimeFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Africa/Cairo',
      hour12: false,
      hour: 'numeric',
      minute: 'numeric',
    });
    
    const parts = cairoTimeFormatter.formatToParts(now);
    const hourPart = parts.find(p => p.type === 'hour');
    const minutePart = parts.find(p => p.type === 'minute');
    
    const currentHour = hourPart ? parseInt(hourPart.value, 10) : now.getHours();
    const currentMinute = minutePart ? parseInt(minutePart.value, 10) : now.getMinutes();
    const totalMinutes = currentHour * 60 + currentMinute;
    
    // من 5 مساءً (17:00 = 1020 دقيقة) إلى 7 مساءً (19:00 = 1140 دقيقة)
    const openMinutes = 17 * 60;
    const closeMinutes = 19 * 60;
    
    const isOpen = totalMinutes >= openMinutes && totalMinutes < closeMinutes;
    
    if (isOpen) {
      return {
        isOpen: true,
        statusLabel: "مفتوح الآن",
        statusDetails: "نستقبلكم حتى 7:00 م (المواعيد 5 - 7 م)",
        badgeColorClass: "bg-emerald-500",
      };
    } else {
      return {
        isOpen: false,
        statusLabel: "مغلق الآن",
        statusDetails: "المواعيد: 5:00 م – 7:00 م",
        badgeColorClass: "bg-amber-500",
      };
    }
  } catch {
    return {
      isOpen: false,
      statusLabel: "مواعيد العيادة",
      statusDetails: "5:00 م – 7:00 م",
      badgeColorClass: "bg-turquoise",
    };
  }
}
