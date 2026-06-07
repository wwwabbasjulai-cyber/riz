import React, { useEffect } from 'react';
import { ArrowLeft, Shield, Lock, FileKey2, KeySquare, Fingerprint, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ServiceSecurity({ onBack }: { onBack: () => void }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      title: 'رمزنگاری پیشرفته (E2E & At-Rest)',
      description: 'کدگذاری داده‌های حساس پایگاه‌داده و پیاده‌سازی متدهای انتقال امن جهت جلوگیری از نشست داده در حملات مردمیانی (MITM).',
      icon: Lock,
      color: 'text-slate-500',
      bg: 'bg-slate-100 dark:bg-slate-800'
    },
    {
      title: 'محافظت در برابر XSS و CSRF',
      description: 'فیلتراسیون هوشمند ورودی‌های کاربر و مکانیسم‌های توکن امنیتی در تمامی اکشن‌های تغییردهنده وضعیت (State-Changing).',
      icon: Shield,
      color: 'text-slate-600 dark:text-slate-400',
      bg: 'bg-slate-200 dark:bg-slate-800'
    },
    {
      title: 'مدیریت احراز هویت (Auth & 2FA)',
      description: 'سیستم‌های اعتبارسنجی چندمرحله‌ای استاندارد و مدیریت نشست (Session Management) با توکن‌های JWT ضد جعل.',
      icon: KeySquare,
      color: 'text-slate-700 dark:text-slate-300',
      bg: 'bg-slate-200 dark:bg-slate-800'
    },
    {
      title: 'پایش و کنترل دسترسی (RBAC)',
      description: 'پیاده‌سازی سطح‌بندی دسترسی‌ها مبتنی بر نقش سازمانی، جهت جلوگیری قطعی از ارتقای دسترسی‌های غیرمجاز.',
      icon: Fingerprint,
      color: 'text-slate-800 dark:text-slate-200',
      bg: 'bg-slate-300 dark:bg-slate-700'
    }
  ];

  const processList = [
    {
      step: '۱',
      title: 'تست نفوذ و ارزیابی معماری',
      desc: 'شناسایی و تجزیه و تحلیل آسیب‌پذیری‌های احتمالی سامانه با ابزارهای تست اتوماتیک و بازرسی دستی کدها.'
    },
    {
      step: '۲',
      title: 'طراحی دیوار دفاعی معماری',
      desc: 'اضافه کردن لایه‌های پدافندی در ساختار مسیرهای ارتباطی API و کنترل ورودی/خروجی‌های کلاینت.'
    },
    {
      step: '۳',
      title: 'پیاده‌سازی قواعد OWASP',
      desc: 'تدوین و اجرای راهکارهای عملی برای جلوگیری از ۱۰ ریسک برتر اعلام شده توسط بنیاد امنیت وب (OWASP).'
    },
    {
      step: '۴',
      title: 'مانیتورینگ و لاگر امنیتی',
      desc: 'ذخیره‌سازی هوشمند رویدادهای مشکوک و لاگ‌گیری دقیق برای بررسی‌های قانونی و کشف حملات (SIEM).'
    }
  ];

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 animate-in fade-in duration-500">
      
      {/* Top Header Navigation */}
      <div className="pt-28 pb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="hidden sm:inline">بازگشت به صفحه اصلی</span>
          <span className="sm:hidden">بازگشت</span>
        </button>
        <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 tracking-widest uppercase">
          سرویس‌های ریزمون
        </span>
      </div>

      {/* Hero Header */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-32 overflow-hidden border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="absolute inset-0 bg-slate-100/30 dark:bg-slate-900/40 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-slate-300/10 dark:bg-slate-800/50 rounded-full blur-3xl opacity-50 pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="mx-auto w-20 h-20 bg-slate-200 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-8 border border-slate-300 dark:border-slate-700 shadow-inner">
            <ShieldCheck className="w-10 h-10 text-slate-700 dark:text-slate-300" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
            امنیت کاربردی و<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-slate-600 to-slate-400 dark:from-slate-300 dark:to-slate-500">
              پدافند سایبری سامانه‌ها
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto font-medium">
            حفاظت همه‌جانبه از دارایی‌های دیجیتال و اطلاعات کاربران. ما معماری اپلیکیشن‌های شما را به دژی نفوذناپذیر در برابر اکسپلویت‌های مدرن تبدیل می‌کنیم.
          </p>
          
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button 
              onClick={() => { window.location.hash = 'home'; setTimeout(() => document.getElementById('contact-section')?.scrollIntoView({behavior:'smooth'}), 100); }} 
              className="px-8 py-3.5 bg-slate-800 hover:bg-slate-900 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-slate-500/30 w-full sm:w-auto hover:-translate-y-0.5"
            >
              درخواست ارزیابی امنیتی سیستم
            </button>
          </div>
        </div>
      </section>

      {/* Value Proposition Grid */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-sm font-extrabold text-slate-600 dark:text-slate-400 tracking-widest uppercase mb-3">حراست یکپارچه اطلاعات</h2>
             <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">ویژگی‌های زیرساخت امنیتی ما</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feat, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 flex gap-6 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-none transition-shadow">
                <div className={`shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${feat.bg}`}>
                  <feat.icon className={`w-7 h-7 ${feat.color}`} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{feat.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{feat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-slate-100/50 dark:bg-slate-900/50 border-t border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-6">
              <h2 className="text-sm font-extrabold text-slate-600 dark:text-slate-400 tracking-widest uppercase mb-2">استراتژی پدافندی نظام‌مند</h2>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">
                امنیت در لایه‌های<br/>پنهان و آشکار کدها
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
                ما باور داریم امنیت باید به عنوان ویژگی ذاتی در چرخه توسعه محصول (DevSecOps) گنجانده شود، نه آنکه به عنوان استعاره‌ای پس از توسعه به آن اضافه گردد.
              </p>
              
              <ul className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <li className="flex items-center gap-3 text-sm font-bold text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  بروزرسانی بسته‌های وابسته برای رفع آسیب‌پذیری‌های کشف‌شده نرم افزاری
                </li>
                <li className="flex items-center gap-3 text-sm font-bold text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  برنامه‌ریزی استراتژی‌های جلوگیری از حملات Brute-Force ربات‌های مهاجم
                </li>
              </ul>
            </div>
            
            <div className="flex-1 w-full relative">
              <div className="absolute top-8 bottom-8 right-[27px] w-0.5 bg-slate-300 dark:bg-slate-800 z-0"></div>
              <div className="space-y-8 relative z-10">
                {processList.map((proc, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="shrink-0 w-14 h-14 rounded-full bg-slate-200 dark:bg-slate-900 border-4 border-white dark:border-slate-950 shadow-sm flex items-center justify-center font-extrabold text-slate-700 dark:text-slate-300 text-lg transition-colors group-hover:border-slate-300 dark:group-hover:border-slate-800">
                      {proc.step}
                    </div>
                    <div className="pt-3">
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{proc.title}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{proc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready To Start */}
      <section className="py-24 px-4 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-800 text-center p-12 lg:p-16 relative overflow-hidden shadow-2xl shadow-slate-800/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <h3 className="relative z-10 text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-6">
            آماده ایمن‌سازی دارایی‌های دیجیتال هستید؟
          </h3>
          <p className="relative z-10 text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            بدون هیچ هزینه‌ای دغدغه‌های امنیتی سامانه خود را با کارشناسان پدافند ما مطرح کنید. ما ریسک‌های احتمالی را پیش از شروع برایتان روشن خواهیم کرد.
          </p>
          
          <button 
            onClick={() => { window.location.hash = 'home'; setTimeout(() => document.getElementById('contact-section')?.scrollIntoView({behavior:'smooth'}), 100); }}
            className="relative z-10 px-8 py-4 bg-white text-slate-900 hover:bg-slate-50 font-extrabold text-base rounded-xl transition-all shadow-xl hover:-translate-y-1"
          >
            مشاوره امنیتی را آغاز کنید
          </button>
        </div>
      </section>

    </div>
  );
}
