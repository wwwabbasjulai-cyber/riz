/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, TeamMember, ContactRequest, SecurityConfig, SecurityLog, BlogPost } from '../types';
import abbasAvatar from '../../abbas-julaei.png';
import mamadAvatar from '../../mamad-parvani.png';

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'چگونه سرعت لود اپلیکیشن‌های ریکت را به زیر ۱ ثانیه برسانیم؟',
    excerpt: 'در این مقاله به بررسی تکنیک‌های پیشرفته فشرده‌سازی در ریکت، استفاده از lazy loading و معماری ماژولار می‌پردازیم.',
    content: 'جزئیات مقاله در اینجا قرار می‌گیرد... برای بهینه‌سازی سرعت سایت شما نیازمند مدیریت state‌ها، جلوگیری از re-render های اضافی و فشرده‌سازی تصاویر هستید. این موارد نه‌تنها تجربه کاربری را بهبود می‌بخشد، بلکه باعث می‌شود سئو تکنیکال سایت شما در پلتفرم‌های جستجو رشد محسوسی داشته باشد.',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    date: '۲۵ اردیبهشت ۱۴۰۵',
    author: 'عباس جولائی',
    tags: ['React', 'Performance', 'SEO']
  },
  {
    id: 'blog-2',
    title: 'اهمیت تجربه کاربری (UI/UX) در افزایش نرخ تبدیل',
    excerpt: 'تجربه کاربری تنها زیبایی نیست؛ بلکه مسیری است که مخاطب را به هدف می‌رساند. چگونه از UI برای فروش بیشتر بهره ببریم؟',
    content: 'طراحی رابط کاربری یک هنر مهندسی‌شده است. وقتی شما المان‌ها را در جاهای درست قرار می‌دهید، مسیری برای کاربر باز می‌کنید تا بصورت ناخودآگاه با محصول شما ارتباط برقرار کند. در طراحی‌های ریزمون، ما همیشه به اصول روان‌شناسی رنگ‌ها و تایپوگرافی دقت مضاعف داریم.',
    coverImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=80',
    date: '۱۲ خرداد ۱۴۰۵',
    author: 'محمدمهدی پروانی',
    tags: ['UI/UX', 'Design', 'Conversion']
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'سامانه ابری هوشمند رایا',
    description: 'بستر یکپارچه بهینه‌سازی جریان‌های کاری تیمی با استفاده از پردازش ابری پرسرعت.',
    longDescription: 'این سامانه به عنوان راهکاری جامع برای سازمان‌های مقیاس بزرگ طراحی شده است که هماهنگی بین تیمی، اتوماسیون وظایف تکراری، و نظارت آنلاین بر پیشرفت کارها را ممکن می‌سازد. از ویژگی‌های آن می‌توان به داشبوردهای عیب‌یابی همزمان، پایداری ۹۹.۹٪ و تحلیل‌های بلادرنگ اشاره کرد.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    tags: ['React', 'Node.js', 'Docker', 'PostgreSQL'],
    client: 'شرکت فناوری نوین رایا',
    date: 'اردیبهشت ۱۴۰۵',
    demoUrl: 'https://example.com/raya',
    githubUrl: 'https://github.com/example/raya',
    featured: true,
    originalSize: '2.4 MB',
    compressedSize: '180 KB'
  },
  {
    id: 'proj-2',
    title: 'اپلیکیشن سلامت همراه راسا',
    description: 'سامانه خودمراقبتی و هوشمند نوبت‌دهی آنلاین با تکیه بر تحلیل‌های پزشکی سریع.',
    longDescription: 'پروژه سلامت همراه راسا با هدف تسهیل ارتباط پزشکان و بیماران پیاده‌سازی گردید. تیم ما بخش نوبت‌دهی زنده، مشاوره ویدیویی امن و سیستم خودکار بایگانی پرونده‌های پزشکی بیماران را طبق استانداردهای بین‌المللی توسعه داد.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    tags: ['Flutter', 'Node.js', 'Redis', 'WebRTC'],
    client: 'سلامت آرا راسا',
    date: 'اسفند ۱۴۰۴',
    demoUrl: 'https://example.com/rasa',
    featured: true,
    originalSize: '4.1 MB',
    compressedSize: '310 KB'
  },
  {
    id: 'proj-3',
    title: 'صرافی غیرمتمرکز رمزارز آریا',
    description: 'هسته معاملاتی پرسرعت بومی با قابلیت ترید کم‌تاخیر و امنیت بالا.',
    longDescription: 'سامانه معاملاتی رمزآریا طراحی شد تا تجربه‌ای روان، پرسرعت و ایمن از انتقال دارایی را فراهم کند. وب‌سوکت‌های چندمسیره پایدار، گزارش‌دهی عمیق نمودار شمعی و الگوریتم تطبیق سفارش‌ها با ظرفیت ۵۰ هزار تراکنش در ثانیه بخش عظیمی از ساختار این پروژه است.',
    image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&auto=format&fit=crop&q=80',
    tags: ['Golang', 'TypeScript', 'WebSocket', 'Redis'],
    client: 'هلدینگ مالی امین',
    date: 'آبان ۱۴۰۴',
    demoUrl: 'https://example.com/arya-swap',
    githubUrl: 'https://github.com/example/arya-swap',
    featured: false,
    originalSize: '1.8 MB',
    compressedSize: '145 KB'
  }
];

export const INITIAL_TEAM: TeamMember[] = [
  {
    id: 'team-1',
    name: 'عباس جولائی',
    role: 'توسعه‌دهنده بک‌اند و وردپرس',
    bio: 'توسعه‌دهنده خلاق و ساختاریافته سمت سرور با بیش از ۴ سال تجربه تخصصی در پیاده‌سازی معماری‌های مقیاس‌پذیر بک‌اند، بهینه‌سازی پایگاه‌های داده و طراحی افزونه‌ها و هسته‌های سفارشی وردپرس با تمرکز ویژه بر کارایی بالا و امنیت.',
    avatar: abbasAvatar,
    skills: ['Node.js', 'NestJS', 'TypeScript', 'Rest API', 'WordPress'],
    socials: {
      github: 'https://github.com/julaiabbas',
      telegram: 'https://t.me',
      email: 'julaiabbas@gmail.com'
    }
  },
  {
    id: 'team-2',
    name: 'محمد مهدی پروانی',
    role: 'توسعه‌دهنده فرانت‌اند و طراح محصول',
    bio: 'طراح خلاق محصول و توسعه‌دهنده متعهد فرانت‌اند با بیش از ۴ سال تجربه در خلق رابط‌های کاربری جذاب، پیاده‌سازی قالب‌های اختصاصی وردپرس و توسعه پلتفرم‌های تعاملی مدرن با تمرکز روی جزییات بصری، انیمیشن‌های نرم و سرعت بارگذاری فوق‌العاده.',
    avatar: mamadAvatar,
    skills: ['Figma', 'React', 'Adobe XD', 'Tailwind CSS', 'WordPress'],
    socials: {
      github: 'https://github.com',
      telegram: 'https://t.me',
      email: 'mparvani@example.com'
    }
  }
];

export const INITIAL_SECURITY_CONFIG: SecurityConfig = {
  is2FAEnabled: false,
  twoFASecret: '',
  backupCodes: [],
  lastLoginAttempts: 0,
  adminPasswordHash: '12qaz45tgb' // default simple password for demo admin entrance
};

// Seed LocalStorage helper
export function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  const data = localStorage.getItem(`tiny_db_${key}`);
  if (!data) {
    localStorage.setItem(`tiny_db_${key}`, JSON.stringify(defaultValue));
    return defaultValue;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return defaultValue;
  }
}

export function saveToLocalStorage<T>(key: string, value: T): void {
  localStorage.setItem(`tiny_db_${key}`, JSON.stringify(value));
}
