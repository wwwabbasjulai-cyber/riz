/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { Project, TeamMember, ContactRequest, SecurityConfig, SecurityLog, BlogPost } from '../types';
import { getTOTPToken, getSecondsRemaining, generateSecretKey, generateBackupCodes } from '../utils/totp';
import { compressImage } from '../utils/cache';
import { api } from '../services/api';
import { 
  Lock, Key, ShieldAlert, CheckCircle, Trash2, FileText, Plus, UserPlus, 
  RefreshCw, Shield, AlertTriangle, Play, Calendar, Tag, Image, Clock, Eye, Sliders, LogOut, BookOpen, PenLine
} from 'lucide-react';

interface AdminPanelProps {
  onClose: () => void;
  projects: Project[];
  onAddProject: (proj: Project) => void;
  onUpdateProject: (id: string, proj: Partial<Project>) => void;
  onDeleteProject: (id: string) => void;
  blogPosts: BlogPost[];
  onAddBlogPost: (post: BlogPost) => void;
  onDeleteBlogPost: (id: string) => void;
  contactRequests: ContactRequest[];
  onToggleContactRead: (id: string) => void;
  onAddResponseNote: (id: string, note: string) => void;
  onDeleteContact: (id: string) => void;
  securityConfig: SecurityConfig;
  onUpdateSecurityConfig: (cfg: SecurityConfig) => void;
  securityLogs: SecurityLog[];
  onAddSecurityLog: (log: Omit<SecurityLog, 'id' | 'date'>) => void;
  isAdminLoggedIn: boolean;
  onSetAdminLoggedIn: (status: boolean) => void;
}

export default function AdminPanel({
  onClose,
  projects,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
  blogPosts,
  onAddBlogPost,
  onDeleteBlogPost,
  contactRequests,
  onToggleContactRead,
  onAddResponseNote,
  onDeleteContact,
  securityConfig,
  onUpdateSecurityConfig,
  securityLogs,
  onAddSecurityLog,
  isAdminLoggedIn,
  onSetAdminLoggedIn
}: AdminPanelProps) {
  
  // Login States
  const [passwordInput, setPasswordInput] = useState('');
  const [totpInput, setTotpInput] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Tab control inside admin panel
  const [activeTab, setActiveTab] = useState<'content' | 'blog' | 'requests' | 'security'>('content');

  // New Project Form State
  const [projTitle, setProjTitle] = useState('');
  const [projClient, setProjClient] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [projLongDesc, setProjLongDesc] = useState('');
  const [projTags, setProjTags] = useState('');
  const [projDate, setProjDate] = useState('');
  const [projDemo, setProjDemo] = useState('');
  const [projGithub, setProjGithub] = useState('');
  const [projFeatured, setProjFeatured] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  // New Blog Post Form State
  const [blogTitle, setBlogTitle] = useState('');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogTags, setBlogTags] = useState('');
  const [blogDate, setBlogDate] = useState('');
  
  // Image Compression state variables
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [compressedImageBase64, setCompressedImageBase64] = useState('');
  const [compressionMetrics, setCompressionMetrics] = useState<{
    originalSize: string;
    compressedSize: string;
    ratio: string;
  } | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);

  // 2FA wizard state
  const [isConfiguring2FA, setIsConfiguring2FA] = useState(false);
  const [tempSecret, setTempSecret] = useState('');
  const [tempBackupCodes, setTempBackupCodes] = useState<string[]>([]);
  const [setupTotpVerify, setSetupTotpVerify] = useState('');
  const [setup2FAError, setSetup2FAError] = useState('');

  // Live TOTP code showing to make testing and bypass extremely clean
  const [secondsRemaining, setSecondsRemaining] = useState(30);
  const [liveToken, setLiveToken] = useState('');

  // Quick reply note states
  const [replyTextMap, setReplyTextMap] = useState<{ [id: string]: string }>({});

  // Countdown timer for 2FA verification cycle
  useEffect(() => {
    if (securityConfig.is2FAEnabled || isConfiguring2FA) {
      const activeSecret = isConfiguring2FA ? tempSecret : securityConfig.twoFASecret;
      if (activeSecret) {
        setLiveToken(getTOTPToken(activeSecret));
      }
      
      const interval = setInterval(() => {
        const remaining = getSecondsRemaining();
        setSecondsRemaining(remaining);
        if (remaining === 30) {
          setLiveToken(getTOTPToken(activeSecret));
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [securityConfig.is2FAEnabled, isConfiguring2FA, tempSecret, securityConfig.twoFASecret]);

  // Handle system admin authentication
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    try {
      await api.auth.login(passwordInput, totpInput || undefined);
      onAddSecurityLog({
        action: 'ورود موفق مدیر',
        details: `ورود با موفقیت انجام شد.`,
        status: 'success'
      });
      onSetAdminLoggedIn(true);
      setPasswordInput('');
      setTotpInput('');
    } catch (err: any) {
      onAddSecurityLog({
        action: 'ورود ناموفق',
        details: err.message || 'خطا در ورود',
        status: 'failed'
      });
      setLoginError(err.message || 'خطا در برقراری ارتباط با سرور');
    }
  };

  // Image File Handling & Canvas Compression triggering
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setIsCompressing(true);
    
    try {
      // Compress with 1000px max width at 75% quality conversion WebP
      const compressedObj = await compressImage(file, 900, 0.75);
      setCompressedImageBase64(compressedObj.base64);
      setCompressionMetrics({
        originalSize: compressedObj.originalSize,
        compressedSize: compressedObj.compressedSize,
        ratio: compressedObj.ratio
      });
    } catch (err) {
      console.error('Image compression failed', err);
    } finally {
      setIsCompressing(false);
    }
  };

  // Handle Project publishing with compression ratios integrated
  const handlePublishProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle || !projClient || !projDesc) return;

    const projectImage = compressedImageBase64 || 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=80';

    const projectData = {
      title: projTitle,
      client: projClient,
      description: projDesc,
      longDescription: projLongDesc,
      image: projectImage,
      tags: projTags ? projTags.split(',').map(t => t.trim()) : ['React'],
      date: projDate || 'امروز',
      demoUrl: projDemo,
      githubUrl: projGithub,
      featured: projFeatured,
    };

    if (editingProjectId) {
      await onUpdateProject(editingProjectId, projectData);
      onAddSecurityLog({
        action: 'ویرایش پروژه',
        details: `پروژه "${projTitle}" ویرایش شد.`,
        status: 'success'
      });
    } else {
      const newProject: Project = { id: `proj-${Date.now()}`, ...projectData, originalSize: compressionMetrics ? compressionMetrics.originalSize : '1.4 MB', compressedSize: compressionMetrics ? compressionMetrics.compressedSize : '110 KB' };
      onAddProject(newProject);
      onAddSecurityLog({
        action: 'انتشار پروژه جدید',
        details: `پروژه "${projTitle}" در آلبوم مستندات ثبت شد.`,
        status: 'success'
      });
    }

    setEditingProjectId(null);
    setProjTitle('');
    setProjClient('');
    setProjDesc('');
    setProjLongDesc('');
    setProjTags('');
    setProjDate('');
    setProjDemo('');
    setProjGithub('');
    setProjFeatured(false);
    setSelectedFile(null);
    setCompressedImageBase64('');
    setCompressionMetrics(null);
  };

  const handleEditProject = (p: Project) => {
    setEditingProjectId(p.id);
    setProjTitle(p.title);
    setProjClient(p.client);
    setProjDesc(p.description);
    setProjLongDesc(p.longDescription || '');
    setProjTags(p.tags.join(', '));
    setProjDate(p.date);
    setProjDemo(p.demoUrl || '');
    setProjGithub(p.githubUrl || '');
    setProjFeatured(p.featured);
    setCompressedImageBase64('');
    setCompressionMetrics(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingProjectId(null);
    setProjTitle('');
    setProjClient('');
    setProjDesc('');
    setProjLongDesc('');
    setProjTags('');
    setProjDate('');
    setProjDemo('');
    setProjGithub('');
    setProjFeatured(false);
    setSelectedFile(null);
    setCompressedImageBase64('');
    setCompressionMetrics(null);
  };

  // Handle Blog Post publishing
  const handlePublishBlogPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle || !blogExcerpt || !blogContent) return;

    // Default image in case they didn't upload or choose one
    const postCoverImage = compressedImageBase64 || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=80';

    const newPost: BlogPost = {
      id: `blog-${Date.now()}`,
      title: blogTitle,
      excerpt: blogExcerpt,
      content: blogContent,
      author: blogAuthor || 'تیم تحریریه ریزمون',
      coverImage: postCoverImage,
      tags: blogTags ? blogTags.split(',').map(t => t.trim()) : ['مقاله'],
      date: blogDate || new Date().toLocaleDateString('fa-IR')
    };

    onAddBlogPost(newPost);
    
    onAddSecurityLog({
      action: 'انتشار مقاله جدید',
      details: `مقاله "${blogTitle}" در مجله منتشر شد.`,
      status: 'success'
    });

    // Reset Form
    setBlogTitle('');
    setBlogExcerpt('');
    setBlogContent('');
    setBlogAuthor('');
    setBlogTags('');
    setBlogDate('');
    setSelectedFile(null);
    setCompressedImageBase64('');
    setCompressionMetrics(null);
  };

  // 2FA Setup activation
  const handleInitiate2FASetup = () => {
    const generatedSecret = generateSecretKey();
    const codes = generateBackupCodes();
    
    setTempSecret(generatedSecret);
    setTempBackupCodes(codes);
    setIsConfiguring2FA(true);
    setSetupTotpVerify('');
    setSetup2FAError('');
  };

  const handleVerify2FASetup = (e: React.FormEvent) => {
    e.preventDefault();
    setSetup2FAError('');

    // Compute expected client side code
    const currentExpected = getTOTPToken(tempSecret);
    
    if (setupTotpVerify !== currentExpected) {
      setSetup2FAError('کد وارد شده صحیح نیست. مجددا همگام‌سازی کنید.');
      return;
    }

    // Setup success! Commit to active state
    onUpdateSecurityConfig({
      ...securityConfig,
      is2FAEnabled: true,
      twoFASecret: tempSecret,
      backupCodes: tempBackupCodes,
      lastLoginAttempts: 0,
      adminPasswordHash: securityConfig.adminPasswordHash
    });

    onAddSecurityLog({
      action: 'فعال‌سازی هویت دو مرحله‌ای (2FA)',
      details: 'پروتکل امنیتی تایید دو مرحله‌ای (TOTP) بر روی پنل مدیریت فعال گردید',
      status: 'success'
    });

    setIsConfiguring2FA(false);
  };

  const handleDisable2FA = () => {
    onUpdateSecurityConfig({
      ...securityConfig,
      is2FAEnabled: false,
      twoFASecret: '',
      backupCodes: []
    });

    onAddSecurityLog({
      action: 'غیرفعال‌سازی هویت دو مرحله‌ای',
      details: 'مدیر تایید دو مرحله‌ای را لغو کرد پورتال در برابر عوامل مخرب تضعیف شد',
      status: 'warning'
    });
  };

  const handleReplyNoteSubmit = (id: string) => {
    const note = replyTextMap[id];
    if (!note) return;
    
    onAddResponseNote(id, note);
    setReplyTextMap(prev => ({ ...prev, [id]: '' }));
    
    onAddSecurityLog({
      action: 'ثبت یادداشت پاسخ پیام',
      details: `مدیر یادداشت پاسخی برای درخواست ${id} تنظیم کرد`,
      status: 'info'
    });
  };

  const logoutAdmin = async () => {
    await api.auth.logout().catch(() => {});
    onAddSecurityLog({
      action: 'خروج مدیر',
      details: 'خروج ایمن از داشبورد مدیریت ثبت شد',
      status: 'info'
    });
    onSetAdminLoggedIn(false);
  };

  return (
    <div className="pt-24 pb-16 bg-slate-50 dark:bg-slate-950/40 min-h-screen flex items-start justify-center p-4">
      <div 
        className="bg-white dark:bg-slate-950 w-full max-w-6xl rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col md:flex-row text-right transition-colors duration-200" 
        dir="rtl"
      >
        
        {/* LOGGED IN VIEW */}
        {isAdminLoggedIn ? (
          <>
            {/* Sidebar with Navigation Tabs inside Admin */}
            <div className="md:w-64 bg-slate-50 dark:bg-slate-900/60 p-6 border-l border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div>
                {/* Visual identity avatar for admin */}
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-200/60 dark:border-slate-800/65">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-xs">پانل سرپرست ریزمون</h4>
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping" />
                      نشست فعال کاربری
                    </span>
                  </div>
                </div>

                {/* Tabs */}
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('content')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'content'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                    انتشار نمونه کار جدید
                  </button>
                  <button
                    onClick={() => setActiveTab('blog')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'blog'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    مدیریت مقالات بلاگ
                  </button>
                  <button
                    onClick={() => setActiveTab('requests')}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'requests'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <FileText className="w-4 h-4" />
                      گزارش درخواست کاربران
                    </span>
                    {contactRequests.filter(r => !r.read).length > 0 && (
                      <span className="bg-red-500 text-white rounded-full text-[10px] px-1.5 py-0.5 font-bold">
                        {contactRequests.filter(r => !r.read).length}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('security')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'security'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Sliders className="w-4 h-4" />
                    تقویت امنیت و احراز دو مرحله‌ای
                  </button>
                </nav>
              </div>

              {/* Sidebar bottom action */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={logoutAdmin}
                  className="w-full py-2.5 rounded-xl border border-red-200 dark:border-red-950/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  خروج صادرکننده نشست
                </button>
                <button
                  onClick={onClose}
                  className="w-full mt-2 text-center text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
                >
                  بازگشت به سایت
                </button>
              </div>
            </div>

            {/* Admin Content Area */}
            <div className="flex-1 p-6 md:p-8">
              
              {/* TAB 1: ADD CONTENT */}
              {activeTab === 'content' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-xl">{editingProjectId ? 'ویرایش پروژه' : 'انتشار پروژه در پورتفولیو'}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {editingProjectId ? 'تغییرات مورد نظر را اعمال کنید.' : 'پروژه‌های تکمیل‌شده جدید را به سرعت به سایت منتقل کنید.'}
                    </p>
                  </div>

                  <form onSubmit={handlePublishProject} className="space-y-4">
                    {/* Visual Asset Uploader with HTML5 Canvas Realtime Compression Metric display! */}
                    <div className="p-5 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-blue-50/20 dark:bg-blue-955/10 hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
                      <div className="flex flex-col items-center text-center">
                        <Image className="w-8 h-8 text-blue-500 mb-2" />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">تصویر اسکرین‌شات پروژه</span>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">فرمت‌های JPG، PNG و WebP تا حجم ۱۰ مگابایت</p>
                        
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="mt-3 text-xs w-full max-w-xs text-slate-650 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-blue-600 file:text-white file:text-xs file:font-semibold hover:file:bg-blue-700 cursor-pointer"
                        />
                      </div>

                      {/* Display compression telemetry if file selected or compressing */}
                      {isCompressing && (
                        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-blue-600 dark:text-blue-400 animate-pulse bg-white dark:bg-slate-900 p-3 rounded-xl border border-blue-100 dark:border-blue-900/40">
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>در حال بهینه‌سازی فایل تصویری...</span>
                        </div>
                      )}

                      {!isCompressing && compressionMetrics && (
                        <div className="mt-4 bg-emerald-50/60 dark:bg-emerald-950/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/40 text-xs text-slate-700 dark:text-slate-300 space-y-2">
                          <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-400 font-extrabold mb-1">
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                            <span>تصویر فشرده شده آماده انتشار است:</span>
                            <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 px-2 py-0.5 rounded text-[10px]">{compressionMetrics.ratio} کاهش حجم!</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-slate-600 dark:text-slate-450 text-[10px] font-mono">
                            <div>وزن اصلی تصویر: <span className="font-bold text-slate-800 dark:text-slate-205">{compressionMetrics.originalSize}</span></div>
                            <div>وزن نهایی فشرده: <span className="font-extrabold text-blue-600 dark:text-blue-400">{compressionMetrics.compressedSize} (WebP)</span></div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 dark:text-slate-350 mb-1">عنوان پروژه:</label>
                        <input
                          type="text"
                          required
                          value={projTitle}
                          onChange={(e) => setProjTitle(e.target.value)}
                          placeholder="مثال: سامانه ابری مدیریت کالا"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 dark:text-slate-350 mb-1">نام کارفرما / کلاینت:</label>
                        <input
                          type="text"
                          required
                          value={projClient}
                          onChange={(e) => setProjClient(e.target.value)}
                          placeholder="مثال: هلدینگ پارس خودرو"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-350 mb-1">توضیح کوتاه روی کارت پروژه:</label>
                      <input
                        type="text"
                        required
                        value={projDesc}
                        onChange={(e) => setProjDesc(e.target.value)}
                        placeholder="یک جمله کوتاه و جامع به فوت کوزه‌گری مجهز"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-350 mb-1">توضیحات عمیق فنی و مستندات (اختیاری):</label>
                      <textarea
                        rows={3}
                        value={projLongDesc}
                        onChange={(e) => setProjLongDesc(e.target.value)}
                        placeholder="جزئیات و چالش‌های پروژه چطور برطرف شد..."
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 dark:text-slate-350 mb-1">تگ‌های تکنولوژی (با کاما جدا شوند):</label>
                        <input
                          type="text"
                          value={projTags}
                          onChange={(e) => setProjTags(e.target.value)}
                          placeholder="React, Vue, Golang, Py"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 dark:text-slate-350 mb-1">تاریخ تکمیل:</label>
                        <input
                          type="text"
                          value={projDate}
                          onChange={(e) => setProjDate(e.target.value)}
                          placeholder="مثال: خرداد ۱۴۰۵"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 dark:text-slate-350 mb-1">آدرس پیش‌نمایش دمو (اختیاری):</label>
                        <input
                          type="text"
                          value={projDemo}
                          onChange={(e) => setProjDemo(e.target.value)}
                          placeholder="https://example.com"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs text-left focus:outline-none focus:border-blue-500"
                          dir="ltr"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 dark:text-slate-350 mb-1">آدرس گیت‌هاب منبع (اختیاری):</label>
                        <input
                          type="text"
                          value={projGithub}
                          onChange={(e) => setProjGithub(e.target.value)}
                          placeholder="https://github.com/my-repo"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs text-left focus:outline-none focus:border-blue-500"
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="featured-check"
                        checked={projFeatured}
                        onChange={(e) => setProjFeatured(e.target.checked)}
                        className="rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                      <label htmlFor="featured-check" className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">قرار دادن به عنوان پروژه برجسته دپارتمان</label>
                    </div>

                    <div className="flex gap-3">
                      {editingProjectId && (
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="w-1/3 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-all cursor-pointer"
                        >
                          انصراف
                        </button>
                      )}
                      <button
                        type="submit"
                        className={`${editingProjectId ? 'w-2/3' : 'w-full'} py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer`}
                      >
                        {editingProjectId ? 'ذخیره تغییرات پروژه' : 'ثبت و بارگذاری پروژه در سایت'}
                      </button>
                    </div>
                  </form>

                  {/* Portfolio Projects list within Admin */}
                  <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                    <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm mb-4">آرشیو پروژه‌های قابل مدیریت:</h4>
                    <div className="space-y-2">
                      {projects.map((p) => (
                        <div key={p.id} className={`flex items-center justify-between p-3 rounded-xl text-xs ${
                          editingProjectId === p.id 
                            ? 'bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800' 
                            : 'bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800'
                        }`}>
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="bg-blue-100 dark:bg-blue-950/65 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded text-[10px] font-bold shrink-0">{p.client}</span>
                            <span className="font-extrabold text-slate-800 dark:text-slate-200 truncate">{p.title}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {editingProjectId === p.id && (
                              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold ml-1">در حال ویرایش</span>
                            )}
                            <button
                              onClick={() => handleEditProject(p)}
                              className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg transition-colors cursor-pointer"
                              title="ویرایش پروژه"
                            >
                              <PenLine className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                onDeleteProject(p.id);
                                onAddSecurityLog({
                                  action: 'حذف پروژه',
                                  details: `مدیر پروژه "${p.title}" را از آرشیو خارج کرد`,
                                  status: 'warning'
                                });
                              }}
                              className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors cursor-pointer"
                              title="حذف پروژه"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 1.5: BLOG MANAGEMENT */}
              {activeTab === 'blog' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-xl">مدیریت مقالات بلاگ</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      ایجاد و انتشار مقالات تخصصی و آموزشی در مجله ریزمون.
                    </p>
                  </div>

                  <form onSubmit={handlePublishBlogPost} className="space-y-4">
                    {/* Visual Asset Uploader (Reused for Blog) */}
                    <div className="p-5 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-blue-50/20 dark:bg-blue-955/10 hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
                      <div className="flex flex-col items-center text-center">
                        <Image className="w-8 h-8 text-blue-500 mb-2" />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">تصویر کاور مقاله</span>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">فرمت‌های JPG، PNG و WebP تا حجم ۱۰ مگابایت</p>
                        
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="mt-3 text-xs w-full max-w-xs text-slate-650 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-blue-600 file:text-white file:text-xs file:font-semibold hover:file:bg-blue-700 cursor-pointer"
                        />
                      </div>

                      {isCompressing && (
                        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-blue-600 dark:text-blue-400 animate-pulse bg-white dark:bg-slate-900 p-3 rounded-xl border border-blue-100 dark:border-blue-900/40">
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>در حال بهینه‌سازی کادر تصویر...</span>
                        </div>
                      )}

                      {!isCompressing && compressionMetrics && (
                        <div className="mt-4 bg-emerald-50/60 dark:bg-emerald-950/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/40 text-xs text-slate-700 dark:text-slate-300 space-y-2">
                          <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-400 font-extrabold mb-1">
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                            <span>تصویر فشرده شده آماده انتشار است:</span>
                            <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 px-2 py-0.5 rounded text-[10px]">{compressionMetrics.ratio} کاهش حجم!</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 dark:text-slate-350 mb-1">عنوان مقاله:</label>
                        <input
                          type="text"
                          required
                          value={blogTitle}
                          onChange={(e) => setBlogTitle(e.target.value)}
                          placeholder="مثال: آموزش بهینه‌سازی React"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 dark:text-slate-350 mb-1">نام نویسنده (اختیاری):</label>
                        <input
                          type="text"
                          value={blogAuthor}
                          onChange={(e) => setBlogAuthor(e.target.value)}
                          placeholder="مثال: علی احمدی"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-350 mb-1">خلاصه (در لیست مقالات):</label>
                      <textarea
                        required
                        rows={2}
                        value={blogExcerpt}
                        onChange={(e) => setBlogExcerpt(e.target.value)}
                        placeholder="یک پاراگراف کوتاه برای معرفی مقاله..."
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="prose-form">
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-350 mb-1">محتوای کامل مقاله:</label>
                      <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 text-slate-900 bg-white">
                        <JoditEditor
                          value={blogContent}
                          config={{
                            readonly: false,
                            placeholder: 'متن کامل مقاله...',
                            direction: 'rtl',
                            height: 400,
                            language: 'fa',
                            buttons: ['bold', 'italic', 'underline', 'strikethrough', 'ul', 'ol', 'font', 'fontsize', 'paragraph', 'image', 'video', 'link', 'align', 'undo', 'redo', 'hr', 'eraser', 'fullsize']
                          }}
                          onBlur={newContent => setBlogContent(newContent)}
                          onChange={newContent => {}}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 dark:text-slate-350 mb-1">تاریخ انتشار:</label>
                        <input
                          type="text"
                          value={blogDate}
                          onChange={(e) => setBlogDate(e.target.value)}
                          placeholder="مثال: ۲۲ فروردین ۱۴۰۶"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 dark:text-slate-350 mb-1">تگ‌ها (با کاما جدا شوند):</label>
                        <input
                          type="text"
                          value={blogTags}
                          onChange={(e) => setBlogTags(e.target.value)}
                          placeholder="هوش مصنوعی, برنامه نویسی"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      ثبت و انتشار مقاله در مجله
                    </button>
                  </form>

                  {/* Blog Archive List */}
                  <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                    <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm mb-4">آرشیو مقالات مجله:</h4>
                    <div className="space-y-2">
                      {blogPosts.map((p) => (
                        <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-xs">
                          <div className="flex items-center gap-3">
                            <span className="font-extrabold text-slate-800 dark:text-slate-200">{p.title}</span>
                          </div>
                          <button
                            onClick={() => {
                              onDeleteBlogPost(p.id);
                              onAddSecurityLog({
                                action: 'حذف مقاله',
                                details: `مدیر مقاله "${p.title}" را حذف کرد`,
                                status: 'warning'
                              });
                            }}
                            className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors cursor-pointer"
                            title="حذف مقاله"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 2: REQUEST REPORTS */}
              {activeTab === 'requests' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-xl">درخواست‌های ثبت‌شده کاربران</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      پیام‌هایی که از طریق فرم تماس لندینگ‌پارت به لایه‌های امنیتی ثبت شده است.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {contactRequests.length === 0 ? (
                      <div className="text-center py-12 p-6 bg-slate-50 dark:bg-slate-900/20 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl text-slate-400">
                        پیامی در این سرخط ثبت نشده است.
                      </div>
                    ) : (
                      contactRequests.map((req) => (
                        <div 
                          key={req.id} 
                          className={`p-5 rounded-2xl border transition-all ${
                            req.read 
                              ? 'bg-white dark:bg-slate-950 border-slate-200/80 dark:border-slate-800' 
                              : 'bg-blue-50/20 dark:bg-blue-900/10 border-blue-200 dark:border-blue-900 shadow-sm'
                          }`}
                        >
                          {/* Header of message */}
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className={`w-2.5 h-2.5 rounded-full ${req.read ? 'bg-slate-300 dark:bg-slate-700' : 'bg-blue-600'}`} />
                                <h4 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">{req.name}</h4>
                                <span className="text-[10px] text-slate-400 dark:text-slate-500">({req.email})</span>
                              </div>
                              <p className="text-xs font-bold text-slate-600 dark:text-slate-350 mt-1">موضوع: {req.subject}</p>
                            </div>
                            <div className="text-right flex items-center gap-3">
                              <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded">{req.date}</span>
                              <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">IP: {req.ip || '127.0.0.1'}</span>
                            </div>
                          </div>

                          {/* Mess Contents */}
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl mb-4">
                            {req.message}
                          </p>

                          {/* Saved Response Notes if exist */}
                          {req.responseNote && (
                            <div className="mb-4 bg-emerald-50/50 dark:bg-emerald-950/15 border border-emerald-100 dark:border-emerald-900/40 p-3 rounded-xl text-xs">
                              <span className="font-extrabold text-emerald-800 dark:text-emerald-450 block mb-1">پاسخ ثبت شده سرپرست:</span>
                              <p className="text-slate-700 dark:text-slate-300 font-medium">{req.responseNote}</p>
                            </div>
                          )}

                          {/* Reply / Read actions */}
                          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-50 dark:border-slate-800">
                            
                            {/* Actions block */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => onToggleContactRead(req.id)}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
                                  req.read 
                                    ? 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-450' 
                                    : 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 hover:bg-blue-200'
                                }`}
                              >
                                {req.read ? 'علامت به عنوان نخوانده' : 'علامت به عنوان خوانده شده'}
                              </button>

                              <button
                                onClick={() => onDeleteContact(req.id)}
                                className="p-1 px-2.5 rounded-lg text-red-650 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-750 transition-colors cursor-pointer text-[10px] font-bold"
                              >
                                حذف درخواست
                              </button>
                            </div>

                            {/* Reply Input */}
                            <div className="w-full md:w-auto flex items-center gap-2">
                              <input
                                type="text"
                                value={replyTextMap[req.id] || ''}
                                onChange={(e) => setReplyTextMap(prev => ({ ...prev, [req.id]: e.target.value }))}
                                placeholder="یادداشت پیگیری مدیر..."
                                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-[11px] w-full md:w-56 focus:outline-none focus:border-blue-500"
                              />
                              <button
                                onClick={() => handleReplyNoteSubmit(req.id)}
                                className="px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-800 text-white dark:text-slate-100 font-bold text-[10px] hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors whitespace-nowrap cursor-pointer"
                              >
                                ثبت پاسخ
                              </button>
                            </div>

                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: SECURITY CONTROLS */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-xl">تقویت پدافند و احراز ۲ مرحله‌ای</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      تنظیمات نظارت امنیتی برای جلوگیری از نفوذ متخاصمان و محافظت از پورتفولیوی شرکت ریزمون.
                    </p>
                  </div>

                  {/* 2FA Panel status */}
                  <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl ${securityConfig.is2FAEnabled ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-910/20 text-red-500'}`}>
                          <Shield className="w-6 h-6 animate-pulse" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">وضعیت احراز هویت دو مرحله‌ای (2FA)</h4>
                          <span className={`text-[10px] font-semibold mt-1 block ${securityConfig.is2FAEnabled ? 'text-emerald-600' : 'text-red-500 animate-pulse'}`}>
                            {securityConfig.is2FAEnabled ? '● سپر محافظتی فعال است (TOTP-Driven)' : '❌ سپر محافظتی خاموش است (وضعیت مخاطره‌آمیز)'}
                          </span>
                        </div>
                      </div>

                      {securityConfig.is2FAEnabled ? (
                        <button
                          onClick={handleDisable2FA}
                          className="px-4 py-2 bg-red-50 dark:bg-red-950 hover:bg-red-100 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 rounded-xl text-xs font-bold transition-all cursor-pointer"
                        >
                          خاموش کردن کد دو مرحله‌ای
                        </button>
                      ) : (
                        <button
                          onClick={handleInitiate2FASetup}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-extrabold shadow-md transition-all cursor-pointer"
                        >
                          پیکربندی و فعال‌سازی ۲ مرحله‌ای
                        </button>
                      )}
                    </div>

                    {/* 2FA SETUP FLOW WIZARD */}
                    {isConfiguring2FA && (
                      <div className="p-5 bg-blue-50/40 dark:bg-blue-955/10 rounded-2xl border border-blue-200 dark:border-blue-900/60 space-y-4 fade-in-up">
                        <div className="flex items-center justify-between pb-3 border-b border-blue-100 dark:border-blue-900/40">
                          <h5 className="font-extrabold text-blue-900 dark:text-blue-400 text-xs">مراحل فعال‌سازی پدافند دو مرحله‌ای (TOTP)</h5>
                          <button 
                            onClick={() => setIsConfiguring2FA(false)} 
                            className="text-xs text-red-500 hover:underline cursor-pointer"
                          >
                            انصراف از راه اندازی
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-xs">
                          {/* Instructions */}
                          <div className="md:col-span-8 space-y-3 leading-relaxed">
                            <p className="font-medium text-slate-700 dark:text-slate-300">
                              در اینجا کلید راه‌اندازی خصوصی شما قرار دارد. این کلید را در یک نرم‌افزار احراز هویت محبوب (مانند Google Authenticator، Microsoft Authenticator یا 1Password) اسکن یا به صورت دستی وارد کنید:
                            </p>
                            
                            {/* Manual Key display */}
                            <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-300 dark:border-slate-800 flex items-center justify-between font-mono font-bold text-slate-800 dark:text-slate-100 text-center">
                              <span>{tempSecret}</span>
                              <span className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded font-sans cursor-pointer active:scale-95 transition-all" onClick={() => navigator.clipboard.writeText(tempSecret)}>کپی کردن کلید</span>
                            </div>

                            {/* Backup codes */}
                            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 p-3 rounded-xl">
                              <span className="font-extrabold text-amber-900 dark:text-amber-400 block mb-1">کدهای اضطراری پشتیبان (یک‌بار مصرف):</span>
                              <p className="text-[11px] text-slate-600 dark:text-slate-455 mb-2">در صورتی که به موبایل خود دسترسی نداشتید از این کدها به جای توکن استفاده کنید. حتما آنها را یادداشت کنید:</p>
                              <div className="grid grid-cols-3 gap-2 font-mono text-[10px] font-bold text-center">
                                {tempBackupCodes.map(code => (
                                  <span key={code} className="bg-white dark:bg-slate-900 p-1 rounded border border-amber-200 dark:border-amber-900 text-slate-800 dark:text-amber-200">{code}</span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Simulated Canvas QR Code & Token Generator Live Preview */}
                          <div className="md:col-span-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-300 dark:border-slate-800 flex flex-col items-center justify-center text-center space-y-3">
                            <span className="font-extrabold text-[10px] text-slate-500 dark:text-slate-400">بارکد شبیه سازی شده هویت ریزمون</span>
                            
                            {/* Simulated QR block layout */}
                            <div className="w-32 h-32 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 flex items-center justify-center relative">
                              <svg className="w-full h-full text-slate-900 dark:text-slate-100 fill-current" viewBox="0 0 24 24">
                                <path d="M2 2h6v6H2zM4 4v2h2V4zm10-2h8v8h-8zm2 2v4h4V4zM2 14h6v6H2zm2 2v2h2v-2zm12 0h2v2h-2zm4 2h2v2h-2zm-4 2h4v2h-4zm2-6h2v2h-2zm2 2h2v2h-2zm-6 2h2v2h-2zm2-4h2v2h-2zm-6-2h2v2H8zm-2 2h2v2H6zm6-4h2v2h-2z" />
                              </svg>
                            </div>

                            {/* Dynamically ticking token preview to make bypass / testing extremely fast! */}
                            <div className="bg-blue-50 dark:bg-blue-955/20 border border-blue-100 dark:border-blue-900/40 p-2.5 rounded-lg w-full">
                              <span className="text-[9px] text-slate-450 dark:text-slate-400 block font-sans">تیکر زنده شبیه‌ساز توکن</span>
                              <div className="font-mono text-base font-extrabold text-blue-600 dark:text-blue-400 my-0.5 tracking-widest">{liveToken}</div>
                              <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden mt-1 bg-slate-200/50 dark:bg-slate-800">
                                <div 
                                  className="bg-blue-600 h-full transition-all duration-1000" 
                                  style={{ width: `${(secondsRemaining / 30) * 100}%` }}
                                />
                              </div>
                              <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono mt-1 block">تغییر کد در {secondsRemaining} ثانیه</span>
                            </div>
                          </div>
                        </div>

                        {/* Setup verification form */}
                        <form onSubmit={handleVerify2FASetup} className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row items-center gap-4">
                          <div className="flex-1">
                            <label className="block text-xs font-bold text-slate-600 dark:text-slate-350 mb-1">برای تایید فعال‌سازی، کد ۶ رقمی شبیه‌ساز یا موبایل را وارد کنید:</label>
                            <input
                              type="text"
                              required
                              value={setupTotpVerify}
                              onChange={(e) => setSetupTotpVerify(e.target.value)}
                              placeholder="۶ رقم نهایی مثال: ۱۲۳۴۵۶"
                              className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-center font-mono font-bold text-sm"
                            />
                            {setup2FAError && <p className="text-[10px] text-red-500 font-bold mt-1">{setup2FAError}</p>}
                          </div>
                          <button
                            type="submit"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-6 py-2.5 text-xs font-bold whitespace-nowrap cursor-pointer mt-4 md:mt-0"
                          >
                            تایید صحت و قفل پورتال
                          </button>
                        </form>
                      </div>
                    )}
                  </div>

                  {/* Security Logs list */}
                  <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">سیاهه گزارشات امنیتی و پدافندی (Security Logs):</h4>
                      <span className="text-[10px] text-slate-450 dark:text-slate-500 font-mono font-sans mt-0.5">آخرین رخدادها</span>
                    </div>

                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {securityLogs.map((log) => (
                        <div 
                          key={log.id} 
                          className="flex items-start justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-xs gap-4"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${
                                log.status === 'success' ? 'bg-emerald-500' :
                                log.status === 'failed' ? 'bg-red-500' :
                                log.status === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                              }`} />
                              <span className="font-extrabold text-slate-800 dark:text-slate-200">{log.action}</span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal pr-4">{log.details}</p>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 whitespace-nowrap">{log.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

            </div>
          </>
        ) : (
          
          /* LOGGED OUT LOGIN VIEW */
          <div className="w-full p-6 md:p-12">
            <div className="max-w-md mx-auto text-center space-y-6">
              
              {/* Identity Header */}
              <div className="inline-flex w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900 items-center justify-center text-blue-600 dark:text-blue-400 mb-2">
                <Lock className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-2xl">ورود به پرتال پایش و پدافند</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  جهت دسترسی به پنل مدیریت نمونه کارها، تایید هویت دو مرحله‌ای الزامی است.
                </p>
              </div>

              {loginError && (
                <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/60 text-red-700 dark:text-red-400 rounded-xl text-xs flex items-center gap-2 text-right">
                  <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              {/* Password & TOTP Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-4 text-right">
                <div>
                  <label htmlFor="admin-pass" className="block text-xs font-bold text-slate-600 dark:text-slate-350 mb-1">کلمه عبور سرپرست (پسورد دمو: admin123):</label>
                  <div className="relative">
                    <input
                      id="admin-pass"
                      type="password"
                      required
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-center text-sm font-mono focus:outline-none focus:border-blue-500"
                    />
                    <Key className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                  </div>
                </div>

                {/* If 2FA enabled, display TOTP field */}
                {securityConfig.is2FAEnabled && (
                  <div className="bg-slate-50 dark:bg-slate-900 p-4 border border-blue-100 dark:border-blue-900/40 rounded-2xl">
                    <label htmlFor="admin-totp" className="block text-xs font-bold text-blue-800 dark:text-blue-400 mb-1">یک‌بار مصرف ۶ رقمی یا کد اضطراری ۲ مرحله‌ای:</label>
                    <input
                      id="admin-totp"
                      type="text"
                      required
                      value={totpInput}
                      onChange={(e) => setTotpInput(e.target.value)}
                      placeholder="مثال: ۱۲۳۴۵۶ یا XXXX-XXXX"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-center font-mono font-bold text-sm"
                    />
                    <div className="flex items-center justify-between mt-3 text-[10px] text-slate-500 dark:text-slate-400">
                      <span>کد را از نرم‌افزار احراز هویت بخوانید</span>
                      <span>تیکر فعال است</span>
                    </div>

                    {/* Highly useful hint to help user test 2FA if they don't have code generators! */}
                    <div className="bg-white dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 mt-2 text-right">
                      <span className="font-bold text-[9px] text-slate-600 dark:text-slate-400 block mb-0.5">💡 شبیه‌ساز توکن زنده در پورتال موازی:</span>
                      <p className="text-[9px] text-slate-400 dark:text-slate-500 leading-normal">
                        برای تست ۲ مرحله‌ای بدون نیاز به اپ، از این کد با رفرش ۳۰ ثانیه‌ای استفاده کنید: <span className="font-mono font-extrabold text-blue-600 dark:text-blue-400">{getTOTPToken(securityConfig.twoFASecret)}</span>
                      </p>
                    </div>

                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all active:translate-y-px cursor-pointer"
                  >
                    تایید اعتبار و پیوستن به نشست
                  </button>
                </div>
              </form>

              {/* Back to site link */}
              <div>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:underline cursor-pointer"
                >
                  انصراف و لغو ورود (بازگشت به لندینگ)
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
