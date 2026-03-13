import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { ArrowRight, Plus } from 'lucide-react';

const GUIDE_TAGS = [
  // --- DESIGN TOOLS ---
  { label: 'Figma', color: '#BEF226', textColor: '#000000' },
  { label: 'Sketch', color: '#BEF226', textColor: '#000000' },
  { label: 'Adobe XD', color: '#BEF226', textColor: '#000000' },
  { label: 'Framer', color: '#4CD8C0', textColor: '#000000' },
  { label: 'InVision', color: '#4CD8C0', textColor: '#000000' },
  { label: 'Rive', color: '#FF57A7', textColor: '#FFFFFF' },
  { label: 'Lottie', color: '#FF57A7', textColor: '#FFFFFF' },
  { label: 'Spline', color: '#A259FF', textColor: '#FFFFFF' },
  { label: 'Cinema 4D', color: '#A259FF', textColor: '#FFFFFF' },
  
  // --- FRONTEND STACK ---
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

  // --- BACKEND STACK (New) ---
  // 🏗 Backend Frameworks - Cyan
  { label: 'Node.js', color: '#4CD8C0', textColor: '#000000' },
  { label: 'Express.js', color: '#4CD8C0', textColor: '#000000' },
  { label: 'NestJS', color: '#4CD8C0', textColor: '#000000' },

  // 🗄 Databases - Lime
  { label: 'PostgreSQL', color: '#BEF226', textColor: '#000000' },
  { label: 'MySQL', color: '#BEF226', textColor: '#000000' },
  { label: 'SQLite', color: '#BEF226', textColor: '#000000' },
  { label: 'MongoDB', color: '#BEF226', textColor: '#000000' },
  { label: 'Redis', color: '#BEF226', textColor: '#000000' },

  // 🔗 API Technologies - Pink
  { label: 'REST API', color: '#FF57A7', textColor: '#FFFFFF' },
  { label: 'GraphQL', color: '#FF57A7', textColor: '#FFFFFF' },
  { label: 'tRPC', color: '#FF57A7', textColor: '#FFFFFF' },
  { label: 'gRPC', color: '#FF57A7', textColor: '#FFFFFF' },

  // 🔐 Authentication & Security - Purple
  { label: 'JWT', color: '#A259FF', textColor: '#FFFFFF' },
  { label: 'OAuth 2.0', color: '#A259FF', textColor: '#FFFFFF' },
  { label: 'Auth0', color: '#A259FF', textColor: '#FFFFFF' },
  { label: 'Clerk', color: '#A259FF', textColor: '#FFFFFF' },
  { label: 'Supabase Auth', color: '#A259FF', textColor: '#FFFFFF' },

  // 📡 Realtime & Messaging - White
  { label: 'WebSocket', color: '#FFFFFF', textColor: '#000000' },
  { label: 'Socket.IO', color: '#FFFFFF', textColor: '#000000' },
  { label: 'Firebase Realtime', color: '#FFFFFF', textColor: '#000000' },

  // 🧩 Backend as a Service (BaaS) - Pink
  { label: 'Supabase', color: '#FF57A7', textColor: '#FFFFFF' },
  { label: 'Firebase', color: '#FF57A7', textColor: '#FFFFFF' },
  { label: 'Appwrite', color: '#FF57A7', textColor: '#FFFFFF' },

  // 🧱 ORM / Database Tools - Lime
  { label: 'Prisma', color: '#BEF226', textColor: '#000000' },
  { label: 'TypeORM', color: '#BEF226', textColor: '#000000' },
  { label: 'Drizzle ORM', color: '#BEF226', textColor: '#000000' },
];

const ExploreGuidesPhysics = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    // Matter.js Module Aliases
    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter;

    // Create Engine
    const engine = Engine.create();
    engineRef.current = engine;
    const world = engine.world;

    // Set gravity
    engine.gravity.y = 1.2;

    // Get container dimensions
    const width = sceneRef.current.clientWidth;
    const height = sceneRef.current.clientHeight;

    // Create Renderer
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

    // Create Runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Add boundaries (walls and ground)
    const wallOptions = { isStatic: true, render: { visible: false } };
    const ground = Bodies.rectangle(width / 2, height + 50, width, 100, wallOptions);
    const leftWall = Bodies.rectangle(-50, height / 2, 100, height, wallOptions);
    const rightWall = Bodies.rectangle(width + 50, height / 2, 100, height, wallOptions);
    const ceiling = Bodies.rectangle(width / 2, -50, width, 100, wallOptions);

    Composite.add(world, [ground, leftWall, rightWall, ceiling]);

    // Add Tags as Bodies
    const tags = GUIDE_TAGS.map((tag) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const pillHeight = 60; // 24px font + 12px padding top/bottom
      const paddingX = 24; // 24px padding left/right
      const pillY = 2; // Offset to account for stroke/glow
      
      if (ctx) {
        ctx.font = 'bold 24px';
        ctx.fillText(tag.label, 0, 0);
        const textMetrics = ctx.measureText(tag.label);
        const textWidth = textMetrics.width;
        
        const pillWidth = textWidth + paddingX * 2;
        canvas.width = pillWidth * window.devicePixelRatio;
        canvas.height = (pillHeight + pillY * 2) * window.devicePixelRatio;
        
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        
        // Draw pill shape
        ctx.beginPath();
        ctx.roundRect(0, pillY, pillWidth, pillHeight, pillHeight / 2);
        ctx.fillStyle = tag.color;
        ctx.fill();

        // Draw text
        ctx.font = 'bold 24px'; 
        ctx.fillStyle = tag.textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(tag.label, pillWidth / 2, pillY + pillHeight / 2);
      }

      const x = Math.random() * (width - 200) + 100;
      const y = Math.random() * (height / 2);
      
      const body = Bodies.rectangle(x, y, (canvas.width / window.devicePixelRatio), pillHeight, {
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

      return body;
    });

    Composite.add(world, tags);

    // Add Mouse Control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.1,
        render: {
          visible: false
        }
      }
    });

    Composite.add(world, mouseConstraint);
    render.mouse = mouse;

    // Handle Resize
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
    };
  }, []);

  return (
    <section className="py-24 relative overflow-hidden bg-[#000000] flex flex-col justify-center">
      {/* Physics Canvas Container */}
        <div 
          ref={sceneRef} 
          className="w-full flex-1 min-h-[400px] relative overflow-hidden cursor-grab active:cursor-grabbing"
        />
    </section>
  );
};

export default ExploreGuidesPhysics;
