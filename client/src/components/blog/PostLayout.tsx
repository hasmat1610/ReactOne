import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Zap, ArrowLeft, LucideIcon } from 'lucide-react';
import HeroBanner from './HeroBanner';

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
  badgeIcon: LucideIcon;
  gradientContainer?: string;
  radialBackground?: string;
  badgeContainerStyles?: string;
  badgeTextStyles?: string;
  titleGradient?: string;
  subtitleColor?: string;
  avatarRing?: string;
  dateColor?: string;
}

const PostLayout: React.FC<PostLayoutProps> = ({
  title,
  description,
  category,
  date,
  readingTime,
  author,
  children,
  badgeIcon,
  gradientContainer,
  radialBackground,
  badgeContainerStyles,
  badgeTextStyles,
  titleGradient,
  subtitleColor,
  avatarRing,
  dateColor
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

      {/* Article Hero Banner */}
      <HeroBanner
        badgeText={category}
        badgeIcon={badgeIcon}
        title={title}
        subtitle={description}
        date={date}
        gradientContainer={gradientContainer}
        radialBackground={radialBackground}
        badgeContainerStyles={badgeContainerStyles}
        badgeTextStyles={badgeTextStyles}
        titleGradient={titleGradient}
        subtitleColor={subtitleColor}
        avatarRing={avatarRing}
        dateColor={dateColor}
      />

      {/* Main Content Area */}
      <div className="container mx-auto px-[24px] max-w-[1280px] pb-[56px]">
        
        {/* Article Container (720px) centered */}
        <div className="max-w-[720px] mx-auto">

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

