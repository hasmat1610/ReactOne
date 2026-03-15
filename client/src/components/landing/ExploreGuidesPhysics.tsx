import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { motion } from 'motion/react';
import { ArrowRight, Plus, Search } from 'lucide-react';

const GUIDE_TAGS = [
  // ... (keeping existing tags)
  { label: 'Figma', color: '#BEF226', textColor: '#000000' },
  { label: 'Sketch', color: '#BEF226', textColor: '#000000' },
  { label: 'Adobe XD', color: '#BEF226', textColor: '#000000' },
  { label: 'Framer', color: '#4CD8C0', textColor: '#000000' },
  { label: 'InVision', color: '#4CD8C0', textColor: '#000000' },
  { label: 'Rive', color: '#FF57A7', textColor: '#FFFFFF' },
  { label: 'Lottie', color: '#FF57A7', textColor: '#FFFFFF' },
  { label: 'Spline', color: '#A259FF', textColor: '#FFFFFF' },
  { label: 'Cinema 4D', color: '#A259FF', textColor: '#FFFFFF' },
  { label: 'React', color: '#4CD8C0', textColor: '#000000' },
  { label: 'Next.js', color: '#4CD8C0', textColor: '#000000' },
  { label: 'Tailwind CSS', color: '#BEF226', textColor: '#000000' },
  { label: 'Sass', color: '#BEF226', textColor: '#000000' },
  { label: 'Redux', color: '#A259FF', textColor: '#FFFFFF' },
  { label: 'Zustand', color: '#A259FF', textColor: '#FFFFFF' },
  { label: 'TanStack Query', color: '#FF57A7', textColor: '#FFFFFF' },
  { label: 'Axios', color: '#FF57A7', textColor: '#FFFFFF' },
  { label: 'GSAP', color: '#FFFFFF', textColor: '#000000' },
  { label: 'Framer Motion', color: '#FFFFFF', textColor: '#000000' },
  { label: 'Lenis', color: '#FFFFFF', textColor: '#000000' },
  { label: 'Three.js', color: '#A259FF', textColor: '#FFFFFF' },
  { label: 'React Three Fiber', color: '#A259FF', textColor: '#FFFFFF' },
  { label: 'React Hook Form', color: '#4CD8C0', textColor: '#000000' },
  { label: 'Formik', color: '#4CD8C0', textColor: '#000000' },
  { label: 'Zod', color: '#4CD8C0', textColor: '#000000' },
  { label: 'Yup', color: '#4CD8C0', textColor: '#000000' },
  { label: 'Material UI', color: '#BEF226', textColor: '#000000' },
  { label: 'Chakra UI', color: '#BEF226', textColor: '#000000' },
  { label: 'Ant Design', color: '#BEF226', textColor: '#000000' },
  { label: 'Radix UI', color: '#BEF226', textColor: '#000000' },
  { label: 'Vite', color: '#FF57A7', textColor: '#FFFFFF' },
  { label: 'Webpack', color: '#FF57A7', textColor: '#FFFFFF' },
  { label: 'Jest', color: '#FFFFFF', textColor: '#000000' },
  { label: 'Playwright', color: '#FFFFFF', textColor: '#000000' },
  { label: 'Node.js', color: '#4CD8C0', textColor: '#000000' },
  { label: 'Express.js', color: '#4CD8C0', textColor: '#000000' },
  { label: 'NestJS', color: '#4CD8C0', textColor: '#000000' },
  { label: 'PostgreSQL', color: '#BEF226', textColor: '#000000' },
  { label: 'MySQL', color: '#BEF226', textColor: '#000000' },
  { label: 'SQLite', color: '#BEF226', textColor: '#000000' },
  { label: 'MongoDB', color: '#BEF226', textColor: '#000000' },
  { label: 'Redis', color: '#BEF226', textColor: '#000000' },
  { label: 'REST API', color: '#FF57A7', textColor: '#FFFFFF' },
  { label: 'GraphQL', color: '#FF57A7', textColor: '#FFFFFF' },
  { label: 'tRPC', color: '#FF57A7', textColor: '#FFFFFF' },
  { label: 'gRPC', color: '#FF57A7', textColor: '#FFFFFF' },
  { label: 'JWT', color: '#A259FF', textColor: '#FFFFFF' },
  { label: 'OAuth 2.0', color: '#A259FF', textColor: '#FFFFFF' },
  { label: 'Auth0', color: '#A259FF', textColor: '#FFFFFF' },
  { label: 'Clerk', color: '#A259FF', textColor: '#FFFFFF' },
  { label: 'Supabase Auth', color: '#A259FF', textColor: '#FFFFFF' },
  { label: 'WebSocket', color: '#FFFFFF', textColor: '#000000' },
  { label: 'Socket.IO', color: '#FFFFFF', textColor: '#000000' },
  { label: 'Firebase Realtime', color: '#FFFFFF', textColor: '#000000' },
  { label: 'Supabase', color: '#FF57A7', textColor: '#FFFFFF' },
  { label: 'Firebase', color: '#FF57A7', textColor: '#FFFFFF' },
  { label: 'Appwrite', color: '#FF57A7', textColor: '#FFFFFF' },
  { label: 'Prisma', color: '#BEF226', textColor: '#000000' },
  { label: 'TypeORM', color: '#BEF226', textColor: '#000000' },
  { label: 'Drizzle ORM', color: '#BEF226', textColor: '#000000' },
];

const ExploreGuidesPhysics = () => {
  const containerRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          setIsInView(entries[0].isIntersecting);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!sceneRef.current || !isInView) {
      if (runnerRef.current && engineRef.current) {
        Matter.Runner.stop(runnerRef.current);
      }
      return;
    };

    if (engineRef.current && runnerRef.current) {
      Matter.Runner.run(runnerRef.current, engineRef.current);
      return;
    }

    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter;

    const engine = Engine.create();
    engineRef.current = engine;
    const world = engine.world;
    engine.gravity.y = 1.2;

    const width = sceneRef.current.clientWidth;
    const height = sceneRef.current.clientHeight;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent',
        pixelRatio: window.devicePixelRatio,
      }
    });

    Render.run(render);

    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    const wallOptions = { isStatic: true, render: { visible: false } };
    const ground = Bodies.rectangle(width / 2, height + 50, width, 100, wallOptions);
    const leftWall = Bodies.rectangle(-50, height / 2, 100, height, wallOptions);
    const rightWall = Bodies.rectangle(width + 50, height / 2, 100, height, wallOptions);
    const ceiling = Bodies.rectangle(width / 2, -50, width, 100, wallOptions);

    Composite.add(world, [ground, leftWall, rightWall, ceiling]);

    const tags = GUIDE_TAGS.map((tag) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const pillHeight = 48;
      const paddingX = 20;
      const pillY = 2;

      if (ctx) {
        ctx.font = 'bold 20px Inter';
        const textMetrics = ctx.measureText(tag.label);
        const textWidth = textMetrics.width;

        const pillWidth = textWidth + paddingX * 2;
        canvas.width = pillWidth * window.devicePixelRatio;
        canvas.height = (pillHeight + pillY * 2) * window.devicePixelRatio;

        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        ctx.beginPath();
        ctx.roundRect(0, pillY, pillWidth, pillHeight, pillHeight / 2);
        ctx.fillStyle = tag.color;
        ctx.fill();

        ctx.font = 'bold 20px Inter';
        ctx.fillStyle = tag.textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(tag.label, pillWidth / 2, pillY + pillHeight / 2);
      }

      const x = Math.random() * (width - 200) + 100;
      const y = Math.random() * (height / 2);

      return Bodies.rectangle(x, y, (canvas.width / window.devicePixelRatio), pillHeight, {
        chamfer: { radius: pillHeight / 2 },
        render: {
          sprite: {
            texture: canvas.toDataURL(),
            xScale: 1 / window.devicePixelRatio,
            yScale: 1 / window.devicePixelRatio
          }
        },
        restitution: 0.4,
        friction: 0.2,
        density: 0.01,
        angle: (Math.random() - 0.5) * 0.5
      });
    });

    Composite.add(world, tags);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.1,
        render: { visible: false }
      }
    });

    Composite.add(world, mouseConstraint);
    render.mouse = mouse;

    const handleResize = () => {
      if (!sceneRef.current) return;
      const newWidth = sceneRef.current.clientWidth;
      const newHeight = sceneRef.current.clientHeight;
      render.canvas.width = newWidth;
      render.canvas.height = newHeight;
      render.options.width = newWidth;
      render.options.height = newHeight;
      Matter.Body.setPosition(ground, { x: newWidth / 2, y: newHeight + 50 });
      Matter.Body.setPosition(rightWall, { x: newWidth + 50, y: newHeight / 2 });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
      engineRef.current = null;
      runnerRef.current = null;
    };
  }, [isInView]);

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden bg-[#000000] flex flex-col justify-center">
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
            <Search className="w-3.5 h-3.5" />
            <span>Interactive Library</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4"
          >
            Explore Every <span className="text-transparent bg-clip-text bg-linear-to-r from-[#216be4] to-cyan-400">Essential Tech</span>
          </motion.h2>
        </div>

        {/* Browser Mockup Wrapper */}
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
                reactone.dev/playground
              </div>
            </div>
            <div className="w-12" />
          </div>

          {/* Content Area */}
          <div className="min-h-[500px] bg-[#111111] relative overflow-hidden">
            <div
              ref={sceneRef}
              className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExploreGuidesPhysics;
