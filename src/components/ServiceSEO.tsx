import React, { useEffect } from 'react';
import { ArrowLeft, Search, Globe, FileKey, LineChart, CheckCircle2, FileSearch } from 'lucide-react';

export default function ServiceSEO({ onBack }: { onBack: () => void }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      title: 'معماری و ساختار استاندارد',
      description: 'ایجاد پیوندهای داخلی (Internal Linking) اصولی و دسته‌بندی محتوا برای درک بهتر موتورهای جستجو.',
      icon: Globe,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20'
    },
    {
      title: 'نشانه‌گذاری‌های ساختاریافته',
      description: 'استفاده از Schema Markup برای نمایش ریچ اسنیپت‌ها (Rich Snippets) و افزایش نرخ کلیک در نتایج جستجو.',
      icon: FileKey,
      color: 'text-teal-500',
      bg: 'bg-teal-50 dark:bg-teal-900/20'
    },
    {
      title: 'امنیت و دسترسی‌پذیری',
      description: 'پیاده‌سازی پروتکل‌های HTTPS امن، اصلاح فایل robots.txt و ایجاد نقشه سایت (Sitemap) داینامیک.',
      icon: Search,
      color: 'text-cyan-500',
      bg: 'bg-cyan-50 dark:bg-cyan-900/20'
    },
    {
      title: 'رهگیری و آنالیز دقیق',
      description: 'اتصال اصولی به ابزارهای وب‌مستر مانند Search Console و پیاده‌سازی متاتگ‌های داینامیک در فریم‌ورک‌های SPA.',
      icon: LineChart,
      color: 'text-green-500',
      bg: 'bg-green-50 dark:bg-green-900/20'
    }
  ];

  const processList = [
    {
      step: '۱',
      title: 'آدیت تکنیکال تخصصی',
      desc: 'بررسی سلامت کدها، تگ‌های متا، کانونیکال‌ها و ساختار URLها.'
    },
    {
      step: '۲',
      title: 'اصلاحات ساختاری و کدی',
      desc: 'رفع خطاهای خزش (Crawl Errors)، بهینه‌سازی تگ‌های هدینگ و اصلاح ساختار DOM.'
    },
    {
      step: '۳',
      title: 'پیاده‌سازی متادیتای پویا',
      desc: 'نوشتن اسکریپت‌های سمت سرور برای تزریق داینامیک عنوان، توضیحات متا و Open Graph‌ها.'
    },
    {
      step: '۴',
      title: 'ثبت و مانیتورینگ خزش',
      desc: 'ثبت اصولی سایت در موتورهای جستجو و پیگیری مستمر وضعیت ایندکس صفحات.'
    }
  ];

  return (
    <div className="w-full bg-white dark:bg-slate-950 animate-in fade-in duration-500">
      
      {/* Top Header Navigation */}
      <div className="pt-28 pb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="hidden sm:inline">بازگشت به صفحه اصلی</span>
          <span className="sm:hidden">بازگشت</span>
        </button>
        <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 tracking-widest uppercase">
          سرویس‌های ریزمون
        </span>
      </div>

      {/* Hero Header */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-32 overflow-hidden border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="absolute inset-0 bg-emerald-50/30 dark:bg-emerald-900/10 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="mx-auto w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-8 border border-emerald-200 dark:border-emerald-800/50 shadow-inner">
            <FileSearch className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
            سئو تکنیکال<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
              (Technical SEO)
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto font-medium">
            ما زیرساخت فنی سایت شما را مطابق دقیق‌ترین استانداردهای موتورهای جستجو پیاده‌سازی می‌کنیم تا مسیر رشد ارگانیک و جذب بازدیدکننده، هموار و بی‌دردسر باشد.
          </p>
          
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button 
              onClick={() => { window.location.hash = 'home'; setTimeout(() => document.getElementById('contact-section')?.scrollIntoView({behavior:'smooth'}), 100); }} 
              className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/30 w-full sm:w-auto hover:-translate-y-0.5"
            >
              بهبود رتبه سایت شما در گوگل
            </button>
          </div>
        </div>
      </section>

      {/* Value Proposition Grid */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-sm font-extrabold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-3">دیده شدن استاندارد</h2>
             <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">ویژگی‌های زیرساخت سئو ما</h3>
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
              <h2 className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 tracking-widest uppercase mb-2">فرآیند ارتقای رتبه</h2>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">
                کدنویسی مورد علاقه<br/>گوگل و بینگ
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
                سئو تکنیکال نیازمند تسلط همزمان به مفاهیم جستجو و برنامه‌نویسی است. تیم ما با اعمال الگوهای سئو‌ فرندلی در دل کدهای فرانت‌اند، کرال شدن صفحات را بهینه می‌کند.
              </p>
              
              <ul className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <li className="flex items-center gap-3 text-sm font-bold text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  سازگاری کامل فریم‌ورک‌های جاوااسکریپتی با موتورهای جستجو
                </li>
                <li className="flex items-center gap-3 text-sm font-bold text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  رعایت معماری کانونیکال جهت جلوگیری از محتوای تکراری
                </li>
              </ul>
            </div>
            
            <div className="flex-1 w-full relative">
              <div className="absolute top-8 bottom-8 right-[27px] w-0.5 bg-slate-200 dark:bg-slate-800 z-0"></div>
              <div className="space-y-8 relative z-10">
                {processList.map((proc, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="shrink-0 w-14 h-14 rounded-full bg-white dark:bg-slate-950 border-4 border-slate-100 dark:border-slate-900 shadow-sm flex items-center justify-center font-extrabold text-emerald-600 dark:text-emerald-400 text-lg transition-colors group-hover:border-emerald-100 dark:group-hover:border-emerald-900/50">
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
        <div className="max-w-4xl mx-auto rounded-3xl bg-emerald-600 text-center p-12 lg:p-16 relative overflow-hidden shadow-2xl shadow-emerald-600/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <h3 className="relative z-10 text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-6">
            آماده رشد ارگانیک هستید؟
          </h3>
          <p className="relative z-10 text-emerald-100 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            بدون هیچ هزینه‌ای وضعیت سئو خود را با تیم ما مطرح کنید. ما بهترین راه‌حل‌های تکنیکال را پیش از شروع برایتان روشن خواهیم کرد.
          </p>
          
          <button 
            onClick={() => { window.location.hash = 'home'; setTimeout(() => document.getElementById('contact-section')?.scrollIntoView({behavior:'smooth'}), 100); }}
            className="relative z-10 px-8 py-4 bg-white text-emerald-600 hover:bg-slate-50 font-extrabold text-base rounded-xl transition-all shadow-xl hover:-translate-y-1"
          >
            مشاوره سئو را آغاز کنید
          </button>
        </div>
      </section>

    </div>
  );
}
