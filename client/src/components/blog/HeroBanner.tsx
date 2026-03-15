import React from 'react';
import { Calendar, LucideIcon } from 'lucide-react';

export interface HeroBannerProps {
  badgeText: string;
  badgeIcon: LucideIcon;
  title: string;
  subtitle: string;
  authorName?: string | undefined;
  authorRole?: string | undefined;
  authorImage?: string | undefined;
  date: string;
  // Theme props
  gradientContainer?: string | undefined;
  radialBackground?: string | undefined;
  badgeContainerStyles?: string | undefined;
  badgeTextStyles?: string | undefined;
  titleGradient?: string | undefined;
  subtitleColor?: string | undefined;
  avatarRing?: string | undefined;
  dateColor?: string | undefined;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  badgeText,
  badgeIcon: BadgeIcon,
  title,
  subtitle,
  authorName = "Hasmat Patel",
  authorRole = "UI Developer",
  authorImage = "/images/author/hasmat-patel.jpg",
  date,
  // Default colors mapped from GoogleAuth post
  gradientContainer = "from-rose-900 via-red-900 to-[#0a0f18]",
  radialBackground = "radial-gradient(circle at 50% 120%, rgba(244,63,94,0.4), transparent 50%), radial-gradient(circle at 10% 20%, rgba(251,146,60,0.3), transparent 30%)",
  badgeContainerStyles = "border border-rose-500/30 bg-rose-500/10",
  badgeTextStyles = "text-rose-400",
  titleGradient = "from-white to-white/60",
  subtitleColor = "text-rose-300/70",
  avatarRing = "from-rose-500 to-orange-500",
  dateColor = "text-rose-300/60"
}) => {
  return (
    <div className="container mx-auto px-4 max-w-5xl pt-32 pb-16">
      <div className={`w-full h-64 md:h-72 bg-gradient-to-br ${gradientContainer} rounded-3xl mb-10 overflow-hidden relative flex items-center justify-center border border-white/10`}>
        <div className="absolute inset-0 opacity-40 mix-blend-screen" style={{ background: radialBackground }} />
        <div className="z-10 text-center relative">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${badgeContainerStyles} ${badgeTextStyles} mb-4 font-medium text-xs`}>
            <BadgeIcon className="w-3.5 h-3.5" />
            <span>{badgeText}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-2xl tracking-tight">
            <span className={`text-transparent bg-clip-text bg-gradient-to-b ${titleGradient}`}>{title}</span>
          </h1>
          <p className={`${subtitleColor} mt-3 text-sm md:text-base font-medium`}>{subtitle}</p>
          {/* ── Author & Date ── */}
          <div className="flex items-center justify-center gap-4 mt-5">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${avatarRing} p-[1.5px] overflow-hidden`}>
                <img src={authorImage} alt={authorName} className="w-full h-full rounded-full object-cover" />
              </div>
              <div className="text-left">
                <p className="text-white text-sm font-semibold m-0 leading-tight">{authorName}</p>
                <p className={`${dateColor} text-xs m-0`}>{authorRole}</p>
              </div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className={`flex items-center gap-1.5 ${dateColor} text-xs`}>
              <Calendar className="w-3.5 h-3.5" />
              <span>{date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
