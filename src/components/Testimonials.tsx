import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'مهندس احمدی',
    role: 'مدیرعامل شرکت دانش‌بنیان',
    text: 'تیم ریزمون در کمترین زمان ممکن و با بالاترین کیفیت سامانه ما را از نوع طراحی و پیاده‌سازی کرد. سرعت بارگذاری سایت واقعا بی‌نظیر است.',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    name: 'سارا سعیدی',
    role: 'مدیر محصول استارتاپ',
    text: 'دقت در جزئیات UI/UX و همچنین رعایت تمام استانداردهای سئو، باعث شد تا رشد کاربران ما پس از لانچ نسخه جدید چشمگیر باشد.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    name: 'دکتر محمدی',
    role: 'رئیس کلینیک درمانی',
    text: 'ثبات سیستم و امنیت فوق‌العاده سامانه رزرو نوبت کلینیک ما مدیون زحمات و پشتیبانی مداوم تیم متخصص ریزمون است. قطعا پیشنهاد میکنم.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80'
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials-section" className="py-24 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200/50 dark:border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-extrabold text-blue-600 dark:text-blue-400 tracking-widest uppercase mb-3"
          >
            نظرات مشتریان
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight"
          >
            اعتبار ما، رضایت همراهان ماست
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative p-8 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-blue-100 dark:text-blue-900/40" />
              <p className="relative z-10 text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-4">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{testimonial.name}</h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{testimonial.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
