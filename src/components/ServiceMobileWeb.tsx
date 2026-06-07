import React, { useEffect } from 'react';
import { ArrowLeft, Smartphone, Tablet, Monitor, Component, CheckCircle2, AppWindow } from 'lucide-react';

export default function ServiceMobileWeb({ onBack }: { onBack: () => void }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      title: 'وب‌اپلیکیشن‌های پیش‌رونده (PWA)',
      description: 'امکان نصب سایت به‌صورت مستقیم روی گوشی کاربر، بدون نیاز به انتشار در استورهای اپلیکیشن مانند بازار یا گوگل‌پلی.',
      icon: AppWindow,
      color: 'text-rose-500',
      bg: 'bg-rose-50 dark:bg-rose-900/20'
    },
    {
      title: 'قابلیت کاربری آفلاین',
      description: 'کَش هوشمند داده‌ها و منابع کلیدی، تا کاربران حتی در صورت قطع اینترنت بتوانند با بخش‌های مهم وب‌اپلیکیشن ارتباط داشته باشند.',
      icon: Component,
      color: 'text-pink-500',
      bg: 'bg-pink-50 dark:bg-pink-900/20'
    },
    {
      title: 'تطبیق صددرصدی صفحه‌نمایش',
      description: 'استفاده از سیستم‌های گرید پیشرفته (CSS Grid & Flexbox) برای واکش‌گرایی بی‌نقص در تمامی برندها و ابعاد موبایل.',
      icon: Smartphone,
      color: 'text-red-500',
      bg: 'bg-red-50 dark:bg-red-900/20'
    },
    {
      title: 'انیمیشن‌های روان ۶۰ فریم',
      description: 'استفاده از شتاب‌دهنده سخت‌افزاری مرورگرها برای ارائه ترانزیشن‌ها و انیمیشن‌های نرم که حس اپلیکیشن‌های بومی را القا می‌کند.',
      icon: Tablet,
      color: 'text-orange-500',
      bg: 'bg-orange-50 dark:bg-orange-900/20'
    }
  ];

  const processList = [
    {
      step: '۱',
      title: 'طراحی مبتنی بر موبایل (Mobile-First)',
      desc: 'آغاز فرآیند طراحی و کدنویسی از کوچکترین صفحه‌نمایش‌ها جهت تضمین دسترسی‌پذیری و ارتقای متمرکز.'
    },
    {
      step: '۲',
      title: 'پیاده‌سازی Service Worker',
      desc: 'برنامه‌ریزی دقیق مدیریت کش شبکه و استراتژی‌های آفلاین-اول (Offline First).'
    },
    {
      step: '۳',
      title: 'تولید فایل Manifest',
      desc: 'پیکربندی آیکون‌ها، رنگ‌های تم دستگاه و تنظیمات صفحه اسپلش جهت تجربه کاربری اپلیکیشن مانند.'
    },
    {
      step: '۴',
      title: 'تست در دستگاه‌های واقعی',
      desc: 'بررسی سلامت واکنش‌گرایی در پلتفرم‌های iOS و Android و رفع ناسازگاری‌های احتمالی کیبورد مجازی.'
    }
  ];

  return (
    <div className="w-full bg-white dark:bg-slate-950 animate-in fade-in duration-500">
      
      {/* Top Header Navigation */}
      <div className="pt-28 pb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="hidden sm:inline">بازگشت به صفحه اصلی</span>
          <span className="sm:hidden">بازگشت</span>
        </button>
        <span className="text-xs font-extrabold text-rose-600 dark:text-rose-400 tracking-widest uppercase">
          سرویس‌های ریزمون
        </span>
      </div>

      {/* Hero Header */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-32 overflow-hidden border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="absolute inset-0 bg-rose-50/30 dark:bg-rose-900/10 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="mx-auto w-20 h-20 bg-rose-100 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center mb-8 border border-rose-200 dark:border-rose-800/50 shadow-inner">
            <Smartphone className="w-10 h-10 text-rose-600 dark:text-rose-400" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
            توسعه راهکارهای<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-rose-600 to-pink-500 dark:from-rose-400 dark:to-pink-300">
              تحت وب موبایل (PWA)
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto font-medium">
            با تولید وب‌اپلیکیشن‌های واکنش‌گرا و قابل نصب روی صفحه‌نمایش موبایل، کسب‌وکار خود را مستقیماً به جیب مخاطبانتان ببرید؛ سریع، در دسترس و استور-مستقل.
          </p>
          
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button 
              onClick={() => { window.location.hash = 'home'; setTimeout(() => document.getElementById('contact-section')?.scrollIntoView({behavior:'smooth'}), 100); }} 
              className="px-8 py-3.5 bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-rose-500/30 w-full sm:w-auto hover:-translate-y-0.5"
            >
              استقرار PWA اختصاصی شما
            </button>
          </div>
        </div>
      </section>

      {/* Value Proposition Grid */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-sm font-extrabold text-pink-600 dark:text-pink-400 tracking-widest uppercase mb-3">حضور اپ‌گونه، مزیت وب</h2>
             <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">چرا استراتژی موبایل ما؟</h3>
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
              <h2 className="text-sm font-extrabold text-rose-600 dark:text-rose-400 tracking-widest uppercase mb-2">مراحل تبدیل به اپ موبایل</h2>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">
                دور زدن تحریم‌های استور با <br/>معماری هوشمند وب
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
                توسعه PWA این امکان را به شما می‌دهد که یک‌بار کد بزنید و برنامه خود را مستقیماً میان کاربران توزیع کنید، بدون دغدغه انتشار و درصد کمیسیون اپ‌استورها.
              </p>
              
              <ul className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <li className="flex items-center gap-3 text-sm font-bold text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-rose-500" />
                  ارسال نوتیفیکیشن‌های تحت وب (Push Notifications)
                </li>
                <li className="flex items-center gap-3 text-sm font-bold text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-rose-500" />
                  آیکون اختصاصی و نام اختصاصی روی صفحه گوشی
                </li>
              </ul>
            </div>
            
            <div className="flex-1 w-full relative">
              <div className="absolute top-8 bottom-8 right-[27px] w-0.5 bg-slate-200 dark:bg-slate-800 z-0"></div>
              <div className="space-y-8 relative z-10">
                {processList.map((proc, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="shrink-0 w-14 h-14 rounded-full bg-white dark:bg-slate-950 border-4 border-slate-100 dark:border-slate-900 shadow-sm flex items-center justify-center font-extrabold text-rose-600 dark:text-rose-400 text-lg transition-colors group-hover:border-rose-100 dark:group-hover:border-rose-900/50">
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
        <div className="max-w-4xl mx-auto rounded-3xl bg-rose-600 text-center p-12 lg:p-16 relative overflow-hidden shadow-2xl shadow-rose-600/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <h3 className="relative z-10 text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-6">
            آماده حضور در موبایل کاربران هستید؟
          </h3>
          <p className="relative z-10 text-rose-100 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            بدون هیچ هزینه‌ای ایده خود را با تیم تخصصی ما مطرح کنید. ما بهترین امکان‌سنجی تولید PWA را پیش از شروع برایتان روشن خواهیم کرد.
          </p>
          
          <button 
            onClick={() => { window.location.hash = 'home'; setTimeout(() => document.getElementById('contact-section')?.scrollIntoView({behavior:'smooth'}), 100); }}
            className="relative z-10 px-8 py-4 bg-white text-rose-600 hover:bg-slate-50 font-extrabold text-base rounded-xl transition-all shadow-xl hover:-translate-y-1"
          >
            مشاوره موبایل را آغاز کنید
          </button>
        </div>
      </section>

    </div>
  );
}
