/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TeamMember } from '../types';
import { Github, Send, Mail, Users, Star, GraduationCap } from 'lucide-react';

interface TeamProps {
  team: TeamMember[];
}

export default function Team({ team }: TeamProps) {
  return (
    <section id="team-section" className="py-20 bg-white dark:bg-slate-950 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-xs font-bold mb-4">
            <Users className="w-3.5 h-3.5" />
            <span>خانواده کوچک و متمرکز ما</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight sm:text-4xl">
            اعضای اصلی تـیـم
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 max-w-xl mx-auto">
            ما گروهی تخصصی، هم‌افزا و مسلط به متدولوژی‌های روزآمد مهندسی نرم‌افزار هستیم که برای ارتقای استانداردهای محصول در کنار هم کار می‌کنیم.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div
              key={member.id}
              className="bg-white dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700/80 p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div>
                {/* Avatar Frame with custom background accents */}
                <div className="relative w-28 h-28 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full bg-blue-100 dark:bg-blue-900/20 transform rotate-6 scale-102 group-hover:rotate-12 transition-transform duration-200" />
                  <img
                    referrerPolicy="no-referrer"
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full relative z-10 border-2 border-white dark:border-slate-900 shadow-sm"
                  />
                  <div className="absolute bottom-0 left-0 bg-blue-600 text-white p-1.5 rounded-full z-20 shadow-sm shadow-blue-500/20">
                    <Star className="w-3.5 h-3.5 fill-white" />
                  </div>
                </div>

                {/* Name & Role */}
                <h3 className="font-extrabold text-slate-900 dark:text-white text-lg mb-1 leading-tight">
                  {member.name}
                </h3>
                <p className="text-xs font-extrabold text-blue-600 dark:text-blue-400 mb-4 tracking-wide uppercase">
                  {member.role}
                </p>

                {/* Biography */}
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6 px-2">
                  {member.bio}
                </p>
              </div>

              <div>
                {/* Main Skills badges */}
                <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-semibold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Social Connect channels */}
                <div className="flex items-center justify-center gap-3 pt-4 border-t border-slate-50 dark:border-slate-800">
                  {member.socials.github && (
                    <a
                      href={member.socials.github}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-all duration-150"
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {member.socials.telegram && (
                    <a
                      href={member.socials.telegram}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-950/30 flex items-center justify-center transition-all duration-150"
                      title="Telegram"
                    >
                      <Send className="w-4 h-4" />
                    </a>
                  )}
                  {member.socials.email && (
                    <a
                      href={`mailto:${member.socials.email}`}
                      className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-100 dark:hover:bg-red-950/30 flex items-center justify-center transition-all duration-150"
                      title="Email Connect"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Join Us Card */}
          <div className="bg-slate-50/50 dark:bg-slate-900/20 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700/50 p-6 text-center transition-all duration-300 flex flex-col items-center justify-center group cursor-pointer"
               onClick={() => {
                 document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
                 setTimeout(() => {
                   const contactMsg = document.getElementById('contact-message') as HTMLTextAreaElement || document.querySelector('[name="message"]') as HTMLTextAreaElement;
                   if (contactMsg) {
                     contactMsg.value = `سلام تیم ریزمون، من تمایل دارم به عنوان هم‌تیمی به شما ملحق شوم. مهارتهای من شامل...`;
                     contactMsg.focus();
                   }
                 }, 300);
               }}>
            <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex flex-col items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-all duration-300 relative">
               <GraduationCap className="w-8 h-8 text-blue-500 dark:text-blue-400" />
            </div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-lg mb-2">
              جای شما خالیست!
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 max-w-[200px] leading-relaxed">
              ما همیشه مشتاق همکاری با متخصصان و استعدادهای جدید هستیم. توانایی‌های خود را به ما نشان دهید.
            </p>
            <button className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-600 dark:group-hover:border-blue-600 transition-colors shadow-sm">
              ارسال درخواست همکاری
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
