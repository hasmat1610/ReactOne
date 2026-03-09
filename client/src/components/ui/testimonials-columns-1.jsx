"use client";
import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

export const TestimonialsColumn = (props) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ content, avatar, name, role }, i) => (
                <div className="p-6 md:p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors max-w-xs w-full group" key={i}>
                  <div className="text-foreground/80 leading-relaxed text-sm md:text-base italic">"{content}"</div>
                  <div className="flex items-center gap-3 mt-5">
                    <img
                      width={40}
                      height={40}
                      src={avatar}
                      alt={name}
                      className="h-10 w-10 md:h-12 md:w-12 rounded-full border border-primary/20 group-hover:border-primary/50 transition-colors"
                    />
                    <div className="flex flex-col">
                      <div className="font-semibold text-white/90 text-sm md:text-base tracking-tight leading-5">{name}</div>
                      <div className="leading-5 text-xs md:text-sm text-muted-foreground tracking-tight">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
