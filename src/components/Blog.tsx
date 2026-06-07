import React from 'react';
import { motion } from 'framer-motion';
import { BlogPost } from '../types';
import { Calendar, User, ArrowLeft, BookOpen } from 'lucide-react';

interface BlogProps {
  posts: BlogPost[];
  onSelectPost: (id: string) => void;
}

export default function Blog({ posts, onSelectPost }: BlogProps) {
  if (posts.length === 0) return null;

  return (
    <section id="blog-section" className="py-24 bg-white dark:bg-slate-950 border-t border-slate-200/50 dark:border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 text-sm font-extrabold text-blue-600 dark:text-blue-400 tracking-widest uppercase mb-3"
          >
            <BookOpen className="w-5 h-5" />
            مجله تخصصی ریزمون
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight"
          >
            آخرین مقالات و یافته‌های مهندسی
          </motion.h3>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelectPost(post.id)}
              className="bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 cursor-pointer group flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={post.coverImage} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  {post.tags.slice(0, 2).map((tag, i) => (
                    <span key={i} className="px-2 py-1 text-[10px] font-bold bg-white/90 dark:bg-slate-900/90 text-blue-600 dark:text-blue-400 rounded backdrop-blur-sm shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {post.date}</span>
                  <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {post.author}</span>
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 group-hover:gap-3 transition-all">
                  <span>مطالعه مقاله</span>
                  <ArrowLeft className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
