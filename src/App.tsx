/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Team from './components/Team';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';
import ProjectDetail from './components/ProjectDetail';
import ServiceWebApp from './components/ServiceWebApp';
import ServiceUIUX from './components/ServiceUIUX';
import ServicePerformance from './components/ServicePerformance';
import ServiceSEO from './components/ServiceSEO';
import ServiceMobileWeb from './components/ServiceMobileWeb';
import ServiceSecurity from './components/ServiceSecurity';

import { 
  Project, TeamMember, ContactRequest, SecurityConfig, SecurityLog, BlogPost 
} from './types';

import { INITIAL_TEAM, loadFromLocalStorage, saveToLocalStorage } from './data/initialData';
import { api } from './services/api';

import { 
  Code, ShieldCheck, Heart, ExternalLink, Mail, ArrowUpCircle, Zap, ShieldAlert
} from 'lucide-react';
import Blog from './components/Blog';
import BlogPostDetail from './components/BlogPostDetail';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const [projects, setProjects] = useState<Project[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);
  const [securityConfig, setSecurityConfig] = useState<SecurityConfig>({
    is2FAEnabled: false, twoFASecret: '', backupCodes: [], lastLoginAttempts: 0, adminPasswordHash: 'admin123'
  });
  const [securityLogs, setSecurityLogs] = useState<SecurityLog[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme_dark');
    if (saved) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme_dark', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme_dark', 'false');
    }
  }, [isDarkMode]);

  useEffect(() => {
    let savedTeam = loadFromLocalStorage<TeamMember[]>('team', INITIAL_TEAM);
    if (savedTeam.some(member =>
      member.name === 'امیرحسین رضایی' ||
      member.name === 'سارا احمدی' ||
      member.name === 'بردیا سلیمی'
    )) {
      savedTeam = INITIAL_TEAM;
      saveToLocalStorage('team', INITIAL_TEAM);
    }
    setTeam(savedTeam);

    (async () => {
      try {
        const [projs, posts, contacts, config, logs, auth] = await Promise.all([
          api.projects.list().catch(() => []),
          api.blog.list().catch(() => []),
          api.contact.list().catch(() => []),
          api.security.getConfig().catch(() => null),
          api.security.getLogs().catch(() => []),
          api.auth.me().catch(() => ({ isAdmin: false })),
        ]);
        setProjects(projs);
        setBlogPosts(posts);
        setContactRequests(contacts);
        if (config) setSecurityConfig(config as SecurityConfig);
        setSecurityLogs(logs);
        setIsAdminLoggedIn(auth.isAdmin);
      } catch {
        // fallback to empty state
      } finally {
        setIsLoading(false);
      }
    })();

    const handleScrollWatcher = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScrollWatcher);
    return () => window.removeEventListener('scroll', handleScrollWatcher);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const elem = document.getElementById(id);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);

  const handleAddProject = async (newProj: Project) => {
    const created = await api.projects.create(newProj);
    setProjects(prev => [created, ...prev]);
  };

  const handleDeleteProject = async (id: string) => {
    await api.projects.delete(id);
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const handleAddBlogPost = async (post: BlogPost) => {
    const created = await api.blog.create(post);
    setBlogPosts(prev => [created, ...prev]);
  };

  const handleDeleteBlogPost = async (id: string) => {
    await api.blog.delete(id);
    setBlogPosts(prev => prev.filter(p => p.id !== id));
  };

  const handleAddContactRequest = async (req: Omit<ContactRequest, 'id' | 'date' | 'read' | 'ip'>) => {
    const result = await api.contact.submit(req);
    const newRequest: ContactRequest = {
      ...req,
      id: result.id,
      date: new Date().toLocaleDateString('fa-IR', {
        hour: '2-digit', minute: '2-digit', year: 'numeric', month: 'long', day: 'numeric'
      } as any),
      read: false,
      ip: ''
    };
    setContactRequests(prev => [newRequest, ...prev]);
    handleAddSecurityLog({
      action: 'ثبت سرنخ درخواست جدید',
      details: `کاربر "${req.name}" پیام فوری با موضوع "${req.subject}" ثبت نمود.`,
      status: 'info'
    });
  };

  const handleToggleContactRead = async (id: string) => {
    const req = contactRequests.find(c => c.id === id);
    if (!req) return;
    const updated = await api.contact.patch(id, { read: !req.read });
    setContactRequests(prev => prev.map(c => c.id === id ? updated : c));
  };

  const handleAddResponseNote = async (id: string, note: string) => {
    const updated = await api.contact.patch(id, { responseNote: note });
    setContactRequests(prev => prev.map(c => c.id === id ? updated : c));
  };

  const handleDeleteContact = async (id: string) => {
    await api.contact.delete(id);
    setContactRequests(prev => prev.filter(c => c.id !== id));
  };

  const handleUpdateSecurityConfig = async (cfg: SecurityConfig) => {
    const updated = await api.security.updateConfig(cfg as any);
    setSecurityConfig(updated as SecurityConfig);
  };

  const handleAddSecurityLog = async (log: Omit<SecurityLog, 'id' | 'date'>) => {
    try {
      const created = await api.security.addLog(log);
      setSecurityLogs(prev => [created, ...prev]);
    } catch {
      // silent fallback
    }
  };

  const handleAdminLogout = async () => {
    await api.auth.logout().catch(() => {});
    setIsAdminLoggedIn(false);
    handleAddSecurityLog({
      action: 'خروج اختیاری مدیر',
      details: 'مدیر کلید خروج از پرتال را فعال کرد.',
      status: 'info'
    });
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-slate-500">در حال بارگذاری...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-900 bg-white dark:bg-slate-950 dark:text-slate-100 selection:bg-blue-100 dark:selection:bg-blue-900 flex flex-col justify-between transition-colors duration-200" dir="rtl">
      
      <Navbar 
        onOpenAdmin={() => navigate('/admin')}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogoutAdmin={handleAdminLogout}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Services />
              <Portfolio 
                projects={projects} 
                onSelectProject={(id) => navigate(`/project/${id}`)}
              />
              <Team team={team} />
              <Blog posts={blogPosts} onSelectPost={(id) => navigate(`/blog/${id}`)} />
              <Testimonials />
              <FAQ />
              <Contact onAddContactRequest={handleAddContactRequest} />
            </>
          } />
          
          <Route path="/project/:id" element={
            <ProjectRouteWrapper 
              projects={projects} 
              onNavigate={(id) => navigate(`/project/${id}`)}
              onOrder={(title) => {
                navigate('/#contact-section');
                setTimeout(() => {
                  const contactMsg = document.getElementById('contact-message') as HTMLTextAreaElement || document.querySelector('[name="message"]') as HTMLTextAreaElement;
                  if (contactMsg) {
                    contactMsg.value = `سلام تیم ریزمون، بنده مایل به ثبت سفارش و هماهنگی برای طراحی و مهندسی سامانه‌ای بومی و بهینه مشابه طرح "${title}" هستم. لطفا اطلاعات پیوست را برای بنده ارسال فرمایید.`;
                    contactMsg.focus();
                  }
                }, 300);
              }}
            />
          } />

          <Route path="/blog/:id" element={
            <BlogPostRouteWrapper 
              posts={blogPosts}
              onBack={() => navigate('/')}
            />
          } />

          <Route path="/admin" element={
            <AdminPanel
              onClose={() => navigate('/')}
              projects={projects}
              onAddProject={handleAddProject}
              onDeleteProject={handleDeleteProject}
              blogPosts={blogPosts}
              onAddBlogPost={handleAddBlogPost}
              onDeleteBlogPost={handleDeleteBlogPost}
              contactRequests={contactRequests}
              onToggleContactRead={handleToggleContactRead}
              onAddResponseNote={handleAddResponseNote}
              onDeleteContact={handleDeleteContact}
              securityConfig={securityConfig}
              onUpdateSecurityConfig={handleUpdateSecurityConfig}
              securityLogs={securityLogs}
              onAddSecurityLog={handleAddSecurityLog}
              isAdminLoggedIn={isAdminLoggedIn}
              onSetAdminLoggedIn={setIsAdminLoggedIn}
            />
          } />

          <Route path="/services/web-app" element={<ServiceWebApp onBack={() => navigate('/')} />} />
          <Route path="/services/ui-ux" element={<ServiceUIUX onBack={() => navigate('/')} />} />
          <Route path="/services/performance" element={<ServicePerformance onBack={() => navigate('/')} />} />
          <Route path="/services/seo" element={<ServiceSEO onBack={() => navigate('/')} />} />
          <Route path="/services/mobile-web" element={<ServiceMobileWeb onBack={() => navigate('/')} />} />
          <Route path="/services/security" element={<ServiceSecurity onBack={() => navigate('/')} />} />
        </Routes>
      </main>

      {/* Minimal Polished Footer with Arabic script typography */}
      <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-slate-800">
            {/* Branding Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/10">
                  <Code className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-sm text-white tracking-widest">تـیـم ریــز</span>
                  <span className="text-[9px] text-slate-400 font-medium">Bespoke Tiny Engineering</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                طراحی، برنامه‌نویسی و پدافند بومی سیستم‌های تحت وب با تکیه بر سرعت بارگذاری استثنایی و حفظ کامل حریم خصوصی اطلاعات کارفرما.
              </p>
            </div>

            {/* Links Column */}
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wide mb-4">راه‌های ارتباطی پورتال</h4>
              <ul className="space-y-2 text-xs">
                <li className="flex items-center gap-2 text-slate-400">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span>support@tinyteam.ir</span>
                </li>
                <li className="flex items-center gap-2 text-slate-400">
                  <ExternalLink className="w-4 h-4 text-slate-500" />
                  <span>برج نوآوری شریف، طبقه ششم</span>
                </li>
              </ul>
            </div>

            {/* Certifications column */}
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wide mb-4">استانداردهای تضمین کیفیت</h4>
              <div className="flex flex-wrap gap-2 text-[10px]">
                <span className="px-2.5 py-1 bg-slate-800/60 text-blue-400 rounded border border-slate-700/80 font-medium">سرعت بارگذاری کم‌نظیر</span>
                <span className="px-2.5 py-1 bg-slate-800/60 text-slate-300 rounded border border-slate-700/80 font-medium">امنیت و حریم خصوصی پیشرفته</span>
                <span className="px-2.5 py-1 bg-slate-800/60 text-slate-300 rounded border border-slate-700/80 font-medium">کدنویسی استاندارد و خوانا</span>
                <span className="px-2.5 py-1 bg-slate-800/60 text-slate-300 rounded border border-slate-700/80 font-medium">رابط کاربری کاملاً واکنش‌گرا (Responsive)</span>
                <span className="px-2.5 py-1 bg-slate-800/60 text-slate-300 rounded border border-slate-700/80 font-medium">بهینه‌سازی حداکثری هسته و منابع</span>
                <span className="px-2.5 py-1 bg-slate-800/60 text-blue-400 rounded border border-slate-700/80 font-medium">پشتیبانی و نگهداری مداوم</span>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <span>توسعه یافته با عشق و دقت</span>
              <Heart className="w-3 h-3 text-red-500 fill-red-500" />
              <span>توسط گروه برنامه‌نویسان ریزمون</span>
            </div>
            <div className="flex items-center gap-3">
              <span>© ۱۴۰۵ کلیه حقوق برای سرپرست محفوظ است.</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Smooth Back to Top Scroll Assist button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 z-30 group cursor-pointer transition-transform duration-200 hover:-translate-y-1 block"
          title="بازگشت به بالای صفحه"
        >
          <ArrowUpCircle className="w-6 h-6" />
        </button>
      )}

    </div>
  );
}

// Wrapper for ProjectRoute
import { useParams } from 'react-router-dom';
function ProjectRouteWrapper({ projects, onNavigate, onOrder }: any) {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p: any) => p.id === id);
  if (!project) {
    return (
      <div className="py-32 text-center">
        <p className="text-slate-500">پروژه مورد نظر یافت نشد.</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold font-sans cursor-pointer"
        >
          بازگشت به لندینگ
        </button>
      </div>
    );
  }
  return (
    <ProjectDetail 
      project={project}
      allProjects={projects}
      onBack={() => navigate('/')}
      onNavigateToProject={onNavigate}
      onOrderProposal={onOrder}
    />
  );
}

function BlogPostRouteWrapper({ posts, onBack }: any) {
  const { id } = useParams();
  const post = posts.find((p: any) => p.id === id);
  if (!post) {
    return (
      <div className="py-32 text-center">
        <p className="text-slate-500">مقاله مورد نظر یافت نشد.</p>
        <button 
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold font-sans cursor-pointer"
        >
          بازگشت به لندینگ
        </button>
      </div>
    );
  }
  return <BlogPostDetail post={post} onBack={onBack} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
