/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Rocket, Zap, Clock, ShieldCheck } from 'lucide-react';

export default function Hero() {
  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio-section');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact-section');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-radial from-blue-50/30 dark:from-blue-950/15 via-transparent to-transparent dark:bg-slate-950">
      {/* Background elegant circles */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-50/40 dark:bg-blue-950/10 rounded-full blur-2xl pointer-events-none" />
 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/45 mb-6 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors cursor-default"
        >
          <Rocket className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-xs font-semibold text-blue-800 dark:text-blue-400">
            توسعه سریع با جدیدترین استانداردهای روز
          </span>
        </motion.div>
 
        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight max-w-4xl mx-auto mb-6"
        >
          مهندسی خلاقانه نرم‌افزار و
          <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-l from-blue-600 to-blue-500 dark:from-blue-400 dark:to-blue-500">
            توسعه پلتفرم‌های سریع، امن و مقیاس‌پذیر
          </span>
        </motion.h1>
 
        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          ما یک تیم فنی متمرکز، چابک و چالش‌دوست هستیم. ایده‌های پویای شما را به وب‌سایت‌های مدرن، سیستم‌های تحت وب پایدار و اپلیکیشن‌های موبایل فوق‌العاده سریع با بالاترین بهره‌وری کد تبدیل می‌کنیم.
        </motion.p>
 
        {/* Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={scrollToPortfolio}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-600/15 flex items-center justify-center gap-2 group transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
          >
            مشاهده نمونه کارها
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
          </button>
          <button
            onClick={scrollToContact}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm tracking-wide border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
          >
            شروع گفتگو سریع
          </button>
        </motion.div>
 
        {/* Features Bento Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-right">
          {/* Item 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative bg-white/75 dark:bg-slate-900/75 backdrop-blur-sm p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-100 dark:hover:border-blue-900/50 shadow-sm transition-all duration-205 flex items-start gap-4"
          >
            {/* Quick Stat Badge */}
            <div className="absolute -top-3 left-4 bg-slate-900 dark:bg-slate-800 text-white font-semibold text-[10px] px-2.5 py-0.5 rounded-full border border-slate-800 dark:border-slate-700 flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>۰.۸ ثانیه</span>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex-shrink-0 animate-bounce">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1.5">سرعت بارگذاری استثنایی</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                ما تصاویر را با الگوریتم اختصاصی Canvas در مرورگر کاربر فشرده کرده و فرمت‌های مدرن WebP/AVIF استفاده می‌کنیم. لود پرتال بدون ریلود صفحه به زیر ۱.۲ ثانیه خواهد رسید.
              </p>
            </div>
          </motion.div>
 
          {/* Item 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative bg-white/75 dark:bg-slate-900/75 backdrop-blur-sm p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-100 dark:hover:border-blue-900/50 shadow-sm transition-all duration-205 flex items-start gap-4"
          >
            {/* Quick Stat Badge */}
            <div className="absolute -top-3 left-4 bg-slate-900 dark:bg-slate-800 text-white font-semibold text-[10px] px-2.5 py-0.5 rounded-full border border-slate-800 dark:border-slate-700 flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              <span>۱۰۰٪ امن</span>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1.5">امنیت چندلایه‌ای و 2FA</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                پیاده‌سازی مکانیزم‌های مستحکم تایید هویت دو مرحله‌ای (TOTP-Driven)، جلوگیری صدمه از حملات تزریق SQL و رمزنگاری هوشمند تمامی کدهای سمت پورتال برای ممانعت از هک.
              </p>
            </div>
          </motion.div>
 
          {/* Item 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="relative bg-white/75 dark:bg-slate-900/75 backdrop-blur-sm p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-100 dark:hover:border-blue-900/50 shadow-sm transition-all duration-205 flex items-start gap-4"
          >
            {/* Quick Stat Badge */}
            <div className="absolute -top-3 left-4 bg-slate-900 dark:bg-slate-800 text-white font-semibold text-[10px] px-2.5 py-0.5 rounded-full border border-slate-800 dark:border-slate-700 flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse"></span>
              <span>+۴۵ پروژه</span>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1.5">کدهای تمیز و الگوهای مدرن</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                پروژه شما را با TypeScript تایپ‌سیف و الگوهای ماژولار توسعه می‌دهیم. ساختاری مهندسی‌شده که بدون دردسر و حتی توسط تیم‌های خارجی دیگر به سادگی قابل ارتقا و نگهداری است.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
