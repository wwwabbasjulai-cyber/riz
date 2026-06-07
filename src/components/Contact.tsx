/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ContactRequest } from '../types';
import { Mail, Phone, MapPin, Send, CheckCircle, ShieldAlert, Zap } from 'lucide-react';

interface ContactProps {
  onAddContactRequest: (req: Omit<ContactRequest, 'id' | 'date' | 'read' | 'ip'>) => void;
}

export default function Contact({ onAddContactRequest }: ContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  // Anti-Spam Captcha State
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaError, setCaptchaError] = useState(false);

  // Status flags
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Generate new numbers on mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    setNum1(Math.floor(1 + Math.random() * 9));
    setNum2(Math.floor(1 + Math.random() * 9));
    setCaptchaAnswer('');
    setCaptchaError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCaptchaError(false);

    // Verify captcha
    const parsedAnswer = parseInt(captchaAnswer, 10);
    if (parsedAnswer !== num1 + num2) {
      setCaptchaError(true);
      return;
    }

    setIsSubmitting(true);

    // Speed optimization demonstration - simulate instant dynamic submit, and save to LocalStorage
    setTimeout(() => {
      onAddContactRequest({
        name,
        email,
        subject,
        message
      });

      setIsSubmitting(false);
      setIsSuccess(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      generateCaptcha();

      // Fade out success notification after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 400);
  };

  return (
    <section id="contact-section" className="py-20 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-right" dir="rtl">
          
          {/* Form Side - Left column */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-950 p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block mb-2 uppercase">ارسال پیام فوری</span>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
              درخواست مشاوره‌ و ایده نویسی
            </h2>

            {isSuccess && (
              <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/45 text-emerald-800 dark:text-emerald-400 rounded-2xl flex items-start gap-3 fade-in-up">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm">درخواست شما با موفقیت ثبت شد!</h4>
                  <p className="text-xs text-emerald-600/90 dark:text-emerald-400/90 leading-relaxed mt-1">
                    همکاران ما در تیم فنی ریزمون بلافاصله جزئیات پیام شما را پایش کرده و حداکثر طی ۲ ساعت آینده با شما تماس خواهند گرفت. گزارش این درخواست در پرتال مدیریت ثبت گردید.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name-input" className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">نام و نام خانوادگی:</label>
                  <input
                    id="name-input"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: علیرضا حسینی"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-slate-50/50 dark:bg-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label htmlFor="email-input" className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">آدرس ایمیل مستقیم:</label>
                  <input
                    id="email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@domain.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-slate-50/50 dark:bg-slate-900 dark:text-slate-100 text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject-input" className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">موضوع پیام و همکاری:</label>
                <input
                  id="subject-input"
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="مثال: طراحی وب‌سایت فروشگاهی یا بهینه‌سازی سرور"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-slate-50/50 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label htmlFor="message-input" className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">شرح پیام یا پروژه پیشنهادی شما:</label>
                <textarea
                  id="message-input"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="لطفاً ایده‌ها یا نیازمندی‌های اولیه‌ی نرم‌افزاری خود را در این بخش بنویسید..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-slate-50/50 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>

              {/* Anti-Spam Math Check */}
              <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-600 dark:text-slate-300 font-medium font-sans">
                    به سوال ریاضی پاسخ دهید: {num1} + {num2} = ؟
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    required
                    value={captchaAnswer}
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                    placeholder="جواب"
                    className="w-20 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 text-center text-sm font-semibold focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={generateCaptcha}
                    className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    تغییر عدد
                  </button>
                </div>
              </div>
              {captchaError && (
                <p className="text-[11px] text-red-500 font-bold block">
                  ⚠️ پاسخ سوال امنیتی نادرست است. مجدد تلاش کنید.
                </p>
              )}

              {/* Action Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3.5 rounded-xl text-white text-sm font-extrabold flex items-center justify-center gap-2 transition-all ${
                  isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-sm active:translate-y-px cursor-pointer'
                }`}
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? 'در حال پردازش...' : 'ارسال درخواست با اولویت فوری'}
              </button>
            </form>
          </div>

          {/* Quick Contact info card - Right Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-2">ارتباط مستقیم</span>
                <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-4">
                  با تـیـم ما در تماس باشید
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  ما آماده‌ی شنیدن نظرات، پذیرش پروژه‌های جدید و همکاری با استارتاپ‌ها، کسب‌وکارها و شرکت‌های فناور هستیم. فرآیند ما کاملاً شفاف، ایمن و مبتنی بر بازخورد چابک است.
                </p>
              </div>

              {/* Detail channels */}
              <div className="space-y-4">
                {/* Channel 1 */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-xs">
                  <div className="p-3 bg-blue-50 dark:bg-blue-955/40 text-blue-600 dark:text-blue-400 rounded-xl">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-sm mb-1">مکاتبه با بخش پشتیبانی:</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">support@tinyteam.ir</p>
                  </div>
                </div>

                {/* Channel 2 */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-xs">
                  <div className="p-3 bg-blue-50 dark:bg-blue-955/40 text-blue-600 dark:text-blue-400 rounded-xl">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-sm mb-1">خط تلفن مشاوره دفتری:</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400" dir="ltr">۰۲۱ - ۴۴۹۶ ۹۶۰۰</p>
                  </div>
                </div>

                {/* Channel 3 */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-xs">
                  <div className="p-3 bg-blue-50 dark:bg-blue-955/40 text-blue-600 dark:text-blue-400 rounded-xl">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-sm mb-1">محل استقرار فیزیکی:</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">تهران، برج نوآوری شریف، طبقه ششم، واحد ۶۲</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Micro Optimizer Footer widget indicating dynamic compression speeds */}
            <div className="p-5 bg-gradient-to-r from-blue-50/50 dark:from-blue-955/15 to-transparent border-r-4 border-blue-600 rounded-2xl mt-8">
              <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 text-xs font-extrabold mb-1">
                <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-pulse" />
                تضمین بالاترین استانداردهای بهینه‌سازی
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                تمامی پروژه‌های توسعه‌یافته در ریز‌مون، منطبق بر آخرین استانداردهای لایت‌هاوس وب، با کمترین حجم باند مصرفی و لود فوق‌سریع کمتر از نیم ثانیه تحویل کارفرما داده می‌شوند. کارایی عالی، مأموریت همیشگی ماست.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
