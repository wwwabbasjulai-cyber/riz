/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Award, Layers, Users, PhoneCall, Code, Sun, Moon, Grid, BookOpen, Heart, HelpCircle } from 'lucide-react';



interface NavbarProps {
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
  onLogoutAdmin: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Navbar({ onOpenAdmin, isAdminLoggedIn, onLogoutAdmin, isDarkMode, onToggleDarkMode }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    
    const isSubPage = window.location.hash !== '' && 
                      window.location.hash !== '#home' && 
                      !window.location.hash.startsWith('#home');

    if (isSubPage) {
      window.location.hash = 'home';
      // Wait for home page elements to mount securely, then scroll
      setTimeout(() => {
        const element = document.getElementById(id);
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
      }, 150);
    } else {
      const element = document.getElementById(id);
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
    }
  };

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm border-b border-blue-50/50 dark:border-slate-800/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Branding */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 transform hover:scale-105 transition-transform duration-200">
              <Code className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-right">
              <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight leading-tight">تـیـم ریـزمـون</span>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium tracking-widest uppercase">Rizmun Coding Team</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-5">
            <button
              onClick={() => scrollToSection('services-section')}
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-xs xl:text-sm flex items-center gap-1.5 transition-colors duration-200 cursor-pointer"
            >
              <Grid className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
              خدمات
            </button>
            <button
              onClick={() => scrollToSection('portfolio-section')}
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-xs xl:text-sm flex items-center gap-1.5 transition-colors duration-200 cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
              نمونه‌کار
            </button>
            <button
              onClick={() => scrollToSection('team-section')}
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-xs xl:text-sm flex items-center gap-1.5 transition-colors duration-200 cursor-pointer"
            >
              <Users className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
              تیم
            </button>
            <button
              onClick={() => scrollToSection('blog-section')}
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-xs xl:text-sm flex items-center gap-1.5 transition-colors duration-200 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
              مجله
            </button>
            <button
              onClick={() => scrollToSection('testimonials-section')}
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-xs xl:text-sm flex items-center gap-1.5 transition-colors duration-200 cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
              نظرات
            </button>
            <button
              onClick={() => scrollToSection('faq-section')}
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-xs xl:text-sm flex items-center gap-1.5 transition-colors duration-200 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
              سوالات
            </button>
            <button
              onClick={() => scrollToSection('contact-section')}
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-xs xl:text-sm flex items-center gap-1.5 transition-colors duration-200 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
              ارتباط
            </button>
          </div>

          {/* Admin Toggle button */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={onToggleDarkMode}
              className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-950 bg-white dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:text-amber-400 transition-all duration-200 cursor-pointer flex items-center justify-center shadow-xs"
              title={isDarkMode ? "حالت روز" : "حالت شب"}
            >
              {isDarkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {/* Theme Toggle Button Mobile */}
            <button
              onClick={onToggleDarkMode}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-500 bg-white dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 transition-all duration-200 cursor-pointer flex items-center justify-center shadow-xs"
              title={isDarkMode ? "حالت روز" : "حالت شب"}
            >
              {isDarkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none transition-colors duration-200 cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 py-4 px-4 ease-in duration-300">
          <div className="flex flex-col gap-4">
            <button
              onClick={() => scrollToSection('services-section')}
              className="text-right text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold py-2 text-sm flex items-center justify-start gap-3 border-b border-slate-50 dark:border-slate-900 cursor-pointer"
            >
              <Grid className="w-4 h-4 text-slate-400" />
              خدمات
            </button>
            <button
              onClick={() => scrollToSection('portfolio-section')}
              className="text-right text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold py-2 text-sm flex items-center justify-start gap-3 border-b border-slate-50 dark:border-slate-900 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-slate-400" />
              نمونه کارها
            </button>
            <button
              onClick={() => scrollToSection('team-section')}
              className="text-right text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold py-2 text-sm flex items-center justify-start gap-3 border-b border-slate-50 dark:border-slate-900 cursor-pointer"
            >
              <Users className="w-4 h-4 text-slate-400" />
              تیم ما
            </button>
            <button
              onClick={() => scrollToSection('blog-section')}
              className="text-right text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold py-2 text-sm flex items-center justify-start gap-3 border-b border-slate-50 dark:border-slate-900 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-slate-400" />
              مجله
            </button>
            <button
              onClick={() => scrollToSection('testimonials-section')}
              className="text-right text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold py-2 text-sm flex items-center justify-start gap-3 border-b border-slate-50 dark:border-slate-900 cursor-pointer"
            >
              <Heart className="w-4 h-4 text-slate-400" />
              نظرات مشتریان
            </button>
            <button
              onClick={() => scrollToSection('faq-section')}
              className="text-right text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold py-2 text-sm flex items-center justify-start gap-3 border-b border-slate-50 dark:border-slate-900 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-slate-400" />
              سوالات متداول
            </button>
            <button
              onClick={() => scrollToSection('contact-section')}
              className="text-right text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold py-2 text-sm flex items-center justify-start gap-3 border-b border-slate-50 dark:border-slate-900 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-slate-400" />
              ارتباط با ما
            </button>
            
          </div>
        </div>
      )}
    </nav>
  );
}
