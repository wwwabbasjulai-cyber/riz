import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(import.meta.dirname, '..', 'data.sqlite');

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    longDescription TEXT,
    image TEXT NOT NULL DEFAULT '',
    tags TEXT NOT NULL DEFAULT '[]',
    client TEXT NOT NULL DEFAULT '',
    date TEXT NOT NULL DEFAULT '',
    demoUrl TEXT,
    githubUrl TEXT,
    featured INTEGER NOT NULL DEFAULT 0,
    compressedSize TEXT,
    originalSize TEXT
  );

  CREATE TABLE IF NOT EXISTS blog_posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL DEFAULT '',
    content TEXT NOT NULL DEFAULT '',
    coverImage TEXT NOT NULL DEFAULT '',
    date TEXT NOT NULL DEFAULT '',
    author TEXT NOT NULL DEFAULT '',
    tags TEXT NOT NULL DEFAULT '[]'
  );

  CREATE TABLE IF NOT EXISTS contact_requests (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    date TEXT NOT NULL,
    read INTEGER NOT NULL DEFAULT 0,
    ip TEXT DEFAULT '',
    responseNote TEXT DEFAULT ''
  );

  CREATE TABLE IF NOT EXISTS security_config (
    id INTEGER PRIMARY KEY DEFAULT 1,
    is2FAEnabled INTEGER NOT NULL DEFAULT 0,
    twoFASecret TEXT NOT NULL DEFAULT '',
    backupCodes TEXT NOT NULL DEFAULT '[]',
    lastLoginAttempts INTEGER NOT NULL DEFAULT 0,
    adminPasswordHash TEXT NOT NULL DEFAULT 'admin123'
  );

  CREATE TABLE IF NOT EXISTS security_logs (
    id TEXT PRIMARY KEY,
    action TEXT NOT NULL,
    details TEXT DEFAULT '',
    date TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'info'
  );
`);

function hasData(): boolean {
  const row = db.prepare('SELECT COUNT(*) as count FROM projects').get() as any;
  return row.count > 0;
}

export function seedInitialData(): void {
  if (hasData()) return;

  const insertProject = db.prepare(`INSERT INTO projects (id, title, description, longDescription, image, tags, client, date, demoUrl, githubUrl, featured, compressedSize, originalSize) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  insertProject.run('proj-1', 'سامانه ابری هوشمند رایا', 'بستر یکپارچه بهینه‌سازی جریان‌های کاری تیمی با استفاده از پردازش ابری پرسرعت.', 'این سامانه به عنوان راهکاری جامع برای سازمان‌های مقیاس بزرگ طراحی شده است.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80', JSON.stringify(['React', 'Node.js', 'Docker', 'PostgreSQL']), 'شرکت فناوری نوین رایا', 'اردیبهشت ۱۴۰۵', 'https://example.com/raya', 'https://github.com/example/raya', 1, '180 KB', '2.4 MB');
  insertProject.run('proj-2', 'اپلیکیشن سلامت همراه راسا', 'سامانه خودمراقبتی و هوشمند نوبت‌دهی آنلاین با تکیه بر تحلیل‌های پزشکی سریع.', 'پروژه سلامت همراه راسا با هدف تسهیل ارتباط پزشکان و بیماران پیاده‌سازی گردید.', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80', JSON.stringify(['Flutter', 'Node.js', 'Redis', 'WebRTC']), 'سلامت آرا راسا', 'اسفند ۱۴۰۴', 'https://example.com/rasa', null, 1, '310 KB', '4.1 MB');
  insertProject.run('proj-3', 'صرافی غیرمتمرکز رمزارز آریا', 'هسته معاملاتی پرسرعت بومی با قابلیت ترید کم‌تاخیر و امنیت بالا.', 'سامانه معاملاتی رمزآریا طراحی شد تا تجربه‌ای روان، پرسرعت و ایمن از انتقال دارایی را فراهم کند.', 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&auto=format&fit=crop&q=80', JSON.stringify(['Golang', 'TypeScript', 'WebSocket', 'Redis']), 'هلدینگ مالی امین', 'آبان ۱۴۰۴', 'https://example.com/arya-swap', 'https://github.com/example/arya-swap', 0, '145 KB', '1.8 MB');

  const insertBlog = db.prepare(`INSERT INTO blog_posts (id, title, excerpt, content, coverImage, date, author, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
  insertBlog.run('blog-1', 'چگونه سرعت لود اپلیکیشن‌های ریکت را به زیر ۱ ثانیه برسانیم؟', 'در این مقاله به بررسی تکنیک‌های پیشرفته فشرده‌سازی در ریکت، استفاده از lazy loading و معماری ماژولار می‌پردازیم.', 'جزئیات مقاله در اینجا قرار می‌گیرد...', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80', '۲۵ اردیبهشت ۱۴۰۵', 'عباس جولائی', JSON.stringify(['React', 'Performance', 'SEO']));
  insertBlog.run('blog-2', 'اهمیت تجربه کاربری (UI/UX) در افزایش نرخ تبدیل', 'تجربه کاربری تنها زیبایی نیست؛ بلکه مسیری است که مخاطب را به هدف می‌رساند.', 'طراحی رابط کاربری یک هنر مهندسی‌شده است.', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=80', '۱۲ خرداد ۱۴۰۵', 'محمدمهدی پروانی', JSON.stringify(['UI/UX', 'Design', 'Conversion']));

  const insertContact = db.prepare(`INSERT INTO contact_requests (id, name, email, subject, message, date, read, ip) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
  insertContact.run('req-init', 'دکتر علیرضا محمدی', 'mohammadi@med.org', 'درخواست همکاری طراحی پرتال نوبت‌دهی بیمارستانی', 'سلام وقت بخیر. بنده مایل به برون‌سپاری سامانه و ماژول فرانت درمانگاهی هستم.', '۱۷ خرداد ۱۴۰۵ - ساعت ۸:۳۰ صبح', 0, '198.162.24.112');

  const insertLog = db.prepare(`INSERT INTO security_logs (id, action, details, date, status) VALUES (?, ?, ?, ?, ?)`);
  insertLog.run('log-1', 'راه‌اندازی اولیه سیستم', 'پلتفرم با دیتابیس SQLite راه‌اندازی گردید.', new Date().toLocaleDateString('fa-IR'), 'info');

  const config = db.prepare(`INSERT OR IGNORE INTO security_config (id, is2FAEnabled, twoFASecret, backupCodes, lastLoginAttempts, adminPasswordHash) VALUES (1, 0, '', '[]', 0, 'admin123')`);
  config.run();
}

export default db;
