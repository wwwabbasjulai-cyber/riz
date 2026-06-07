import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    question: 'فرآیند شروع همکاری با تیم ریزمون چگونه است؟',
    answer: 'پس از ثبت درخواست اولیه، تیم فنی ما برای شناخت دقیق نیازمندی‌ها با شما جلسه مشاوره‌ای تنظیم می‌کند. سپس پروپوزال، زمان‌بندی و برآورد هزینه ارائه شده و با تایید شما فاز مهندسی و توسعه آغاز می‌شود.'
  },
  {
    question: 'پروژه‌های شما از چه تکنولوژی‌هایی استفاده می‌کنند؟',
    answer: 'ما منحصراً از مدرن‌ترین استک‌های توسعه شامل React, TypeScript, Next.js, Vite و Tailwind CSS برای فرانت‌اند استفاده می‌کنیم تا بالاترین سرعت و مقیاس‌پذیری تضمین شود.'
  },
  {
    question: 'آیا سورس کد نهایی در اختیار ما قرار می‌گیرد؟',
    answer: 'بله. تمامی مالکیت مادی و معنوی سورس‌کدها پس از تسویه‌حساب نهایی بدون هیچ‌گونه محدودیتی در قالب مخزن اختصاصی در اختیار کارفرما قرار خواهد گرفت.'
  },
  {
    question: 'آیا برای محصولات توسعه‌یافته پشتیبانی ارائه می‌دهید؟',
    answer: 'بله. بسته به نوع قرارداد، بین ۳ تا ۱۲ ماه پشتیبانی فنی و امنیتی رایگان روی تمامی پروژه‌ها ارائه می‌شود و پس از آن نیز قرارداد نگهداری قابل تمدید است.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq-section" className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-sm font-extrabold text-blue-600 dark:text-blue-400 tracking-widest uppercase mb-3">پاسخ به سوالات شما</h2>
          <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">پرسش‌های متداول</h3>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`border rounded-2xl transition-colors duration-300 ${isOpen ? 'border-blue-500/50 bg-blue-50/30 dark:bg-blue-900/10 dark:border-blue-500/50' : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/30 hover:border-slate-300 dark:hover:border-slate-700'}`}
              >
                <button
                  type="button"
                  className="w-full px-6 py-5 flex items-center justify-between text-right focus:outline-none"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className={`font-bold text-sm ${isOpen ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-48 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
