import React, { useState } from 'react';
import { useClinic } from '../context/ClinicContext';
import {
  Lock,
  Phone,
  Clock,
  MapPin,
  User,
  Save,
  RotateCcw,
  ExternalLink,
  CheckCircle,
  Copy,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  Eye,
  LogOut,
  Sliders,
  HelpCircle,
  Plus,
  Trash2
} from 'lucide-react';

interface AdminDashboardProps {
  onBackToSite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite }) => {
  const { data, updateData, resetDefaults, statusOverride, setStatusOverride, currentStatus } = useClinic();

  // Authentication State (Default PIN: 1234 or admin2026)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('dr_sameh_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    doctorName: data.doctorName,
    title: data.title,
    specialtyTag: data.specialtyTag,
    fullAddress: data.fullAddress,
    googleMapsUrl: data.googleMapsUrl,
    bookingPhone: data.phoneBooking.raw,
    whatsappPhone: data.whatsapp.raw,
    whatsappText: data.whatsapp.prefilledText,
    hoursDisplay: data.workingHours.display,
    hoursShort: data.workingHours.short,
    startHour: data.workingHours.startHour24,
    endHour: data.workingHours.endHour24,
    daysNote: data.workingHours.daysNote,
    faqs: [...data.faqs],
  });

  const [activeTab, setActiveTab] = useState<'general' | 'hours' | 'contact' | 'location' | 'faqs'>('hours');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const enc = new TextEncoder();
      const hashBuf = await crypto.subtle.digest('SHA-256', enc.encode(pinInput.trim()));
      const hashArr = Array.from(new Uint8Array(hashBuf));
      const hashHex = hashArr.map((b) => b.toString(16).padStart(2, '0')).join('');
      // Hash of the secret password
      if (hashHex === '6051fc84a7a0d74c225fb18a496b09952da5642e60723ecae543298edd7d82d6') {
        setIsAuthenticated(true);
        sessionStorage.setItem('dr_sameh_admin_auth', 'true');
        setPinError(false);
      } else {
        setPinError(true);
      }
    } catch {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('dr_sameh_admin_auth');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanWaRaw = formData.whatsappPhone.trim();
    const intlWa = cleanWaRaw.startsWith('0') ? '20' + cleanWaRaw.slice(1) : cleanWaRaw;

    updateData({
      doctorName: formData.doctorName,
      title: formData.title,
      specialtyTag: formData.specialtyTag,
      fullAddress: formData.fullAddress,
      googleMapsUrl: formData.googleMapsUrl,
      phoneBooking: {
        raw: formData.bookingPhone.trim(),
        display: formData.bookingPhone.trim(),
        telLink: `tel:${formData.bookingPhone.trim()}`,
        description: 'للحجز والاستعلام',
      },
      whatsapp: {
        raw: cleanWaRaw,
        display: cleanWaRaw,
        international: intlWa,
        waLink: `https://wa.me/${intlWa}?text=${encodeURIComponent(formData.whatsappText)}`,
        prefilledText: formData.whatsappText,
      },
      workingHours: {
        display: formData.hoursDisplay,
        short: formData.hoursShort,
        startHour24: Number(formData.startHour),
        endHour24: Number(formData.endHour),
        daysNote: formData.daysNote,
      },
      faqs: formData.faqs,
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  const handleReset = () => {
    if (window.confirm('هل أنت متأكد من استعادة كافة الإعدادات الافتراضية الأصلية؟')) {
      resetDefaults();
      window.location.reload();
    }
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  // Add new FAQ
  const handleAddFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: 'سؤال جديد...', answer: 'إجابة السؤال...' }],
    }));
  };

  // Delete FAQ
  const handleDeleteFaq = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  // Update FAQ
  const handleUpdateFaq = (index: number, field: 'question' | 'answer', value: string) => {
    setFormData((prev) => {
      const nextFaqs = [...prev.faqs];
      nextFaqs[index] = { ...nextFaqs[index], [field]: value };
      return { ...prev, faqs: nextFaqs };
    });
  };

  // Render Login Form if Not Authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-clinicBorder shadow-elevated text-right">
          
          <div className="w-16 h-16 rounded-2xl bg-navy text-white flex items-center justify-center mx-auto mb-6 shadow-md">
            <ShieldCheck className="w-8 h-8 text-turquoise" />
          </div>

          <h2 className="text-2xl font-black text-navy text-center font-sans mb-1">
            لوحة تحكم العيادة
          </h2>
          <p className="text-sm text-slateText text-center mb-6">
            د. سامح عمارة — استشاري أمراض وزراعة الكلى
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-navy mb-1.5">
                كلمة مرور لوحة التحكم:
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  placeholder="أدخل كلمة المرور..."
                  className="w-full px-4 py-3 rounded-xl border border-clinicBorder focus:ring-2 focus:ring-turquoise focus:border-transparent outline-none text-left font-mono tracking-wider text-base"
                  autoFocus
                />
                <Lock className="w-5 h-5 text-slateText-muted absolute left-3 top-3.5" />
              </div>
              {pinError && (
                <p className="text-xs text-red-500 font-bold mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>كلمة المرور غير صحيحة، يرجى المحاولة مرة أخرى.</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-navy hover:bg-navy-light text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <span>دخول إلى لوحة التحكم</span>
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>

            <div className="text-center pt-3 border-t border-clinicBorder/60">
              <button
                type="button"
                onClick={onBackToSite}
                className="text-xs font-bold text-turquoise hover:underline inline-flex items-center gap-1"
              >
                <span>العودة إلى الموقع الرئيسي</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </form>

        </div>
      </div>
    );
  }

  // Render Full Dashboard
  return (
    <div className="min-h-screen bg-[#F5F8FA] text-slateText font-sans text-right pb-16">
      
      {/* Top Navbar */}
      <header className="bg-navy text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-turquoise font-bold">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black font-sans leading-tight">
                لوحة إدارة بيانات العيادة
              </h1>
              <p className="text-xs text-turquoise/90">
                تعديل العناوين، المواعيد، الأرقام، وحالة الاستقبال
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Status indicator in header */}
            <div className="hidden md:flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl text-xs font-bold border border-white/10">
              <span className={`w-2 h-2 rounded-full ${currentStatus.isOpen ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
              <span>الحالة الحالية: {currentStatus.statusLabel}</span>
            </div>

            <button
              onClick={onBackToSite}
              className="inline-flex items-center gap-1.5 bg-turquoise hover:bg-turquoise-hover text-white text-xs sm:text-sm font-bold px-3 py-2 rounded-xl transition-colors shadow-sm"
              title="مشاهدة الموقع بعد التعديلات"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">معاينة الموقع</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
              title="تسجيل الخروج"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Success Alert Banner */}
        {saveSuccess && (
          <div className="mb-6 bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-2xl flex items-center justify-between shadow-sm animate-fadeIn">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <strong className="block text-sm font-bold">تم حفظ التغييرات وتطبيقها بنجاح!</strong>
                <span className="text-xs text-emerald-700">تحديثاتك نشطة الآن وفورية في الموقع بالكامل.</span>
              </div>
            </div>
            <button
              onClick={onBackToSite}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
            >
              عرض في الموقع
            </button>
          </div>
        )}

        {/* Live Status Controller Card */}
        <div className="mb-8 bg-white p-5 sm:p-6 rounded-3xl border border-clinicBorder shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-turquoise uppercase tracking-wider">مفتاح التحكم الفوري</span>
              <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${currentStatus.isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                {currentStatus.statusLabel}
              </span>
            </div>
            <h3 className="text-lg font-black text-navy">
              التحكم في ظهور (مفتوح الآن / مغلق الآن) في الموقع
            </h3>
            <p className="text-xs text-slateText mt-0.5">
              يمكنك تركه تلقائياً حسب الساعة، أو فرض حالة معينة يدوياً إذا كانت العيادة في إجازة أو فتحت استثنائياً.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setStatusOverride('auto')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                statusOverride === 'auto'
                  ? 'bg-navy text-white shadow-md'
                  : 'bg-cream hover:bg-mint text-navy border border-clinicBorder'
              }`}
            >
              ⏱️ تلقائي (حسب مواعيد العمل)
            </button>

            <button
              type="button"
              onClick={() => setStatusOverride('open')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                statusOverride === 'open'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-cream hover:bg-emerald-50 text-emerald-700 border border-clinicBorder'
              }`}
            >
              🟢 مفتوح الآن (تثبيت)
            </button>

            <button
              type="button"
              onClick={() => setStatusOverride('closed')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                statusOverride === 'closed'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-cream hover:bg-amber-50 text-amber-800 border border-clinicBorder'
              }`}
            >
              🔴 مغلق الآن (إجازة/تثبيت)
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-clinicBorder pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('hours')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'hours'
                ? 'bg-navy text-white shadow-sm'
                : 'bg-white text-slateText hover:text-navy border border-clinicBorder'
            }`}
          >
            <Clock className="w-4 h-4 text-turquoise" />
            <span>مواعيد العمل والاستقبال</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'contact'
                ? 'bg-navy text-white shadow-sm'
                : 'bg-white text-slateText hover:text-navy border border-clinicBorder'
            }`}
          >
            <Phone className="w-4 h-4 text-turquoise" />
            <span>أرقام الهواتف وواتساب</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('location')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'location'
                ? 'bg-navy text-white shadow-sm'
                : 'bg-white text-slateText hover:text-navy border border-clinicBorder'
            }`}
          >
            <MapPin className="w-4 h-4 text-turquoise" />
            <span>العنوان ورابط الخريطة</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'general'
                ? 'bg-navy text-white shadow-sm'
                : 'bg-white text-slateText hover:text-navy border border-clinicBorder'
            }`}
          >
            <User className="w-4 h-4 text-turquoise" />
            <span>بيانات الطبيب والتخصص</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('faqs')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'faqs'
                ? 'bg-navy text-white shadow-sm'
                : 'bg-white text-slateText hover:text-navy border border-clinicBorder'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-turquoise" />
            <span>الأسئلة الشائعة ({formData.faqs.length})</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave}>
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-clinicBorder shadow-soft mb-8">
            
            {/* TAB: WORKING HOURS */}
            {activeTab === 'hours' && (
              <div className="space-y-6">
                <div className="border-b border-clinicBorder pb-4">
                  <h3 className="text-lg font-bold text-navy flex items-center gap-2">
                    <Clock className="w-5 h-5 text-turquoise" />
                    <span>تعديل مواعيد العمل والاستقبال</span>
                  </h3>
                  <p className="text-xs text-slateText mt-1">
                    تظهر هذه المواعيد في واجهة الموقع ويتم حساب حالة "مفتوح الآن" تلقائياً بناءً عليها.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-navy mb-1.5">
                      النص الكامل للمواعيد (كما يظهر للزائر):
                    </label>
                    <input
                      type="text"
                      value={formData.hoursDisplay}
                      onChange={(e) => setFormData({ ...formData, hoursDisplay: e.target.value })}
                      placeholder="مثال: 5:00 مساءً – 7:00 مساءً"
                      className="w-full px-4 py-3 rounded-xl border border-clinicBorder focus:ring-2 focus:ring-turquoise outline-none font-semibold text-navy"
                      required
                    />
                    <span className="text-[11px] text-slateText-muted mt-1 block">يظهر في البطاقات الرئيسية والقسم التعريفي.</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy mb-1.5">
                      النص المختصر للمواعيد:
                    </label>
                    <input
                      type="text"
                      value={formData.hoursShort}
                      onChange={(e) => setFormData({ ...formData, hoursShort: e.target.value })}
                      placeholder="مثال: 5:00 م – 7:00 م"
                      className="w-full px-4 py-3 rounded-xl border border-clinicBorder focus:ring-2 focus:ring-turquoise outline-none font-semibold text-navy"
                      required
                    />
                    <span className="text-[11px] text-slateText-muted mt-1 block">يظهر في الشارة العلوية بجوار زر الحالة.</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy mb-1.5">
                      ساعة بدء العمل (نظام 24 ساعة):
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="23"
                      value={formData.startHour}
                      onChange={(e) => setFormData({ ...formData, startHour: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl border border-clinicBorder focus:ring-2 focus:ring-turquoise outline-none font-mono font-bold text-navy"
                      required
                    />
                    <span className="text-[11px] text-slateText-muted mt-1 block">القيمة 17 تعني الساعة 5 مساءً.</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy mb-1.5">
                      ساعة انتهاء العمل (نظام 24 ساعة):
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="23"
                      value={formData.endHour}
                      onChange={(e) => setFormData({ ...formData, endHour: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl border border-clinicBorder focus:ring-2 focus:ring-turquoise outline-none font-mono font-bold text-navy"
                      required
                    />
                    <span className="text-[11px] text-slateText-muted mt-1 block">القيمة 19 تعني الساعة 7 مساءً.</span>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-navy mb-1.5">
                      ملاحظة الأيام والحجز المسبق:
                    </label>
                    <input
                      type="text"
                      value={formData.daysNote}
                      onChange={(e) => setFormData({ ...formData, daysNote: e.target.value })}
                      placeholder="مثال: يومياً (يُرجى الحجز المسبق للتنسيق)"
                      className="w-full px-4 py-3 rounded-xl border border-clinicBorder focus:ring-2 focus:ring-turquoise outline-none text-navy"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: CONTACT & PHONES */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <div className="border-b border-clinicBorder pb-4">
                  <h3 className="text-lg font-bold text-navy flex items-center gap-2">
                    <Phone className="w-5 h-5 text-turquoise" />
                    <span>أرقام الهواتف وواتساب</span>
                  </h3>
                  <p className="text-xs text-slateText mt-1">
                    تتغير أزرار الاتصال وروابط الواتساب في الموقع كاملاً وفي شريط الجوال فور التعديل.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-navy mb-1.5">
                      رقم هاتف الحجز والاستعلام:
                    </label>
                    <input
                      type="text"
                      value={formData.bookingPhone}
                      onChange={(e) => setFormData({ ...formData, bookingPhone: e.target.value })}
                      placeholder="مثال: 01127744174"
                      className="w-full px-4 py-3 rounded-xl border border-clinicBorder focus:ring-2 focus:ring-turquoise outline-none font-mono font-bold text-navy text-left"
                      required
                    />
                    <span className="text-[11px] text-slateText-muted mt-1 block">يفتح فوراً عند النقر على "اتصل للحجز".</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy mb-1.5">
                      رقم واتساب العيادة:
                    </label>
                    <input
                      type="text"
                      value={formData.whatsappPhone}
                      onChange={(e) => setFormData({ ...formData, whatsappPhone: e.target.value })}
                      placeholder="مثال: 01555530649"
                      className="w-full px-4 py-3 rounded-xl border border-clinicBorder focus:ring-2 focus:ring-turquoise outline-none font-mono font-bold text-navy text-left"
                      required
                    />
                    <span className="text-[11px] text-slateText-muted mt-1 block">يتم تحويله تلقائياً للصيغة الدولية الصحيحة لمصر (20).</span>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-navy mb-1.5">
                      نص رسالة الواتساب التلقائية:
                    </label>
                    <input
                      type="text"
                      value={formData.whatsappText}
                      onChange={(e) => setFormData({ ...formData, whatsappText: e.target.value })}
                      placeholder="مثال: السلام عليكم د. سامح، أود الاستفسار بخصوص حجز موعد في العيادة."
                      className="w-full px-4 py-3 rounded-xl border border-clinicBorder focus:ring-2 focus:ring-turquoise outline-none text-navy"
                      required
                    />
                    <span className="text-[11px] text-slateText-muted mt-1 block">تظهر مكتوبة وجاهزة للإرسال بمجرد فتح الزائر لمحادثة الواتساب.</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: LOCATION */}
            {activeTab === 'location' && (
              <div className="space-y-6">
                <div className="border-b border-clinicBorder pb-4">
                  <h3 className="text-lg font-bold text-navy flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-turquoise" />
                    <span>عنوان العيادة ورابط الخريطة</span>
                  </h3>
                  <p className="text-xs text-slateText mt-1">
                    تعديل نص العنوان التفصيلي ورابط خرائط Google المباشر.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-navy mb-1.5">
                      العنوان الكامل (كما يظهر في الموقع وبطاقات الاتجاهات):
                    </label>
                    <input
                      type="text"
                      value={formData.fullAddress}
                      onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
                      placeholder="مثال: الإسكندرية — شارع مسجد سيدي بشر — بجوار حلواني لي لودي"
                      className="w-full px-4 py-3 rounded-xl border border-clinicBorder focus:ring-2 focus:ring-turquoise outline-none font-semibold text-navy"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy mb-1.5">
                      رابط موقع العيادة على خرائط Google (Google Maps URL):
                    </label>
                    <input
                      type="url"
                      value={formData.googleMapsUrl}
                      onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
                      placeholder="https://maps.app.goo.gl/..."
                      className="w-full px-4 py-3 rounded-xl border border-clinicBorder focus:ring-2 focus:ring-turquoise outline-none font-mono text-xs text-navy text-left"
                      required
                    />
                    <span className="text-[11px] text-slateText-muted mt-1 block">الرابط المباشر الذي يفتح عند نقر الزائر على "افتح خرائط Google".</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: DOCTOR PROFILE */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div className="border-b border-clinicBorder pb-4">
                  <h3 className="text-lg font-bold text-navy flex items-center gap-2">
                    <User className="w-5 h-5 text-turquoise" />
                    <span>بيانات وهوية الطبيب والتخصص</span>
                  </h3>
                  <p className="text-xs text-slateText mt-1">
                    تعديل الاسم واللقب العلمي والصفة المهنية.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-navy mb-1.5">
                      اسم الطبيب:
                    </label>
                    <input
                      type="text"
                      value={formData.doctorName}
                      onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-clinicBorder focus:ring-2 focus:ring-turquoise outline-none font-bold text-navy"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy mb-1.5">
                      المؤهل والصفة الرسمية:
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-clinicBorder focus:ring-2 focus:ring-turquoise outline-none font-bold text-navy"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-navy mb-1.5">
                      شارة التخصص المعروضة:
                    </label>
                    <input
                      type="text"
                      value={formData.specialtyTag}
                      onChange={(e) => setFormData({ ...formData, specialtyTag: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-clinicBorder focus:ring-2 focus:ring-turquoise outline-none font-semibold text-navy"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: FAQS */}
            {activeTab === 'faqs' && (
              <div className="space-y-6">
                <div className="border-b border-clinicBorder pb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-navy flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-turquoise" />
                      <span>إدارة الأسئلة الشائعة</span>
                    </h3>
                    <p className="text-xs text-slateText mt-1">
                      يمكنك تعديل أي سؤال وإجابة أو إضافة أسئلة جديدة للمراجعين.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddFaq}
                    className="inline-flex items-center gap-1.5 bg-mint text-turquoise hover:bg-mint-border px-3.5 py-2 rounded-xl text-xs font-bold transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إضافة سؤال</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.faqs.map((faq, index) => (
                    <div key={index} className="p-4 rounded-2xl bg-cream border border-clinicBorder relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-turquoise">سؤال رقم {index + 1}</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteFaq(index)}
                          className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50 transition-colors"
                          title="حذف هذا السؤال"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-2">
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => handleUpdateFaq(index, 'question', e.target.value)}
                          placeholder="نص السؤال..."
                          className="w-full px-3 py-2 rounded-lg border border-clinicBorder font-bold text-navy text-sm outline-none focus:ring-2 focus:ring-turquoise"
                        />
                        <textarea
                          rows={2}
                          value={faq.answer}
                          onChange={(e) => handleUpdateFaq(index, 'answer', e.target.value)}
                          placeholder="نص الإجابة..."
                          className="w-full px-3 py-2 rounded-lg border border-clinicBorder text-slateText text-xs outline-none focus:ring-2 focus:ring-turquoise"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Action Footer Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-clinicBorder shadow-soft">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="submit"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy-light text-white font-bold px-8 py-3.5 rounded-xl shadow-md transition-all active:scale-[0.99]"
              >
                <Save className="w-4 h-4 text-turquoise" />
                <span>حفظ التغييرات فوراً</span>
              </button>

              <button
                type="button"
                onClick={onBackToSite}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-cream hover:bg-mint text-navy font-bold px-5 py-3.5 rounded-xl border border-clinicBorder transition-colors"
              >
                <span>معاينة الموقع</span>
                <Eye className="w-4 h-4 text-turquoise" />
              </button>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={handleCopyJson}
                className="text-xs text-slateText hover:text-navy px-3 py-2 rounded-lg border border-clinicBorder hover:bg-cream transition-colors flex items-center gap-1.5"
                title="نسخ كود الإعدادات بتنسيق JSON"
              >
                {copiedCode ? <CheckCircle className="w-3.5 h-3.5 text-turquoise" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'تم النسخ!' : 'نسخ كود الإعدادات'}</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-red-500 hover:text-red-700 px-3 py-2 rounded-lg border border-red-200 hover:bg-red-50 transition-colors flex items-center gap-1.5"
                title="استعادة البيانات الأصلية"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>استعادة الافتراضي</span>
              </button>
            </div>
          </div>
        </form>

      </main>

    </div>
  );
};
