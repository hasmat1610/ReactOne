import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Layers, TerminalSquare, FileText, Sparkles, Server, ArrowRight } from 'lucide-react';

const useCases = [
    {
        title: 'Authentication',
        desc: 'Login, signup, Google OAuth — secure user flows with production patterns.',
        icon: Shield,
        color: '#10B981',
        link: '/auth-flow-code',
        tags: ['OAuth', 'JWT', 'Sessions'],
    },
    {
        title: 'State Management',
        desc: 'Redux Toolkit & Zustand patterns for scalable, maintainable state.',
        icon: Layers,
        color: '#764ABC',
        link: '/redux-toolkit',
        tags: ['Redux', 'Zustand', 'Context'],
    },
    {
        title: 'API Integration',
        desc: 'Axios instances, interceptors, React Query & TanStack Query caching.',
        icon: TerminalSquare,
        color: '#5A29E4',
        link: '/axios-react',
        tags: ['Axios', 'React Query', 'REST'],
    },
    {
        title: 'Form Handling',
        desc: 'React Hook Form with Zod validation — dynamic fields, nested forms.',
        icon: FileText,
        color: '#EC4899',
        link: '/react-hook-form',
        tags: ['RHF', 'Zod', 'Validation'],
    },
    {
        title: 'AI Prompts',
        desc: 'Master prompts for scaffolding projects with AI tools & Figma MCP.',
        icon: Sparkles,
        color: '#F59E0B',
        link: '/figma-mcp',
        tags: ['Figma', 'MCP', 'AI'],
    },
    {
        title: 'Full-Stack Patterns',
        desc: 'Node.js/Express backend patterns, API design, and React integration.',
        icon: Server,
        color: '#216be4',
        link: '/backend-integration',
        tags: ['Node.js', 'Express', 'REST'],
    },
];

const BuildAnythingSection = () => {
    return (
        <section className="py-32 relative overflow-hidden bg-black/40 border-t border-white/5">
            <div className="container mx-auto px-4 relative z-10 max-w-6xl">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4">
                        Learn <span className="text-[#216be4]">Everything</span> You Need
                    </h2>
                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                        From login flows to full-stack patterns — every complex topic, simplified with real code examples.
                    </p>
                </motion.div>

                {/* Use-Case Cards Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {useCases.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={item.title}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                            >
                                <Link
                                    to={item.link}
                                    className="group block rounded-2xl border border-white/5 bg-[#0a0d14] p-7 h-full transition-all hover:border-[#216be4]/30 no-underline"
                                >
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 border border-white/10"
                                        style={{ background: `${item.color}15`, boxShadow: `0 0 25px ${item.color}15` }}
                                    >
                                        <Icon className="w-5 h-5" style={{ color: item.color }} />
                                    </div>

                                    <h3 className="text-white font-bold text-lg mb-2 tracking-tight">{item.title}</h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed mb-5">{item.desc}</p>

                                    <div className="flex gap-2 flex-wrap mb-4">
                                        {item.tags.map((tag) => (
                                            <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 text-zinc-400 font-mono border border-white/5">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-1 text-[#216be4] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                        Start Learning <ArrowRight className="w-4 h-4" />
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default BuildAnythingSection;
