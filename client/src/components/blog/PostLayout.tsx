import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Zap, ArrowLeft, Cpu } from 'lucide-react';

interface Author {
  name: string;
  role: string;
  avatar: string;
}

interface PostLayoutProps {
  title: string;
  description: string;
  category: string;
  date: string;
  readingTime: string;
  author: Author;
  children: React.ReactNode;
  heroIcon?: React.ReactNode;
}

const PostLayout: React.FC<PostLayoutProps> = ({
  title,
  description,
  category,
  date,
  readingTime,
  author,
  children,
  heroIcon = <Cpu className="w-24 h-24 text-amber-400 animate-pulse opacity-50" />
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / (totalHeight || 1)) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#080B16] text-slate-200 font-['Inter',_sans-serif] selection:bg-amber-500/30">
      <Helmet>
        <title>{title} | ReactOne</title>
        <meta name="description" content={description} />
      </Helmet>

      {/* Rule 7.1: Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-amber-500 z-[100] transition-all duration-100" 
        style={{ width: `${scrollProgress}%` }} 
      />

      {/* Header - Preserved Design */}
      <header className="fixed top-0 left-0 w-full h-[64px] bg-[#080B16]/80 backdrop-blur-md border-b border-white/5 z-50 flex items-center px-6">
        <div className="max-w-[1280px] mx-auto w-full flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-white font-bold tracking-tighter hover:text-amber-400 transition-colors">
            <Zap className="w-5 h-5 text-amber-500" />
            ReactOne
          </Link>
          <nav className="flex items-center gap-6 text-[14px] font-medium text-slate-400">
            <Link to="/supabase-guide" className="hover:text-white">Guides</Link>
            <Link to="/" className="hover:text-white">Blog</Link>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="container mx-auto px-[24px] max-w-[1280px] pt-[120px] pb-[56px]">
        
        {/* Article Container (720px) centered */}
        <div className="max-w-[720px] mx-auto">
          
          {/* Article Hero Section */}
          <div className="mb-[40px]">
            {/* Category Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 mb-[16px] font-medium text-[14px]">
              {category}
            </div>

            {/* H1 Title */}
            <h1 className="text-[48px] font-[800] text-white my-[16px] leading-[1.1] tracking-tight">
              {title}
            </h1>

            {/* Premium Author Block Design */}
            <div className="flex items-center gap-4 mt-[32px] mb-[40px]">
              <div className="w-12 h-12 rounded-full border-2 border-white/10 overflow-hidden shadow-lg">
                <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-white text-[16px]">{author.name}</div>
                <div className="text-slate-500 text-[14px]">{author.role}</div>
              </div>
              <div className="text-right text-slate-500 text-[14px]">
                <div>{date}</div>
                <div>• {readingTime}</div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="w-full aspect-[16/9] bg-gradient-to-br from-slate-900 to-amber-900/40 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center relative shadow-2xl transition-transform hover:scale-[1.01] duration-500">
              {heroIcon}
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          </div>

          {/* Article Reading Column */}
          <article className="max-w-[65ch] prose prose-invert prose-lg">
            {children}
          </article>

          {/* Back to Hub Footer Link */}
          <div className="mt-[80px] pt-[40px] border-t border-white/5 flex justify-end">
            <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[14px] font-medium group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Knowledge Hub
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostLayout;
