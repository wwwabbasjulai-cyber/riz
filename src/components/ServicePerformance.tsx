import React, { useEffect } from 'react';
import { ArrowLeft, Zap, Rocket, Activity, BarChart, CheckCircle2, Cpu } from 'lucide-react';

export default function ServicePerformance({ onBack }: { onBack: () => void }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      title: 'فشرده‌سازی حداکثری منابع',
      description: 'کاهش حجم تصاویر، فونت‌ها و فایل‌های جاوااسکریپت و CSS بدون افت کیفیت برای بارگذاری آنی.',
      icon: Activity,
      color: 'text-amber-500',
      bg: 'bg-amber-50 dark:bg-amber-900/20'
    },
    {
      title: 'رندرینگ هوشمند (SSR & SSG)',
      description: 'استفاده از معماری‌های مدرن رندرینگ سمت سرور یا تولید استاتیک سایت جهت تحویل سریع محتوا به مرورگر.',
      icon: Cpu,
      color: 'text-orange-500',
      bg: 'bg-orange-50 dark:bg-orange-900/20'
    },
    {
      title: 'بهینه‌سازی Core Web Vitals',
      description: 'ارتقای شاخص‌های LCP، FID و CLS گوگل برای کسب بالاترین امتیاز در ابزارهای تست عملکرد.',
      icon: BarChart,
      color: 'text-yellow-500',
      bg: 'bg-yellow-50 dark:bg-yellow-900/20'
    },
    {
      title: 'مدیریت کش و توزیع محتوا (CDN)',
      description: 'راه‌اندازی سیستم کشینگ هوشمند و استفاده از شبکه‌های توزیع محتوا برای دسترسی سریع کاربران از سراسر جهان.',
      icon: Rocket,
      color: 'text-red-500',
      bg: 'bg-red-50 dark:bg-red-900/20'
    }
  ];

  const processList = [
    {
      step: '۱',
      title: 'ارزیابی و تست اولیه',
      desc: 'اجرای تست‌های دقیق با Lighthouse و ابزارهای مانیتورینگ برای شناسایی گلوگاه‌های پرفورمنس.'
    },
    {
      step: '۲',
      title: 'سبک‌سازی و Code Splitting',
      desc: 'حذف کدهای ناکارآمد، تقسیم‌بندی کدها و بارگذاری تنبل (Lazy Loading) منابع غیرضروری.'
    },
    {
      step: '۳',
      title: 'پیاده‌سازی مکانیزم‌های کش',
      desc: 'تنظیم هدرهای کش، सर्विस‌ورکرها (Service Workers) و ادغام با شبکه‌های توزیع محتوای ایمن.'
    },
    {
      step: '۴',
      title: 'مانیتورینگ و گزارش‌گیری',
      desc: 'استقرار سامانه‌های نظارتی برای کنترل لحظه‌ای سرعت و اطمینان از پایداری عملکرد در بلندمدت.'
    }
  ];

  return (
    <div className="w-full bg-white dark:bg-slate-950 animate-in fade-in duration-500">
      
      {/* Top Header Navigation */}
      <div className="pt-28 pb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="hidden sm:inline">بازگشت به صفحه اصلی</span>
          <span className="sm:hidden">بازگشت</span>
        </button>
        <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400 tracking-widest uppercase">
          سرویس‌های ریزمون
        </span>
      </div>

      {/* Hero Header */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-32 overflow-hidden border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="absolute inset-0 bg-amber-50/30 dark:bg-amber-900/10 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="mx-auto w-20 h-20 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center mb-8 border border-amber-200 dark:border-amber-800/50 shadow-inner">
            <Zap className="w-10 h-10 text-amber-600 dark:text-amber-400" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
            بهینه‌سازی<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-600 to-orange-500 dark:from-amber-400 dark:to-orange-300">
              سرعت و عملکرد (Performance)
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto font-medium">
            سرعت بالای سایت شما، ضامن حفظ بازدیدکنندگان و افزایش نرخ تبدیل است. ما محصول شما را به سریع‌ترین شکل ممکن در مرورگر کاربران رندر می‌کنیم.
          </p>
          
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button 
              onClick={() => { window.location.hash = 'home'; setTimeout(() => document.getElementById('contact-section')?.scrollIntoView({behavior:'smooth'}), 100); }} 
              className="px-8 py-3.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-amber-500/30 w-full sm:w-auto hover:-translate-y-0.5"
            >
              بهینه‌سازی ساختار سایت شما
            </button>
          </div>
        </div>
      </section>

      {/* Value Proposition Grid */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-sm font-extrabold text-orange-600 dark:text-orange-400 tracking-widest uppercase mb-3">قدرت و سرعت</h2>
             <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">ویژگی‌های بهینه‌سازی ما</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feat, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800 flex gap-6 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-none transition-shadow">
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
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-6">
              <h2 className="text-sm font-extrabold text-amber-600 dark:text-amber-400 tracking-widest uppercase mb-2">فرآیند بهینه‌سازی</h2>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">
                مهندسی معکوس برای<br/>دستیابی به نهایت سرعت
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
                تیم ما با بررسی کدهای فرانت‌اند و بک‌اند، موانع سرعت را کشف کرده و با اصلاحات بنیادی، زمان بارگذاری را به حداقل می‌رساند.
              </p>
              
              <ul className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <li className="flex items-center gap-3 text-sm font-bold text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-amber-500" />
                  دستیابی به امتیاز بالای ۹۰ در Lighthouse
                </li>
                <li className="flex items-center gap-3 text-sm font-bold text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-amber-500" />
                  کاهش Bounce Rate سایت به دلیل لود کند
                </li>
              </ul>
            </div>
            
            <div className="flex-1 w-full relative">
              <div className="absolute top-8 bottom-8 right-[27px] w-0.5 bg-slate-200 dark:bg-slate-800 z-0"></div>
              <div className="space-y-8 relative z-10">
                {processList.map((proc, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="shrink-0 w-14 h-14 rounded-full bg-white dark:bg-slate-950 border-4 border-slate-100 dark:border-slate-900 shadow-sm flex items-center justify-center font-extrabold text-amber-600 dark:text-amber-400 text-lg transition-colors group-hover:border-amber-100 dark:group-hover:border-amber-900/50">
                      {proc.step}
                    </div>
                    <div className="pt-3">
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{proc.title}</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{proc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready To Start */}
      <section className="py-24 px-4 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto rounded-3xl bg-amber-600 text-center p-12 lg:p-16 relative overflow-hidden shadow-2xl shadow-amber-600/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <h3 className="relative z-10 text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-6">
            آماده افزایش سرعت سیستم خود هستید؟
          </h3>
          <p className="relative z-10 text-amber-100 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            بدون هیچ هزینه‌ای دغدغه پرفورمنس خود را با تیم فنی ما مطرح کنید. ما بهترین راهکارها را پیش از شروع برایتان روشن خواهیم کرد.
          </p>
          
          <button 
            onClick={() => { window.location.hash = 'home'; setTimeout(() => document.getElementById('contact-section')?.scrollIntoView({behavior:'smooth'}), 100); }}
            className="relative z-10 px-8 py-4 bg-white text-amber-600 hover:bg-slate-50 font-extrabold text-base rounded-xl transition-all shadow-xl hover:-translate-y-1"
          >
            مشاوره فنی را آغاز کنید
          </button>
        </div>
      </section>

    </div>
  );
}
