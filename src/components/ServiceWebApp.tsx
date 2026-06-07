import React, { useEffect } from 'react';
import { ArrowLeft, Code2, Server, Smartphone, Zap, Shield, CheckCircle2, LayoutTemplate } from 'lucide-react';

export default function ServiceWebApp({ onBack }: { onBack: () => void }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      title: 'معماری مدرن و تایپ‌سیف',
      description: 'استفاده از TypeScript و جدیدترین استانداردهای فرانت‌اند (React v18+, Vite) برای توسعه کدهایی مقاوم و قابل پیش‌بینی.',
      icon: Code2,
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'مقیاس‌پذیری و پایداری',
      description: 'طراحی زیرساخت‌های مهندسی شده برای تحمل ترافیک بالا و مدیریت حجم بالای داده با رعایت اصول SOLID.',
      icon: Server,
      color: 'text-purple-500',
      bg: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'لود فوق سریع (Micro-Performance)',
      description: 'تضمین لود زیر نیم‌ثانیه با پیاده‌سازی متدهای پیشرفته فشرده‌سازی منابع و تقسیم‌بندی کدها (Code Splitting).',
      icon: Zap,
      color: 'text-amber-500',
      bg: 'bg-amber-50 dark:bg-amber-900/20'
    },
    {
      title: 'امنیت چندلایه نظامی',
      description: 'حفاظت مستمر از دیتای کاربران در برابر نفوذ، با بررسی‌های امنیتی مستمر و پروتکل‌های رمزنگاری داده‌ها.',
      icon: Shield,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20'
    }
  ];

  const processList = [
    {
      step: '۱',
      title: 'تحلیل دقیق و کشف نیازمندی‌ها',
      desc: 'با شما همفکری می‌کنیم تا دغدغه‌های کسب‌وکارتان را به‌صورت کامل بشناسیم و بهترین معماری را برنامه‌ریزی کنیم.'
    },
    {
      step: '۲',
      title: 'طراحی رابط و تجربه کاربری',
      desc: 'شبیه‌سازی دقیق محصول پیش از توسعه، برای اطمینان از سهولت استفاده، دسترسی‌پذیری و زیبایی بصری.'
    },
    {
      step: '۳',
      title: 'توسعه چابک و مهندسی دقیق',
      desc: 'کدنویسی مبتنی بر استانداردهای جهانی و توسعه فیچرها با ارائه گزارش‌های پیشرفت دوره‌ای.'
    },
    {
      step: '۴',
      title: 'تست‌های کیفیت و تحویل نهایی',
      desc: 'پس از تایید صلاحیت پدافندی و پایداری عملکرد، سامانه با کمترین زمان داون‌تایم مستقر می‌شود.'
    }
  ];

  return (
    <div className="w-full bg-white dark:bg-slate-950 animate-in fade-in duration-500">
      
      {/* Top Header Navigation */}
      <div className="pt-28 pb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="hidden sm:inline">بازگشت به صفحه اصلی</span>
          <span className="sm:hidden">بازگشت</span>
        </button>
        <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 tracking-widest uppercase">
          سرویس‌های ریزمون
        </span>
      </div>

      {/* Hero Header */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-32 overflow-hidden border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="absolute inset-0 bg-blue-50/30 dark:bg-blue-900/10 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="mx-auto w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-8 border border-blue-200 dark:border-blue-800/50 shadow-inner">
            <LayoutTemplate className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
            توسعه وب‌اپلیکیشن‌های<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">
              سفارشی و پیشرفته
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto font-medium">
            ما در تیم ریزمون سامانه‌های تحت وب پیچیده را با تمرکز بر بالاترین کیفیت کد، معماری پایدار و سرعت بارگذاری خیره‌کننده طراحی و مهندسی می‌کنیم تا خیال شما از بابت آینده دیجیتال کسب‌وکارتان آسوده باشد.
          </p>
          
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button 
              onClick={() => { window.location.hash = 'home'; setTimeout(() => document.getElementById('contact-section')?.scrollIntoView({behavior:'smooth'}), 100); }} 
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-blue-500/30 w-full sm:w-auto hover:-translate-y-0.5"
            >
              مشاوره رایگان و بررسی پروژه
            </button>
            <button 
              onClick={() => { window.location.hash = 'home'; setTimeout(() => document.getElementById('portfolio-section')?.scrollIntoView({behavior:'smooth'}), 100); }} 
              className="px-8 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 text-slate-700 dark:text-slate-200 text-sm font-bold rounded-xl transition-all w-full sm:w-auto"
            >
              مشاهده نمونه کارها
            </button>
          </div>
        </div>
      </section>

      {/* Value Proposition Grid */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase mb-3">مزیت رقابتی ما</h2>
             <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">چرا توسعه با ریزمون؟</h3>
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

      {/* Engineering Process */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-6">
              <h2 className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 tracking-widest uppercase mb-2">پروسه تضمین کیفیت</h2>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">
                مسیر خلق یک محصول<br/>تراز اول جهانی
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
                ما فرآیندی شفاف، قابل اندازه‌گیری و مهندسی‌شده را برای توسعه تعریف کرده‌ایم. در هیچ نقطه‌ای از زمان در مورد وضعیت پروژه ابهامی نخواهید داشت و ما تضمین می‌کنیم که محصول نهایی بدون نقص فنی تحویل داده می‌شود.
              </p>
              
              <ul className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <li className="flex items-center gap-3 text-sm font-bold text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  بروزرسانی مکرر و استقرار مداوم (CI/CD)
                </li>
                <li className="flex items-center gap-3 text-sm font-bold text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  مستندسازی دقیق کدهای نوشته شده
                </li>
                <li className="flex items-center gap-3 text-sm font-bold text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  پشتیبانی فنی اختصاصی پس از استقرار
                </li>
              </ul>
            </div>
            
            <div className="flex-1 w-full relative">
              <div className="absolute top-8 bottom-8 right-[27px] w-0.5 bg-slate-200 dark:bg-slate-800 z-0"></div>
              
              <div className="space-y-8 relative z-10">
                {processList.map((proc, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="shrink-0 w-14 h-14 rounded-full bg-white dark:bg-slate-950 border-4 border-slate-100 dark:border-slate-900 shadow-sm flex items-center justify-center font-extrabold text-blue-600 dark:text-blue-400 text-lg transition-colors group-hover:border-blue-100 dark:group-hover:border-blue-900/50">
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
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto rounded-3xl bg-blue-600 text-center p-12 lg:p-16 relative overflow-hidden shadow-2xl shadow-blue-600/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <h3 className="relative z-10 text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-6">
            آماده تحول دیجیتال هستید؟
          </h3>
          <p className="relative z-10 text-blue-100 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            بدون هیچ هزینه‌ای ایده خود را با تیم فنی ما مطرح کنید. ما بهترین راه‌حل‌های معماری و فنی را پیش از شروع برایتان روشن خواهیم کرد.
          </p>
          
          <button 
            onClick={() => { window.location.hash = 'home'; setTimeout(() => document.getElementById('contact-section')?.scrollIntoView({behavior:'smooth'}), 100); }}
            className="relative z-10 px-8 py-4 bg-white text-blue-600 hover:bg-slate-50 font-extrabold text-base rounded-xl transition-all shadow-xl hover:-translate-y-1"
          >
            مشاوره فنی را آغاز کنید
          </button>
        </div>
      </section>

    </div>
  );
}
