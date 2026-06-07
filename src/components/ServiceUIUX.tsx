import React, { useEffect } from 'react';
import { ArrowLeft, LayoutTemplate, PenTool, Eye, MousePointerClick, CheckCircle2, MonitorSmartphone } from 'lucide-react';

export default function ServiceUIUX({ onBack }: { onBack: () => void }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      title: 'تحقیقات کاربرمحور',
      description: 'شناخت عمیق پرسونای مخاطب و نیازهای کسب‌وکار برای ارائه طرحی که دقیقاً با اهداف شما هم‌راستا باشد.',
      icon: Eye,
      color: 'text-purple-500',
      bg: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'طراحی مینیمال و کاربردی',
      description: 'حذف عناصر اضافی و تمرکز بر مسیرهای اصلی کاربر برای رسیدن به بالاترین نرخ تبدیل (Conversion Rate).',
      icon: PenTool,
      color: 'text-pink-500',
      bg: 'bg-pink-50 dark:bg-pink-900/20'
    },
    {
      title: 'تعاملات هوشمند (Micro-interactions)',
      description: 'انیمیشن‌های ظریف و فیدبک‌های بصری که تجربه کاربری را از یک صفحه خشک به یک محصول زنده و پویا تبدیل می‌کند.',
      icon: MousePointerClick,
      color: 'text-fuchsia-500',
      bg: 'bg-fuchsia-50 dark:bg-fuchsia-900/20'
    },
    {
      title: 'واکنش‌گرایی بی‌نقص',
      description: 'طراحی انعطاف‌پذیر که در تمامی دستگاه‌ها از موبایل‌های کوچک تا نمایشگرهای عریض تجربه‌ای یکپارچه ارائه می‌دهد.',
      icon: MonitorSmartphone,
      color: 'text-violet-500',
      bg: 'bg-violet-50 dark:bg-violet-900/20'
    }
  ];

  const processList = [
    {
      step: '۱',
      title: 'وایرفریم و معماری اطلاعات',
      desc: 'طراحی ساختار اولیه صفحات و مسیرهای کاربری برای اطمینان از منطق درست چیدمان عناصر.'
    },
    {
      step: '۲',
      title: 'طراحی بصری (UI Design)',
      desc: 'تدوین هویت بصری، انتخاب رنگ‌بندی، تایپوگرافی و خلق رابط کاربری نهایی با بالاترین دقت پیکسلی.'
    },
    {
      step: '۳',
      title: 'پروتوتایپ تعاملی',
      desc: 'ارائه یک نسخه شبیه‌سازی شده و قابل کلیک از محصول برای بررسی دقیق جریان کاربری قبل از کدنویسی.'
    },
    {
      step: '۴',
      title: 'تست کاربردپذیری (Usability Testing)',
      desc: 'اجرای تست‌های عملی روی پروتوتایپ برای کشف و رفع هرگونه پیچیدگی احتمالی در مسیر کاربر.'
    }
  ];

  return (
    <div className="w-full bg-white dark:bg-slate-950 animate-in fade-in duration-500">
      
      {/* Top Header Navigation */}
      <div className="pt-28 pb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="hidden sm:inline">بازگشت به صفحه اصلی</span>
          <span className="sm:hidden">بازگشت</span>
        </button>
        <span className="text-xs font-extrabold text-purple-600 dark:text-purple-400 tracking-widest uppercase">
          سرویس‌های ریزمون
        </span>
      </div>

      {/* Hero Header */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-32 overflow-hidden border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="absolute inset-0 bg-purple-50/30 dark:bg-purple-900/10 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="mx-auto w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-8 border border-purple-200 dark:border-purple-800/50 shadow-inner">
            <LayoutTemplate className="w-10 h-10 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
            طراحی رابط و<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-fuchsia-500 dark:from-purple-400 dark:to-fuchsia-300">
              تجربه کاربری (UI/UX)
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto font-medium">
            خلق رابط‌های کاربری چشم‌نواز و کاربردی که علاوه بر زیبایی، مسیر رسیدن کاربر به هدف را کوتاه و لذت‌بخش می‌کنند. ما زیبایی را در خدمت عملکرد قرار می‌دهیم.
          </p>
          
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button 
              onClick={() => { window.location.hash = 'home'; setTimeout(() => document.getElementById('contact-section')?.scrollIntoView({behavior:'smooth'}), 100); }} 
              className="px-8 py-3.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-purple-500/30 w-full sm:w-auto hover:-translate-y-0.5"
            >
              طراحی محصول خود را شروع کنید
            </button>
          </div>
        </div>
      </section>

      {/* Value Proposition Grid */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-sm font-extrabold text-fuchsia-600 dark:text-fuchsia-400 tracking-widest uppercase mb-3">هنر و مهندسی</h2>
             <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">ویژگی‌های طراحی ما</h3>
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
              <h2 className="text-sm font-extrabold text-purple-600 dark:text-purple-400 tracking-widest uppercase mb-2">متدولوژی طراحی</h2>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">
                تبدیل ایده خام به<br/>تجربه‌ای ماندگار
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
                ما معتقدیم طراحی خوب، ترکیبی از روانشناسی کاربر، شناخت بیزینس و هنر بصری است. این سه ضلع در فرآیند استاندارد ما به دقت در کنار هم قرار می‌گیرند.
              </p>
              
              <ul className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <li className="flex items-center gap-3 text-sm font-bold text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-purple-500" />
                  طراحی بر اساس استانداردهای (WCAG)
                </li>
                <li className="flex items-center gap-3 text-sm font-bold text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-purple-500" />
                  تحویل فایل‌های لایه‌باز و سیستم دیزاین (Design System)
                </li>
              </ul>
            </div>
            
            <div className="flex-1 w-full relative">
              <div className="absolute top-8 bottom-8 right-[27px] w-0.5 bg-slate-200 dark:bg-slate-800 z-0"></div>
              
              <div className="space-y-8 relative z-10">
                {processList.map((proc, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="shrink-0 w-14 h-14 rounded-full bg-white dark:bg-slate-950 border-4 border-slate-100 dark:border-slate-900 shadow-sm flex items-center justify-center font-extrabold text-purple-600 dark:text-purple-400 text-lg transition-colors group-hover:border-purple-100 dark:group-hover:border-purple-900/50">
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
        <div className="max-w-4xl mx-auto rounded-3xl bg-purple-600 text-center p-12 lg:p-16 relative overflow-hidden shadow-2xl shadow-purple-600/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <h3 className="relative z-10 text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-6">
            آماده خلق تجربه‌ای ماندگار هستید؟
          </h3>
          <p className="relative z-10 text-purple-100 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            بدون هیچ هزینه‌ای ایده خود را با تیم طراحی ما مطرح کنید. ما بهترین الگوهای کاربری را پیش از شروع برایتان روشن خواهیم کرد.
          </p>
          
          <button 
            onClick={() => { window.location.hash = 'home'; setTimeout(() => document.getElementById('contact-section')?.scrollIntoView({behavior:'smooth'}), 100); }}
            className="relative z-10 px-8 py-4 bg-white text-purple-600 hover:bg-slate-50 font-extrabold text-base rounded-xl transition-all shadow-xl hover:-translate-y-1"
          >
            مشاوره طراحی را آغاز کنید
          </button>
        </div>
      </section>

    </div>
  );
}
