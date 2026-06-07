import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import DOMPurify from 'dompurify';
import { BlogPost } from '../types';
import { Calendar, User, ArrowRight, Tag, BookOpen } from 'lucide-react';

interface BlogPostDetailProps {
  post: BlogPost;
  onBack: () => void;
}

export default function BlogPostDetail({ post, onBack }: BlogPostDetailProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-32" dir="rtl">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 mb-8 text-sm font-bold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group cursor-pointer"
        >
          <ArrowRight className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>بازگشت به مقالات</span>
        </button>

        {/* Article Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-sm mb-8"
        >
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-6">
            <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full"><Calendar className="w-4 h-4" /> {post.date}</span>
            <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full"><User className="w-4 h-4" /> {post.author}</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-10">
            {post.tags.map((tag, i) => (
              <span key={i} className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded border border-blue-100 dark:border-blue-800">
                <Tag className="w-3.5 h-3.5" />
                {tag}
              </span>
            ))}
          </div>

          {/* Cover Image */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-12 shadow-md">
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg prose-blue dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-loose"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
          />

        </motion.div>

        {/* Read More Section (Optional placeholder) */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-12"
        >
          <BookOpen className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">به زودی مقالات بیشتری اضافه خواهد شد</h3>
          <p className="text-slate-500">ممنون از توجه شما به مجله تخصصی ریزمون.</p>
        </motion.div>

      </div>
    </div>
  );
}
