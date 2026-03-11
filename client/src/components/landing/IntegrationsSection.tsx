import React from 'react';
import { motion } from 'framer-motion';
import { Code } from 'lucide-react';

const techItems = [
    { name: 'React', color: '#61DAFB', bg: 'rgba(97,218,251,0.08)', letter: 'Re' },
    { name: 'Redux', color: '#764ABC', bg: 'rgba(118,74,188,0.08)', letter: 'Rx' },
    { name: 'Zustand', color: '#F59E0B', bg: 'rgba(245,158,11,0.08)', letter: 'Z' },
    { name: 'Axios', color: '#5A29E4', bg: 'rgba(90,41,228,0.08)', letter: 'Ax' },
    { name: 'TanStack', color: '#FF4154', bg: 'rgba(255,65,84,0.08)', letter: 'TQ' },
    { name: 'Zod', color: '#3068B7', bg: 'rgba(48,104,183,0.08)', letter: 'Zd' },
    { name: 'RHF', color: '#EC4899', bg: 'rgba(236,72,153,0.08)', letter: 'HF' },
    { name: 'Supabase', color: '#3ECF8E', bg: 'rgba(62,207,142,1.08)', letter: 'Sb' },
    { name: 'Figma', color: '#A259FF', bg: 'rgba(162,89,255,0.08)', letter: 'Fi' },
];

const RADIUS = 170;
const ICON_SIZE = 60;
const CENTER = 230; // half of container (460)

// Calculate position on circle
const getPos = (i: number, total: number) => {
    const angle = (i / total) * 2 * Math.PI - Math.PI / 2;
    return {
        x: CENTER + Math.cos(angle) * RADIUS - ICON_SIZE / 2,
        y: CENTER + Math.sin(angle) * RADIUS - ICON_SIZE / 2,
        angle,
    };
};

const IntegrationsSection = () => {
    return (
        <section className="py-28 relative overflow-hidden bg-[#000000]">
            {/* Multiple layered glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#216be4]/[0.06] rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 max-w-5xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-[#216be4] mb-6 text-sm font-medium backdrop-blur-sm"
                    >
                        <Code className="w-4 h-4" />
                        <span>Modern React Ecosystem</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-5">
                        Built with the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#216be4] to-purple-400">tools you love</span>
                    </h2>
                    <p className="text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed">
                        Every guide is powered by the same libraries and tools used in production apps worldwide.
                    </p>
                </motion.div>

                {/* Orbital Layout */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative mx-auto"
                    style={{ width: 460, height: 460 }}
                >
                    {/* SVG Connection lines + orbit rings */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 460 460">
                        {/* Outer dashed ring */}
                        <circle cx={CENTER} cy={CENTER} r={RADIUS + 50} fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="3 8" opacity="0.06" />
                        {/* Main orbit ring */}
                        <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="url(#orbitGradient)" strokeWidth="1" opacity="0.15" />
                        {/* Inner accent ring */}
                        <circle cx={CENTER} cy={CENTER} r={60} fill="none" stroke="white" strokeWidth="0.5" opacity="0.05" />

                        {/* Connection lines from center to each icon */}
                        {techItems.map((item, i) => {
                            const pos = getPos(i, techItems.length);
                            const targetX = pos.x + ICON_SIZE / 2;
                            const targetY = pos.y + ICON_SIZE / 2;
                            return (
                                <line
                                    key={`line-${item.name}`}
                                    x1={CENTER}
                                    y1={CENTER}
                                    x2={targetX}
                                    y2={targetY}
                                    stroke={item.color}
                                    strokeWidth="0.5"
                                    opacity="0.12"
                                    strokeDasharray="4 6"
                                />
                            );
                        })}

                        {/* Gradient definitions */}
                        <defs>
                            <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#216be4" />
                                <stop offset="50%" stopColor="#A259FF" />
                                <stop offset="100%" stopColor="#216be4" />
                            </linearGradient>
                            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="#216be4" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#216be4" stopOpacity="0" />
                            </radialGradient>
                        </defs>

                        {/* Center glow */}
                        <circle cx={CENTER} cy={CENTER} r="45" fill="url(#centerGlow)" />
                    </svg>

                    {/* Center Logo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 180, damping: 18, delay: 0.2 }}
                        className="absolute z-20"
                        style={{
                            left: CENTER - 36,
                            top: CENTER - 36,
                            width: 72,
                            height: 72,
                        }}
                    >
                        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#216be4] to-[#4f46e5] flex items-center justify-center shadow-[0_0_50px_rgba(33,107,228,0.5),0_0_100px_rgba(33,107,228,0.2)] border border-white/20 relative">
                            <Code className="w-8 h-8 text-white" />
                            {/* Pulse ring */}
                            <div className="absolute inset-0 rounded-2xl border border-[#216be4]/40 animate-ping opacity-20" />
                        </div>
                    </motion.div>

                    {/* Orbiting Icons */}
                    {techItems.map((item, index) => {
                        const pos = getPos(index, techItems.length);
                        return (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    delay: 0.3 + index * 0.07,
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 18,
                                }}
                                className="absolute group"
                                style={{
                                    left: pos.x,
                                    top: pos.y,
                                    width: ICON_SIZE,
                                    height: ICON_SIZE,
                                }}
                            >
                                {/* Hover glow */}
                                <div
                                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                                    style={{ background: item.color, transform: 'scale(1.5)' }}
                                />

                                {/* Icon card */}
                                <div
                                    className="relative w-full h-full rounded-xl flex items-center justify-center border border-white/[0.08] cursor-default transition-all duration-300 group-hover:scale-110 group-hover:border-white/20 z-10"
                                    style={{
                                        background: `linear-gradient(135deg, ${item.bg}, rgba(10,13,20,0.95))`,
                                        boxShadow: `0 0 20px ${item.color}10, inset 0 1px 0 rgba(255,255,255,0.03)`,
                                    }}
                                >
                                    <span
                                        className="text-base font-bold tracking-tight transition-all duration-300 group-hover:scale-110"
                                        style={{ color: item.color }}
                                    >
                                        {item.letter}
                                    </span>
                                </div>

                                {/* Label */}
                                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                                    <span
                                        className="text-[10px] font-mono font-semibold transition-colors duration-300 group-hover:text-white/60"
                                        style={{ color: 'rgba(255,255,255,0.25)' }}
                                    >
                                        {item.name}
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Bottom text */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center text-zinc-600 text-sm mt-14 font-medium"
                >
                    And many more libraries added regularly
                </motion.p>
            </div>
        </section>
    );
};

export default IntegrationsSection;
