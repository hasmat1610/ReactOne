import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  ArrowLeft,
  LogOut,
  Mail,
  Calendar,
  BookOpen,
  Trophy,
  Clock,
  Target,
  ChevronRight,
} from 'lucide-react';

const LEARNING_MODULES = [
  { name: 'HTML & CSS Fundamentals', progress: 100, color: '#F97316' },
  { name: 'JavaScript Essentials', progress: 75, color: '#FACC15' },
  { name: 'React 18 Core', progress: 40, color: '#3B82F6' },
  { name: 'Next.js & SSR', progress: 10, color: '#A855F7' },
  { name: 'State Management', progress: 0, color: '#10B981' },
  { name: 'Data Fetching & APIs', progress: 0, color: '#EC4899' },
];

const STATS = [
  { icon: BookOpen, label: 'Modules Completed', value: '1 / 6' },
  { icon: Clock, label: 'Hours Learned', value: '12.5' },
  { icon: Trophy, label: 'Achievements', value: '4' },
  { icon: Target, label: 'Current Streak', value: '3 days' },
];

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // If not logged in, redirect to login
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) return null;

  const joinDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-[#0B0D10] text-[#E9EEF5] relative overflow-hidden pt-16">

      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#40E0FF]/3 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/3 rounded-full blur-[100px]" />
      </div>


      <main className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">

        {/* ── Profile Header Card ── */}
        <div className="rounded-2xl border border-white/10 bg-[#0d1520]/80 backdrop-blur-2xl p-8 relative overflow-hidden mb-8">
          <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-[#40E0FF]/15 via-transparent to-purple-500/10 pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar */}
            {user.picture ? (
              <img
                src={user.picture}
                alt={user.name || 'Profile'}
                className="w-24 h-24 rounded-2xl object-cover ring-4 ring-[#40E0FF]/20 shadow-xl shadow-[#40E0FF]/10"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#40E0FF] to-purple-600 flex items-center justify-center ring-4 ring-[#40E0FF]/20 shadow-xl">
                <span className="text-white font-bold text-3xl">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </span>
              </div>
            )}

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-white mb-1">{user.name || 'User'}</h1>
              <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-white/40">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  {user.email || 'No email'}
                </span>
                <span className="hidden sm:inline text-white/10">•</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Joined {joinDate}
                </span>
              </div>
              {/* Role Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#40E0FF]/10 border border-[#40E0FF]/20 text-[#40E0FF] text-xs font-medium mt-3">
                <span className="w-1.5 h-1.5 bg-[#40E0FF] rounded-full" />
                Student
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white/60 hover:text-red-400 hover:border-red-500/20 hover:bg-red-500/5 transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* ── Stats Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/10 bg-[#0d1520]/60 backdrop-blur-xl p-5 text-center hover:border-white/20 transition-colors"
            >
              <stat.icon className="w-5 h-5 text-[#40E0FF] mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-white/40 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ── Learning Progress ── */}
        <div className="rounded-2xl border border-white/10 bg-[#0d1520]/80 backdrop-blur-2xl p-6 relative">
          <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-[#40E0FF]/10 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Learning Progress</h2>
              <span className="text-xs text-white/30">6 Modules</span>
            </div>

            <div className="space-y-4">
              {LEARNING_MODULES.map((mod) => (
                <div
                  key={mod.name}
                  className="flex items-center gap-4 group cursor-pointer hover:bg-white/[0.02] rounded-xl p-3 -mx-3 transition-colors"
                >
                  {/* Color dot */}
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0 shadow-lg"
                    style={{ backgroundColor: mod.color, boxShadow: `0 0 12px ${mod.color}40` }}
                  />

                  {/* Module info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-white truncate">{mod.name}</span>
                      <span className="text-xs text-white/40 ml-2">{mod.progress}%</span>
                    </div>
                    {/* Progress bar */}
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${mod.progress}%`,
                          backgroundColor: mod.color,
                          boxShadow: mod.progress > 0 ? `0 0 8px ${mod.color}60` : 'none',
                        }}
                      />
                    </div>
                  </div>

                  {/* Arrow */}
                  <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Profile;
