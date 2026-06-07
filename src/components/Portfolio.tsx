/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import { Layers, ArrowUpRight, Github, ExternalLink, Sparkles } from 'lucide-react';

interface PortfolioProps {
  projects: Project[];
  onSelectProject: (id: string) => void;
}

export default function Portfolio({ projects, onSelectProject }: PortfolioProps) {
  const categories = ['همه', 'سامانه‌های تحت وب', 'اپلیکیشن‌های موبایل'];
  const [selectedTag, setSelectedTag] = useState<string>('همه');

  // Helper helper to categorize project logically
  const getProjectCategory = (project: Project): string => {
    if (project.tags.includes('Flutter') || project.title.includes('اپلیکیشن') || project.description.includes('اپلیکیشن')) {
      return 'اپلیکیشن‌های موبایل';
    }
    return 'سامانه‌های تحت وب';
  };

  const filteredProjects = selectedTag === 'همه'
    ? projects
    : projects.filter((p) => getProjectCategory(p) === selectedTag);

  return (
    <section id="portfolio-section" className="py-20 bg-slate-50 dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800/60 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-right"
          >
            <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-2">
              پرتفولیو و آلبوم دستاوردها
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              نمونه کارهای شاخص ما
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl">
              گلچینی از سامانه‌ها و ابزارهای توسعه‌یافته توسط تیم ما با تکیه بر سرعت بارگذاری بی‌نظیر و بهینه‌سازی دیتابیس.
            </p>
          </motion.div>

          {/* Filtering Tabs */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-x-6 gap-y-3 mt-6 md:mt-0 justify-end items-center md:mr-auto" dir="rtl"
          >
            {categories.map((tag) => {
              const isActive = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => {
                    setSelectedTag(tag);
                  }}
                  className={`relative pb-2 pt-1 px-1 text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300'
                  }`}
                >
                  {tag}
                  {isActive && (
                    <motion.span 
                      layoutId="activeTabBadge"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" 
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                key={project.id}
                className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800/80 p-5 hover:border-blue-100 dark:hover:border-blue-900/40 transition-shadow duration-300 group flex flex-col justify-between"
              >
              <div>
                {/* Image */}
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-900 mb-4">
                  <img
                    referrerPolicy="no-referrer"
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-101 transition-transform duration-300"
                  />
                  {/* Subtle WebP optimization indicator */}
                  <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded-md text-[9px] font-mono text-white/90">
                    {project.compressedSize || '120 KB'} WebP
                  </div>
                </div>

                {/* Subtitle / Client & Date */}
                <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-1.5 uppercase tracking-wider">
                  {project.client} · {project.date}
                </span>

                {/* Title */}
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Minimalist Tech Tags inline */}
                <div className="flex flex-wrap gap-x-2 gap-y-1 mb-4 text-[10px] text-slate-400 font-semibold">
                  {project.tags.map((tag, idx) => (
                    <span key={tag} className="flex items-center gap-1">
                      {idx > 0 && <span className="text-slate-200 dark:text-slate-800">•</span>}
                      <span className="text-slate-500 dark:text-slate-400">{tag}</span>
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-900">
                  <button
                    onClick={() => onSelectProject(project.id)}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 cursor-pointer"
                  >
                    جزئیات فنی
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all duration-150"
                        title="کد منبع"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all duration-150"
                        title="پیش‌نمایش زنده"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
