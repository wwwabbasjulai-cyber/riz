/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Project } from '../types';
import { 
  ArrowLeft, Calendar, User, Zap, Shield, Database, 
   Github, ExternalLink, Sparkles, Send, Layout, Cpu, ArrowRight
} from 'lucide-react';

interface ProjectDetailProps {
  project: Project;
  allProjects: Project[];
  onBack: () => void;
  onNavigateToProject: (id: string) => void;
  onOrderProposal: (projectTitle: string) => void;
}

export default function ProjectDetail({ 
  project, 
  allProjects,
  onBack, 
  onNavigateToProject,
  onOrderProposal 
}: ProjectDetailProps) {
  
  // Auto-scroll to top when project changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [project.id]);

  // Find other projects (excluding current, max 2)
  const relatedProjects = allProjects
    .filter(p => p.id !== project.id)
    .slice(0, 2);

  // Helper mock analytics or indicators to match the premium "Tiny Engineering" brand
  const loadTime = "۰.۴ ثانیه";
  const carbonFootprint = "۹۸% صرفه‌جویی انرژی دیتابیس";

  return (
    <div className="py-24 bg-white dark:bg-slate-950 min-h-screen text-right" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-slate-100 dark:border-slate-900">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <button onClick={onBack} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer whitespace-nowrap">صفحه اصلی</button>
            <span className="text-slate-300 dark:text-slate-600">/</span>
            <button onClick={onBack} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer whitespace-nowrap">نمونه کارها</button>
            <span className="text-slate-300 dark:text-slate-600">/</span>
            <span className="text-slate-800 dark:text-slate-200 font-bold truncate max-w-[200px] sm:max-w-[400px]">{project.title}</span>
          </div>
          
          <button 
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-all cursor-pointer hover:translate-x-1"
          >
            <ArrowRight className="w-4 h-4" />
            بازگشت به آلبوم
          </button>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Cover Image & High-Performance Overlay */}
          <div className="lg:col-span-7">
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800/80 shadow-md group">
              <img 
                referrerPolicy="no-referrer"
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transform scale-100 group-hover:scale-101 transition-transform duration-500"
              />
              
              
            </div>
          </div>

          {/* Quick Specifications */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-lg text-[10px] font-bold">
                  {project.client}
                </span>
                <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 rounded-lg text-[10px] font-mono leading-none">
                  {project.date}
                </span>
              </div>

              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                {project.title}
              </h1>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans mt-2">
                {project.description}
              </p>

              {/* Real-time Engineering stats card */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-150 dark:border-slate-800 space-y-3 mt-4">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                  رکوردهای عملکرد فنی (Tiny Benchmarks):
                </h3>
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200/60 dark:border-slate-850">
                    <span className="block text-[10px] text-slate-400 dark:text-slate-500">تاخیر پاسخ ابری</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-250 font-mono text-sm">{loadTime}</span>
                  </div>
                  <div className="bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200/60 dark:border-slate-850">
                    <span className="block text-[10px] text-slate-400 dark:text-slate-500">راندمان پایداری انرژی</span>
                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400 font-sans text-[11px] leading-tight block mt-0.5">{carbonFootprint}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Launch links */}
            <div className="flex gap-3 mt-6">
              {project.demoUrl && (
                <a 
                  href={project.demoUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs text-center flex items-center justify-center gap-2 shadow-sm shadow-blue-500/10 cursor-pointer transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  ورود به لایو و تست دمو
                </a>
              )}
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="py-3 px-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Github className="w-4.5 h-4.5" />
                  منبع گیت‌هاب
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Description Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 pt-6 border-t border-slate-100 dark:border-slate-900">
          
          {/* Main Case study texts */}
          <div className="lg:col-span-8 space-y-6">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white mb-3">اهداف و تحلیل معماری پروژه</h2>
              <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed font-sans">
                {project.longDescription || project.description}
              </p>
            </div>

            <div className="bg-blue-50/20 dark:bg-blue-955/10 rounded-2xl p-6 border border-blue-100/50 dark:border-blue-900/20">
              <h3 className="text-xs font-bold text-blue-700 dark:text-blue-400 mb-2 block uppercase">بند پدافند امنیت و تجمیع داده</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                این پروژه با پیاده‌سازی متدهای پیشرفته فشرده‌سازی اطلاعات و پروتکل فایروال ضد‌اسپم ریزمون تایید صلاحیت گردیده است. امنیت اتصالات با استفاده از کد گذاری‌های چندسویه تأمین شده تا اطلاعات کاربران در بالاترین سطح حراستی نگهداری شود.
              </p>
            </div>

            {/* Custom Technical benefits list */}
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-3 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-blue-500" />
                شاخص‌های کیفی ریزمون (Rizmun Engineering Indicators)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-850">
                  <div className="p-1 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-bold">۰۱</div>
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-950 dark:text-slate-100">رابط بهینه شده بدون HMR</h4>
                    <span className="text-[10px] text-slate-500">پشتیبانی کامل از لود استاتیک و رهایی از ریکوئست‌های سربار.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-850">
                  <div className="p-1 bg-emerald-100 dark:bg-emerald-955 text-emerald-600 dark:text-emerald-400 rounded-lg text-xs font-bold">۰۲</div>
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-950 dark:text-slate-100">فشرده‌سازی تصویر WebP</h4>
                    <span className="text-[10px] text-slate-500">۹۰ درصد صرفه‌جویی در منابع لود سرور نسبت به فرمت‌های سنتی PNG.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack & Proposal form action */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Tech Stack widget */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-205 dark:border-slate-900 shadow-xs">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase mb-4 block tracking-wide">زبان‌ها و تکنولوژی‌ها</h3>
              <div className="grid grid-cols-2 gap-2">
                {project.tags.map((tag) => (
                  <div key={tag} className="p-2.5 bg-slate-50 dark:bg-slate-900/80 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                    <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">{tag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Consultation Request CTA */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-50/20 dark:from-blue-955/20 dark:to-slate-900 border border-blue-100 dark:border-blue-900/30 text-center">
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-1">طراحی پروژه مشابه</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">مایلید سامانه‌ای مشابه با این ابزار برایتان خلق کنیم؟</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                کافیست درخواست مشاوره رایگان ثبت کنید تا فرآیند مهندسی، هزینه و جزئیات ترافیکی پروژه را به صورت کاملاً بهینه برایتان ارائه دهیم.
              </p>
              
              <button 
                onClick={() => onOrderProposal(project.title)}
                className="w-full py-2.5 px-4 bg-slate-950 hover:bg-slate-905 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-blue-500/10 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                درخواست طرح پیشنهادی
              </button>
            </div>

          </div>
        </div>

        {/* Other Projects Recommendations */}
        {relatedProjects.length > 0 && (
          <div className="pt-10 border-t border-slate-100 dark:border-slate-900">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-6">سایر نمونه کارهای تیم ریزمون</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProjects.map((proj) => (
                <div 
                  key={proj.id}
                  onClick={() => onNavigateToProject(proj.id)}
                  className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4 hover:border-blue-100 dark:hover:border-blue-900/20 cursor-pointer group transition-all"
                >
                  <div className="w-24 h-16 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 flex-shrink-0">
                    <img 
                      referrerPolicy="no-referrer"
                      src={proj.image} 
                      alt={proj.title} 
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-101 transition-transform"
                    />
                  </div>
                  <div className="flex flex-col justify-between text-right">
                    <div>
                      <h4 className="text-xs font-bold text-slate-950 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                        {proj.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{proj.description}</p>
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 block mt-1">مشاهده جزئیات پروژه ➜</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
