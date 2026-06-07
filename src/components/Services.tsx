import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutTemplate, Zap, Shield, Search, Smartphone, Code2 } from 'lucide-react';

const SERVICES = [
  {
    title: 'توسعه وب‌اپلیکیشن‌های سفارشی',
    description: 'کدنویسی اختصاصی پلتفرم‌های پیچیده با معماری مدرن و تایپ‌سیف برای تضمین پایداری در مقیاس بالا.',
    icon: Code2,
    color: 'text-blue-500',
    bg: 'bg-blue-100 dark:bg-blue-900/30'
  },
  {
    title: 'طراحی رابط و تجربه کاربری (UI/UX)',
    description: 'طراحی مینیمال، چشم‌نواز و تعاملی کاربرمحور با تمرکز بر سادگی استفاده و نرخ تبدیل بالا.',
    icon: LayoutTemplate,
    color: 'text-purple-500',
    bg: 'bg-purple-100 dark:bg-purple-900/30'
  },
  {
    title: 'بهینه‌سازی سرعت و عملکرد',
    description: 'کاهش چشمگیر زمان بارگذاری صفحات و دستیابی به بالاترین امتیاز در ابزارهای تست پرفورمنس.',
    icon: Zap,
    color: 'text-amber-500',
    bg: 'bg-amber-100 dark:bg-amber-900/30'
  },
  {
    title: 'سئو تکنیکال (SEO)',
    description: 'رعایت تمام استانداردهای موتورهای جستجو در ساختار کدها برای ارتقای رتبه ارگانیک شما.',
    icon: Search,
    color: 'text-emerald-500',
    bg: 'bg-emerald-100 dark:bg-emerald-900/30'
  },
  {
    title: 'توسعه راهکارهای تحت وب موبایل',
    description: 'ساخت PWA و وب‌سایت‌های کاملاً واکنش‌گرا که در هر دستگاهی تجربه‌ای بی‌نقص ارائه می‌دهند.',
    icon: Smartphone,
    color: 'text-rose-500',
    bg: 'bg-rose-100 dark:bg-rose-900/30'
  },
  {
    title: 'امنیت و پدافند سایبری',
    description: 'پیاده‌سازی مکانیزم‌های دفاعی پیشرفته، اعتبارسنجی چندمرحله‌ای و رمزنگاری داده‌های حساس.',
    icon: Shield,
    color: 'text-slate-500 dark:text-slate-400',
    bg: 'bg-slate-200 dark:bg-slate-800'
  }
];

export default function Services() {
  const navigate = useNavigate();

  return (
    <section id="services-section" className="py-24 bg-slate-50/50 dark:bg-slate-900/20 border-y border-slate-200/50 dark:border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-extrabold text-blue-600 dark:text-blue-400 tracking-widest uppercase mb-3"
          >
            حوزه تخصص ما
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight"
          >
            خدمات تخصصی ریزمون
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            ما با اتکا به دانش روز و تمرکز عمیق بر جزئیات مهندسی، ایده‌های شما را به محصولات دیجیتال پایدار، سریع و امن تبدیل می‌کنیم.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              key={index}
              onClick={() => {
                if (service.title === 'توسعه وب‌اپلیکیشن‌های سفارشی') {
                  navigate('/services/web-app');
                } else if (service.title === 'طراحی رابط و تجربه کاربری (UI/UX)') {
                  navigate('/services/ui-ux');
                } else if (service.title === 'بهینه‌سازی سرعت و عملکرد') {
                  navigate('/services/performance');
                } else if (service.title === 'سئو تکنیکال (SEO)') {
                  navigate('/services/seo');
                } else if (service.title === 'توسعه راهکارهای تحت وب موبایل') {
                  navigate('/services/mobile-web');
                } else if (service.title === 'امنیت و پدافند سایبری') {
                  navigate('/services/security');
                }
              }} 
              className={`group p-8 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-blue-500/30 dark:hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 cursor-pointer`}
            >
              <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center ${service.bg} transition-transform duration-300 group-hover:-translate-y-1`}>
                <service.icon className={`w-6 h-6 ${service.color}`} />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                {service.title}
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
