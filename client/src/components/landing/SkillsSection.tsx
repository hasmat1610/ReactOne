import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Palette,
  Code,
  Server,
  Cpu
} from 'lucide-react';

const skillCategories = [
  {
    id: "design",
    label: "Design",
    title: "Design Tools",
    description: "Streamlining the creative process with industry-standard design tools and advanced motion prototyping.",
    icon: Palette,
    groups: [
      {
        name: "Creative & Prototyping",
        items: [
          { label: 'Figma', description: 'Collaborative interface design tool for teams.', color: '#BEF226', textColor: '#000000' },
          { label: 'Sketch', description: 'Digital design platform for Mac.', color: '#BEF226', textColor: '#000000' },
          { label: 'Adobe XD', description: 'Vector-based design tool for web and mobile.', color: '#BEF226', textColor: '#000000' },
          { label: 'Framer', description: 'Prototyping tool with high-fidelity interactions.', color: '#4CD8C0', textColor: '#000000' },
          { label: 'InVision', description: 'Digital product design platform.', color: '#4CD8C0', textColor: '#000000' },
        ]
      },
      {
        name: "Motion & 3D Assets",
        items: [
          { label: 'Rive', description: 'Real-time vector animation for apps and games.', color: '#FF57A7', textColor: '#FFFFFF' },
          { label: 'Lottie', description: 'JSON-based animation file format.', color: '#FF57A7', textColor: '#FFFFFF' },
          { label: 'Spline', description: 'Design and collaborate on 3D browser experiences.', color: '#A259FF', textColor: '#FFFFFF' },
          { label: 'Cinema 4D', description: 'Professional 3D modeling, animation, and rendering.', color: '#A259FF', textColor: '#FFFFFF' },
        ]
      }
    ]
  },
  {
    id: "frontend",
    label: "Frontend",
    title: "Frontend Stack",
    description: "Crafting pixel-perfect, accessible, and high-performance user interfaces using modern frameworks, scalable architectures, and advanced animation techniques.",
    icon: Code,
    groups: [
      {
        name: "Core Frameworks",
        items: [
          { label: 'React', description: 'Building component-based, reusable UI architectures for scalable applications.', color: '#4CD8C0', textColor: '#000000' },
          { label: 'Next.js', description: 'SSR, SSG, and optimized SEO-friendly web applications.', color: '#4CD8C0', textColor: '#000000' },
        ]
      },
      {
        name: "Styling & UI Development",
        items: [
          { label: 'Tailwind CSS', description: 'Utility-first styling for rapid, responsive design development.', color: '#BEF226', textColor: '#000000' },
          { label: 'Sass', description: 'Advanced CSS with modular variables and nesting.', color: '#BEF226', textColor: '#000000' },
        ]
      },
      {
        name: "State Management",
        items: [
          { label: 'Redux', description: 'Centralized state for complex, large-scale React apps.', color: '#A259FF', textColor: '#FFFFFF' },
          { label: 'Zustand', description: 'Lightweight global state with minimal boilerplate.', color: '#A259FF', textColor: '#FFFFFF' },
        ]
      },
      {
        name: "Data & API Handling",
        items: [
          { label: 'TanStack Query', description: 'Efficient data fetching, caching, and server state sync.', color: '#FF57A7', textColor: '#FFFFFF' },
          { label: 'Axios', description: 'Promise-based HTTP client for REST API communication.', color: '#FF57A7', textColor: '#FFFFFF' },
        ]
      },
      {
        name: "Animations & Motion",
        items: [
          { label: 'GSAP', description: 'High-performance timeline animations for advanced interactions.', color: '#FFFFFF', textColor: '#000000' },
          { label: 'Framer Motion', description: 'Declarative animations and gestures for React interfaces.', color: '#FFFFFF', textColor: '#000000' },
          { label: 'Lenis', description: 'Smooth scrolling experiences for interactive websites.', color: '#FFFFFF', textColor: '#000000' },
        ]
      },
      {
        name: "3D & Graphics",
        items: [
          { label: 'Three.js', description: 'Interactive 3D graphics in the browser using WebGL.', color: '#A259FF', textColor: '#FFFFFF' },
          { label: 'React Three Fiber', description: 'Declarative 3D scene building with React components.', color: '#A259FF', textColor: '#FFFFFF' },
        ]
      },
      {
        name: "Forms & Validation",
        items: [
          { label: 'React Hook Form', description: 'High-performance form management with minimal re-renders.', color: '#4CD8C0', textColor: '#000000' },
          { label: 'Formik', description: 'Structured workflows for complex form logic.', color: '#4CD8C0', textColor: '#000000' },
          { label: 'Zod', description: 'Type-safe validation and parsing for forms and APIs.', color: '#4CD8C0', textColor: '#000000' },
          { label: 'Yup', description: 'Object schema validation for structured data.', color: '#4CD8C0', textColor: '#000000' },
        ]
      },
      {
        name: "UI Component Libraries",
        items: [
          { label: 'Material UI', description: 'Scalable design systems based on Material Design.', color: '#BEF226', textColor: '#000000' },
          { label: 'Chakra UI', description: 'Accessible and composable components for fast development.', color: '#BEF226', textColor: '#000000' },
          { label: 'Ant Design', description: 'Professional enterprise-level UI component system.', color: '#BEF226', textColor: '#000000' },
          { label: 'Radix UI', description: 'Unstyled accessible primitives for custom design systems.', color: '#BEF226', textColor: '#000000' },
        ]
      },
      {
        name: "DevTooling & QA",
        items: [
          { label: 'Vite', description: 'Fast dev server and optimized bundles.', color: '#FF57A7', textColor: '#FFFFFF' },
          { label: 'Webpack', description: 'Advanced module bundling for complex applications.', color: '#FF57A7', textColor: '#FFFFFF' },
          { label: 'Jest', description: 'Unit and snapshot testing for React components.', color: '#FFFFFF', textColor: '#000000' },
          { label: 'Playwright', description: 'Cross-browser E2E automation testing.', color: '#FFFFFF', textColor: '#000000' },
        ]
      }
    ]
  },
  {
    id: "backend",
    label: "Backend",
    title: "Backend Stack",
    description: "Architecting scalable, secure server-side systems and resilient database infrastructures with modern cloud integrations.",
    icon: Server,
    groups: [
      {
        name: "Server Frameworks",
        items: [
          { label: 'Node.js', description: 'High-performance JavaScript runtime for server logic.', color: '#4CD8C0', textColor: '#000000' },
          { label: 'Express.js', description: 'Minimalist web framework for Node.js APIs.', color: '#4CD8C0', textColor: '#000000' },
          { label: 'NestJS', description: 'Progressive Node.js framework for scalable architectures.', color: '#4CD8C0', textColor: '#000000' },
        ]
      },
      {
        name: "Databases & Storage",
        items: [
          { label: 'PostgreSQL', description: 'Advanced relational database for complex data needs.', color: '#BEF226', textColor: '#000000' },
          { label: 'MySQL', description: 'Reliable and widely-used relational database.', color: '#BEF226', textColor: '#000000' },
          { label: 'SQLite', description: 'Embedded database for lightweight storage.', color: '#BEF226', textColor: '#000000' },
          { label: 'MongoDB', description: 'Flexible NoSQL document database.', color: '#BEF226', textColor: '#000000' },
          { label: 'Redis', description: 'In-memory data structure for ultra-fast caching.', color: '#BEF226', textColor: '#000000' },
        ]
      },
      {
        name: "API & Communication",
        items: [
          { label: 'REST API', description: 'Standard architectural style for web-based services.', color: '#FF57A7', textColor: '#FFFFFF' },
          { label: 'GraphQL', description: 'Query language for APIs with precise data fetching.', color: '#FF57A7', textColor: '#FFFFFF' },
          { label: 'tRPC', description: 'End-to-end typesafe APIs without code generation.', color: '#FF57A7', textColor: '#FFFFFF' },
          { label: 'gRPC', description: 'High-performance universal RPC framework.', color: '#FF57A7', textColor: '#FFFFFF' },
        ]
      },
      {
        name: "Auth & Security",
        items: [
          { label: 'JWT', description: 'Compact tokens for secure data exchange.', color: '#A259FF', textColor: '#FFFFFF' },
          { label: 'OAuth 2.0', description: 'Industry standard protocol for authorization.', color: '#A259FF', textColor: '#FFFFFF' },
          { label: 'Auth0', description: 'Complete platform for authentication and identity.', color: '#A259FF', textColor: '#FFFFFF' },
          { label: 'Clerk', description: 'Authentication and user management for React.', color: '#A259FF', textColor: '#FFFFFF' },
          { label: 'Supabase Auth', description: 'Plug-and-play auth for Postgres applications.', color: '#A259FF', textColor: '#FFFFFF' },
        ]
      },
      {
        name: "Realtime & BaaS",
        items: [
          { label: 'WebSocket', description: 'Full-duplex communication for live features.', color: '#FFFFFF', textColor: '#000000' },
          { label: 'Socket.IO', description: 'Bi-directional realtime event-based communication.', color: '#FFFFFF', textColor: '#000000' },
          { label: 'Supabase', description: 'Open source Firebase alternative with Postgres.', color: '#FF57A7', textColor: '#FFFFFF' },
          { label: 'Firebase', description: 'Platform for building app backends quickly.', color: '#FF57A7', textColor: '#FFFFFF' },
        ]
      },
      {
        name: "ORM & Data Access",
        items: [
          { label: 'Prisma', description: 'Next-generation ORM with type-safe queries.', color: '#BEF226', textColor: '#000000' },
          { label: 'TypeORM', description: 'ORM for TypeScript and JavaScript using decorators.', color: '#BEF226', textColor: '#000000' },
          { label: 'Drizzle ORM', description: 'Headless TS ORM with zero dependencies.', color: '#BEF226', textColor: '#000000' },
        ]
      }
    ]
  }
];

const SkillsSection = () => {
  const [activeTab, setActiveTab] = useState(skillCategories[1]?.id || 'frontend');

  return (
    <section className="py-24 relative overflow-hidden bg-[#000000]">
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#216be4]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#216be4]/30 bg-[#216be4]/10 text-[#216be4] mb-4 font-medium text-xs mx-auto"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Deep Dive</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4"
          >
            Mastering the <span className="text-transparent bg-clip-text bg-linear-to-r from-[#216be4] to-cyan-400">Modern Stack</span>
          </motion.h2>
        </div>

        {/* Browser Mockup Style Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="rounded-2xl border border-white/10 bg-[#0a0d14] shadow-2xl overflow-hidden ring-1 ring-white/5"
        >
          {/* Browser Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#050505]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="px-32 py-1.5 rounded-md bg-white/5 border border-white/5 text-[11px] text-zinc-500 font-mono flex items-center justify-center">
                reactone.dev/tech-stack
              </div>
            </div>
            <div className="w-12" />
          </div>

          {/* Browser Tabs - Style from HardStuffSection */}
          <div className="flex border-b border-white/5 bg-[#0a0d14]">
            {skillCategories.map((category) => {
              const Icon = category.icon;
              const isActive = activeTab === category.id;

              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 text-sm font-bold transition-all relative cursor-pointer tracking-tight ${isActive ? 'text-[#216be4]' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                  {isActive && (
                    <motion.div
                      layoutId="active-skill-tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#216be4]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Content Area */}
          <div className="min-h-[500px] bg-[#111111] p-8 md:p-12 relative overflow-hidden">
            {/* Subtle internal glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#216be4]/5 rounded-full blur-[100px] pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="relative z-10"
              >


                <div className="space-y-16">
                  {skillCategories.find(c => c.id === activeTab)?.groups.map((group) => (
                    <div key={group.name} className="relative">
                      {/* Group Header */}
                      <div className="flex items-center gap-4 mb-8">
                        <div className="h-px flex-1 bg-gradient-to-r from-[#216be4]/40 to-transparent" />
                        <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#216be4] bg-[#216be4]/5 px-4 py-1.5 rounded-lg border border-[#216be4]/20">
                          {group.name}
                        </h4>
                        <div className="h-px flex-[5] bg-gradient-to-l from-[#216be4]/20 to-transparent" />
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {group.items.map((skill) => (
                          <motion.div
                            key={skill.label}
                            whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.04)" }}
                            className="group p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#216be4]/40 transition-all duration-300"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h5
                                style={{ color: skill.color }}
                                className="text-sm font-bold tracking-tight"
                              >
                                {skill.label}
                              </h5>
                              <div
                                style={{ backgroundColor: skill.color }}
                                className="w-2 h-2 rounded-full shadow-[0_0_12px_currentColor]"
                              />
                            </div>
                            <p className="text-zinc-500 text-[11px] leading-relaxed group-hover:text-zinc-400 transition-colors">
                              {skill.description}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
