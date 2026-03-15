import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface LoveButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
}

const LoveButton: React.FC<LoveButtonProps> = ({
  label = "Love",
  onClick,
  className = ""
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Initialize Matter.js engine
    const engine = Matter.Engine.create();
    engine.gravity.y = 0.5; // Gentle gravity
    engineRef.current = engine;

    // Create a hidden canvas for the physics simulation
    // We'll overlay it on the whole screen or just the button area?
    // To match the reference, it seems to fall across the screen.
    // We'll create a full-viewport transparent canvas.
    const render = Matter.Render.create({
      element: document.body,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent',
        pixelRatio: window.devicePixelRatio,
      }
    });

    // Style the canvas to be fixed, overlay, and mouse-transparent
    render.canvas.style.position = 'fixed';
    render.canvas.style.top = '0';
    render.canvas.style.left = '0';
    render.canvas.style.pointerEvents = 'none';
    render.canvas.style.zIndex = '9999';

    renderRef.current = render;
    Matter.Render.run(render);

    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);

    // Handle Resize
    const handleResize = () => {
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
      render.options.width = window.innerWidth;
      render.options.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      renderRef.current = null;
      engineRef.current = null;
      runnerRef.current = null;
    };
  }, []);

  const createPixelHeart = (color1: string, color2: string) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const size = 72; // 3x size (originally 24)
    canvas.width = size * window.devicePixelRatio;
    canvas.height = size * window.devicePixelRatio;

    if (ctx) {
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      // Simple 8x8-ish pixel heart
      const pixels = [
        [0, 1, 1, 0, 0, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0],
      ];

      const pSize = 9; // 3x pixel size (originally 3)
      pixels.forEach((row, y) => {
        row.forEach((pixel, x) => {
          if (pixel) {
            ctx.fillStyle = (x + y) % 2 === 0 ? color1 : color2;
            ctx.fillRect(x * pSize, y * pSize, pSize, pSize);
          }
        });
      });
    }
    return canvas.toDataURL();
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) onClick();
    if (!engineRef.current) return;

    // Trigger burst
    const { x, y } = e.currentTarget.getBoundingClientRect();
    const centerX = x + e.currentTarget.clientWidth / 2;
    const centerY = y + e.currentTarget.clientHeight / 2;

    const hearts: Matter.Body[] = [];
    const colors = [
      { c1: '#216be4', c2: '#3b82f6' }, // Primary Blue
      { c1: '#60a5fa', c2: '#93c5fd' }  // Light Blue
    ];

    // Spawn 40 hearts across the top of the viewport for a "rain" effect
    for (let i = 0; i < 40; i++) {
      const colorPair = colors[Math.floor(Math.random() * colors.length)]!;
      const texture = createPixelHeart(colorPair.c1, colorPair.c2);

      const spawnX = Math.random() * window.innerWidth;
      const spawnY = -50 - (Math.random() * 200); // Stagger spawn height above viewport

      const body = Matter.Bodies.rectangle(
        spawnX,
        spawnY,
        72, 72, { // 3x body size
        render: {
          sprite: {
            texture: texture,
            xScale: 1,
            yScale: 1
          }
        },
        restitution: 0.4,
        friction: 0.1,
        velocity: {
          x: (Math.random() - 0.5) * 2,
          y: Math.random() * 5 + 8 // Slightly faster fall for bigger hearts
        },
        angle: Math.random() * Math.PI,
        angularVelocity: (Math.random() - 0.5) * 0.1
      });
      hearts.push(body);
    }

    Matter.Composite.add(engineRef.current.world, hearts);

    // Clean up hearts after they fall out
    setTimeout(() => {
      if (engineRef.current) {
        Matter.Composite.remove(engineRef.current.world, hearts);
      }
    }, 3000);
  };

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <motion.button
        onClick={handleClick}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9, x: -4, y: 4 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="group relative flex items-center gap-3 px-8 h-12 rounded-full border-[3px] border-[#216be4] bg-[#216be4]/5 text-[#216be4] font-bold text-sm tracking-tight transition-all duration-75 overflow-hidden"
      >
        <span className="relative z-10 flex items-center gap-2">
          <Heart
            className={`w-4 h-4 fill-current transition-transform duration-300 ${isHovered ? 'scale-125 animate-pulse' : ''}`}
          />
          {label}
        </span>

        {/* Subtle inner glow on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#216be4]/10"
            />
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default LoveButton;
