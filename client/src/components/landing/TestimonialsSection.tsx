import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'motion/react';
import { TestimonialsColumn } from '../ui/testimonials-columns-1';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Alex Rivera",
      handle: "@arivera_dev",
      role: "Junior Developer",
      content: "ReactOne completely changed how I understand React. The explanations of hooks and state management finally clicked for me. Within three months of completing the course, I landed my first frontend dev job! The real-world projects were exactly what I needed.",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      rating: 5
    },
    {
      name: "Sam Chen",
      handle: "@samchen_ui",
      role: "Senior Frontend Engineer",
      content: "Even as an experienced developer, I learned so many advanced patterns here. The TanStack Query and Redux Toolkit modules are pure gold. It's rare to find a course that goes this deep into enterprise-level React architecture.",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      rating: 5
    },
    {
      name: "Jessica Park",
      handle: "@jparkodes",
      role: "Engineering Manager",
      content: "I now recommend this platform to all new hires on my team. It's the most comprehensive, visually stunning, and up-to-date modern React resource available. It cuts our onboarding time in half.",
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
      rating: 5
    },
    {
      name: "David Kim",
      handle: "@dkim_builds",
      role: "Career Switcher",
      content: "I was lost in dependency hell and outdated tutorials on YouTube until I found ReactOne. The clearly structured learning path saved me months of frustration. Best investment in my education, hands down.",
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d",
      rating: 5
    },
    {
      name: "Elena Rossi",
      handle: "@elena_rossi",
      role: "UI/UX Designer \u2192 Developer",
      content: "Transitioning from design to frontend development was intimidating, but the project-based approach here made it incredibly intuitive. I finally understand how to implement the complex animations I design in Framer.",
      avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      handle: "@marcusj_web",
      role: "Fullstack Developer",
      content: "The advanced modules on performance optimization, server components, and custom hooks are mind-blowing. This isn't just basic 'ToDo app' tutorials; it genuinely takes you to a senior level of understanding.",
      avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
      rating: 5
    },
    {
      name: "Sarah Jenkins",
      handle: "@sarah_j",
      role: "React Native Dev",
      content: "The concepts taught here apply seamlessly to React Native too. My app performance improved by 40% after implementing the memoization techniques shown in the course.",
      avatar: "https://i.pravatar.cc/150?u=a04258a2462d826723d",
      rating: 5
    },
    {
      name: "Tyler Willis",
      handle: "@tyler_devs",
      role: "Self-Taught Coder",
      content: "From zero programming knowledge to building full-stack Next.js applications confidentally. The community is incredibly supportive, and the curriculum is simply unmatched.",
      avatar: "https://i.pravatar.cc/150?u=a04258a2462d826744d",
      rating: 5
    },
    {
      name: "Priya Patel",
      handle: "@priyacodes",
      role: "Software Consultant",
      content: "As a consultant, I need to stay sharp on the latest tech. ReactOne keeps me ahead of the curve. The sections on React 19 and concurrent rendering are exceptional.",
      avatar: "https://i.pravatar.cc/150?u=a04258a2462d825700d",
      rating: 5
    }
  ];

  const firstColumn = testimonials.slice(0, 3);
  const secondColumn = testimonials.slice(3, 6);
  const thirdColumn = testimonials.slice(6, 9);

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-black/40 border-y border-white/5">
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary mb-6 text-sm font-medium">
            <Star className="w-4 h-4 fill-primary" />
            <span>4.9/5 average rating from students</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">developers globally</span></h2>
          <p className="text-muted-foreground text-lg mb-16 max-w-2xl mx-auto">
            Join thousands of developers who have accelerated their careers, mastered modern React, and landed their dream jobs with ReactOne.
          </p>
        </motion.div>

        {/* Scrolling Columns for testimonials */}
        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
        
      </div>
    </section>
  );
};

export default TestimonialsSection;
