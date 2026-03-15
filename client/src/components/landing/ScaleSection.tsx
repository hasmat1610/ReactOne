import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Shield, BookOpen, Terminal, FileCode, Layers, Braces, Database } from 'lucide-react';

const guides = [
    { title: 'Auth Flow Code', desc: 'Login, signup & password reset', icon: Shield, color: 'from-blue-500/20 to-blue-600/20', border: 'border-blue-500/10', link: '/auth-flow-code' },
    { title: 'Google Auth', desc: 'OAuth 2.0 integration', icon: Shield, color: 'from-emerald-500/20 to-emerald-600/20', border: 'border-emerald-500/10', link: '/google-auth' },
    { title: 'Axios React', desc: 'HTTP client patterns', icon: Terminal, color: 'from-purple-500/20 to-purple-600/20', border: 'border-purple-500/10', link: '/axios-react' },
    { title: 'Redux Toolkit', desc: 'Global state management', icon: Layers, color: 'from-violet-500/20 to-violet-600/20', border: 'border-violet-500/10', link: '/redux-toolkit' },
    { title: 'Supabase Master Guide', desc: 'Auth, DB, RLS & AI', icon: Database, color: 'from-emerald-500/20 to-emerald-600/20', border: 'border-emerald-500/10', link: '/supabase-guide' },
    { title: 'React Hook Form', desc: 'Form handling + Zod', icon: FileCode, color: 'from-sky-500/20 to-sky-600/20', border: 'border-sky-500/10', link: '/react-hook-form' },
    { title: 'Zustand', desc: 'Lightweight state', icon: Braces, color: 'from-orange-500/20 to-orange-600/20', border: 'border-orange-500/10', link: '/zustand' },
];

const techLogos = [
    {
        name: 'React', svg: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#61DAFB"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.31 0-.592.068-.852.2a1.56 1.56 0 0 0-.67.617c-.918 1.592-.256 4.378 1.528 7.235A32.3 32.3 0 0 0 1.67 12c-1.785 2.857-2.447 5.643-1.528 7.235.216.375.5.607.813.713a1.71 1.71 0 0 0 .71.137c1.345 0 3.107-.96 4.888-2.622 1.78 1.653 3.542 2.602 4.887 2.602a1.71 1.71 0 0 0 .71-.137c.312-.106.597-.338.813-.713.918-1.592.256-4.378-1.528-7.235a32.3 32.3 0 0 0 5.432-2.614c1.785-2.857 2.447-5.643 1.528-7.235a1.56 1.56 0 0 0-.67-.617c-.26-.133-.542-.2-.852-.2z" /></svg>
        )
    },
    {
        name: 'Redux', svg: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#764ABC"><path d="M16.634 16.504c.87-.183 1.5-.965 1.48-1.876-.02-.948-.79-1.72-1.74-1.74-.948-.02-1.76.77-1.78 1.72-.01.47.17.9.48 1.22a6.55 6.55 0 0 1-3.11.71c-1.72 0-3.11-.52-4.09-1.55-.74-.78-1.15-1.75-1.22-2.83-.07-.91.04-2.02.67-2.93-.17-.5-.25-1.03-.25-1.58 0-1.58.74-3.03 2-3.97C10.67 2.52 12.52 2 14.5 2c.57 0 1.14.05 1.69.15.57.1 1.12.26 1.63.47.12-.48.54-.84 1.05-.84.6 0 1.08.48 1.08 1.08v3.57c0 .6-.48 1.08-1.08 1.08-.5 0-.92-.34-1.04-.8-.74-.43-1.56-.68-2.42-.73a5.8 5.8 0 0 0-3.45.84A2.66 2.66 0 0 0 10.7 8.9c0 .78.33 1.47.88 1.97-.42.78-.63 1.66-.63 2.57 0 1.58.57 3.03 1.7 4.12A6.82 6.82 0 0 0 16.634 16.504z" /></svg>
        )
    },
    {
        name: 'Zustand', svg: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#F59E0B"><rect x="3" y="3" width="18" height="18" rx="4" opacity="0.8" /><text x="8" y="17" fontSize="12" fill="#000" fontWeight="bold">Z</text></svg>
        )
    },
    {
        name: 'Axios', svg: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#5A29E4"><rect x="3" y="3" width="18" height="18" rx="4" opacity="0.8" /><text x="5" y="17" fontSize="11" fill="#fff" fontWeight="bold">AX</text></svg>
        )
    },
    {
        name: 'TanStack', svg: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#FF4154"><rect x="3" y="3" width="18" height="18" rx="4" opacity="0.8" /><text x="5" y="17" fontSize="11" fill="#fff" fontWeight="bold">TQ</text></svg>
        )
    },
    {
        name: 'Zod', svg: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#3068B7"><rect x="3" y="3" width="18" height="18" rx="4" opacity="0.8" /><text x="5" y="17" fontSize="12" fill="#fff" fontWeight="bold">ZD</text></svg>
        )
    },
];

const ScaleSection = () => {
    return (
        <section className="py-32 relative overflow-hidden bg-black/40 border-t border-white/5">
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#216be4]/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4">
                        Explore Our <span className="text-[#216be4]">Guides</span>
                    </h2>
                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                        From authentication to state management — structured tutorials with copy-paste code to get you shipping faster.
                    </p>
                </motion.div>

                {/* Guide Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
                    {guides.map((guide, index) => {
                        const Icon = guide.icon;
                        return (
                            <motion.div
                                key={guide.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                            >
                                <Link
                                    to={guide.link}
                                    className="group block p-6 rounded-2xl border border-white/5 bg-[#0a0d14] hover:border-[#216be4]/30 transition-all no-underline"
                                >
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${guide.color} border ${guide.border} flex items-center justify-center mb-4`}>
                                        <Icon className="w-5 h-5 text-white/80" />
                                    </div>
                                    <h3 className="text-white font-bold text-lg mb-1 tracking-tight">{guide.title}</h3>
                                    <p className="text-zinc-500 text-sm">{guide.desc}</p>
                                    <div className="mt-4 flex items-center gap-1 text-[#216be4] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                        Read Guide <ArrowRight className="w-4 h-4" />
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default ScaleSection;
